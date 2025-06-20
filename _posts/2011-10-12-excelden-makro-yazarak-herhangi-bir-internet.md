---
layout: post
title: "Excelden makro yazarak herhangi bir internet sitesini otomatik olarak
açmak"
date: 2011-10-12
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "excel"
  - "excel-vba"
---

Excel makroları ile ya da diğer adı ile VBA ile yapılamaycak şey yok gibi. Şimdi diyelim ki bir excel tablosu ile çalışırken, döviz kurları ve benzeri bir veriyi almak için sürekli ve sıkça aynı web sitesini açıp bakmanız gerekiyor. Bunu elle yapmak yerine excel içerisine bir makro yazarak, makroya ister kısayol eklemek suretiyle ister bir butona atamak suretiyle  otomatik olarak internet sitesini excel içinde açabilirsiniz.  
  
  
Bunun direkt kodu vermek yerine teker teker ekran görüntüleri ile yapılışını gösteriyorum  
  
  
Önce excel tablomuzu açıyor (2007 versiyon), Geliştirici sekmesinde Visual Basic butonunu tıklıyoruz.  
  
  
[![](/images/excel_vba1.png)](http://suatatan.wordpress.com/wp-content/uploads/2011/10/excel_vba1.png?w=280)  
  
  
Sonra açılan VBA ekranımıza kodlarımızı ekliyoruz.  
  
  
[![](/images/excal_vba2.png)](http://suatatan.wordpress.com/wp-content/uploads/2011/10/excal_vba2.png?w=300)  
  
  
  
En son olarak excel sayfamıza dönüp makromuzu test ediyoruz.  
  
  
Açılan ekranda gelştirici sekmesinde makroları tıklayıp, GoToWebsite adlı fonksiyonu seçip çalıştır dediğimizde açılmasını istediğimiz suatatan.wordpress.com isimli sayfamız açılıyor.  
  
  
  
[![](/images/excal_vba3.png)](http://suatatan.wordpress.com/wp-content/uploads/2011/10/excal_vba3.png?w=300)  
  
  
  
Bu da kodlar  
  
  
  

```
Sub GoToWebSite()Dim appIE As Object ' InternetExplorerDim sURL As StringApplication.ScreenUpdating = FalseSet appIE = CreateObject("InternetExplorer.Application")sURL = "http://www.codeforexcelandoutlook.com"With appIE    .Navigate sURL    .Visible = TrueEnd WithApplication.ScreenUpdating = TrueSet appIE = NothingEnd Sub
```
