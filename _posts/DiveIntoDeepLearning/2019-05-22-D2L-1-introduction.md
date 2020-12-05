---
layout: post
current: post
cover:  assets/images/d2l/brain.png
navigation: True
title: D2L 1-1 Introduction
date: 2019-05-22 10:00:00
tag :
  - deep learning
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> This is a post that I organized while studying [D2L(Dive into Deep Learning)](https://d2l.ai/index.html){: target="_blank"}.

# Introduction

우리는 어떤 문제를 직면했을 때, 제일 먼저 소위 'first principle' 코딩을 통해 문제를 해결한다. 그리고, 이것으로 주어진 문제를 100% 해결할 수 있으면 굳이 ML을 사용하지 않아도 된다.(물론 ML도 정확도의 한계가 존재할것이다.)

하지만, 이런 방식으로는 분명 한계가 존재한다. 가장 대표적으로 내일 날씨를 예측하는 일이 있다.

이 책에서는 Siri를 작동시키는 방법을 통해 전개를 한다.

흔히 하는 코딩을 통해 Siri를 작동시키는 `wake word`를 아이폰에 인식시키는것은 쉽지 않은 일이다. 다만, 사람은 `wake word`를 **인식** 할 수 있다. 이것이 출발점이다.

사람들은 소리를 듣고 이 소리가 `wake word`에 해당하는지 해당하지 않는지를 **분류**할 수 있다. 이 label된 데이터들을 모아서 하나의 큰 dataset을 만들어 모델에게 parameter로 넘겨준다. 

dataset을 넘겨받은 모델은 방대한 data들을 학습하게 된다. 이를 Training이라 부른다.

이후 모델은 적절한 연산을 통해 dataset에 존재하지 않는 소리가 Siri를 부르는것인지 아닌지를 구별해낸다.


### Supervised Learning

#### Regression

회귀는 지도학습의 한 종류이다.

feature **x**에 대한 target **y**가 실수(Real Number)인 경우에 이 문제를 회귀라 한다.

대부분의 회귀문제들은 이 두 법칙을 따르는데, 문제를 분석할 때 참고하면 좋을것같다.

1. How much (cost will I need to buy this house?)

2. How many (dogs are in this picture?)


#### Classification

대부분의 분류문제들은 다음 법칙을 따르는데, 문제를 분석할 때 참고하면 좋을것같다.

- Is this (tumor malignant?)