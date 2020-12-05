---
layout: post
current: post
cover:  assets/images/d2l/artificial-neural-network.png
navigation: True
title: D2L 3 - Softmax Regression
date: 2019-06-15 10:00:00
tag :
  - deep learning
  - softmax
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> This is a post that I organized while studying [D2L(Dive into Deep Learning)](https://d2l.ai/index.html){: target="_blank"} exercises.

#### What is Softmax

Softmax is a procedure producing **probabilities** that maximize the **likelihood** of the observed data.

We define the label with the probability of the data we observe.

### Cross Entropy Loss

We can think of the cross-entropy classification objective in two ways: (i) as maximizing the likelihood of the observed data; and (ii) as minimizing our surprise (and thus the number of bits) required to communicate the labels.

#### Negative Log-likelihood Loss Function

What we want is to **maximize** the likelihood of data. And the expression is below.

$P(Y \mid X) = \prod_{i=1}^n P(y^{(i)} \mid x^{(i)})$

For the convenience of math, we plug (natural) logarithm.

By plugging log to this expression, `product` gets replaced by `sum`.

Since optimizers typically do minimize a function, minimizing the expression is more advantageous rather than maximizing.

And fortunately, logarithm is a monotonically increasing function.

That is the reason we use **NEGATIVE** Log-likelihood loss function!


### Exercise : Softmax Regression

###### 1) Show that the Kullback-Leibler divergence $D(p\|\|q)$ is nonnegative for all distributions $p$ and $q$. Hint: use Jensen’s inequality, i.e., use the fact that $−logx$ is a convex function.

###### 2) Show that $\log \sum_j \exp(o_j)$ is a convex function in $o$.

###### 3) We can explore the connection between exponential families and the softmax in some more depth

- Compute the second derivative of the cross-entropy loss$l(y,\hat{y})$ for the softmax.

- Compute the variance of the distribution given by $softmax(o)$ and show that it matches the second derivative computed above.

###### 4) Assume that we have three classes which occur with equal probability, i.e., the probability vector is $(\dfrac{1}{3}, \dfrac{1}{3}, \dfrac{1}{3})$.

- What is the problem if we try to design a binary code for it? Can we match the entropy lower bound on the number of bits?

- Can you design a better code. Hint: what happens if we try to encode two independent observations? What if we encode  n  observations jointly?

###### 5) Softmax is a misnomer for the mapping introduced above (but everyone in deep learning uses it). The real softmax is defined as $\mathrm{RealSoftMax}(a, b) = \log (\exp(a) + \exp(b))$.

- Prove that $\mathrm{RealSoftMax}(a, b) > \mathrm{max}(a, b)$.

- Prove that this holds for $\lambda^{-1} \mathrm{RealSoftMax}(\lambda a, \lambda b)$, provided that $\lambda > 0$.

- Show that for $\lambda \to \infty$ we have $\lambda^{-1} \mathrm{RealSoftMax}(\lambda a, \lambda b) \to \mathrm{max}(a, b)$.

- What does the soft-min look like?

- Extend this to more than two numbers.

### References

- Why do we minimize NLL <https://stats.stackexchange.com/questions/141087/why-do-we-minimize-the-negative-likelihood-if-it-is-equivalent-to-maximization-o>{: target="_blank"}

- about MLE <https://towardsdatascience.com/probability-concepts-explained-maximum-likelihood-estimation-c7b4342fdbb1>{: target="_blank"}

- about Entropy <https://hyunw.kim/blog/2017/10/14/Entropy.html>{: target="_blank"}

