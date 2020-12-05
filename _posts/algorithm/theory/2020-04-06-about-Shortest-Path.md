---
layout: post
current: post
cover:  assets/images/algorithm/wormhole.jpg
navigation: True
title: 그래프의 최단경로 알고리즘 - Shortest Path Algorithm of Graph
date: 2020-04-06 10:00:00
tags: [algorithm, theory]
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> 그래프의 최단경로 알고리즘

### 최단 경로(Shortest Path)

#### 사전적 정의

> 최단 경로 : 그래프에서 두 정점을 연결하는 가장 짧은 경로의 길이를 찾는 문제

- **가중치가 없는 그래프**에서는 보통 두 정점을 잇는 가장 적은 간선의 개수를 뜻함.

- **가중치가 존재하는 그래프**에서는 두 정점을 잇는 간선들의 가중치의 합 중 최소 가중치 합을 의미함.


#### 가중치가 없는 그래프에서의 최단 경로

- **[BFS(Breadth First Search)](/about-BFS){: target="_blank"}**
  - 그래프를 탐색하는 기법 중 하나이다.

  - **[DFS](/about-DFS){: target="_blank"}와 다르게** 주변 정점들을 먼저 탐색하는 방식의 탐색법이다.


#### 가중치가 존재하는 그래프에서의 최단 경로의 분류

- Single Source / One-to-All
  - 하나의 출발점에서 다른 모든 정점까지의 최단 경로를 찾음.

  - 예시 : **[다익스트라(Dijkstra)](/dijkstra-algorithm){: target="_blank"}** 알고리즘

- Single Destination
  - 모든 정점으로부터 하나의 도착점까지의 최단 경로를 찾음.

  - **다익스트라**로 대체 가능함

- Single Pair
  - 하나의 출발점으로부터 하나의 도착점까지의 최단 경로를 찾음.

  - 시간복잡도를 고려하면 최악의 경우 **다익스트라가 가장 빠름**

- All-Pairs
  - 모든 쌍에 대해 최단 경로를 찾음.

  - 예시 : **[플로이드-워셜(Floyd-Warshall)](/floyd-warshall-algorithm){: target="_blank"}** 알고리즘, 존슨 알고리즘


> 이와 같이 **다익스트라** 알고리즘이 최단 경로 문제에서 차지하는 중요도는 엄청나다. 다만, 다익스트라 알고리즘은 음수 간선이 존재하는 경우에는 사용이 제한된다. 이 경우에는 **[벨만-포드(Bellman-Ford)](/bellman-ford-algorithm){: target="_blank"}** 알고리즘이나 [SPFA](/shortest-path-faster-algorithm){: target="_blank"}를 사용한다. 자세한 이유는 [**여기**](/why-dijkstra-fail-on-a-negative-weighted-edge){: target="_blank"}를 통해 알아볼 수 있다.

---

#### Edge Relaxation이란?

- 흔히 relax 라고도 일컫는 이것은 초기 정점들 간의 거리값을 지정해둔 상태에서 더 나은 경로를 발견하였을 때 **개선**시켜준다는 의미가 강하다.

###### 초기값의 설정

- **시작정점 S로부터 다른 모든 정점 v들까지의 초기값을 어떻게 설정해야할까?**

기본적으로 떠오르는 아이디어는 `0`, `음의 무한대`, `양의 무한대`가 있다. 결론부터 말하자면, 가장 좋은 선택지는 **양의 무한대**가 된다.

첫번째 이유로는, 시작정점 S로부터 닿을수 없는 정점이 존재하기 때문이다. 이러한 정점들을 양의 무한대로 처리하는 것이 합리적일 것이다.

두번째 이유로는, 우리가 relax라는 작업을 할 때 가중치가 큰 경로가 더 작은 경로를 만나면 작은 경로로 **업데이트** 시켜주는데, 이와 잘 맞아떨어지기 때문이다.

다른 이유로는, 다른 대안이 딱히 없기 때문이다. `0`으로 설정하자니 edge relaxation을 할때 가중치가 0인 간선에 대한 처리를 어떻게 해야할까에 대한 고민과, 보통 시작정점 S의 거리값을 0으로 설정하는데 이를 어떻게 다르게 표현할것인가 등의 찝찝한 문제들이 발생한다.(물론, `무한대`와 `0`은 역수를 취하면 성질이 거의 비슷할 것이다.) `음의 무한대` 또한 비슷한 이유로 사용하지 않는것 같다. 대부분의 간선이 양수라서 그런것일까? 모든 간선이 음수라면 `음의 무한대`를 사용할것인지는 고민해봐야 할 문제인 것 같다. 실생활에서는 음수 가중치가 많이 드물기 때문에 `양의 무한대`가 합리적인 선택인것 같다.  

- **그렇다면 양의 무한대를 어떻게 표기해야 하는가?**

컴퓨터에서 무한대를 표현하는 것은 쉽지 않은 일이다. 사실 불가능하다고 생각한다. 무한이라는 수학적 개념을 적용해보면, 어떤 엄청나게 큰 값을 지정하게되면, 그보다 큰 값이 반드시 존재하기 때문에 심지어 컴퓨터에서의 표기는 더더욱 어려워보인다.

- **그렇다면, 무한대를 표기할 다른 대안이 있을까?**

수학적으로는 무한대가 아니지만, 적당히 큰 수를 지정하면 무한대와 비슷한 효과를 볼 수 있을것이다. PS에서 자주 사용되는 다음과 같은 수들이 대표적이다.

```C++
#define INF 987654321
#define INF2 1e9  //  1000000000 (10억)
#define INF3 2e9  //  2000000000 (20억)
#define INF4 0x7fffffff //  2147483647 (int범위 최대값)
#define INF5 0x3f3f3f3f //  1061109567 (약 10억)
#define INF6 0x7f7f7f7f //  2139062143 (약 21억)
```

나는 개인적으로 `987654321`를 주로 사용했던 편이다. 다만, 가끔 `INF`와 `INF`를 계속해서 더하는 문제의 경우 오버플로우 발생을 염려해야한다.

그래서 memset하기도 편한 `0x3f3f3f3f`을 사용하는 추세이다. 더 큰 `INF`값이 필요하면 `0x7f7f7f7f`을 사용한다.

이들은 다음과 같이 모든 값을 `INF`로 쉽게 설정할 수 있어 애용하게되었다.

```c++
#include <string.h>

... some code ...

int arr[MAX_V][MAX_V];

... some code ...

memset(arr, 0x3f, sizeof(arr));
memset(arr, 0x7f, sizeof(arr));
```

---

#### 최단 경로 알고리즘의 시간복잡도

- [다익스트라](/dijkstra-algorithm){: target="_blank"} :
  - **우선순위큐 사용 : $O(ElogV)$**
  - 반복문 사용 : $O(V^2 + E)$
  - 피보나치힙 사용 : $O(E + VlogV)$

- [벨만-포드](/bellman-ford-algorithm){: target="_blank"} : $O(VE)$

- [SPFA](/shortest-path-faster-algorithm){: target="_blank"} : $O(VE)$, 최선의 경우 $O(E)$

- [플로이드-워셜](/floyd-warshall-algorithm){: target="_blank"} : $O(V^3)$

각각의 알고리즘은 위의 링크들을 통해 더 자세히 다루도록 할것이다.

---

### References

- Introduction to Algorithms

- 알고리즘 문제 해결 전략 2

- <https://towardsdatascience.com/algorithm-shortest-paths-1d8fa3f50769>{: target="_blank"}

- <https://www.acmicpc.net/board/view/19865>{: target="_blank"}