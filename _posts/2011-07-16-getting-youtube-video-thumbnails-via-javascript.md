---
layout: post
title: "Getting Youtube Video Thumbnails via Javascript"
date: 2011-07-16
categories: 
  - "bilgisayar"
  - "english"
tags: 
  - "web-programlama"
---

When you embedding youtube videos to your page, may be you want displaying video thumbnails for introduction. You don't need getting thumbnail images manually. You can get it with youtube videos key via javascript.

This script gets youtube video key, and creates regular youtube thumbnail image url. Notice that, Youtube would change regular thumbail image url sometimes.

This script also generating video embed code automatically.

Code is here:

```
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script type="text/javascript" src="http://www.google.com/jsapi"></script>
		<script type="text/javascript">google.load("jquery", "1.4.2");</script>
		<script type="text/javascript"></script>
		<script type="text/javascript">
			function getScreen( url, size ) {
				if(url === null) {
					return "";
				}

				size = (size === null) ? "big" : size;
				var vid;
				var results;

				results = url.match("[\\?&]v=([^&#]*)");

				vid = ( results === null ) ? url : results[1];

					return "http://i2.ytimg.com/vi/"+vid+"/default.jpg";

			}
			function youtube_video(video_key){

				return '[youtube http://www.youtube.com/watch?v='+video_key+'&w=425&h=349]';

			}

			$(document).ready(function(){

				thumb   = getScreen("uVLQhRiEXZs");
				$("body img").attr("src",thumb);
				$("body #videoarea").html(youtube_video("uVLQhRiEXZs"));

			});
		</script>
	</head>
	<body>
		Thumbnail:<br/>
		<img src="" alt="resm" /><br>
		Video:<br/>
		<div id="videoarea"></div>

	</body>
</html>
```
