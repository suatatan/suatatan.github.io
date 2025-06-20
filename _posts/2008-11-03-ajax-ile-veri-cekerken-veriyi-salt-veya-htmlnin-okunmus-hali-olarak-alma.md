---
categories:
- bilgisayar
date: 2008-11-03
layout: post
tags:
- turkish
- longread
- technology
- web-programlama
title: AJAX ile veri çekerken veriyi salt veya HTML'nin okunmuş hali olarak alma
---

Aşağıda göreceğiniz fonksiyon kendisine gelen parametreye bağlanarak içerğini okur ve çalıştığı dökümanın güncellenmesini gerektirmeksizin (Zaten Ajax ile uğraştığımıza göre amaç bu) içeriğini ekrana yazar.

index.html dosyası:\------------------------------

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> <html> <head> <title>Suat ATAN Ajax Dersleri</title> <script type="text/javascript" src="ajax.js"></script>

</head> <body>

<p> <a href="http://checkip.dyndns.org/" onclick="grabFile(this.href); return false;"> IP Sorgula</a>

</p> <div id="hedef"></div> </body> </html>

ajax.js dosyası:\-------------------------------------------

// JavaScript Document Suat ATAN. suatatan.com \_ajax\_libraries function getHTTPObject() { var xhr = false; if (window.XMLHttpRequest) { xhr = new XMLHttpRequest(); } else if (window.ActiveXObject) { try { xhr = new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) { try { xhr = new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) { xhr = false; } } } return xhr; }

function grabFile(file) { var istek = getHTTPObject();//obje olusturuldu if (istek) { //istek gerceklestiridli istek.onreadystatechange = function() {

//durum degistigi zaman sonucu goster displayResponse(istek); //istek sonucugun goster }; istek.open("GET", file, true); //veri al istek.send(null);//bos gonder } }

function displayResponse(istek) { if (istek.readyState == 4) { //sonuc tam dondyse if (istek.status == 200 || istek.status == 304) { //hata yoksa var gelen\_deger=istek.responseText; var ana\_tag=document.getElementById("hedef"); var yeni\_icerik=document.createTextNode(gelen\_deger); ana\_tag.appendChild(yeni\_icerik); } } }

bu durumda index.html'  "<a href= " ibaresindeki http://www.checkip.dynds.org adresine bağlanan site bu sitenin html kodlarını createTextNode(gelen\_deger); metodu ile ekrana yazar.  Metot ilginç bir şekilde yeni oluşturulan değeri işlemeden ekrana basar.

aynı ajax.js kodlarını aşağıdaki gibi değiştirince ise: // JavaScript Document Suat ATAN. suatatan.com \_ajax\_libraries function getHTTPObject() { var xhr = false; if (window.XMLHttpRequest) { xhr = new XMLHttpRequest(); } else if (window.ActiveXObject) { try { xhr = new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) { try { xhr = new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) { xhr = false; } } } return xhr; }

function grabFile(file) { var istek = getHTTPObject();//obje olusturuldu if (istek) { //istek gerceklestiridli istek.onreadystatechange = function() {

//durum degistigi zaman sonucu goster displayResponse(istek); //istek sonucugun goster }; istek.open("GET", file, true); //veri al istek.send(null);//bos gonder } }

function displayResponse(istek) { if (istek.readyState == 4) { //sonuc tam dondyse if (istek.status == 200 || istek.status == 304) { //hata yoksa

var gelen\_deger=istek.responseText; var ana\_tag=document.getElementById("hedef"); var yeni\_tag=document.createElement("p"); ana\_tag.appendChild(yeni\_tag); yeni\_tag.innerHTML=gelen\_deger

//Geri zekalı forum manyaklarınca bu içeriklerin de eni sonu kopyalanacağını biliyorum ancak onlar //da bilsinler ki bu metnin her satırı emekle yazıldı. Kopyala yapıştır ile değil. (Suat ATAN) } } }

http://checkip.dyndsn.org sitesine bağlanan index.html dosyası veriyi HTML olarak değil işlenmiş olarak basar.

Burada fark şundan olur. Normal şartlarda AJAX ile hangi dosya çekilirse o dosyanın olduğu gibi çekilmesi sağlanır. innerHTML metodu ise çekilen HTML verisini işler.

Ajax ile çekilecek verilerin XML veya JSON olarak da çekme yöntemleri vardır.  Ancak HTML olarak veri çekmek ve özellikle de innerHTML metodu çok basittir ancak Mozilla Firefox'ta sorunlu olmaktadır. Bu durumu innerHTML'nin W3C konsorsiyumunca onaylan bir özellik olmamasına bağlıyorum.

Blogged with the [Flock Browser](http://www.flock.com/blogged-with-flock "Flock Browser")
