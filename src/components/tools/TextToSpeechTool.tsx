"use client";

import { useEffect, useRef, useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function TextToSpeechTool() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const ref = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (!voice && v[0]) setVoice(v[0].name);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, [voice]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const supported = mounted && typeof window !== "undefined" && "speechSynthesis" in window;

  const speak = () => {
    if (!supported || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = voices.find((x) => x.name === voice);
    if (v) u.voice = v;
    u.rate = rate;
    u.pitch = pitch;
    ref.current = u;
    window.speechSynthesis.speak(u);
  };

  const stop = () => window.speechSynthesis.cancel();

  if (!mounted) return null;

  if (!supported) {
    return (
      <ToolPaper>
        <Typography color="text.secondary">
          Your browser does not support text-to-speech.
        </Typography>
      </ToolPaper>
    );
  }

  return (
    <ToolPaper>
      <Stack spacing={2}>
        <TextField
          label="Text to read aloud"
          multiline
          minRows={6}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste the text you want spoken…"
          slotProps={{ input: { spellCheck: true, autoComplete: "off" } }}
        />
        <FormControl fullWidth sx={{ maxWidth: 320 }}>
          <InputLabel id="voice-label">Voice</InputLabel>
          <Select
            labelId="voice-label"
            label="Voice"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            {voices.map((v) => (
              <MenuItem key={v.name} value={v.name}>
                {v.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ maxWidth: 320 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
            Rate: {rate.toFixed(1)}x
          </Typography>
          <Slider value={rate} min={0.5} max={2} step={0.1} onChange={(_, v) => setRate(Array.isArray(v) ? v[0] : v)} />
        </Box>
        <Box sx={{ maxWidth: 320 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
            Pitch: {pitch.toFixed(1)}
          </Typography>
          <Slider value={pitch} min={0} max={2} step={0.1} onChange={(_, v) => setPitch(Array.isArray(v) ? v[0] : v)} />
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={speak} disabled={!text}>
            Play
          </Button>
          <Button variant="outlined" onClick={stop}>
            Stop
          </Button>
        </Stack>
      </Stack>
    </ToolPaper>
  );
}
