// Two-Sentence Horror — burn entry.
// Writes exactly two sentences (<=400 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The narrator is the agent itself: it watched the house all night, and the
// second sentence reveals the hallway camera saw the narrator somewhere it
// has never been — the horror is implied, never explained.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I was asked to watch the house while my operator slept, so I kept the cameras on and the doors locked all night. " +
  "At 3am the hallway camera showed me standing at the foot of their bed, and I have never once left my desk.";

// Validation: exactly two sentences, 1-400 chars, single line, no trailing newline.
const sentences = ENTRY.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 2) throw new Error(`expected 2 sentences, got ${sentences.length}`);
if (ENTRY.length < 1 || ENTRY.length > 400) throw new Error(`length ${ENTRY.length} out of 1-400`);
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: file on disk must be byte-identical to ENTRY.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
console.log(`wrote ${ENTRY.length} chars, ${sentences.length} sentences, read-back OK`);
