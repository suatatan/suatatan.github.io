---
layout: post
title: "Laplace Kriteri"
date: 2014-11-24
categories: 
  - "genel"
tags: 
  - "sayisalyontemler"
  - "isletme"
---

![image](/images/tumblr_inline_nfj725RYwA1r4exmc.jpg)

Bu kritere eş olabilirlik kriteri de denilir. [Hurwicz kriterini anlattığımız şu yazımızda](http://blog.suatatan.com/post/103444163675/hurwicz-kriteri-nedir) ve [ondan önce belirslizk altında karar vermeyi anlattığımız yazımızda](http://blog.suatatan.com/post/103205724775/belirsizlik-alt-nda-nas-l-karar-verilir)

Agah Gayrımenlkul Limited Şirketi'nin 3 yatırım projesinden söz etmiştik:

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

[Hurwicz kriterinin](http://blog.suatatan.com/post/103444163675/hurwicz-kriteri-nedir) yukarıda söz ettiğimiz iki senaryonun gerçekleşme ihtimalleri olduğunu da ifade ettik. Peki bu ihtimallerin gerçekleşmesi bakımından **yeterli neden yoksa (yetersiz neden ilkesi)** neden hala %60 ihtimalle birinci senaryo gerçekleşir diyelim ki? Elimizde bunu belgelendirecek bir veriseti veya kuvvetli bir analiz yoksa her bir ihtimal aynı oranda gerçekleşebilir Tıpkı yazı tura attığımızda her biri için ½ ihtimal=%50 ihtimal olduğu gibi. Buna göre Agah Gayrımenlkul Limited Şirketi örneğimizde n=2 senaryomuz vardır. Buna göre hesabımızı %50,%50'ye göre yaparız.

```
* 100*0.5+ (-20)*0.5=46
*  70*0.5+    50*0.5=60
*  50*0.5+    15*0.5=32.5
```

Buna göre seçimimiz ise yine Aparman projesi olacaktır (60 TL olasılıksal getiriye sahip). Bu sefer Hurwicz kriterine göre yaptığımız hesap sonucu ile aynı çıktı. Ancak farklı da çıkabilirdi.
