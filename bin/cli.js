#!/usr/bin/env node
"use strict";

/**
 * Installer for the "ai-visual-audit" Agent Skill.
 *
 * Copies SKILL.md and the references/ folder into an agent's skills
 * directory (e.g. ~/.claude/skills/ai-visual-audit/).
 *
 * Usage:
 *   npx ai-visual-audit-skill                 # personal (~/.claude/skills)
 *   npx ai-visual-audit-skill --project       # current repo (./.claude/skills)
 *   npx ai-visual-audit-skill --codex         # Codex personal (~/.codex/skills)
 *   npx ai-visual-audit-skill --dir <path>    # any custom skills root
 *   npx ai-visual-audit-skill --force         # overwrite without prompting
 */

const fs = require("fs");
const os = require("os");
const path = require("path");

const SKILL_NAME = "ai-visual-audit";
const PACKAGE_ROOT = path.resolve(__dirname, "..");
const SOURCES = ["SKILL.md", "references"];

const COLORS = {
  reset: "\u001b[0m",
  bold: "\u001b[1m",
  dim: "\u001b[2m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  cyan: "\u001b[36m",
  red: "\u001b[31m",
};

function color(name, text) {
  if (process.env.NO_COLOR || !process.stdout.isTTY) return text;
  return `${COLORS[name] || ""}${text}${COLORS.reset}`;
}

function printHelp() {
  console.log(`
${color("bold", "ai-visual-audit-skill")} — install the AI Visual Audit Agent Skill

${color("bold", "Usage")}
  npx ai-visual-audit-skill [options]

${color("bold", "Targets")} (choose one; default is --global)
  --global            Install for all projects   (~/.claude/skills)
  --project           Install for current repo    (./.claude/skills)
  --codex             Install for Codex            (~/.codex/skills)
  --dir <path>        Install into a custom skills root

${color("bold", "Options")}
  --force             Overwrite an existing install without asking
  -h, --help          Show this help

${color("bold", "Examples")}
  npx ai-visual-audit-skill
  npx ai-visual-audit-skill --project
  npx ai-visual-audit-skill --dir ~/.cursor/skills
`);
}

function parseArgs(argv) {
  const opts = { target: "global", dir: null, force: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "-h":
      case "--help":
        opts.help = true;
        break;
      case "--force":
      case "-f":
        opts.force = true;
        break;
      case "--global":
        opts.target = "global";
        break;
      case "--project":
      case "--local":
        opts.target = "project";
        break;
      case "--codex":
        opts.target = "codex";
        break;
      case "--dir":
      case "--path":
        opts.target = "custom";
        opts.dir = argv[++i];
        break;
      default:
        if (arg.startsWith("--dir=")) {
          opts.target = "custom";
          opts.dir = arg.slice("--dir=".length);
        } else {
          console.error(color("red", `Unknown option: ${arg}`));
          opts.help = true;
        }
    }
  }
  return opts;
}

function resolveSkillsRoot(opts) {
  switch (opts.target) {
    case "project":
      return path.join(process.cwd(), ".claude", "skills");
    case "codex":
      return path.join(os.homedir(), ".codex", "skills");
    case "custom":
      if (!opts.dir) {
        console.error(color("red", "--dir requires a path argument."));
        process.exit(1);
      }
      return path.resolve(opts.dir.replace(/^~(?=$|\/|\\)/, os.homedir()));
    case "global":
    default:
      return path.join(os.homedir(), ".claude", "skills");
  }
}

function copyRecursive(src, dest) {
  // Node >= 16.7 ships fs.cpSync; fall back to a manual walk otherwise.
  if (typeof fs.cpSync === "function") {
    fs.cpSync(src, dest, { recursive: true });
    return;
  }
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    printHelp();
    process.exit(0);
  }

  // Validate that the package actually ships the skill files.
  for (const item of SOURCES) {
    if (!fs.existsSync(path.join(PACKAGE_ROOT, item))) {
      console.error(
        color("red", `Missing source "${item}" in package. Installation aborted.`)
      );
      process.exit(1);
    }
  }

  const skillsRoot = resolveSkillsRoot(opts);
  const target = path.join(skillsRoot, SKILL_NAME);

  if (fs.existsSync(target) && !opts.force) {
    console.log(
      color("yellow", `↻ Existing install found at ${target}`) +
        color("dim", " — overwriting (use --force to skip this notice).")
    );
  }

  fs.mkdirSync(target, { recursive: true });
  for (const item of SOURCES) {
    const src = path.join(PACKAGE_ROOT, item);
    const dest = path.join(target, item);
    if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
    copyRecursive(src, dest);
  }

  console.log("");
  console.log(color("green", "✓ AI Visual Audit skill installed."));
  console.log(`  ${color("dim", "Location:")} ${target}`);
  console.log("");
  console.log(`  ${color("cyan", "Next:")} open your agent and try`);
  console.log(
    color("dim", '    "帮我看看这张图哪里可以优化"') +
      color("dim", "  + attach an image")
  );
  if (opts.target === "global") {
    console.log(
      color(
        "dim",
        "  Restart your agent session if the skill does not appear immediately."
      )
    );
  }
  console.log("");
}

main();
