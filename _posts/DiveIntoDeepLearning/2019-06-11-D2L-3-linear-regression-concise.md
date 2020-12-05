---
layout: post
current: post
cover:  assets/images/d2l/artificial-neural-network.png
navigation: True
title: D2L 3 - Concise Implementation of Linear Regression
date: 2019-06-11 10:00:00
tag :
  - deep learning
  - linear regression
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> This is a post that I organized while studying [D2L(Dive into Deep Learning)](https://d2l.ai/index.html){: target="_blank"} exercises.

### Exercise : Concise Implementation of Linear Regression

###### 1) If we replace nn.MSELoss() with nn.MSELoss(reduction='sum'), how can we change the learning rate for the code to behave identically. Why?

- default(mean)

```python
loss = nn.MSELoss()
trainer = torch.optim.SGD(net.parameters(), lr = .03)

# Result : 
# epoch 1, loss 0.0003235114854760468
# epoch 2, loss 0.00010156028292840347
# epoch 3, loss 0.00010140725498786196
# epoch 4, loss 0.00010207432933384553
# epoch 5, loss 0.0001025137462420389
# epoch 6, loss 0.00010135988122783601
# epoch 7, loss 0.00010229978943243623
# epoch 8, loss 0.00010266812751069665
# epoch 9, loss 0.00010165313869947568
# epoch 10, loss 0.0001017447721096687
```

- reduction='sum'

```python
loss = nn.MSELoss(reduction='sum')
trainer = torch.optim.SGD(net.parameters(), lr = .03)

# Result : 
# epoch 1, loss 0.13585303723812103
# epoch 2, loss 0.11845800280570984
# epoch 3, loss 0.10822969675064087
# epoch 4, loss 0.1097884401679039
# epoch 5, loss 0.13867419958114624
# epoch 6, loss 0.13072428107261658
# epoch 7, loss 0.10201241821050644
# epoch 8, loss 0.10634788870811462
# epoch 9, loss 0.13075295090675354
# epoch 10, loss 0.11476431041955948
```

###### 2) Review the PyTorch documentation to see what loss functions and initialization methods are provided. Replace the loss by Huber’s loss.

The name of `Huber's loss` is `SmoothL1Loss` in pytorch `torch.nn`.

As you can see the loss below, after epoch 3, the SmoothL1Loss gives us better result.

```python
loss = nn.SmoothL1Loss()
trainer = torch.optim.SGD(net.parameters(), lr = .03)

# Result :
# epoch 1, loss 2.2134926319122314
# epoch 2, loss 0.456503301858902
# epoch 3, loss 0.0023368450347334146
# epoch 4, loss 5.8054902183357626e-05
# epoch 5, loss 5.063020216766745e-05
# epoch 6, loss 5.0628041208256036e-05
# epoch 7, loss 5.068484824732877e-05
# epoch 8, loss 5.080221308162436e-05
# epoch 9, loss 5.061490446678363e-05
# epoch 10, loss 5.0722886953735724e-05
```

More information is in this [link](https://pytorch.org/docs/master/generated/torch.nn.SmoothL1Loss.html?highlight=huber){: target="_blank"}.

Also, you can go [here](https://pytorch.org/docs/master/nn.html#loss-functions){: target="_blank"} to see other loss functions in `torch.nn`.

###### 3) How do you access the gradient of net[0].weight?

We give the parameter net.parameters() to `torch.optim.SGD().

The gradient of net[0].weight can be accessed by the code below.

```python
print(net[0].weight.grad)
print('epoch {}, loss {}'.format(epoch, l))

# Result :
# tensor([[-0.1970,  0.2462]])
# epoch 1, loss 2.210540533065796
# tensor([[-0.3758,  0.1829]])
# epoch 2, loss 0.45404237508773804
# tensor([[-0.0013,  0.0685]])
# epoch 3, loss 0.0022276039235293865
# tensor([[-0.0009,  0.0033]])
# epoch 4, loss 5.720141780329868e-05
# tensor([[0.0016, 0.0007]])
# epoch 5, loss 5.089789192425087e-05
# tensor([[-0.0009,  0.0037]])
# epoch 6, loss 5.0788381486199796e-05
# tensor([[0.0029, 0.0022]])
# epoch 7, loss 5.075278750155121e-05
# tensor([[-0.0009,  0.0028]])
# epoch 8, loss 5.072250496596098e-05
# tensor([[-0.0058,  0.0067]])
# epoch 9, loss 5.0622238632058725e-05
# tensor([[-0.0029,  0.0014]])
# epoch 10, loss 5.065527147962712e-05
```

### References

- <https://pytorch.org/docs/master/generated/torch.nn.MSELoss.html>{: target="_blank"}

- <https://pytorch.org/docs/master/nn.html#loss-functions>{: target="_blank"}

- <https://pytorch.org/docs/master/generated/torch.nn.SmoothL1Loss.html?highlight=huber>{: target="_blank"}

- <https://discuss.pytorch.org/t/how-to-print-the-computed-gradient-values-for-a-network/34179/6>{: target="_blank"}