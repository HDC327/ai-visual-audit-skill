#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "SKILL.md",
  "assets/demo-problem-banner.png",
  "references/skill-review-flow.md",
  "references/skill-review-criteria.md",
  "references/skill-review-redlines.md",
  "references/skill-review-optimizer.md",
  "references/feedback/feedback-log.md",
  "references/feedback/change-log.md",
];

const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function walkMarkdown(dir) {
  const absoluteDir = path.join(root, dir);
  if (!fs.existsSync(absoluteDir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const absolute = path.join(absoluteDir, entry.name);
    const relative = path.relative(root, absolute).replace(/\\/g, "/");
    if (entry.isDirectory()) {
      files.push(...walkMarkdown(relative));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(relative);
    }
  }
  return files;
}

for (const file of requiredFiles) {
  if (!exists(file)) errors.push(`Missing required file: ${file}`);
}

const skill = read("SKILL.md");
const frontmatterMatch = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!frontmatterMatch) {
  errors.push("SKILL.md is missing YAML frontmatter.");
} else {
  const frontmatter = frontmatterMatch[1];
  if (!/^name:\s*ai-visual-audit\s*$/m.test(frontmatter)) {
    errors.push("SKILL.md frontmatter must include name: ai-visual-audit");
  }
  const descriptionMatch = frontmatter.match(/^description:\s*(.+)$/m);
  if (!descriptionMatch) {
    errors.push("SKILL.md frontmatter must include description.");
  } else if (descriptionMatch[1].length > 1024) {
    errors.push("SKILL.md description should stay under 1024 characters.");
  }
}

const markdownFiles = ["SKILL.md", "README.md", "README-en.md", ...walkMarkdown("references")];
const referencedPaths = new Set();
for (const file of markdownFiles) {
  const content = read(file);
  for (const match of content.matchAll(/references\/[^\s`)"']+\.md/g)) {
    referencedPaths.add(match[0]);
  }
}

for (const referencedPath of referencedPaths) {
  if (!exists(referencedPath)) {
    errors.push(`Broken reference: ${referencedPath}`);
  }
}

for (const file of ["README.md", "README-en.md"]) {
  const content = read(file);
  for (const match of content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const imagePath = match[1];
    if (/^[a-z]+:\/\//i.test(imagePath) || imagePath.startsWith("#")) continue;
    if (!exists(imagePath)) {
      errors.push(`Broken image reference in ${file}: ${imagePath}`);
    }
  }
}

if (errors.length) {
  console.error("Skill validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Skill validation passed.");
