# 数学自学课程：微积分 · 线性代数 · 概率论

面向普通高中基础，目标是把无人机 / 具身智能需要的数学工具补齐。

当前包含：

- **微积分**：第 01–30 课 + 微分方程专项（已完成）
- **线性代数**：线代 01–11（新）
- **概率论**：概率 01–11（新）

三种阅读方式：

- **图解读本（在线）**：[GitHub Pages](https://voicepeak.github.io/calculus-course/)；微积分与大学物理术语配动画与精读笔记。
- **在线直接看**：点 `md/` 下的 Markdown 文件，GitHub 会渲染数学公式。
- **本地排版版**：`lessons/` 下的 HTML，公式为 MathML，离线可看。

## 在线看

微积分从 [第 01 课 极限](md/第01课-极限.md) 开始。

新课从 [线代 01 向量与线性组合](md/线代01-向量与线性组合.md) 开始，之后进入 [概率 01 概率空间与条件概率](md/概率01-概率空间与条件概率.md)。

## 图解读本（在线）

[图解读本](https://voicepeak.github.io/calculus-course/) 把微积分与大学物理的 208 个术语做成一页式动画手册：关键小节旁配图，点击图版可放大并查看公式。页面源文件在 [`docs/`](docs/)，由本地 KaTeX 渲染公式。

## 学习路线（无人机 / 具身智能）

微积分 01–30 已完成。当前阶段：

**线代 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11**

**概率 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11**

- 线性代数：矩阵、秩与子空间、投影与最小二乘、特征值、二次型、SVD、矩阵微积分。
- 概率论：条件概率与贝叶斯、常见分布、期望方差、多维分布、CLT、估计与检验、随机过程、信息论。
- 两门课可以并行；时间紧时先线代，因为控制、SLAM、机器学习都直接依赖矩阵运算。
- 之后补：最优化、数值方法、信号与系统、控制与估计、刚体变换（SO(3)/SE(3)）。

详细说明见 [ROADMAP.md](ROADMAP.md)。

## 怎么用

1. 在线：直接点表格里的「在线看」。
2. 本地：打开 `lessons/` 下的 HTML（Chrome / Edge / Firefox）。
3. 学习进度记在 [`progress.md`](progress.md)：学完一课，把 `[ ]` 改成 `[x]`，然后 commit + push。

> GitHub 网页上直接点 HTML 可能显示源码；HTML 版请 clone 到本地用浏览器打开。在线阅读用 `md/` 里的 Markdown。

## 课程目录

### 线性代数（新）

| 课 | 内容 | 在线看 | 排版版 | 学习 |
|---|---|---|---|---|
| 线代 01 | 向量与线性组合 | [Markdown](md/线代01-向量与线性组合.md) | [HTML](lessons/线代01-向量与线性组合.html) | ⬜ |
| 线代 02 | 矩阵与线性映射 | [Markdown](md/线代02-矩阵与线性映射.md) | [HTML](lessons/线代02-矩阵与线性映射.html) | ⬜ |
| 线代 03 | 高斯消元与线性方程组 | [Markdown](md/线代03-高斯消元与线性方程组.md) | [HTML](lessons/线代03-高斯消元与线性方程组.html) | ⬜ |
| 线代 04 | 四个基本子空间 | [Markdown](md/线代04-四个基本子空间.md) | [HTML](lessons/线代04-四个基本子空间.html) | ⬜ |
| 线代 05 | 正交投影与最小二乘 | [Markdown](md/线代05-正交投影与最小二乘.md) | [HTML](lessons/线代05-正交投影与最小二乘.html) | ⬜ |
| 线代 06 | 行列式 | [Markdown](md/线代06-行列式.md) | [HTML](lessons/线代06-行列式.html) | ⬜ |
| 线代 07 | 特征值与特征向量 | [Markdown](md/线代07-特征值与特征向量.md) | [HTML](lessons/线代07-特征值与特征向量.html) | ⬜ |
| 线代 08 | 对称矩阵与二次型 | [Markdown](md/线代08-对称矩阵与二次型.md) | [HTML](lessons/线代08-对称矩阵与二次型.html) | ⬜ |
| 线代 09 | SVD 与低秩近似 | [Markdown](md/线代09-SVD与低秩近似.md) | [HTML](lessons/线代09-SVD与低秩近似.html) | ⬜ |
| 线代 10 | 矩阵微积分与数值线性代数 | [Markdown](md/线代10-矩阵微积分与数值线性代数.md) | [HTML](lessons/线代10-矩阵微积分与数值线性代数.html) | ⬜ |
| 线代 11 | 综合模拟卷 | [Markdown](md/线代11-综合模拟卷.md) | [HTML](lessons/线代11-综合模拟卷.html) | ⬜ |

### 概率论（新）

| 课 | 内容 | 在线看 | 排版版 | 学习 |
|---|---|---|---|---|
| 概率 01 | 概率空间与条件概率 | [Markdown](md/概率01-概率空间与条件概率.md) | [HTML](lessons/概率01-概率空间与条件概率.html) | ⬜ |
| 概率 02 | 随机变量与常见分布 | [Markdown](md/概率02-随机变量与常见分布.md) | [HTML](lessons/概率02-随机变量与常见分布.html) | ⬜ |
| 概率 03 | 期望、方差与矩 | [Markdown](md/概率03-期望方差与矩.md) | [HTML](lessons/概率03-期望方差与矩.html) | ⬜ |
| 概率 04 | 多维随机变量与独立性 | [Markdown](md/概率04-多维随机变量与独立性.md) | [HTML](lessons/概率04-多维随机变量与独立性.html) | ⬜ |
| 概率 05 | 大数定律与中心极限定理 | [Markdown](md/概率05-大数定律与中心极限定理.md) | [HTML](lessons/概率05-大数定律与中心极限定理.html) | ⬜ |
| 概率 06 | 参数估计 | [Markdown](md/概率06-参数估计.md) | [HTML](lessons/概率06-参数估计.html) | ⬜ |
| 概率 07 | 假设检验 | [Markdown](md/概率07-假设检验.md) | [HTML](lessons/概率07-假设检验.html) | ⬜ |
| 概率 08 | 贝叶斯推断 | [Markdown](md/概率08-贝叶斯推断.md) | [HTML](lessons/概率08-贝叶斯推断.html) | ⬜ |
| 概率 09 | 随机过程初步 | [Markdown](md/概率09-随机过程初步.md) | [HTML](lessons/概率09-随机过程初步.html) | ⬜ |
| 概率 10 | 信息论与 KL 散度 | [Markdown](md/概率10-信息论与KL散度.md) | [HTML](lessons/概率10-信息论与KL散度.html) | ⬜ |
| 概率 11 | 综合模拟卷 | [Markdown](md/概率11-综合模拟卷.md) | [HTML](lessons/概率11-综合模拟卷.html) | ⬜ |

### 微积分（已完成）

| 课 | 内容 | 在线看 | 排版版 | 学习 |
|---|---|---|---|---|
| 01 | 极限 | [Markdown](md/第01课-极限.md) | [HTML](lessons/第01课-极限.html) | ✅ |
| 02 | 导数与求导法则 | [Markdown](md/第02课-导数.md) | [HTML](lessons/第02课-导数.html) | ✅ |
| 03 | 导数的应用 | [Markdown](md/第03课-导数的应用.md) | [HTML](lessons/第03课-导数的应用.html) | ✅ |
| 04 | 不定积分 | [Markdown](md/第04课-不定积分.md) | [HTML](lessons/第04课-不定积分.html) | ✅ |
| 05 | 定积分 | [Markdown](md/第05课-定积分.md) | [HTML](lessons/第05课-定积分.html) | ✅ |
| 06 | 分部积分法 | [Markdown](md/第06课-分部积分法.md) | [HTML](lessons/第06课-分部积分法.html) | ✅ |
| 07 | 微分方程初步 | [Markdown](md/第07课-微分方程初步.md) | [HTML](lessons/第07课-微分方程初步.html) | ✅ |
| 08 | 综合模拟卷 | [Markdown](md/第08课-综合模拟卷.md) | [HTML](lessons/第08课-综合模拟卷.html) | ✅ |
| 09 | 洛必达法则 | [Markdown](md/第09课-洛必达法则.md) | [HTML](lessons/第09课-洛必达法则.html) | ✅ |
| 10 | 泰勒展开与级数初步 | [Markdown](md/第10课-泰勒展开.md) | [HTML](lessons/第10课-泰勒展开.html) | ✅ |
| 11 | 反常积分 | [Markdown](md/第11课-反常积分.md) | [HTML](lessons/第11课-反常积分.html) | ✅ |
| 12 | 三角换元与部分分式 | [Markdown](md/第12课-三角换元与部分分式.md) | [HTML](lessons/第12课-三角换元与部分分式.html) | ✅ |
| 13 | 综合模拟卷 2 | [Markdown](md/第13课-综合模拟卷2.md) | [HTML](lessons/第13课-综合模拟卷2.html) | ✅ |
| 14 | 多元函数初步 | [Markdown](md/第14课-多元函数初步.md) | [HTML](lessons/第14课-多元函数初步.html) | ✅ |
| 15 | 二重积分 | [Markdown](md/第15课-二重积分.md) | [HTML](lessons/第15课-二重积分.html) | ✅ |
| 16 | 中值定理 | [Markdown](md/第16课-中值定理.md) | [HTML](lessons/第16课-中值定理.html) | ✅ |
| 17 | 极限的严格定义与连续 | [Markdown](md/第17课-极限的严格定义与连续.md) | [HTML](lessons/第17课-极限的严格定义与连续.html) | ✅ |
| 18 | 数列极限与级数概念 | [Markdown](md/第18课-数列极限与级数概念.md) | [HTML](lessons/第18课-数列极限与级数概念.html) | ✅ |
| 19 | 正项级数判别法 | [Markdown](md/第19课-正项级数判别法.md) | [HTML](lessons/第19课-正项级数判别法.html) | ✅ |
| 20 | 交错级数与绝对收敛 | [Markdown](md/第20课-交错级数与绝对收敛.md) | [HTML](lessons/第20课-交错级数与绝对收敛.html) | ✅ |
| 21 | 幂级数与泰勒级数 | [Markdown](md/第21课-幂级数与泰勒级数.md) | [HTML](lessons/第21课-幂级数与泰勒级数.html) | ✅ |
| 22 | 傅里叶级数初步 | [Markdown](md/第22课-傅里叶级数初步.md) | [HTML](lessons/第22课-傅里叶级数初步.html) | ✅ |
| 23 | 二阶线性微分方程 | [Markdown](md/第23课-二阶线性微分方程.md) | [HTML](lessons/第23课-二阶线性微分方程.html) | ✅ |
| 24 | 可降阶方程与建模 | [Markdown](md/第24课-可降阶方程与建模.md) | [HTML](lessons/第24课-可降阶方程与建模.html) | ✅ |
| 25 | 多元函数的极限与连续 | [Markdown](md/第25课-多元函数的极限与连续.md) | [HTML](lessons/第25课-多元函数的极限与连续.html) | ✅ |
| 26 | 方向导数、梯度与多元极值 | [Markdown](md/第26课-方向导数梯度与多元极值.md) | [HTML](lessons/第26课-方向导数梯度与多元极值.html) | ✅ |
| 27 | 三重积分 | [Markdown](md/第27课-三重积分.md) | [HTML](lessons/第27课-三重积分.html) | ✅ |
| 28 | 曲线积分与格林公式 | [Markdown](md/第28课-曲线积分与格林公式.md) | [HTML](lessons/第28课-曲线积分与格林公式.html) | ✅ |
| 29 | 曲面积分与高斯、斯托克斯公式 | [Markdown](md/第29课-曲面积分与高斯斯托克斯.md) | [HTML](lessons/第29课-曲面积分与高斯斯托克斯.html) | ✅ |
| 30 | 综合模拟卷 3 | [Markdown](md/第30课-综合模拟卷3.md) | [HTML](lessons/第30课-综合模拟卷3.html) | ✅ |

补充资料：[在线看](md/补充-微分方程专项.md) / [HTML](lessons/补充-微分方程专项.html) · ✅

## 目录结构

```text
md/         Markdown 讲义，GitHub 网页直接渲染
lessons/    HTML 排版版，本地浏览器打开
docs/       图解读本（微积分与大学物理术语动画）
ROADMAP.md  无人机/具身智能方向的学习路线
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
