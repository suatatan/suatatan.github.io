---
title: "Text Classification with XGBoost Machine Learning Algorithm"
author: "Dr. Suat ATAN"
date: "2020-05-23 17:32:00 +0300"
description: Let's build a simple machine learning algorithm.
tags:
- machine_learning
- learn
- code
categories:
- Python
- English
---

## What is XGBoost ?

XGBoost is the name of a machine learning method. It can help you to predict any kind of data if you have already predicted data before. You can classify any kind of data. It can be used for text classification too. 

Like Random Forest (another decision tree algorithm), Gradient Boosting is another way for executing supervised machine learning tasks, like classification (male, female) and regression (expected value). The implementations of this method can have different names, the most common name is Gradient Boosting machines (abbreviated GBM) and XGBoost. XGBoost is especially widespread because it has been the winning algorithm in a number of recent Kaggle competitions (open data science competitions for prediction or any other kind of task).

Gradient Boosting is an ensemble learner like Random Forest algorithm. This means it will generate a final model based on a combination of individual models. The predictive capability of these single different models is inadequate and likely to overfitting but coupling many such weak single models in an ensemble will lead to a better result. In Gradient Boosting machines, the most popular type of weak model used is decision trees - another parallel to Random Forests.

## What we will do?

I always start with baby steps. The training data is a few rows of sentences that are written in Turkish. Some of them contain words about "kill" and these are labeled 1, others about "love" and they are labeled with "0".  To the making mind of algorithm confused :) some rows intentionally mislabeled. 

Test data is part of training data but it includes some of the rows are written in a totally different language (Kurdish). I did that to show how machine learning algorithms are docile. They never say I don't know. Of course, if they are not trained about different things (like another language) it cannot perform accurate prediction but for just for these stranger ones.

```python
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import CountVectorizer
from xgboost import XGBClassifier
import pandas as pd
import os
os.chdir("F:\\03-github\\turnusol\\turnusol\\experiments")
data = pd.read_csv("F:\\open_data_sets\\fake_news\\simple_train.csv").dropna()
cv = CountVectorizer(max_features=5000, encoding="utf-8",  
      ngram_range = (1,3),  
      token_pattern = "[A-Za-z_][A-Za-z\d_]*")
X = cv.fit_transform(data.title).toarray()
y = data['label']
X_train, X_test, y_train, y_test = train_test_split(X, y, 
      test_size=0.33, 
      random_state=0)
count_df = pd.DataFrame(X_train, columns=cv.get_feature_names())

count_df['etiket'] = y_train
```

```python
data.sample(5)
```

| no |               title | label |   |   |
|---:|--------------------:|-------|---|---|
|  6 |       bu dayi oldur |     1 |   |   |
| 37 | her zaman insan sev |     0 |   |   |
|  0 |   bu 25 adami oldur |     1 |   |   |
| 36 |           kadin sev |     0 |   |   |
| 21 |     o 2 adami oldur |     1 |   |   |



```python
count_df.iloc[1:10,1:10]
```


| doc | adam sev | adam vur | adama | adama saygi | adama saygi duyma | adami | adami oldur | adami vur | amca |
|----:|---------:|---------:|------:|------------:|------------------:|------:|------------:|----------:|------|
|   1 |        0 |        0 |     0 |           0 |                 0 |     0 |           0 |         0 |    0 |
|   2 |        0 |        0 |     0 |           0 |                 0 |     0 |           0 |         0 |    0 |
|   3 |        0 |        0 |     0 |           0 |                 0 |     0 |           0 |         0 |    0 |
|   4 |        0 |        0 |     0 |           0 |                 0 |     0 |           0 |         0 |    0 |
|   5 |        0 |        0 |     0 |           0 |                 0 |     1 |           0 |         1 |    0 |
|   6 |        1 |        0 |     0 |           0 |                 0 |     0 |           0 |         0 |    0 |
|   7 |        0 |        0 |     0 |           0 |                 0 |     0 |           0 |         0 |    1 |
|   8 |        0 |        0 |     1 |           1 |                 1 |     0 |           0 |         0 |    0 |
|   9 |        0 |        0 |     0 |           0 |                 0 |     0 |           0 |         0 |    1 |



```python
# fit model no training data
model = XGBClassifier()
model.fit(X_train, y_train)

# make predictions for test data
y_pred = model.predict(X_test)
predictions = [round(value) for value in y_pred]

# evaluate predictions
accuracy = accuracy_score(y_test, predictions)
print("Accuracy: %.2f%%" % (accuracy * 100.0))
```

<div style="font-size:20px; background-color: orange;">
Accuracy: 92.31%
</div>


## Predictions with totally new data


```python
simple_test = pd.read_csv("F:\\open_data_sets\\fake_news\\simple_test.csv")
cv_test = CountVectorizer(vocabulary=cv.get_feature_names())
X_test_gercek = cv_test.fit_transform(simple_test.title)
```


```python
ongoruler = pd.DataFrame(model.predict(X_test_gercek))
pd.concat([simple_test, ongoruler],axis=1)
```

| doc |                 title | predicted_label |
|----:|----------------------:|-----------------|
|   0 |         kuslari oldur |               1 |
|   1 |       cicekleri oldur |               1 |
|   2 |     bu 25 adami oldur |               1 |
|   3 |    bu 10 kadini oldur |               1 |
|   4 |        daima doga sev |               0 |
|   5 |       daima insan sev |               0 |
|   6 |              dayak ye |               1 |
|   7 |            mer bikuje |               1 |
|   8 | hercar mirov hez bike |               1 |
|   9 |    hevalen xwe bizane |               1 |