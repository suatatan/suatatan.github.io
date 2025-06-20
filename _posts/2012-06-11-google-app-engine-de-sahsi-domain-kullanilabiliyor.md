---
categories:
- genel
date: 2012-06-11
layout: post
tags:
- english
- google-app-engine
- longread
- sorucevap
- technology
title: Google App Engine de şahsi domain kullanılabiliyor mu?
---

**Soru**:  

Suat hocam iyi günler

Google App Engine hakkındaki kitabınızı aldım ufak ufak uygulamlar yapmaya başlayacağım inşallah.Benim iki sorum olacak 

  

1-)Aldığımız domaini-örneğin [abc.com](http://abc.com/) gibi- Google app engine uygulamasına nasıl adapte edeceğiz

  

2-)Appspot.com uygulamları web servislere destek veriyor mu?Google bazı politikaları gereği web servislere izin vermiyor deniyor forumlarda.Peki web servis gerektiren işlemleri nasıl yapacağız?Saygılarımla.Selçuk ÖKMEN

  

**Cevap:**  
Merhabalar;  
1) Google App Engine ile şahsi olarak aldığınız [selcukokmen.com](http://selcukokmen.com/) gibi bir adresle de kullanabilirsiniz. Malum olduğu üzere Google App Engine üzerinde sayfanızı yayınladığınızda şuna benzer bir url alırsınız: [selcukoktem.appspot.com](http://selcukoktem.appspot.com/). [selcukoktem.com](http://selcukoktem.com/) adresini [appspot.com](http://appspot.com/) uzantılı adrese yönlendirebilirsiniz. Bu CNAME kayıtları ile olmaktadır. Bunu sitenizi [appspot.com](http://appspot.com/) alt domaini üzerinden yayınlandıktan sonra Dashboard'a girerek (kitapta dashbooard anlatılmıştır) oradan **Administration->Application Settings** menüsüne girdikten sonra **Domain Setup** isimli başık altından **Add Domain** demek suretiyle başlatırsınız.  
  
Resmi:  
  
[![](/images/21ba8-adddomain-714579.jpg)](https://suatatan.wordpress.com/wp-content/uploads/2012/06/21ba8-adddomain-714579.jpg)  
  
Bu minval üzere sistem sizi yönlendirecek ve kullandığınız hosting firması üzerinde DNS ayarları üzerinden CNAME kayıtlarını [ghs.google.com](http://ghs.google.com/) adresine yönlendirmeniz için talimatları açıklayacaktır.  
Siz de hosting firmanızın paneline (genellikle cpanel) girerek bu yönlendirmeyi yaptıktan kısa bir süre sonra [selcukoktem.com](http://selcukoktem.com/) domaini üzerinden google app engine uygulamanızı kullanabileceksiniz.  
  
  
2) Web servislerinden kastınız neydi? Eğer uygulamanızın JSON veya XML formatında API responseleri vermesini istiyorsanız bu mümkün. Ya da sözgelimi Youtube API'yi Google App Engine uygulamanız üzerinde mi çalıştırmak istersiniz? Bu da mümkün.  
  
Saygılarımla
