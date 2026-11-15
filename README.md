# 微积分自学课程

面向普通高中基础，单变量微积分速成 + 进阶。

当前包含第 01–11 课。两种阅读方式：

- **在线直接看**：点 `md/` 下的 Markdown 文件，GitHub 会渲染数学公式。
- **本地排版版**：`lessons/` 下的 HTML，公式为 MathML，离线可看。

## 在线看

从 [第 01 课 极限](md/第01课-极限.md) 开始。

## 怎么用

1. 在线：直接点表格里的「在线看」。
2. 本地：打开 `lessons/` 下的 HTML（Chrome / Edge / Firefox）。
3. 学习进度记在 [`progress.md`](progress.md)：学完一课，把 `[ ]` 改成 `[x]`，然后 commit + push。

> GitHub 网页上直接点 HTML 可能显示源码；HTML 版请 clone 到本地用浏览器打开。在线阅读用 `md/` 里的 Markdown。

## 课程目录

| 课 | 内容 | 在线看 | 排版版 | 学习 |
|---|---|---|---|---|
| 01 | 极限 | [Markdown](md/第01课-极限.md) | [HTML](lessons/第01课-极限.html) | ⬜ |
| 02 | 导数与求导法则 | [Markdown](md/第02课-导数.md) | [HTML](lessons/第02课-导数.html) | ⬜ |
| 03 | 导数的应用 | [Markdown](md/第03课-导数的应用.md) | [HTML](lessons/第03课-导数的应用.html) | ⬜ |
| 04 | 不定积分 | [Markdown](md/第04课-不定积分.md) | [HTML](lessons/第04课-不定积分.html) | ⬜ |
| 05 | 定积分 | [Markdown](md/第05课-定积分.md) | [HTML](lessons/第05课-定积分.html) | ⬜ |
| 06 | 分部积分法 | [Markdown](md/第06课-分部积分法.md) | [HTML](lessons/第06课-分部积分法.html) | ⬜ |
| 07 | 微分方程初步 | [Markdown](md/第07课-微分方程初步.md) | [HTML](lessons/第07课-微分方程初步.html) | ⬜ |
| 08 | 综合模拟卷 | [Markdown](md/第08课-综合模拟卷.md) | [HTML](lessons/第08课-综合模拟卷.html) | ⬜ |
| 09 | 洛必达法则 | [Markdown](md/第09课-洛必达法则.md) | [HTML](lessons/第09课-洛必达法则.html) | ⬜ |
| 10 | 泰勒展开与级数初步 | [Markdown](md/第10课-泰勒展开.md) | [HTML](lessons/第10课-泰勒展开.html) | ⬜ |
| 11 | 反常积分 | [Markdown](md/第11课-反常积分.md) | [HTML](lessons/第11课-反常积分.html) | ⬜ |
| 12 | 三角换元与部分分式 | 待生成 | 待生成 | ⬜ |
| 13 | 综合模拟卷 2 | 待生成 | 待生成 | ⬜ |
| 14 | 多元函数初步（选学） | 待生成 | 待生成 | ⬜ |
| 15 | 二重积分（选学） | 待生成 | 待生成 | ⬜ |

补充资料：[在线看](md/补充-微分方程专项.md) / [HTML](lessons/补充-微分方程专项.html)

## 目录结构

```text
md/         Markdown 讲义，GitHub 网页直接渲染
lessons/    HTML 排版版，本地浏览器打开
progress.md 学习进度
```

## 同步方式

```bash
git clone https://github.com/voicepeak/calculus-course.git
cd calculus-course
```

学完一课后：

```bash
git add progress.md
git commit -m "完成第 XX 课"
git push
```
