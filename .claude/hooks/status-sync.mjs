// PostToolUse hook (Bash). After a successful `git push` of this repo, automatically
// record the pushed commits in the private handover repo abhipatel8675/Projects-status
// (folder amex-technology/): a baseline entry at the top of history.md plus the
// "Last session" date in README.md, committed and pushed straight to GitHub.
//
// Authorised by the project owner ("update it there on push, no permission needed").
// Rule text: AGENTS.md, "MANDATORY: keep the Projects-status repo up to date".
// The baseline holds only commit hashes, subjects and file names (no secrets).
// Whoever pushed should still enrich the entry (Picking up here / Next step).
//
// Set STATUS_SYNC_DRY=1 to print the entry instead of pushing.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const STATUS_REPO = "abhipatel8675/Projects-status";
const FOLDER = "amex-technology";
const DRY = process.env.STATUS_SYNC_DRY === "1";

function run(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts }).trim();
}
function reply(additionalContext) {
  process.stdout.write(
    JSON.stringify({ hookSpecificOutput: { hookEventName: "PostToolUse", additionalContext } }),
  );
}

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  try {
    main(JSON.parse(raw || "{}"));
  } catch (e) {
    reply(
      `The automatic Projects-status sync FAILED (${String(e.message || e).split("\n")[0]}). ` +
        `Do it manually now, directly, without asking: follow AGENTS.md "MANDATORY: keep the Projects-status repo up to date", and tell the user if you cannot.`,
    );
  }
});

function main(input) {
  const cmd = String(input?.tool_input?.command ?? "");
  if (!/\bgit\s+(?:-C\s+\S+\s+)?push\b/.test(cmd)) return;
  if (/Projects-status/i.test(cmd)) return; // pushes to the status repo are the update itself
  const resp = JSON.stringify(input?.tool_response ?? "");
  if (/rejected|failed to push|\\"is_error\\":true|fatal:|error: failed/i.test(resp)) return; // push did not go through

  const origin = run("git", ["remote", "get-url", "origin"]);
  if (!/amex-tech(\.git)?$/i.test(origin)) return; // another repo
  const branch = run("git", ["rev-parse", "--abbrev-ref", "HEAD"]);

  // Working copy of the status repo (temp folder, never inside this repo)
  const dir = path.join(os.tmpdir(), "projects-status-sync");
  if (fs.existsSync(path.join(dir, ".git"))) {
    run("git", ["-C", dir, "pull", "--rebase", "-q"]);
  } else {
    fs.rmSync(dir, { recursive: true, force: true });
    run("gh", ["repo", "clone", STATUS_REPO, dir, "--", "-q"]);
  }
  const histPath = path.join(dir, FOLDER, "history.md");
  const readmePath = path.join(dir, "README.md");
  const hist = fs.readFileSync(histPath, "utf8").replace(/\r\n/g, "\n");
  const known = hist.slice(0, 60000);

  // Commits not yet mentioned in the log, newest first; stop at the first known one
  const log = run("git", ["log", "-30", "--format=%h%x09%s"]).split("\n").map((l) => l.split("\t"));
  const fresh = [];
  for (const [h, s] of log) {
    if (known.includes(h)) break;
    fresh.push([h, s]);
  }
  if (!fresh.length) {
    reply("Projects-status: nothing new to record (these commits are already in amex-technology/history.md). Enrich the latest entry only if it lacks 'Picking up here' / 'Next step'.");
    return;
  }

  const oldest = fresh[fresh.length - 1][0];
  const newest = fresh[0][0];
  let files = [];
  try {
    files = run("git", ["diff", "--name-only", `${oldest}~1`, newest]).split("\n").filter(Boolean);
  } catch {
    /* first commit or shallow history */
  }
  files = files.filter((f) => !/(^|\/)\.env|secret|credential|\.pem$|\.key$/i.test(f));
  const shown = files.slice(0, 25).map((f) => `\`${f}\``).join(", ");
  const more = files.length > 25 ? ` and ${files.length - 25} more` : "";

  const today = new Date().toISOString().slice(0, 10);
  const subject = fresh[0][1].replace(/\s+/g, " ").slice(0, 110);
  const entry =
    `## ${today} — auto — ${subject}\n\n` +
    `**Repo:** \`abhipatel8675/amex-tech\` · **Branch:** \`${branch}\` · **Commits (newest first):** ` +
    fresh.map(([h]) => `\`${h}\``).join(", ") +
    `. ${branch === "main" ? "**Pushed to `main`, so Vercel auto-deploys to production.**" : "Not on `main`, so not deployed to production."}\n\n` +
    `**What changed:**\n` +
    fresh.map(([h, s]) => `- \`${h}\` ${s}`).join("\n") +
    `\n\n**Files:** ${shown || "n/a"}${more}\n\n` +
    `_Recorded automatically by the push hook (\`.claude/hooks/status-sync.mjs\`). The person or Claude session that pushed should add Picking up here, Next step and anything not obvious from the commits._\n\n`;

  if (DRY) {
    process.stdout.write(entry);
    return;
  }

  const marker = "**Newest entry at the top.**\n\n";
  if (!hist.includes(marker)) throw new Error("history.md marker not found");
  fs.writeFileSync(histPath, hist.replace(marker, marker + entry));

  // README table: Last session date for the Amex Technology row
  let readme = fs.readFileSync(readmePath, "utf8").replace(/\r\n/g, "\n");
  readme = readme.replace(
    /^(\| Amex Technology \| \[amex-technology\/\]\(amex-technology\/\) \| )(\S+)( \| )/m,
    `$1${today}$3`,
  );
  fs.writeFileSync(readmePath, readme);

  run("git", ["-C", dir, "add", "-A"]);
  run("git", ["-C", dir, "commit", "-q", "-m", `amex-technology: auto-record push ${newest} (${today})`]);
  try {
    run("git", ["-C", dir, "push", "-q"]);
  } catch {
    run("git", ["-C", dir, "pull", "--rebase", "-q"]);
    run("git", ["-C", dir, "push", "-q"]);
  }
  const statusHash = run("git", ["-C", dir, "rev-parse", "--short", "HEAD"]);
  reply(
    `Projects-status was updated automatically on GitHub (${STATUS_REPO}, commit ${statusHash}): a baseline entry for ${fresh.map(([h]) => h).join(", ")} is at the top of ${FOLDER}/history.md. ` +
      `Now enrich that entry directly, without asking anyone: pull the repo, add Picking up here / Next step / Decisions / Do not touch, update the README row's heads-up text if the state changed, push, and report the final commit hash. Never write credentials.`,
  );
}
