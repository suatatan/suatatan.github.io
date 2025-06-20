---
title: "SQL’de INNER, LEFT ve OUTER JOIN farkı"
date: 2016-05-16
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "asp-mvc"
  - "humanfriendlyaspmvc"
---

Bu farkı anlamak için şu senaryo üzerinden gidelim (senaryoyu ilk yazan kişi BradC’dir, stackoverflowdan bakmak için [tıklayın](http://stackoverflow.com/a/448080/607230)) .

Bu senaryoyu görselleştirerek daha kolay anlaşılabilir hale getirdim.

**Senaryo şöyle:**

100 öğrenci var.

50 dolap var.

70′inin dolabı var.

Dolaplardan bazılarını bir kaç öğrenci birden kullanıyor. (40 dolap müşterek)

Bazı dolapları ise kimse kullanmıyor (10 dolap komple boş)

**Böyle bir durumda:**

Sadece dolabı olan öğrencileri

Tüm öğrencileri (dolabı olanlar dahil)

Tüm dolapları (boşlar dahil)

nasıl listeleriz?

Cevaptaki ifadeler yerine şu çizimi yaptım:

![image](/images/tumblr_inline_o79hgaQdQ81r4exmc_540.jpg)

Gördüğünüz gibi;

INNER JOIN: Kesişim kümesini verir sadece dolap kullanan öğrencileri döndürür 70 öğrenci gelir.

LEFTJOIN: Hem dolap kullanmayan öğrencileri hem de kullananları döndürür 100 öğrenci döner.

RIGHT JOIN ise boş dolaplar dahil tüm dolapları döndürür.

Daha kompleks JOIN komutları da var. Şurada:

![image](/images/tumblr_inline_o79hikKKzk1r4exmc_540.png)
