---
categories:
- genel
date: 2014-06-03
layout: post
tags:
- english
- quickread
- technology
title: Genişletilmiş Dickey Fuller Testi
---

Augmented Dickey Fuller Testi ile ilgili olarak aldım bazı notlar:  

1. [Augmented Dickey Fuller Test (ADF)](http://tr.wikipedia.org/wiki/Dickey_Fuller_testi) “[Durağanlık](http://www.acikders.org.tr/pluginfile.php/2624/mod_resource/content/2/ekonometri2-tuba-24-duraganlik-ve-duragan-disilik.pdf?forcedownload=1)” var mı yok mu kontrol etmek için yapılır.
2. İki farklı [zaman serisi](http://tr.wikipedia.org/wiki/Zaman_serisi) durağan değillerse herhangi bir tahmin modeline direkt konamaz.
3. Zaman serisi bir tahmin modeline konacak ise durağanlaştırılmalıdır.
4. ADF testi [RStudio](http://www.rstudio.com/) altında [**urca**](http://cran.r-project.org/web/packages/urca/urca.pdf) kütühanesi ile yapılır. ur.df(parametreler) fonksiyonu ile komut verilir.
5. \[DOĞRULAMA GEREKTİRİYOR\]  Sonuç kısmında probability değeri 0.05 değerinden küçükse veri **durağandır.**
6. \[DOĞRULAMA GEREKTİRİYOR\]  Ya da ADF test istatistik değerlerinin mutlak değerleri %1,%5,%10 ihtimalle gösterilen istatistik değerlerinden büyük ise veri **durağandır**.
