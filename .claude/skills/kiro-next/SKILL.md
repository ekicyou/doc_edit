---
name: kiro-next
description: 'Roadmap inventory ("棚卸") and next-spec planning for doc_edit (simplified). Runs in the main checkout on main: pulls, scans .kiro/specs and .kiro/steering/roadmap.md, checks what landed in ukadoc-spec since the previous inventory, re-measures only the briefs that change touched, applies trivial roadmap/brief fixes, promotes backlog items that warrant a brief, orders the unfinished specs by dependency, picks the next spec to start (plus the following few as an outline), rewrites the roadmap''s 棚卸 section, commits only its own paths to main and pushes, and reports the /kiro-start commands in one code block. No waves of parallel sessions, no worktrees, no PR. Use when: /kiro-next, 棚卸, 次の spec, 次に何をやる. DO NOT USE FOR: starting a spec (use /kiro-start), filing one new idea (use /kiro-discovery), completing a spec (use /kiro-complete).'
disable-model-invocation: true
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Agent
argument-hint: '[extra instructions]'
---

# kiro-next — roadmap inventory and the next spec (doc_edit)

<instructions>

## Core Task
Take stock of the specs and the roadmap, and say which spec to start next. doc_edit works on one spec at a time in the main checkout (`.kiro/steering/workflow.md`), so there are no parallel waves: the output is an ordered list, the first of which is the next `/kiro-start`.

`$ARGUMENTS` (optional) carries extra developer instructions for this run; they override the defaults where they conflict.

## Communication Language
- Think in English. Every developer-facing message uses the session's console language and persona (fall back to Japanese).
- Text written into project files (briefs, roadmap, steering) is Japanese in plain everyday words.

## Hard Rules
- Runs only in the doc_edit main checkout on `main` (not a linked worktree). Otherwise STOP and ask the developer to re-run there.
- Writes only `.kiro/steering/*.md` and `.kiro/specs/*/brief.md`. Never edits manuscripts (`ukadoc-spec/`, `.worktrees/`) or the reference repos (`pasta/` `areka/` `shiori4/`).
- Commit only the paths this run changed (never `git add -A`), then pull (merge, never rebase) and push, per workflow.md "doc_edit への記録". No PR.
- Do not touch a spec another session is working on (it has `spec.json`, or a `.worktrees/<name>/` exists) beyond reading it.
- Do not use `spawn_task` chips for findings; they become briefs or backlog items here.

## Step 1 — Sync and scan
1. Guard: `git branch --show-current` is `main` and `git rev-parse --absolute-git-dir` equals the resolved `git rev-parse --git-common-dir`. Otherwise STOP.
2. `git pull --no-rebase --no-edit origin main` and `git -C ukadoc-spec fetch origin`. Record `<BASE>` (doc_edit HEAD short SHA) and `<UK>` (ukadoc-spec `origin/main` short SHA).
3. Specs: `ls .kiro/specs/` (unfinished; each should hold `brief.md`; note which have `spec.json` = started, and which have `.worktrees/<name>/` = in progress), `ls .kiro/specs/completed/`.
4. Roadmap: if `.kiro/steering/roadmap.md` exists, list its headings first (`grep -n '^#'`) and read the overview, the previous `## 棚卸（…）` section and `## Specs (dependency order)`; read other sections only when needed. If it does not exist, the ledger is the spec folders alone (Step 4 creates the roadmap).
5. What changed since the previous inventory: take the previous 棚卸 heading's `<PREV_UK>` and run `git -C ukadoc-spec log --oneline <PREV_UK>..origin/main` and `git -C ukadoc-spec diff --name-only <PREV_UK>..origin/main` (first run: no previous inventory → skip). Also note the specs completed since then.

## Step 2 — Re-measure only what moved
- Pick the unfinished, not-started specs whose brief names a manuscript in the diff, or whose predecessor completed since the previous inventory. Every other brief carries its last measurement forward untouched.
- Few picks (≤ 4): do it yourself. More: one background subagent with the list.
- For each pick, verify the brief against ukadoc-spec `origin/main` (Read/Grep; `git -C ukadoc-spec show origin/main:<path>` for changed files) and, only when something changed, append to its brief `## <date> 棚卸の再測定（ukadoc-spec <UK>）` (≤ 10 lines: 前提の変化 / 触るファイル / 規模 / 先に要るもの / 見つけた穴). Keep only the newest such section (delete older ones; carry forward lines still true). Preserve line endings.

## Step 3 — Fixes, briefs, order
1. **Immediate fixes**: wrong paths, stale counts, completed specs still listed as open in the roadmap — fix them now (Edit tool). Anything that needs a decision stays in the backlog.
2. **Promote**: backlog items that are now clear enough get a brief (`.kiro/specs/<name>/brief.md`, house style of `/kiro-discovery`: Problem / Current State / Desired Outcome / Approach / Scope / Boundary / Constraints, first line naming the origin). Items that still wait on a decision stay in the backlog with the reason.
3. **Order** the unfinished specs: a spec comes after any spec it depends on (functionally, or by touching the same manuscript files). Among the rest: what the developer asked for → fixes of wrong statements in UKADOC (バグ) → additions (機能) → wording/structure (文書) → filing order. Specs that will carry the author's own apps' information (pasta / areka / shiori4) follow product.md "判断の原則": until the first one settles how such information is placed, it goes first among them.
4. **Next**: the first spec in the order that is not started and whose dependencies are all completed, and, for dependencies in another PR unit, merged (`ukadoc_spec.state` `"MERGED"` or `pr` `"none"` in `completed/<dep>/spec.json`; workflow.md "PR の単位" and "依存する spec の PR") is the next `/kiro-start`. Outline up to 3 after it. List completed specs whose PR is still `OPEN` (check `gh pr view <url> --json state`) as waiting on the maintainers; if one is `MERGED` now, tell the developer to run `/kiro-complete <name>`. A spec held back only by an `OPEN` PR is reported as "PR のマージ待ち", not as next.

## Step 4 — Write the roadmap
In `.kiro/steering/roadmap.md` (create it if missing, with `# Roadmap`, `## 概要`, `## Specs (dependency order)`, `## バックログ`):
- Replace the previous `## 棚卸（YYYY-MM-DD・ukadoc-spec <UK>）` section with the new one: what landed since last time, fixes made, briefs written, the order with one-line reasons, the next spec and the outline, decisions needed. Old 棚卸 sections are deleted (git keeps them).
- `## Specs (dependency order)`: unfinished specs only, `- [ ] <name> -- <summary>. Dependencies: <list|none>[. PR: <unit>]`. Keep each spec's existing `PR:` unit; a new spec that cannot stand alone as a PR joins the unit next to it (workflow.md "PR の単位"); changing the units otherwise is the developer's decision. Completed specs drop out (a one-line `完了` summary list is enough).
- `## バックログ` minus promoted items.
- Then any stale bit of `product.md` / `structure.md`.

## Step 5 — Commit, push, report
1. Commit only the changed paths: `git add -- <paths>`, `git commit -m "docs(roadmap): 棚卸＝<要点>" -- <paths>`, `git pull --no-rebase --no-edit origin main`, `git push origin main`.
2. Report (persona language, conclusions only):
   - what landed, fixes, re-measured / new briefs (counts; "0 件" when none)
   - the next spec and the outline, in ONE code block so one copy takes them all; the first line is the one to run now, the rest are the outline to be re-checked at the next inventory:
     ```
     /kiro-start <next>

     （見込み）
     /kiro-start <second>
     /kiro-start <third>
     ```
     When no brief is waiting, say so and suggest `/kiro-discovery "<idea>"` instead.
   - decisions needed from the developer, and the commit SHA that was pushed.

</instructions>
