---
title: "Jquery ile Json üzerinden Flickr API'den Photoset listesini çekme"
date: 2011-07-06
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "web-programlama"
---

Jquery ile Json üzerinden Flickr'dan Photoset listesini çekme.  
  
Bu işlemi XML ile de yapabilirsiniz. Ancak XML ile veri çekmede bazı tarayıcıların sorun çıkardığı bilinmektedir.  
  
Bu işlemde çekilen veri özünde şöyledir:  

```
{ "photosets": {     "photoset": [      { "id": "72157615225362287", "primary": "3355353579", "secret": "79b90d42b4", "server": "3642", "farm": 4, "photos": 8, "videos": 0,         "title": { "_content": "Savacık (Hevşersork) Köyü" },         "description": { "_content": "" }, "needs_interstitial": 0, "visibility_can_see_set": 1, "view_count": 8, "comment_count": 0, "date_create": "1237109725", "date_update": "1298974785" },      { "id": "72157615289368888", "primary": "3356124028", "secret": "2c4c06b945", "server": "3619", "farm": 4, "photos": 1, "videos": 0,         "title": { "_content": "Gürpınardan İnsanlar" },         "description": { "_content": "" }, "needs_interstitial": 0, "visibility_can_see_set": 1, "view_count": 5, "comment_count": 0, "date_create": "1237107447", "date_update": "1305634356" },      { "id": "72157615087527889", "primary": "3350386990", "secret": "4fc9419811", "server": "3647", "farm": 4, "photos": 4, "videos": 0,         "title": { "_content": "Gürpınar Belediyesince Satın Alınan Araçlar ile yaptırılan 5 adet dükkan ve 1 adet çok amaçlı salonun açılışı" },         "description": { "_content": "" }, "needs_interstitial": 0, "visibility_can_see_set": 1, "view_count": 1, "comment_count": 0, "date_create": "1236900177", "date_update": "1305634064" },      { "id": "72157615062626426", "primary": "3344160160", "secret": "194d724526", "server": "3398", "farm": 4, "photos": 43, "videos": 0,         "title": { "_content": "Gürpınar Tutak(Çalyan) Köyü" },         "description": { "_content": "" }, "needs_interstitial": 0, "visibility_can_see_set": 1, "view_count": 2, "comment_count": 0, "date_create": "1236686529", "date_update": "1305634026" },      { "id": "72157615038911590", "primary": "3341951173", "secret": "8af2f20618", "server": "3330", "farm": 4, "photos": 31, "videos": 0,         "title": { "_content": "Gürpınar Fotoğrafları Genel" },         "description": { "_content": "Gürpınar'In çeşitli yerlerinden çekilmiş fotoğraflar" }, "needs_interstitial": 0, "visibility_can_see_set": 1, "view_count": 13, "comment_count": 0, "date_create": "1236639146", "date_update": "1305633976" },      { "id": "72157614966885463", "primary": "3201754828", "secret": "f159edc278", "server": "3510", "farm": 4, "photos": 7, "videos": 0,         "title": { "_content": "Mustafa Çalağan Sergisi" },         "description": { "_content": "" }, "needs_interstitial": 0, "visibility_can_see_set": 1, "view_count": 19, "comment_count": 0, "date_create": "1236636591", "date_update": "1300373248" },      { "id": "72157612270581407", "primary": "3178927303", "secret": "15f09018ce", "server": "3381", "farm": 4, "photos": 1, "videos": 0,         "title": { "_content": "HAVASOR.COM" },         "description": { "_content": "" }, "needs_interstitial": 0, "visibility_can_see_set": 1, "view_count": 2, "comment_count": 0, "date_create": "1231419763", "date_update": "1305629237" }    ] }, "stat": "ok" }
```

  
   
  
Bu veriyi okumak için bu verilerin bulunduğu url kullanarak verileri çekiyoruz. Daha sonra each fonksiyonu  
ile başlık değerlerini teker teker tt değişkenimize atıyoruz.  

```
http://www.google.com/jsapi            google.load("jquery", "1.4.2");                    $(document).ready(function(){                $.ajax({                    type: 'GET',                    url: "http://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=8e0046057d82d0d918f461384718f101&user_id=8623603%40N06&format=json&nojsoncallback=1",                    dataType: "json",                    success: function(jsondata){                        $.each((jsondata.photosets.photoset), function(i,set){							var tt=set.title._content                            $("body").append(tt+"")                        });                    }                });            });        
```
