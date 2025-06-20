---
title: "Marquee Tag'ıyla kayan yazı oluşturma"
date: 2008-04-21
categories: 
  - "genel"
tags: 
  - "sosyal-bilimler"
  - "web-programlama"
---

# ![](/images/chinese_hat_entrance_marquee.jpg)

  

HTML kodlarından Marquee tagı ile web siteniz içinde sağdan sola ve yukarıdan aşağıya ters ve düz yönlerden kayan yazılar oluşturabilirsiniz. Marquee tag'ına ait parameterler ile yazı akış hızı, yönü ve diğer bir çok özelliği ayarlamanız mümkündür. Benim şahsen yukarıdan aşağıya duyuru ilanları için kullandığım ve en ideal olarak düşündüğüm tag aşağıda:

  

(Bu kodun çalışan örneğini: [www.suatatan.com](http://www.suatatan.com) anasayfasındaki duyurular bölümünde görebilirsiniz.)

  
  

>   
> 
>   _Duyurularınız….Yeni Web sitemiz yayında,Bu kodları kullanmak serbettir ancak bu kodların da içinde olduğu makaleyi çalan ve isimsiz yayınlayanlar kodun sahibi suat atan tarafından sitelerine yapılcak her türlü müeyyideyi peşinen kabul etmiş sayılır. İsim ile yayınlamak serbettir._
> 
>   

  
   

Kodlarımız içindeki iki detayı açıklamakta fayda var.

  
  

onMouseOver=‘this.stop()’ :tagı ile fare imlecinin kayan yazımız üzerine geldiği zaman yazının durmasını , onMouseOut='this.start()'   :tagı ile ise fare imlecinin yazıdan çıktıktan sonra yazının kendi halinde akışına devam etmesini sağlamak için koyduk. Bunlar standart javascript parameterleridir.  
scrolldelay:     parametresi yazının akış hızını belirlerken  
scrollamount: parametresi yazının birim zamandaki akış miktarını ayarlar

  

Bu kodları kullanırken parameterlerle oynayarak değişiklikleri daha güzel inceleyebilirsiniz.

  
Bu arada marquee tag'ı yazı akışı için kullanılsa da ingilizcedeki karşılığı büyük çadır ya da otağ demektir…
