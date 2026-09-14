"use client";

import { useEffect, useRef, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { copyToClipboard } from "@/lib/clipboard";

const LANGUAGES = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "es-ES", label: "Spanish (Spain)" },
  { value: "fr-FR", label: "French" },
  { value: "de-DE", label: "German" },
  { value: "hi-IN", label: "Hindi" },
  { value: "pt-BR", label: "Portuguese (Brazil)" },
  { value: "zh-CN", label: "Chinese (Simplified)" },
  { value: "ja-JP", label: "Japanese" },
];

type SpeechWindow = typeof window & {
  SpeechRecognition?: new () => any;
  webkitSpeechRecognition?: new () => any;
};

export default function SpeechToTextTool() {
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const recognitionRef = useRef<any | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop?.();
      } catch {
        // ignore cleanup errors
      }
      recognitionRef.current = null;
    };
  }, []);

  const supported =
    mounted &&
    typeof window !== "undefined" &&
    Boolean(
      (window as unknown as SpeechWindow).SpeechRecognition ||
        (window as unknown as SpeechWindow).webkitSpeechRecognition
    );

  const start = () => {
    if (typeof window === "undefined") return;
    const w = window as unknown as SpeechWindow;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;

    try {
      recognitionRef.current?.stop?.();
    } catch {
      // ignore stop errors for previous session
    }

    setError("");
    setInterim("");

    const rec = new SR();
    rec.lang = language;
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (event: any) => {
      let finalText = "";
      let interimText = "";
      const results = event.results as ArrayLike<any> & { length: number };
      const startIndex: number =
        typeof event.resultIndex === "number" ? event.resultIndex : 0;
      for (let i = startIndex; i < results.length; i++) {
        const result = (results as unknown as Record<number, any>)[i];
        const alt = result?.[0]?.transcript ?? "";
        if (result?.isFinal) {
          finalText += alt;
        } else {
          interimText += alt;
        }
      }
      if (finalText) {
        setTranscript((prev) => {
          const sep = prev && !prev.endsWith(" ") && !finalText.startsWith(" ") ? " " : "";
          return prev + sep + finalText;
        });
      }
      setInterim(interimText);
    };

    rec.onerror = (event: any) => {
      const code: string = event?.error ?? "unknown";
      if (code === "not-allowed" || code === "service-not-allowed") {
        setError("Microphone access was blocked. Allow microphone permissions and try again.");
      } else if (code === "no-speech") {
        setError("No speech was detected. Try speaking closer to the microphone.");
      } else if (code === "audio-capture") {
        setError("No microphone was found. Check your audio input device.");
      } else {
        setError(`Recognition error: ${code}`);
      }
      setListening(false);
      setInterim("");
    };

    rec.onend = () => {
      setListening(false);
      setInterim("");
    };

    recognitionRef.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      setError("Could not start speech recognition. Try again.");
      setListening(false);
    }
  };

  const stop = () => {
    try {
      recognitionRef.current?.stop?.();
    } catch {
      // ignore stop errors
    }
    setListening(false);
    setInterim("");
  };

  const handleClear = () => {
    setTranscript("");
    setInterim("");
    setError("");
  };

  const handleCopy = () => {
    if (transcript) void copyToClipboard(transcript);
  };

  const handleDownload = () => {
    if (!transcript) return;
    const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = "transcript.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  };

  if (!mounted) return null;

  if (!supported) {
    return (
      <ToolPaper>
        <Alert severity="warning">
          Your browser does not support speech recognition. Try Chrome or Edge on desktop.
        </Alert>
      </ToolPaper>
    );
  }

  const displayValue = transcript + (interim ? (transcript ? " " : "") + interim : "");

  return (
    <ToolPaper>
      <Stack spacing={2}>
        <FormControl fullWidth sx={{ maxWidth: 320 }}>
          <InputLabel id="stt-language-label">Language</InputLabel>
          <Select
            labelId="stt-language-label"
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={listening}
          >
            {LANGUAGES.map((l) => (
              <MenuItem key={l.value} value={l.value}>
                {l.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<MicIcon />}
            onClick={start}
            disabled={listening}
          >
            Start
          </Button>
          <Button
            variant="outlined"
            startIcon={<StopIcon />}
            onClick={stop}
            disabled={!listening}
          >
            Stop
          </Button>
        </Stack>

        {error && <Alert severity="error">{error}</Alert>}

        {listening && (
          <Alert severity="info">
            Listening{language ? ` (${language})` : ""}… speak now.
            {interim ? ` “${interim}”` : ""}
          </Alert>
        )}

        <Box>
          <TextField
            label="Transcript"
            multiline
            minRows={6}
            fullWidth
            value={displayValue}
            onChange={(e) => {
              setTranscript(e.target.value);
              setInterim("");
            }}
            placeholder="Press Start and speak — your words will appear here…"
            slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
            {transcript.trim() ? `${transcript.trim().split(/\s+/).length} words` : "Nothing captured yet"}
            {interim ? " — showing live interim results" : ""}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopy}
            disabled={!transcript}
          >
            Copy
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            disabled={!transcript}
          >
            Download TXT
          </Button>
          <Button
            variant="text"
            startIcon={<DeleteIcon />}
            onClick={handleClear}
            disabled={!transcript && !interim}
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </ToolPaper>
  );
}
