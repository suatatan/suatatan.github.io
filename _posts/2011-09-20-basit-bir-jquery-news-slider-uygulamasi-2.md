---
title: "Basit bir Jquery news slider uygulaması"
date: 2011-09-20
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "jquery"
  - "web-programlama"
---

İnternette bulunan yüzlerce karmaşık news slider ya da content slider scriptinden sıkıldıysanız, aşağıda “kendi ellerimle” hazırladığım Jquery news slideri tam size göre.  
  
Aşağıdaki kodları indirip bir html dosyasına kayderek direkt olarak çalıştırabilirsiniz.  
  
Sorularınız olursa çekinmeden sorunuz.  

```
<!--This script aims teaching a simple news slider applicationBy Suat ATANsuatatan.wordpress.comAll rights reservedBasit bir jquery haber akış uygulamasıHer hakkı saklıdır-->Suat ATAN's Simple News Sliderhttp://www.google.com/jsapi			google.load("jquery", "1.4.2");					$(document).ready(function() {				$(".slide").not(":first").hide();				$(".slide-hook").mouseover(function() {					var index = $(".slide-hook").index(this);					$(".slide").hide();					$(".slide:eq(" + index + ")").show();					$(".slide-hook").css("color", "black");					$(this).css("color", "red");				});			});			//dr					.slide-hook {				float: left;				padding: 5px;				background-color: #990000;				border-right: solid 1px #C2E1EF;			}			.slide-image {				width: 500px;				height: 375px;			}			.slide{							}					Title 1						Akdamar Church, Akdamar. Gurpinar Gevas, Surp MarinosTitle 2						Suat ATAN,Akdamar Church, Akdamar. Gurpinar Gevas, Surp MarinosTitle 1						Havasor,Akdamar Church, Akdamar. Gurpinar Gevas, Surp Marinos 3Title 4						Akdamar Church, Akdamar. Gurpinar Gevas, Surp Marinos				1				2				3				4
```
