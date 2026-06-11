# 图发出去之前，让 AI 帮你挑一遍毛病

**AI Visual Improvement Assistant**

[![License](https://img.shields.io/github/license/HDC327/ai-visual-audit-skill?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/ai-visual-audit-skill?style=flat-square)](https://www.npmjs.com/package/ai-visual-audit-skill) [![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master) [![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-6B5B95?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master) [![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master) [![Cursor](https://img.shields.io/badge/Cursor-Supported-000000?style=flat-square)](https://github.com/HDC327/ai-visual-audit-skill/blob/master)

把图发给它，它告诉你：**先改哪里、为什么、怎么改**。  
不打分，不下结论，不说"整体不错"——直接给你 3 个值得先动的地方。

[English README](https://github.com/HDC327/ai-visual-audit-skill/blob/master/README-en.md)

---

## 用起来是这个感觉

你把大促 Banner 发给装了这个 Skill 的 AI，随口说一句：

```
帮我看看这张图
[附上图片]
```

它不会反问你"请描述一下图片的用途和目标受众"，直接开始看：

```
整体：建议小改
（我先按画面猜：大促 App 首焦 Banner，目标是让人看见价格就想点）

先看这 3 个地方：

1. 正中，「到手价 ¥99」
   问题：价格字号和旁边文字差距太小，手机小屏第一眼找不到重点
   怎么改：「¥99」放大 1.5 倍，四周多留白，减少旁边装饰的干扰

2. 底部通栏，「立即抢购」按钮
   问题：按钮颜色和背景太接近，扫一眼不像是个能点的按钮
   怎么改：加深按钮填充色，或加白色描边让它从背景跳出来

3. 右上，倒计时 · 可以先放
   数字如果再粗一点，紧迫感会更强

确认一下：我看到的是「到手价 ¥99 / 立即抢购」，这个对吗？
要我帮第 1 处写一段可以直接发给设计师的改图说明吗？
```

没有评分。没有"整体设计语言统一性"。就是：这里有问题，这样改。

你把背景说得越清楚，建议就越准——但什么都不说，只发图片，它也能看。

<!-- 💡 建议：在这里加一张带九宫格标注的真实审核截图，比任何文字描述都有说服力
     示例：![审核输出截图](./assets/demo-output.png) -->

---

## 安装

本 Skill 支持 Claude Code、Codex、Cursor 等工具，是标准的 [Agent Skill](https://code.claude.com/docs/en/skills) 格式（`SKILL.md` + `references/`）。

### 方式一：npm（推荐）

```bash
# 安装到当前用户，所有项目都能用（~/.claude/skills）
npx ai-visual-audit-skill

# 只装在当前项目里（适合随仓库一起提交）
npx ai-visual-audit-skill --project

# 安装到 Codex
npx ai-visual-audit-skill --codex

# 安装到任意目录（Cursor、自定义 Agent 等）
npx ai-visual-audit-skill --dir ~/.cursor/skills
```

装完之后在 AI 里重启一次会话就好。重复执行会直接覆盖更新；`--force` 跳过覆盖提示。

> Windows 用户建议用 npx 安装，或在 Git Bash 里跑手动安装命令。

### 方式二：手动安装

```bash
git clone https://github.com/HDC327/ai-visual-audit-skill.git
cp -r ai-visual-audit-skill ~/.claude/skills/ai-visual-audit    # 个人级
# 或
cp -r ai-visual-audit-skill .claude/skills/ai-visual-audit      # 项目级
```

---

## 不同情况怎么用

**只有图片，什么都不说** → 直接发，它会猜

```
[附上图片]
帮我看看
```

**想要更准的建议，多说一点**（背景说得越具体越好，但不是必须）

```
[附上图片]
这是 618 活动的落地页顶图，要突出「立减 200」
按钮得能点击进入，品牌 logo 必须留着
```

**两张方案不知道选哪张**

```
[附上图 A、图 B]
这两张用来发小红书，哪张留住人的效果更好？
```

**改完了想再过一遍**

```
[改过的图]
第 1 处改了，你再帮我看看
```

---

## 用几次之后，它会越来越准

你不需要填表打分。就算随口说一句，它都会记下来：

- **「这条不对，那个位置是客户要求必须放的」** → 记住，之后不会再挑这类问题
- **「你漏看了底部的免责小字」** → 记住，下次更仔细看那个区域
- **「这条说到点了」** → 记住，知道这类判断是对的

积累够了，它会自动把判断规则调一遍，让之后的建议更贴你们的实际情况。

---

## 什么情况下最好用

- 大促 Banner、海报、落地页顶图
- 商品主图、小红书封面、品牌宣传图
- AIGC 生成的素材发出去之前想过一遍
- 有图但没有设计师帮你把关

简单说：**图做完了，想过一遍，不知道先改哪里**——都可以用。

---

## 它做不到的事

- **价格、日期、活动规则要你自己最后确认**——AI 偶尔会看错小字，涉及这些它会把读到的内容说出来请你核对，但你才是最终那一关
- **金融、医疗、法律类图片的合规审核**——这是法律问题，不是视觉问题，管不了
- **判断"和之前的图是不是雷同"**——它没有你们历史素材库，这条建议只能是参考

---

## 想按自己业务定制

核心的判断规则在 `references/skill-review-criteria.md` 里，你可以直接替换物料类型、投放场景、风险边界——保留「最多 3 个重点问题 + 位置 + 为什么 + 怎么改」这套输出方式不变。

---

## License

MIT © 2026 HDC327
