---
categories:
- yazilim
date: 2017-01-04
layout: post
tags:
- turkish
- longread
- technology
title: SQLSERVER'da tüm veritabanı içinde arama yapmak
---

Çok fazla sayıda tablonuz olduğunda ve hangi tablonunun içinde hangi veri olduğunu bilmediğiniz durumlarda spesifik bir değerin hangi tabloda olduğunu bulmak samanlıkta iğne aramaya dönüşebilir. Bunu aşmak için [şu hazır yordamı](https://gist.github.com/suatatan/37a6cd2a808234c408c41654ccad344a) kullanabilirsiniz. Yordamların (stored procedure) ne olduğunu bilmiyorsanız kabaca şöyle diyebiliriz: Yordamlar SQLSERVER'da çalışan bir nevi makrolardır. Fonksiyona benzer şekilde yazılır ve çağrılırlar. [Şu yazıd](http://bidb.itu.edu.tr/seyirdefteri/blog/2013/09/06/sakl%C4%B1-yordamlar-\(stored-procedures\))a detaylı şekilde anlatılıyor.

Daha sonra herhangi bir değeri aşağıdaki gibi arayıp sonuç alabilirsiniz:

![](/images/searchall.png)
