---
layout: post
current: post
cover:  assets/images/algorithm/branch.png
navigation: True
title: DFS 스패닝 트리와 간선의 분류 - DFS Spanning Tree and Classifying Edges
date: 2020-02-22 11:00:00
tags: [algorithm, theory]
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> DFS 스패닝 트리

## DFS 스패닝 트리란?

- DFS 스패닝 트리는 그래프에서 DFS를 어느 정점 u에 대해 실행하였을 때, u를 루트로 하는 트리를 말한다.

---

## 간선 분류의 이용

- 그래프에서 간선을 분류하게되면 다양한 알고리즘에 응용할 수 있게된다.

- 간선 분류를 통해 그래프 알고리즘을 이해하고 증명하기 위한 도구로 유용하게 쓰인다.

- 예를 들어, DFS가 역행 간선을 만들지 않으면 그래프는 사이클이 존재하지 않고, 역도 성립한다. 즉, 사이클의 존재 여부는 역방향 간선의 존재 여부와 동치이다.

  - [사이클 존재 여부 확인하기](/finding-cycles-in-graph){: target="_blank"}

---

## 그래프의 간선의 종류

> 간선은 트리 간선, 역행 간선, 순행 간선, 교차 간선 총 4개로 분류된다. 역행 간선과 순행 간선은 개인마다 역방향, 순방향 간선으로 부르기도 한다.

- 트리 간선(Tree edge)
  - 정점 v가 간선 (u, v)를 통해 처음 발견되었다면, (u, v)는 트리간선이다.
  - 간단하게는, 스패닝 트리에 포함된 간선을 말한다.

- 역행 간선(Back edge)
  - 스패닝 트리의 자손에서 선조로 연결되는 간선을 말한다.
  - 방향 그래프에서의 자기 순환 간선들은 역행 간선으로 간주한다.

- 순행 간선(Forward edge)
  - **트리간선이 아닌** 선조에서 자손으로 연결되는 간선을 말한다.

- 교차 간선(Cross edge)
  - 위 세 분류를 제외한 나머지 간선이다.
  - 선조와 자손 관계가 아닌(**위계 관계가 없는**) 정점들 간에 연결된 간선들을 말한다.
  - 하나의 정점이 다른 정점의 조상이 아니어야 한다.
  - 서로 다른 스패닝트리에 있는 두 정점 사이에 있을수도 있다.


> 그래프의 간선은 DFS를 어떤 정점에서 시작하는지, 어떤 순서로 방문할것인지에 따라 다른 트리가 생성되고, 따라서 간선의 구분이 달라질 수 있다.

---

## 무향 그래프에서의 간선의 분류

- 교차 간선(Cross edge)가 존재하지 않는다.

- 순방향 간선과 역방향 간선의 구분이 없다.

> 즉, 무방향 그래프의 DFS 스패닝 트리에서 모든 간선은 트리 간선이거나 역행 간선이다.

---

## 간선을 구분하는 DFS 코드

- (u, v)가 순방향 간선이라면 v는 u의 자손이어야 하고, 따라서 v가 u보다 **더 늦게 발견되어야** 한다. 또한, (u, v)가 트리 간선이 아니어야 한다.

- (u, v)가 역방향 간선이라면, v는 u의 선조이어야 한다. 따라서 v가 u보다 **먼저 발견되어야** 한다.

- (u, v)가 교차 간선이라면, DFS(v)가 종료된 후 DFS(u)가 호출되어야 한다. 따라서 v는 u보다 **일찍 발견되어야** 한다.

- 이를 이용하여 코드를 작성하면 다음과 같다.

```c++
vector<vector<int>> adj;

vector<int> discovered, finished;

int counter;

void DFS(int node)
{
    discovered[node] = counter++;

    for (int i = 0; i < adj[node].size(); ++i) {
        int next = adj[node][i];
        cout << "(" << node << "," << next << ") : ";

        //  아직 방문하지 않았다면
        if (discovered[next] == -1) {
            cout << "tree edge" << endl;
            DFS(next);
        }

        //  next를 방문했지만 순서가 node보다 늦다면
        else if (discovered[node] < discovered[next])
            cout << "forward edge" << endl;

        //  next를 방문했지만 순서가 node보다 빠르다면
        //  next가 종료하지 않았다면 => next는 node의 선조가 됨.
        else if (finished[next] == 0)
            cout << "back edge" << endl;

        //  이 외에는 모두 교차 간선
        else
            cout << "cross edge" << endl;
    }
    finished[node] = 1;
}
```

- 간선의 정의는 간단명료하지만, 이것을 코드로 직접적으로 구현하기는 까다롭다.

- 그래서 **discovered**라는 배열에 counter변수를 이용하여 발견 순서를 저장한다.

- 이 배열은 정점이 방문되었는지 여부도 한번에 알려준다. 기존 DFS에서의 **visited 배열과 유사**하다.

- 이 배열을 통해 선조와 자손, 혹은 아무것도 아닌 관계를 밝혀낼 수 있다.

- 또한, 정점 u에서의 인접한 모든 정점으로의 DFS가 종료되었는지를 저장하는 배열 finished를 이용한다.

---

### 참고 사항

- 사람들에 따라 다음과 같이 간선을 색깔로 분류하는 경우도 있다.

- *WHITE*는 트리 간선, *GRAY*는 역행 간선, *BLACK*은 순행 또는 교차 간선으로 분류하기도 한다.

---

## References

- Introduction to Algorithms

- 알고리즘 문제 해결 전략 2