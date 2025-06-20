---
layout: post
title: "SVM Algoritması Örneği"
date: 2019-12-25
categories: 
  - "bilgisayar"
tags: 
  - "makine-ogrenmesi"
  - "yapay-zeka"
---

Aşağıda SVM (Support Vector Machine) adlı makine öğrenmesi modeli ile yapay zeka adlı arkadaşa, mütevazı bir tahmin işlemi yaptıracağız. Bunun için Python ve SkLearn kütüphanesi ile aşağıda gördüğünüz şekildeki bir veri seti kullanıyoruz.

<figure>

| yas | egitim\_seviyesi | kredi\_odememezlik | renk |
| --- | --- | --- | --- |
| 50 | 6 | 0 | green |
| 60 | 5 | 0 | green |
| 70 | 6 | 0 | green |
| 55 | 5 | 0 | green |
| 53 | 4 | 0 | green |
| 50 | 6 | 0 | green |
| 52 | 5 | 0 | green |
| 50 | 5 | 0 | green |
| 49 | 6 | 0 | green |
| 53 | 4 | 0 | green |
| 57 | 5 | 0 | green |
| 25 | 1 | 1 | red |
| 30 | 3 | 1 | red |
| 45 | 2 | 1 | red |
| 22 | 3 | 1 | red |
| 30 | 2 | 1 | red |
| 33 | 3 | 1 | red |
| 26 | 4 | 1 | red |
| 24 | 2 | 1 | red |

<figcaption>

Kredi ödememezlik tablosu

</figcaption>

</figure>

Yaş ve eğitim düzeyi bilgisi elimizdedir. Bu bilgilere göre bir de kredi geri ödeme durumunu biliyoruz.In \[102\]:

```
import pandas as pd
df = pd.read_excel('svm_ornek_data_1.xlsx')

```

In \[115\]:

```
import numpy as np
from sklearn import datasets
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC

```

In \[111\]:

```
df.sample(3)

```

Out\[111\]:

|  | yas | egitim\_seviyesi | kredi\_odememezlik | renk |
| --- | --- | --- | --- | --- |
| 13 | 45 | 2 | 1 | red |
| 1 | 60 | 5 | 0 | green |
| 6 | 52 | 5 | 0 | green |

Aşağıdaki grafikte dikkat ettiyseniz kredi geri ödememe durumu 0 olan (yani geri ödeyenler) eğitim düzeyi ve yaş yüksek kişiler. Diğerleri ise tam tersi düşük eğitimli ve genç kişiler.In \[112\]:

```
%matplotlib inline
import matplotlib.pyplot as plt
df.plot.scatter(x='yas',y='egitim_seviyesi',c=df['renk'])

```

Out\[112\]:

```
<matplotlib.axes._subplots.AxesSubplot at 0x27a0b7bc0b8>
```

![](/images/image.png)

Şimdi **Support Vector Machine** ile bu veri setini algoritmaya öğretip, bu veri setindeki bir durumda ortaya çıkacak durumu tahmin ettirelim.In \[103\]:

```
X = df.iloc[:,0:2].values.astype(float) #ilk iki kolonu al 0, 1
y = df.iloc[:,2:3].values.astype(float)# sadece 3. kolon 

```

StandardScaler kullanma nedeni: SVM veri setlerinin tüm kolonlar için benzer aralıkta olduğu durumlarda daha rahat çalışır. LinearSVC kullanma nedenimiz ise bu veri setinin lineer olarak ayrılabilimesi. Elbette bu mümkün olmayabilirdi de.In \[131\]:

```
scaler = StandardScaler()
X_std = scaler.fit_transform(X)

```

In \[143\]:

```
# Create support vector classifier
svc = LinearSVC(C=1.0, loss="hinge")

# Train model
model = svc.fit(X_std, y)
model

```

Out\[143\]:

```
LinearSVC(C=1.0, class_weight=None, dual=True, fit_intercept=True,
     intercept_scaling=1, loss='hinge', max_iter=1000, multi_class='ovr',
     penalty='l2', random_state=None, tol=0.0001, verbose=0)
```

Şimdi tahmin yapalım: 51 yaşıda ve eğitim seviyesi 3 olan biri kredisini geri öder mi (0:öder, 1:Ödemez)In \[144\]:

```
model.predict([[51., 3.]])

```

Out\[144\]:

```
array([0.])
```

# Hyperplane (Ayırıcı Sınır) Çizdirelim

In \[146\]:

```
# Plot data points and color using their class
color = ['black' if c == 0 else 'lightgrey' for c in y]
plt.scatter(X_std[:,0], X_std[:,1], c=color)

# Create the hyperplane
w = model.coef_[0]
a = -w[0] / w[1]
xx = np.linspace(-2.5, 2.5)
yy = a * xx - (svc.intercept_[0]) / w[1]

# Plot the hyperplane
plt.plot(xx, yy)
plt.axis("off"), plt.show();

```

![](/images/image.png)

Mavi çizgi hyperplane'mizi tanımlıyor

Modeli tanımlama Pipeline Kullanarak da olurdu, ancak grafik çizdirirken sorun yarattığından pipeline kullanmadık.In \[ \]:

```
svm_clf = Pipeline((
("scaler", StandardScaler()),
("linear_svc", LinearSVC(C=1, loss="hinge")),
))
model = svm_clf.fit(X, y.ravel()) 
#ravel dikey array'ı yatay hale getirir. Mecburen böyle Pipeline kabul etmiyor yoksa
```
