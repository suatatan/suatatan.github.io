---
categories:
- bilgisayar
date: 2020-12-21
layout: post
tags:
- english
- longread
- metin-madenciligi
- technology
title: YAKE kütüphanesi ile Türkçe Metinlerden Anahtar Terimleri Türetin
---

![Big Data (Büyük Veri) Nedir?. Günümüzün popüler kavramlarından biri… | by Big  Data Turkey | Düşünen Beyinler | Medium](/images/0*4hO1nX2M9wazKcP_)

Python ile herhangi bir metin içerisinden anahtar terimler çıkarma ve bunlara ilgililğine görse sayısal değerler vermek isterseniz Rake gibi kütüphaneler vardır ancak bunlar Türkçe dil desteği içeremez.

Türkçede bu işi yapmak için Yake adlı bir kütüphane vardır. Akademik makalesi de [şurada](https://www.sciencedirect.com/science/article/abs/pii/S0020025519308588?casa_token=NZfi-GmbK1gAAAAA:WC5tKprHpm5fy2askOGZsc_sFyqklbjNqUGrb7ipJZLTwgzqlPem_tqDDjy_rL_u44w2X_VVkkQ):

Bu yazıda elimde bulunan bir haber veriseti içinde her bir haberin anahtar terimleri içindeki en yüksek değerleri başka bir kolona atıp daha sonra arama yapınca **sadece** en yüksek ilgili ifade işe eşleşme sağladım. Bu sayede içinde aradığım kelime geçen yazı değil, aradığım terimle ilgili olma olasılığı en yüksek olan haber geliyor. Bir nevi lokal google yani.

Hadi bu lezzetli tarifimi vereyim:

Önce Yake kütüphanesini kuralım:

```
# !pip install yake
```

Şimdi de Türkçeye göre ayarlama yapalım:

```
from yake import KeywordExtractorimport pandas as pdkw_extractor = KeywordExtractor(lan="tr", n=1, top=5)
```

Verisetimi okuyorum:

```
df =pd.read_csv("deneme.csv")text = df.at[22,'headline']print(text)
```

Örnek bir haber:

```
Kuyu çöktü, 2 kişi toprak altında kaldı
```

Deneme 1,2,3:

```
keywords = kw_extractor.extract_keywords(text)keywordsmax(keywords)
```

Bu metin "toprak" ile ilgili (en çok). Elbette kusursuz değil ama istersek tüm anahtar kelimeleri de dizeriz.

```
(0.6286477325744138, 'toprak')
```

Şimdi dev verisetimde teker teker deniyorum:

```
secim = df#secim.headline
```

Her bir çıktı anahtar terimin en yüksek değere sahip olanı olasılık rank değeri ile birlikte kolonlara aktardım:

```
secim['tk_ozet'] = ""secim['tk_ihtimal'] = Nonefor index,row in secim.iterrows():    try:        haber = row['headline']        keywords = kw_extractor.extract_keywords(haber)        olasilik = round(float(max(keywords)[0]),2)        tekkelime = max(keywords)[1]        secim.at[index,'tk_ozet'] = tekkelime        secim.at[index,'tk_ihtimal'] = olasilik        #print(f"{haber}--> {tekkelime}: {olasilik}")    except  Exception as ex:        #print(str(ex))        pass
```

Şimdi arama denemesi zamanı:

```
terim = "çocuk"secim[secim.tk_ozet.str.contains(terim)][['headline','tk_ihtimal']].sort_values("tk_ihtimal",ascending=False)
```

​​

```
.dataframe tbody tr th {    vertical-align: top;}​.dataframe thead th {    text-align: right;}
```

</style>​

|  | headline | tk\_ihtimal |
| --- | --- | --- |
| 506 | Dini nikahlı kocası bıçakladı! 1 çocuk annesi ... | 0.78 |
| 915 | Başakşehir anne çocuk merkezine sahip çıkıyor | 0.7 |
| 781 | Köy çocuklarının sesi oldular | 0.63 |
| 1204 | Pandemide çocukların yüzünü güldürdüler | 0.63 |
| 1423 | Gülabibey’de çocuklar mutlu | 0.54 |
| 1055 | Aydın Kadın Doğum ve Çocuk Hastalıkları Hastan... | 0.34 |
| 2052 | Lüleburgaz Belediyesi “Çocuk Hakları" Toplantı... | 0.25 |
| 2143 | ÇOCUKLARINA KAVUŞTU | 0.14 |

​

</div>

Haberleri "çocuk" terimi ile **en ilgili** şekilde listeledik. Kusursuz değil ama yakın.
