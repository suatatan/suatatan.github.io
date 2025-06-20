---
categories:
- bilgisayar
- genel
date: 2010-12-03
layout: post
tags:
- english
- longread
- technology
- web-programlama
title: Python ile Url Post kullanarak web sayfalarına konsol üzerinden veri yollamak
---

```
import urllibimport urllib2url = 'http://suatatan.com/addmessage'values = {    'sender_name' : 'Cemil',    'sender_mail' : 'cemil@cemile.com',    'text' : 'otomatik mesaj' 	  }data = urllib.urlencode(values)talep = urllib2.Request(url, data)cevap = urllib2.urlopen(talep)cevap_metni = cevap.read()print cevap_metni
```

  
suatatan.wordpress.com  

Bu uygulama python konsolunda çalıştırıldığı zaman belirtilen url'ye belirtilen datalar yollanır ve sonuç ekrana print edilir.  Buradaki url web formun kendisi değil data yollanacak web formdaki html dosyalarında

tagında action ile yönlendirilen site olmalıdır. Values değerleri ise array formunda olup, data yollancak web formundaki tagları arasındaki input,radio button, textarea gibi elementlerin ID değerleri ve gönderilmek istenen değerleridir.
