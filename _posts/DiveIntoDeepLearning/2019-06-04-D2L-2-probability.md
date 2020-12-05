---
layout: post
current: post
cover:  assets/images/d2l/brain.png
navigation: True
title: D2L 2 - Probability
date: 2019-06-04 10:00:00
tag :
  - deep learning
  - probability
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> This is a post that I organized while studying [D2L(Dive into Deep Learning)](https://d2l.ai/index.html){: target="_blank"} exercises.

### Exercise : Probability

###### 1) We conducted 𝑚=500 groups of experiments where each group draws 𝑛=10 samples. Vary 𝑚 and 𝑛. Observe and analyze the experimental results.

I have varied m and n arbitrary and got these graphs below.

- Increasing drawing samples(n)

```python
counts = np.random.multinomial(1000, fair_probs, size=500)
```

![500m_1000n](https://user-images.githubusercontent.com/34434143/83719462-1b234400-a672-11ea-9b68-ea60fb6f6c58.png)

```python
counts = np.random.multinomial(100000, fair_probs, size=500)
```

![500m_100000n](https://user-images.githubusercontent.com/34434143/83719608-63426680-a672-11ea-9cf7-2a5d9bb96e8a.png)



- Increasing number of groups(m)

```python
counts = np.random.multinomial(10, fair_probs, size=50000)
```

![50000m_10n](https://user-images.githubusercontent.com/34434143/83719738-b3b9c400-a672-11ea-9be4-aceab07e70b9.png)


- Increasing both number of groups and the samples each group draws.

```python
counts = np.random.multinomial(1000, fair_probs, size=50000)
```

![50000m_1000n](https://user-images.githubusercontent.com/34434143/83719871-f8455f80-a672-11ea-90e5-9fe4d7237e7f.png)


###### 2) Given two events with probability 𝑃(A) and 𝑃(B), compute upper and lower bounds on 𝑃(A∪B) and 𝑃(A∩B). (Hint: display the situation using a Venn Diagram.)

$ 0 \leq 𝑃(A∪B) \leq 1 $

$ 0 \leq 𝑃(A∩B) \leq 0.5$

The upper bound of 𝑃(A∪B) is when A and B is mutually exclusive. If P(A) + P(B) = 1, it becomes the upper bound. Also, the upper bound of 𝑃(A∩B) is when A is in B or B is in A. If P(A) = P(B) = 0.5, it becomes the upper bound.

On the other hand, the lower bound 𝑃(A∪B) is when A is in B or vice versa. If P(A) = P(B) = 0, it becomes the lower bound. The lower bound of 𝑃(A∩B) is when A and B is mutually exclusive. Then the lower bound of 𝑃(A∩B) becomes 0.

You can notice that these two are opposite.

###### 3) Assume that we have a sequence of random variables, say 𝐴, 𝐵, and 𝐶, where 𝐵 only depends on 𝐴, and 𝐶 only depends on 𝐵, can you simplify the joint probability 𝑃(𝐴,𝐵,𝐶)? (Hint: this is a Markov Chain.)

We need to analyze the relationship of A, B, C first.

Because C only depends on B, C only occurs when B occurs. So P(B) = P(C).

Similarly, because B depends on A, B only occurs when A occurs. So P(A) = P(B).

Combining these two relations, P(A) = P(B) = P(C).

Thus, P(A, B, C) is P(A) (or P(B) or P(C) since the three are same).


###### 4) In [Section 2.6.2.6](https://d2l.ai/chapter_preliminaries/probability.html#subsec-probability-hiv-app){: target="_blank"}, the first test is more accurate. Why not just run the first test a second time?

Using the different test, the two test get conditionally independent given the disease state of the patient.

So, by conjuncting with the first test, will have a lower false discovery rate.

### References

- <http://web.stanford.edu/class/archive/ee/ee178/ee178.1172/hw/hw3_sn.pdf>{: target="_blank"}