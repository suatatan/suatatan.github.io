---
title: "Basit bir Jquery news slider uygulaması"
date: 2011-09-20
categories: 
  - "bilgisayar"
tags: 
  - "jquery"
  - "web-programlama"
---

İnternette bulunan yüzlerce karmaşık news slider ya da content slider scriptinden sıkıldıysanız, aşağıda "kendi ellerimle" hazırladığım Jquery news slideri tam size göre.

Aşağıdaki kodları indirip bir html dosyasına kayderek direkt olarak çalıştırabilirsiniz.

Sorularınız olursa çekinmeden sorunuz.

```
<!--
This script aims teaching a simple news slider application
By Suat ATAN
suatatan.wordpress.com
All rights reserved

Basit bir jquery haber akış uygulaması
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
				$(".slide").not(":first").hide();

				$(".slide-hook").mouseover(function() {
					var index = $(".slide-hook").index(this);

					$(".slide").hide();
					$(".slide:eq(" + index + ")").show();

					$(".slide-hook").css("color", "black");
					$(this).css("color", "red");
				});
			});
			//dr
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
			.slide{
				
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
						<h2>Title 1</h2>
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
