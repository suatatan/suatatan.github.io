---
categories:
- bilgisayar
- genel
date: 2012-10-23
layout: post
tags:
- english
- google-app-script
- longread
- technology
title: Google App Script ile basit bir mesaj formu uygulaması
---

[![](/images/e2f73-gascript_ornek1.jpg)](https://suatatan.wordpress.com/wp-content/uploads/2012/10/e2f73-gascript_ornek1.jpg)

Google App Script ile daha önce Google E-tablolar üzerinde nasıl script yazabileceğimizi görmüştük. Bu Google App Script'ler Excel için ne ise Google Drive (eski adı ile Google Dökümanlar) için de aynı şey olmaktadır.  
Google App Script işi daha da ilerleterek, cloud veritabı ve bağımsız uygulama yayınlama imkanını da verdi sonunda.  
Bu son hizmeti de öğrenir öğrenmez, siz değerli okurlarım için bağımsız uygulama yazma anlamında basit bir form işleyici hizmetinini nasıl yazılacağını aşağıda paylaşıyorum.  
  
Sayfanın çalışır hali için [burayı tıklayın](https://script.google.com/macros/s/AKfycbyJa_t9r9ZoI-SnGN4SzqDgQ_SZFgwaOPhJgpCcBE4/dev)  
  
Bu sayfaya ait kodları görmek için [burayı tıklayın](https://script.google.com/d/1_fGeafWq1T3YxNhOmbYZgW-Wirgl_rySwOSmw_r0ITddfDm4hGtu_of8/edit)  
  
İşlevi yapan Google App Script kodu ise şudur:  
  
  

```
//blog.suatatan.comfunction doGet(e) {  var template = HtmlService.createTemplateFromFile('Arayuz');  template.action = ScriptApp.getService().getUrl();  return template.evaluate();}function doPost(e) {  var template = HtmlService.createTemplateFromFile('Tesekkur.html');  template.name = e.parameter.name;  template.comment = e.parameter.comment;  template.screenshot = e.parameter.screenshot;  return template.evaluate();}
```
