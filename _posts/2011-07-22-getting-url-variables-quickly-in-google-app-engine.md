---
categories:
- bilgisayar
- english
- genel
date: 2011-07-22
layout: post
tags:
- english
- google-app-engine
- python
- quickread
- technology
- web-programlama
title: Getting url variables quickly in Google App Engine
---

Normally, getting url variables in Google App Engine Python is a line of code:  
  
**param=self.request.get(‘url\_param’);**  
  
print param;  
  
But i just discovered that it can also be, with a quick and easy method:  
  
**def get(self, url\_param)**  
  
print url\_param;  
  
We can define url param that page work with it, in the get() function params. After that we can use it directly…
