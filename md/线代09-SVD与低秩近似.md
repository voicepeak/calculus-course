# 线性代数 · 第 09 课：SVD 与低秩近似

> **本课目标**：理解奇异值分解的几何意义，掌握奇异值、伪逆、低秩近似与 PCA 的基本用法。
>
> **使用方法**：先读讲解 → 做练习 → 对答案。错题 72 小时内重做。

---

## 目录

1. 奇异值分解
2. 奇异值的几何意义
3. 秩、范数与条件数
4. 伪逆与最小二乘
5. 低秩近似
6. PCA 与降维
7. 工程视角：压缩、去噪与数值稳定
8. 练习
9. 答案与简解

---

## 1. 奇异值分解

任意 $m\times n$ 实矩阵 $\mathbf{A}$ 都可以分解为

$$\mathbf{A}=\mathbf{U}\boldsymbol{\Sigma}\mathbf{V}^\top,$$

其中：

- $\mathbf{U}$ 是 $m\times m$ 正交矩阵，列叫左奇异向量；
- $\mathbf{V}$ 是 $n\times n$ 正交矩阵，列叫右奇异向量；
- $\boldsymbol{\Sigma}$ 是 $m\times n$ 的“对角”矩阵，对角线元素
  $\sigma_1\ge\sigma_2\ge\cdots\ge\sigma_r>0$ 叫奇异值，其余为 0。

SVD 对任何矩阵都存在，不要求方阵，也不要求可逆或对称。这是它比特征分解更通用的原因。

对角化只适用于有足够特征向量的方阵；SVD 用两组正交基 $\mathbf{U}$ 和 $\mathbf{V}$，把任意线性映射拆成“旋转—缩放—旋转”。

---

## 2. 奇异值的几何意义

对任意向量 $\mathbf{x}$，有

$$\|\mathbf{A}\mathbf{x}\|=\|\boldsymbol{\Sigma}\mathbf{V}^\top\mathbf{x}\|.$$

因为 $\mathbf{V}^\top$ 不改变长度，$\boldsymbol{\Sigma}$ 只是沿坐标轴缩放，所以 $\mathbf{A}$ 把单位球映射成一个椭球，半轴长度正好是奇异值。

最大奇异值 $\sigma_1$ 是 $\mathbf{A}$ 对向量长度的最大放大倍数：

$$\sigma_1=\max_{\|\mathbf{x}\|=1}\|\mathbf{A}\mathbf{x}\|.$$

最小非零奇异值描述最“弱”的方向。若 $\sigma_r$ 很小，矩阵在该方向几乎把信息压没，数值求逆会非常不稳定。

奇异值与特征值的关系：

$$\sigma_i(\mathbf{A})=\sqrt{\lambda_i(\mathbf{A}^\top\mathbf{A})}
=\sqrt{\lambda_i(\mathbf{A}\mathbf{A}^\top)}.$$

右奇异向量是 $\mathbf{A}^\top\mathbf{A}$ 的特征向量，左奇异向量是 $\mathbf{A}\mathbf{A}^\top$ 的特征向量。

---

## 3. 秩、范数与条件数

SVD 把矩阵的很多性质直接暴露出来：

- **秩**：非零奇异值的个数 $r$；
- **谱范数**：$\|\mathbf{A}\|_2=\sigma_1$；
- **Frobenius 范数**：$\|\mathbf{A}\|_F=\sqrt{\sigma_1^2+\cdots+\sigma_r^2}$；
- **条件数**：$\kappa(\mathbf{A})=\dfrac{\sigma_1}{\sigma_r}$（可逆方阵）。

条件数衡量“输入小扰动会被放大多少倍”。$\kappa$ 接近 1，矩阵良态；$\kappa$ 很大，矩阵病态。病态矩阵求逆时，舍入误差会被急剧放大。

> **注意**：行列式小不等于病态。对角矩阵 $\operatorname{diag}(10^{-6},10^{-6})$ 的行列式是 $10^{-12}$，但条件数为 1，求逆很稳定。判断数值稳定性要看条件数，不要只看行列式。

---

## 4. 伪逆与最小二乘

若 $\mathbf{A}$ 不是方阵或不可逆，普通逆矩阵不存在。此时可以用 **Moore–Penrose 伪逆**：

$$\mathbf{A}^+=\mathbf{V}\boldsymbol{\Sigma}^+\mathbf{U}^\top,$$

其中 $\boldsymbol{\Sigma}^+$ 把非零奇异值取倒数，再转置。

伪逆给出最小二乘问题的解：

$$\hat{\mathbf{x}}=\mathbf{A}^+\mathbf{b}.$$

当 $\mathbf{A}$ 列满秩时，$\mathbf{A}^+=(\mathbf{A}^\top\mathbf{A})^{-1}\mathbf{A}^\top$，与正规方程一致；当 $\mathbf{A}$ 列不满秩时，伪逆给出最小范数解，这比正规方程更稳健。

---

## 5. 低秩近似

把 SVD 写成外积和：

$$\mathbf{A}=\sum_{i=1}^r\sigma_i\mathbf{u}_i\mathbf{v}_i^\top.$$

每一项是一个秩 1 矩阵。截断到前 $k$ 项：

$$\mathbf{A}_k=\sum_{i=1}^k\sigma_i\mathbf{u}_i\mathbf{v}_i^\top.$$

**Eckart–Young 定理**：在所有秩不超过 $k$ 的矩阵中，$\mathbf{A}_k$ 在 Frobenius 范数和谱范数下都最接近 $\mathbf{A}$，误差为

$$\|\mathbf{A}-\mathbf{A}_k\|_F=\sqrt{\sigma_{k+1}^2+\cdots+\sigma_r^2}.$$

也就是说，丢掉最小的奇异值，信息损失最小。这是数据压缩、去噪、降维的共同基础。

**例 9.1**　设 $\mathbf{A}=\operatorname{diag}(5,2,0.5)$。最佳秩 1 近似是

$$\mathbf{A}_1=\operatorname{diag}(5,0,0),$$

误差为 $\sqrt{2^2+0.5^2}=\sqrt{4.25}\approx 2.06$。

---

## 6. PCA 与降维

主成分分析（PCA）可以看成 SVD 的直接应用。

给定数据中心化后的数据矩阵 $\mathbf{X}$（每行一个样本，每列一个特征），做 SVD：

$$\mathbf{X}=\mathbf{U}\boldsymbol{\Sigma}\mathbf{V}^\top.$$

- $\mathbf{V}$ 的列是主成分方向；
- 奇异值的平方与各主成分的方差成正比；
- 前 $k$ 个主成分张成的子空间，是保留最多方差的 $k$ 维子空间。

把数据投影到前 $k$ 个主成分上：

$$\mathbf{Z}=\mathbf{X}\mathbf{V}_k,$$

就完成了降维。PCA 不关心类别标签，只关心方差最大的方向，因此是无监督方法。

---

## 7. 工程视角：压缩、去噪与数值稳定

- **图像压缩**：图像矩阵的奇异值衰减很快，保留前几十个奇异值就能保留大部分视觉信息；
- **推荐系统**：用户—物品评分矩阵做低秩近似，补全缺失值；
- **去噪**：小幅度的奇异值往往对应噪声，截断即可；
- **SLAM / 视觉**：本质矩阵、基础矩阵的估计依赖 SVD；
- **机器学习**：PCA 降维、特征白化、潜在语义分析；
- **数值计算**：伪逆和截断 SVD 是求解病态最小二乘的常用手段。

工程中经常遇到“数据矩阵很大，但有效秩很低”的情况。SVD 告诉你：真正重要的方向只有少数几个，其余方向可以压缩掉。

> **小实验**：用 NumPy 做 SVD 和秩 2 近似。

```python
import numpy as np

A = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]], dtype=float)
U, s, Vt = np.linalg.svd(A)
print(s)  # 奇异值，最后一个接近 0
A2 = U[:, :2] @ np.diag(s[:2]) @ Vt[:2, :]
print(np.linalg.matrix_rank(A2))  # 2
```

---

## 8. 练习

1. 设 $\mathbf{A}=\operatorname{diag}(3,2)$，写出它的奇异值、秩和条件数。

2. 设 $\mathbf{A}$ 的奇异值为 $4,2,0.5$，求 $\|\mathbf{A}\|_2$、$\|\mathbf{A}\|_F$ 和条件数。

3. 对 $\mathbf{A}=\operatorname{diag}(5,2,0.5)$，写出最佳秩 1 近似和误差的 Frobenius 范数。

4. 解释为什么伪逆在列不满秩时比正规方程更稳健。

5. PCA 中，为什么保留前 $k$ 个主成分能保留最多方差？

---

## 9. 答案与简解

<details>
<summary>点击展开（做完再看）</summary>

**1.** 奇异值为 $3,2$，秩为 2，条件数为 $3/2=1.5$。

**2.** $\|\mathbf{A}\|_2=4$；$\|\mathbf{A}\|_F=\sqrt{16+4+0.25}=\sqrt{20.25}=4.5$；条件数为 $4/0.5=8$。

**3.** $\mathbf{A}_1=\operatorname{diag}(5,0,0)$，误差为

$$\sqrt{2^2+0.5^2}=\sqrt{4.25}\approx 2.06.$$

**4.** 列不满秩时 $\mathbf{A}^\top\mathbf{A}$ 不可逆，正规方程有无穷多解，数值上也不稳定。伪逆通过截断零奇异值，给出唯一的最小范数解，并避免除以接近 0 的数。

**5.** SVD 把数据方差分解到一组正交方向上，奇异值从大到小排列。前 $k$ 个方向对应的奇异值平方和最大，因此保留的方差最多；被丢掉的方向方差最小，信息损失最小。

</details>

---

## 下节预告

**第 10 课：矩阵微积分与数值线性代数**

- 矩阵求导与常用公式
- Jacobian、Hessian 与链式法则
- 范数、条件数与浮点误差
- LU、QR 与迭代法

---

## 自查清单

- [ ] 能写出 SVD 并解释三个因子的作用
- [ ] 知道奇异值与 $\mathbf{A}^\top\mathbf{A}$ 特征值的关系
- [ ] 会用奇异值判断秩、范数和条件数
- [ ] 理解伪逆与最小二乘的关系
- [ ] 知道低秩近似为什么最优
