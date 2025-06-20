---
title: "Kendiliğinden kayma özelliği de olan basit bir Jquery content slider"
date: 2011-09-20
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "jquery"
  - "web-programlama"
---

Bundan önceki [yazımızda](http://suatatan.wordpress.com/2011/09/20/basit-bir-jquery-news-slider-uygulamasi/) kendiliğinden kaymayan yanlızca kullanıcı sayıların üzerine gelince kayan bir "kayar haber" scripti hazırlamıştık. Şimdi ise sitesini hazırladığım bir arkadaşımızın talebi üzerine, çoğu haber sitesinde olduğu gibi kullanıcı karışmasa dahi kendiliğinden kayma efekti veriyoruz.

```
<!--
This script aims teaching a simple news slider application
By Suat ATAN
suatatan.wordpress.com
All rights reserved

Basit bir jquery haber akış uygulaması-otomatik akış da dahil edildi
Her hakkı saklıdır
-->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<title>Suat ATAN's Simple News Slider</title>
		<!--JQUERY-->
		<script type="text/javascript" src="http://www.google.com/jsapi"></script>
		<script type="text/javascript">
			google.load("jquery", "1.4.2");

		</script>
		<!--OUR SCRIPT-->
		<script type="text/javascript">
			$(document).ready(function() {
				/*HUMAN INTERACT*/
				$(".slide").not(":first").hide();

				$(".slide-hook").mouseover(function() {
					var index = $(".slide-hook").index(this);

					$(".slide").hide();
					$(".slide:eq(" + index + ")").show();

					$(".slide-hook").css("color", "black");
					$(this).css("color", "red");
				});
				/*AUTOSCROLL*/
				var timer = setInterval(rotate, 4000);

			});
			//dr
			function rotate() {
				var cur_slide = $(".slide:visible");
				var ls_slide = $(".slide:last");
				var fr_slide = $(".slide:first");

				if(cur_slide.html() != ls_slide.html()) {
					cur_slide.hide();
					cur_slide.next(".slide").show();

				} else {
					cur_slide.hide();
					fr_slide.show();
				}
			}
		</script>
		<!--CSS-->
		<style type="text/css">
			.slide-hook {
				float: left;
				padding: 5px;
				background-color: #990000;
				border-right: solid 1px #C2E1EF;
			}
			.slide-image {
				width: 500px;
				height: 375px;
			}
			#slider {
				width: 500px;
				height: 550px;
			}
			.slide {
			}

		</style>
	</head>
	<body>
		<div id="slider-capsule">
			<div id="slides">
				<!--Slide-->
				<div class="slide">
					<div class="slide-title">
						<h2>Title 1</h2>
					</div>
					<div class="slide-text">
						Akdamar Church, Akdamar. Gurpinar Gevas, Surp Marinos
					</div>
					<div class="slide-image">
						<img src="http://farm5.static.flickr.com/4004/4612662356_888c2a81ca.jpg" alt="slide-image">
					</div>
				</div>
				<!--Slide-->
				<div class="slide">
					<div class="slide-title">
						<h2>Title 2</h2>
					</div>
					<div class="slide-text">
						Suat ATAN,Akdamar Church, Akdamar. Gurpinar Gevas, Surp Marinos
					</div>
					<div class="slide-image">
						<img src="http://farm6.static.flickr.com/5008/5307303826_a33a56c1ae.jpg" alt="slide-image">
					</div>
				</div>
				<!--Slide-->
				<div class="slide">
					<div class="slide-title">
						<h2>Title 3</h2>
					</div>
					<div class="slide-text">
						Havasor,Akdamar Church, Akdamar. Gurpinar Gevas, Surp Marinos 3
					</div>
					<div class="slide-image">
						<img src="http://farm4.static.flickr.com/3574/3341953499_ab044c925a.jpg" alt="slide-image">
					</div>
				</div>
				<!--Slide-->
				<div class="slide">
					<div class="slide-title">
						<h2>Title 4</h2>
					</div>
					<div class="slide-text">
						Akdamar Church, Akdamar. Gurpinar Gevas, Surp Marinos
					</div>
					<div class="slide-image">
						<img src="http://farm4.static.flickr.com/3564/3342789118_9de9992351.jpg" alt="slide-image">
					</div>
				</div>
			</div>
		</div>
		<div id="slider-navig">
			<div class="slide-hook">
				1
			</div>
			<div class="slide-hook">
				2
			</div>
			<div class="slide-hook">
				3
			</div>
			<div class="slide-hook">
				4
			</div>
		</div>
		</div>
	</body>
</html>
```

Burada mantık şudur: rotate fonksiyonumuz o anda "visible" yani görünür olan "slide" elemanını saklayıp, bir sonraki "visible" ediyor. En son slide'a gelince onu da saklayıp bu kez ilk elemanı visible ediyor.

Bu fonksiyonu da setInterval ile 4000 milisaniyede bir çağırıyoruz. setIntetval fonksiyonu aslında bir tetik fonksiyon. Bir insanın düzenli olarak aynı hareketi yapması gibi bir durum. Gerisi tamamen zamanlama dışı klasik fonksiyonlar.
