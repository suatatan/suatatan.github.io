---
categories:
- bilgisayar
- genel
date: 2011-10-12
layout: post
tags:
- turkish
- excel
- excel-vba
- longread
- technology
title: Excel VBA ile hızlı veri işleme
---

Excel'de bir hücreye yazı yazmak için çift tıklanıp girildiği, yazının bitiminde ise başka hücreye geçmek için ilgili hücreye tıklanarak veri girildiği bilinmektedir.  
Bu rutin büyük çaplı excel dosyaları üzerinde çalışırken sıkıntı verebilmektedir. Ayrıca değiştirilen yerlerin hangisi değişti, hangisi değişmedi diye bulmak zahmet olmaktadır.  
Bunun için bir VBA makrosu geliştirdim.  
Siz istediğiniz hücredeyken, tıklama yapmaksızın Ctrl+q tuş kombinasyonunu çalıştırdığınızda açılan veri girme formuna verinizi girip tamam dediğiniz anda, ilgili hücreye veri giriyor ve arka plan sarı renge boyanıyor.  
Böylece formlar üzerindeki değişikliği hızla gerçekleştirebiliyorsunuz.  

[![](/images/hizli_edit.png)](http://suatatan.wordpress.com/wp-content/uploads/2011/10/hizli_edit.png?w=300)

  
İşte kodlar:  

```
Sub IstediginHucreyeDirektVeriYazirma()Dim veri'' Mesela bir hucreyi secip ctrl+q diyince ' forma veri girildigi anda' girilen veri ayni anda ilgili hucreye islenir ' ve arka plan sari olur' Hizli tablo doldurma icin ideal cunku hucreleri ' secme ve yazma rutinleri olmuyor' Klavye Kısayolu: Ctrl+q' herkes-icin-excel.blogspot.com    ActiveCell.Select    veri = InputBox("Veri", "SZL")    ActiveCell.FormulaR1C1 = veri    ActiveCell.Select    With Selection.Interior        .Pattern = xlSolid        .PatternColorIndex = xlAutomatic        .Color = 65535        .TintAndShade = 0        .PatternTintAndShade = 0    End WithEnd Sub
```
