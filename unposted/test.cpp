DFS_All()
{
  for (vertex u in G.V)
  {
    u.color = WHITE
  }
  time = 0;
  for (vertex u in G.V)
  {
    if (u.color == WHITE)
      DFS(G, u)
  }
}

DFS(G, u)
{
  time = time + 1 u.d = time;
  u.color = GRAY // mark as visited
      for (vertex u = v in G.Adj[u])
  {
    if (v.color == WHITE)
      DFS(G, v)
  }
  u.color = BALCK // mark as finished
      time = time + 1;
  u.f = time;
