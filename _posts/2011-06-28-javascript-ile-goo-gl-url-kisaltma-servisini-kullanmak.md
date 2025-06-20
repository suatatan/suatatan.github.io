---
categories:
- bilgisayar
date: 2011-06-28
layout: post
tags:
- turkish
- longread
- technology
- web-programlama
title: Javascript ile Goo.gl url kısaltma servisini kullanmak
---

Goo.gl ve benzeri binlerce API'nin internette hizmet verdiğini biliyoruz. API'ler JSON veya XML veri ile gönderilen taleplere aynı dillerle cevap veren güzel web uygulamalarıdır. API'ler yardımı ile siteniz içinden başka sitelerin verdiği hizmetleri sunabiliyorsunuz. Ancak API'leri kullanmak bazen sorun olabiliyor. Aşağıda, uzun çabalardan sonra [jsonlib.js](http://call.jsonlib.com/ "Jsonlib kütüphanesinin sayfası") adlı javascript kütüphanesini kullanarak goog.gl servisi üzerinden istediğimiz url'yi kısaltıp ekrana yazıyoruz.

Goog.gl servisi url kısaltma servisine göndereceğimiz talebin aşağıdaki gibi olması gerektiğin söylüyor:

```
POST https://www.googleapis.com/urlshortener/v1/url 
```

Şimdi biz de aşağıdaki kodlar yardımı ile ona istediği gibi bir talep gönderiyoruz:

```
<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript" src="http://www.google.com/jsapi">
        </script>

		<script type="text/javascript" src="jsonlib.js">
        </script>
        <script type="text/javascript">
            google.load("jquery", "1.4.2");
        </script>
        <script type="text/javascript">

            var myurl = "https://www.googleapis.com/urlshortener/v1/url";
            var api_key = "AIzaSyAXvgTJTH5Csher0h3W6TVDSUWefoxYNsw";

            var URL = myurl + "?key=" + api_key;
            var kisaltilacak_url = "http://suatatan.wordpress.com";

            jsonlib.fetch({
                url: 'https://www.googleapis.com/urlshortener/v1/url',
                header: 'Content-Type: application/json',
                method: 'POST',
                data: JSON.stringify({
                    longUrl: kisaltilacak_url
                })
            }, function(m){
                /* … */

				var obj = jQuery.parseJSON(m.content);
				$("#uzun_url").html(kisaltilacak_url);
				$("#kisaltilmis_url").attr("href",obj.id);
				$("#kisaltilmis_url").html(obj.id)

            });
        </script>
    </head>
    <body>
        <h1>Goo.gl url kisaltma servisinin jquery ile kullanimi</h1>
        <span id="uzun_url"></span>
        <a id="kisaltilmis_url" href="#"></a>
    </body>
</html>
```

Bunun üzerine kodlarımızı servise bağlanıp sonucu alıyor ve ekrana şöyle yansıtıyor:

[![](/images/ekran-alc4b1ntc4b1sc4b1.jpg "Ekran Alıntısı")](http://suatatan.wordpress.com/wp-content/uploads/2011/06/ekran-alc4b1ntc4b1sc4b1.jpg)
