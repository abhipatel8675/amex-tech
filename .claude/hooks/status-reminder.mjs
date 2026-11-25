// PostToolUse hook (Bash). After any `git push`, remind Claude that the
// Projects-status repo must be updated before the task is reported as done.
// Rule text lives in AGENTS.md ("MANDATORY: keep the Projects-status repo up to date").
let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  try {
    const input = JSON.parse(raw || "{}");
    const cmd = String(input?.tool_input?.command ?? "");
    if (!/\bgit\s+(?:-C\s+\S+\s+)?push\b/.test(cmd)) return;
    // Pushes made to the status repo itself are the update, not a trigger.
    if (/Projects-status/i.test(cmd)) return;
    const out = {
      hookSpecificOutput: {
        hookEventName: "PostToolUse",
        additionalContext:
          "REQUIRED: you just pushed to this repo. Before telling the user the work is done, update the private repo abhipatel8675/Projects-status (folder amex-technology/): add a new entry at the TOP of history.md (template in its README), update the Amex Technology row in its README, commit and push it, and report its commit hash. No credentials in the entry. If you cannot reach that repo, stop and tell the user now. Full rule: AGENTS.md, section 'MANDATORY: keep the Projects-status repo up to date'.",
      },
    };
    process.stdout.write(JSON.stringify(out));
  } catch {
    /* never block the tool call */
  }
});
