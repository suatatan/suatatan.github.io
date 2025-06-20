---
categories:
- genel
date: 2016-11-29
layout: post
tags:
- turkish
- isletme
- longread
- python
- technology
title: Python ile Net Bugünkü Değer Hesaplama
---

Agah A.Ş. tesislerinde kullanmayı düşündüğü bir makine için dönem başında 11.000 TL yatırım yapmayı düşünmektedir. İskonto oranı %10 olarak kabul edilmiştir. Makinenin yıllar itibariyle sağlayacağı nakit girişleri aşağıda gösterilmektedir.

```

Y1=2500
Y2=2600
Y3=4000
Y4=6000
```

Bu durumda projenin Net Bugün değeri ne olur? Python'da şöyle hesaplarız

```

import math

YM=11000

IO=0.1

NBD=Y1/(1+IO)+Y2/(math.pow((1+IO),2))+Y3/(math.pow((1+IO),3))+Y4/(math.pow((1+IO),4))-YM

print(NBD)

```

Sonuç olarak 524 değerini alırız ki bu projemizin net bugünkü değeridir.
