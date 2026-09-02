"use client";

import { useState } from "react";
import ToolPaper from "@/components/ToolPaper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const PASSPHRASE_WORDS = [
  "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa",
  "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon",
  "phi", "chi", "psi", "omega", "ace", "king", "queen", "jack",
  "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew",
  "ice", "juice", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya",
  "quince", "raspberry", "strawberry", "tangerine", "umber", "vanilla", "watermelon", "xigua",
  "bacon", "cheese", "burger", "pizza", "pasta", "bread", "toast", "salad", "soup", "stew",
  "coffee", "water", "soda", "wine", "beer", "whiskey", "vodka", "rum", "gin", "tequila",
  "plane", "train", "car", "boat", "ship", "bike", "bus", "truck", "van", "motorcycle",
  "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white",
  "dog", "cat", "bird", "fish", "snake", "lizard", "frog", "turtle", "hamster", "mouse",
  "mountain", "river", "ocean", "lake", "forest", "desert", "valley", "hill", "island", "cave",
  "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse",
  "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act",
  "action", "actor", "actress", "actual", "adapt", "add", "addict", "address", "adjust", "admit",
  "adult", "advance", "advice", "aerobic", "affair", "afford", "afraid", "again", "age", "agent",
  "agree", "ahead", "aim", "air", "airport", "aisle", "alarm", "album", "alcohol", "alert",
  "alien", "all", "alley", "allow", "almost", "alone", "alpha", "already", "also", "alter",
  "always", "amateur", "amazing", "among", "amount", "amused", "analyst", "anchor", "ancient", "anger",
  "angle", "angry", "animal", "ankle", "announce", "annual", "another", "answer", "antenna", "antique",
  "anxiety", "any", "apart", "apology", "appear", "apple", "approve", "april", "arch", "arctic",
  "area", "arena", "argue", "arm", "armed", "armor", "army", "around", "arrange", "arrest",
  "arrive", "arrow", "art", "artefact", "artist", "artwork", "ask", "aspect", "assault", "asset",
  "assist", "assume", "asthma", "athlete", "atom", "attack", "attend", "attitude", "attract", "auction",
  "audit", "august", "aunt", "author", "auto", "autumn", "average", "avocado", "avoid", "awake",
  "aware", "away", "awesome", "awful", "awkward", "axis", "baby", "bachelor", "bacon", "badge",
  "bag", "balance", "balcony", "ball", "bamboo", "banana", "banner", "bar", "barely", "bargain",
  "barrel", "base", "basic", "basket", "battle", "beach", "bean", "beauty", "because", "become",
  "beef", "before", "begin", "behave", "behind", "believe", "below", "belt", "bench", "benefit"
];

export default function RandomPassphraseTool() {
  const [count, setCount] = useState("3");
  const [passphrase, setPassphrase] = useState("");
  const copy = (v: string) => v && void import("@/lib/clipboard").then(m=>m.copyToClipboard(v));

  const generate = () => {
    const c = Math.max(1, Math.min(7, parseInt(count, 10) || 3));
    const words = [...PASSPHRASE_WORDS];
    
    for (let i = words.length - 1; i > 0; i--) {
      const range = i + 1;
      const maxSafe = Math.floor(0xFFFFFFFF / range) * range;
      const randomBuffer = new Uint32Array(1);
      
      do {
        window.crypto.getRandomValues(randomBuffer);
      } while (randomBuffer[0] >= maxSafe);
      
      const j = randomBuffer[0] % range;
      [words[i], words[j]] = [words[j], words[i]];
    }
    
    const selected = words.slice(0, c);
    setPassphrase(selected.join(" "));
  };

  return (
    <ToolPaper>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Number of words"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            slotProps={{ input: { inputMode: "numeric", spellCheck: false, autoComplete: "off" } }}
          />
          <Button variant="contained" onClick={generate}>
            Generate passphrase
          </Button>
        </Stack>
        {passphrase && (
          <Stack spacing={1}>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Passphrase
              </Typography>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(passphrase)}>
                Copy
              </Button>
            </Stack>
            <Typography variant="body2">{passphrase}</Typography>
          </Stack>
        )}
      </ToolPaper>
  );
}