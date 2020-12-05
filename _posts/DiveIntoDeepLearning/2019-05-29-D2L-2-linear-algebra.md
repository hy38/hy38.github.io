---
layout: post
current: post
cover:  assets/images/d2l/brain.png
navigation: True
title: D2L 2 - Linear Algebra
date: 2019-05-29 10:00:00
tag :
  - deep learning
  - linear algebra
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> This is a post that I organized while studying [D2L(Dive into Deep Learning)](https://d2l.ai/index.html){: target="_blank"} exercises.

### Exercise : Linear Algebra (Basic)

###### 1) Prove that the transpose of a matrix A's transpose is  A : $(𝐀^T)^⊤ = A$.

By transposing matrix A size of n x m, $A_(ij)$ turns into $A_(ji)$. Transposing $A_(ji)$ turns to be $A_(ij)$, the origin A itself. 

###### 2) Given two matrices A and B, show that the sum of transposes is equal to the transpose of a sum: $A^T + B^T = (A + B)^T$.

This can be shown with some short line of codes below.

```python
A = np.random.normal(0, 1, size=(4, 5))
B = np.random.normal(0, 1, size=(4, 5))

At = A.T
Bt = B.T

At + Bt == (A + B).T

# Result :
# array([[ True,  True,  True,  True],
#        [ True,  True,  True,  True],
#        [ True,  True,  True,  True],
#        [ True,  True,  True,  True],
#        [ True,  True,  True,  True]])
```

###### 3) Given any square matrix A, is $A + A^T$  always symmetric? Why?

What means a matrix to be `**symmetric**`? What is `**symmetric matrix**`?

With a matrix A given, when $A_(ij) = A_(ji)$, we call this a symmetric matrix.

Thus, the matrix must be a square matrix.

Now then, is $A + A^T$ always a symmetric matrix?

Assuming A to be a square matix, lets call this new matrix C, $C = A + A^T$.

The element of C would be $C_(ij) or C_(ji) or C_(ii)$.

$C_(ij)$ would be $A_(ij) + A(ji)$, and so as $C_(ji)$.

Conclusively, we get a new matrix C to be always a symmetric matrix.

###### 4) We defined the tensor X of shape (2, 3, 4) in this section. What is the output of len(X)?

We have made a Tensor X as below.

```python
X = np.arange(24).reshape(2, 3, 4)
X

# Result :
# array([[[ 0.,  1.,  2.,  3.],
#         [ 4.,  5.,  6.,  7.],
#         [ 8.,  9., 10., 11.]],

#        [[12., 13., 14., 15.],
#         [16., 17., 18., 19.],
#         [20., 21., 22., 23.]]])
```

The output of len(X) is `2` as shown below.

```python
len(X)
# Result :
# 2
```

###### 5) For a tensor X of arbitrary shape, does len(X) always correspond to the length of a certain axis of X? What is that axis?

It corresponds to the length of axis 0.

```python
X = np.arange(24).reshape(2, 3, 4)
print(len(X))

X = np.arange(24).reshape(3, 4, 2)
print(len(X))

X = np.arange(24).reshape(4, 2, 3)
print(len(X))

# Result :
# 2
# 3
# 4
```

###### 6) Run A / A.sum(axis=1) and see what happens. Can you analyze the reason?

Actually the matrix(or the tensor) A is not clearly defined. So we should think about 2 different cases.

- A is a 5 x 4 matrix

By summing up with axis=1, it means this calculation reduces the dimension axis=1. This summation result would be a vector shape of (5, ).

So, the A / A.sum(axis=1) would be a calculation of (5 x 4) / (5, ) resulting an error. But, it works when you reshape the vector to the shape of (5, 1) as below.

```python
print(A)
# Result : 
# [[ 0.  1.  2.  3.]
#  [ 4.  5.  6.  7.]
#  [ 8.  9. 10. 11.]
#  [12. 13. 14. 15.]
#  [16. 17. 18. 19.]]

print(A.sum(axis=1))
# Result : 
# [ 6. 22. 38. 54. 70.]

print(A.sum(axis=1).shape)
# Result : 
# (5,)

print(A / A.sum(axis=1).reshape(5, 1))
# Result : 
# [[0.         0.16666667 0.33333334 0.5       ]
#  [0.18181819 0.22727273 0.27272728 0.3181818 ]
#  [0.21052632 0.23684211 0.2631579  0.28947368]
#  [0.22222222 0.24074075 0.25925925 0.2777778 ]
#  [0.22857143 0.24285714 0.25714287 0.27142859]]
```

- A is a 4 x 4 matrix

The case when matrix A is a square matrix, the A / A.sum(axis=1) calculation would result (4 x 4) matrix since it invokes broadcasting.

```python
B = np.arange(16).reshape(4, 4)
print(B)
# Result : 
# [[ 0.  1.  2.  3.]
#  [ 4.  5.  6.  7.]
#  [ 8.  9. 10. 11.]
#  [12. 13. 14. 15.]]

print(B.sum(axis=1))
# Result : 
# [ 6. 22. 38. 54.]

print(B.sum(axis=1).shape)
# Result : 
# (4,)

print((B / B.sum(axis=1)).shape)
# Result : 
# (4, 4)

print(B / B.sum(axis=1))
# Result : 
# [[0.         0.04545455 0.05263158 0.05555556]
#  [0.6666667  0.22727273 0.15789473 0.12962963]
#  [1.3333334  0.4090909  0.2631579  0.2037037 ]
#  [2.         0.59090906 0.36842105 0.2777778 ]]

print(B / B.sum(axis=1).reshape(4, 1))
# Result : 
# [[0.         0.16666667 0.33333334 0.5       ]
#  [0.18181819 0.22727273 0.27272728 0.3181818 ]
#  [0.21052632 0.23684211 0.2631579  0.28947368]
#  [0.22222222 0.24074075 0.25925925 0.2777778 ]]
```

- A is a 4 x 2 x 4 tensor

It was a long way to show what `axis=1` does. But in tensor, it is more easier to understand.

You can just **reduce** the dimension of axis=1. In 3-dimension tensor, the axis 0, 1, 2 stands for row, column, depth respectively. So in this 4 x 2 x 4 tensor, reducing the axis=1 means reducing the column space. Of course the reduce works after summing up the elements. The result dimension would be 4 x 4.

```python
C = np.arange(32).reshape(4, 2, 4)
print(C)
# Result : 
# [[[ 0.  1.  2.  3.]
#   [ 4.  5.  6.  7.]]

#  [[ 8.  9. 10. 11.]
#   [12. 13. 14. 15.]]

#  [[16. 17. 18. 19.]
#   [20. 21. 22. 23.]]

#  [[24. 25. 26. 27.]
#   [28. 29. 30. 31.]]]

print(C.sum(axis=1))
# Result : 
# [[ 4.  6.  8. 10.]
#  [20. 22. 24. 26.]
#  [36. 38. 40. 42.]
#  [52. 54. 56. 58.]]

```

###### 7) When traveling between two points in Manhattan, what is the distance that you need to cover in terms of the coordinates, i.e., in terms of avenues and streets? Can you travel diagonally?

I'm not sure what this question wants. But what I might guess is `L1 norm` because we call `L1 norm` the `Manhattan Norm`. (We call `L2 norm` the `Euclidean Norm`.)

I don't know what I should answer to this question..

###### 8) Consider a tensor with shape (2, 3, 4). What are the shapes of the summation outputs along axis 0, 1, and 2?

This is a similar question up above.

The shape would be (3, 4), (2, 4), (2, 3) respectively.

```python
T = np.arange(24).reshape(2, 3, 4)
print(T)
# Result : 
# [[[ 0.  1.  2.  3.]
#   [ 4.  5.  6.  7.]
#   [ 8.  9. 10. 11.]]

#  [[12. 13. 14. 15.]
#   [16. 17. 18. 19.]
#   [20. 21. 22. 23.]]]

ax0 = T.sum(axis=0)
print(ax0)
# Result : 
# [[12. 14. 16. 18.]
#  [20. 22. 24. 26.]
#  [28. 30. 32. 34.]]

ax1 = T.sum(axis=1)
print(ax1)
# Result : 
# [[12. 15. 18. 21.]
#  [48. 51. 54. 57.]]

ax2 = T.sum(axis=2)
print(ax2)
# Result : 
# [[ 6. 22. 38.]
#  [54. 70. 86.]]
```

###### 9) Feed a tensor with 3 or more axes to the linalg.norm function and observe its output. What does this function compute for ndarrays of arbitrary shape?

```python
N = np.linalg.norm(np.ones((4, 9, 5)))
print(N)
print(N * N)
# Result : 
# 13.416408
# 180.0

N2 = np.linalg.norm(np.ones(120).reshape(2, 3, 4, 5))
print(N2)
print(N2 * N2)
# Result : 
# 10.954452
# 120.00001
```

`np.linalg.norm` returns the result of Frobenius norm if there is no parameter.
You can arbitrary change the order of norm calculation by filling up the `ord` parameter.

### Reference

- sum(axis=) : <http://taewan.kim/post/numpy_sum_axis/>{: target="_blank"}

- broadcasting : <https://numpy.org/doc/stable/user/basics.broadcasting.html>{: target="_blank"}

- division broadcasting : <https://stackoverflow.com/questions/19602187/numpy-divide-each-row-by-a-vector-element>{: target="_blank"}

- numpy linalg norm : <https://numpy.org/doc/stable/reference/generated/numpy.linalg.norm.html>{: target="_blank"}