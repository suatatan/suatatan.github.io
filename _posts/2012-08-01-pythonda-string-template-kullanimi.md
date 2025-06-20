---
categories:
- genel
date: 2012-08-01
layout: post
tags:
- turkish
- python
- quickread
- technology
title: Python'da String Template kullanımı
---

Python ile yazılım yaparken bugün öğrendiğim hızlı ve pratik bir şablonlama yöntemini paylaşayım:  
Bu yöntem ile string içine değişken atayıp sonradan çağırabiliyoruz.  
  
from string import Template  
  
schema=**Template**(“merhaba $ad”)  
schema.substitute(ad\=“suat”)  
print schema  
  
sonuç:  
merhaba suat
