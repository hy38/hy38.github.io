---
layout: post
current: post
cover:  assets/images/algorithm/infinite.png
navigation: True
title: 다익스트라 알고리즘에서 음수 간선이 존재하면 안되는 이유 - Reason Why Dijkstra Fail on a Negative Weighted Edge
date: 2020-04-12 19:00:00
tags: [algorithm, theory]
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> 다익스트라 알고리즘과 음수 간선

#### 다익스트라 알고리즘에서 음수 간선의 존재 여부가 중요한 이유

> 흔히들 음수 간선이 있으면 [다익스트라](/dijkstra-algorithm){: target="_blank"} 대신에 [벨만-포드](/bellman-ford-algorithm){: target="_blank"} 알고리즘이나 [SPFA](/shortest-path-faster-algorithm){: target="_blank"}를 사용한다. 다만, 그 구체적인 이유를 알고 사용하면 각 알고리즘들의 원리를 더 깊게 파악할 수 있을것이다.

음수 간선이 존재하게 될 경우 다익스트라 알고리즘을 사용하지 않는 이유는 크게 세 가지 이유가 있다.

1. (가중치의 합이 음수인)음수 사이클의 발생 가능성

2. Edge Relaxation 계산의 오류 가능성

3. 회피시의 시간복잡도

#### 1. 가중치의 합이 음수인 사이클의 발생 가능성

그래프에서 사이클은 상황에 따라 존재할 수 있다. 다만, 사이클 내의 가중치 합이 음수인 음수 사이클이 존재할 경우 상황이 복잡해진다.

![cycle](/assets/images/algorithm/cycle.png)

위 그래프에서 시작점을 A라 설정하였을 때, A에서 D까지 가는 최단경로는 얼마일까?

`A - B - C - D` 의 경로를 지나게 되면 거리는 `60`일 것이다.

그러나, 간선 CA의 가중치가 음수인 것을 이용하면 다음과 같은 경로가 나올 수 있다.

`A - B - C - A - B - C - D`

위와 같이 사이클을 한번 지나게되면 경로는 기존 거리 60의 경로보다 50이 작은 `10`이 된다.

사이클을 한번 더 돌아보게 되면 다음과 같은 경로가 나오고, 경로는 10보다 50이 더 작은 `-40`이 된다.

`A - B - C - A - B - C - A - B - C - D`

**여기서 알 수 있는 사실은, 가중치의 합이 음수인 사이클이 존재하게 되면 최단 경로가 음의 무한대로 발산하게 된다는 것 이다.**

따라서 음수 간선이 존재하면 음수 사이클이 존재할 가능성이 있기 때문에, 다익스트라 외에 다른 알고리즘을 사용하는 것이 타당해보인다.

---

#### 2. Edge Relaxation 계산의 오류 가능성

대부분 음수 사이클에 대해 유념하고 있을 것이라 생각한다. 

다만 그 외에도 음수간선이 존재하게 되면 **relax 연산이 잘못 수행될 수 있는 여지가 있다.**

다음 시작점이 A라 가정한 그래프를 보자. 이때, 다익스트라 알고리즘이 min-heap 우선순위 큐를 사용함을 생각해두자.

![cycle](/assets/images/algorithm/negative-weight-edge.png)

위 그래프에서 초기 dist는 시작점 A를 제외하고 모두 양의 무한대일 것이다.

`dist[A] + cost(A, C) < dist[C]` 이기에 `dist[C]`를 `dist[A] + cost(A, C)`인 `2`로 relax해준다. 마찬가지로 `dist[B]` 또한 relax를 해준다.

이 때, 간선 AC의 가중치가 AB의 가중치보다 작기 때문에, 우선순위 큐에 들어가 있는 B와 C 중 C를 먼저 꺼내게 된다.

이후 다익스트라 알고리즘은 `dist[C]`를 최단거리라 인식하고 더이상 relax를 진행하지 않는다.

이렇게 되면 `dist[C]`는 `2`로 남게 되지만, 정작 최단거리는 `-5`이어야 한다.

**결과적으로 다익스트라 알고리즘이 제대로 작동하지 못한 것이다.**

그 이유는, 다익스트라 알고리즘은 기본적으로 `minimum`에 `minimum`을 더하는 식으로 작동하기 때문이다.

시작점 A가 `minimum`이라는 원칙아래에 A와 연결된 노드들을 우선순위큐에 넣고, 가중치가 작은 것들부터 뽑아서 relax해주기 때문에 `minimum + minimum = minimum` 을 이용하여 최단 경로를 찾아낸다.

이는 다익스트라 알고리즘이 최단거리는 최단거리로 이루어져 있다는 데에서 시작한 **[그리디(Greedy) 알고리즘](https://namu.wiki/w/%EA%B7%B8%EB%A6%AC%EB%94%94%20%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98){: target="_blank"}**이기 때문이다.

그리디하게 작은것만을 계속 취하게 되다 보니 근시안적 관점을 유지할 수밖에 없다. 다만, 모든 가중치가 양수일 경우에는 이로 인해 더욱 빠르게 최단경로를 구할 수 있다.

---

#### 3. 회피시의 시간복잡도

다익스트라 알고리즘의 코드를 잘 수정하여 `priority queue`에 계속 `update`해주는 방식의 회피법이 존재하지만, 최악의 경우 **지수시간**이라는 매우 느린 시간복잡도를 갖게 된다. 따라서 음수 간선이 존재할 경우에는 웬만하면 다른 알고리즘들을 사용하자.

---

#### 음수 간선이 존재할 경우의 대안

1. [벨만-포드](/bellman-ford-algorithm){: target="_blank"} 알고리즘

2. [SPFA](/shortest-path-faster-algorithm){: target="_blank"} 알고리즘

SPFA 알고리즘의 시간복잡도가 벨만-포드 알고리즘보다 빠르기 때문에 SPFA를 사용하는 것이 유리하다.

---

#### 모든 간선의 가중치에 수를 더해서 가중치를 모두 양수로 만들면?

예를 들어 가장 낮은 가중치가 `-5`인 그래프가 존재한다 가정하자.

![graph_before_plus](/assets/images/algorithm/graph-before-plus.png)

이때 모든 간선들에 `5` 혹은 그 이상의 가중치를 모두 동일하게 더해주자.

결과는 다음과 같다.

![graph_after_plus](/assets/images/algorithm/graph-after-plus.png)

모든 간선이 음이 아닌 수이기 때문에, 다익스트라를 사용하면 음수 사이클의 발생도, `relax`연산의 오류가능성도 사라지게 된다.

다만, 구해지는 최단거리는 `(우리가 더해준 가중치) * (출발점으로부터 지나온 간선의 수)` 만큼 더해져서 나올 것이다.

**나쁘지 않은 발상이었지만, 음수 간선 문제를 해결하는데에는 큰 도움을 주지는 못한다.**

---

###### 음수 간선이 존재하는 문제 예시

- [BOJ 11657 - 타임머신](https://www.acmicpc.net/problem/11657){: target="_blank"}

---

## References

- Introduction to Algorithms

- 알고리즘 문제 해결 전략 2

- <https://stackoverflow.com/questions/13159337/why-doesnt-dijkstras-algorithm-work-for-negative-weight-edges>{: target="_blank"}

- <https://www.acmicpc.net/board/view/19865>{: target="_blank"}

- <https://stackoverflow.com/questions/6799172/negative-weights-using-dijkstras-algorithm/6799344#6799344>{: target="_blank"}

- <https://cs.stackexchange.com/questions/19771/why-does-dijkstras-algorithm-fail-on-a-negative-weighted-graphs>{: target="_blank"}

- <https://jason9319.tistory.com/307>{: target="_blank"}