---
layout: post
title: "SQL Server'da metinden tarihe dönüşüm"
date: 2017-05-04
---

SQL Server'la uğraşan tüm sinir stres sahiplerine selam olsun. Kod yazmayı eziyete çeviren SQL Server'da metinden tarihe dönüşüm yaparken yine kırk fırın dökümana bakmak gerekiyor:)

`declare @tarih_metinsel varchar(20) declare @tarih_gercek datetime set @tarih_metinsel='2017-01-01' select CONVERT(datetime, @tarih_metinsel, 103) select @tarih_metinsel`

Şimdi bu 103 nedir diyeceksiniz? Artist microsoft kendince metinden tarihe dönüşüm için YYYY-MM-DD gibi insani şablon kısaltmaları kullanmak yerine sayı vermiş. İşte [şurada](https://docs.microsoft.com/en-us/sql/t-sql/functions/cast-and-convert-transact-sql).
