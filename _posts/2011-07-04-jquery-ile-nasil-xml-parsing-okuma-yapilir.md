---
title: "Jquery ile Nasıl XML parsing (okuma) yapılır"
date: 2011-07-04
categories: 
  - "bilgisayar"
tags: 
  - "web-programlama"
---

Zaman gazetesi RSS yayınının channel düğümü içindeki title değerini çekmek için ömce Jquery ajax fonksiyonu ile get edip sonra xml'i standart dom hiyerarşisi içinde okuyup ekrana alert ediyoruz.

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
$(document).ready(function(){

	$.ajax({
  type: 'GET',
  url: "http://www.zaman.com.tr/anasayfa.rss",
  data: {
    key: "value"
  },
  dataType: "xml",
  success: function(xml){
    var clientid = $(xml).find('channel > title').text();
    alert(clientid);
//suatatan.wordpress.com
  }   
});

});

        </script>
    </head>
    <body>

    </body>
</html>
```
