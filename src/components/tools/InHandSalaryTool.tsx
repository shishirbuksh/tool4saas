
import { useMemo, useState } from "react";import { Box, Typography, Stack, Alert, Select, MenuItem, FormControl, InputLabel, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from "@/components/ds";

import { money } from "@/lib/format";
import { inHandIndia, INDIA_NEW_REGIME_FY26_27 } from "@/lib/finance-calc";
import ToolPaper from "@/components/ToolPaper";
import NumericField from "@/components/NumericField";

export default function InHandSalaryTool() {
  const [ctcAnnual, setCtcAnnual] = useState("");
  const [basicDaAnnual, setBasicDaAnnual] = useState("");
  const [ptMonthly, setPtMonthly] = useState("200");
  const [pfCapped, setPfCapped] = useState<boolean>(true);

  const result = useMemo(() => {
    const ctc = parseFloat(ctcAnnual);
    const basicDa = parseFloat(basicDaAnnual);
    const pt = ptMonthly.trim() === "" ? 0 : parseFloat(ptMonthly);
    if (!isFinite(ctc) || !isFinite(basicDa) || !isFinite(pt)) return null;
    return inHandIndia({ ctcAnnual: ctc, basicDaAnnual: basicDa, ptMonthly: pt, pfCapped });
  }, [ctcAnnual, basicDaAnnual, ptMonthly, pfCapped]);

  const row = (label: string, value: number | null | undefined) => (
    <Box className="flex justify-between gap-4">
      <Typography color="text.secondary">{label}</Typography>
      <Typography className="font-bold text-right">
        {value != null && isFinite(value) ? money(value, "INR") : "—"}
      </Typography>
    </Box>
  );

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <NumericField label="CTC (annual, ₹)" value={ctcAnnual} onChange={setCtcAnnual} />
        <NumericField label="Basic + DA (annual, ₹)" value={basicDaAnnual} onChange={setBasicDaAnnual} />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <NumericField label="Professional tax / month (₹)" value={ptMonthly} onChange={setPtMonthly} />
        <FormControl fullWidth>
          <InputLabel>PF calculation</InputLabel>
          <Select
            label="PF calculation"
            value={pfCapped ? "capped" : "actual"}
            onChange={(e) => setPfCapped(e.target.value === "capped")}
           
            className="min-h-[44px]"
          >
            <MenuItem value="capped">Capped (₹15,000 wage ceiling)</MenuItem>
            <MenuItem value="actual">Actual (full Basic + DA)</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          In-hand salary / month
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {result !== null && isFinite(result.inHandMonthly) ? money(result.inHandMonthly, "INR") : "—"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {result !== null && isFinite(result.inHandAnnual) ? `${money(result.inHandAnnual, "INR")} / year` : "Enter CTC and Basic + DA"}
        </Typography>
      </Box>
      <Stack spacing={1.5}>
        {row("Gross annual (CTC − employer PF)", result?.grossAnnual)}
        {row("Employee PF / year (12%)", result?.empPfAnnual)}
        {row("Professional tax / year", result?.ptAnnual)}
        {row("Taxable income (gross − ₹75k std. deduction)", result?.taxable)}
        {row("Slab tax", result?.slabTax)}
        {row("Rebate (87A / marginal relief)", result?.rebate)}
        {row("Health & education cess (4%)", result?.cess)}
        {row("Annual tax (incl. cess)", result?.annualTax)}
      </Stack>
      <Stack spacing={1}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Taxable slab</TableCell>
                <TableCell align="right">Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {INDIA_NEW_REGIME_FY26_27.map((s) => (
                <TableRow key={String(s.upTo)}>
                  <TableCell>{isFinite(s.upTo) ? `Up to ${money(s.upTo, "INR")}` : `Above ${money(2_400_000, "INR")}`}</TableCell>
                  <TableCell align="right">{s.rate * 100}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="caption" color="text.secondary">
          FY 2026-27 new-regime slabs with ₹75,000 standard deduction; 87A rebate up to ₹60,000 to ₹12L taxable
          (salaried zero-tax to ~₹12.75L).
        </Typography>
      </Stack>
      <Alert severity="warning">
        FY 2026-27 new-regime estimate only — excludes HRA, 80C/80D, employer ESI/gratuity variations and state PT
        slabs. Not tax advice. See /terms
      </Alert>
    </ToolPaper>
  );
}
