---
layout: post
current: post
cover:  assets/images/algorithm/finger-bridge.jpg
navigation: True
title: 두 정점이 서로 연결되어 있는지 확인하기 - Find if Path Exists between Vertices
date: 2020-02-19 10:00:00
tags: [algorithm, theory]
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> DFS를 이용하여 그래프에서의 두 정점이 연결되어 있는지 간단하게 확인하기

## 두 정점의 연결성 확인

- 이는 두 정점이 같은 컴포넌트에 존재하는지와 같은 문제이다.

- 정점 u와 v가 같은 컴포넌트에 존재한다면, u에서 DFS를 돌렸을 때 v가 방문된다.
  
  - 정점 u에서 DFS를 할 때에는, u에서 갈 수 있는 모든 정점들을 방문하게 된다.

- 따라서, u에서 DFS를 돌려 v가 방문되는지를 확인하면 두 정점이 연결되어있는지를 확인할 수 있다.

---

## 코드

```c++
DFS(u);
if (visited[v])
    cout << "Connected!" << endl;
else
    cout << "Not Connected.." << endl;
```

## References

- Introduction to Algorithms

- 알고리즘 문제 해결 전략 2