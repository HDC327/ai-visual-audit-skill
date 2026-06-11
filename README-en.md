# Let AI spot problems in your image before you publish it

**AI Visual Improvement Assistant**

[![License](https://img.shields.io/github/license/HDC327/ai-visual-audit-skill?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/ai-visual-audit-skill?style=flat-square)](https://www.npmjs.com/package/ai-visual-audit-skill) [![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master) [![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-6B5B95?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master) [![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master) [![Cursor](https://img.shields.io/badge/Cursor-Supported-000000?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master)

Send it your image, get back: **what to fix first, why it matters, how to change it.**  
No scores. No "overall it looks good." Just the 3 spots worth touching.

[中文 README](https://github.com/HDC327/ai-visual-audit-skill/blob/master/README.md)

![AI Visual Improvement Assistant cover](./assets/cover-01-opinion-dark.png)

---

## What it feels like

You send a campaign banner to an AI with this Skill installed and say:

```
Take a look at this image
[image attached]
```

It starts immediately:

```
Overall suggestion: Small revisions suggested
Image type: Poster
Basis: Visual inference only
My read: Double 11 app hero banner — goal is to get users to tap when they see the price

3 spots worth looking at first:

1. Center, "Final price ¥99" · Fix first
   Issue: Price size vs. surrounding text — not enough contrast for mobile small-screen scanning
   Why: Text legibility is the poster's most basic function. Once that fails, nothing else matters.
   How to fix: Scale up ¥99 by 1.5×, add breathing room, reduce surrounding decoration

2. Bottom strip, "Buy Now" button · Worth improving
   Issue: Button color blends into the background — doesn't read as tappable at a glance
   Why: The CTA is the final action the entire image needs users to complete — it needs the strongest visual weight
   How to fix: Darken the fill or add a white outline so it stands out

3. Top right, countdown · Lower priority, can wait
   Heavier digit weight would make the urgency land more

One line for the designer: Prioritize making "¥99" the visual anchor, then boost CTA contrast
Confirming: I read "Final price ¥99 / Buy Now" — is that right?
Next (optional): Want me to write a revision note for issue 1 you can send directly to the designer?
If anything's off in my read, just tell me — I'll log it and adjust future reviews.
```

The more context you share, the more precise the advice — but sending just the image works fine too.

## How it decides what to look for

![Start with a point of view, then make the correction specific](./assets/cover-02-correction-paper.png)

One underlying principle drives every judgment it makes:

> **Every visual element is either directing attention or getting out of the way of what's directing attention. There's no middle ground.**

From there, it identifies what kind of image you've sent and switches to the matching standard:

**If it's a poster with text** (campaign banners, brand posters, social covers…)

Four rules that can't be broken: Is the composition clearly prioritized? Can the key text be read in 3 seconds at actual viewing size? Does light/dark contrast separate the layers? Does the visual path flow from the core message to the CTA? **Any one of these failing automatically becomes "fix this first" — it won't get buried under other issues.**

Depth and style consistency are bonuses — great to have, not required.

**If it's a text-free asset** (background images, decorative elements, product shots, asset packs…)

One standard only: **usability**. Backgrounds must yield to the content layered on top. Decorative elements can't upstage the main subject. Product shots need an unambiguous focal point. An asset that doesn't know how to play a supporting role isn't a good asset, no matter how nice it looks on its own.

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

**Just the image, nothing else**

It'll ask you one question before starting:

> "What is this image mainly for? Campaign banner, social cover, brand poster — just a rough direction helps."

Answer that and it gives a full review calibrated to your use case. If you don't want to answer, say "just take a look" and it'll infer from the image and proceed.

**More context = more precise advice** (one sentence is enough)

```
[image attached]
618 sale landing page hero — highlight "Save ¥200", button needs to be tappable, keep the logo
```

**Comparing two options**

```
[image A, image B attached]
Which works better for a Xiaohongshu post?
```

**After making changes**

```
[revised image]
Fixed issue 1 — take another look?
```

**Sending an asset, not a poster**

Just send it — the Skill identifies whether it's a background, decorative element, or product shot and switches to the appropriate standard automatically (usability-first, not information-hierarchy-first).

---

## It gets better the more you use it

![From vague review to opinionated correction](./assets/cover-03-latent-deterministic.png)

No forms to fill. Just say whatever comes to mind after a review:

- **"That one's wrong — the client required that placement"** → logged, won't flag that type again
- **"You missed the disclaimer at the bottom"** → logged, pays more attention there next time
- **"This one was spot on"** → logged, knows this kind of judgment is accurate

Once enough signals build up, it automatically adjusts its rules so future reviews fit your actual situation better.

**You can see what's been accumulated at any time.** The file `references/rules-summary.md` in your install directory keeps a plain-language record of which issues have been confirmed as ignorable, what to watch more closely, and your format preferences. You can open it whenever you want — and you can also edit it directly. Anything you write in there takes effect the next time the AI starts a review.

---

## Where it works best

- Campaign banners, posters, landing page hero images
- Product images, Xiaohongshu covers, brand visuals
- Background textures, decorative assets, AIGC-generated content before publishing
- Any situation where you've got a finished image and want a second opinion before it goes out

Short version: **image is done, don't know where to start fixing it** — that's this tool's moment.

---

## What it can't do

- **Prices, dates, campaign rules need human verification** — AI can misread small text. When it involves these, it reads back what it saw and asks you to confirm. You're the final check.
- **Compliance review for finance, medical, legal images** — that's a legal question, not a visual one. Out of scope.
- **Checking if something looks too similar to past work** — it doesn't have your asset history. Treat that signal as a low-confidence hint only.

---

## Adapting it to your business

The core judgment rules live in `references/skill-review-criteria.md`. Replace the material types, placement contexts, and risk boundaries there — the output structure (at most 3 issues, each with location + why it matters + how to fix) stays the same.

You can also edit `references/rules-summary.md` directly — write in your team's confirmed rules and the AI will apply them from the next session onward.

---

## License

MIT © 2026 HDC327
