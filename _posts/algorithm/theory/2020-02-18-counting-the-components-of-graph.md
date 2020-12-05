---
layout: post
current: post
cover:  assets/images/algorithm/chain.jpg
navigation: True
title: 그래프에서의 연결 요소(컴포넌트)의 개수 세기 - Counting the Components of Graph
date: 2020-02-18 14:00:00
tags: [algorithm, theory]
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> 연결 요소(컴포넌트) 세기

## 그래프의 연결 요소

### 사전적 정의

> 컴포넌트 : 무향 그래프가 간선으로 서로 연결되지 않은 몇 개의 조각으로 쪼개져 있는 경우, 각 연결된 정점들의 부분집합을 컴포넌트라고 한다.

- "연결 요소", "연결된 부분집합", "컴포넌트" 등으로 불린다.

- DFS를 이용하여 연결요소의 개수를 찾기 때문에, 시간복잡도는 O(V + E)를 갖는다.

## 연결 요소를 찾는 간단한 방법

- DFS를 이용하여 연결 요소를, 혹은 개수를 찾는다.

- 모든 정점 V에 대해 DFS를 할때, DFS가 몇번 호출되는지를 세면 된다.

```c++
for (int i = 0; i < N; ++i) {
    if (!visited[i]) {
        DFS(i);
        ++components;
    }
}
```

- 같은 컴포넌트로 이루어져 있다면, 한 정점에서의 DFS만으로 모든 컴포넌트의 정점들이 방문되었을 것이다.

## 관련 문제들

- [BOJ 11724 - 연결 요소의 개수](https://www.acmicpc.net/problem/11724){: target="_blank"}

- [BOJ 2667 - 단지 번호 붙이기](https://www.acmicpc.net/problem/2667){: target="_blank"}

- [BOJ 4963 - 섬의 개수](https://www.acmicpc.net/problem/4963){: target="_blank"}

## References

- Introduction to Algorithms

- 알고리즘 문제 해결 전략 2