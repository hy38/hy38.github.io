---
layout: post
current: post
cover:  assets/images/algorithm/bood.jpg
navigation: True
title: 오일러 서킷과 트레일의 구현 - Eulerian Circuit and Trail
date: 2020-02-21 19:00:00
tags: [algorithm, theory]
class: post-template
subclass: 'post tag-getting-started'
author: hy38
---

> 오일러 서킷과 트레일

## 오일러 서킷이란? 트레일이란?

### 사전적 정의

> 오일러 서킷 : 그래프의 모든 간선을 정확히 한 번씩 지나서 시작점으로 돌아오는 경로를 말한다. 반드시 시작점으로 돌아와야하며, 
한 번 지나간 선으로는 지나가지 않고 모든 선을 이어 그림을 완성하는 것

- 이와 유사하지만, 미묘한 차이가 있는 오일러 트레일의 사전적 정의는 다음과 같다.

> 오일러 트레일 : 오일러 서킷처럼 그래프의 모든 간선을 정확히 한 번씩 지나지만, 시작점과 끝점이 다른 경로이다.

- DFS를 이용한 오일러 서킷을 찾는 시간복잡도는 O(V * E)를 갖는다.

---

## 오일러 서킷의 존재 조건

1. 구성 요소의 갯수와의 관계

  - 우선, 그래프의 **간선**들이 두 개 이상의 구성 요소(components)로 나뉘어 있는 경우에는 오일러 서킷이 존재 할 수 **없다**.

  - 이는, 그래프가 두 개 이상의 구성 요소로 존재하더라도 간선들이 나뉘어 있지 않은 경우에는 존재 할 수 **있음**을 말하며, 간선들이 **하나의 구성 요소에 모두 존재**할 경우 오일러 서킷이 존재할 수 **있다**는 뜻이다.

2. 정점의 차수(degree)와의 관계

  - 무방향 그래프의 경우 모든 정점이 짝수개의 차수를 가져야 오일러 서킷이 존재한다. 이때, 차수는 한 정점에 인접한 간선의 수를 말하며, 들어오는 차수인 indegree와 나가는 차수인 outdegree로 구분된다.

  - 방향 그래프의 경우 indegree와 outdegree의 개수가 같아야 한다. 이는 무방향과 비슷한 이유로 설명된다.

---

### 오일러 서킷의 존재 여부 확인 코드

```c++
bool checkEuler()
{
    int plus1 = 0, minus1 = 0;
    for (int i = 0; i < N; ++i) {
        int delta = outdegree[i] - indegree[i];
        if (delta < -1 || 1 < delta)
            return false;
        if (delta == 1)
            plus1++;
        if (delta == -1)
            minus1++;
    }
    return (plus1 == 1 && minus1 == 1) || (plus1 == 0 && minus1 == 0);
}
```

---

## 오일러 서킷의 구현(DFS 응용)

- 우선 기존 DFS와 달리 방문 배열(vis)이 존재하지 않음에 유의하자.

- **정말 신기한 방식**으로 오일러 서킷을 만들어낸다.

- 코드를 하나씩 디버깅해보면 작동방식이 이해가 쉽다.

- 하나씩 디버깅해보는것을 추천한다.

```c++
vector<vector<int>> adj;

void getEulerCircuit(int node, vector<int> &circuit)
{
    for (int i = 0; i < adj[node].size(); ++i) {
        while (adj[node][i] > 0) {
            adj[node][i]--;
            adj[i][node]--; //  단방향 그래프의 경우 이 코드를 지워준다.
            getEulerCircuit(i, circuit);
        }
    }
    circuit.push_back(node);
}
```

- 위 코드는 **무방향 그래프**의 경우의 코드이다.

- **단방향 그래프**의 경우에는, adj[i][node] 코드를 삭제하여 화살표를 지우지 않는다.

- 인접 배열을 이용하였지만, 인접 리스트를 이용하여 그래프를 표현하였다면 시간복잡도를 줄일 수 있을 것이다.

---

## 오일러 트레일의 존재 조건

- **시작점과 끝점은 차수가 홀수**인 정점이고, **그 외의 정점은 차수가 짝수**인 정점이어야 한다.

- 한붓그리기를 연상하면 쉽게 이해가 된다.

- 시작점은 나가는 간선의 수가 들어오는 간선의 수보다 하나 많아야 한다.

- 끝점은 나가는 간선의 수보다 들어오는 간선의 수가 하나 많아야 한다.

---

### 오일러 트레일의 존재 여부 확인 코드

- 오일러 서킷의 존재 여부 확인 코드와 동일하다.

---

## 오일러 트레일이나 서킷을 찾는 코드

- 먼저 오일러 트레일을 찾아본다.

- 이는 시작점이 존재하는지를 찾는것과 동일하다.

```
  if(outdegree[i] == indegree[i] + 1)
```

- 트레일이 아니라면, 서킷을 찾아보도록 한다.

- 서킷은 아무 정점에서나 시작해도 된다.

- 단, outdegree가 존재하는 정점이어야 한다.

- 따라서, 코드는 다음과 같다.

```c++
vector<int> getEulerTrailOrCircuit()
{
    vector<int> circuit;
    //  find trail
    for (int i = 0; i < N; ++i) {
        if (outdegree[i] == indegree[i] + 1) {
            getEulerCircuit(i, circuit);
            return circuit;
        }
    }
    //  find circuit
    for (int i = 0; i < N; ++i) {
        if (outdegree[i]) {
            getEulerCircuit(i, circuit);
            return circuit;
        }
    }
    //  else
    return circuit;
}
```

---

### 참고 사항

- 그래프를 입력받는 과정에서 **indegree**와 **outdegree**를 같이 입력받아야한다.

- 오일러 서킷 혹은 트레일이 존재한다고 해도, **모든 간선을 방문해야 함**에 유의하자. 서킷이 존재하더라도 모든 간선을 방문하지 않았다면, 그 서킷이 **오일러** 서킷이라고 볼 수 없다.

- 이는 그래프의 간선이 두 개 이상의 components로 나뉘어있을 때 발생할 수 있다.

---

## References

- Introduction to Algorithms

- 알고리즘 문제 해결 전략 2

- [https://namu.wiki/w/%ED%95%9C%EB%B6%93%EA%B7%B8%EB%A6%AC%EA%B8%B0](https://namu.wiki/w/%ED%95%9C%EB%B6%93%EA%B7%B8%EB%A6%AC%EA%B8%B0){: target="_blank"}

- [https://sonsh0824.tistory.com/entry/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B3%B5%EB%B6%804-%ED%95%9C%EB%B6%93%EA%B7%B8%EB%A6%AC%EA%B8%B0Eulerian-circuit](https://sonsh0824.tistory.com/entry/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B3%B5%EB%B6%804-%ED%95%9C%EB%B6%93%EA%B7%B8%EB%A6%AC%EA%B8%B0Eulerian-circuit){: target="_blank"}

- [https://velog.io/@doontagi/%EA%B7%B8%EB%9E%98%ED%94%84-%EC%98%A4%EC%9D%BC%EB%9F%AC-%EC%84%9C%ED%82%B7%EA%B3%BC-%ED%8A%B8%EB%A0%88%EC%9D%BC](https://velog.io/@doontagi/%EA%B7%B8%EB%9E%98%ED%94%84-%EC%98%A4%EC%9D%BC%EB%9F%AC-%EC%84%9C%ED%82%B7%EA%B3%BC-%ED%8A%B8%EB%A0%88%EC%9D%BC){: target="_blank"}

- [https://projooni.tistory.com/entry/%EC%98%A4%EC%9D%BC%EB%9F%AC-%EC%84%9C%ED%82%B7](https://projooni.tistory.com/entry/%EC%98%A4%EC%9D%BC%EB%9F%AC-%EC%84%9C%ED%82%B7){: target="_blank"}

- [https://coloredrabbit.tistory.com/36](https://coloredrabbit.tistory.com/36){: target="_blank"}

- [https://100100e.tistory.com/118](https://100100e.tistory.com/118){: target="_blank"}