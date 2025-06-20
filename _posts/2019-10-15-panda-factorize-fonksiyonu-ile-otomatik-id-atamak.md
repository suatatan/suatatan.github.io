---
layout: post
title: "Panda Factorize Fonksiyonu ile Otomatik ID atamak"
date: 2019-10-15
---

Bazen elinize uzun bir liste gelir ve bu listede her bir kategorik değere sayısal bir değer atamanız icap eder. Mesela data frame (df) nesnemiz şöyle olsun:

```
  interest_level
0           high
1            low
2         medium
3           high
4            low
5           high
6           high
7            low
8            low
9         medium
```

Bu taloda high 1, medium 2, low 3 olsun şeklinde ID ataması her yazılımcının günlük olarak karşılaşabildiği bir problemdir. Yukarıdaki gibi bir tablo söz konusu olduğunda elle de atama yapılabilir. Ama dün elime 334 satırlık ve bol kolonlu bir tablo geldi ve bunlara ID atamam gerekiyordu. Python ve Panda kütüphanesinin "[factorize](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.factorize.html)" fonksiyonunu keşfettim. Bu fonksiyon otomatik atama yapıyor:

```
df['interest_level_id'] = pd.factorize(df['interest_level'])[0]
```

Bu kod interest\_level\_id diye bir kolon açarak her interest\_level'deki değerlere göre atama yapıyor ve sonuç şöyle oluyor:

![](/images/image.png)

Güzel değil mi?
