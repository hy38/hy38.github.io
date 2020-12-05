---
layout: post
current: post
cover:  assets/images/d2l/brain.png
navigation: True
title: D2L 2 - Data Manipulation & Processing
date: 2019-05-27 10:00:00
tag :
  - deep learning
  - numpy
  - pandas
  - ndarray
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> This is a post that I organized while studying [D2L(Dive into Deep Learning)](https://d2l.ai/index.html){: target="_blank"} exercises.

### Exercise : Data Manipulation (ndarray)

###### 1) Run the code in this section. Change the conditional statement x == y in this section to x < y or x > y, and then see what kind of ndarray you can get.

```python
from mxnet import np

x = np.arange(12).reshape(3, 4)
y = x + 2

print(x == y)
print(x > y)
print(x < y)

# Result :
# [[False False False False]
#  [False False False False]
#  [False False False False]]
# [[False False False False]
#  [False False False False]
#  [False False False False]]
# [[ True  True  True  True]
#  [ True  True  True  True]
#  [ True  True  True  True]]
```

###### 2) Replace the two ndarrays that operate by element in the broadcasting mechanism with other shapes, e.g., three dimensional tensors. Is the result the same as expected?

```python
# To broadcast you need to have dimensions of size 1, or matching dimensions across your tensors

X = np.arange(12).reshape(1, 6, 2)
Y = np.ones(shape=(6,6,1))
X + Y

# Result :
# array([[[ 1.,  2.],
#         [ 3.,  4.],
#         [ 5.,  6.],
#         [ 7.,  8.],
#         [ 9., 10.],
#         [11., 12.]],

#        [[ 1.,  2.],
#         [ 3.,  4.],
#         [ 5.,  6.],
#         [ 7.,  8.],
#         [ 9., 10.],
#         [11., 12.]],

#        [[ 1.,  2.],
#         [ 3.,  4.],
#         [ 5.,  6.],
#         [ 7.,  8.],
#         [ 9., 10.],
#         [11., 12.]],

#        [[ 1.,  2.],
#         [ 3.,  4.],
#         [ 5.,  6.],
#         [ 7.,  8.],
#         [ 9., 10.],
#         [11., 12.]],

#        [[ 1.,  2.],
#         [ 3.,  4.],
#         [ 5.,  6.],
#         [ 7.,  8.],
#         [ 9., 10.],
#         [11., 12.]],

#        [[ 1.,  2.],
#         [ 3.,  4.],
#         [ 5.,  6.],
#         [ 7.,  8.],
#         [ 9., 10.],
#         [11., 12.]]])
```

### Exercise : Data Processing (pandas)

Create a raw dataset with more rows and columns.

```python
data = pd.read_csv(data_file)
print(data)

# Result :
#    NumRooms Alley   Price
# 0       NaN  Pave  127500
# 1       2.0   NaN  106000
# 2       4.0   NaN  178100
# 3       NaN   NaN  140000
```

###### 1) Delete the column with the most missing values.

```python
inputs, outputs = data.iloc[:, 0:2], data.iloc[:, 2]
print(inputs)
# Result :
#    NumRooms Alley
# 0       NaN  Pave
# 1       2.0   NaN
# 2       4.0   NaN
# 3       NaN   NaN

maxNaCount = data.isna().sum()
print(maxNaCount)
# Result :
# NumRooms    2
# Alley       3
# Price       0
# dtype: int64

del inputs['NumRooms']
print(inputs)
# Result :
#   Alley
# 0  Pave
# 1   NaN
# 2   NaN
# 3   NaN
```

As shown by `maxNaCount`, the most value missing column in this data is NumRooms.
We delete `NumRooms` using `del`.

###### 2) Convert the preprocessed dataset to the ndarray format.

```python
# 1. Convert 'Alley' column data to 2 columns
inputs = pd.get_dummies(inputs, dummy_na=True)

# 2. Convert preprocessed dataset to ndarray format
X, y = np.array(inputs.values), np.array(outputs.values)

print(inputs)
# Result :
#    Alley_Pave  Alley_nan
# 0           1          0
# 1           0          1
# 2           0          1
# 3           0          1
```