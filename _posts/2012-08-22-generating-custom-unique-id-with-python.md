---
categories:
- bilgisayar
- english
- genel
date: 2012-08-22
layout: post
tags:
- english
- google-app-engine
- python
- quickread
- technology
title: 'Generating custom unique id with python:'
---

You can generate custom unique key for databases in python  

  

from datetime import \*  
from random import \*    
def generate\_uniqid(self,prefix=“S”,suffix=“F”): now=datetime.datetime.now() SEC= str(now.second) m = str(now.minute) H = str(now.hour) D = str(now.day) M = str(now.month) Y = str(now.year) rn=str(randint(0,10000)) return prefix+Y+M+D+H+m+SEC+“-”+rn+suffix
