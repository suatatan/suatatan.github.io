---
date: 2017-03-21
layout: post
tags:
- english
- longread
- technology
title: Use Vectorization to Converting Excel Logic with less Code to Your hand-written
  software
---

I think it is kind of logical error of when you try to calculate values in waterfall style like below:

a=1 b=2 c=3

ya=a\*3 yb=b\*3 yc=c\*3

Vectorization gives you the possibility for defining the a,b,c as let's say X and ya,yb,yc as Y then calculate the latter just with writing logic of X\*3.

In other languages like R,Python, and Octave it is very easy. However, it is a bit tricky in C#. You should find a numerical package. The bullshit is this kind of external package is not allowed under SQLServer CLR (Common Native Runtime). That means sometimes you should write your own 'numerical operation library' I have written easy one for a few operations. It works like in the picture. It is more reasonable than waterfall style.

![excel_to_csharp](/images/excel_to_csharp.png)

The functions for array operation is [here](https://gist.github.com/suatatan/86cc779dfbba7403cbb5478de4285fdc).
