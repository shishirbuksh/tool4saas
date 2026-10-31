
import { useMemo, useState } from "react";import { Box, Typography, Stack, Alert, Select, MenuItem, FormControl, InputLabel, Chip } from "@/components/ds";

import { money } from "@/lib/format";
import { calcIndiaCG } from "@/lib/finance-calc";
import ToolPaper from "@/components/ToolPaper";
import NumericField from "@/components/NumericField";

type Asset = "equity" | "property" | "gold";

const SLAB_OPTIONS = [0, 5, 10, 15, 20, 30] as const;

export default function CapitalGainsTool() {
  const [asset, setAsset] = useState<Asset>("equity");
  const [buyPrice, setBuyPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [expenses, setExpenses] = useState("");
  const [holdingMonths, setHoldingMonths] = useState("15");
  const [slabRate, setSlabRate] = useState<string>("30");
  const [equityExemptionUsed, setEquityExemptionUsed] = useState("");

  const result = useMemo(() => {
    const buy = parseFloat(buyPrice);
    const sale = parseFloat(salePrice);
    const holding = parseFloat(holdingMonths);
    const slab = parseFloat(slabRate);
    const exp = expenses.trim() === "" ? 0 : parseFloat(expenses);
    const used = equityExemptionUsed.trim() === "" ? 0 : parseFloat(equityExemptionUsed);
    if (!isFinite(buy) || !isFinite(sale) || !isFinite(holding) || !isFinite(slab)) return null;
    if (!isFinite(exp) || !isFinite(used)) return null;
    return calcIndiaCG({
      asset,
      buyPrice: buy,
      salePrice: sale,
      expenses: exp,
      holdingMonths: Math.floor(holding),
      slabRatePct: slab,
      equityExemptionUsed: used,
    });
  }, [asset, buyPrice, salePrice, expenses, holdingMonths, slabRate, equityExemptionUsed]);

  const slabDisabled = asset === "equity";
  const effectivePct =
    result !== null && result.gain > 0 && isFinite(result.totalTax) ? (result.totalTax / result.gain) * 100 : null;

  return (
    <ToolPaper>
      <FormControl fullWidth>
        <InputLabel>Asset type</InputLabel>
        <Select
          label="Asset type"
          value={asset}
          onChange={(e) => setAsset(e.target.value as Asset)}
         
          className="min-h-[44px]"
        >
          <MenuItem value="equity">Listed equity</MenuItem>
          <MenuItem value="property">Property</MenuItem>
          <MenuItem value="gold">Gold</MenuItem>
        </Select>
      </FormControl>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <NumericField label="Buy price (₹)" value={buyPrice} onChange={setBuyPrice} />
        <NumericField label="Sale price (₹)" value={salePrice} onChange={setSalePrice} />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <NumericField label="Transfer expenses (₹)" value={expenses} onChange={setExpenses} />
        <NumericField label="Holding (months)" value={holdingMonths} onChange={setHoldingMonths} />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth disabled={slabDisabled}>
          <InputLabel>Slab rate (STCG)</InputLabel>
          <Select
            label="Slab rate (STCG)"
            value={slabRate}
            onChange={(e) => setSlabRate(e.target.value)}
           
            className="min-h-[44px]"
          >
            {SLAB_OPTIONS.map((o) => (
              <MenuItem key={o} value={String(o)}>
                {o}%
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {asset === "equity" ? (
          <NumericField
            label="Equity exemption already used (₹)"
            value={equityExemptionUsed}
            onChange={setEquityExemptionUsed}
            helperText="₹1.25L LTCG exemption / year"
          />
        ) : (
          <Box className="flex-1 flex items-center">
            <Typography variant="caption" color="text.secondary">
              Slab applies only to property / gold STCG. LTCG is flat 12.5% + 4% cess.
            </Typography>
          </Box>
        )}
      </Stack>
      {asset !== "equity" && (
        <Typography variant="caption" color="text.secondary">
          Equity STCG 20% · LTCG 12.5% above ₹1.25L · Property / gold LTCG 12.5% · Holding: equity &gt; 12 mo,
          property / gold &gt; 24 mo.
        </Typography>
      )}
      <Box
        className="p-4 rounded-[16px] border border-primary text-center"
      >
        <Typography variant="overline" color="text.secondary">
          Estimated capital gains tax
        </Typography>
        <Typography variant="h3" className="font-extrabold text-primary">
          {result !== null && isFinite(result.totalTax) ? money(result.totalTax, "INR") : "—"}
        </Typography>
        <Stack direction="row" spacing={1} className="mt-2 justify-center">
          {result !== null ? (
            <>
              <Chip
                label={result.isLongTerm ? "LTCG" : "STCG"}
                color={result.isLongTerm ? "success" : "warning"}
                size="small"
              />
              <Chip label={`${result.ratePct}% + 4% cess`} variant="outlined" size="small" />
            </>
          ) : (
            <Chip label="Enter buy, sale & holding" variant="outlined" size="small" />
          )}
        </Stack>
      </Box>
      <Stack spacing={1.5}>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Capital gain</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.gain) ? money(result.gain, "INR") : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Taxable gain</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.taxableGain) ? money(result.taxableGain, "INR") : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">
            Base tax{result !== null ? ` (${result.ratePct}%)` : ""}
          </Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.baseTax) ? money(result.baseTax, "INR") : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Cess (4%)</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.cess) ? money(result.cess, "INR") : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Net proceeds</Typography>
          <Typography className="font-bold">
            {result !== null && isFinite(result.netProceeds) ? money(result.netProceeds, "INR") : "—"}
          </Typography>
        </Box>
        <Box className="flex justify-between">
          <Typography color="text.secondary">Effective rate on gain</Typography>
          <Typography className="font-bold">
            {effectivePct !== null && isFinite(effectivePct) ? `${effectivePct.toFixed(2)}%` : "—"}
          </Typography>
        </Box>
      </Stack>
      <Alert severity="warning">
        Simplified FY 2025-26 estimate only — no indexation, surcharge, or special cases. Verify with a CA before
        filing.
      </Alert>
    </ToolPaper>
  );
}
