---
layout: post
current: post
cover:  assets/images/d2l/artificial-neural-network.png
navigation: True
title: D2L 3 - Linear Regression
date: 2019-06-06 10:00:00
tag :
  - deep learning
  - linear regression
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> This is a post that I organized while studying [D2L(Dive into Deep Learning)](https://d2l.ai/index.html){: target="_blank"} exercises.

### Prediction vs Inference

`Prediction` means using the model to predict the outcomes for **new data points**. The word `prediction` is generally used in machine learnings and deep learnings.

`Inference` means using the model to learn about the data generation process. It denotes estimating parameters based on a dataset. It is generally used in statistics.

### MLE(Maximum Likelihood Estimation) vs MAP(Maximum a Posteriori Estimation)

**MLE is one of the method of estimation $\theta$, making the maximum likelihood.**

$\hat \theta = \arg\max_\theta \mathcal L (\theta;X) = \arg\max_\theta f(X\|\theta)$

MLE is very dependent on the observation (or given data).

We usually use Maximum **Log**-Likelihood Estimation due to the simple computation.

**Because MLE is very dependent on the observation, we bring up another method called MAP. MAP is based on MLE and Bayes's Theorem.**

$\hat \theta = \arg\max_\theta f(\theta\|X)$

Because MAP uses both observation data and assumptions of prior data, MAP makes us get more general parameter estimation than MLE.

However, to use the method of MAP, we need to know about $f(\theta)$.

If we have enough assumptions about `prior` data we can make better estimation.

Of course the `prior` data is very important since the setimation refers to the prior data. For example, if we have bad prior data, the estimation also gets bad.

### Exercise : Linear Regression

###### 1) Assume that we have some data  $x_1, \ldots, x_n \in \mathbb{R}$ . Our goal is to find a constant $b$ such that $\sum_i (x_i - b)^2$ is minimized.

  - Find a closed-form solution for the optimal value of b .

The problem comes to be minimizing $\sum x_i - b$. It can be represented as $(x_1 + x_2 + ... + x_n) - (nb)$.
Since we can notate the $x$s as a vector, minimizing this function to zero is as follows.

$b = \dfrac{\mathbf{x}}{n}$

You may have noticed that it is the average of data $\mathbf{x}$.

Also, we can think $b$ in $x_i - b$ as a point that minimizes the $x$ values in a `number line`.

  - How does this problem and its solution relate to the normal distribution?

Since $b$ is the average of data $\mathbf{x}$, we can denote $(x_i - b)$ in a different way as $\mathbf{X} - \mu$.

###### 2) Derive the closed-form solution to the optimization problem for linear regression with squared error. To keep things simple, you can omit the bias $b$ from the problem (we can do this in principled fashion by adding one column to $X$ consisting of all ones).

  - Write out the optimization problem in matrix and vector notation (treat all the data as a single matrix, all the target values as a single vector).

$L(\mathbf{w}, b) =\frac{1}{n}\sum_{i=1}^n l^{(i)}(\mathbf{w}, b) =\frac{1}{n} \sum_{i=1}^n \frac{1}{2}\left(\mathbf{w}^\top \mathbf{x}^{(i)} + b - y^{(i)}\right)^2$

By vectorizing the above expression, we get the expression below.

$L(\mathbf{w}, b) = \frac{1}{n} \frac{1}{2}(\mathbf{X}\mathbf{w} - \mathbf{y})^2$

  - Compute the gradient of the loss with respect to $w$.

The gradient of the equation with respect to $w$ is as below.

$\dfrac{1}{n} (\mathbf{X} \mathbf{w} - \mathbf{y}) X$.

  - Find the closed form solution by setting the gradient equal to zero and solving the matrix equation.

Since $\dfrac{1}{n} (\mathbf{X} \mathbf{w} - \mathbf{y}) X = 0$, we remove the $\dfrac{1}{n}$ term, $X$ term.
  
Thus, the equation changes as follows.
  
$\mathbf{X} \mathbf{w} - \mathbf{y} = 0$.

Then, we will multiply $mathbf{X}^T$ and develop the equation as
  
$\mathbf{X}^T \mathbf{X} \mathbf{w} - \mathbf{X}^T \mathbf{y} = 0$.

Finally, we get this **normal equation** below.
  
$\mathbf{w} = (\mathbf X^\top \mathbf X)^{-1}\mathbf X^\top \mathbf{y}.$

  - When might this be better than using stochastic gradient descent? When might this method break?

(1) Normal equation method

Because this method is non-iterative, this normal equation method is better when we deal datas which size is under 10000. But, this method does inverse matrix calculation, having time-complexity of $O(n^3)$.

Also, we do not have to care about the learning rate.

(2) Stochastic gradient descent

On the other hand, using stochastic gradient descent is useful when dealing with large datas(n $\geq$ 10000).

This method has time-complexity of $O(kn^2)$.

However, we need special care for learning rate to use this method.

###### 3) Assume that the noise model governing the additive noise ϵ is the exponential distribution. That is, $p(\epsilon) = \frac{1}{2} \exp(-|\epsilon|)$.

  - Write out the negative log-likelihood of the data under the model $-\log P(Y \mid X)$.

$-\log p(\mathbf y\|\mathbf X) = \sum_{i=1}^n \frac{1}{2} \log(2 \pi \sigma^2) + \frac{1}{2 \sigma^2} \left(y^{(i)} - \mathbf{w}^\top \mathbf{x}^{(i)} - b\right)^2.$

  - Can you find a closed form solution?

We want to find the solution of $w$ that minimizes the NLL(Negative Log-Likelihood) function.

Since this function is dependent on $w$ and $b$, we could ignore the first term and the $\sigma$.

Doing the derivative and setting the gradient to *zero* comes up with this solution below.

$w = (X^TX)^{-1}X^TY.$

It is same with normal equation.

  - Suggest a stochastic gradient descent algorithm to solve this problem. What could possibly go wrong (hint - what happens near the stationary point as we keep on updating the parameters). Can you fix this?



### References

- MLE MAP post <https://sanghyukchun.github.io/58/>{: target="_blank"}

- why NLL? <https://ratsgo.github.io/deep%20learning/2017/09/24/loss/>{: target="_blank"}

- MLE <https://ratsgo.github.io/statistics/2017/09/23/MLE/>{: target="_blank"}

- <https://www.datascienceblog.net/post/commentary/inference-vs-prediction/>{: target="_blank"}

- [https://hy38.github.io/MLcoursera-2-1](/MLcoursera-2-1){: target="_blank"}

- edwith normal equation <https://www.edwith.org/linearalgebra4ai/lecture/24131/>{: target="_blank"}