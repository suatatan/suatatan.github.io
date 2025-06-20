---
categories:
- bilgisayar
- genel
date: 2011-08-18
layout: post
tags:
- english
- longread
- python
- technology
title: Python ile Flickr API-1
---

## Flickr Hesabınızdaki photoset isimlerini listeleme:

  
Kodumuzu yazmadan önce Python Flickr API'yi indirip projemize dahil ederiz sonra:  

```
import flickrapiapi_key = 'sizin kendi api keyiniz'flickr = flickrapi.FlickrAPI(api_key)flickr = flickrapi.FlickrAPI(api_key, format='etree')sets = flickr.photosets_getList(user_id='kendi user idiniz')fotoset = sets.find('photosets').findall('photoset')for i in fotoset:	print i.find('title').text
```

  
Burada flickr api gelen aşağıdaki xml verisini  

```
                server="8" photos="4">Testfoo                server="3" photos="12">My Setbar
```

  
etree kütüphanesi ile (python 2.4 ve üstü için) ile ayıklar ve sonra for döngüsü ile title değerlerini alırız:
