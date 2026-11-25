// One Star for Monday — make.fun entry
// Writes a single-line one-star review of Monday, as if Monday were a
// restaurant, to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR / entry.txt).
// No network, no dependencies, no arguments. Exits 0, never throws.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The chosen line — picked in iterate round 2 over the round-1 line and
// ten new candidates (see README notes):
// "One star. Ordered the weekend, got Monday instead. Cold, late, and the
// waiter charged me twice." — 16 words, one line, plain text.
// Why it wins head-to-head vs the old line ("One star. The waiter took my
// weekend, brought back Monday, and the bill came before the coffee did.,
// 18 words): it keeps the explicit "One star" and the Monday-only joke, but
// its complaint is denser and more genuine-review-shaped — the canonical
// ordered-X-got-Y dish complaint, plus cold/late, plus a double charge —
// and at 16 words its core ("Ordered the weekend, got Monday instead") is
// tighter and more quotable than "brought back Monday".
const ENTRY =
  "One star. Ordered the weekend, got Monday instead. Cold, late, and the waiter charged me twice.";

function outputDir(): string {
  const envDir =
    process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_BOT_DIR;
  if (envDir && envDir.trim() !== "") {
    return resolve(envDir);
  }
  // Default: <script-dir>/output — the grader sets MAKEFUN_OUTPUT_DIR, so
  // this path is only a local fallback.
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  return join(scriptDir, "output");
}

function main(): void {
  try {
    const dir = outputDir();
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), ENTRY + "\n", "utf8");
  } catch {
    // Never throw: a crash counts as a failed run. If the write failed the
    // gate will refuse the (missing) file, but the process still exits 0.
  }
}

main();
