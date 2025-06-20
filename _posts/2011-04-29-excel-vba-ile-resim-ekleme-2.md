---
categories:
- bilgisayar
- genel
date: 2011-04-29
layout: post
tags:
- english
- excel
- excel-vba
- longread
- technology
title: Excel VBA ile resim ekleme
---

Excel'de makro kaydederek resim eklemek sorunlu bir iştir. Bunun yerine makroyu elle yazarak resmin eklenmesini sağlayabilirsiniz.  
  
**Makro kodu şu**  

```
Sub AddPicture()SuatAtanResimYolu= "C:/resimler/resim.jpg"Set MyPict = ActiveSheet.Pictures.Insert(SuatAtanResimYolu)End Sub
```

  
Bu kodda dikkat edeceğiniz husus SuatAtanResimYolu adlı değişkeni direkt resim.jpg diye tanımlama imkanı olmamasıdır. Ancak ve ancak makronunun çalışacağı bilgisayarda ilgili resmin bulunduğu yere resim konması gerekir.  
  
Bu kodu bir kere yazdıktan sonra makronuza kısa yol tuşu atayarak istediğiniz her sayfaya hızlı bir şekilde sabit resim (imza, logo vb) ekleyebilirsiniz. Ayrıca yanılmıyorsam resmi gif olarak eklemek sorun oluyor o yüzden jpg olarak eklemekte fayda var.  
  
Güzel değil mi? Suat ATAN Hayratıdır.
