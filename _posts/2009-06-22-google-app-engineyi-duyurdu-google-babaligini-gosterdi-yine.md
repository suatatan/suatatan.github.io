---
date: 2009-06-22
layout: post
tags:
- turkish
- longread
- technology
- web-programlama
title: Google App Engine'yi duyurdu. (Google Babalığını gösterdi yine)
---

![](/images/appengine_lowres.gif "Google App Engine")

Google webde yine babalığını gösterdi.

Java ve Python kodlayan (ben de dahil) bir sürü garibanın ücretsiz ya da uygun fiyata java hosting bulamaması, python hostinini ise rüyada görmesi Google'yi üzmüş ki sağolsun ücretsiz olarak Java ve Python desteği veriyor.

Siz de ister Java'da ister Pythonda programınızı yazıp _programinizinadi.appspot.com_ adresi ile Google'nin desteği ile ücretsiz yayınlıyorsunuz.

[Bu kerameti incelemek için burayı tıklayın](http://code.google.com/intl/tr-TR/appengine/)

Google'nin bu hizmetini kullanmadan önce bir kaç hatırlatma var.

Java ile yazacağınız uygulamalarda Servlet ve JSP desteği var. Ancak daha iyi uygulamar için baba bir GWT desteği var (Google Web Toolkit denilen Java bilenlerin kolayca kullanabileceği bir kütüphane diyeyim)

Veritabanı kaşarlanmış PHP'cilerin iyi bildiği MySQL mantığından biraz farklı. (Ben de tam anlamadım inceliyorum)

Java ile uygulama yazacaksanız en iyisi bu hayratın sitesinde dendiği gibi Eclipsenin J2EE sürümünü (Ganymede olması azım) indirip sonra Goople App Engine pluginini Eclipse'ye kurmak. Neden mi? Uygulamayı aynen bilgisayarnızda test edip (mail alma gönderme dahil) sonra sağ tıklayıp upload diyerek googlenin size verdiği alanda yayınlayabiliyorsunuz.

Python ile uygulama yazacaksanız Java için Eclipse'deki rahatlık henüz yok. Google App Engine SDK'yi indirip biraz hammallık yapmalısınız. (Ama Python'un rahatlığı için buna değer)

Netbeans için GWT plugini ile Java'da bir şeyler yapayım derseniz var. Ama Eclipse'deki entegre durumu henüz sağlayamamışlar.

Ha bi de "ya nasıl şey bu GWT ve App Engine?" derseniz.  Galerisi var. [Burayı tıklayarak](http://appgallery.appspot.com/) hazırlanmış bu uygulamaların neye benzediğini inceleyebilirsiniz.

Mesela bir ağabeyimiz Müzik Albüm Bulutu diye bi uygulama yazmoş . İşte adresi:

[http://musicartistcloud.appspot.com/cloudservlet](http://musicartistcloud.appspot.com/cloudservlet)
