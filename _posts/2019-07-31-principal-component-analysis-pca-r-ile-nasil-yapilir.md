---
categories:
- bilgisayar
- r-dili
- isletme
date: 2019-07-31
layout: post
tags:
- english
- longread
- technology
title: Principal Component Analysis (PCA) R ile nasıl yapılır?
---

# Egzersiz

PCA ile ilgili olarak unuttuklarımızı gözden gözgen geçirmek için basit bir _egzersiz_ tasarladım. Bu örnek hipotetik bir veri seti üzerinde tasarlanmıştır. Durumu tam kavradıktan sonra bunu gerçek veri seti üzerinde uygulayacağız.

## Memleket ve Dil Örneği

Diyelim ki bir grup öğrencinin farazi bir okulda Türkçe, Farsça, Arapça ve Süryanice dillerinden aldıkları dil puanları ve memleket bilgileri yer alsın. Bu veri setinde özellikle Van’lı olanları Türkçe ve İngilizcelerinin iyi Farsçalarının da azıcık iyi olmasına özen gösterdik. Mardinlilerin ise Arapçalarının iyi, Türkçe e İngilizcelerinin ise Van’lılara göre kötü olacağını düşündük. Daha sonra Siirtlileri ise Türkçe ve İngilizcelerinin kötü ancak Arapça’da en az Mardinliler kadar iyi olmalarını sağladık. Son olarak Süryanice’de en usta olanların Siirt’liler, Mardinliler ise azıcık Süryaniceye hakim olsun.

Şimdi PCA yaparak bu 5 dil yerine tek bir gösterge ortaya çıkararak tüm veri setinde memleket değişkenini **en yüksek ölçüde açıklamaya**çalışacağız.

Veri setimiz şuydu:

```
data = read.csv("ornek2.csv")
rownames(data) <- data$student
data[2:7]
```

```
##       memleket turkce farsca arapca ingilizce suryanice
## suat       van     90     60     10        90         0
## garb       van     88     70     11        88         0
## vahi       van     89     71     13        93         0
## mahi       mrd     70     10     90        66        11
## meli       mrd     65     11     98        67         7
## fahro      srt     40     40     89        60        90
## abdo       srt     40     40     89        60        90
## hako       srt     40     40     89        60        90
```

## PCA Uygulaması

```
data.pca <- prcomp(data[3:7])
data.pca
```

```
## Standard deviations (1, .., p=5):
## [1] 62.697451 32.779140  3.550695  1.399083  0.912195
## 
## Rotation (n x k) = (5 x 5):
##                  PC1         PC2        PC3        PC4        PC5
## turkce    -0.3574760  0.11677660 -0.2578622  0.1165373 -0.8823267
## farsca    -0.2328702 -0.56494423  0.7378478 -0.1834692 -0.2202935
## arapca     0.6056701  0.49571857  0.5167242  0.1554323 -0.3102639
## ingilizce -0.2295579 -0.07426912  0.1540874  0.9442049  0.1628538
## suryanice  0.6312284 -0.64494065 -0.3135936  0.1925512 -0.2240209
```

PC1 adlı komponentimizin %62 oranında tüm veri setini açıkladığını görüyoruz, PC2 adlı komponent ise %32 oranında açıklıyor. Sadece bu iki komponenti kullarak tüm veri setini 62+32 = %94 oranında açıklayabiliriz. Bunun için 5 dille ilgili parametrelere gerek kalmaz.

```
#library("devtools")
#install_github("vqv/ggbiplot")
```

## Görselleştirme

`data.pca` adlı değişkenimize tanımladığımız komponentlerden en güçlü iki komponentimizi grafiğe yerleştiriyoruz. Görülen okun yönü ise her bir parametrenin (dil) ekseninde yer aldığı komponente hizmet ettiğini gösteriyor, ok ne kadar uzunsa o parametre o komponente o kadar hizmet ediyor (açıklıyor). Buna göre yatay eksende PCA1 komponentini en çok arapça ve süryanice açıklıyor. Aynı komponenti Türkçe, İngilize ve Farça bilgisi de açıklıyor ancak ters yönde.

Öte yandan Süryanic bilgisi ile Farsça bilgisi ise PCA2’yi açıklıyor bu bilgilerin aksi istikamete ise Arapça yer alıyor. Tüm bu ilişkiler yani hangi komponentin hangi parametre ile ne kadar ilgili olduğu zaten PCA tablosunda görülebiliyor.

```
library("ggbiplot")
```

```
ggbiplot::ggbiplot(data.pca,labels= rownames(data),groups = data$memleket)
```

![](/images/image.png)

Bu grafiğe isimleri de eklediğimizde memleketlerine göre de renklendirdiğimizde sağ alt köşede üç mardinli arkadaşın da aybı yerde yer aldığını ve bu arkadaşların da bir küme olma nedeninin _Süryanice_ bilgisi olduğunu başka bir şeye bakmaksızın anlıyoruz. Yani memlekete bilgisi olmasaydı dahi PCA bize bu arkadaşların ortak bir özelliğinin var olduğunu söylemiş oluyor. Aynı durum grafiğin üstünde siirtiler kaar olmasa da yine ayrı bir grubun var olduğunu gösteriyor. Solda is Van’lılar yer alıyor onlar ise Türkçe, İngilizce ve Farsça bilgisi ile göz dolduruyor :)

# Sonuçlar

- PCA ile çok fazla sayıda parametre daha az parametreye indirgenebilir. (PCA1, PCA2 gibi)
- Bu indiregeme işlemi görselleştirildiğinde birbiri ile ilgili (benzer ya da tam tersi) parametreler (örneğin Türkçe, İngilizce ve Farsça’nın grubun bir kısmı için birbiri ile ilgili parametreler olması yani öğrencilerin memleketindeki şu veya bu nedenden ötürü Farsçası iyi olan kişinin İngilizcesinin de iyi olması gibi) ortaya çıkarılabilir.
- GGBiplot aracı yardımı ile gözlemlerin (öğrencilerimiz) de grafiğe eklenmesi ile veri seti içinde gizli gruplar da ortaya çıkarılabilir. Örneğimizde memleket kolonu yer almasa bile biz bu öğrencilerinin bazılarının adını koymadığımız bir nedenden ötürü (memleket) grup olduklarını anlamış oluyoruz.
