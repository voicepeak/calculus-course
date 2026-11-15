# 微积分自学课程

面向普通高中基础，单变量微积分速成 + 进阶。

当前包含第 01–11 课的排版版 HTML，公式用 MathML 渲染，支持手机、平板、电脑浏览器，离线也能看。

## 怎么用

1. 打开 `lessons/` 下的 HTML（Chrome / Edge / Firefox）。
2. 公式是真正的上下分数，浅色/深色跟随系统。
3. 学习进度记在 [`progress.md`](progress.md)：学完一课，把 `[ ]` 改成 `[x]`，然后 commit + push。

> GitHub 网页上直接点 HTML 可能显示源码。想在线看，请用 GitHub Pages 地址；或者 clone 到本地用浏览器打开。

## 课程目录

| 课 | 内容 | 资料 | 学习 |
|---|---|---|---|
| 01 | 极限 | [HTML](lessons/第01课-极限.html) | ⬜ |
| 02 | 导数与求导法则 | [HTML](lessons/第02课-导数.html) | ⬜ |
| 03 | 导数的应用 | [HTML](lessons/第03课-导数的应用.html) | ⬜ |
| 04 | 不定积分 | [HTML](lessons/第04课-不定积分.html) | ⬜ |
| 05 | 定积分 | [HTML](lessons/第05课-定积分.html) | ⬜ |
| 06 | 分部积分法 | [HTML](lessons/第06课-分部积分法.html) | ⬜ |
| 07 | 微分方程初步 | [HTML](lessons/第07课-微分方程初步.html) | ⬜ |
| 08 | 综合模拟卷 | [HTML](lessons/第08课-综合模拟卷.html) | ⬜ |
| 09 | 洛必达法则 | [HTML](lessons/第09课-洛必达法则.html) | ⬜ |
| 10 | 泰勒展开与级数初步 | [HTML](lessons/第10课-泰勒展开.html) | ⬜ |
| 11 | 反常积分 | [HTML](lessons/第11课-反常积分.html) | ⬜ |
| 12 | 三角换元与部分分式 | 待生成 | ⬜ |
| 13 | 综合模拟卷 2 | 待生成 | ⬜ |
| 14 | 多元函数初步（选学） | 待生成 | ⬜ |
| 15 | 二重积分（选学） | 待生成 | ⬜ |

补充资料：[微分方程专项](lessons/补充-微分方程专项.html)

## 目录结构

```text
lessons/   排版版 HTML，直接用浏览器打开
sources/   LaTeX 源文件，用于以后重新生成 HTML
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
