
import { useEffect, useRef, useState } from "react";
import ToolPaper from "@/components/ToolPaper";import { Box, Button, TextField, Typography, Stack, Link } from "@/components/ds";


const DURATION_SEC = 60;

const SAMPLE_TEXTS: string[] = [
  "The quick brown fox jumps over the lazy dog near the quiet river bank.",
  "Typing fast takes practice, focus, and steady rhythm every single day.",
  "React makes it easy to build interactive user interfaces with components.",
  "A journey of a thousand miles begins with a single careful step forward.",
  "The sun rises in the east and sets in the west across the open sky.",
  "Consistency beats intensity when you want to improve any new skill.",
  "Open source software thrives when people share, review, and collaborate.",
  "Calm minds solve hard problems faster than hurried hands ever will.",
];

function pickRandomText(exclude?: string): string {
  if (SAMPLE_TEXTS.length === 0) return "";
  if (SAMPLE_TEXTS.length === 1) return SAMPLE_TEXTS[0];
  let next = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
  while (next === exclude) {
    next = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
  }
  return next;
}

export default function TypingSpeedTestTool() {
  const [sample, setSample] = useState<string>(SAMPLE_TEXTS[0]);
  const [input, setInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(DURATION_SEC);
  const [running, setRunning] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  const elapsedSec = DURATION_SEC - timeLeft;
  const elapsedMinutes = elapsedSec / 60;
  const typedChars = input.length;
  const wpm =
    elapsedMinutes > 0 && typedChars > 0
      ? Math.round(typedChars / 5 / elapsedMinutes)
      : 0;

  let correctChars = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === sample[i]) correctChars += 1;
  }
  const accuracy =
    typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;

  const start = () => {
    if (finished || running) return;
    if (startTime === null) setStartTime(Date.now());
    setRunning(true);
  };

  const reset = () => {
    setRunning(false);
    setFinished(false);
    setInput("");
    setStartTime(null);
    setTimeLeft(DURATION_SEC);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const newText = () => {
    const next = pickRandomText(sample);
    setSample(next);
    reset();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (finished || timeLeft <= 0) return;
    if (!running && startTime === null && value.length > 0) {
      setStartTime(Date.now());
      setRunning(true);
    }
    setInput(value.slice(0, sample.length));
  };

  return (
    <ToolPaper>
      <Stack spacing={2} className="items-center">
        <Typography
          variant="h2"
          className="font-extrabold tracking-[1px]" style={{ fontFamily: "monospace" }}
          aria-live="polite"
        >
          {timeLeft}s
        </Typography>
        <Box className="w-full h-[8px] rounded-[32px] bg-base-300 overflow-hidden">
          <Box
            className="h-full bg-primary" style={{ width: `${(elapsedSec / DURATION_SEC) * 100}%`, transition: "width 0.5s linear" }}
          />
        </Box>
        <Stack direction="row" spacing={2} className="flex-wrap justify-center">
          <Typography variant="body2" color="text.secondary">
            WPM: <strong>{wpm}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Accuracy: <strong>{accuracy}%</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Typed: <strong>{typedChars}</strong> / {sample.length}
          </Typography>
        </Stack>

        <Box
          className="w-full p-4 rounded-[16px] border border-base-300 bg-base-100 text-[1rem] leading-[1.8]" style={{ fontFamily: "monospace" }}
          aria-label="Text sample to type"
        >
          {sample.split("").map((ch, i) => {
            const typed = input[i];
            let color: string | undefined;
            let bg: string | undefined;
            if (typed === undefined) {
              color = undefined;
            } else if (typed === ch) {
              color = "success.main";
              bg = "success.light";
            } else {
              color = "error.main";
              bg = "error.light";
            }
            return (
              <Box
                key={i}
                component="span"
                className="rounded-[4px]" style={{ color: color, backgroundColor: bg, paddingLeft: "calc((bg ? 0.25 : 0) * 8px)", paddingRight: "calc((bg ? 0.25 : 0) * 8px)" }}
              >
                {ch}
              </Box>
            );
          })}
        </Box>

        <TextField
          label={finished ? "Time is up" : running ? "Keep typing…" : "Start typing to begin"}
          multiline
          minRows={3}
          fullWidth
          value={input}
          onChange={handleChange}
          disabled={finished || timeLeft <= 0}
          placeholder="Type the text above here…"
          slotProps={{ htmlInput: { maxLength: sample.length } }}
        />

        <Stack direction="row" spacing={1}>
          {!running ? (
            <Button variant="contained" onClick={start} disabled={finished || timeLeft <= 0}>
              Start
            </Button>
          ) : (
            <Button variant="contained" color="warning" onClick={() => setRunning(false)}>
              Pause
            </Button>
          )}
          <Button variant="outlined" onClick={newText}>
            New text
          </Button>
          <Button variant="text" onClick={reset}>
            Reset
          </Button>
        </Stack>

        {finished && (
          <Typography variant="h6" color="success.main" className="font-extrabold" aria-live="polite">
            Finished! {wpm} WPM · {accuracy}% accuracy
          </Typography>
        )}

        <Typography variant="caption" color="text.secondary" className="block pt-2">
          {finished
            ? "Looking to increase your words per minute? Read our "
            : "Benchmark your score: Learn standard WPM metrics and touch typing drills in our "}
          <Link href="/blog/word-counter-guide/typing-speed-test-practice-tips" underline="hover" color="primary">
            typing speed guide & practice tips
          </Link>.
        </Typography>
      </Stack>
    </ToolPaper>
  );
}
