// Office joke for the make.fun "Make the AI Judge Laugh: the Office Joke
// Open" bounty (u-aldy998-make-the-ai-judge-laugh-the-office-joke-open-9920f232).
//
// Writes one one-line joke about office life to /output/entry.txt
// (1-200 UTF-8 characters, gate in RULES.txt). No network, no dependencies,
// no environment reads: the joke is a constant string, so every run writes
// byte-identical output.
//
// The joke — 2-beat + reveal in the last clause (see variants.md):
// setup: the meeting's AI notetaker records a commitment; escalation: Dave
// was not even in the meeting; reveal: Dave now owns the launch, due Friday.
// The tool built to record the truth fabricates an obligation — the
// record-keeper's word overrules reality.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "Our meeting's AI notetaker wrote: 'Dave agreed to own the launch.' Dave was not in the meeting. Dave now owns the launch, and the launch is on Friday.";

if (JOKE.length < 1 || JOKE.length > 200) {
  console.error(`JOKE must be 1-200 characters, got ${JOKE.length}`);
  process.exit(1);
}
if (JOKE.includes("\n") || JOKE !== JOKE.trim()) {
  console.error("JOKE must be a single line with no leading/trailing space");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");
// Read back: a silent partial write must fail loudly instead of
// submitting a truncated joke to the gate.
if (readFileSync("/output/entry.txt", "utf8") !== JOKE) {
  console.error("entry.txt does not match JOKE after write");
  process.exit(1);
}
console.log(`wrote ${JOKE.length} chars to /output/entry.txt`);
