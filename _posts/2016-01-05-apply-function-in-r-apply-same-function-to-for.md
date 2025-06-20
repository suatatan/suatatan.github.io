---
categories:
- english
- genel
date: 2016-01-05
layout: post
tags:
- english
- longread
- r
- statistic
- technology
title: 'Apply Function in R: Apply same function to for each cell of a matrix'
---

R provides powerful functions. Apply function is one of them. It keeps you from writing boring loops(while and for). For insance:

`# create a matrix of 10 rows x 2 columns``m <-` `matrix``(``c``(1:10, 11:20), nrow = 10, ncol = 2)`

`# divide all values by apply`

`apply``(m, 1:2,` `function``(x) x/2)`

Thanks for [nsaunders](https://nsaunders.wordpress.com/2010/08/20/a-brief-introduction-to-apply-in-r/)
