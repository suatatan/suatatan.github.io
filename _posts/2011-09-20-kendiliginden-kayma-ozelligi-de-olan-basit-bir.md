---
layout: post
title: "Kendiliğinden kayma özelliği de olan basit bir Jquery content slider"
date: 2011-09-20
tags: 
  - "bilgisayar"
  - "jquery"
  - "web-programlama"
---

Bundan önceki [yazımızda](http://suatatan.wordpress.com/2011/09/20/basit-bir-jquery-news-slider-uygulamasi/) kendiliğinden kaymayan yanlızca kullanıcı sayıların üzerine gelince kayan bir “kayar haber” scripti hazırlamıştık. Şimdi ise sitesini hazırladığım bir arkadaşımızın talebi üzerine, çoğu haber sitesinde olduğu gibi kullanıcı karışmasa dahi kendiliğinden kayma efekti veriyoruz.  

```
<!--This script aims teaching a simple news slider applicationBy Suat ATANsuatatan.wordpress.comAll rights reservedBasit bir jquery haber akış uygulaması-otomatik akış da dahil edildiHer hakkı saklıdır-->Suat ATAN's Simple News Sliderhttp://www.google.com/jsapi			google.load("jquery", "1.4.2");					$(document).ready(function() {				/*HUMAN INTERACT*/				$(".slide").not(":first").hide();				$(".slide-hook").mouseover(function() {					var index = $(".slide-hook").index(this);					$(".slide").hide();					$(".slide:eq(" + index + ")").show();					$(".slide-hook").css("color", "black");					$(this).css("color", "red");				});				/*AUTOSCROLL*/				var timer = setInterval(rotate, 4000);			});			//dr			function rotate() {				var cur_slide = $(".slide:visible");				var ls_slide = $(".slide:last");				var fr_slide = $(".slide:first");				if(cur_slide.html() != ls_slide.html()) {					cur_slide.hide();					cur_slide.next(".slide").show();				} else {					cur_slide.hide();					fr_slide.show();				}			}					.slide-hook {				float: left;				padding: 5px;				background-color: #990000;				border-right: solid 1px #C2E1EF;			}			.slide-image {				width: 500px;				height: 375px;			}			#slider {				width: 500px;				height: 550px;			}			.slide {			}		Title 1						Akdamar Church, Akdamar. Gurpinar Gevas, Surp MarinosTitle 2						Suat ATAN,Akdamar Church, Akdamar. Gurpinar Gevas, Surp MarinosTitle 3						Havasor,Akdamar Church, Akdamar. Gurpinar Gevas, Surp Marinos 3Title 4						Akdamar Church, Akdamar. Gurpinar Gevas, Surp Marinos				1				2				3				4
```

  
Burada mantık şudur: rotate fonksiyonumuz o anda “visible” yani görünür olan “slide” elemanını saklayıp, bir sonraki “visible” ediyor. En son slide'a gelince onu da saklayıp bu kez ilk elemanı visible ediyor.  
  
Bu fonksiyonu da setInterval ile 4000 milisaniyede bir çağırıyoruz. setIntetval fonksiyonu aslında bir tetik fonksiyon. Bir insanın düzenli olarak aynı hareketi yapması gibi bir durum. Gerisi tamamen zamanlama dışı klasik fonksiyonlar.
