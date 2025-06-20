---
categories:
- genel
date: 2014-04-16
layout: post
tags:
- turkish
- python
- quickread
- technology
title: Python ile nümerik analiz, numpy kütüphanesi denemeleri
---

[Numpy](http://www.numpy.org/) Python ile nümerik analize imkan veren bir kütüphanedir.  
  
Matris işlemleri için konsoldan denemeler:  
  
\>>from numpy import \*  
\>>a=matrix(\[\[85, 25, 20, 40\],  
            \[35, 55, 35, 15\],  
            \[40, 60, 30, 55\]\])  
\>>a\[:,0\] #0.sutun  
  
matrix(\[\[85\],  
        \[35\],  
        \[40\]\])  
  
\>a\[0,:\] #0.satir  
matrix(\[\[85, 25, 20, 40\]\])  
  
#hatırlatıcı: **sa**ğda iki nokta: **sa**tır  
  
\>a\[0,:\].sum() #0.satir toplami  
170  
\>a.shape #matris boyutlari  
(3,4)
