---
title: "SQLServer’da “aritmetic overflow” hatası"
date: 2016-12-08
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "aspmvc"
  - "sqlserver"
  - "yazilim"
---

SQLServer'da decimal sayı tanımlamalarında zaman zaman bu hatayla karşılaşılır. Rahat olun suçlu microsofttur. DECIMAL(10,2) demek virgülden **ÖNCE** 10-2=8 hane demek oluyor. Yani cins adamlar onlarca yazılım dilinde bu iş için daha kolay tanım varken neden yazılımcıya eziyet edersin:)

Şimdi aşağıdaki koda bakalım:

```
declare @t table (long decimal(10,6))

insert into @t VALUES (1000.0),(999.99),(11111.99)
```

SQL Server burada 11111.99 değerine kadar her şeyi düzgün insert ederken yukarıda tablo kolonu t değerini etmez çünkü virgülden önce 4'ten fazla hane var. Bu kodda decimal(10,6) kısmını long decimal(11,6) olarak değiştirirseniz kodunuz çalışacaktır.

Tecrübe 3: DECLARE kısımlarında tanımladığınız tiplere dikkat.
