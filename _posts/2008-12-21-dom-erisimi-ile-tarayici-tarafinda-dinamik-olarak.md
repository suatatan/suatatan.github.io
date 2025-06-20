---
categories:
- bilgisayar
- genel
date: 2008-12-21
layout: post
tags:
- turkish
- quickread
- technology
- web-programlama
title: DOM erişimi ile Tarayıcı Tarafında Dinamik Olarak İçerik oluşturulması
---

Bazı web sayfalarında görmüşsünüzdür belli bir yere tıkladığınızda anında arama çubuğu oluşuverir.  Bu işlem Javascript ile HTML dökümanının düğümlerine erişim ile olur. İşi yapan Javascriptteki **createElement**, **appendChild** ve **removeChild** metotlarıdır.  
  
Aşağıda bu işlemi yapacak bir kod göreceksiniz:  
  
  
  
  
  
  
function arama\_formu()  
{  
  
var formtag = document.createElement(‘form’); // FORM TAGI OLUSTURULUYOR  
var form\_yazi=“ARAMA:”;  
//formtag.innerHTML=form\_yazi;  
formtag.setAttribute(“name”,“form1”);  
formtag.setAttribute(“method”,“GET”);  
formtag.setAttribute(“target”,“\_blank”);  
formtag.setAttribute(“action”,“http://www.google.com.tr/search?site=&hl=tr”);  
var inputtag=document.createElement(“input”);  
inputtag.setAttribute(“type”,“text”);  
inputtag.setAttribute(“id”,“q”);  
inputtag.setAttribute(“name”,“q”);  
  
var dugme=document.createElement(“input”);  
dugme.setAttribute(“type”,“submit”);  
dugme.setAttribute(“id”,“button”);  
dugme.setAttribute(“name”,“button”);  
dugme.setAttribute(“value”,“Ara”);  
  
var fani=document.getElementById(“fani”);  
var fanidugme=fani.firstChild;  
fani.removeChild(fanidugme);  
  
formtag.appendChild(inputtag);  
formtag.appendChild(dugme);  
  
document.getElementById('apDiv1’).setAttribute(“class”,“tbar”);  
document.getElementById('apDiv1’).appendChild(formtag);  
  
}  
  
  
SUAT ATAN AJAX DERSLERÄ°  
  
<!-- 
#apDiv1 {  
position:absolute;  
left:3px;  
top:8px;  
width:507px;  
height:29px;  
z-index:1;  
}  
#q{  
background-color: #FFFF99;  
}  
\-->  
  
  
  
  

  

  

  
  
Bu kodlarÄ±n Ã§alÄ±ÅÄ±r hali iÃ§in  
  
[http://suatatan.com/ajax/arge1/arama\_formu\_olustur.htm](http://suatatan.com/ajax/arge1/arama_formu_olustur.htm)  
  
Ancak bu kodlar Åu an itibari ile Mozilla Firefox altÄ±nda Ã§alÄ±ÅmamaktadÄ±r. Nedeni bulunduÄunda yeni versiyonu yazÄ±lacaktÄ±r.
