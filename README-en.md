# AI Visual Improvement Assistant
**AI 视觉改稿建议助手**

[![License](https://img.shields.io/github/license/HDC327/ai-visual-audit-skill?style=flat-square)](LICENSE)
[![npm](https://img.shields.io/npm/v/ai-visual-audit-skill?style=flat-square)](https://www.npmjs.com/package/ai-visual-audit-skill)
[![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)](.)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-6B5B95?style=flat-square)](.)
[![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)](.)
[![Cursor](https://img.shields.io/badge/Cursor-Supported-000000?style=flat-square)](.)

> An AI-assisted framework for everyday visual feedback: not to replace human judgment, but to tell people **where to look, why it matters, and what to change first**.

[中文 README](README.md)

---

## Installation

This is a standard [Agent Skill](https://code.claude.com/docs/en/skills) (`SKILL.md` + `references/`) and works with Claude Code, Codex, Cursor, and other SKILL.md-compatible tools.

### Option 1: npm (recommended)

npm package: [ai-visual-audit-skill](https://www.npmjs.com/package/ai-visual-audit-skill)

No manual file copying — one command installs everything:

```bash
# Personal install, available across all projects (~/.claude/skills)
npx ai-visual-audit-skill

# Project-only install (./.claude/skills, good for committing with a repo)
npx ai-visual-audit-skill --project

# Install for Codex (~/.codex/skills)
npx ai-visual-audit-skill --codex

# Install into any directory (e.g. Cursor or a custom agent)
npx ai-visual-audit-skill --dir ~/.cursor/skills
```

The installer copies `SKILL.md` and `references/` into an `ai-visual-audit/` folder under the target location. Re-running it overwrites the previous install; pass `--force` to skip the overwrite notice. See all options with `npx ai-visual-audit-skill --help`.

> If the agent doesn't pick up the skill right away, restart the session.

### Option 2: Manual install

```bash
git clone https://github.com/HDC327/ai-visual-audit-skill.git
# Personal (all projects)
cp -r ai-visual-audit-skill ~/.claude/skills/ai-visual-audit
# Or project-scoped (current repo only)
cp -r ai-visual-audit-skill .claude/skills/ai-visual-audit
```

Just make sure the target directory is named `ai-visual-audit` (matching the `name` in `SKILL.md`) and contains `SKILL.md` and `references/`.

> **Windows users**: prefer `npx ai-visual-audit-skill`; for manual copy, drag the folder in File Explorer, or run the `cp` commands above in Git Bash.

---

## Get Started in 30 Seconds

Send images and a few lightweight context notes to an agent with this Skill installed:

```text
Help me improve this image.
Use case: Double 11 app hero banner.
Goal: emphasize final price and immediate purchase.
Extra requirements: keep the brand logo and "Buy Now" CTA.
Images: attached.
```

Images alone are still usable, and the agent won't stall waiting for your answer. It infers the likely use case from the image, gives the full review right away, and clearly says the advice is based on that inference — then adds one optional line inviting you to share the real use case for a sharper read.

---

## What It Does

- **Advice, not verdicts**: outputs “top-right, the brand logo is too small” instead of a blunt score or final judgment.
- **Maximum 3 key issues**: forces prioritization and avoids overwhelming users.
- **No blocking questions**: context helps, but if it's absent the agent infers from the image and delivers a full review immediately, adding just one optional line inviting you to refine.
- **Precise locations**: a consistent nine-grid vocabulary (top-left / center / bottom strip…) plus what's there, so you instantly know where to look.
- **Multi-image ready**: a one-line verdict per image first, then global priorities across images; for comparisons it tells you which one better serves your goal.
- **Actionable revision advice**: each finding includes location, why it matters, and what to change — and you can ask for a ready-to-paste revision prompt.

---

## Fits / Doesn't Fit

**Fits**: marketing images, banners, posters, landing pages, product images, social covers, brand visuals, product launch materials, and AIGC material observations.

**Doesn't fit**: finance, medical, legal final review; automated content-safety blocking; any workflow requiring formal accountability or legal sign-off.

---

## Why "Advice" and Not "Verdict"

| Verdict-style AI review | Advice-style review |
|---|---|
| "This image scores low." | "Improve first: benefit copy is buried under decoration." |
| Feels like grading | Feels like practical editing guidance |
| User still does not know where to start | User checks the flagged areas first |
| AI may sound overly final | AI suggests; the human decides |

---

## File Structure

```text
ai-visual-audit-skill/
├── SKILL.md              # Skill entry: triggers, core rules, default output
├── package.json          # npm package config
├── bin/
│   └── cli.js            # npx installer
├── README.md
├── README-en.md
└── references/
    ├── skill-review-flow.md
    ├── skill-review-criteria.md
    ├── skill-review-redlines.md
    ├── content-quality-standards/
    ├── content-safety-standards/
    └── visual-design-audit-dimensions/
```

---

## Output Format

The Skill defaults to readable Markdown, not mandatory JSON:

```text
Overall suggestion: Small revisions suggested
Basis: Based on image inference only
My read of the image: looks like a Double 11 app hero banner aiming to push the final price and clicks

Top issues to check first:
1. Location: Image 1, center, headline
   Priority: Worth improving
   Issue: Primary benefit copy is too small for mobile scanning
   Why it matters: A campaign hero should make the offer the first visual focus
   How to revise: Increase the benefit copy size, create stronger hierarchy over secondary text, and reduce nearby decorative interference

Quick-scan clear: subject clarity, overall atmosphere
One-line revision brief: Suggested revision...
Please confirm: I read "Final price ¥99 / Buy Now" — please confirm it's correct
Next (optional): Want a ready-to-paste revision prompt for issue 1?
```

---

## How to Adapt to Your Business

The real domain knowledge lives in `references/skill-review-criteria.md`. You can replace material types, placement scenarios, campaign nodes, and risk boundaries there — while keeping the output pattern: at most 3 key issues, each with location + why it matters + how to revise.

---

## Known Limitations

- **Image-only input is not a full judgment**: the agent infers likely use and reviews right away (then invites you to add context), but cannot verify the real brief, pricing, copy, campaign rules, or brand standards.
- **Creative judgment is weaker**: the agent usually cannot access recent comparable assets, so similarity/cliche judgments are low-to-medium confidence.
- **Text and prices need human verification**: the agent reads small copy, dates, and prices back to you for confirmation, since image models can misread them.

---

## License

MIT © 2026 HDC327