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
title: Jquery ile Nasıl XML parsing (okuma) yapılır
---

Zaman gazetesi RSS yayınının channel düğümü içindeki title değerini çekmek için ömce Jquery ajax fonksiyonu ile get edip sonra xml'i standart dom hiyerarşisi içinde okuyup ekrana alert ediyoruz.  

```
http://www.google.com/jsapihttp://jsonlib.js            google.load("jquery", "1.4.2");        $(document).ready(function(){	$.ajax({  type: 'GET',  url: "http://www.zaman.com.tr/anasayfa.rss",  data: {    key: "value"  },  dataType: "xml",  success: function(xml){    var clientid = $(xml).find('channel > title').text();    alert(clientid);//suatatan.wordpress.com  }   });});        
```
