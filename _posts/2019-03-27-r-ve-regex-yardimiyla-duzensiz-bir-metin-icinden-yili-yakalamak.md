---
categories:
- bilgisayar
date: 2019-03-27
layout: post
tags:
- turkish
- longread
- r
- technology
- veribilim
- yazilim
title: R ve Regex Yardımıyla düzensiz bir metin içinden yılı yakalamak
---

Bir projemde aşağıdaki gibi iki tür metin vardı:

```
> a="Volume 29, Issue 3, July 2007, Pages 357-374"
> b="Published: 1999, Start page: 117"
```

a ve b değerleri içinden 2007 ve 1999 gibi sayıları çıkarmak istiyordum. Regex'te buna uygun bir patternin var olduğunu düşündüm. Şuradan test ettim: [https://www.regextester.com/93651](https://www.regextester.com/93651)

Daha sonra R'da bulunan stringr paketindeki str\_extract fonksiyonunu kullandım:

```
> str_extract(a,"(19|20)\\d{2}")
[1] "2007"
> str_extract(b,"(19|20)\\d{2}")
[1] "1999"
```

Özetle (19|20)\\d{2} şeklinde yazdığım regex kodu şöyle söyler: Git o metnin içinden 19 veya 20 ile başlayan ve devamında iki sayısal karakter(d) olan veriyi yani yılı getir.

Getirdi de! Büyük veri zorlu veridir. Ama aşmak için her zaman yollar vardır.
