---
layout: post
title: "Python ile Flickr API-1"
date: 2011-08-18
categories: 
  - "bilgisayar"
tags: 
  - "python"
---

## Flickr Hesabınızdaki photoset isimlerini listeleme:

Kodumuzu yazmadan önce Python Flickr API'yi indirip projemize dahil ederiz sonra:

```
import flickrapi

api_key = 'sizin kendi api keyiniz'

flickr = flickrapi.FlickrAPI(api_key)
flickr = flickrapi.FlickrAPI(api_key, format='etree')

sets = flickr.photosets_getList(user_id='kendi user idiniz')

fotoset = sets.find('photosets').findall('photoset')
for i in fotoset:
	print i.find('title').text
```

Burada flickr api gelen aşağıdaki xml verisini

```
<rsp stat='ok'>
    <photosets cancreate="1">
        <photoset id="5" primary="2483" secret="abcdef"
                server="8" photos="4">
            <title>Test</title>
            <description>foo</description>
        </photoset>
        <photoset id="4" primary="1234" secret="832659"
                server="3" photos="12">
            <title>My Set</title>
            <description>bar</description>
        </photoset>
    </photosets>
</rsp>
```

etree kütüphanesi ile (python 2.4 ve üstü için) ile ayıklar ve sonra for döngüsü ile title değerlerini alırız:
