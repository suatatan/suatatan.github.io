---
categories:
- bilgisayar
date: 2017-10-07
layout: post
tags:
- data-science
- english
- longread
- r
- technology
title: Bulk replacing Turkish characters in R
---

Turkish character sometimes became the menace for the data scientist. To avoid the risks you may want to change it with safe characters. To do that you can use this code:

#turkce karakter donusumu to.plain <- function(s) {

\# 1 character substitutions old1 <- "çğşıüöÇĞŞİÖÜ" new1 <- "cgsiuocgsiou" s1 <- chartr(old1, new1, s)

\# 2 character substitutions old2 <- c("œ", "ß", "æ", "ø") new2 <- c("oe", "ss", "ae", "oe") s2 <- s1 for(i in seq\_along(old2)) s2 <- gsub(old2\[i\], new2\[i\], s2, fixed = TRUE)

s2 } df$source=as.vector(sapply(df$source,to.plain))
