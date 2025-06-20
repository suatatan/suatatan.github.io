---
title: "AJAX ile veri çekerken veriyi salt veya HTML'nin okunmuş hali olarak
alma"
date: 2008-11-03
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "web-programlama"
---

Aşağıda göreceğiniz fonksiyon kendisine gelen parametreye bağlanarak içerğini okur ve çalıştığı dökümanın güncellenmesini gerektirmeksizin (Zaten Ajax ile uğraştığımıza göre amaç bu) içeriğini ekrana yazar.  
  
index.html dosyası:——————————  
  
/span>  
“http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd”>  
  
  
Suat ATAN Ajax Dersleri  
[http://ajax.js](http://ajax.js)  
  
  
  
  
  
[http://checkip.dyndns.org/](http://</span><span%20style=)“ onclick=”grabFile(this.href); return false;“> IP Sorgula  
  

  
  
  
  
  
  
ajax.js dosyası:——————————————- 
  
// JavaScript Document Suat ATAN. suatatan.com \_ajax\_libraries  
function getHTTPObject() {  
var xhr = false;  
if (window.XMLHttpRequest) {  
xhr = new XMLHttpRequest();  
} else if (window.ActiveXObject) {  
try {  
xhr = new ActiveXObject("Msxml2.XMLHTTP”);  
} catch(e) {  
try {  
xhr = new ActiveXObject(“Microsoft.XMLHTTP”);  
} catch(e) {  
xhr = false;  
}  
}  
}  
return xhr;  
}  
  
function grabFile(file) {  
var istek = getHTTPObject();//obje olusturuldu  
if (istek) { //istek gerceklestiridli  
istek.onreadystatechange = function() {  
  
//durum degistigi zaman sonucu goster  
displayResponse(istek); //istek sonucugun goster  
};  
istek.open(“GET”, file, true); //veri al  
istek.send(null);//bos gonder  
}  
}  
  
function displayResponse(istek) {  
if (istek.readyState == 4) { //sonuc tam dondyse  
if (istek.status == 200 || istek.status == 304) { //hata yoksa  
  
var gelen\_deger=istek.responseText;  
var ana\_tag=document.getElementById(“hedef”);  
  
var yeni\_icerik=document.createTextNode(gelen\_deger);  
ana\_tag.appendChild(yeni\_icerik);  
  
}  
}  
}  
  
bu durumda index.html'  “[createTextNode(gelen\_deger); metodu ile ekrana yazar.  Metot ilginç bir şekilde yeni oluşturulan değeri işlemeden ekrana basar.  
  
aynı ajax.js kodlarını aşağıdaki gibi değiştirince ise:  
// JavaScript Document Suat ATAN. suatatan.com \_ajax\_libraries  
function getHTTPObject() {  
var xhr = false;  
if (window.XMLHttpRequest) {  
xhr = new XMLHttpRequest();  
} else if (window.ActiveXObject) {  
try {  
xhr = new ActiveXObject("Msxml2.XMLHTTP”);  
} catch(e) {  
try {  
xhr = new ActiveXObject(“Microsoft.XMLHTTP”);  
} catch(e) {  
xhr = false;  
}  
}  
}  
return xhr;  
}  
  
function grabFile(file) {  
var istek = getHTTPObject();//obje olusturuldu  
if (istek) { //istek gerceklestiridli  
istek.onreadystatechange = function() {  
  
//durum degistigi zaman sonucu goster  
displayResponse(istek); //istek sonucugun goster  
};  
istek.open(“GET”, file, true); //veri al  
istek.send(null);//bos gonder  
}  
}  
  
function displayResponse(istek) {  
if (istek.readyState == 4) { //sonuc tam dondyse  
if (istek.status == 200 || istek.status == 304) { //hata yoksa  
  
var gelen\_deger=istek.responseText;  
var ana\_tag=document.getElementById(“hedef”);  
var yeni\_tag=document.createElement(“p”);  
ana\_tag.appendChild(yeni\_tag);  
yeni\_tag.innerHTML=gelen\_deger  
  
//Geri zekalı forum manyaklarınca bu içeriklerin de eni sonu kopyalanacağını biliyorum ancak onlar //da bilsinler ki bu metnin her satırı emekle yazıldı. Kopyala yapıştır ile değil. (Suat ATAN)  
}  
}  
}  
  
http://checkip.dyndsn.org sitesine bağlanan index.html dosyası veriyi HTML olarak değil işlenmiş olarak basar.  
  
Burada fark şundan olur. Normal şartlarda AJAX ile hangi dosya çekilirse o dosyanın olduğu gibi çekilmesi sağlanır. innerHTML metodu ise çekilen HTML verisini işler.  
  
Ajax ile çekilecek verilerin XML veya JSON olarak da çekme yöntemleri vardır.  Ancak HTML olarak veri çekmek ve özellikle de innerHTML metodu çok basittir ancak Mozilla Firefox'ta sorunlu olmaktadır. Bu durumu innerHTML'nin W3C konsorsiyumunca onaylan bir özellik olmamasına bağlıyorum.  
](//www.checkip.dynds.org%20adresine%20ba%C4%9Flanan%20site%20bu%20sitenin%20html%20kodlar%C4%B1n%C4%B1%20<span%20style=)

[Blogged with the](//www.checkip.dynds.org%20adresine%20ba%C4%9Flanan%20site%20bu%20sitenin%20html%20kodlar%C4%B1n%C4%B1%20<span%20style=) [Flock Browser](http://www.flock.com/blogged-with-flock "Flock Browser")
