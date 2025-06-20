---
categories:
- bilgisayar
date: 2011-07-08
layout: post
tags:
- english
- longread
- technology
- web-programlama
title: CSS ile tüm tarayıcılarda çalışan kutu gölge efekti
---

İstediğiniz div elementine aşağıdaki classı atayarak gölge verebilirsiniz

Örnek:

[http://www.webtoolkit.info/demo/css-drop-shadow](http://www.webtoolkit.info/demo/css-drop-shadow)

```
.golgeli_kutu {
/*Suat ATAN suatatan.wordpress.com*/
	-moz-box-shadow: 3px 3px 4px #000;
	-webkit-box-shadow: 3px 3px 4px #000;
	box-shadow: 3px 3px 4px #000;
	/* For IE 8 */
	-ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000')";
	/* For IE 5.5 - 7 */
	filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');
}
```
