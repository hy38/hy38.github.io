---
layout: post
current: post
cover:  assets/images/d2l/artificial-neural-network.png
navigation: True
title: D2L 3 - Image Classification Implementation from Scratch
date: 2019-06-24 10:00:00
tag :
  - deep learning
  - image classification
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> This is a post that I organized while studying [D2L(Dive into Deep Learning)](https://d2l.ai/index.html){: target="_blank"} exercises.

### Exercise : Image Classification Implementation from Scratch

###### 1) In this section, we directly implemented the softmax function based on the mathematical definition of the softmax operation. What problems might this cause (hint: try to calculate the size of $exp(50)$)?

The result of exp(50.0) is tensor([5.1847e+21]).

```python
X = torch.tensor(50.0)
print(torch.exp(X))

# Result :
# tensor([5.1847e+21])
```

The result is as below.

`5,184,700,000,000,000,000,000`

When implementing expressions in computer, we should care about overflows, underflows even though it is mathmatically right.

I have experimented $exp(X)$ with some numbers and noticed that when the number gets bigger than `88.7`, the output is printed as `tensor([inf])`.

We should be more careful of over / underflows when computing numerical values.

###### 2) The function cross_entropy in this section is implemented according to the definition of the cross-entropy loss function. What could be the problem with this implementation (hint: consider the domain of the logarithm)?

$\log(0)$ has the value of `-inf`. When implementing cross-entropy loss function, this might cause some problems.

###### 3) What solutions you can think of to fix the two problems above?

###### 4) Is it always a good idea to return the most likely label. E.g., would you do this for medical diagnosis?

###### 5) Assume that we want to use softmax regression to predict the next word based on some features. What are some problems that might arise from a large vocabulary?


### References

- <>{: target="_blank"}

- <>{: target="_blank"}