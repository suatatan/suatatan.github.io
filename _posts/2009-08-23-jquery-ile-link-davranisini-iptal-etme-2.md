---
categories:
- bilgisayar
- genel
date: 2009-08-23
layout: post
tags:
- english
- quickread
- technology
- web-programlama
title: JQuery ile Link davranışını iptal etme
---

Ajax'lı uygulamalar yaparken, tıklanan bir linkin direkt olarak  
standart sayfadaki gibi href'inde tanımlanan adrese gitmesini engellemek gerekebilir.  
Elbette bu durum hiç hiperlink kullanmayarak sağlanabilir  
ancak sayfanın javascript'in çalışmadığı yerlerde de  
eksiksiz çalışmasını sağlama(Hijax Yaklaşımı) için linkleri  
kullanmak zaruridir.  
Aşağıdaki fonksiyon ortamda javascript varsa sayfadaki tüm linkleri  
iptal eder ve tıklandığında ilgili sayfaya gitmez. Bunun yerine kullanıcının tanımladığı fonksiyonlar çalıştırılır.  
Eğer ortamda Javascript yoksa (mesela sayfa ceptelefonundan geziliyor) bu durumdaysa script tagları arasındaki kodlar zaten çalışmayacağından linkler standart olarak davranırlar  
  

```
$(document).ready(function(){$("a").attr("onclick","return false;"); });//dr
```
