---
date: 2007-04-24
layout: post
tags:
- turkish
- bilgisayar
- quickread
- technology
- web-programlama
title: MySQL'de Türkçe Karakter Sorunu Yaşamamak İçin.
---

Şimdiye Kadar Java'ka kod yazarken MySQL veri girişlerinde Türkçe karakter problemi yaşamamış da olabilirsiniz. Ancak her seferinde veritabanı bağlantı URL'sini yazarken aşağıdaki kodları da eklerseniz Türkçe karakter problemi yaşamazsınız.  
Mesela klasik bağlantı adresimiz şu olsun:  
  
c=DriverManager.getConnection(“jdbc:mysql://sunucuAdı/VeriTabanıAdı”);  
  
Bu adresin Türkçe Karakter Sorunu yaşatması yüksektir.  
  
Ancak adresi şu şekilde değiştirirsek:  
  
c=DriverManager.getConnection(“  
jdbc:mysql://sunucuAdı/VeriTabanıAdı?useUnicode=true&characterEncoding=latin5  
”);  
  
Türkçe karakter sorunu yaşamayız.  
(Yukarıdaki kodlarda veritabanı kullanıcı adı ve şifre girilmemiştir. Gerektiği takdirde getConnection fonksiyonu içinde String karakter olarak 2. ve 3. parametere olarak kullanıcı adı ve şife girilebilir.)
