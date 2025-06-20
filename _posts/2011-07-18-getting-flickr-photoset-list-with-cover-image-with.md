---
layout: post
title: "Getting Flickr Photoset List with cover image with Jquery"
date: 2011-07-18
categories: 
  - "bilgisayar"
  - "english"
  - "genel"
tags: 
  - "python"
  - "web-programlama"
---

Flickr API offers getting photoset list with simple API calling but response isn’t include the photoset cover image. For resolving this problem, i have wrote a javascript block:  
  
Code is here:  

```
/*  flickr-json-sets-cover.js Coded By Suat ATAN Flickr API connection over JSON 06HAZ2011-14:43 * All rihts reserved * */var api_key="your_api_key";var user_id="64925203@N02";function f_getcoverimage(photoset_id){		  $.ajax({              type: 'GET',              url: "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key="+api_key+"&photoset_id="+photoset_id+"+&extras=url_m%2Curl_t%2Curl_sq%2Curl_s&format=json&nojsoncallback=1",              dataType: "json",              success: function(jsondata){              			//gets first thumbnail                 		obj=jsondata.photoset.photo[0];						var title=obj.title;						var url_m=obj.url_m;						var url_s=obj.url_s;						var url_sq=obj.url_sq;						var url_t=obj.url_t;						$("a#"+photoset_id).prev(".imgholder").html("");              }          });}//function f_getlist(){	$.ajax({        type: 'GET',        url: "http://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key="+api_key+"&user_id="+user_id+"&format=json&nojsoncallback=1",        dataType: "json",        success: function(jsondata){            $.each((jsondata.photosets.photoset), function(i,set){				var title=set.title._content;				var id=set.id;                f_getcoverimage(id);				$("#list").append(""+title+ "");            });        }    });}//$(document).ready(function(){	myc=new f_getlist();});
```

  
HTML file:  

```
http://www.google.com/jsapi            google.load("jquery", "1.4.2");        http://flickr-json-sets-cover.js
```

  
This script connects your Flickr account via Flickr API, retrieves photoset list, and for each photoset uses Flickr API getPhotos function, this function response includes all image of photosets. We retrieving with  obj=jsondata.photoset.photo\[0\]; code, only first image as cover image.
