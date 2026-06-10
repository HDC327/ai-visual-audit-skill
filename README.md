# AI 视觉改稿建议助手
**AI Visual Improvement Assistant**

[![License](https://img.shields.io/github/license/HDC327/ai-visual-audit-skill?style=flat-square)](LICENSE)
[![npm](https://img.shields.io/npm/v/ai-visual-audit-skill?style=flat-square)](https://www.npmjs.com/package/ai-visual-audit-skill)
[![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)](.)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-6B5B95?style=flat-square)](.)
[![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)](.)
[![Cursor](https://img.shields.io/badge/Cursor-Supported-000000?style=flat-square)](.)

> 一个面向普通用户的 AI 视觉建议框架：不替代人做最终决定，而是告诉你**先看哪里、为什么、怎么改**。

[English README](README-en.md)

---

## 安装

本 Skill 是一个标准的 [Agent Skill](https://code.claude.com/docs/en/skills)（`SKILL.md` + `references/`），可用于 Claude Code、Codex、Cursor 等支持该格式的工具。

### 方式一：npm（推荐）

npm 包页：[ai-visual-audit-skill](https://www.npmjs.com/package/ai-visual-audit-skill)

无需手动复制文件，一行命令即可装好：

```bash
# 安装到当前用户，对所有项目生效（~/.claude/skills）
npx ai-visual-audit-skill

# 只安装到当前项目（./.claude/skills，适合随仓库提交）
npx ai-visual-audit-skill --project

# 安装到 Codex（~/.codex/skills）
npx ai-visual-audit-skill --codex

# 安装到任意目录（如 Cursor、自定义 Agent）
npx ai-visual-audit-skill --dir ~/.cursor/skills
```

安装器会把 `SKILL.md` 和 `references/` 复制到目标位置下的 `ai-visual-audit/` 目录。重复执行可直接覆盖更新；`--force` 可跳过覆盖提示。查看全部参数：`npx ai-visual-audit-skill --help`。

> 安装后如果 Agent 没有立刻识别到，重启一次会话即可。

### 方式二：手动安装

```bash
git clone https://github.com/HDC327/ai-visual-audit-skill.git
# 个人级（所有项目可用）
cp -r ai-visual-audit-skill ~/.claude/skills/ai-visual-audit
# 或项目级（仅当前仓库）
cp -r ai-visual-audit-skill .claude/skills/ai-visual-audit
```

只需保证目标目录名为 `ai-visual-audit`（与 `SKILL.md` 中的 `name` 一致），且包含 `SKILL.md` 和 `references/`。

> **Windows 用户**：建议优先用 `npx ai-visual-audit-skill`；若手动复制，可用资源管理器拖拽文件夹，或在 Git Bash 中执行上述 `cp` 命令。

---

## 30 秒上手

把图片和几条最简单的上下文发给已安装本 Skill 的 AI Agent：

```text
请帮我看这张图哪里需要优化。
用途：双11 App 首焦 Banner
目标：突出到手价和立即购买
补充要求：必须保留品牌 logo 和「立即抢购」
图片：见附件。
```

只给图片也可以，Agent 不会卡住等你回答。它会先根据画面反推可能用途，**直接给出完整建议**，并在结尾用一句可选追问邀请你补充真实用途，方便下一轮给更准的建议。

---

## 效果

- **建议而非裁判**：输出「右上，品牌 logo 偏小；正中，利益点被装饰压住」，而不是生硬打分或下最终结论。
- **最多 3 个重点问题**：强制 Agent 做优先级排序，避免一口气列出十几条让人无从下手。
- **不卡追问，直接出结果**：用途、目标、补充要求能给就给；不给时 Agent 直接按画面推测给完整建议，只在结尾用一句可选追问邀请你补充。
- **位置说得准**：统一用九宫格方位（左上 / 正中 / 底部通栏…）+ 那里是什么，让你一眼定位到要看的地方。
- **多图也能用**：多张图时先给每张一句话结论，再给跨图的全局重点；要对比时直接告诉你哪张更能达成目标。
- **可直接改稿**：每条建议都包含位置、为什么重要、怎么改，还可让 Agent 生成一段可直接粘贴的改图 prompt。

---

## 适合 / 不适合

**合适**：营销图、海报、Banner、落地页、商品主图、小红书封面、品牌图、新品发布图、AIGC 素材观察。

**不合适**：金融 / 医疗 / 法律等强合规终审、内容安全自动封禁、需要法律责任链路的自动裁决。

---

## 为什么是「建议」而不是「裁判」

| 裁判式 AI 审核 | 建议式（本系统） |
|---|---|
| 「这张图分数不高。」 | 「建议先改：利益点被装饰压住。」 |
| 像在给作品判分 | 像在帮你找优先修改点 |
| 用户读完仍不知道先改哪里 | 用户可以直接看被指出的位置 |
| AI 容易显得过度武断 | AI 只提供建议，最终决定仍由人承担 |

---

## 文件结构

```text
ai-visual-audit-skill/
├── SKILL.md              # Skill 入口：触发条件、核心规则、默认输出
├── package.json          # npm 安装包配置
├── bin/
│   └── cli.js            # npx 安装器
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

## 输出格式

Skill 默认输出可读 Markdown，不强制 JSON：

```text
整体建议：建议小改
判断依据：仅基于画面推测
我先按画面理解：这张看起来像大促 App 首焦 Banner，目标是突出到手价和点击

我最建议你先看这 3 处：
1. 位置：第 1 张图，正中，主标题
   优先级：建议优化
   问题：主利益点字号偏小，移动端小屏识别弱
   为什么：大促首焦需要让用户第一眼看到价格或优惠
   怎么改：放大主利益点，与副文案拉开层级，并减少周边装饰干扰

可以快速略过：主体清晰度、整体氛围
给设计师的一句话：建议优先强化价格利益点和行动按钮……
需要你再确认：我读到的是「到手价 ¥99 / 立即抢购」，请确认是否正确
下一步（可选）：要我针对第 1 处生成一段可直接粘贴的改图 prompt 吗？
```

---

## 如何迁移到你的业务

真正的领域知识在 `references/skill-review-criteria.md`。你可以替换其中的物料类型、投放场景、节点和风险边界；保留「最多 3 个重点问题」「位置 + 为什么 + 怎么改」这套输出方式。

---

## 已知局限

- **只给图片时不是完整判断**：Agent 会直接按画面推测用途给建议（并在结尾邀请你补充），但无法确认真实 brief、价格、文案、活动规则和品牌规范。
- **创意维度最弱**：Agent 通常不能访问近期同类历史物料，因此「是否雷同」只能作为低到中置信参考。
- **文字与价格必须人工复核**：图像模型可能看错小字、价格、日期，涉及事实准确性的判断需要人确认。

---

## License

MIT © 2026 HDC327