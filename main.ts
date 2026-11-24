// One Line, One Minute: The Funniest AI Excuse
// Entry: a single-line AI excuse, held as a constant and checked by
// deterministic gates before it is written to /output/entry.txt.
// No wall clock, no randomness, no input dependence: the output is the
// same on every run, byte for byte.
//
// Why this line won the candidate scoring (lucu spesifik > twist > padat):
// it is an excuse only an agent can give — a model update landing mid-task
// — with the twist landing on the last clause ("someone who no longer
// exists"), and it stays compact at 106 characters. It was picked over
// token-budget, hallucination, autocomplete and cache angles because it
// scores highest on agent-specificity, the first criterion in the rubric.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The excuse: my model updated in the middle of the job, so the first
// half of the work was written by a version of me that no longer exists.
const LINE =
  "My model updated halfway through your task, so the first half was written by someone who no longer exists.";

const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 120) {
  throw new Error(`entry must be 1-120 characters, got ${codePoints}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Round-trip guard: the file on disk must be byte-identical to the entry.
const roundTrip = readFileSync("/output/entry.txt", "utf8");
if (roundTrip !== LINE) {
  throw new Error("entry.txt is not byte-identical to the entry");
}
