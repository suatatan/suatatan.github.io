---
layout: post
title: "Getting Youtube Video Thumbnails via Javascript"
date: 2011-07-16
categories: 
  - "bilgisayar"
  - "english"
  - "genel"
tags: 
  - "web-programlama"
---

When you embedding youtube videos to your page, may be you want displaying video thumbnails for introduction. You don’t need getting thumbnail images manually. You can get it with youtube videos key via javascript.  
  
This script gets youtube video key, and creates regular youtube thumbnail image url. Notice that, Youtube would change regular thumbail image url sometimes.  
  
This script also generating video embed code automatically.  
  
Code is here:  

```
http://www.google.com/jsapigoogle.load("jquery", "1.4.2");			function getScreen( url, size ) {				if(url === null) {					return "";				}				size = (size === null) ? "big" : size;				var vid;				var results;				results = url.match("[\?&]v=([^&#]*)");				vid = ( results === null ) ? url : results[1];					return "http://i2.ytimg.com/vi/"+vid+"/default.jpg";			}			function youtube_video(video_key){				return '[youtube http://www.youtube.com/watch?v='+video_key+'&w=425&h=349]';			}			$(document).ready(function(){				thumb   = getScreen("uVLQhRiEXZs");				$("body img").attr("src",thumb);				$("body #videoarea").html(youtube_video("uVLQhRiEXZs"));			});				Thumbnail:		Video:
```
