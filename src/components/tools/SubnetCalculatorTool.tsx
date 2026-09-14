"use client";

import { useMemo, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Slider from "@mui/material/Slider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function ipToInt(ip: string): number {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) throw new Error('Expected IPv4 format like "192.168.1.10"');
  let n = 0;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) throw new Error(`Invalid octet "${part}"`);
    const b = Number(part);
    if (!Number.isInteger(b) || b < 0 || b > 255) throw new Error(`Octet out of range: "${part}"`);
    n = ((n << 8) | b) >>> 0;
  }
  return n >>> 0;
}

function intToIp(n: number): string {
  const v = n >>> 0;
  return `${(v >>> 24) & 255}.${(v >>> 16) & 255}.${(v >>> 8) & 255}.${v & 255}`;
}

type SubnetResult = {
  mask: string;
  network: string;
  broadcast: string;
  first: string;
  last: string;
  hosts: number;
  total: number;
  wildcard: string;
  binaryMask: string;
};

export default function SubnetCalculatorTool() {
  const [ip, setIp] = useState("192.168.1.10");
  const [cidr, setCidr] = useState(24);

  const { result, error } = useMemo(() => {
    try {
      const ipInt = ipToInt(ip);
      if (!Number.isInteger(cidr) || cidr < 0 || cidr > 32) {
        throw new Error("CIDR must be an integer between 0 and 32");
      }
      const maskInt = cidr === 0 ? 0 : ((0xffffffff << (32 - cidr)) >>> 0);
      const networkInt = (ipInt & maskInt) >>> 0;
      const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
      const mask = intToIp(maskInt);
      const network = intToIp(networkInt);
      const broadcast = intToIp(broadcastInt);
      const wildcard = intToIp(~maskInt >>> 0);

      let first: string;
      let last: string;
      let hosts: number;
      if (cidr === 32) {
        first = network;
        last = network;
        hosts = 1;
      } else if (cidr === 31) {
        first = network;
        last = broadcast;
        hosts = 2;
      } else {
        first = intToIp(networkInt + 1);
        last = intToIp(broadcastInt - 1);
        hosts = Math.pow(2, 32 - cidr) - 2;
      }
      const total = Math.pow(2, 32 - cidr);
      const binaryMask = maskInt.toString(2).padStart(32, "0").replace(/(.{8})(?=.)/g, "$1.");

      const computed: SubnetResult = { mask, network, broadcast, first, last, hosts, total, wildcard, binaryMask };
      return { result: computed, error: "" };
    } catch (e) {
      return { result: null as SubnetResult | null, error: (e as Error).message };
    }
  }, [ip, cidr]);

  const summary = result
    ? `IP: ${ip.trim()}/${cidr}\nNetwork: ${result.network}\nBroadcast: ${result.broadcast}\nMask: ${result.mask}\nFirst: ${result.first}\nLast: ${result.last}\nUsable hosts: ${result.hosts}`
    : "";

  const rows: Array<[string, string]> = result
    ? [
        ["IP Address", `${ip.trim()} /${cidr}`],
        ["Network", result.network],
        ["Broadcast", result.broadcast],
        ["Subnet Mask", `${result.mask} (${result.binaryMask})`],
        ["Wildcard Mask", result.wildcard],
        ["First Usable", result.first],
        ["Last Usable", result.last],
        ["Usable Hosts", result.hosts.toLocaleString("en-US")],
        ["Total Addresses", result.total.toLocaleString("en-US")],
      ]
    : [];

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="IP Address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          fullWidth
          placeholder="192.168.1.10"
          slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
          sx={{ "& input": { fontFamily: "monospace" } }}
        />
        <TextField
          label="CIDR"
          type="number"
          value={cidr}
          onChange={(e) => setCidr(Number(e.target.value))}
          slotProps={{ htmlInput: { min: 0, max: 32, step: 1 } }}
          sx={{ minWidth: 120, "& input": { fontFamily: "monospace" } }}
        />
      </Stack>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
          Prefix length: /{cidr}
        </Typography>
        <Slider
          value={cidr}
          min={0}
          max={32}
          step={1}
          marks={[
            { value: 0, label: "/0" },
            { value: 8, label: "/8" },
            { value: 16, label: "/16" },
            { value: 24, label: "/24" },
            { value: 32, label: "/32" },
          ]}
          onChange={(_, v) => setCidr(v as number)}
          aria-label="CIDR prefix length"
        />
      </Box>
      {error && <Alert severity="error">Invalid input: {error}</Alert>}
      {!error && result && (
        <Box>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Subnet details
            </Typography>
            <Button
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={() => void import("@/lib/clipboard").then((m) => m.copyToClipboard(summary))}
            >
              Copy
            </Button>
          </Stack>
          <TableContainer sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
            <Table size="small" aria-label="Subnet calculation results">
              <TableBody>
                {rows.map(([label, value]) => (
                  <TableRow key={label}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 700, whiteSpace: "nowrap", width: 160 }}
                    >
                      {label}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "monospace", wordBreak: "break-all" }}>
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </ToolPaper>
  );
}
