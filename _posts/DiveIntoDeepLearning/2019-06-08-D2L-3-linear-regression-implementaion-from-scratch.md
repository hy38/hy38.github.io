---
layout: post
current: post
cover:  assets/images/d2l/artificial-neural-network.png
navigation: True
title: D2L 3 - Linear Regression Implementation from Scratch
date: 2019-06-08 10:00:00
tag :
  - deep learning
  - linear regression
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> This is a post that I organized while studying [D2L(Dive into Deep Learning)](https://d2l.ai/index.html){: target="_blank"} exercises.

### Exercise : Linear Regression Implementation from Scratch

###### 1) What would happen if we were to initialize the weights $w=0$. Would the algorithm still work?

```python
w = torch.zeros(size=(2,1), requires_grad=True)
print(w)

# Result :
# tensor([[0.],
        # [0.]], requires_grad=True)
```

```python
# epoch 1, loss 9.015191078186035
# epoch 2, loss 5.008845329284668
# epoch 3, loss 2.783064842224121
# epoch 4, loss 1.5464041233062744
# epoch 5, loss 0.8592801094055176
# epoch 6, loss 0.4775138795375824
# epoch 7, loss 0.26536378264427185
# epoch 8, loss 0.1474914401769638
# epoch 9, loss 0.08198854327201843
# epoch 10, loss 0.045585036277770996
```

The initialization to zero did not matter to the training algorithm.

###### 2) Assume that you are Georg Simon Ohm trying to come up with a model between voltage and current. Can you use auto differentiation to learn the parameters of your model.

The Ohm's law is a relationship between voltage, current, resistance. Setting current as the target value $y$, and the voltage as $x$, we get this equation.

$I = \dfrac{V}{R}, y = \dfrac{x}{R}$

By using mean-squared loss function with SGD, we can use `backward()` as follows.

```python
def f(X, R, b):
    return (X / R) + b

l = loss(f(X, R, b), y)  # Minibatch loss in X and y
l.mean().backward()  # Compute gradient on l with respect to [w,b]
```

###### 3) Can you use Planck’s Law to determine the temperature of an object using spectral energy density?

Planck's law is the equation among `wavelength`, `spectral energy density`, `temperture`. 

![planck_law](https://user-images.githubusercontent.com/34434143/84217437-1b569000-ab07-11ea-97f6-1af76307d92d.png)

By transpositing I and T, we get the equation below.

$T(I, v) = \dfrac{hv}{Kln \dfrac{2hv^3}{c^2I}}$

###### 4) What are the problems you might encounter if you wanted to compute the second derivatives? How would you fix them?

The first derivative may be a constant which goes to 0 when we derivate once more.

Also, the function might not be derivable.

###### 5) Why is the reshape function needed in the squared_loss function?

y_hat is the result of matrix multiplication between $X$ and $w$.

The shape of matmul(X, w) would be (1000, 1).

Since we previously set the batch size batch_size to 10, the loss shape l for each minibatch is (10, 1).

The shape of y_hat is (10, 1) and the shape of y is (10).

```python
print('y_hat shape:', net(X, w, b).shape, 'y shape: ', y.shape)
# Result :
# y_hat shape: torch.Size([10, 1]) y shape:  torch.Size([10])
```

###### 6) Experiment using different learning rates to find out how fast the loss function value drops.

- lr = 0.03, batch size = 10, epoch = 10

```python
# epoch 1, loss 8.98647689819336
# epoch 2, loss 4.993009567260742
# epoch 3, loss 2.7741053104400635
# epoch 4, loss 1.541479229927063
# epoch 5, loss 0.8565448522567749
# epoch 6, loss 0.47596117854118347
# epoch 7, loss 0.2645193934440613
# epoch 8, loss 0.1470237821340561
# epoch 9, loss 0.08172017335891724
# epoch 10, loss 0.045438218861818314
```

- lr = 0.1, batch size = 10, epoch = 10

```python
# epoch 1, loss 2.2391698360443115
# epoch 2, loss 0.3058370053768158
# epoch 3, loss 0.04183046892285347
# epoch 4, loss 0.005764374043792486
# epoch 5, loss 0.0008321439381688833
# epoch 6, loss 0.00015854007506277412
# epoch 7, loss 6.705385749228299e-05
# epoch 8, loss 5.424357368610799e-05
# epoch 9, loss 5.2451756346272305e-05
# epoch 10, loss 5.219781451160088e-05
```

- lr = 0.3, batch size = 10, epoch = 10

```python
# ch 1, loss 0.041470203548669815
# epoch 2, loss 0.0001545503328088671
# epoch 3, loss 5.335054447641596e-05
# epoch 4, loss 5.316684837453067e-05
# epoch 5, loss 5.3126728744246066e-05
# epoch 6, loss 5.326157042873092e-05
# epoch 7, loss 5.310575943440199e-05
# epoch 8, loss 5.3188410674920306e-05
# epoch 9, loss 5.316302849678323e-05
# epoch 10, loss 5.317722025210969e-05
```

- lr = 0.01, batch size = 10, epoch = 10

```python
# epoch 1, loss 13.367563247680664
# epoch 2, loss 10.992039680480957
# epoch 3, loss 9.03872013092041
# epoch 4, loss 7.43253231048584
# epoch 5, loss 6.1117939949035645
# epoch 6, loss 5.025759696960449
# epoch 7, loss 4.132733345031738
# epoch 8, loss 3.398400068283081
# epoch 9, loss 2.794539451599121
# epoch 10, loss 2.297992706298828
```

The best learning rate above is 0.3.

###### 7) If the number of examples cannot be divided by the batch size, what happens to the data_iter function’s behavior?

In Pytorch DataLoader, there is a parameter called drop_last. It makes the last batch smaller by default.

```
drop_last (bool, optional): set to ``True`` to drop the last incomplete batch,
    if the dataset size is not divisible by the batch size. If ``False`` and
    the size of dataset is not divisible by the batch size, then the last batch
    will be smaller. (default: ``False``)
```

### References

- <https://pytorch.org/docs/stable/torch.html>{: target="_blank"}

- <https://pytorch.org/docs/1.1.0/_modules/torch/utils/data/dataloader.html>{: target="_blank"}