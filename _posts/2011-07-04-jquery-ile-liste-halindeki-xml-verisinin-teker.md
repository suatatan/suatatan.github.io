---
categories:
- bilgisayar
- genel
date: 2011-07-04
layout: post
tags:
- turkish
- quickread
- technology
- web-programlama
title: JQuery ile liste halindeki XML verisinin teker teker okunup yazılması
---

Bu kez Jquery ile mesela RSS yayınındaki haberler gibi liste halindeki verilerinn ekrana yazdırılmasını öğreniyoruz. Önceki yazımızda XML'yi ajax fonksiyonu ile get etmeyi öğrendik. Şimdi ise aldığımız XML verisindeki item düğümü altındaki title değerlerini each fonksiyonu ile tek tek bastırıyoruz.  

```
http://www.google.com/jsapihttp://jsonlib.js            google.load("jquery", "1.4.2");        $(document).ready(function(){	$.ajax({  type: 'GET',  url: "http://www.zaman.com.tr/anasayfa.rss",  data: {    key: "value"  },  dataType: "xml",  success: function(xml){	$.each($(xml).find('item > title'),function(){		$("body").append($(this).text()+"");        //suatatan.wordpress.com suat atan hayratıdır:)	});  }   });});        
```
