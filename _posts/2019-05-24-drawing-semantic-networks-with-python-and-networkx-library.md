---
categories:
- bilgisayar
date: 2019-05-24
layout: post
tags:
- data-science
- english
- longread
- python
- technology
title: Drawing Semantic Networks with Python and NetworkX library
---

```
import networkx as nx
G = nx.Graph()
G.add_node("kids",repeat=2)
G.add_node("netflix",repeat=4)
G.add_node("strategy",repeat=1)
G.add_node("app",repeat=1,)
G.add_node("chinese",repeat=2)
G.add_node("movie",repeat=1)
G.add_node("language",repeat=2)
G.add_node("alibaba",repeat=1)
G.add_edges_from([
                  ('kids','netflix'),
                  ('kids','suat'),
                  ('kids','app'),
                  ('netflix','app'),
                  ('netflix','movie'),
                  ('netflix','strategy'),
                  ('strategy','movie'),
                  ('chinese','language'),
                  ('netflix','language'),
                  ('strategy','chinese'),
                  ('netflix','alibaba')
                 ])

#colorizing according to the frequency
#https://stackoverflow.com/questions/27030473/how-to-set-colors-for-nodes-in-networkx-python
color_map = []
for node in G:
    #https://stackoverflow.com/questions/13698352/storing-and-accessing-node-attributes-python-networkx
    node_repeat = G.node[node]['repeat']
    if node_repeat > 2:
        color_map.append('red')
    else: color_map.append('orange')
    

import matplotlib.pyplot as plt
pos=nx.circular_layout(G)
nx.draw(G,node_color = color_map,with_labels = True , pos = pos)
plt.show()
```

![](/images/indir.png)
