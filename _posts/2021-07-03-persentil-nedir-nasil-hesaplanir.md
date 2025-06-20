---
categories:
- bilgisayar
date: 2021-07-03
layout: post
tags:
- turkish
- istatistik
- longread
- technology
title: Persentil Nedir, Nasıl Hesaplanır?
---

Niye yalan söyleyeyim. Her seferinde bakıp unutuyor zor hatırlıyorum, o yüzden buraya yazıyorum. Persentil neydi? Nasıl hesaplanırdı? Python'da hesaplayabiliyorum normalde ancak ne anlama geldiğini hatırla ki geelsin. İşte şimdi hepsini anlatıyorum.

Aşağıdaki gibi bir boy sıralaması var.

190,189,185,183,180,179,175,173,170, 169,163,160,159,158,157,155,152,151,150,143

20 kişilik bir grup düşünün. Bunun içinde en uzun 4. kişi sizsiniz diyelim. Kalan 16 kişi sizden daha kısa yani 16/20 = 0.80, bu gruptaki insanların % 80'i sizden kısa işte bu durumda 80. persentildesiniz.

x.nci persentil o grup içinde %x kişiden daha iyisiniz demektir.

Bu %1'lik dilime giren zeki öğrencileri tarif ederken söylenenin tersidir. %1'lik dilime giren 99. persentilde olur.

Bu arada şu dikkatinizi çekmiştir. Burada persentilde siz 4. iken 1. ile aranızdaki farkın ne kadar yüksek olduğunun önemi yok. Yani milim farkı ile de olabilir, santimetrelerce de. Persentildeki sırayı algılamakta fayda var. Durum böyle olunca 50. persentilin medyan'a yani sayıları sıraladığınız takdirde tam ortada olan sayıya eşit olmasına dikkat edin. Bazen ortada sayı bulamazsınız yani sağında ve soluna eşi miktarda sayı olmaz (20 kişi için olmaz 21 kişi için olur mesela neden mi? 10+1+10 = 21 ortada medyan) bu durumda ortadaki iki sayının ortalaması medyana denk gelir.

# Persentil Python'da nasıl hesaplanır?

```
import pandas as pd
boylar = [190,189,185,183,180,179,175,173,170,169,
163,160,159,158,157,155,152,151,150,143]
df = pd.DataFrame(boylar)
df.describe()
```

Bu fonksiyon bize persentil de dahil tanımlayıcı değerleri verir

```
count 	20.000000
mean 	167.050000
std 	14.177354
min 	143.000000
25% 	156.500000
50% 	166.000000
75% 	179.250000
max 	190.000000
```

Şimdi bu da ne? Açıklayalım mesela %75'lik persentil için 179 denmiş. Bu boya sahip ablamız(abimiz) 6. sırada. Tersten düşünelim. Bu kişi 6. sırada ise kaç kişiden uzun 20-6 = 14, 14/20 ne yapar 60. 60.persentildeymiş. Ne oldu? Hani % 75. Bunu anlatmak için sıralamalarda işlerin karıştığı bir durumdan bahsedelim. Sonra dönelim.

Medyan hesabı: 9+2+9 şeklinde 20 sayı var. Ortaya denk gelen 169 ve 163 değeri var. Bunların ortalaması 166 medyan eder. Zaten Python da öyle hesaplamış.

Şimdi de 166'dan büyük olan sayıları alıp bir daha medyan hesaplayalım:

```
x = [190,189,185,183,180,179,175,173,170,169]
dfx = pd.DataFrame(x)
dfx.median()
```

Sonuç 179.5. Bizim boyların 75. persentili değil mi? Evet. Burada x serisinde son sayı 160 da olsa sonuç aynıydı. Neticede medyan aldık.

O zaman aşağıya bir daha bakalım:

```
count 	20.000000
mean 	167.050000
std 	14.177354
min 	143.000000
25% 	156.500000
50% 	166.000000
75% 	179.250000
max 	190.000000
```

Bu şu demek oluyor. 20 sayı var. Ortalaması 167.05 bu sayıları sıralarsk ortadaki iki sayının ortalaması (21 olsa rtadaki bir sayı) 166'dır. **Yani boyu 166 olan biri insanların yarısından uzundur**. Sonra en uzun %50'lik dilimdeki insanları alıp medyan alınca da bu kez %75'lik persentildekiler (yani en uzun %25'lik dilim)in boyunu 179'dan uzun olduğunu anlarız.
