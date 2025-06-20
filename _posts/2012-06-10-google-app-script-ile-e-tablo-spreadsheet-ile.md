---
categories:
- bilgisayar
- genel
date: 2012-06-10
layout: post
tags:
- turkish
- excel
- excel-vba
- google-app-script
- longread
- technology
title: Google App Script ile e-tablo (spreadsheet) ile entegre zengin form oluşturma
---

Google App ile excel tablolarının Google dökümanlardaki muadili olan Google e-tablolara entegre formlar yazabiliriz:  
Aşağıdaki gibi:  

[![](/images/97072-googleapp2.jpg)](https://suatatan.wordpress.com/wp-content/uploads/2012/06/97072-googleapp2.jpg)

  

  

Bunu oluşturabilmek için Araçlar> Komut dosyası yöneticisini kullanıyoruz.

Aşağıdaki gibi kodlarımızı yazıyoruz:

[![](/images/879b6-google_app_script1.jpg)](https://suatatan.wordpress.com/wp-content/uploads/2012/06/879b6-google_app_script1.jpg)

  

Kodlarımızı yazdıktan sonra üçgene basarak form\_goster fonksiyonumuzu çalıştırınca ilk resimdek form çıkıyor. Bu forma girilen veri form\_isle fonksiyonu ile A1 hücresine yazdırılacak.

  

Açıklamalı kodlarımız aşağıda:

**function form\_goster()** {

  //Uygulama oluştur

  var app=UiApp.createApplication();

  app.setTitle(“Suat Google Apps Form”);

  //panel oluştur

  var panel=app.createVerticalPanel();

  //texbox oluştur

  var tf=app.createTextBox();

  //Ekle butonu oluştur

  var bt=app.createButton(“Ekle”);

  //oluşturulan texbota isim ata

  tf.setName(“ad”).setId(“ad”);

  //bu elemanları panele yerlestir

  panel.add(tf);

  panel.add(bt);

  //form submit edilince yapilacak islem

  var formtetik=app.createServerHandler(“form\_isle”);

  //tetigi butona atadik

  bt.addClickHandler(formtetik);

  //is bitince panele don.

  formtetik.addCallbackElement(panel);

  //paneli de uygulamaya yerlerstir

  app.add(panel);

  //uygulamayi goster

  var doc=SpreadsheetApp.getActive();

  doc.show(app);

}

**function form\_isle(e)**{

  //calisan uygulamay ele al

  var app=UiApp.getActiveApplication();

  //formdan gelen veriyi cek

  var formdan\_gelen\_ad=e.parameter.ad;

  //bu veriyi ne yapalim. alip A1'e yazdiralim

  var sheet=SpreadsheetApp.getActiveSpreadsheet();

  sheet.getRange(“A1”).setValue(formdan\_gelen\_ad);

  

}
