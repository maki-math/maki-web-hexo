---
title: Lecture 2
date: 2021-07-03 13:43:42
layout: lecture
mathjax: true
---

Introduction to Group
=====================

Course Group of Abstract Algebra

Basic Axioms and Examples
-------------------------

 [\[first\]]{#first label="first"} A binary operation $\star$ on a set
$G$ is a map $G\times G \to G$. For any $a,b \in G$, we write $a\star b$
for $\star(a,b)$.

 

1.  $+$ (usual addition) is a binary operation on $\mathbb{Z}$(or on
    $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$).

2.  $-$ (usual subtraction) is not a binary operation on
    $\mathbb{Z}^{+}$.

 [\[second\]]{#second label="second"} A group is an ordered pair
$(G,\star)$ where $G$ is a set and $\star$ is a binary operation on $G$
satisfying

1.  for all $a,b,c\in G$, $a\star (b\star c)=(a\star b)\star c$ (we say
    the operation is associative)

2.  identity: there exists an element $e\in G$, such that for all
    $a\in G$ we have $a\star e=e\star a=a$

3.  inverse element: for each $a\in G$, there exists an element
    $b\in G$, such that $a\star b=b\star a=e$.

If $(G,\star)$ is a group, we will say $G$ is a group under $\star$, or
just say $G$ is a group when the operation is clear.

The binary operation of group is also called the "multiplication" of
group, it's not same as the multiplication of real numbers. For an
abstract group $G$, the operation will be written as $\cdot$, and
$a\cdot b$ will be written as $ab$ (except when necessary).

If $G$ is a group, and for all $a,b \in G$, we have $ab=ba$, we say $G$
is an abelian (or commutative) group. If $G$ is a finite set, we say $G$
is a finite group.

 

1.  $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$ and $\mathbb{C}$ are
    abelian groups under $+$ with identity $e=0$ and $a^{-1}=-a$ for
    all a.

2.  The set of all full rank $n\times n$ matrices is a group under the
    multiplication of matrix with identity $e=I$ and the inverse of
    matrix.

3.  The set of all $n\times n$ matrices is not a group under the
    multiplication of matrix. But it is a group under the addition of
    matrix.

4.  The set $G=\{-1,1\}$ is a finite group under the multiplication.

 we now prove (2)

(binary operation and associative) Let $G$ be the set of all full rank
$n\times n$ matrices. For any two element $A,B\in G$, the multiplication
$AB$ is still an element in $G$ and satisfies the associative
law.(according to the linear algebra), therefore the multiplication of
matrix is an associative binary operation on $G$.

(identity) Obviously, the identity matrix $I$ is the identity element in
$G$ since $AI=IA=A$ for all $A\in G$.

(inverse element) Any element $A\in G$ is a full rank matrix , thus $A$
has an inverse matrix $A^{-1}$, hence there is an element in $G$ such
that $AA^{-1}=A^{-1}A=I$.

So the set of all full rank $n\times n$ matrices is a group under the
multiplication of matrix.

If $G$ is a group with an operation $\cdot$

1.  the identity element of $G$ is unique

2.  for each $a\in G$, the inverse element $b$ is uniquely determined,
    therefore we denote the unique inverse element of $a$ by $a^{-1}$.

 (1) Assume $e$ and $e'$ are both identity elements of $G$. By the
definition $e=ee'=e'$, therefore the identity is unique.

\(2) Assume $b$ and $c$ are both inverses of $a$ and $e$ is the identity
of $G$. $$\begin{aligned}
    b&=be\\
    &=b(ac)\\
    &=(ba)c\\
    &=ec\\
    &=c\end{aligned}$$

 

1.  $(a^{-1})^{-1}=a$, for all $a\in G$

2.  for any $a, b, c\in G$. If $ab=ac$, then $b=c$, and if $ba=ca$, then
    $b=c$. (the left and right cancellation laws hold in $G$)

3.  $(ab)^{-1}=b^{-1}a^{-1}$.

 (1) According to the definition of group, for any $a\in G$,
$aa^{-1}=e$. Since $a^{-1}\in G$, so $a^{-1}$ has an inverse element
$c=(a^{-1})^{-1}\in G$, such that $a^{-1}c=ca^{-1}=e$. By proposition
1.1.1 and the definition, $(a^{-1})^{-1}=a$. More precisely
$$\begin{aligned}
    (a^{-1})^{-1}&=(a^{-1})^{-1}e\\
    &=(a^{-1})^{-1}(a^{-1}a)\\
    &=((a^{-1})^{-1}a^{-1})a\\
    &=ea=a\end{aligned}$$

\(2) For the left cancellation law, let $a,b,c\in G$ and $ab=ac$.\
Since the inverse of $a$ is unique, we have $$\begin{aligned}
        ab&=ac\\
        a^{-1}(ab)&=a^{-1}(ac)\\
        (a^{-1}a)b&=(a^{-1}a)c\\
        b&=c
    \end{aligned}$$ Similarly the right cancellation law is hold.

\(3) Assume $c=(ab)^{-1}$. $$\begin{aligned}
    (ab)c&=e\\
    a(bc)&=e\\
    a^{-1}(a(bc))&=a^{-1}e\\
    (a^{-1}a)(bc)&=a^{-1}\\
    bc&=a^{-1}\\
    b^{-1}(bc)&=b^{-1}a^{-1}\\
    c&=b^{-1}a^{-1}\end{aligned}$$

Let $G$ be a group and $a,b\in G$. The equation $ax=b$ has unique
solution for $x\in G$, and $ya=b$ has unique solution for $y\in G$.

Since $ax=b$, we multiply both sides on the left by $a^{-1}$ and
simplifying to get $x=a^{-1}b$. Since $a^{-1}$ is uniquely determined,
so $x=a^{-1}b$ is unique. Similarly if $ya=b, y=ba^{-1}$.

\*Similar Structures
--------------------

 

A semigroup is a nonempty set $G$ with binary operation $\cdot$,
satisfying for all $a,b,c\in G$, $a\cdot (b\cdot c)=(a\cdot b)\cdot c$.

 

A monoid is a semigroup containing identity element $e$ such that
$ea=ae=a$ for all $a\in G$.

 

1.  The set of all $n\times n$ matrices is a monoid under the
    multiplication of matrix.

2.  ${\mathbb{Z}}$ is a monoid under multiplication.

3.  The set of all even number is a semigroup under the multiplication.

\*Equivalent Condition of a Group
---------------------------------

 Let $G$ be a semigroup, then $G$ is a group if and only if the
following conditions hold:

1.  there exists an element $e\in G$ such that $ea=a$ for all $a\in G$
    (left identity element).

2.  for each $a\in G$, there exists an element $a^{-1}\in G$ such that
    $a^{-1}a=e$ (left inverse).

 $\Rightarrow$ Obviously.

$\Leftarrow$ Considering $(aa^{-1})(aa^{-1})$ $$\begin{aligned}
    (aa^{-1})(aa^{-1})&=a(a^{-1}a)a^{-1}\\
    &=aea^{-1}\\
    &=aa^{-1}\end{aligned}$$ Multiply both sides on the left by
$(aa^{-1})^{-1}$. According to (2), we have $(aa^{-1})=e$, so $a^{-1}$
is a two-sided inverse. Since $ae=a(a^{-1}a)=(aa^{-1})a=ea=a$, so $e$ is
a two-sided identity element. Therefore $G$ is a group by the definition
of group.

 

If $G$ is a semigroup, then $G$ is a group if and only if for all
$a,b\in G$, equations $ax=b$ and $ya=b$ have solutions in $G$.

 $\Rightarrow$ Obviously.

$\Leftarrow$ According to the condition, for any $a\in G$, we have
$e_{a}$ as a solution of $ax=a$. Assume $b\neq a \in G$, considering the
equation $ax=b$, we have its solution $d$, which means $ad=b$. Then
$e_{a}b=e_{a}ad=ad=b$, so $e_{a}$ is the left identity element in $G$.

Since $e_{a}$ is the left identity element in $G$, considering the
equation $ya=e_{a}$, its solution is a left inverse of $a$.

Therefore $G$ is a group by the Proposition 1.1.3.

We should notice that the conditions in these propositions don't require
the uniqueness which is consistent with the definition of group.
