---
layout: post
title: "K-Means ve TF.IDF ile gözetimsiz makine öğrenme algoritması örneği"
date: 2019-07-02
categories: 
  - "bilgisayar"
tags: 
  - "makine-ogrenmesi"
---

Metin madenciliğinde sınıflandırma için kullanılacak algoritmalarda eğer gözetimli algoritma (supervised) kullanırsak dışarıdan eğitim verisine ihtiyaç duyarız. Dışarıdan gözetim gerektirmeyen (unsupervized) algoritmalarda ise metin içinde yapılar "cluster" adı verilen yapılara göre otomatik olarak algılanabilir.

Aşağıdaki kodlarla TF.IDF metriği üzerinden K-Means algoritması kullanılarak basit 6 cümleden oluşan bir korpus içinde 2 sınıf otomatik olarak ortaya çıkarılmıştır.

In \[19\]:

```
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
all_text  =  """
 Ekonomik kriz insanları etkiledi
 Ekonomik krizde çözüm aranıyor
 Ekonominin patronlarından parasal çözümler
 Mide ağrısı nasıl geçirilir
 Mide ağrısı için hangi ilaçlar iyidir
 Mideniz ağrıdığında ne yapmalısınız?
""".split("\n")[1:-1]
# Preprocessing and tokenizing
def preprocessing(line):
    line = line.lower()
    line = re.sub(r"[{}]".format(string.punctuation), " ", line)
    return line

```

In \[20\]:

```
all_text

```

Out\[20\]:

```
[' Ekonomik kriz insanları etkiledi',
 ' Ekonomik krizde çözüm aranıyor',
 ' Ekonominin patronlarından parasal çözümler',
 ' Mide ağrısı nasıl geçirilir',
 ' Mide ağrısı için hangi ilaçlar iyidir',
 ' Mideniz ağrıdığında ne yapmalısınız?']
```

In \[21\]:

```
import re
import string
tfidf_vectorizer = TfidfVectorizer(preprocessor=preprocessing)
tfidf = tfidf_vectorizer.fit_transform(all_text)
sinif_sayisi =2
kmeans = KMeans(n_clusters=sinif_sayisi).fit(tfidf)

```

In \[23\]:

```
suat_order_centroids = kmeans.cluster_centers_.argsort()[:, ::-1]
suat_terms = tfidf_vectorizer.get_feature_names()

```

In \[24\]:

```
for i in range(sinif_sayisi):
     print("Cluster %d:" % i),
     for ind in suat_order_centroids[i, :10]:
         print(" %s" % suat_terms[ind])

```

```
Cluster 0:
 ekonomik
 aranıyor
 krizde
 etkiledi
 insanları
 çözüm
 kriz
 ağrıdığında
 ekonominin
 çözümler
Cluster 1:
 ağrısı
 mide
 nasıl
 geçirilir
 için
 hangi
 ilaçlar
 iyidir
 insanları
 ağrıdığında

```

# Tahmin Denemesi

In \[25\]:

```
#hangi metin hangi cluster'da
# mide ağrısı Cluster'i 1 olduğundan aşağıda ilk sonuç 1 döner
lines_for_predicting = ["mide ağrısı", "ekonomi","kriz"]
kmeans.predict(tfidf_vectorizer.transform(lines_for_predicting))

# array([0, 1], dtype=int32)

```

Out\[25\]:

```
array([1, 0, 0], dtype=int32)
```
