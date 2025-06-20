---
categories:
- genel
date: 2014-11-24
layout: post
tags:
- turkish
- isletme
- longread
- sayisalyontemler
- technology
title: Hurwicz Kriteri Nedir?
---

[Şu yazımızda](http://blog.suatatan.com/post/103205724775/belirsizlik-alt-nda-nas-l-karar-verilir) Agah Gayrımenlkul Limited Şirketi'nin 3 yatırım projesinden söz etmiştik:

```
* Ofis İnşaatı
* Apartman İnşaatı
* Depolama Merkezi İnşaatı
```

Bu yazıda iki senaryomuz vardı:

Alternatif | İyi Ekonomide Getiri | Kötü Ekonomide Getiri

Ofis: | 100 | -20  
Apartman: | 70 | 10   
Depo: | 50 | 15

**Peki biz hangi senaryo yüzde kaç gerçekleşir bilmekte miyiz?: Hayır** O yazımızda bu sorunun cevabını hiç bilmediğimiz için **iyimser** ve **kötümserlik** bakışı ile analizimizi yaptık.

Şimdi ise şöyle düşünelim:

%60 ihtimalle 1. senaryomuzun yani iyi ekonomik koşulların olacağını varsayalım. O zaman ikinci senaryomuz 1-0.60=0.40 ihtimalle kötü senaryodur.

Bu %60 değerine **Hurwicz kriteri** denilir. Şimdi bu kriterle hesaplama yapalım:

```
* 100*0.6+ (-20)*0.4=52
*  70*0.6+    50*0.4=62
*  50*0.6+    15*0.4=36
```

Yukarıdaki hesaplara göre ihtimallerle getiriler çarpımı toplamından en büyük olanı, yani olasılıksal olarak 62 TL getireceği beklenen Aparman projesi tercih edilir. Hurwicz kriterine yapılan eleştiriyi tahmin edersiniz: Hangi senaryonun yüzde kaç gerçekleşme ihtimaline sahip olduğu subjektiftir.
