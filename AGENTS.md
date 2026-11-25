<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-status-rule -->
# MANDATORY: keep the Projects-status repo up to date

This project's handover log lives in the private GitHub repo
**`abhipatel8675/Projects-status`**, folder **`amex-technology/`**
(`history.md` is the log, newest entry at the **top**; `overview.md` and `plan.md` are context).
Other people and other Claude sessions pick this project up from there, so it must never fall behind the code.

**Rule: any time you push a change to this repo (any branch), you must update the status repo in the same session, before you tell the user the work is done.** This applies to every session, every account and every model, with no exceptions for "small" changes. A push without a matching status entry is an unfinished task.

How:

1. Clone or pull `abhipatel8675/Projects-status` (`git pull` first, always; three people append to the same file). Use a temp or scratch folder, never inside this repo.
2. Add a new entry at the **top** of `amex-technology/history.md`, below the "Newest entry at the top" line, using the template in that repo's `README.md`: heading `## YYYY-MM-DD — <who> + Claude — <one-line topic>`, then **Repo/Branch/Commits** (with the pushed commit hashes), **What changed**, **Picking up here**, **Next step**, **Blocked on**, **Decisions made**, **Do not touch**. Leave out empty sections. Do not pad it.
3. Update the **Amex Technology** row in that repo's `README.md` table (Last session date, and the "Heads-up" text if the state of `main`, deploys, branches or open items changed).
4. Update `amex-technology/overview.md` or `plan.md` too if the change makes them wrong.
5. Commit and push in the status repo: `git add -A && git commit -m "amex-technology: <what you did>" && git push`.
6. Say in your final message that the status repo was updated, with its commit hash.

Rules for the entry:
- **Never write credentials, keys, tokens, passwords or secret values**, not even inside a quoted error message. Env key names are the ceiling.
- State plainly what is live vs only pushed vs only local (Vercel deploys production on every push to `main`).
- If you cannot reach the status repo (no access, offline, push denied), **stop and tell the user immediately** and leave the full entry text in your reply so they can paste it. Never skip this step silently.
- If the push to this repo is also what you are doing (for example editing this file), the same rule applies: push first, then record it.

A hook in `.claude/settings.json` reminds you after every `git push`. The reminder does not replace this rule.
<!-- END:project-status-rule -->
