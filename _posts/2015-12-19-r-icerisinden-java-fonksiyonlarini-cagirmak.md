---
layout: post
title: "R içerisinden Java fonksiyonlarını çağırmak"
date: 2015-12-19
categories: 
  - "genel"
tags: 
  - "istatistik"
  - "java"
  - "r"
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
