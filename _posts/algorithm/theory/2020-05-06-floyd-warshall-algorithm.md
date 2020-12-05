---
layout: post
current: post
cover:  assets/images/algorithm/road.jpg
navigation: True
title: 플로이드 워셜 최단경로 알고리즘의 구현 - Floyd-Warshall Shortest Path Algorithm
date: 2020-05-06 19:00:00
tags: [algorithm, theory]
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> 플로이드-와샬 최단 경로 알고리즘

#### 그래프의 최단경로 알고리즘

그래프의 최단경로 알고리즘에 대한 전반적인 설명은 [**여기**](/about-Shortest-Path){: target="_blank"}에서 확인할 수 있다.

플로이드-워셜 알고리즘은 플로이드-와샬, 플로이드 등 다양하게 불린다.

###### All Pairs Shortest Path

플로이드 알고리즘은 모든 쌍의 정점들에 대해 최단 경로를 구하는 알고리즘이다.

모든 쌍에 대해 최단 경로를 구할때에는 다익스트라 알고리즘을 V번만큼 수행하는 것도 가능하겠지만, 다익스트라의 시간복잡도가 $O(ElogV)$이므로, 총 $O(V * ElogV)$가 되어 복잡하고 효율적이지 못하다.

플로이드 알고리즘은 간단한 **4줄의 코드**로 모든 쌍에 대한 최단 경로를 $O(V^3)$의 시간복잡도로 구한다.

비록 4줄의 코드지만 개인적으로는 최단 경로 알고리즘 중 **가장 이해하기 힘들었던** 알고리즘인것 같다.

---

#### 기본적인 아이디어

###### DP(Dynamic Programming)

플로이드 알고리즘은 다이나믹 프로그래밍을 사용하는 알고리즘이다.

따라서 다이나믹 프로그래밍에 대한 이해가 하나도 없다면, [**여기**](/https://ko.wikipedia.org/wiki/%EB%8F%99%EC%A0%81_%EA%B3%84%ED%9A%8D%EB%B2%95){: target="_blank"}에서 기본적인 메커니즘정도는 파악하는것이 이 알고리즘을 이해하는데 도움이 될 것이다.

###### 경유점

정점 `i`에서 `j`로 가는데에는 여러 가지 경로가 존재한다. 그러나 모든 경로는 두 가지 경우로 나뉜다.

1. `i`에서 `j`로 곧바로 가는 경로

2. `i`에서 다른 정점 `k`를 거쳐 `j`로 가는 경로

이들 중에 작은것을 최단 경로로 택하면 된다.

플로이드는 이렇게 **경유점을 선택해나가며 길을 만들어가는 방식**으로 동작한다.

반복문에서 `k`가 `1`부터 `V`번 정점까지 돌면서 각각의 정점을 지나는 경로를 선택할것인지를 결정한다.

만일 `k`를 거쳐간다면, `i`에서 `k`까지 경로 `p1`이 존재하게된다. 이때 `p1`은 {1, 2, ..., k-1} 까지의 정점들을 선택할것인지를 이미 결정을 끝낸 최단경로이며, `k`에서 `j`까지의 경로 `p2`또한 마찬가지이다.

플로이드 알고리즘의 핵심은 다음 식이다.

```
adj[i][j] = min(adj[i][j], adj[i][k] + adj[k][j]);
```

`k`를 거쳐가지 않는 경우와 `k`를 거쳐가는 경우인 `p1 + p2` 중 작은것을 택한다.

추가로, 만약 `i`에서 `j`까지 직접 가는 것이 최단 경로인 경우라면 다른 정점들을 전부 지나지 않는다는 것을 의미한다.

---

###### 초기화

플로이드 알고리즘은 **DP**를 이용하며, 결과값을 만들어내기 전의 초기화는 상당히 중요하다.

이전의 최단경로 알고리즘에서는 모든 가중 그래프의 표기를 인접 리스트 방식으로 표현했지만, 플로이드 알고리즘에서는 인접 행렬 표기법을 사용한다. 행렬은 간선들의 가중치를 담는다.

- `adj` 배열의 초기화

  - 도달할 수 없는 정점들에 대해 모두 **매우** 큰 값(`INF`)을 넣어주어야 한다.

  - 또한, 자기 자신에게 가는 간선의 가중치는 `0`으로 설정해주어야 한다.

---

#### 음수 간선의 존재 여부

###### 음수간선은 OK, 가중치의 합이 음수인 사이클은 NO!

다른 알고리즘과 마찬가지로 음수인 사이클은 플로이드 알고리즘의 정당성을 보장하지 못한다.

음수인 사이클로 빠지게 될 경우 최단 경로가 `음의 무한대`로 계속 발산할 수 있기 때문이다.

다만, [**벨만-포드**](/bellman-ford-algorithm){: target="_blank"} 알고리즘과 동일하게 음수 사이클이 아닌 `음수 간선`은 알고리즘에 영향을 미치지 않는다.

###### 가중치의 합이 음수인 사이클의 존재 여부 파악

벨만-포드 알고리즘의 경우 반복을 `V번` 수행함으로써 음수 사이클이 있는지를 확인할 수 있었다.

플로이드 알고리즘은 **자기 자신에게 가는 간선들을 검사**함으로써 확인할 수 있다.

자기 자신에게 가는 간선들을 adj[i][i]라 하고, 당연하게 최단 경로를 `0`으로 초기화한다.

플로이드 수행 이후 adj[i][i]가 0보다 작으면 그래프에 음수 사이클이 존재한다는 의미이다.

아주 간단한 사이클을 예로 들어보자.

`i`에서 출발하여 다른 정점 `k`를 거쳐갔다 다시 `i`로 왔을 때 이는 `i - k - i` 사이클을 이룬다.

이때 이 사이클의 가중치 합이 음수일 경우에, 초기값이 `0`이었던 최단 경로 adj[i][i]가 음수값을 갖게된다.

---

#### 플로이드 알고리즘의 구현(코드)

- C++ Code

```c++
#include <iostream>
#include <algorithm>

#define INF 0x3f3f3f3f
#define MAX_V 201
using namespace std;

int adj[MAX_V][MAX_V];
int V, edges;

void init(){
  for(int i=0; i<V; ++i)
      for(int j=0; j<V; ++j){
          if(i == j)  adj[i][i] = 0;
          else adj[i][j] = INF;
      }
}

void floyd(){
    for(int k=0; k<V; ++k)
        for(int i=0; i<V; ++i)
            for(int j=0; j<V; ++j)
                adj[i][j] = min(adj[i][j], adj[i][k] + adj[k][j]);
}

int main() {

    input();
    init();
    floyd();

    return 0;
}

```

---

#### 시간 복잡도의 계산

이 알고리즘에서는 3중 for문이 사용된다.

모든 for문은 V번씩 반복을 하며, 최종 시간복잡도는 $O(V^3)$로 자명하다.

---

###### 관련 문제

- [BOJ 1389 - 케빈 베이컨의 6단계 법칙](https://www.acmicpc.net/problem/1389){: target="_blank"}
  - [풀이](/BOJ-1389){: target="_blank"}

---

#### 참고 사항

- 플로이드 워셜 알고리즘을 구현할 때 편의상 `k`를 for문으로 오름차순 처리하지만, 어떤 순서로 `k`를 매겨도 알고리즘 동작에는 영향을 주지 않는다.

- 양의 사이클을 판별할 때에는 adj[i][i] 또한 `INF`로 초기화 시켜준다. 이는 adj[i][i]가 adj[i][k] + adj[k][i]임을 이용하기 위한것이다.

- 문제에서 정점의 인덱스가 `0`부터 시작하는지, `1`부터 시작하는지에 따라 초기화를 적절히 해주어야한다.
  - 그렇지 않는 경우에 `1`부터 시작하는데, `V번` 정점을 초기화하지 않는 실수들을 범할수 있다.

- 문제에서 `i`에서 `j`로 가는 간선이 여러개가 입력으로 들어올 수 있다. 이 때 작은 간선을 택해주어야 한다.

---

## References

- Introduction to Algorithms

- 알고리즘 문제 해결 전략 2

- <https://codingdog.tistory.com/entry/%ED%94%8C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%B5%9C%EB%8B%A8%EA%B1%B0%EB%A6%AC%EA%B0%80-%EA%B0%B1%EC%8B%A0%EB%90%98%EB%8A%94%EA%B0%80?category=1055063>{: target="_blank"}

- <https://cloge.tistory.com/28>{: target="_blank"}

- <https://www.geeksforgeeks.org/detecting-negative-cycle-using-floyd-warshall/?ref=rp>{: target="_blank"}

- <https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/>{: target="_blank"}

- <https://dl.acm.org/doi/10.1145/367766.368168>{: target="_blank"}