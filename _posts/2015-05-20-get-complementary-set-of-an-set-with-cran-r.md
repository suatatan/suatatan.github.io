---
title: "Get complementary set of an set with CRAN-R"
date: 2015-05-20
categories: 
  - "english"
  - "genel"
tags: 
  - "computer"
  - "cran-r"
  - "rstudio"
---

library(sets)

a=set(“x”,“y”,“z”)  
b=set(“y”,“q”)

axa=set\_cartesian(a,a)  
p1=set(“x”,“y”)

p\_complement=axa-p1
