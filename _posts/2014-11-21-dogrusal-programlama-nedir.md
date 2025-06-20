---
title: "Doğrusal Programlama Nedir?"
date: 2014-11-21
categories: 
  - "genel"
tags: 
  - "sayisalyontemler"
  - "yoneylem"
  - "isletme"
---

![image](/images/tumblr_inline_nfe5weU4yL1r4exmc.jpg)

İsmine bakıp hemen işime yaramaz demeyin. Eğer haberiniz yoksa öğrendikten sonra çok memnun olacaksınız. Klişeleşmiş teknik ifadelere girmeden hemen öğrenelim. Önce gerçek hayattaki sorunumuzdan başlayalım:

Agah Züccadiye adlı firma _bardak_ ve _kase_ üretiyor. Tabii hepsinin karı ve maliyeti farklı:

**Üreteceğim ürün, İşçilik(saat), Kil(kg),_Karı_**

Kase, 1,4,_40_

Bardak,2,3,_50_

Tabii Agah Züccadiyenin işgücünün ve kil miktarının sınırı var. Diyor ki, baba haftalık en fazla 120 kilo kil, 40 saat te işgücüm var. İşgücü zaten bizim Lezgin usta, 1 saat fazla çalışsa isyan. Kil de piyasada yok.

Agah Züccadiyenin sahibi soruyor hangisinden ne kadar üreteceğim?

Bu sorun **doğrusal programlama** adlı bir metotla çözülebilecek _basit_ bir sorundur. Tek yapmamız gereken problemi **modellemek** ve çözmektir.

Önce modelleyelim:

- Max K= 40k+50b (Yani Karımız k kadar kase ve b kadar bardak çarpı fiyatlarından müteşekkildir)
- subject to: (Bu ifade _şu kısıtlar altında demektir_)
- k+2b<=40 (kase için 1 saat, kil için 2 saat gider toplamı 40'tan küçük veya ona eşit olsun)
- 4k+3b<=120 (Kil üretiminde ise kase için 4 kg, bardak için 3 kilo kil gider, en fazla kullanabileceğim kil miktarı 120'ye eşit veya ondan küçük olsun)

Bu problemin modeliydi. Bir de modele mantıksal iki öğe ekleyeceğiz Malum eksi sayıda kase veya bardak üretilemez. Yani sayı en az sıfır olmalı (yani herhangi birinden ya hiç üretilmemeli) ya da sıfırdan büyük olmalıdır. O zaman: _k>=0_ b>=0

Şimdi modelimizi şerhsiz yazalım:

```
* Maximize K= 40k+50b subject to k+2b<=40, 4k+3b<=120,k>=0,b>=0
```

Şimdi bu modelei nasıl çözeceğiz. Eskiden olsa Simplex gibi zor metotlarla elle çözüm yapar, çözerken de kesin işlem hatası yapar Agah Züccadiye firmasını zarara sokardık.

Şimdi ise daha hızlı yollar var.

Aşağıdaki siteye girin:

[http://j.mp/suat-agahzuccaciye](http://j.mp/suat-agahzuccaciye)

Bu sitede “Type your linear programming problem below” idadesinin altına denklemimizi yazın:

Maximize K= 40k+50b subject to k+2b<=40, 4k+3b<=120,k>=0,b>=0

Son olarak “Solve” butonuna basın.

Sonuç olarak şu çıkacaktır:

**Optimal Solution: p = 1360; x = 24, y = 8**

Bu şu demektir:

Agah Züccadiye 24 kase ve 8 bardan üretmek suretiyle (harflerin adı değişmiş kusura bakmayın) 1360 TL kar elde eder (haftada). Bundan iyisi yoktur.

Alın size anlatırken gaipten bilgi veriyorlarmış diye sunulan **doğrusal programlama**.

[http://www.wolframalpha.com/widget/widget.jsp?id=1e692c6f72587b2cbd3e7be018fd8960](http://www.wolframalpha.com/widget/widget.jsp?id=1e692c6f72587b2cbd3e7be018fd8960)
