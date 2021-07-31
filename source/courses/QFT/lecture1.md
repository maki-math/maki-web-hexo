---
title: Lecture 1
date: 2021-07-30 17:46:42
layout: lecture
mathjax: true
---

# Harmonic Oscillator

<font face="DengXian">       犹如宏观物体都遵循牛顿第二定律一样，根据量子力学的基本公设，任意量子系统的运动都遵循薛定谔方程：</font>
$$
\hat{H}(t) \Psi(t) = \mathrm{i} \hbar \frac{\partial}{\partial t} \Psi(t) \text{,} \tag{1.1}
$$
<font face="DengXian">其中</font><font face="KaiTi">哈密顿算子</font> $\hat{H}(t)$​​ <font face="DengXian">由系统的动能和势能部分组成：</font>
$$
\hat{H}(t) = \hat{T} + \hat{V}(t) \text{,} \tag{1.2}
$$
<font face="DengXian">其中动能项的详细形式为：</font>
$$
\hat{T} = \frac{\hat{p}^2}{2m} \quad \text{or} \quad \hat{T} = -\frac{\hbar^2}{2m}\nabla^2 \text{.} \tag{1.3}
$$
<font face="DengXian">当势能 $\hat{V}(t)$ ​不显性随着时间改变时，薛定谔方程有稳态解，且可以变为不含时的形式：</font>
$$
    \hat{H}\Psi = E \Psi \text{.} \tag{1.4}
$$
<font face="DengXian">        所有量子系统的薛定谔方程都有一致的形式，而不同系统的区分点在于势能 $\hat{V}(t)$​​​       的不同。在本章节中我们从量子谐振子入手，研究谐振子的代数解法，并从中获得如何求解更多复杂量子系统的启发。</font>

## 谐振子代数解法

<font face="DengXian">         一维量子谐振子的势能表达式为：</font>
$$
\hat{V} = \frac{1}{2}m \omega^2 \hat{x}^2 \text{.} \tag{1.5}
$$
<font face="DengXian">         其薛定谔方程为：</font>
$$
\frac{\hat{p}^2}{2m}| \Psi \rangle + \frac{1}{2} m \omega^2 \hat{x}^2 | \Psi \rangle = E | \Psi \rangle \text{.} \tag{1.6}
$$
<font face="DengXian">         上述偏微分方程的传统求解过程非常复杂，如果对其过程感兴趣的话可以查看 Atkins 的 Molecular Quatum Mechanics 的 Further information 部分。在这里直接给出其能量本征值和本征波函数，并给出对应的图像。</font>
$$
\begin{aligned}
    & E_n = \left(  n + \frac{1}{2}  \right) \hbar \omega \\
    & \Psi_n(\xi) = \frac{1}{\sqrt{2^n n!}} \left( \frac{m \omega}{\pi \hbar} \right)^{1/4} H_n(\xi)\mathrm{e}^{-\xi^2/2} \qquad n \in \mathbb{Z} \text{,} \quad n \geq 0 \text{.}
\end{aligned} \tag{1.7}
$$

<img src="picture/HarmOsziFunktionen.png" alt="avatar" style="zoom:60%;" align=center />

<center style="font-size:14px; "> 图1. Wavefunction representations for the first eight bound eigenstates. Adapted from AllenMcC. - File:HarmOsziFunktionen.jpg, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=11623546  </center>

<font face="DengXian"> 其中的 $H_n(\xi)$ 为</font><font face="Kaiti">埃尔米特多项式</font><font face="DengXian">，其形式非常的复杂，而其中的 $\xi = \sqrt{m\omega / \hbar }x$ .</font>

<font face="DengXian">细品式 (1.7) 中的能量部分，以及图1中的能级位置，我们不难发现，从基态能量 $E_0$​​​​​​ 开始，更高能级之间的间隔均为 $\hbar \omega$​​，也就是特定频率下的“一份”能量单元。这似乎意味着，当体系能量上升一个能级时，有某种“粒子”在体系中“产生了”，其能量值为 $\hbar \omega$​​​​​​​；也似乎暗示，这么简洁的解，应该会有更优雅的解法才对。</font>

<font face="DengXian">       如果我们只考察能级分布的话，的确会有更简单的解法。我们回顾一下式(1.6)，将其移项可得：</font>
$$
\frac{1}{2m} \left[ \hat{p}^2 + (m \omega \hat{x})^2 \right] | \Psi \rangle = E | \Psi \rangle \text{.} \tag{1.8}
$$
<font face="DengXian">      其中中括号内的平方和可以看作含有纯虚数 $\mathrm{i}$ 的平方差，顺着这个思路我们构建一个算子：</font>
$$
\hat{a} = \frac{1}{\sqrt{2m\hbar\omega}}(m\omega\hat{x} + \mathrm{i} \hat{p}) \text{.} \tag{1.9}
$$
<font face="DengXian">      由于位置算符 $\hat{x}$ ​和动量算符 $\hat{p}$​ 都是可观测量，也就是厄米算符，即</font>
$$
\begin{aligned}
    \hat{x} = \hat{x}^\dagger \\
    \hat{p} = \hat{p}^\dagger \text{.}
\end{aligned} \tag{1.10}
$$
<font face="DengXian">      则 $\hat{a}$ 对应的共轭算符为</font>
$$
\hat{a} = \frac{1}{\sqrt{2m\hbar\omega}}(m\omega\hat{x} - \mathrm{i} \hat{p}) \text{.} \tag{1.11}
$$
<font face="DengXian">      将两个算子相乘，虽然并不等于上述的平方和，但是与之非常相似：</font>
$$
\begin{aligned}
    \hat{a} \hat{a}^\dagger & = \frac{1}{2m\hbar\omega} \left[ \hat{p}^2 + (m \omega \hat{x})^2 + \mathrm{i}m\omega \hat{x} \hat{p} - \mathrm{i}m\omega \hat{p} \hat{x} \right] \\
    & = \frac{1}{2m\hbar\omega} \left[ \hat{p}^2 + (m \omega \hat{x})^2 - \mathrm{i}m\omega [\hat{x},\hat{p}] \right] \text{.}
\end{aligned} \tag{1.12}
$$
<font face="DengXian"> 由于 $\hat{x}$ 和 $\hat{p}$ 的对易关系：</font>
$$
[\hat{x},\hat{p}] = \mathrm{i} \hbar \text{.}\tag{1.13}
$$
<table><tr><td bgcolor="#FFC0CB">
    <!-- $\hat{x}$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\hU1HIWb8j7.svg"><font face="kaiti">和</font><!-- $\hat{p}$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\GkrdsipZF3.svg"><font face="kaiti">的对易关系</font><br>
<details><font face="DengXian">
设<!-- $\Psi(x)$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\eabPrw5HE4.svg">为任意函数，将<!-- $\hat{p}_x$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\xj8rIXh1Lj.svg">作用于函数<!-- $x\Psi(x)$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\RXVBIq5SxL.svg">上，可得
</font>
<!-- $$
\hat{p}_x \left( x \Psi(x)  \right) = - \mathrm{i} \hbar  \left( x\frac{\partial}{\partial x} \right)\Psi(x) - \mathrm{i} \hbar \Psi(x) .
$$ --> 
<div align="center"><img style="background: transparent;" src="svg\aJApTNOJab.svg"></div>
<br>
<font face="DengXian"> 移项可得 </font><br>
<!-- $$
\left( \hat{p}_x x - x \hat{p}_x \right) \Psi(x) = - \mathrm{i} \hbar \Psi(x) 
$$ --> 
<div align="center"><img style="background: transparent;" src="svg\yZ3cGu6nj9.svg"></div>
</details>
</td></tr></table>

<font face="DengXian"> 所以其乘积为：</font>
$$
\hat{a} \hat{a}^\dagger = \frac{1}{\hbar \omega} \hat{H} + \frac{1}{2}  \text{.}\tag{1.14}
$$
<font face="DengXian"> 同理可得</font>
$$
\hat{a}^\dagger \hat{a} = \frac{1}{\hbar \omega} \hat{H} - \frac{1}{2}  \text{.} \tag{1.15}
$$
<font face="DengXian">移项可得哈密顿量的表达式：</font>
$$
\begin{aligned}
    \hat{H} = \hbar \omega \left( \hat{a} \hat{a}^\dagger - \frac{1}{2} \right) \\
    \hat{H} = \hbar \omega \left( \hat{a}^\dagger \hat{a}  + \frac{1}{2} \right) \text{.} 
\end{aligned} \tag{1.16}
$$
<font face="DengXian">从此处也可以得到$\hat{a}^\dagger$和$\hat{a}$之间的对易关系：</font>
$$
[\hat{a}, \hat{a}^\dagger] = 1 \tag{1.17}
$$
<font face="DengXian">我们来详细讨论一下 (1.16) 中的第二个式子：若$|\Psi_n\rangle$是薛定谔方程 (1.14) 的其中一个本征波函数，那么它也是组合算子$\hat{a}^\dagger a$的一个本征波函数。假设其本征值为$n$（注意这里的$n$我们没有做任何限制，只知道它是一个实数），我们有：</font>
$$
\hat{a}^\dagger \hat{a} | \Psi_n\rangle = n | \Psi_n\rangle \tag{1.18}
$$
<font face="DengXian">为了书写简便，我们定义$\hat{n} = \hat{a}^\dagger a$，并且将$| \Psi_n\rangle$简写为$| n\rangle$，则上式变为:</font>
$$
\hat{n} | n\rangle = n | n\rangle . \tag{1.19}
$$
<font face="DengXian">对于$n$以及$|n\rangle$我们有下面几个引理：</font>

***Lemma Ⅰ.***  <font face="DengXian">$\hat{n}$的本征值$n$总是非负的。</font>

<table><tr><td bgcolor="#FFC0CB">
    <font face="Arial">Property of the eigenvalues of <!-- $\hat{n}$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\vMWPumsqLu.svg"></font><br>
<details><font face="DengXian">
    对于<!-- $\hat{n}$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\5RDf3yGaMp.svg">任意的本征矢<!-- $| n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\6C1xNds03v.svg">，将<!-- $\hat{a}$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\WdGIliNfFK.svg">作用于其上，可以得到一个新的矢量<!-- $\hat{a} | n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\eg3VuOdcZo.svg">，它的范数的平方必定是一个非负实数：
    </font>
<!-- $$
    \begin{aligned}
    \left| \hat{a} | n \rangle \right|^2 & = \langle n | \hat{a}^\dagger \hat{a} | n \rangle \\
    & = n \langle n | n \rangle \geq 0 \text{.}
    \end{aligned}
$$ --> 
<div align="center"><img style="background: transparent;" src="svg\b4ft6RXZD1.svg"></div>
<font face="DengXian">
又因为矢量的归一化条件
</font>
<!-- $$
\langle n | n \rangle = 1 \text{,}
$$ --> 
<div align="center"><img style="background: transparent;" src="svg\DS4Y656GkJ.svg"></div>
<font face="DengXian">
所以<!-- $n \geq 0$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\ludFuNHRL7.svg">.
</font>
    </details>
</td></tr></table>
***Lemma Ⅱ.*** <font face="DengXian">假设$| n \rangle$是一个本征值为$n$​的非零本征向量，有下面两点：</font>

(***ⅰ***)  <font face="DengXian">“$n = 0$​”是“ $\hat{a} | n \rangle$ ​是零向量”的充要条件。</font>

(***ⅱ***)  <font face="DengXian">当$n \geq 0$​​时，$\hat{a} | n \rangle$​​ 必定是 $\hat{n}$​​ 的一个非零本征向量，且本征值为 $n - 1$​​。</font>

<table><tr><td bgcolor="#FFC0CB">
    <font face="Arial">Property of the vecter <!-- $\hat{a} | n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\XhoYSfhIhR.svg"></font><br>
<details><font face="DengXian">
(i) 当<!-- $n = 0$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\X900QeAUNP.svg">时，<!-- $\hat{a} | n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\Xba1CKoD2f.svg">范数的平方也为0，则<!-- $\hat{a} | n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\SkCdwdyW8U.svg">必为零向量；当<!-- $\hat{a} | n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\2fV1Be27mL.svg">为零向量时，我们在等式两端左乘<!-- $\hat{a}^\dagger$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\dtrlh6Sn8g.svg">，得到：
    </font>
<!-- $$
    \hat{a}^\dagger \hat{a} | n \rangle = \hat{n} | n \rangle = 0 \text{.}
$$ --> 
<div align="center"><img style="background: transparent;" src="svg\PNOxXowdN6.svg"></div>
<font face="DengXian">
上式说明，如果经过<!-- $\hat{a}$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\QxxR5al6TE.svg">作用过后的向量<!-- $| n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\kf9YT0QpQh.svg">变成了零向量的话，那<!-- $| n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\pIAyn46WXU.svg">对应的本征值为<!-- $0$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\ptSHv1lkhm.svg">。
</font><br>
<font face="DengXian">
(ii) 当<!-- $n$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\ZnqhMWsrzr.svg">严格大于<!-- $0$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\Ir9UTUPzxF.svg">时，根据 i)的结论，<!-- $\hat{a} | n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\CwP6k27wfo.svg">也必为非零向量。下面将证明<!-- $\hat{a} | n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\Ym8RZktgMZ.svg">是<!-- $\hat{n}$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\2kFtuHeltA.svg">的本征向量，且本征值为<!-- $n - 1$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\vURlaXKgi1.svg">。我们将对易子<!-- $[\hat{n}, \hat{a}]$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\lp53fMx217.svg">作用于<!-- $| n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\qI9E7BXdOv.svg">上，有
</font>
<!-- $$
    [\hat{n}, \hat{a}] | n \rangle = \hat{a}^\dagger \hat{a} \hat{a} | n \rangle - \hat{a} \hat{a}^\dagger \hat{a} | n \rangle = - \hat{a} | n \rangle \text{.}
$$ --> 
<div align="center"><img style="background: transparent;" src="svg\u1ZuGqMDEB.svg"></div>
<font face="DengXian">
移项可得
</font>
<!-- $$
\begin{aligned}
    \hat{n} \hat{a} | n \rangle & = \hat{a} \hat{n} | n\rangle - \hat{a} | n \rangle \\
    & = \hat{a} n | n\rangle - \hat{a} | n \rangle \\
    & = (n - 1) \hat{a} | n \rangle \text{.}
\end{aligned}
$$ --> 
<div align="center"><img style="background: transparent;" src="svg\GqenJYLs7X.svg"></div>
<font face="DengXian">
证毕。且我们留意到，<!-- $n = 0$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\P5BNkLVRPk.svg">也是满足上式的，因为<!-- $\hat{a} | 0 \rangle = \vec{0}$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\GwcZgs69Y8.svg">.
</font>
    </details>
</td></tr></table>
***Lemma Ⅲ.*** <font face="DengXian">若 $| n \rangle$是非零向量，则$ \hat{a}^\dagger | n \rangle$也是非零向量，且对应本征值为 $n + 1$.</font>
<table><tr><td bgcolor="#FFC0CB">
    <font face="Arial">Property of the vecter <!-- $\hat{a}^\dagger | n \rangle$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\YSdFBeHGJ4.svg"></font><br>
<details><font face="DengXian">
证明方法和***Ⅱ***类似，这里只简要证明该向量的对应本征值为<!-- $n + 1$ --> <img style="transform: translateY(-0.2em); background: transparent;" src="svg\BwlFyuXf7X.svg">：
</font>
<!-- $$
\begin{aligned}
    & [\hat{n}, \hat{a}^\dagger] | n \rangle = \hat{a}^\dagger | n \rangle \\
    & \hat{n} \hat{a} | n \rangle = \hat{a}^\dagger \hat{n} | n \rangle + \hat{a}^\dagger | n \rangle = (n + 1) \hat{a}^\dagger |n \rangle \text{.}
\end{aligned}
$$ --> 
<div align="center"><img style="background: transparent;" src="svg\fDgF40DzXO.svg"></div>
<font face="DengXian">
证毕。
</font>
    </details>
</td></tr></table>
<font face="DengXian">        根据引理***Ⅱ***，我们知道$n$可以取值为 $0$ 或大于 $0$；若我们假设 $0 < n < 1$，则根据引理***Ⅱ***可以构造 $\hat{n}$ 的一个新本征矢 $a | n \rangle$，其本征值 $n-1$ 满足 $ -1 < n -1 < 0$，违背了引理***Ⅰ***，所以 $n$ 不能取 $0$ 到 $1$ 之间的小数。再结合引理***Ⅲ***，从 $0$ 开始不断增加 $1$，所得的整数都是 $\hat{n}$ 本征值,因此 $n$ 的取值范围是非负整数，与现实生活中的某样东西的“数量”具有相同的取值范围，因此 $\hat{n}$ 也被称为粒子数算符。
</font>

