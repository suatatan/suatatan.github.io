---
layout: post
title: "SQL Inner Join nedir,nasıl kullanılır?"
date: 2016-02-16
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "asp"
  - "mvc"
  - "sql"
---

Tablo 1:  
**ReferansTablo  
OkulNo,Ad,Soyad  
21,Suat,Atan  
65,Agah,Atan**

Tablo 2:  
NotTablosu  
OkulNo,Not  
21,98  
65,100

Şimdi Tablo 2'de adların görünmesini istediğimiz zaman şunu yaparız:

SELECT **ReferansTablo.Ad**, NotTablosu.Not

Diye sorgumuza başlarız. Burada sanki iki tablo bir gibi ayrı tablolardan alacağımız kolonları aldık.

Daha sonra:

INNER JOIN NotTablosu

Deriz bu da NotTablosu içinde referans tabloyu çağırmak için yazılmıştır. Şimdi ise Referans tablodaki okul no ile NotTablosundaki okul no'nun aynı şey olduğunu ifade etmek için şöyle deriz:

ON **ReferansTablo.OkulNo**\=NotTablosu.OkulNo

Yani toplamda şu komutla işi hallederiz:

SELECT ReferansTablo.Ad, NotTablosu.Not  
INNER JOIN NotTablosu  
ON ReferansTablo.OkulNo=NotTablosu.OkulNo  

![image](/images/tumblr_inline_o2mrtolA2F1r4exmc_540.png)

Peki ya birden fazla tablo ilişkisi varsa ne olur. Bu durumda ne olduğunu daha sonra vakit bulursam anlatacağım.

Ancak başlangıç olarak aşağıdaki SQL koduna bakmanızda fayda var:

  

SELECT        dbo.YazilimTaleplerTab.\*, TEB.IdariBirimAdi AS vteb, KUB.IdariBirimAdi AS vkub  
FROM            dbo.YazilimTaleplerTab INNER JOIN  
                        dbo.IdariBirim **AS TEB** ON dbo.YazilimTaleplerTab.TalepEdenBirim = TEB.idtIdariBirim **INNER JOIN**  
                        dbo.IdariBirim **AS KUB** ON dbo.YazilimTaleplerTab.KullanacakBirim = KUB.idtIdariBirim
