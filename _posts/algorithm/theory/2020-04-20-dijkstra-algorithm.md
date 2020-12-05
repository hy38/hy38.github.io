---
layout: post
current: post
cover: assets/images/algorithm/crystal.jpg
navigation: True
title: 다익스트라 최단경로 알고리즘의 구현 - Dijkstra Shortest Path Algorithm
date: 2020-04-20 09:00:00
tags: [algorithm, theory]
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> 다익스트라 최단 경로 알고리즘

#### 그래프의 최단경로 알고리즘

그래프의 최단경로 알고리즘에 대한 설명은 [**여기**](/about-Shortest-Path){: target="_blank"}에서 확인할 수 있다. 최단거리 알고리즘의 종류들과 `edge relaxation`에 대해 설명한다.

> 최단경로 알고리즘과 edge relaxation에 대해 자세히 알지 못한다면, [**여기**](/about-Shortest-Path){: target="_blank"}에서 먼저 알아보는 것이 좋을것 같다.

---

###### 기본적인 아이디어

다익스트라 알고리즘의 시작점은 **최단경로는 최단경로로 이루어졌다**는 그리디(Greedy) 알고리즘에서 나왔다.

어떤 정점 u에서 정점 v까지 가는 **최단경로**가 다음과 같이 존재한다 하자.

`u -> x -> y -> z -> v`

이 때 `u -> x`로의 경로는 최단경로이고, `x -> y`로, `y -> z`로, `z -> v`로의 경로 모두 **최단경로**이며

이것을 **최단경로는 최단경로로 이루어졌다**고 표현한다.

다익스트라 알고리즘은 여기에서 시작한다.

---

#### 음수간선이 존재하면 안되는 이유

다익스트라 알고리즘을 사용할 때에는 그래프에 음수 가중치를 갖는 간선이 존재하는지의 여부가 매우 중요하다.

그 이유는 크게 3가지가 있다.

1. (가중치의 합이 음수인)음수 사이클의 발생 가능성

2. Edge Relaxation 계산의 오류 가능성

3. 회피시의 시간복잡도

다만 중요한 내용이기 때문에 세부적인 이유는 [**여기**](/why-dijkstra-fail-on-a-negative-weighted-edge){: target="_blank"}에서 자세히 다룬다.

---

###### 우선순위 큐의 사용

초기 다익스트라가 고안한 알고리즘은 우선순위큐를 사용하지 않는 형태였다. 따라서 시간복잡도가 $O(N^2)$을 가졌었는데, 적절한 자료구조들을 이용하여 점차 시간복잡도를 줄일 수 있게 되었다.

그 중 주로 사용하는 자료구조가 **[우선순위 큐(Priority Queue)](https://ko.wikipedia.org/wiki/%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84_%ED%81%90){: target="_blank"}**이다.

우선순위 큐의 사용은 가중치가 낮은 간선을 먼저 따라가기 위함이며, 주로 `heap`을 사용하여 구현한다.

다익스트라 알고리즘은 작은것의 우선순위가 더 높은 `min-heap`을 사용한다.

우선순위 큐를 사용하는 알고리즘의 시간복잡도는 $O(ElogV)$이다.

---

#### 우선순위 큐에 정점을 넣는 2가지 방법

우선순위 큐를 이용하여 다익스트라 알고리즘을 구현할 때 선택할 수 있는 두 가지 방법이 있다.

1. 시작할 때 모든 정점을 우선순위 큐에 `push`한다.

2. 시작 정점을 우선순위 큐에 넣고 시작하여 edge relaxation이 일어날때마다 우선순위 큐에 `push`한다.

개인적으로 두번째 방법을 주로 사용하는 편이기에 2번을 중점으로 알아보겠다.

---

###### 다익스트라 알고리즘의 구현(코드)

- C++ Code with Priority Queue(STL)

```c++
#include <vector>
#include <queue>
using namespace std;

const int MAX_V = 100;
int INF = 987654321;
int V;
//  인접리스트, <연결된 정점 번호, 간선 가중치> 쌍
vector< pair<int, int> > adj[MAX_V];
vector<int> dist;

vector<int> dijkstra(int src){

    dist = vector<int>(V, INF);
    dist[src] = 0;
    priority_queue< pair<int, int> > pq;    //  <간선 가중치, 연결된 정점 번호> 쌍
    pq.push({0, src});  //  시작정점을 pq에 넣어준다.

    while(!pq.empty()){

        int cost = -pq.top().first; //  min-heap을 이용하기 위해 cost에 -를 붙인다.
        int node = pq.top().second;
        pq.pop();

        //  만약 지금 꺼낸 것보다 더 짧은 경로를 알고 있다면 지금 꺼낸 것을 무시한다.
        if(dist[node] < cost) continue;

        for(int i=0; i<adj[node].size(); ++i){
            int next = adj[node][i].first;
            int nextDist = adj[node][i].second + cost;  // 간선 (node, next)의 가중치에 cost를 더해준다. 

            //  더 짧은 경로를 발견하면, dist[]를 갱신하고 우선순위 큐에 넣는다.
            if(nextDist < dist[next]){
                dist[next] = nextDist;  //  edge relaxation
                pq.push(make_pair(-nextDist, next));    //  min-heap을 이용하기 위해 cost에 -를 붙인다.
            }
        }
    }

    return dist;    //  src정점부터 다른 모든 정점까지의 거리를 담은 벡터를 반환한다.
}
```

---

###### 다익스트라 알고리즘의 동작 과정

> 시작점은 `a`번 정점이라 생각하자. 여기에서 말하는 큐는 모두 우선순위 큐이다. 큐에서 정점을 뽑는 과정을 그 정점을 방문한다고 말한다.

> 또한, `dist[v]는 dist[v] > dist[u] + cost(u, v)`인 경우에 `dist[u] + cost(u, v)`로 업데이트한다. 업데이트와 동시에 해당 정점을 큐에 넣는다. 큐에 넣을때에는 해당 정점번호와 그 번호로 가기위한 거리까지를 쌍으로 넣어준다.

![dijkstra1_graph](/assets/images/algorithm/dijkstra1-graph.png)

1) 모든 정점까지의 거리를 `양의 무한대`로 설정해준다. 다만 `a`번 정점까지의 거리는 `0`으로 설정한다.

2) `a`번 정점을 큐에 넣고 빼어 주변 정점들을 찾아 방문한다.

2-1) 주변 정점인 `b`와 `c`의 거리값인 `dist[b]`와 `dist[c]`를 업데이트해주고 `b`와 `c`를 큐에 넣는다.

3) 큐에 남은 원소 `b, c` 중 거리값이 낮은 값인 `c`를 먼저 큐에서 뽑는다.

3-1) `c` 주변 정점인 `d`의 거리값 `dist[d]`를 업데이트해주고, `d`를 큐에 넣는다.

4) 큐에 남은 원소 `b, d` 중 거리값이 낮은 값인 `d`를 먼저 큐에서 뽑는다.

4-1) d의 주변 정점인 `b`와 `e, f`가 존재한다.

4-2) 먼저, `b`로 가는 더 짧은 경로가 존재하므로 `dist[b]`를 다시 업데이트해준다.

4-3) `dist[e]`와 `dist[f]`는 아직 `양의 무한대`이기에 곧바로 업데이트한다.

5) 큐에 남은 원소 `b, e, f` 중 거리값이 낮은 값인 `b`를 먼저 큐에서 뽑는다.

5-1) 주변 정점 `g`와 `f`의 `dist[]` 업데이트를 시도한다.

5-2) `dist[g]`가 `양의 무한대`이기에 바로 업데이트해준다.

5-3) `dist[f]`는 `b`가 찾은 경로 `7`보다 작은 상태이기에 업데이트하지 않는다.

6) 큐에 남은 원소 `e, f, g`중 거리값이 낮은 값인 `f`를 먼저 큐에서 뽑는다.

6-1) `g`까지 갈수있는 거리가 8인 경로가 있지만, `dist[g]`는 이미 `7`이기 때문에 업데이트하지 않는다.

7) 큐에 남은 원소 `e`, `g`중 거리값이 낮은 값인 `g`를 먼저 큐에서 뽑는다.

7-1) `g`에서 업데이트 가능한 정점이 없으므로 다음 과정을 진행한다.

8) 마지막 남은 원소 `e`를 뽑는다.

8-1) `e`에서 업데이트 가능한 정점이 없으므로 다음 과정을 진행한다.

9) 큐에 남은 정점이 존재하지 않으므로 `while 반복문`을 종료하고 `dist배열`을 반환한다.

- 최종 결과

![dijkstra2_graph](/assets/images/algorithm/dijkstra2-graph.png)

---

#### 시간 복잡도의 계산

1) 모든 정점은 한번씩 방문되고, 모든 간선은 한번씩 검사된다. `O(E)`

2-1) 큐에는 최대 간선수만큼의 원소가 들어갈 수 있다. `O(E)`

2-2) 우선순위 큐에서 각 원소의 추가 / 삭제에는 비용이 든다. `O(log(E))`

위 두 과정을 모두 더하면 총 시간복잡도는 `O(E + ElogE) = O(ElogE)`가 된다.

$E < V^2 , log(E) < 2log(V)$

이므로 `logE`를 `logV`라 해도 무방하다.

따라서 우선순위 큐를 사용한 다익스트라 알고리즘의 시간 복잡도는 `ElogV` 이다.

---

###### 관련 문제

- [BOJ 1261 - 알고스팟](https://www.acmicpc.net/problem/1261){: target="_blank"}

- [BOJ 1504 - 특정한 최단 경로](https://www.acmicpc.net/problem/1504){: target="_blank"}

- [BOJ 18223 - 민준이와 마산 그리고 건우](https://www.acmicpc.net/problem/18223){: target="_blank"}

- [BOJ 11779 - 최소비용 구하기 2](https://www.acmicpc.net/problem/11779){: target="_blank"}

- [Algospot - 소방차](https://algospot.com/judge/problem/read/FIRETRUCKS){: target="_blank"}

---

### 참고 사항

- 다음 코드로 인해 큐에 들어간 중복원소를 무시한다. 이 코드를 작성하지 않아도 최단거리는 구해지지만, 시간초과가 나게끔 하는 테스트케이스로 저격이 가능하다. 이에 대한 설명은 [**여기**](http://www.secmem.org/blog/2019/01/09/wrong-dijkstra/){: target="_blank"}에서 알아볼수 있다.


```
if(dist[node] < cost) continue;
```

- 다익스트라 관련 문제들 중 **최단거리는 최단거리로 이루어졌음을** 이용하는 문제가 많다.

---

## References

- Introduction to Algorithms

- 알고리즘 문제 해결 전략 2

- <https://jason9319.tistory.com/307>{: target="_blank"}

- <http://www.secmem.org/blog/2019/01/09/wrong-dijkstra/>{: target="_blank"}

- <https://ko.wikipedia.org/wiki/%EB%8D%B0%EC%9D%B4%ED%81%AC%EC%8A%A4%ED%8A%B8%EB%9D%BC_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98>{: target="_blank"}
