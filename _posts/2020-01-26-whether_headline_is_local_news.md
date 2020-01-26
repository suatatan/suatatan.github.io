---
layout: post
title:  My AI Classifies News Headlines
date:   2020-01-26 00:00:00 +0300
image:  ai.jpg
tags:   NewsAnalytics
---

# A Machine Learning Algorithm for classifying whether any Turkish Headline 'Local' or 'Non-local'.

## Objection

I will build a machine learning algorithm for classifying Turkish News in terms of 'local news' or 'non-local news'. The main motivation behind this algorithm is the fuzzy nature of search pages of news outlets. Most of the web pages inject non-local headlines into local news. This algorithm will detect the real nature of the headline.

For this purpose, I scraped the local and non-local news based on special queries. Then I trained multiple algorithms to find the best fit.

This notebok has been written with Python language.


```python
import sqlite3
import pandas as pd
# Create your connection.
cnx = sqlite3.connect('/home/suat/Dropbox/important_datum/il_haberleri/ilhaber.sqlite')

guya_yereller = pd.read_sql_query("SELECT * FROM haberler_gayri_mukerrer", cnx)

cnx2 = sqlite3.connect('/home/suat/Dropbox/important_datum/ulusal_haberler/ulusal_haberler.sqlite')

yerel_olmayanlar = pd.read_sql_query("SELECT * FROM haberler", cnx2)



```

The non-local headlines


```python
yerel_olmayanlar.count()
```




    baslik           13058
    scrape_tarihi    13058
    id               13058
    sayfa_url        13058
    sorgu_ifadesi    13058
    dtype: int64



The local headlines


```python
guya_yereller.count()
```




    baslik           88378
    sorgu_ifadesi    88378
    sayfa_url        88378
    insan_etiket      7699
    dtype: int64



The clear terms about local news (like mayor, governor, village) will be extract from local headlines to label them as 'local'


```python
yerel_haberler = pd.read_sql_query("""
SELECT * FROM haberler where baslik like '%vali%' 
                or baslik like '%kaymakam%'
                or baslik like '%mezra%'
                or baslik like '%müftü%'
                or baslik like '%muhtar%'
                or baslik like '%belediye başkanı%'
                or baslik like '%meclis üyesi%'
                or baslik like '%köy%'
                or baslik like '%mahalle%'
                or baslik like '%ilçe%'
                or baslik like '%il müdür%'
                or baslik like sorgu_ifadesi""", cnx)
```


```python
yerel_haberler.count()
```




    baslik           11864
    scrape_tarihi    11864
    id               11864
    sayfa_url        11864
    sorgu_ifadesi    11864
    insan_etiket      1024
    dtype: int64



Combining 'local' and 'non-local' news then labelling them


```python
yerel_degil = yerel_olmayanlar.sample(5000)
yereldir = yerel_haberler.sample(5000)
yerel_degil['yerelmi']='yerel_degil'
yereldir['yerelmi']='yerel'
```


```python
df = pd.concat([yerel_degil,yereldir])
df.sample(5)
```

    /usr/lib/python3/dist-packages/ipykernel_launcher.py:1: FutureWarning: Sorting because non-concatenation axis is not aligned. A future version
    of pandas will change to not sort by default.
    
    To accept the future behavior, pass 'sort=False'.
    
    To retain the current behavior and silence the warning, pass 'sort=True'.
    
      """Entry point for launching an IPython kernel.





<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>baslik</th>
      <th>id</th>
      <th>insan_etiket</th>
      <th>sayfa_url</th>
      <th>scrape_tarihi</th>
      <th>sorgu_ifadesi</th>
      <th>yerelmi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>12320</th>
      <td>Korkunç cinayette sır perdesi aralandı</td>
      <td>28c8d8d5414877d49aa8706021d901d2</td>
      <td>NaN</td>
      <td>haber7.com</td>
      <td>24-01-2020</td>
      <td>kanun</td>
      <td>yerel_degil</td>
    </tr>
    <tr>
      <th>859</th>
      <td>25.09.2019 13:18   Yol çalışmasında bulunan ma...</td>
      <td>9880edc70bb18742d7fe50c776268abe</td>
      <td>None</td>
      <td>sondakika.com</td>
      <td>29-09-2019</td>
      <td>Ankara</td>
      <td>yerel</td>
    </tr>
    <tr>
      <th>4332</th>
      <td>CHP 71 belediye başkanını açıkladı... İşte tam...</td>
      <td>52f760319239fabd7476b461589a20b4</td>
      <td>None</td>
      <td>cumhuriyet.com.tr</td>
      <td>29-09-2019</td>
      <td>Gümüşhane</td>
      <td>yerel</td>
    </tr>
    <tr>
      <th>4309</th>
      <td>Suriye</td>
      <td>7e63e744cf72af3f8296c5df7befd6ce</td>
      <td>NaN</td>
      <td>tr.mehrnews.com</td>
      <td>24-01-2020</td>
      <td>beşiktaş</td>
      <td>yerel_degil</td>
    </tr>
    <tr>
      <th>2284</th>
      <td>Türkiye’nin ilk 'Yüzen Ofis'i ilgi çekiyor</td>
      <td>1caaad793172bd4868641892b1856969</td>
      <td>NaN</td>
      <td>virahaber.com</td>
      <td>24-01-2020</td>
      <td>fenerbahçe</td>
      <td>yerel_degil</td>
    </tr>
  </tbody>
</table>
</div>




```python
from io import StringIO
col = ['yerelmi', 'baslik']
df = df[col]
df = df[pd.notnull(df['baslik'])]
df.columns = ['yerelmi', 'baslik']
df['category_id'] = df['yerelmi'].factorize()[0]
category_id_df = df[['yerelmi', 'category_id']].drop_duplicates().sort_values('category_id')
category_to_id = dict(category_id_df.values)
id_to_category = dict(category_id_df[['category_id', 'yerelmi']].values)
```

If category id is 0 news is non-local, else headline is local news


```python
df.sample(10) # yerelse 1 
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>yerelmi</th>
      <th>baslik</th>
      <th>category_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>12813</th>
      <td>yerel_degil</td>
      <td>Türkiye</td>
      <td>0</td>
    </tr>
    <tr>
      <th>10280</th>
      <td>yerel</td>
      <td>19.09.2019 16:49   19 Eylül Gaziler Günü Zongu...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2189</th>
      <td>yerel</td>
      <td>16.09.2019 21:48   Vali Oktay Çağatay, Adilcev...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>7244</th>
      <td>yerel_degil</td>
      <td>YATSI</td>
      <td>0</td>
    </tr>
    <tr>
      <th>8947</th>
      <td>yerel</td>
      <td>Muhtara tokat atıp kaçtılar</td>
      <td>1</td>
    </tr>
    <tr>
      <th>6377</th>
      <td>yerel</td>
      <td>23.09.2019 15:08   Milli sporcuların Avrupa ba...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>10673</th>
      <td>yerel</td>
      <td>Üç ile vali ataması yapıldı</td>
      <td>1</td>
    </tr>
    <tr>
      <th>11169</th>
      <td>yerel</td>
      <td>09.09.2019 17:19   Kadirli'de 3 araç çarpıştı:...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>7850</th>
      <td>yerel_degil</td>
      <td>14.01.2020 15:54   HDP TBMM Grup Toplantısı HD...</td>
      <td>0</td>
    </tr>
    <tr>
      <th>327</th>
      <td>yerel</td>
      <td>16.09.2019 16:27   Döğer'de 2. Yunus Emre'yi a...</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



Distribution of the news are normal


```python
import matplotlib.pyplot as plt
fig = plt.figure(figsize=(8,6))
df.groupby('yerelmi').baslik.count().plot.bar(ylim=0)
plt.show()
```


![png](/images/2020-01-26-output_16_0.png)


Stopwords removal:


```python
from stop_words import get_stop_words
stop_words_tr = get_stop_words('tr')
```


```python
from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer(sublinear_tf=True, 
                        min_df=5, norm='l2', encoding='utf-8', ngram_range=(1, 3), 
                        stop_words=stop_words_tr)
features = tfidf.fit_transform(df.baslik).toarray()
labels = df.category_id
features.shape
```

    /usr/local/lib/python3.7/dist-packages/sklearn/feature_extraction/text.py:385: UserWarning: Your stop_words may be inconsistent with your preprocessing. Tokenizing the stop words generated tokens ['insermi'] not in stop_words.
      'stop_words.' % sorted(inconsistent))





    (10000, 16579)



## Chi-Square Test to Find-out Most Relevant Term with Local and Non-local Headlines


```python
from sklearn.feature_selection import chi2
import numpy as np
N = 2
for Product, category_id in sorted(category_to_id.items()):
  features_chi2 = chi2(features, labels == category_id)
  indices = np.argsort(features_chi2[0])
  feature_names = np.array(tfidf.get_feature_names())[indices]
  unigrams = [v for v in feature_names if len(v.split(' ')) == 1]
  bigrams = [v for v in feature_names if len(v.split(' ')) == 2]
  print("# '{}':".format(Product))
  print("  . Most correlated unigrams:\n. {}".format('\n. '.join(unigrams[-N:])))
  print("  . Most correlated bigrams:\n. {}".format('\n. '.join(bigrams[-N:])))
```

    # 'yerel':
      . Most correlated unigrams:
    . 2019
    . 09
      . Most correlated bigrams:
    . belediye başkanı
    . 09 2019
    # 'yerel_degil':
      . Most correlated unigrams:
    . 2019
    . 09
      . Most correlated bigrams:
    . belediye başkanı
    . 09 2019


## A experiment with Multionomial Naive Bayes Classifier


```python
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
X_train, X_test, y_train, y_test = train_test_split(df['baslik'], df['category_id'], random_state = 0)

count_vect = CountVectorizer()
X_train_counts = count_vect.fit_transform(X_train)
tfidf_transformer = TfidfTransformer()
X_train_tfidf = tfidf_transformer.fit_transform(X_train_counts)
clf = MultinomialNB().fit(X_train_tfidf, y_train)
```

# Experiment with Different Classifier to Select Best Performant Algorithm


```python
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.model_selection import cross_val_score
import seaborn as sns
```

I will use 5 random cross-validation experiment for each algorithm


```python
models = [
    RandomForestClassifier(n_estimators=200, max_depth=3, random_state=0),
    LinearSVC(),
    MultinomialNB(),
    LogisticRegression(random_state=0),
]
CV = 5
cv_df = pd.DataFrame(index=range(CV * len(models)))
entries = []
for model in models:
  model_name = model.__class__.__name__
  accuracies = cross_val_score(model, features, labels, scoring='accuracy', cv=CV)
  for fold_idx, accuracy in enumerate(accuracies):
    entries.append((model_name, fold_idx, accuracy))
cv_df = pd.DataFrame(entries, columns=['model_name', 'fold_idx', 'accuracy'])

sns.boxplot(x='model_name', y='accuracy', data=cv_df)
sns.stripplot(x='model_name', y='accuracy', data=cv_df, 
              size=8, jitter=True, edgecolor="gray", linewidth=2)
plt.show()
```


![png](/images/2020-01-26-output_27_0.png)


Best peformance is with LinearSVC algorithm


```python
cv_df.groupby('model_name').accuracy.mean()
```




    model_name
    LinearSVC                 0.9825
    LogisticRegression        0.9684
    MultinomialNB             0.9615
    RandomForestClassifier    0.8558
    Name: accuracy, dtype: float64




## Confusion Matrix


```python
from sklearn.metrics import confusion_matrix

model = LinearSVC()
X_train, X_test, y_train, y_test, indices_train, indices_test = train_test_split(features, labels, df.index, test_size=0.33, random_state=0)
clf_linear_svc= model.fit(X_train, y_train)
y_pred = clf_linear_svc.predict(X_test)

conf_mat = confusion_matrix(y_test, y_pred)
fig, ax = plt.subplots(figsize=(10,10))
sns.heatmap(conf_mat, annot=True, fmt='d',
            xticklabels=category_id_df.yerelmi.values, yticklabels=category_id_df.yerelmi.values)
plt.ylabel('Actual')
plt.xlabel('Predicted')
plt.show()
```


![png](/images/2020-01-26-output_31_0.png)


## Train Selected Algorithm


```python
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
X_train, X_test, y_train, y_test = train_test_split(df['baslik'], df['category_id'], random_state = 0)
count_vect = CountVectorizer()
X_train_counts = count_vect.fit_transform(X_train)
tfidf_transformer = TfidfTransformer()
X_train_tfidf = tfidf_transformer.fit_transform(X_train_counts)
clf_linear_svc = LinearSVC().fit(X_train_tfidf, y_train)
clf_linear_svc
```




    LinearSVC(C=1.0, class_weight=None, dual=True, fit_intercept=True,
              intercept_scaling=1, loss='squared_hinge', max_iter=1000,
              multi_class='ovr', penalty='l2', random_state=None, tol=0.0001,
              verbose=0)



## Simple Test


```python
x = """
Cumhurbaşkanlığı Kararnamesinde yer alan hususlar
"""
y = clf_linear_svc.predict(count_vect.transform([x]))[0]
print(category_id_df[category_id_df['category_id'] == y]['yerelmi'])
```

    5032    yerel_degil
    Name: yerelmi, dtype: object



```python
x = """
Van'ın Gürpınar ilçesinde Norduz Koyunları ile ilgili
"""
y = clf_linear_svc.predict(count_vect.transform([x]))[0]
print(category_id_df[category_id_df['category_id'] == y]['yerelmi'])
```

    6286    yerel
    Name: yerelmi, dtype: object


# Labelling unlaballed headlines


```python
#etiketsizler
dfx = pd.read_sql_query("""
SELECT  * FROM haberler_islenmis
""", cnx)
```


```python
dfx['makine_etiket_yerelmi'] = None
```


```python
dfx.count()
```




    level_0                  80679
    index                    80679
    baslik                   80679
    sorgu_ifadesi            80679
    sayfa_url                80679
    insan_etiket                 0
    makine_etiket            80679
    makine_etiket_id         80679
    makine_etiket_yerelmi        0
    dtype: int64




```python
dfx.head(3)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>level_0</th>
      <th>index</th>
      <th>baslik</th>
      <th>sorgu_ifadesi</th>
      <th>sayfa_url</th>
      <th>insan_etiket</th>
      <th>makine_etiket</th>
      <th>makine_etiket_id</th>
      <th>makine_etiket_yerelmi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>Dha yurt bülteni - 17</td>
      <td>Adana</td>
      <td>haberler.com</td>
      <td>None</td>
      <td>ol</td>
      <td>2</td>
      <td>None</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>Adana'da terör saldırısı</td>
      <td>Adana</td>
      <td>haberler.com</td>
      <td>None</td>
      <td>ol</td>
      <td>2</td>
      <td>None</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>2</td>
      <td>Adana'da polis servis aracına saldırıda patlam...</td>
      <td>Adana</td>
      <td>haberler.com</td>
      <td>None</td>
      <td>ol</td>
      <td>2</td>
      <td>None</td>
    </tr>
  </tbody>
</table>
</div>




```python
cincos = dfx
cincos.baslik
result_ids= clf_linear_svc.predict(count_vect.transform(cincos.baslik))
dfx['makine_etiket_yerelmi']= result_ids
```

## Converting numeric labels into human-friendly labels


```python
# try
def convcat(catid):
    return "yerel" if catid == 1 else "yerel_degil"


dfx['makine_etiket_yerelmi']= dfx['makine_etiket_yerelmi'].apply(convcat)
```


```python
dfx.sample(3)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>level_0</th>
      <th>index</th>
      <th>baslik</th>
      <th>sorgu_ifadesi</th>
      <th>sayfa_url</th>
      <th>insan_etiket</th>
      <th>makine_etiket</th>
      <th>makine_etiket_id</th>
      <th>makine_etiket_yerelmi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1271</th>
      <td>1271</td>
      <td>1271</td>
      <td>Boynuz uzunluğu 127 santim olan yaban keçisi a...</td>
      <td>Adıyaman</td>
      <td>iha.com.tr</td>
      <td>None</td>
      <td>ol</td>
      <td>2</td>
      <td>yerel</td>
    </tr>
    <tr>
      <th>56976</th>
      <td>56976</td>
      <td>56976</td>
      <td>Türkiye 3 Bant Bilardo Şampiyonası başladı</td>
      <td>Sinop</td>
      <td>iha.com.tr</td>
      <td>None</td>
      <td>ol</td>
      <td>2</td>
      <td>yerel_degil</td>
    </tr>
    <tr>
      <th>31672</th>
      <td>31672</td>
      <td>31672</td>
      <td>Yönetmen Metin Günay'ın babası son yolculuğuna...</td>
      <td>Isparta</td>
      <td>iha.com.tr</td>
      <td>None</td>
      <td>ym</td>
      <td>0</td>
      <td>yerel_degil</td>
    </tr>
  </tbody>
</table>
</div>




```python
#dfx.to_sql('haberler_islenmis',con=cnx,if_exists="replace")
```

## Results

Results shows that some webpage's search interface are pretty 'dirty'. It is show a lot of unrelevant things


```python
gruplu_dfx = dfx.groupby(['sayfa_url','makine_etiket_yerelmi']).sum()
gruplu_dfx
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th></th>
      <th>level_0</th>
      <th>index</th>
      <th>makine_etiket_id</th>
    </tr>
    <tr>
      <th>sayfa_url</th>
      <th>makine_etiket_yerelmi</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">bbc.com</th>
      <th>yerel</th>
      <td>14628677</td>
      <td>14628677</td>
      <td>554</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>17068524</td>
      <td>17068524</td>
      <td>466</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">cumhuriyet.com.tr</th>
      <th>yerel</th>
      <td>109065882</td>
      <td>109065882</td>
      <td>3822</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>211051271</td>
      <td>211051271</td>
      <td>5242</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">ensonhaber.com</th>
      <th>yerel</th>
      <td>473463</td>
      <td>473463</td>
      <td>6</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>2209630</td>
      <td>2209630</td>
      <td>36</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">ermenihaber.am</th>
      <th>yerel</th>
      <td>22176919</td>
      <td>22176919</td>
      <td>746</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>60199430</td>
      <td>60199430</td>
      <td>1636</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">haber7.com</th>
      <th>yerel</th>
      <td>17833059</td>
      <td>17833059</td>
      <td>605</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>53827623</td>
      <td>53827623</td>
      <td>1043</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">haberler.com</th>
      <th>yerel</th>
      <td>358368614</td>
      <td>358368614</td>
      <td>14485</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>225344696</td>
      <td>225344696</td>
      <td>7300</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">iha.com.tr</th>
      <th>yerel</th>
      <td>477292865</td>
      <td>477292865</td>
      <td>19382</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>399238760</td>
      <td>399238760</td>
      <td>12978</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">milligazete.com.tr</th>
      <th>yerel</th>
      <td>176312717</td>
      <td>176312717</td>
      <td>5450</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>350337485</td>
      <td>350337485</td>
      <td>8181</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">posta.com.tr</th>
      <th>yerel</th>
      <td>31166751</td>
      <td>31166751</td>
      <td>1231</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>26135198</td>
      <td>26135198</td>
      <td>836</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">sondakika.com</th>
      <th>yerel</th>
      <td>366563966</td>
      <td>366563966</td>
      <td>17180</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>11351338</td>
      <td>11351338</td>
      <td>454</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">tr.euronews.com</th>
      <th>yerel</th>
      <td>12562580</td>
      <td>12562580</td>
      <td>458</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>38535898</td>
      <td>38535898</td>
      <td>873</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">tr.mehrnews.com</th>
      <th>yerel</th>
      <td>11758767</td>
      <td>11758767</td>
      <td>504</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>77124361</td>
      <td>77124361</td>
      <td>1876</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">virahaber.com</th>
      <th>yerel</th>
      <td>41997223</td>
      <td>41997223</td>
      <td>1544</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>109330008</td>
      <td>109330008</td>
      <td>3456</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">yenisafak.com</th>
      <th>yerel</th>
      <td>11329335</td>
      <td>11329335</td>
      <td>290</td>
    </tr>
    <tr>
      <th>yerel_degil</th>
      <td>21225141</td>
      <td>21225141</td>
      <td>554</td>
    </tr>
  </tbody>
</table>
</div>




```python

```




```python
dfx.groupby(['sayfa_url','makine_etiket_yerelmi']).size().unstack().plot.barh(figsize=(30,20))
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7fea0cdf2650>




![png](/images/2020-01-26-output_51_1.png)

