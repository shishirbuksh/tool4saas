<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class SslCheckController extends Controller
{
    public function check(Request $request): JsonResponse
    {
        $rawHost = (string) $request->input('domain', '');
        $host = trim(strtolower($rawHost));

        // Strip protocol, port and path if pasted
        $host = (string) preg_replace('#^https?://#i', '', $host);
        $host = (string) preg_replace('#[:/].*$#', '', $host);

        // Validate domain format (must be valid FQDN)
        if (! preg_match('/^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})+$/i', $host)) {
            return response()->json([
                'error' => 'Invalid domain format. Please enter a valid domain (e.g. example.com).',
            ], 422);
        }

        // SSRF protection: Resolve both IPv4 and IPv6 records
        $records = @dns_get_record($host, DNS_A + DNS_AAAA);
        if (empty($records)) {
            return response()->json([
                'error' => "Could not resolve DNS for domain '{$host}'.",
            ], 404);
        }

        $validatedIps = [];
        foreach ($records as $record) {
            $ip = $record['ip'] ?? $record['ipv6'] ?? '';
            if ($ip === '') {
                continue;
            }

            // Reject private, loopback, link-local, and reserved IP ranges
            if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
                return response()->json([
                    'error' => 'Requests to private, reserved, or internal IP addresses are blocked.',
                ], 403);
            }

            // Specific block for cloud metadata IP (169.254.169.254)
            if ($ip === '169.254.169.254') {
                return response()->json([
                    'error' => 'Requests to cloud metadata endpoints are blocked.',
                ], 403);
            }

            $validatedIps[] = $ip;
        }

        if (empty($validatedIps)) {
            return response()->json([
                'error' => "No valid public IP address found for '{$host}'.",
            ], 404);
        }

        // Connect directly to the validated IP to prevent DNS rebinding attacks
        $connectIp = $validatedIps[0];
        $isIpv6 = str_contains($connectIp, ':');
        $targetSocket = $isIpv6 ? "ssl://[{$connectIp}]:443" : "ssl://{$connectIp}:443";

        $context = stream_context_create([
            'ssl' => [
                'capture_peer_cert' => true,
                'verify_peer' => false,
                'verify_peer_name' => false,
                'SNI_enabled' => true,
                'peer_name' => $host,
                'timeout' => 5,
            ],
        ]);

        $client = @stream_socket_client(
            $targetSocket,
            $errno,
            $errstr,
            5,
            STREAM_CLIENT_CONNECT,
            $context
        );

        if ($client === false) {
            return response()->json([
                'error' => "Failed to connect to {$host}:443 ({$connectIp}). The host may not support HTTPS or is unreachable.",
            ], 502);
        }

        $params = stream_context_get_params($client);
        fclose($client);

        $peerCert = $params['options']['ssl']['peer_certificate'] ?? null;
        if ($peerCert === null) {
            return response()->json([
                'error' => 'No SSL certificate found on remote server.',
            ], 502);
        }

        $certInfo = openssl_x509_parse($peerCert);
        if ($certInfo === false) {
            return response()->json([
                'error' => 'Unable to parse SSL certificate.',
            ], 500);
        }

        $validFrom = $certInfo['validFrom_time_t'] ?? 0;
        $validTo = $certInfo['validTo_time_t'] ?? 0;
        $now = time();
        $isValid = ($now >= $validFrom && $now <= $validTo);
        $daysRemaining = max(0, (int) floor(($validTo - $now) / 86400));

        $issuer = $certInfo['issuer']['O'] ?? $certInfo['issuer']['CN'] ?? 'Unknown Issuer';
        $subject = $certInfo['subject']['CN'] ?? $host;

        $sanString = $certInfo['extensions']['subjectAltName'] ?? '';
        $sans = [];
        if ($sanString !== '') {
            $parts = explode(',', $sanString);
            foreach ($parts as $p) {
                $p = trim($p);
                if (str_starts_with($p, 'DNS:')) {
                    $sans[] = substr($p, 4);
                }
            }
        }

        return response()->json([
            'domain' => $host,
            'isValid' => $isValid,
            'daysRemaining' => $daysRemaining,
            'validFrom' => date('Y-m-d H:i:s T', $validFrom),
            'validTo' => date('Y-m-d H:i:s T', $validTo),
            'issuer' => $issuer,
            'subject' => $subject,
            'sans' => array_slice($sans, 0, 10),
            'signatureType' => $certInfo['signatureTypeLN'] ?? 'Unknown',
        ]);
    }
}
