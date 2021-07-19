---
title: Lecture 1
date: 2021-07-03 13:43:42
layout: lecture
mathjax: true
---

欢迎来到代数第一讲。

$$x$$

# Test


# On the Siegel-Tatuzawa Theorem

Maki

## Introduction

Thm 1: For any $\varepsilon>0$, there exists $C_1(\varepsilon)>0$, such that for any $\chi$ being a real primitive character modulo $q$,
$$
L(1,\chi)>C_1(\varepsilon)q^{-\varepsilon}
$$
Thm 2: For any $\varepsilon>0$, there exists $C_2(\varepsilon)>0$, such that for any $\chi$ being a real nonprincipal primitive character modulo $q$, $L(s,\chi)\neq 0$ for
$$
s>1-C_2(\varepsilon)q^{-\varepsilon}
$$


## Siegel's Theorem

Let $\chi_1$ and $\chi_2$ be two real primitive characters modulo $q_1$ and $q_2$. Then $\chi_1\chi_2$ is nonprincipal to $q_1q_2$. Let
$$
F(s)=\zeta(s)L(s,\chi_1)L(s,\chi_2)L(s,\chi_1\chi_2)
$$
Then $F(s)$ is regular everywhere except a simple pole at $s=1$ with residue
$$
\lambda=L(1,\chi_1)L(1,\chi_2)L(1,\chi_1\chi_2)
$$
Lemma 1: Assuming the above conditions, we have
$$
F(s)>\frac{1}{2}-\frac{c_4\lambda}{1-s}(q_1q_2)^{8(1-s)}
$$
for $\frac{7}{8}<s<1$ and some constant $c_4$.

Proof of Lemma 1: First we write, for $\sigma>1$,
$$
F(s)=\sum_{n=1}^{\infty}a_nn^{-s}
$$
Then $a_1=0$ and $a_n\geq 0$ for all $n\geq 1$. Also,
$$
\log F(s)=\sum_p\sum_{m=1}^{\infty}m^{-1}p^{-ms}(1+\chi_1(p^{m}))(1+\chi_2(p^{m}))
$$
For $|s-2|<1$,
$$
F(s)=\sum_{m=0}^{\infty}b_n(2-s)^{m}
$$
with $b_0\geq 1,b_m\geq 0$ for all $m\geq 1$. Now consider the regular function
$$
F(s)-\frac{\lambda}{s-1}=\sum_{m=0}^{\infty}(b_m-\lambda)(2-s)^m
$$
Choose the circle $|s-2|=\frac{3}{2}$ within which $\zeta(s)$ is bounded. Since for $i=1,2$
$$
L(s,\chi_i)=O(q_i),\quad L(s,\chi_1\chi_2)=O(q_1q_2)
$$
So $F(s)=O(q_1^2q_2^2)$. By Cauchy's Inequality, for some constant $C_3$
$$
|b_m-\lambda|<C_3 q_1^2q_2^2 \left( \frac{2}{3} \right)^m
$$
Therefore, for $\frac{7}{8}\leq s<1$,
$$
\sum_{m=M}^\infty |b_m-\lambda|(2-s)^m =O(q_1^2q_2^2e^{-M/4})
$$
Choose $M$ such that
$$
\frac{1}{2}e^{-\frac{1}{4}}\leq C_3 q_1^2q_2^2e^{-\frac{M}{4}}<\frac{1}{2}
$$

$$
F(s)>\frac{1}{2}-\frac{\lambda}{{1-s}}(2-s)^M>\frac{1}{2}-\frac{c_4\lambda}{{1-s}}(q_1q_2)^{8(1-s)}
$$

This concludes the proof.



Proof of Theorem 1: Assume $\chi_1$ is a real primitive character with a real zero $\beta_1$ between $1-\frac{1}{16}\varepsilon$ and $\varepsilon$. If there is no such character, choose any real primitive character with any number in the interval. Since $\zeta(s)$ is negative for $0<s<1$ and all of the three L-functions are positive when $s=1$ and does not vanish in $[\beta_1,1]$. So $F(\beta_1)\leq 0$ in each case. By Lemma 1,
$$
c_4\lambda>\frac{1}{2}(1-\beta_1)(q_1q_2)^{-8(1-\beta_1)}
$$
where $c_4$ only depends on $\varepsilon$. Let $\chi_2$ be any real primitive character modulo $q_2>q_1$. Then $\lambda=O((\log q_1) L(1,\chi_2)(\log q_2))$. This implies
$$
L(1,\chi_2)>Cq_2^{-8(1-\beta_1)}(\log q_2)^{-1}
$$
where $C$ is a constant depending on $\varepsilon$ and $\beta_1$. This concludes the proof.

Note that $\beta_1$ is not estimated in the argument, and $C$ contains a term of $(1-\beta_1)$. Thus the estimate is ineffective.



##  Tatuzawa's Theorem

Let q be a positive integer and $\chi$ be a nonprincipal primitive real character mod q. Then from the class number formula, one can show that
$$
L(1,\chi)\geq 2\log\frac{1+\sqrt{5}}{2}\frac{1}{\sqrt{q}}
$$
Let $\chi$, $\chi_1$, $\chi_2$ be primitive real characters modulo $q,q_1,q_2\geq e^{11.2}$. Let 
$$
F(s)=\zeta(s)L(s,\chi)=\sum_{n=1}^{\infty}a_nn^{-s}=\sum_{m=0}^{\infty}a_m^*(2-s)^m\\
G(s)=\zeta(s)L(s,\chi_1)L(s,\chi_2)L(s,\chi_1\chi_2)=\sum_{n=1}^{\infty}b_nn^{-s}=\sum_{m=0}^{\infty}b_m^*(2-s)^m
$$
It is well known that $a_n,b_n\geq 0$ for $n\geq 1$ and $a_n,b_n\geq 1$ for $n$ being a perfect square. Let 
$$
E(n,s)=\sum_{r=0}^{n-1}\sum_{m=1}^{\infty}\frac{(2\log m)^r}{m^4 r!}(2-s)^r\leq\min(\sum_{r=0}^{n-1}a_r^*(2-s)^r, \sum_{r=0}^{n-1}b_r^*(2-s)^r)
$$
We could show that 
$$
E(n,s)>\zeta(2s)-\frac{1}{(2s-1)l^{2s-1}}-\frac{\zeta(2s)-1}{\sqrt{2n\pi}}\left(\frac{2e(2-s)\log l}{n}\right)^n
$$


Lemma 2: If $0<\varepsilon<\frac{1}{2},k\geq e^{1/\varepsilon}$, and $L(1,\chi)\leq 0.655\frac{\varepsilon}{k^\varepsilon}$. Then $L(s,\chi)$ has at least one real zero in $(1-\frac{\varepsilon}{4},1)$.

Proof: We can show that for $0<\varepsilon<\frac{1}{2}$, $F(s)>1.612-19k^{\varepsilon/2-0.715}-L(1,\chi)4\varepsilon^{-1}k^{2(1-s)}$.$F(s_2)>1.612-19k^{\varepsilon/2-0.715}-2.62k^{-\varepsilon/2}>0$ 

Lemma 3: For $\frac{7}{8}<s<1$, $G(s)>1.637-L(1,\chi_1)L(1,\chi_2)L(1,\chi_1\chi_2)\frac{(k_1k_2)^{3(1-s)}}{1-s}$.

Proof: Write $F(s)=\sum_{n=0}^{\infty}a_m^*(2-s^m)$, $G(s)=\sum_{n=0}^{\infty}b_m^*(2-s^m)$. Then the partial sums $\sum_{0}^{n-1}$ are bounded by $E(n,s)=\sum_{r=0}^{n-1}\sum_{m=1}^{\infty}\frac{(2\log m)^r}{m^4 r!}(2-s)^r>1.6448$. And $G(s)>E(n,s)-L\frac{(k_1k_2)^{3(1-s)}}{1-s}-208(k_1k_2)^{1.049}\frac{5}{3}(k_1k_2)^{3(1-s)}$ for any positive integer and $\frac{7}{8}<s<1$. This concludes the proof.



Proof of Theorem 3: Let $\varepsilon>0$. Note that $\frac{k^\varepsilon}{\varepsilon}$ convex function of $\varepsilon$, with minimum value $e\log k$ at $\varepsilon=\frac{1}{\log k}$. So $L(1,\chi)>\frac{0.96}{\sqrt{k}}\geq \frac{0.96}{\sqrt{k}}e\log k \frac{\varepsilon}{k^\varepsilon}>0.96e\frac{11.2}{e^{5.6}}\frac{\varepsilon}{k^\epsilon}>\frac{\varepsilon}{10k^\varepsilon}$ for $k>e^{11.2}$. The case when $\varepsilon<\frac{1}{2}$ and $k\geq e^{11.2}$ is similar to the next Theorem, which we are going to prove.

Suppose $L(1,\chi_i)\leq 0.655 \frac{\varepsilon}{k_i^\varepsilon} (i=1,2)$. $\chi_1\neq\chi_2$, $\varepsilon<\frac{1}{2}$, $k_i\geq\max(e^{1/\varepsilon},e^{11.2})$ for $(i=1,2)$. Let $F(s)=\zeta(s)L(s,\chi)$, $G(s)=\zeta(s)L(s,\chi_1)L(s,\chi_2)L(s,\chi_1\chi_2)$. Then by a lemma, $L(s,\chi_1)$ and $L(s,\chi_2)$ have real zeros in the interval $(1-\frac{\varepsilon}{4},1)$. So $G(s)$ has at least two real zeros in the interval.

Now let $s_1=1-\frac{1}{8\log{k_1k_2}}\geq s_2=1-\frac{\varepsilon}{4}$. Then we can show that $L(1,\chi_1)L(1,\chi_2)L(1,\chi_1\chi_2)\frac{(k_1k_2)^{3(1-s_1)}}{1-s_1}<1.637$. Also $L(1,\chi_1)L(1,\chi_2)L(1,\chi_1\chi_2)\frac{(k_1k_2)^{3(1-s_2)}}{1-s_2}<1.637$

By a lemma, $G(s)$ is positive in $[s_2,s_1]$. So $G(s)$ has more than 2 real zeros in $[s_1,1]$. But $G(s_1)>0$ and $\lim_{s\to1^-}G(s)=-\infty$. So $G(s)$ has at least three zeros in $[s_1,1]$. But another lemma states that the number of zeros in the interval is at most 2, so this leads to a contradiction.

Note that we only prove that for every $\varepsilon<\frac{1}{2}$, there cannot be 2 such characters with different moduli such that $L(1,\chi)\leq 0.655 \frac{\varepsilon}{k^\varepsilon}$, but we cannot prove the nonexistence of the possible exception for any $0<\varepsilon<\frac{1}{2}$ by this argument. So further research is needed to either find some exception of $k$, or prove the exception does not exist for all small enough $\varepsilon$.
