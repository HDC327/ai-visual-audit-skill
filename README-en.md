# Let AI spot problems in your image before you publish it

**AI Visual Improvement Assistant**

[![License](https://img.shields.io/github/license/HDC327/ai-visual-audit-skill?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/ai-visual-audit-skill?style=flat-square)](https://www.npmjs.com/package/ai-visual-audit-skill) [![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master) [![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-6B5B95?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master) [![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master) [![Cursor](https://img.shields.io/badge/Cursor-Supported-000000?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master)

Send it your image, get back: **what to fix first, why it matters, how to change it.**  
No scores. No "overall it looks good." Just the 3 spots worth touching.

[中文 README](https://github.com/HDC327/ai-visual-audit-skill/blob/master/README.md)

---

## What it feels like

You send a campaign banner to an AI with this Skill installed and say:

```
Take a look at this image
[image attached]
```

It doesn't ask you to fill out a brief. It just starts:

```
Overall: small revisions suggested
(Guessing from the image: Double 11 app hero banner — goal is to get users to tap when they see the price)

3 spots worth looking at first:

1. Center, "Final price ¥99"
   Issue: Price size vs. surrounding text — not enough contrast for mobile small-screen scanning
   How to fix: Scale up ¥99 by 1.5×, add breathing room, reduce surrounding decoration

2. Bottom strip, "Buy Now" button
   Issue: Button color blends into the background — doesn't read as tappable at a glance
   How to fix: Darken the fill or add a white outline so it stands out

3. Top right, countdown — lower priority, can wait
   Heavier digit weight would make the urgency land more

Confirming: I read "Final price ¥99 / Buy Now" — is that right?
Want me to write a revision note for issue 1 you can send directly to the designer?
```

No scores. No "design language consistency." Just: something's off here, change it like this.

The more context you share, the more precise the advice — but sending just the image works fine too.

<!-- 💡 Tip: add a real screenshot with nine-grid annotations here — more convincing than any description
     Example: ![Review output screenshot](./assets/demo-problem-banner.png) -->

---

## Installation

This Skill works with Claude Code, Codex, Cursor, and any tool that supports the [Agent Skill](https://code.claude.com/docs/en/skills) format (`SKILL.md` + `references/`).

### Option 1: npm (recommended)

```bash
# Install for your user account, available in all projects (~/.claude/skills)
npx ai-visual-audit-skill

# Install for current project only (good for committing with a repo)
npx ai-visual-audit-skill --project

# Install for Codex
npx ai-visual-audit-skill --codex

# Install to any directory (Cursor, custom agents, etc.)
npx ai-visual-audit-skill --dir ~/.cursor/skills
```

Restart your AI session after installing. Running it again overwrites the previous install; `--force` skips the confirmation.

> Windows users: prefer the npx route, or run the manual commands in Git Bash.

### Option 2: Manual

```bash
git clone https://github.com/HDC327/ai-visual-audit-skill.git
cp -r ai-visual-audit-skill ~/.claude/skills/ai-visual-audit    # user-level
# or
cp -r ai-visual-audit-skill .claude/skills/ai-visual-audit      # project-level
```

---

## How to use it

**Just the image, nothing else** → works fine, it'll infer

```
[image attached]
Take a look
```

**More context = more precise advice** (optional but helpful)

```
[image attached]
This is the hero image for our 618 sale landing page
Need to highlight "Save ¥200", the button has to be tappable, keep the brand logo
```

**Comparing two options**

```
[image A, image B attached]
Which one works better for a Xiaohongshu post?
```

**After you've made changes**

```
[revised image]
Fixed issue 1 — take another look?
```

---

## It gets better the more you use it

No forms to fill. Just say whatever comes to mind after a review:

- **"That one's wrong — the client required that placement"** → logged, won't flag that type again
- **"You missed the disclaimer at the bottom"** → logged, pays more attention there next time
- **"This one was spot on"** → logged, knows this kind of judgment is accurate

Once enough signals build up, it automatically adjusts its rules so future reviews fit your actual situation better.

---

## Where it works best

- Campaign banners, posters, landing page hero images
- Product images, Xiaohongshu covers, brand visuals
- AIGC-generated assets you want to sanity-check before publishing
- Any situation where you've got a finished image and want a second opinion

Short version: **image is done, don't know where to start fixing it** — that's this tool's moment.

---

## What it can't do

- **Prices, dates, campaign rules need human verification** — AI can misread small text. When it involves these, it reads back what it saw and asks you to confirm. You're the final check.
- **Compliance review for finance, medical, legal images** — that's a legal question, not a visual one. Out of scope.
- **Checking if something looks too similar to past work** — it doesn't have your asset history. Treat that signal as a low-confidence hint only.

---

## Adapting it to your business

The core judgment rules live in `references/skill-review-criteria.md`. Replace the material types, placement contexts, and risk boundaries there — the output structure (at most 3 issues, each with location + why it matters + how to fix) stays the same.

---

## License

MIT © 2026 HDC327
