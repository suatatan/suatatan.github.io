---
layout: post
title: "RCrawler ile Web Crawling İşlemi"
date: 2019-11-01
categories: 
  - "bilgisayar"
tags: 
  - "metin-madenciligi"
  - "veri-madenciligi"
---

Metin madenciliği yapabilmek için elde büyük miktarda verinin olması gereklidir. Bu miktardaki veriyi ancak ya hazır bulmak ya da web scraping adını verdiğimiz yöntemlerle web sayfalarından derlemek durumundayız. Bu durumda ise Python için kullanılacak scrapy, ve python selenium gibi kütüphanelerin yanında R için Rvest ve scrapeR gibi kütüphaneler bulunmaktadır.

R için Rcrawl adlı bir kütüphane daha bulunmaktadır. Bu kütüphaneyi yeni keşfettim. RCrawl kütüphanesinin diğerlerinden temel farkı scraping işleminde sayfa içerisinde scrape edilecek elementlerin yerlerini CSS veya XPath ile belirleme ihtiyacının olmaması. Bu durum sayfa içinde "iğne" arama külfetinden kurtarıyor. Ayrıca çok ama çok daha kısa kod ile scraping yapmayı sağlıyor.

```
library(Rcrawler)
Rcrawler(Website = "https://www.sayfa_adi.com/lg-mobile", 
                    no_cores = 4, 
                    no_conn = 4, 
                    crawlZoneCSSPat = c("#gridListView",".pagination"))
```

ASlında sadece web sayfasını parametre olarak versek de crawler sayfaları derlemeye ve bir klasöre atmaya başlıyor. Ancak bu kütüphanenin (şu adresteki [https://github.com/salimk/Rcrawler](https://github.com/salimk/Rcrawler) ) dokümantasyonunda gördüğüm çok iyi özellikler var. Bunlardan en önemlisi `no_cores` ve `no_conn` parametreleri bu parametreler aynı anda birden fazla scraping bağlantısı ile hızı arttırıyor.

Bu crawler epey agresif. Sayfada bulduğu her bağlantıyı açarak o bağlantıyı ve altındaki bağlantıları da alıyor. Bu durum daha sonra baş edilmesi güç miktarda ilgili ilgisiz verinin gelmesine neden olabilir. Bunu engellemek için `crawlZoneCSSPat` parametresi mevcut, bu parametre saydada sadece ilgili CSS selectorü ile tanımlı yerdeki linkleri (mesela haber linki, yorumlar vs.) açıyor, sayfadaki diğer ilgisiz linklere izin vermiyor.

Kütüphane dokümantasyonunda ayrıca URL parametresi ile filtreleme, proxy ekleme, sadece belli bir url listesini indirme gibi özelliklerin yanında sayfalar arası bağlantıları network grafiği ile gösterme gibi harika özellikler de mevcut.

Keyifli kullanımlar...
