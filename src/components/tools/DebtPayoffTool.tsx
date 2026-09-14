"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { money } from "@/lib/format";
import { simulatePayoff, type PayoffDebt } from "@/lib/finance-calc";
import ToolPaper from "@/components/ToolPaper";
import NumericField from "@/components/NumericField";

const CURRENCIES = ["USD", "INR"] as const;
const MAX_DEBTS = 8;

type DebtRow = { name: string; balance: string; apr: string; min: string };

const defaultDebts = (): DebtRow[] => [
  { name: "Card A", balance: "5000", apr: "24", min: "150" },
  { name: "Card B", balance: "2500", apr: "18", min: "75" },
  { name: "Loan", balance: "10000", apr: "12", min: "200" },
];

const fmtTerm = (months: number): string => `${Math.floor(months / 12)}y ${months % 12}m (${months} months)`;

function StrategyCard({
  title,
  months,
  interest,
  paid,
  order,
  currency,
  highlight,
}: {
  title: string;
  months: number | null;
  interest: number | null;
  paid: number | null;
  order: string[];
  currency: string;
  highlight?: boolean;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, flex: 1, borderColor: highlight ? "success.main" : undefined, borderWidth: highlight ? 2 : 1 }}
    >
      <Stack spacing={1}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Debt-free in</Typography>
          <Typography sx={{ fontWeight: 700 }}>{months !== null ? fmtTerm(months) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Total interest</Typography>
          <Typography sx={{ fontWeight: 700 }}>{interest !== null ? money(interest, currency) : "—"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Total paid</Typography>
          <Typography sx={{ fontWeight: 700 }}>{paid !== null ? money(paid, currency) : "—"}</Typography>
        </Box>
        <Divider />
        <Typography variant="overline" color="text.secondary">
          Payoff order
        </Typography>
        {order.length > 0 ? (
          <Stack component="ol" spacing={0.5} sx={{ m: 0, pl: 3 }}>
            {order.map((name, i) => (
              <Typography component="li" key={`${name}-${i}`} variant="body2">
                {i + 1}. {name}
              </Typography>
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            —
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}

export default function DebtPayoffTool() {
  const [debts, setDebts] = useState<DebtRow[]>(defaultDebts);
  const [extraMonthly, setExtraMonthly] = useState("100");
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");

  const updateDebt = (i: number, patch: Partial<DebtRow>) =>
    setDebts((ls) => ls.map((d, idx) => (idx === i ? { ...d, ...patch } : d)));
  const addDebt = () =>
    setDebts((ls) =>
      ls.length >= MAX_DEBTS ? ls : [...ls, { name: `Debt ${ls.length + 1}`, balance: "", apr: "", min: "" }],
    );
  const removeDebt = (i: number) => setDebts((ls) => (ls.length > 1 ? ls.filter((_, idx) => idx !== i) : ls));

  const parsed = useMemo<PayoffDebt[] | null>(() => {
    const out: PayoffDebt[] = [];
    for (const d of debts) {
      const balance = parseFloat(d.balance);
      const aprPct = parseFloat(d.apr);
      const minPayment = parseFloat(d.min);
      if (!isFinite(balance) || !isFinite(aprPct) || !isFinite(minPayment)) return null;
      out.push({ name: d.name.trim() || "Debt", balance, aprPct, minPayment });
    }
    return out;
  }, [debts]);

  const extra = extraMonthly.trim() === "" ? 0 : parseFloat(extraMonthly);

  const snowball = useMemo(
    () => (parsed && isFinite(extra) && extra >= 0 ? simulatePayoff(parsed, extra, "snowball") : null),
    [parsed, extra],
  );
  const avalanche = useMemo(
    () => (parsed && isFinite(extra) && extra >= 0 ? simulatePayoff(parsed, extra, "avalanche") : null),
    [parsed, extra],
  );

  const neverPaysOff = snowball?.neverPaysOff || avalanche?.neverPaysOff;
  const interestSaved =
    snowball && avalanche && !snowball.neverPaysOff && !avalanche.neverPaysOff
      ? snowball.totalInterest - avalanche.totalInterest
      : null;

  const exportCsv = () => {
    if (!parsed || !snowball || !avalanche) return;
    const lines = [
      "Debt,Balance,APR (%),Min payment",
      ...parsed.map((d) => [`"${d.name}"`, d.balance, d.aprPct, d.minPayment].join(",")),
      "",
      `Extra monthly,${extra}`,
      "",
      "Strategy,Months,Total interest,Total paid,Payoff order",
      `Snowball,${snowball.months},${snowball.totalInterest.toFixed(2)},${snowball.totalPaid.toFixed(2)},"${snowball.order.join(" > ")}"`,
      `Avalanche,${avalanche.months},${avalanche.totalInterest.toFixed(2)},${avalanche.totalPaid.toFixed(2)},"${avalanche.order.join(" > ")}"`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "debt-payoff.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPaper>
      <FormControl fullWidth>
        <InputLabel>Currency</InputLabel>
        <Select
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as typeof currency)}
          MenuProps={{ slotProps: { paper: { sx: { bgcolor: "background.paper", color: "text.primary" } } } }}
          sx={{ minHeight: 44 }}
        >
          {CURRENCIES.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack spacing={2}>
        {debts.map((d, i) => (
          <Paper key={i} variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1 }}>
                  Debt {i + 1}
                </Typography>
                <IconButton aria-label={`Remove debt ${i + 1}`} size="small" onClick={() => removeDebt(i)} disabled={debts.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <TextField
                label="Name"
                fullWidth
                value={d.name}
                onChange={(e) => updateDebt(i, { name: e.target.value })}
                placeholder="Card A…"
                slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
                sx={{ "& .MuiInputBase-root": { minHeight: 44 } }}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <NumericField label="Balance" value={d.balance} onChange={(v) => updateDebt(i, { balance: v })} />
                <NumericField label="APR (%)" value={d.apr} onChange={(v) => updateDebt(i, { apr: v })} />
                <NumericField label="Min payment" value={d.min} onChange={(v) => updateDebt(i, { min: v })} />
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={addDebt} disabled={debts.length >= MAX_DEBTS}>
        Add debt ({debts.length}/{MAX_DEBTS})
      </Button>
      <NumericField label="Extra per month" value={extraMonthly} onChange={setExtraMonthly} />
      {parsed === null || !isFinite(extra) || extra < 0 ? (
        <Alert severity="warning">Enter a valid balance, APR, and minimum payment for every debt.</Alert>
      ) : (
        <>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <StrategyCard
              title="Snowball (smallest balance first)"
              months={snowball && !snowball.neverPaysOff ? snowball.months : null}
              interest={snowball && !snowball.neverPaysOff ? snowball.totalInterest : null}
              paid={snowball && !snowball.neverPaysOff ? snowball.totalPaid : null}
              order={snowball ? snowball.order : []}
              currency={currency}
            />
            <StrategyCard
              title="Avalanche (highest APR first)"
              months={avalanche && !avalanche.neverPaysOff ? avalanche.months : null}
              interest={avalanche && !avalanche.neverPaysOff ? avalanche.totalInterest : null}
              paid={avalanche && !avalanche.neverPaysOff ? avalanche.totalPaid : null}
              order={avalanche ? avalanche.order : []}
              currency={currency}
              highlight={interestSaved !== null && interestSaved > 0}
            />
          </Stack>
          {interestSaved !== null && interestSaved > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Chip
                color="success"
                label={`Avalanche saves ${money(interestSaved, currency)} in interest vs snowball`}
              />
            </Box>
          )}
          {neverPaysOff && (
            <Alert severity="error">
              These debts never pay off with the current minimums — monthly interest equals or exceeds your
              total payment. Raise a minimum payment or add an extra monthly amount.
            </Alert>
          )}
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={exportCsv}>
            Export CSV
          </Button>
        </>
      )}
      <Alert severity="info">
        For illustration only — not financial advice. Assumes fixed APRs, no new charges or fees, and that
        freed-up minimums roll into the next priority debt. Actual payoff depends on your lender terms. See
        /terms
      </Alert>
    </ToolPaper>
  );
}
