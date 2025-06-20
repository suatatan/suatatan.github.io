---
layout: post
title: "T-Testi nedir?"
date: 2017-12-09
---

![maxresdefault.jpg](/images/maxresdefault.jpg)

T-Testi nedir diye Google'da arattığınızda Türkçe sitelerdeki açıklamaların maalesef sanki kimse anlamasın diye yazıldığını görürsünüz. Ya bunu yazanlar özellikle böyle yapıyorlar ya da kendileri de tam anlamamış olabilir 3. ihtimal: Benim anlama kapasitem düşük.

Tutup başka dillerdeki sitelerden anladığımı bir örnekle:

T testini ne için yaparız? Diyelim ki Agah Madensuyu A.Ş. patronu Agah Bey, 500ml'lik maden suyu şişelerinin tam dolmadığını iddia etti. İki durum vardır:

Durum 1: Maden suları 500 ml'den daha az dolmamaktadır. Durum 2: Maden suları 500 ml'den az dolmaktadır.

Şimdi, bu durumu doğrulamak için tüm şişelere bakamayacağımıza göre rastgele seçilen 10 şişeye bakalım. Şişelerin kimi 500 ml'den az, kimi ise 500ml'den çok doldurulmuş. Ortalama alalım dedik o da 495 çıktı!

Patron haklı mı? Diyelim haklı. Peki aynı denemeyi bir daha yaptığımızda ortalamanın 500 ml'den fazla çıkma şansı var mı?

İşte T testi bu ihtimlai ölçer.

T testi sonucunda elde edeceğimiz p değeri Durum 1'in, yapacağımız rastgele kontrollerde gerçekleşme olasılığını ortaya koyar. Bu değer diyelim ki % 0.7 çıkmışsa Durum 1'in gerçekleşme olasılığı küçüktür. Testi yaparken belirlediğimiz güven aralığı 0.1 olsun (Bu kanaatimizin %99 doğrulukta olması demektir). Bu durumda 0.07 değeri 0.1'den küçük olduğundan patron **büyük ihtimalle** haksızdır.

Buradaki durumda tek bir durum sorgulanmaktaydı. Eğer 2 grup üzerinden inceleme yapıyorsak da T testi kullanırız. Örneğin bir [markette satılan 2 tip gevrek](https://www.youtube.com/watch?v=SFYjnqDUPSQ&list=PLj7KBSJqWkAnqb7NHjMLAHE-I84z22_QH&index=5) paketindeki şeker miktarı aynıdır hipotezini de t testi ile test edebiliriz.

R ile t testi için şu [örneğe](http://www.instantr.com/2012/12/29/performing-a-one-sample-t-test-in-r/) bakabilirsiniz. R'daki t testi [fonksiyonu](https://www.statmethods.net/stats/ttest.html) ise burada.

## T Testi Sonuçlarının Yorumlanması

R ile yapacağımız T testi sonuçlarını aşağıdaki gibi yorumlarız (İngilizce):

\[caption id="attachment\_2515" align="alignnone" width="794"\]![T testi yorumlanması](/images/2017-12-09-15_50_08-understanding-t-test-in-r-_-scribbling.png) Kaynak: https://suinotes.wordpress.com/2009/11/30/understanding-t-test-in-r/\[/caption\]
