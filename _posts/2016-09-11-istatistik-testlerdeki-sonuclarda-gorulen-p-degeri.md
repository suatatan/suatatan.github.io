---
layout: post
title: "İstatistik testlerdeki sonuçlarda görülen p değeri nasıl yorumlanır?"
date: 2016-09-11
categories: 
  - "genel"
tags: 
  - "ekonometri"
  - "istatistik"
  - "zaman-serileri"
---

Bunu anlatmadan önce “sıfır hipotezi (null hypothesis”) kavramını anlatmalıyım:

> Örneğin, “iki ölçülen olgu arasında bir bağlantı yoktur” veya “denenen tedavinin bir etkisi yoktur” _sıfır hipotez_ olabilirler (Wikipedia)

Şimdi istatistik programlarında yaptığınız bir testin sonucu yerine çıkan p değeri ise sıfır hipotezine göre yorumlanır. 

> p değeri 0 ile 1 arasındadır. Bu  değer 0.05 değerinden küçük ise sıfır hipotezine inanmayın der. ([Kaynak](http://www.dummies.com/education/math/.../what-a-p-value-tells-you-about-statistical-data/))

Yani p değeri:

- 0.05'ten büyükse sıfır hipotezi yalan (yani büyük ihtimalle)
- 0.05'ten küçükse sıfır hipotezi doğru (yani büyük ihtimalle)

## Bir örnek ADF Test:

Şimdi bir örnek verelim:

R'da ADF diye bir test var. Bir zaman serisinin durağan olup olmadığını test ediyor (Açılım: Augmented Dickey-Fuller test). Dokümantasyonu okuyunca şöyle diyor:

> Computes the Augmented Dickey-Fuller test for the null that x has a unit root.

Yani bu testin sıfır hipotezi verilen serinin (x) **birim kök içerdiğidir.**

> Birim kök içermek demek verinin **durağan olmadığı** anlamına gelir [Kaynak](https://tr.wikipedia.org/wiki/Birim_k%C3%B6k)

Bir deney yapalım:

Şimdi R ile normal dağılıma sahip 100 sayı oluşturalım:

`x = rnorm(1000)`

Bu oluşan sayılar pozitif ve negatif tamamen tesadüfi olan 0 ile 1 arasında 1000 adet sayıdır. Bu sayıların durağan olup olmadığına bakmak için ADF testi yapıyoruz.

`adf.test(x)`

Sonuç şöyle çıkıyor:

`data: x Dickey-Fuller = -8.6139, Lag order = 9, p-value = 0.01 alternative hypothesis: stationary`

Warning message: In adf.test(x) : p-value smaller than printed p-value

Biz _veri durağan mı kardaş_ diye soruyoruz _p-value- 0.01 olduğundan yani 0.05'ten **küçük** olduğundan sıfır hipotezimiz (yani bu veride birim kök vardır hipotezi) doğru değildir. Yani bu veride **birim kök vardır** yalan. Birim kök yoktur. Dolayısıyla veri **durağan değildir.**_

Birim kök, durağanlık p değeri derken kafa karışıyor haliyle. Buna çözüm olarak şöyle özetleyelim adf testi için:

adf.test yapınca p-value

- 0.05'ten küçük veya ona eşit ise veri **durağan değildir**
- 0.05'ten büyükse veri **durağandır**.

## Durağanlık neydi yaa..

Tanımı [Şurada](https://en.wikipedia.org/wiki/Stationary_process)

> Veri durağan ise sorun yoktur. Ancak modellere konacak ise durağan hale getirilmesi gerekir. Durağan olmayan bir veri farkı alınarak durağan hale getirilebilir. (Kaynak: Gujaraati-Basic Econometrics s:747)

Bu istatistikçilerle, ekonometriciler millete eziyet olsun diye olayları hep olduğundan daha zor şekilde anlatıyorlar.
