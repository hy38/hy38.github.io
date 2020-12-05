---
layout: post
current: post
cover:  assets/images/algorithm/cycle.jpg
navigation: True
title: 그래프의 사이클 및 사이클 내의 정점 찾기 - Finding Cycles in Graph
date: 2020-02-23 19:00:00
tags: [algorithm, theory]
class: post-template
subclass: 'post tag-getting-started'
author: hy38
disqus: True
comments: True
---

> 그래프의 사이클 및 사이클 내의 정점 찾기

### 그래프에서 사이클(Cycle)이란?

> 정점 u에서 시작하여 자기 자신으로 돌아오는 경로가 있는 것을 Cyclic이라 하며, 그 경로를 Cycle이라 한다. Cycle이 존재할 경우 그 그래프는 Cyclic Graph가 된다.

---

#### 방향 그래프에서 사이클의 존재 여부 확인하기

- 단순하게 해결할 수 있다. 모든 정점에 대해 DFS를 돌려 자기 자신으로 돌아오는 경로가 있다면 사이클이 존재하는 것이다.

- 다만, 이 경우 시간복잡도가 O(V(V + E))로 높게 나온다.

- 사이클의 존재 여부는 **역방향 간선(Back edge)이 존재하는지**와 같은 말이다.
  - 역방향 간선에 대한 설명은 [여기](/about-edges-in-graph){: target="_blank"}를 참조하면 될 것같다.

- 따라서 두번째 방법은 역방향 간선을 찾으면서 DFS를 하는 것이다.

- 이 경우 일반적인 DFS의 시간복잡도인 O(V + E)가 나온다.

###### 방향 그래프에서의 사이클 존재 여부 확인 코드

```c++
vector<vector<int>> adj;
vector<bool> vis, finished;
bool hasCycle;

void DFS(int node)
{
    vis[node] = true;
    for (int i = 0; i < adj[node].size(); ++i) {
        int next = adj[node][i];
        if (!vis[next])
            DFS(next);
        else if (finished[next] == false) { //  next가 이미 방문했지만, 종료되지 않는 정점이면
            hasCycle = true;
        }
    }
    finished[node] = true;
}
```

---

###### 무방향 그래프에서 사용할 수 있는 추가적인 방법

- 무방향 그래프에서는 간선의 방향이 정해져있지 않다.

- 따라서 정점의 방문 순서를 비교함으로써 사이클을 판단할 수 있다.

- 부모를 제외한 정점들 중 이미 방문했고, 방문순서가 더 빠른 정점이 존재하게 되면 사이클이 있다고 판단할 수 있다.

- 자세한 내용은 [여기](https://m.blog.naver.com/PostView.nhn?blogId=jh20s&logNo=221248815321&proxyReferer=https%3A%2F%2Fwww.google.com%2F){: target="_blank"}를 참조하면 될것같다.

---

### 사이클이 있는 정점들 찾기

- 그래프에서 사이클일 존재하는지 만으로는 다양한 문제에 적용하는데 한계가 있다.

- 많은 문제들이 사이클이 어떤 정점들끼리 이루어졌는지를 원한다.

- 사이클 안에 있는 정점들을 따로 표시해주면 될것같다.

#### 사이클 내의 정점들을 표시하는 코드

- 구현을 하려고하다보니, 사이클임을 확인한 시점에는 부모로 올라갈 수 있는 방법을 찾아야 했다. 이를 위해 parents라는 부모 배열을 만들어 정점의 부모를 저장했다.
  - 예를 들어 parents[node]는 node정점의 부모를 담는다.

- 부모를 찾다가 부모와 사이클의 시작점(역방향 간선이 가리키는 정점)에 도달하게 되면 멈춘다.

- 사이클에 속한 정점들은 isCycle 배열에 표시해준다.

```c++
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj;
vector<int> parent;
vector<bool> vis, finished, isCycle;
bool isGraphCyclic;
int countCyclicVertices;

void denoteCycle(int node, int next)
{
    isCycle[node] = true;
    countCyclicVertices++;

    if (node == next)
        return;
    
    denoteCycle(parent[node], next);
}

void DFS(int node)
{
    vis[node] = true;
    for (int i = 0; i < adj[node].size(); ++i) {
        int next = adj[node][i];
        if (!vis[next]) {
            parent[next] = node;
            DFS(next);
        }

        else if (finished[next] == false) {
            isGraphCyclic = true;   //  그래프가 사이클을 갖는지 체크해준다.
            denoteCycle(node, next);    //  사이클에 포함된 정점들을 표시해준다.
        }
    }
    finished[node] = true;
}
```

- 관련문제 - [BOJ 9466 - 텀 프로젝트](https://www.acmicpc.net/problem/9466){: target="_blank"}
  
  - [풀이](/BOJ-9466){: target="_blank"}

---

#### 참고 사항

- DFS 스패닝 트리에서 부모는 하나이기 때문에 가능한 구현인 것 같다.

- 위 코드는 그래프가 사이클이 있는지를 조사함과 동시에 어떤 정점들이 사이클에 속해있는지까지도 알려준다.

- 반복문을 이용해 만들어보려 했지만, 구조적인 문제와 직관성때문에 재귀적으로 구현하게 되었다.

---

## References

- Introduction to Algorithms

- 알고리즘 문제 해결 전략 2

- [https://kesakiyo.tistory.com/15](https://kesakiyo.tistory.com/15){: target="_blank"}

- [https://m.blog.naver.com/PostView.nhn?blogId=jh20s&logNo=221248815321&proxyReferer=https%3A%2F%2Fwww.google.com%2F](https://m.blog.naver.com/PostView.nhn?blogId=jh20s&logNo=221248815321&proxyReferer=https%3A%2F%2Fwww.google.com%2F){: target="_blank"}

- [https://code0xff.tistory.com/39?category=723759](https://code0xff.tistory.com/39?category=723759){: target="_blank"}

- [https://kim6394.tistory.com/228](https://kim6394.tistory.com/228){: target="_blank"}

- [https://jackpot53.tistory.com/92](https://jackpot53.tistory.com/92){: target="_blank"}

- [https://beenlife.tistory.com/54](https://beenlife.tistory.com/54){: target="_blank"}