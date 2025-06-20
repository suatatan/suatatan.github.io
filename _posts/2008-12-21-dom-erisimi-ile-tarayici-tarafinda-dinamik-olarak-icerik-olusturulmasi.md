---
title: "DOM erişimi ile Tarayıcı Tarafında Dinamik Olarak İçerik oluşturulması"
date: 2008-12-21
categories: 
  - "bilgisayar"
tags: 
  - "web-programlama"
---

Bazı web sayfalarında görmüşsünüzdür belli bir yere tıkladığınızda anında arama çubuğu oluşuverir.  Bu işlem Javascript ile HTML dökümanının düğümlerine erişim ile olur. İşi yapan Javascriptteki **createElement**, **appendChild** ve **removeChild** metotlarıdır.

Aşağıda bu işlemi yapacak bir kod göreceksiniz:

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml"> <head> <script type="text/javascript">

function arama\_formu() {

var formtag = document.createElement('form'); // FORM TAGI OLUSTURULUYOR var form\_yazi="ARAMA:"; //formtag.innerHTML=form\_yazi; formtag.setAttribute("name","form1"); formtag.setAttribute("method","GET"); formtag.setAttribute("target","\_blank"); formtag.setAttribute("action","http://www.google.com.tr/search?site=&hl=tr"); var inputtag=document.createElement("input"); inputtag.setAttribute("type","text"); inputtag.setAttribute("id","q"); inputtag.setAttribute("name","q");

var dugme=document.createElement("input"); dugme.setAttribute("type","submit"); dugme.setAttribute("id","button"); dugme.setAttribute("name","button"); dugme.setAttribute("value","Ara");

var fani=document.getElementById("fani"); var fanidugme=fani.firstChild; fani.removeChild(fanidugme);

formtag.appendChild(inputtag); formtag.appendChild(dugme);

document.getElementById('apDiv1').setAttribute("class","tbar"); document.getElementById('apDiv1').appendChild(formtag);

} </script> <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-9" /> <title>SUAT ATAN AJAX DERSLERİ</title> <style type="text/css"> <!-- #apDiv1 { position:absolute; left:3px; top:8px; width:507px; height:29px; z-index:1; } #q{ background-color: #FFFF99; } --> </style> </head>

<body> <div id="apDiv1"></div> <div id="fani"> <input type="button" id="dugme1" value="Ara" onclick="arama\_formu()" /> </div><!--Bu kodlar Suat ATAN tarafından kodlanmıştır.--></body> </html> Bu kodların çalışır hali için

[http://suatatan.com/ajax/arge1/arama\_formu\_olustur.htm](http://suatatan.com/ajax/arge1/arama_formu_olustur.htm)

Ancak bu kodlar şu an itibari ile Mozilla Firefox altında çalışmamaktadır. Nedeni bulunduğunda yeni versiyonu yazılacaktır.
