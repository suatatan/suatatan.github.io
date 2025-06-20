---
title: "Pandas Data Frame One-to-Hot Operasyonu ile kategorik verileri sayısallaştırma"
date: 2020-09-15
categories: 
  - "bilgisayar"
tags: 
  - "makine-ogrenmesi"
  - "python"
  - "yapay-zeka"
---

Değerli okurlar,

Veri içerisindeki kategorik kolonlar (sıralı olmayan) makine öğrenme modellerinde mevcut halleri ile kullanılamaz. Bu verileri kullanabilmek için örneğin şehir kolonunda van yazıyorsa van diye bir kolon açıp kişi vanlı ise 1 değilse 0 yazılabilir. Bu işlem one-to-hot olarak adlandırılmaktadır ve python sklearn kütüphanesinde bunun için metotlar vardır. Problem şudur ki o metotlar kolayca kullanılamaz bazı ön işlemler icap eder (bkz:manueli).

Lazım olduğunda siz de ben de kullanabilelim diye **df\_one\_to\_hot\_yap** şeklinde bir metot yazdım. Bu metoda kategorik kolonlarınızı dizi olarak tanımlarsanız size sonuç olarak aşağıda en sondaki tablo benzeri bir tablo oluşturur.

Daha sonra bu tabloyu makine öğrenme modellerinizde eğitim verisi olarak kullanabilirsiniz.

Beğendiniz mi?

Teşekkürler

```
df = pd.read_csv("temp.csv")
df
```

|  | id | sehir | tip | yas |
| --- | --- | --- | --- | --- |
| 0 | 1 | van | lisans | 20 |
| 1 | 2 | van | lisans | 30 |
| 2 | 3 | mus | yukseklisans | 40 |
| 3 | 4 | van | yukseklisans | 50 |
| 4 | 5 | mus | yukseklisans | 19 |

```
from sklearn.preprocessing import OneHotEncoder
"""
Verilen df içinde belirtilen kategorik kolonları sayısallaştırır.
"""
def df_one_to_hot_yap(df,kategorik_kolonlar):
    #kategorik_kolonlar = ['sehir','tip']
    aX=df[kategorik_kolonlar].values.tolist()
    enc = OneHotEncoder(handle_unknown = 'ignore')
    enc.fit(aX)
    dfX=enc.transform(aX).toarray()
    ctg = enc.categories_
    flatten = lambda l: [item for sublist in l for item in sublist]
    ktg = flatten(ctg)
    dfY=pd.DataFrame(dfX)
    dfY.columns=ktg
    # normal kolonlari at
    dfN = df.drop(kategorik_kolonlar,axis = 1)
    dfY
    #cbind et
    sonuc = pd.concat([dfN.reset_index(drop=True), dfY], axis=1)
    return(sonuc)
```

```
df_sayisal = df_one_to_hot_yap(df,kategorik_kolonlar=['sehir','tip'])
df_sayisal
```

|  | id | yas | mus | van | lisans | yukseklisans |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 1 | 20 | 0.0 | 1.0 | 1.0 | 0.0 |
| 1 | 2 | 30 | 0.0 | 1.0 | 1.0 | 0.0 |
| 2 | 3 | 40 | 1.0 | 0.0 | 0.0 | 1.0 |
| 3 | 4 | 50 | 0.0 | 1.0 | 0.0 | 1.0 |
| 4 | 5 | 19 | 1.0 | 0.0 | 0.0 | 1.0 |
