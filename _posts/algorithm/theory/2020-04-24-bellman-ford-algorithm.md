---
layout: post
current: post
cover:  assets/images/algorithm/green-red-arrow.jpg
navigation: True
title: 벨만 포드 최단경로 알고리즘의 구현 - Bellman-Ford Shortest Path Algorithm
date: 2020-04-24 19:00:00
tags: [algorithm, theory]
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> 벨만-포드 최단 경로 알고리즘

#### 그래프의 최단경로 알고리즘

그래프의 최단경로 알고리즘에 대한 설명은 [**여기**](/about-Shortest-Path){: target="_blank"}에서 확인할 수 있다. 최단거리 알고리즘의 종류들과 `edge relaxation`에 대해 설명한다.

> 최단경로 알고리즘과 edge relaxation에 대해 자세히 알지 못한다면, [**여기**](/about-Shortest-Path){: target="_blank"}에서 먼저 알아보는 것이 좋을것 같다.

---

###### 음수간선은 OK, 가중치의 합이 음수인 사이클은 NO!

[다익스트라](/dijkstra-algorithm){: target="_blank"} 알고리즘과 달리 벨만-포드 알고리즘은 음수 간선이 존재해도 제대로 작동한다.

다익스트라의 대안으로 벨만-포드 알고리즘을 사용하는 이유이다.

다만, 가중치의 합이 음수인 사이클은 벨만-포드 알고리즘으로 하여금 제대로된 최단 경로를 찾을 수 없게한다. (보다 자세한 설명은 [**여기**](/why-dijkstra-fail-on-a-negative-weighted-edge){: target="_blank"}에서 서술하는 3가지 이유 중 첫번째 이유를 참조하면 될것같다.)

**닿을 수 없는 정점의 음수 사이클은 무시한다. 닿을 수 없는 정점에서의 사이클을 신경쓸 필요가 전혀 없기 때문이다.** 아래에서 닿을 수 없는 정점이 이루는 음수 사이클을 무시하는 방법을 살펴볼 것이다.

---

###### 기본적인 아이디어

다익스트라는 최단 경로는 최단경로로 구성되어있다는데에 출발하였다.

반면, 벨만-포드는 최단경로를 예측하고 점차 **오차를 줄여나가는** 아이디어를 사용한다.

따라서 배열 선언부터 `dist`대신 `upper`이라는 이름으로 선언한다. 이는 단일 시작점 `s`에서 각 정점까지의 경로들의 `상한값`을 담은 배열으로 사용된다.

`상한값`이라는 말이 어렵지만, 벨만 포드가 사용하는 최단 경로의 특성을 알면 이해하기 수월하다.

- 최단경로 dist[u]와 dist[v]에 대해 다음의 특성이 항상 성립한다.

$ dist[v] \leq dist[u] + w(u, v) $

이로인해 `dist[v]`가 될 수 있는 `dist[u] + w(u, v)`는 모두 `dist[v]`보다 크거나 같다.

최단경로와 가까운 값들을 구해나가며 최종적인 최단 경로를 찾아가는 방식으로 동작하기에 `상한값`이라는 단어가 쓰인다.

총 `V-1번` 반복하여 모든 정점들에 대한 최단경로를 알아낼 수 있으며, 한 번씩 그래프의 모든 간선을 완화할 경우 최소 한개의 정점에 대한 최단 경로값이 발견된다.

계속되는 완화를 통해 `upper` 배열이 우리가 원하는 `dist` 배열이 되도록 한다.

---

#### 벨만-포드 알고리즘의 Edge Relaxation

###### Edge Relaxation의 동작 과정

첫번째로 진행하는 모든 간선에 대한 완화에 대해 시작 정점인 `1번` 정점에서부터 그 인접 정점들 `v`에 대한 최단 경로가 다음과 같이 구해진다.

위에서 설명한 최단경로의 특성을 이용하면,

$ upper[v] \leq upper[1] + w(1, v) $ 가 항상 성립하고,

$upper[1] = 0$ 이기에 $ upper[v] \leq w(1, v) $가 된다.

이 때, 자연스럽게 w(1, v)는 `1번` 정점에서 `v번` 정점까지의 최단경로이며, 이로 인해 `v번` 정점의 최단경로가 구해진다.

이는 처음 `1번` 정점의 최단경로가 `0`임을 확신할 수 있었기에 가능했으며, 확신할 수 있게된 `v번` 정점의 최단경로를 이용하여 이와 비슷하게 다른 정점의 최단경로를 구할 수 있다.

이 작업의 연쇄를 통해 모든 정점의 최단 경로를 구한다.

- 다음 그림을 통해 연쇄 작업을 이해할 수 있다.

- 점으로 표시된 정점은 최단경로가 보장된 정점이다. 최악의 경우 총 `V-1번`인 4번의 `Edge Relaxation`이 진행됨을 알 수 있다.

![bellman_ford_graph3](/assets/images/algorithm/bellman-ford-graph3.png)

- 최단경로가 구해지는 반복 횟수 및 순서는 그래프의 모양 및 간선의 입력 순서 등에 따라 달라질 수 있다. 다음 그림이 예시이다.

![bellman_ford_graph2](/assets/images/algorithm/bellman-ford-graph2.png)

###### Edge Relaxation의 반복 횟수

> 총 **V-1번**의 Edge Relaxation을 진행한다. 

- `1번` 정점부터 `V번` 정점까지 인접리스트를 이용하여 그래프의 모든 간선의 완화를 진행한다.

- 모든 간선을 한번씩 완화했다는 것은, 최소 하나의 정점의 최단경로가 구해졌다는 것이다.

- 이를 총 `V-1번` 반복한다.

---

#### 벨만-포드 알고리즘의 구현(코드)

`1번` 정점에서 시작하여 다른 `2 ~ V번` 정점들까지의 각각의 최단거리를 계산한다.

- C++ Code

```c++
#include <vector>
#include <iostream>

#define INF 987654321
using namespace std;

int V, edges;
bool isCyclic;
vector<pair<int, int> > adj[502];

void input() {
    cin.sync_with_stdio(false);
    cin.tie(NULL);

    cin >> V >> edges;
    int u, v, w;
    for (int i = 0; i < edges; ++i) {
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
}

vector<int> bellmanFord(int src) {
    //  시작점을 제외한 모든 정점까지의 최단 거리 상한을 INF로 둔다.
    vector<int> upper(V + 2, INF);
    upper[src] = 0;
    bool updated;

    //  V번 순회한다.
    for (int iter = 0; iter < V; ++iter) {
        updated = false;
        for (int node = 1; node <= V; ++node) {
            if (upper[node] == INF) continue;   //  닿을수 없는 정점을 건너띔으로써 해당 정점에서 발생하는 사이클을 무시한다.

            for (int i = 0; i < adj[node].size(); ++i) {
                int next = adj[node][i].first;
                int cost = adj[node][i].second;

                //  (node, next) 간선을 따라 완화를 시도한다.
                if (upper[next] > upper[node] + cost) {
                    //  성공
                    upper[next] = upper[node] + cost;
                    updated = true;
                }
            }
        }
        //  모든 간선에 대해 완화가 실패했을 경우 V-1번도 돌 필요 없이 곧장 종료한다.
        if (!updated) break;
    }
    //  V번째 순회에서도 완화가 성공했다면 음수 사이클이 있다.
    if (updated) {
        isNegativeCycle = true;
        upper.clear();
    }

    return upper;
}

int main() {

    input();
    vector<int> dist = bellmanFord(1);

    if (isNegativeCycle) cout << "-1\n";
    else {
        for (int i = 2; i < V + 1; ++i) {
            if (dist[i] >= 900000000)
                cout << "-1\n";
            else
                cout << dist[i] << "\n";
        }
    }

    return 0;
}

```

#### updated 변수의 2가지 쓰임

###### 1. 모든 정점의 최단경로가 구해진 경우의 탈출

모든 간선에 대해 완화 시도를 하였지만 실패한 경우는 모든 정점의 `상한값 upper`이 `최단경로 dist`에 수렴했다는 것을 의미한다.

이는 더이상의 간선 검사를 무의미하게 만들며, 곧바로 종료를 시킴으로써 시간을 절약할 수 있게된다.

이 때 사용하는 변수가 `updated`라는 `boolean` 변수이다.

V번 반복하는 도중에 `updated`가 `true`로 바뀌지 않는 경우에는 `break`를 통해 곧바로 for문을 탈출한다.

###### 2. 가중치의 합이 음수인 사이클의 존재 여부

> 벨만-포드 알고리즘의 장점은 음수 가중치 간선이 존재할 때에도 작동한다는 것일뿐만 아니라, **(닿을 수 있는) 음수 사이클이 존재하는지**를 알려준다는 것이다.
이 역시 `updated`를 이용하여 판별한다.

모든 최단경로를 계산하는데에는 `V-1`번의 반복이면 충분하지만, 한번 더 반복을 진행하여 총 `V번` 반복을 시켜준다.

이렇게 되면 이미 `V-1`번째 반복에 의해 모든 최단경로가 구해져있지만, 음수 사이클이 존재하는 경우 `edge relaxation`이 진행됨을 알 수 있다.

이 경우에 `updated`를 `true`로 설정해주면 다음과 같은 조건문을 사용하여 음수 사이클 여부를 체크할 수 있다.

```c++
    //  V번째 순회에서도 완화가 성공했다면 음수 사이클이 있다.
    if (updated) {
        isNegativeCycle = true;
        upper.clear();  //  음수 사이클이 존재하여 최단 경로를 구할 수 없다.
    }
```

최단경로가 `V-1번` 이전에 모두 구해져 `break`를 통해 탈출한 경우에는 `updated`가 `false`인 상태이기 때문에 위의 음수 사이클을 찾는 코드에 걸리지 않는다.

---

#### 두 가지 문제점과 한 가지 해결 방법

1) 출발점에서 도달 불가능한 음수 사이클

출발점에서 도달 불가능한 정점들이 가중치의 합이 음수인 사이클을 이루고 있는 경우가 존재한다.

이 경우 원래는 도달 가능한 정점들에 대해 `upper`을 출력하고, 도달 불가능한 정점들에 대해 `UNREACHABLE` 혹은 `-1`등의 처리를 해야한다.

하지만, V번째 반복에서 도달 불가능한 정점들의 음수 사이클을 발견하고 `isNegativeCycle`을 `true`로 바꾸게되는 경우에 `UNREACHABLE`과 `-1`이 아닌 `음수 사이클이 존재하므로 거리를 구할수 없음` 처리를 해버리는 경우가 존재한다.

따라서 도달 불가능한 정점들을 무시하는 등의 처리가 필요하다.


2) 도달 불가능한 정점의 식별시 주의사항

도달불가능한 정점들 `v`가 음의 가중치를 갖는 간선을 보유하고 있을 경우의 문제점이 존재한다.

모든 간선들을 그래프의 정점 갯수번만큼 완화를 진행할 때 위의 경우에 `upper[v]`가 `INF`가 아니라 **INF보다 작은 값으로** 완화된다.

따라서 도달 불가능한 정점들을 찾을때 `if(upper[v] == INF)`라는 코드는 제대로 작동하지 않을 수 있다.

적당히 큰 수 M을 잡아 `if(upper[v] >= (INF - M)`으로 코드를 수정해주어 도달 불가능한 정점들을 제대로 식별할 수 있다.

- 한 가지 간단한 해결 방법

우선, 벨만-포드 알고리즘이 *'Single Source Shortest Path'* 알고리즘임을 기억하자.[(관련 포스트)](/about-Shortest-Path){: target="_blank"}

이는 즉 `src`에서 도달할 수 없는 정점들은 신경쓰지 않아도 된다는 것을 의미한다.

따라서 과감하게 도달할 수 없는 정점들을 무시해버리자. 

도달할 수 없는 정점들을 무시하면, 알고리즘의 `V번`째 반복에서 `isNegativeCycle`이 `true`가 될 일이 없다.

다만, 어떻게 이 정점들을 무시할 수 있을까?

```c++
    for (int iter = 0; iter < V; ++iter) {
        updated = false;
        for (int node = 1; node <= V; ++node) {
            if (upper[node] == INF) continue;   //  닿을수 없는 정점을 건너띔으로써 해당 정점에서 발생하는 사이클을 무시한다.

            for (int i = 0; i < adj[node].size(); ++i) {
                int next = adj[node][i].first;
                int cost = adj[node][i].second;

                //  (node, next) 간선을 따라 완화를 시도한다.
                if (upper[next] > upper[node] + cost) {
                    //  성공
                    upper[next] = upper[node] + cost;
                    updated = true;
                }
            }
        }
        //  모든 간선에 대해 완화가 실패했을 경우 V-1번도 돌 필요 없이 곧장 종료한다.
        if (!updated) break;
    }
```

두번째 for문의 다음 코드를 주목하자.

```
if(upper[node] == INF) continue;
```

이러면 모든 정점들에 대해 건너띄는것이 아닌가 생각이 들겠지만, 우리는 시작 정점인 `1번` 정점의 upper값을 `0`으로 지정해준 상태이다.

따라서 `1번` 정점과 연결된 모든 정점들의 완화가 진행된다.

`1번` 정점과 연결되어있지 않은 정점들은 위 `continue` 코드에 의해 upper값이 `INF`로 남아있을 것이다. 

이를 통해 자연스럽게 `src`에서 도달할 수 없는 정점들을 건너띄게 된다.

이로써 첫번째 문제를 해결하였다. 이제 두번째 문제를 해결하면 된다. 공교롭게도 두번째 문제는 자동으로 해결된다.

도달할 수 없는 정점들을 건너띄었으므로, 도달 불가능한 정점들끼리의 완화가 진행될 경우가 없고, 따라서 두번째 문제인 도달 불가능한 정점의 식별시 주의사항또한 지킬 필요가 없어졌다!

따라서 더이상 `INF`값에 적당한 수를 빼는 수고를 하지 않아도 된다.

한 줄의 코드로 두개의 문제사항을 해결한 셈이다.

---

#### 시간 복잡도의 계산

이 알고리즘에서 3중 for문이 사용된다.

- 두번째, 세번째 for문은 시작정점인 `1번`정점부터 `V번`정점까지 각각 `edge relaxation`을 진행한다. 이때 **그래프의 모든 간선을 검사**하므로 `O(E)`

- 첫번째 for문은 위 과정을 `V번`만큼 반복한다. 음수 사이클 여부가 중요하지 않다면 `V-1번` 반복하겠지만 시간복잡도는 어쨌든 `O(V)`

따라서 벨만-포드 알고리즘의 최종 시간복잡도는 $O(VE)$가 된다.

---

###### 관련 문제

- [BOJ 11657 - 타임머신](https://www.acmicpc.net/problem/11657){: target="_blank"}

- [BOJ 1865 - 웜홀](https://www.acmicpc.net/problem/1865){: target="_blank"}

---

#### 참고 사항

PS에서는 많은 사람들이 벨만-포드 알고리즘을 다음과 같이 간단하게 구현한다.

```c++
    bool minusCycle = false;
    fill(dist, dist+N, INF);
    dist[1] = 0;
    for(int i=1; i<=N; i++){
        for(int j=1; j<=N; j++){
            for(auto &p: adj[j]){
                int next = p.first, d = p.second;
                if(dist[j] != INF && dist[next] > dist[j] + d){
                    dist[next] = dist[j] + d;
                    if(i == N) minusCycle = true;
                }
            }
        }
    }
```

---

## References

- Introduction to Algorithms

- 알고리즘 문제 해결 전략 2

- <https://bluemoon-1st.tistory.com/17>{: target="_blank"}

- <https://www.crocus.co.kr/534>{: target="_blank"}

- <https://ratsgo.github.io/data%20structure&algorithm/2017/11/27/bellmanford/>{: target="_blank"}
