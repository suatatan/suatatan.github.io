---
layout: post
title: "Google App Engine Uygulamanızı kendi domain adresiniz üzerinden yayınlamak"
date: 2010-12-01
categories: 
  - "bilgisayar"
tags: 
  - "google-app-engine"
  - "web-programlama"
---

[![](/images/gae_custom_url.jpg "GAE_CUSTOM_URL")](http://suatatan.wordpress.com/wp-content/uploads/2010/12/gae_custom_url.jpg)

[Google App Engine](http://code.google.com/appengine/) bilindiği üzere Python veya Java kullanarak Google altyapısı üzerinden sayfalarınızı ücretsiz olarak yayınlama servisidir. Bu hizmeti kullarak yaptığınız sitenin adresi **siteadiniz.appspot.com** şeklinde olmaktadır. Bu haliyle sorun yoktur. Ancak çeşitli nedenlerden ötürü sayfanızı kendinize ait **sitediniz.com** ya da **siteadiniz.org.tr** gibi bir adresten yayınlamanız gerektiğinde bunun için yapmanız gereken bir kaç adım vardır.

Normal şartlarda Google App Engine uygulamanızı yönettiğiniz panelde "Add Domain" seçeneğini ilk gördüğünüzde yanılabilirsiniz. Google'nin domain satış hizmeti olduğunu düşünmeyin. Bu panelde ancak var olan domain adresinizi Google'a yönlendirmenizi temin etmek için vardır.

Yönlendirme denilince bilenlerin aklına hemen çeşitli yönlendirme tipleri (301,Nameserver,URL Forward) gelecektir. Şimdi bunları bir tarafa bırakın ve Google'ın önerdiği mantığı inceleyelim.

Olayı yazı ile anlatmak karışıklığa neden olabilir. Bunun yerine olayı diyagram ile anlatmak makul olacaktır. Lütfen diyagramı dikkatle inceleyin.

Diyagramdan anlayacağınız üzere eğer kendi domain adresiniz üzerinden yayın yapacaksanız, Google App Engine uygulaması size mükemmel bir geliştirme ortamı sunsa da, sizin domain adresinizi ve emektar hostinginiz ile yollarınızı ayırmamaya mecbur bırakıyor.

Şöyle ki: domain adresinizi dışarıdan almanız normal olsa da harici bir "hosting hizmetini" çıplak url adresinizi yani mesela siteadiniz.com adresini www.siteadiniz.com'a yönlendirmek için 301 yönlendirmesi kullandığınızdan bunu da illa mevcut emektar sunucunuz üzerinden yapmanız icap ettiğinden başka şansınız yok.

Google App Engine başka bir deyimle hosting firmalarının ocağına incir ağacı dikmedi. Sadece karlarını büyük ölçüde düşürdü. Şöyle ki sırf 301 yönlendirmesini yapmak için en küçük mesela 10MB'lık (varsa tabii) paket alıp buradan yönlendirme yapıyorsunuz.

Burada mantık şudur:

1. Google App Engine uygulamanıza **www.siteadiniz.com** üzerinden erişmek için **ghs.google.com** adresine CNAME ile yönlendirme yapıyorsunuz. Çünkü **siteadiniz.com** olarak (çıplak url) düz şekilde yönlendirmeyi google kabul etmiyor
2. Çıplak URL adresinizi ise mevcut emektar hostinginiz üzerinden 301 yönlendirmesi ile **www.siteadiniz.com** adresinize yönlendiriyorsunuz.
3. Böylelikle herkes Google App Engine uygulamanıza kendi domain adresiniz üzerinden erişiyor

Peki **siteadiniz.com** adresinizi neden direkt olarak 301 yönlendirmesi ile **\*.appspot.com** ile biten adresimize yönlendirmiyoruz:

Cevap basit; bunu yaptığınızda mesela **siteadiniz.com/ziyaretcidefteri** şeklinde bir alt sayfanız varsa erişimde sorun yaşayabilirsiniz. Her şeyden daha önemlisi yukarıdaki 3 maddede anlatılan hususu google öneriyor.

Hosting paneli olarak CPANEL kullanıyorsanız sorun yok(gerçi denemedim ama bir çok konuda kullanıcı dostu olması yüzünden böyle olduğuna eminim) ayarlarınızı rahatlıkla yaparsınız. Ama DNS ayarlarınızı düzenlemek için hosting paneliniz imkan tanımıyorsa mecburen hosting firmanıza bunu yaptırmanız gerekir (peşinen söyleyeyim iyi anlatın, hatta bu makaleyi link verin çünkü bu işlemi rutin bir işlem gibi algılayıp 'iki tıkla' işi halletmeye çalışmaları yüzünden iş 3 haftaya kadar uzayabilir)

Hosting firmalarına derdinizi anlatmazsanız aşağıdaki kayıtları onlara gösterin. 3 vakte kadar doğru yolu bulurlar:)

[![](/images/dns.png "DNS")](http://suatatan.wordpress.com/wp-content/uploads/2010/12/dns.png)

Bir örnek:

Şu anda **gurpinarbelediyesi.appspot.com** üzerinde bulunan Van Gürpınar Belediyesi web sayfasına [www.van-gurpinar.bel.tr](www.van-gurpinar.bel.tr ) ve

**van-gurpinar.bel.tr** adresinden erişim sağlanabiliyor.

Hosting firmama da teşekkür ederim:)
