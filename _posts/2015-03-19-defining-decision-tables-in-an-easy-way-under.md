---
layout: post
title: "Defining decision tables in an easy way under Python"
date: 2015-03-19
categories: 
  - "genel"
---

Definition:

x={‘a1’:{'speed’:30,'price’:100},'a2’:{'speed’:10,'price’:80}}

Call:

x\['a1’\]\['speed’’\]

Result:  
30

Call iteratively:

for i in x:  
print(x\[i\]\['speed’\])

Result:  
30  
10
