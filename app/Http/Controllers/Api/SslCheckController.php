<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SslCheckRequest;
use Illuminate\Http\JsonResponse;

final class SslCheckController extends Controller
{
    public function check(SslCheckRequest $request): JsonResponse
    {
        $host = $request->normalizedDomain();

        // Validate domain format (must be valid FQDN)
        if (! $request->isValidFqdn($host)) {
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

            // Block RFC 6598 CGNAT range (100.64.0.0/10)
            if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) !== false) {
                $ipLong = ip2long($ip);
                if ($ipLong !== false && ($ipLong & 0xFFC00000) === 0x64400000) {
                    return response()->json([
                        'error' => 'Requests to shared CGNAT address space are blocked.',
                    ], 403);
                }
            }

            $validatedIps[] = $ip;
        }

        if (empty($validatedIps)) {
            return response()->json([
                'error' => "No valid public IP address found for '{$host}'.",
            ], 404);
        }

        // Prioritize IPv4 addresses first while keeping validated IPv6 fallbacks
        usort($validatedIps, static fn (string $a, string $b): int => (int) str_contains($a, ':') <=> (int) str_contains($b, ':'));

        $client = false;
        $connectIp = $validatedIps[0];
        $context = stream_context_create([
            'ssl' => [
                'capture_peer_cert' => true,
                'verify_peer' => false,
                'verify_peer_name' => false,
                'SNI_enabled' => true,
                'peer_name' => $host,
            ],
        ]);

        // Connect directly to a validated IP to prevent DNS rebinding attacks
        foreach ($validatedIps as $candidateIp) {
            $isIpv6 = str_contains($candidateIp, ':');
            $targetSocket = $isIpv6 ? "ssl://[{$candidateIp}]:443" : "ssl://{$candidateIp}:443";
            $attempt = @stream_socket_client(
                $targetSocket,
                $errno,
                $errstr,
                5,
                STREAM_CLIENT_CONNECT,
                $context
            );
            if ($attempt !== false) {
                $client = $attempt;
                $connectIp = $candidateIp;
                stream_set_timeout($client, 5);
                break;
            }
        }

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
        $dateValid = ($now >= $validFrom && $now <= $validTo);
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

        // Verify subject/SAN hostname match and detect obvious self-signed certificates
        $candidatesToMatch = ! empty($sans) ? $sans : [$subject];
        $hostnameMatch = false;
        foreach ($candidatesToMatch as $pattern) {
            $patternLower = strtolower(trim((string) $pattern));
            if ($patternLower === $host) {
                $hostnameMatch = true;
                break;
            }
            if (str_starts_with($patternLower, '*.')) {
                $suffix = substr($patternLower, 1);
                $hostLabels = substr_count($host, '.');
                $patLabels = substr_count(substr($patternLower, 2), '.') + 1;
                if ($hostLabels === $patLabels && str_ends_with($host, $suffix)) {
                    $hostnameMatch = true;
                    break;
                }
            }
        }

        $isSelfSigned = ($certInfo['issuer'] ?? []) === ($certInfo['subject'] ?? []);
        $isValid = $dateValid && $hostnameMatch && ! $isSelfSigned;

        return response()->json([
            'domain' => $host,
            'isValid' => $isValid,
            'hostnameMatch' => $hostnameMatch,
            'isSelfSigned' => $isSelfSigned,
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
