---
layout: post
current: post
cover:  assets/images/d2l/artificial-neural-network.png
navigation: True
title: D2L 3 - Image Classification Dataset
date: 2019-06-21 10:00:00
tag :
  - deep learning
  - image classification
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> This is a post that I organized while studying [D2L(Dive into Deep Learning)](https://d2l.ai/index.html){: target="_blank"} exercises.

### Exercise : Image Classification Dataset

###### 1) Does reducing the batch_size (for instance, to 1) affect read performance?

When the `batch_size` increases, the read makes better performance.

But when the `batch_size` gets bigger than 512, performance gets worse.

```python
b_result = []
batch_size = [1, 2, 4, 8, 16, 32 ,64 ,128, 256, 512, 1024, 2048]
for b_s in batch_size:
    train_iter = data.DataLoader(mnist_train, b_s, shuffle=True, 
                                 num_workers=get_dataloader_workers())
    timer = d2l.Timer()
    for X, y in train_iter:
        continue
    b_result.append(timer.stop())

cnt = 0
for i in b_result:
    print("batch_size:", batch_size[cnt], ", time: {:.2f}".format(i))
    cnt+=1

# Result :
# batch_size: 1 , time: 245.93
# batch_size: 2 , time: 127.68
# batch_size: 4 , time: 66.66
# batch_size: 8 , time: 43.02
# batch_size: 16 , time: 19.77
# batch_size: 32 , time: 11.95
# batch_size: 64 , time: 9.08
# batch_size: 128 , time: 7.61
# batch_size: 256 , time: 6.64
# batch_size: 512 , time: 7.20
# batch_size: 1024 , time: 7.09
# batch_size: 2048 , time: 8.27
```

```python
x = batch_size
d2l.plot(x, b_result, figsize=[5, 5], xlabel='batch_size', ylabel='time')
```

The **best** `batch_size` seems to be `256`.

![bs-time-plot](https://user-images.githubusercontent.com/34434143/85409820-40381200-b5a1-11ea-9940-9b34df4bc922.png)

###### 2) For non-Windows users, try modifying num_workers to see how it affects read performance. Plot the performance against the number of works employed.

Since my computer is a 2-core processor, I set the `workers` as [1, 2].

Also, as we know our best `batch_size`, I will set my `batch_size` to 256.

The performance increased when using 2 cores, and the plot is below.

```python
batch_size = 256
result = []
for workers in [1, 2]:
    train_iter = data.DataLoader(mnist_train, batch_size, shuffle=True, 
                             num_workers=workers)
    timer = d2l.Timer()
    for X, y in train_iter:
        continue
    result.append(timer.stop())

cnt = 1
for i in w_result:
    print("workers:", cnt, ", time: {:.2f}".format(i))
    cnt+=1

# Result : 
# workers: 1 , time: 18.48
# workers: 2 , time: 14.81
```

I made a really simple plot. Because I have only 2 data, it is hard to analyze the result of graph.

```python
x = [1, 2]
d2l.plot(x, result, figsize=[4.5, 2.5], xlabel='workers', ylabel='time')
```

![workers-time-plot](https://user-images.githubusercontent.com/34434143/85411032-cd2f9b00-b5a2-11ea-9669-37da22a2536e.png)

###### 3) Use the framework’s API document website to see which other datasets are available.

You can see 27 available datasets [**here**](https://pytorch.org/docs/stable/torchvision/datasets.html){: target="_blank"}.

MNIST
Fashion-MNIST
KMNIST
EMNIST
QMNIST
FakeData
COCO
Captions
Detection
LSUN
ImageFolder
DatasetFolder
ImageNet
CIFAR
STL10
SVHN
PhotoTour
SBU
Flickr
VOC
Cityscapes
SBD
USPS
Kinetics-400
HMDB51
UCF101
CelebA

### References

- <https://pytorch.org/docs/stable/torchvision/datasets.html>{: target="_blank"}

- About batch, SGD vs MBGD <https://light-tree.tistory.com/133>{: target="_blank"}