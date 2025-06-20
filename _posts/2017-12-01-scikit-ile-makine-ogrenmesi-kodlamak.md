---
title: "Scikit ile Makine Öğrenmesi Kodlamak"
date: 2017-12-01
categories: 
  - "bilgisayar"
tags: 
  - "data-science"
  - "machine-learning"
  - "python"
  - "scikit"
---

Makine öğrenmesi çalışmalarında şimdiye kadar hep R kullanmıştım. [Scikit](http://scikit-learn.org/) ve [Tensorflow](https://www.tensorflow.org/) hakkında [kaggle'daki](https://www.kaggle.com/) istatistikleri görünce biraz da Python'a dair eğilimle, Scikit kullanmaya karar verdim. Direkt Scikit öğrenmek R'dan sonra karmaşık geldiği için, [Numpy](http://www.numpy.org/) ve [Pandas](https://pandas.pydata.org/) dokümantasyonları inceleyip bir kaç deneden sonra "Hands-On Machine Learing" kitabını keşfettim. Kitap kitap değil hazine mübarek. Anlatım güzel olmakla birlikte yazarının derin bilgisi yüzünden resmen bilgi pompalıyor. Bu yüzden biraz zorluyor.

![2017-12-01 21_16_54-Hands-On Machine Learning with Scikit-Learn and TensorFlow_ Concepts, Tools, and.png](/images/2017-12-01-21_16_54-hands-on-machine-learning-with-scikit-learn-and-tensorflow_-concepts-tools-and.png)

Ben de hem kendim denemek hem de İngilizce ile arası iyi olmayan veri bilimci adayları için örnekleri ekstra açıklamalı olarak yeniden kurguladım. Şu linkte kodlarını ve yazdığım yorumları açıkça paylaştığım kod deposu (repository) var.

Link [şurada](https://bitbucket.org/suatatan/scikit-ogren/src/0a1325a0edc57852befbbcb593cfa1091ddec748/Scikit-Ogreniyorum-1.ipynb?at=master&fileviewer=notebook-viewer%3Anbviewer).

İlgilenenlerin işine yarayacağını umuyorum.

Yorumlarınızı, katkılarınızı, sorularınızı memnuniyetle beklerim.

Son bir not benim gibi R'cılar için, Scikit ile R Caret arasında basit bir mukayese:

**Scikit-in R'dan farkı**

Daha önce makine öğrenme algoritmalarını daha çok R ile denemiştim. Python ve Scikit kullanımında en çok dikkat ettiğim özellikler şunlar. İşte tecrübe:)

Scikit'in artıları:

- Scikit özellikle Imputer ve OneHotEncoder ile çok kullanışlı ve ileri özellikler sunuyor. R'da muhakkak vardır ancak hiç karşılaşmadım.
- Pipeline ve Pipeline'ları bir araya getiren FeaturedUnion özelliği'de Scikit'de sevdiğim özellikler'den. R'da görmedim.
- GridSearch özelliğine yani en iyi kombinasyonun da bi zahmet makine tarafından bulunması (Hyperparameter Tuning) özelliğine bayıldım.

R'ın artıları:

- Jupyter Notebook halen R Studio'nun yanından geçmez.
- SciKit NumPy üzerinde çalışıyor ancak Pandas data frameleri üzerinde çalışmıyor. Bu bir ayıp. R'da makine öğrenme modelleri benim kullandığım caret kütüphanesi üzerinde data frame'de çalışıyor.

Her ikisinde de mevcut olanlar:

- K-Folding R'da Caret kütüphesinde de var.
