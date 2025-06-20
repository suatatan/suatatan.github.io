---
categories:
- english
- genel
date: 2015-05-20
layout: post
tags:
- computer
- cran-r
- longread
- rstudio
- turkish
title: Get complementary set of an set with CRAN-R
---

library(sets)

a=set(“x”,“y”,“z”)  
b=set(“y”,“q”)

axa=set\_cartesian(a,a)  
p1=set(“x”,“y”)

p\_complement=axa-p1
