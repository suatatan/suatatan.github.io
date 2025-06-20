---
date: 2023-02-03
layout: post
tags:
- english
- longread
- technology
title: Affinity Propagation Algorithm
---

An unsupervised machine learning approach called affinity propagation is particularly effective for cases where we are unsure of the ideal number of clusters to use. Most of clustering algorithms require apriori information of "how many cluster exists in your data". If you don't know, you need to define with the methods like Silhouette or "intertia index" or "elbow". This algorithms looks like a solution I'll try

Sklearn has method for it:

```
>>> from sklearn.cluster import AffinityPropagation
>>> import numpy as np
>>> X = np.array([[1, 2], [1, 4], [1, 0],
...               [4, 2], [4, 4], [4, 0]])
>>> clustering = AffinityPropagation(random_state=5).fit(X)
>>> clustering
AffinityPropagation(random_state=5)
>>> clustering.labels_
array([0, 0, 0, 1, 1, 1])
>>> clustering.predict([[0, 0], [4, 4]])
array([0, 1])
>>> clustering.cluster_centers_
array([[1, 2],
       [4, 2]])
```
