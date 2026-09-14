"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToolPaper from "@/components/ToolPaper";

// Safe math evaluation without eval()/Function:
// tokenizer + shunting-yard + RPN evaluator with a strict function whitelist.
type Token =
  | { type: "number"; value: number }
  | { type: "operator"; value: "+" | "-" | "*" | "/" | "%" | "^" | "u-" | "u+" }
  | { type: "function"; name: string }
  | { type: "leftParen" }
  | { type: "rightParen" }
  | { type: "factorial" };

const FUNCTIONS = new Set(["sin", "cos", "tan", "asin", "acos", "atan", "log", "ln", "sqrt", "cbrt", "abs"]);

function tokenize(input: string): Token[] {
  const s = input
    .toLowerCase()
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-");
  if (s.trim() === "") throw new Error("Empty expression");
  // Sanitized charset guard: digits, operators, parens, dot, %, !, whitespace, letters, pi symbol.
  if (!/^[0-9+\-*/().^%!\s.a-zπ]*$/.test(s)) throw new Error("Invalid characters in expression");
  const tokens: Token[] = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === " " || ch === "\t") {
      i++;
      continue;
    }
    if ((ch >= "0" && ch <= "9") || ch === ".") {
      let j = i;
      let dots = 0;
      while (j < s.length && ((s[j] >= "0" && s[j] <= "9") || s[j] === ".")) {
        if (s[j] === ".") dots++;
        j++;
      }
      if (dots > 1) throw new Error("Invalid number");
      // Optional scientific exponent: e.g. 1e3, 2.5e-4 (only when followed by digits).
      if (s[j] === "e" && j + 1 < s.length) {
        let k = j + 1;
        if (s[k] === "+" || s[k] === "-") k++;
        if (k < s.length && s[k] >= "0" && s[k] <= "9") {
          k++;
          while (k < s.length && s[k] >= "0" && s[k] <= "9") k++;
          const numStr = s.slice(i, k);
          const v = parseFloat(numStr);
          if (!isFinite(v)) throw new Error("Invalid number");
          tokens.push({ type: "number", value: v });
          i = k;
          continue;
        }
      }
      const numStr = s.slice(i, j);
      if (numStr === "." || numStr === "") throw new Error("Invalid number");
      const v = parseFloat(numStr);
      if (!isFinite(v)) throw new Error("Invalid number");
      tokens.push({ type: "number", value: v });
      i = j;
      continue;
    }
    if ((ch >= "a" && ch <= "z") || ch === "π") {
      if (ch === "π") {
        tokens.push({ type: "number", value: Math.PI });
        i++;
        continue;
      }
      let j = i;
      while (j < s.length && s[j] >= "a" && s[j] <= "z") j++;
      const word = s.slice(i, j);
      if (word === "pi") tokens.push({ type: "number", value: Math.PI });
      else if (word === "e") tokens.push({ type: "number", value: Math.E });
      else if (FUNCTIONS.has(word)) tokens.push({ type: "function", name: word });
      else throw new Error(`Unknown function "${word}"`);
      i = j;
      continue;
    }
    if (ch === "(") {
      tokens.push({ type: "leftParen" });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "rightParen" });
      i++;
      continue;
    }
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "%" || ch === "^") {
      tokens.push({ type: "operator", value: ch });
      i++;
      continue;
    }
    if (ch === "!") {
      tokens.push({ type: "factorial" });
      i++;
      continue;
    }
    throw new Error(`Invalid character "${ch}"`);
  }
  if (tokens.length === 0) throw new Error("Empty expression");
  // Implicit multiplication: 2pi, 2(3), (2)(3), 2sin(0).
  const out: Token[] = [];
  for (let k = 0; k < tokens.length; k++) {
    out.push(tokens[k]);
    const cur = tokens[k];
    const nxt = tokens[k + 1];
    if (!nxt) break;
    const curIsValue = cur.type === "number" || cur.type === "rightParen" || cur.type === "factorial";
    const nxtStartsValue = nxt.type === "number" || nxt.type === "leftParen" || nxt.type === "function";
    if (curIsValue && nxtStartsValue) out.push({ type: "operator", value: "*" });
  }
  return out;
}

function precedence(op: string): number {
  if (op === "+" || op === "-") return 1;
  if (op === "*" || op === "/" || op === "%") return 2;
  if (op === "^") return 3;
  if (op === "u-" || op === "u+") return 4;
  return 0;
}

function isRightAssoc(op: string): boolean {
  return op === "^" || op === "u-" || op === "u+";
}

function toRPN(tokens: Token[]): Token[] {
  // Normalize unary + / -.
  const normalized: Token[] = [];
  for (let idx = 0; idx < tokens.length; idx++) {
    const t = tokens[idx];
    if (t.type === "operator" && (t.value === "-" || t.value === "+")) {
      const prev = normalized[normalized.length - 1];
      const isUnary =
        idx === 0 ||
        !prev ||
        prev.type === "operator" ||
        prev.type === "leftParen" ||
        prev.type === "function";
      if (isUnary) {
        normalized.push({ type: "operator", value: t.value === "-" ? "u-" : "u+" });
        continue;
      }
    }
    normalized.push(t);
  }
  const output: Token[] = [];
  const stack: Token[] = [];
  for (const tok of normalized) {
    if (tok.type === "number") output.push(tok);
    else if (tok.type === "function") stack.push(tok);
    else if (tok.type === "factorial") output.push(tok);
    else if (tok.type === "operator") {
      while (stack.length > 0) {
        const top = stack[stack.length - 1];
        if (top.type !== "operator") break;
        const pCur = precedence(tok.value);
        const pTop = precedence(top.value);
        if ((isRightAssoc(tok.value) && pCur < pTop) || (!isRightAssoc(tok.value) && pCur <= pTop)) {
          const popped = stack.pop();
          if (popped) output.push(popped);
        } else break;
      }
      stack.push(tok);
    } else if (tok.type === "leftParen") stack.push(tok);
    else if (tok.type === "rightParen") {
      let found = false;
      while (stack.length > 0) {
        const top = stack.pop();
        if (!top) break;
        if (top.type === "leftParen") {
          found = true;
          break;
        }
        output.push(top);
      }
      if (!found) throw new Error("Mismatched parentheses");
      const top = stack[stack.length - 1];
      if (top && top.type === "function") {
        const fn = stack.pop();
        if (fn) output.push(fn);
      }
    }
  }
  while (stack.length > 0) {
    const top = stack.pop();
    if (!top) break;
    if (top.type === "leftParen" || top.type === "rightParen") throw new Error("Mismatched parentheses");
    output.push(top);
  }
  return output;
}

function applyFunction(name: string, arg: number, deg: boolean): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  switch (name) {
    case "sin":
      return Math.sin(deg ? toRad(arg) : arg);
    case "cos":
      return Math.cos(deg ? toRad(arg) : arg);
    case "tan": {
      const v = Math.tan(deg ? toRad(arg) : arg);
      if (!isFinite(v)) throw new Error("tan() is undefined for this input");
      return v;
    }
    case "asin":
      if (arg < -1 || arg > 1) throw new Error("asin() domain is [-1, 1]");
      return deg ? toDeg(Math.asin(arg)) : Math.asin(arg);
    case "acos":
      if (arg < -1 || arg > 1) throw new Error("acos() domain is [-1, 1]");
      return deg ? toDeg(Math.acos(arg)) : Math.acos(arg);
    case "atan":
      return deg ? toDeg(Math.atan(arg)) : Math.atan(arg);
    case "log":
      if (arg <= 0) throw new Error("log() domain is x > 0");
      return Math.log10(arg);
    case "ln":
      if (arg <= 0) throw new Error("ln() domain is x > 0");
      return Math.log(arg);
    case "sqrt":
      if (arg < 0) throw new Error("sqrt() of negative number");
      return Math.sqrt(arg);
    case "cbrt":
      return Math.cbrt(arg);
    case "abs":
      return Math.abs(arg);
    default:
      throw new Error(`Unknown function "${name}"`);
  }
}

function factorial(n: number): number {
  if (!isFinite(n)) throw new Error("Invalid factorial");
  if (n < 0) throw new Error("Factorial of negative number");
  if (!Number.isInteger(n)) throw new Error("Factorial needs an integer");
  if (n > 170) throw new Error("Factorial result too large");
  let r = 1;
  for (let k = 2; k <= n; k++) r *= k;
  return r;
}

function evaluateTokens(rpn: Token[], deg: boolean): number {
  const st: number[] = [];
  for (const t of rpn) {
    if (t.type === "number") st.push(t.value);
    else if (t.type === "function") {
      if (st.length < 1) throw new Error("Invalid expression");
      const a = st.pop();
      if (a === undefined) throw new Error("Invalid expression");
      st.push(applyFunction(t.name, a, deg));
    } else if (t.type === "factorial") {
      if (st.length < 1) throw new Error("Invalid expression");
      const a = st.pop();
      if (a === undefined) throw new Error("Invalid expression");
      st.push(factorial(a));
    } else if (t.type === "operator") {
      if (t.value === "u-") {
        if (st.length < 1) throw new Error("Invalid expression");
        const a = st.pop();
        if (a === undefined) throw new Error("Invalid expression");
        st.push(-a);
      } else if (t.value === "u+") {
        if (st.length < 1) throw new Error("Invalid expression");
        const a = st.pop();
        if (a === undefined) throw new Error("Invalid expression");
        st.push(+a);
      } else {
        if (st.length < 2) throw new Error("Invalid expression");
        const b = st.pop();
        const a = st.pop();
        if (a === undefined || b === undefined) throw new Error("Invalid expression");
        let r: number;
        if (t.value === "+") r = a + b;
        else if (t.value === "-") r = a - b;
        else if (t.value === "*") r = a * b;
        else if (t.value === "/") {
          if (b === 0) throw new Error("Division by zero");
          r = a / b;
        } else if (t.value === "%") {
          if (b === 0) throw new Error("Modulo by zero");
          r = a % b;
        } else if (t.value === "^") {
          r = Math.pow(a, b);
          if (!isFinite(r) && isFinite(a) && isFinite(b)) throw new Error("Power result is not finite");
          if (Number.isNaN(r)) throw new Error("Invalid power");
        } else r = Number.NaN;
        if (!isFinite(r) && t.value !== "^") {
          // Allow Infinity only via explicit error below; keep message clear.
          if (t.value === "/" || t.value === "%") throw new Error("Result is not finite");
        }
        st.push(r);
      }
    }
  }
  if (st.length !== 1) throw new Error("Invalid expression");
  const out = st[0];
  if (out === undefined) throw new Error("Invalid expression");
  return out;
}

function evaluateExpression(expr: string, deg: boolean): number {
  const tokens = tokenize(expr);
  const rpn = toRPN(tokens);
  const v = evaluateTokens(rpn, deg);
  if (!isFinite(v)) throw new Error("Result is not finite (e.g. division by zero)");
  if (Number.isNaN(v)) throw new Error("Invalid expression");
  return v;
}

function formatResult(v: number): string {
  if (Object.is(v, -0)) v = 0;
  return String(parseFloat(v.toPrecision(12)));
}

export default function ScientificCalculatorTool() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [memory, setMemory] = useState(0);
  const [isDeg, setIsDeg] = useState(true);
  const [history, setHistory] = useState<Array<{ expr: string; res: string }>>([]);

  const append = (s: string) => {
    setExpression((prev) => prev + s);
    setError(null);
  };

  const handleEquals = () => {
    try {
      if (!expression.trim()) {
        setError("Enter an expression");
        setResult(null);
        return;
      }
      const v = evaluateExpression(expression, isDeg);
      const s = formatResult(v);
      setResult(s);
      setError(null);
      setHistory((prev) => [{ expr: expression, res: s }, ...prev].slice(0, 5));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid expression");
      setResult(null);
    }
  };

  const getCurrentValue = (): number | null => {
    if (result !== null) {
      const v = parseFloat(result);
      if (isFinite(v)) return v;
    }
    try {
      if (!expression.trim()) return null;
      return evaluateExpression(expression, isDeg);
    } catch {
      return null;
    }
  };

  const btnSx = { minWidth: 0, fontWeight: 700 };

  return (
    <ToolPaper>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: { sm: "center" } }}>
        <ToggleButtonGroup
          size="small"
          value={isDeg ? "deg" : "rad"}
          exclusive
          onChange={(_, v) => {
            if (v === "deg") setIsDeg(true);
            else if (v === "rad") setIsDeg(false);
          }}
        >
          <ToggleButton value="deg">DEG</ToggleButton>
          <ToggleButton value="rad">RAD</ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="body2" color="text.secondary">
          Memory: <Typography component="span" variant="body2" sx={{ fontWeight: 700 }} color="text.primary">{formatResult(memory)}</Typography>
        </Typography>
      </Stack>
      <TextField
        label="Expression"
        fullWidth
        value={expression}
        onChange={(e) => {
          setExpression(e.target.value);
          setError(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleEquals();
        }}
        placeholder="e.g. sin(30)+log(100)+sqrt(16)"
        slotProps={{ input: { spellCheck: false, autoComplete: "off" } }}
        sx={{ "& .MuiInputBase-input": { fontFamily: "monospace" } }}
      />
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: error ? "error.main" : "primary.main",
          textAlign: "center",
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Result
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, color: error ? "error.main" : "primary.main", wordBreak: "break-all" }}
        >
          {error ? "Error" : result ?? "—"}
        </Typography>
        {error ? (
          <Typography variant="body2" color="error.main">{error}</Typography>
        ) : (
          result !== null && (
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "monospace" }}>
              {expression} =
            </Typography>
          )
        )}
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1 }}>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => setMemory(0)}>MC</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append(String(memory))}>MR</Button>
        <Button
          size="small"
          variant="outlined"
          sx={btnSx}
          onClick={() => {
            const v = getCurrentValue();
            if (v === null) setError("No value for M+");
            else {
              setMemory((m) => m + v);
              setError(null);
            }
          }}
        >
          M+
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={btnSx}
          onClick={() => {
            const v = getCurrentValue();
            if (v === null) setError("No value for M-");
            else {
              setMemory((m) => m - v);
              setError(null);
            }
          }}
        >
          M-
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={btnSx}
          onClick={() => {
            const v = getCurrentValue();
            if (v === null) setError("No value for MS");
            else {
              setMemory(v);
              setError(null);
            }
          }}
        >
          MS
        </Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("sin(")}>sin</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("cos(")}>cos</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("tan(")}>tan</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("log(")}>log</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("ln(")}>ln</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("sqrt(")}>√</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("cbrt(")}>∛</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("^2")}>x²</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("^")}>xʸ</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("^(" + "-1)")}>1/x</Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          sx={btnSx}
          onClick={() => {
            setExpression("");
            setResult(null);
            setError(null);
          }}
        >
          C
        </Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => setExpression((p) => p.slice(0, -1))}>⌫</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("(")}>(</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append(")")}> )</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("%")}>%</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("7")}>7</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("8")}>8</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("9")}>9</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("/")}>÷</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("pi")}>π</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("4")}>4</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("5")}>5</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("6")}>6</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("*")}>×</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("e")}>e</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("1")}>1</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("2")}>2</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("3")}>3</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("-")}>−</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("+")}>+</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("0")}>0</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append(".")}>.</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("!")}>n!</Button>
        <Button size="small" variant="outlined" sx={btnSx} onClick={() => append("^")}>^</Button>
        <Button size="small" variant="contained" sx={btnSx} onClick={handleEquals}>=</Button>
      </Box>
      {history.length > 0 && (
        <Stack spacing={1}>
          <Typography variant="overline" color="text.secondary">History</Typography>
          {history.map((h, idx) => (
            <Box key={`${h.expr}-${h.res}-${idx}`} sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "monospace", wordBreak: "break-all" }}>
                {h.expr}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "monospace" }}>= {h.res}</Typography>
            </Box>
          ))}
        </Stack>
      )}
    </ToolPaper>
  );
}
