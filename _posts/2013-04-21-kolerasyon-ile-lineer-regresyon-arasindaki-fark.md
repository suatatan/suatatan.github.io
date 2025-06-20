---
layout: post
title: "Kolerasyon ile Lineer Regresyon arasındaki fark nedir"
date: 2013-04-21
categories: 
  - "genel"
tags: 
  - "isletme"
---

[![](/images/sevenday-correlation.png)](http://www.comfsm.fm/~dleeling/health/sevenday-correlation.png)

Korelasyon ve lineer regresyon aynı şey değildir. 

**Amaç ne?**  
  
Korelasyon iki değişken arasındaki ilişkinin değerini ölçer. Veri noktaları arasında bir çizgi çizemez. Korelasyonun değerini kolrelasyon katsayısı ile ölçebilirsiniz. r=0 ise ilişki yok. Pozitifse bir değişken arttıkça diğeri artar, negatifse biri arttıkça diğeri azalır (ya da tersi=  
Lineer regresyon ise Y ile X arasındaki en iyi çizgiyi öngörmeye çalışır (data noktaları arasında):  
  
**Hangi tür veri:**  
Korelasyon hemen hemen ölçebildiniz her türlü 2 değişken için kullanılabilir. Birini maniple edebileceğiniz 2 değişken için nadiren kullanılır. Lineer regresyon ise genellikle X'i maniple edebildiğiniz durumlarda kullanılır. (Zaman, konsantrasyon vb.)  
**Hangi değerin X hangi değerin Y olacağı fark eder mi ?**  
Korelasyon'da sebeb ve etkiyi düşünmezsiniz. Hangi değişkenin X hangi değişkenin Y olduğu önemsizdir? Aynı korelasyonu birbiri yerine kullanabilirsiniz.  
Hangi değişkenin X hangisinin Y olacağı ise regresyonda önemlidir. Çünkü X ile Y'nin yerlerini değiştirdiğinizde farklı grafikler elde edersiniz. Y'yi X'e bakarak tahmin eden en iyi doğru ile X'i Y'ye bakarak tahmin eden en iyi doğru aynı şey değildir. (Ancak bu iki değişken de aynı R2 değerine sahiptir)  
**Sonuçlar arasındaki ilişki**  
Korelasyonda bulacağınız Pearson korelasyon katsayısı (r ) -1 ile +1 arasında değişir.  
Lineer regresyonda ise bulacağınız R2 değeri ise korelasyonun karesine tekabül etmektedir.

(Kaynak: [http://www.graphpad.com/support/faqid/1141/](http://www.graphpad.com/support/faqid/1141/))
