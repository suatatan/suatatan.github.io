---
title: "CountVectorizer'in Çalışma Şekli"
date: 2019-03-07
---

Python'da Metin Madenciliğine dayalı makine öğrenme modelleri kullanırken doküman külliyatınızı (corpus) kelime kelime sayılara (numpy.array formatında) çevirmek için CountVectorizer nesnesini kullanabiliyorsunuz. Çalışma şekli aşağıda:In \[43\]:

```
from sklearn.feature_extraction.text import CountVectorizer

a=["gel ali","gel suat","ali atan","suat atan"]

```

In \[44\]:

```
vec = CountVectorizer(max_features=10, min_df=2, max_df=10)  
X = vec.fit_transform(a)
print(X.toarray())
print(vec.vocabulary_)

```

```
[[1 0 1 0]
 [0 0 1 1]
 [1 1 0 0]
 [0 1 0 1]]
{'gel': 2, 'ali': 0, 'suat': 3, 'atan': 1}

```

In \[54\]:

```
new_sentence = "gel ali"
mapped_a = vec.transform([new_sentence])
print(mapped_a.toarray()) # sparse feature vector
print(vec.vocabulary_)

```

```
[[1 0 1 0]]
{'gel': 2, 'ali': 0, 'suat': 3, 'atan': 1}

```

In \[55\]:

```
new_sentence = "sen ali"
mapped_a = vec.transform([new_sentence])
print(mapped_a.toarray()) # sparse feature vector
print(vec.vocabulary_)

```

```
[[1 0 0 0]]
{'gel': 2, 'ali': 0, 'suat': 3, 'atan': 1}

```

# Tahmin Yaparken Yeni Gelen Söz Dizisini Vektörize Etmek

"hakan gel" ifadesi külliyatınızda birebir yok sadece 'gel' ifadesi eşleşmekte. Bu diziyi vektörize edince corpus'ta 'gülnur' olmadığından matriste değer sıfır çıkacaktır.In \[59\]:

```
new_sentence = "hakan gel"
mapped_a = vec.transform([new_sentence])
print(mapped_a.toarray()) # sparse feature vector
print(vec.vocabulary_)

```

```
[[0 0 1 0]]
{'gel': 2, 'ali': 0, 'suat': 3, 'atan': 1}

```

In \[60\]:

```
tokenizer = vec.build_tokenizer()
# array of words ids
for token in tokenizer(new_sentence):
    print(vec.vocabulary_.get(token))

```

```
None
2
```
