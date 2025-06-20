---
categories:
- genel
date: 2015-12-19
layout: post
tags:
- english
- istatistik
- java
- longread
- r
- technology
title: R içerisinden Java fonksiyonlarını çağırmak
---

Yazdığınız Java kodlarını jar’a dönüştürün. R’ı çalıştırdığınız proje dizini içine koyun ve aşağıdaki gibi çağırın:

```
library(rJava)
.jinit("BenimJar.jar”) # this starts the JVM
jobject <- .jnew("jarIcindekiClass")  ## paket adı dahil
```

```
.jcall(jobject ,"I",method="ÇağrılacakMetot") 
```
