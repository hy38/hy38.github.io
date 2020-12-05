---
layout: post
current: post
cover:  assets/images/algorithm/order.jpg
navigation: True
title: 위상정렬의 구현 - Topological Sort
date: 2020-02-20 19:00:00
tags: [algorithm, theory]
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> 위상정렬(Topological Sort) : DAG의 정점들을 변의 방향을 거스르지 않도록 그래프를 선형으로 나열하는 것.

> 사건들 사이의 우선순위를 나타내기 위해 사용되며, 정렬 결과는 우선순위에 따른 사건의 진행 순서를 나타낸다. 이 때, 모든 간선이 왼쪽에서 오른쪽으로 향하도록 수평선을 따라 나열한 정점의 순서로 보여진다.

> 의존성이 있는 작업들이 주어질 때, 이들이 어떤 순서로 진행되어야하는지 계산해준다.


# 위상정렬

- 위상 정렬이 성립하기 위해서는 **반드시** 비순환 유향 그래프(DAG, Directed Acyclic Graph)이어야 한다.

- 정렬의 순서는 그래프의 구조와 정점을 선택하는 방법에 따라 여러 종류가 나올 수 있다.

- 간선중에 back edge, 즉 사이클이 존재할 경우 순환 유향 그래프(DCG, Directed Cyclic Graph)가 되기 때문에, 위상정렬을 진행할 수 없다.

- 구현에는 스택(Stack)을 이용한 구현과 큐(Queue)를 이용한 구현이 있다.

- 위상정렬의 시간복잡도는 O(V + E)를 갖는다.

---

## 위상정렬의 구현(Stack)

- 먼저, 위상정렬은 DFS와 스택을 이용하여 쉽게 할 수 있다. 

- DFS의 종료 순서를 거꾸로 뒤집으면 위상정렬이 완료된다.

- 이를 이용하여 DFS가 끝날때마다 스택에 쌓아두고, 마지막에 전체를 pop해주면 위상정렬된 결과를 얻을 수 있다. 

- 다음의 코드를 보자.

```c++
stack<int> s;
vector<vector<int>> adj;
vector<bool> vis;

void DFS(int node)
{
    vis[node] = true;
    for (int i = 0; i < adj[node].size(); ++i) {
        int next = adj[node][i];
        if (!vis[next])
            DFS(next);
    }
    s.push(node);
}

int main()
{
    makeGraph();
    DFS(0);
    for (int i = 0; i < s.size(); ++i) {
        cout << s.top() << " ";
        s.pop();
    }
}
```

- 위 코드를 살짝 수정하여 아래와 같이 사이클(Cycle)의 존재 유무를 파악할 수 있다.

```c++

...

vector<bool> finished;
bool hasCycle;

void DFS(int node)
{
    vis[node] = true;
    for (int i = 0; i < adj[node].size(); ++i) {
        int next = adj[node][i];
        if (!vis[next])
            DFS(next);
        else if (finished[next] == false) {
            hasCycle = true;
        }
    }
    finished[node] = true;
    s.push(node);
}

...

```

- 관련문제 - [BOJ 2252 - 줄 세우기](https://www.acmicpc.net/problem/2252){: target="_blank"}

  - [풀이](/BOJ-2252){: target="_blank"}


---

## 위상정렬의 구현(Queue)

- 큐를 이용한 구현은 진입차수(indegree)를 이용하게 된다.

- 한 정점의 진입차수라 함은, 다른 모든 정점에서 그 정점으로 들어오는 방향있는 간선의 갯수 이다.

### 알고리즘

1. 진입차수가 0인 정점 u를 큐에 삽입한다.

2. u를 꺼내어 그 정점에서 나가는 outdegree들을 모두 지워준다. 

  - 실제 구현에서는 u의 인접 정점들의 indegree를 하나씩 차감하는 것으로 대체한다.

3. 위 작업으로 인해 indegree가 0이 된 정점들을 큐에 삽입한다.

4. 큐가 빌때까지 2 ~ 3의 과정을 반복한다.

5. 이 때, n개의 정점들을 모두 방문하기 전에 큐가 비어버리면 사이클이 존재한다는 것이다.


- 다음과 같이 코드를 구현할 수 있다.

```c++

...

void makeGraph()
{
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
    indegree[v]++;
}

vector<int> topologicalSort()
{
    //  return : list of sorted vertices
    vector<int> ret;

    for (int i = 1; i <= N; ++i)
        if (indegree[i] == 0)
            q.push(i);

    for (int i = 1; i <= N; ++i) {
        if (q.empty()) {
            hasCycle = true;
            return vector<int>();
        }

        int node = q.front();
        ret.push_back(node);
        q.pop();

        for (int j = 0; j < adj[node].size(); ++j) {
            int next = adj[node][j];
            indegree[next]--;
            if (indegree[next] == 0) {
                q.push(next);
            }
        }
    }

    return ret;
}

...

```

---

## 더 많은 위상 정렬 문제들

- BOJ - [위상 정렬 카테고리](https://www.acmicpc.net/problem/tag/%EC%9C%84%EC%83%81%20%EC%A0%95%EB%A0%AC){: target="_blank"}

---

## References

- Introduction to Algorithms

- 알고리즘 문제 해결 전략 2

- [https://gmlwjd9405.github.io/2018/08/27/algorithm-topological-sort.html](https://gmlwjd9405.github.io/2018/08/27/algorithm-topological-sort.html){: target="_blank"}

- [https://ko.wikipedia.org/wiki/%EC%9C%84%EC%83%81%EC%A0%95%EB%A0%AC](https://ko.wikipedia.org/wiki/%EC%9C%84%EC%83%81%EC%A0%95%EB%A0%AC){: target="_blank"}

- [https://m.blog.naver.com/PostView.nhn?blogId=ndb796&logNo=221236874984&proxyReferer=https%3A%2F%2Fwww.google.com%2F](https://m.blog.naver.com/PostView.nhn?blogId=ndb796&logNo=221236874984&proxyReferer=https%3A%2F%2Fwww.google.com%2F){: target="_blank"}

- [https://jason9319.tistory.com/93](https://jason9319.tistory.com/93){: target="_blank"}