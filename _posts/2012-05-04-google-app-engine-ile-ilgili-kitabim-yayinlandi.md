---
categories:
- genel
date: 2012-05-04
layout: post
tags:
- turkish
- google-app-engine
- longread
- opinion
- technology
title: Google App Engine ile ilgili kitabım yayınlandı.
---

[![image](/images/dad40-google_app_suat_atan.jpg)](https://suatatan.wordpress.com/wp-content/uploads/2012/05/dad40-google_app_suat_atan.jpg)

Kitabı Idefixten satın almak için [burayı tıklayın](http://www.idefix.com/kitap/google-app-engine-suat-atan/tanim.asp?sid=U8ZY2WW6L40VU9EM0U7H)

Kitabı D&R'dan almak için [burayı tıklayın.](http://www.dr.com.tr/kitap/google-app-engine/suat-atan/egitim-basvuru/bilgisayar/urunno=0000000396065)

Kitabı Amazon'dan satın almak için [burayı tıklayın](http://www.amazon.com/Google-App-Engine-Suat-Atan/dp/6054205811)

İlk çıktığı günden bugüne üzerine çalıştığım ve son yıllarda geliştirdiğim web projelerinin yegane altyapısı olan Google App Engine ile ilgili kitabım yayınlandı. Kitap Google App Engine ile iligli ilk Türkçe kitap. Yurtdışında bu konuda çok eser varken, Türkçe olarak hiç kaynak olmaması bu güçlü teknolojinin ülkemizde tanınmasına engel teşkil etmekteydi. İngilizce bilenler, Türkçe kaynak sorununu algılama noktasında zamanla yabancılaşırlar.  Nasılsa her istenilen bilgiye erişim İngilizce ile çocuk oyuncağıdır. Ancak İngilizce ile arası iyi olmayan ancak teknoloji ve programlama alanında ciddi çabalar sarfeden özellikle de gençlerin çoğunluğunu oluşturduğu ciddi bir kesim var. Bu kesimi forumlardan, internetten, bloguma gelen sorulardan bir ölçüde tanıyorum. Bu kitap en başta onlar içindir.

Kitap çeviri değil… Bir kaç yıldır Google App Engine ile web projeleri hazırlarken, ingilizce teorik kaynaklardan edindiğim bilgileri pratiğe dökmek suretiyle ortaya çıktı bu kitap. Yani mutfağından ortaya çıktı. Hacmen az ve öz tutmaya özen gösterdim. Çünkü programcılığa ilk başladığım günden bugüne programcılıkla ilgili kalın kitaplar hep yıldırıcı gelmiştir.

Bir İnşaat Mühendisi ve İşletme mezunu olarak,  bilgisayar programcılığı üzerine kitap yazmanın veya bir şeyler yapmanın ‘işin ehli’ sayılan, programcılık veya bilgisayar mühendisliği mezunu dostlar için biraz tuhaf kaçtığını öteden beri bilirim. Çünkü benim gibi İnşaat Mühendisi olan Memik YANIK’ın programcılık kitaplarını, ‘işin ehli’ arkadaşlar satın alınca, “adama bak, inşaat mühendisi gelmiş işimize burnunu sokuyor” derlerdi.  Muhtemelen benim için de derler… Ancak o arkadaşlarımızın, okurlarımızın affına iltica ediyorum. İşin okulunu okumuş olmaya her zaman sonsuz saygım vardır. Ancak herkes takdir edecektir ki, ilgi ve hobilerin, ya da sektörlerin sınırı yoktur. Ya biz İnşaat Mühendisleri ne yapalım? Sektörümüzün neredeyse hepsi, İnşaat Mühendisliği dışından insanlarla dolu. Müteahhitleri hatırlayın…

Kitaptaki konulardan anlaşılmayan noktalar olursa, buradan cevaplamaktan memnuniyet duyacağım. Mail olarak yollanan soruları da herkesin istifadesi açısından buradan yayınlamayı planlıyorum. 

Kitap ilk kitabım. Bu noktada belirli bir heyecan ve daha özel bir emek barındırıyor. Tüm okurlarımızın istifade edeceğine inanıyorum. Eğer bu işi sevdirebilmiş ve bir nebze anlatabilmişsem kendimi hedefime varmış sayacağım.

Neticede ben de programcılık serüvenime, Numan Pekgöz’ün Java adlı kitabı ile başlamış ve kitabın ivmesi ile ilerlemiştim. Kendisini şahsen tanımadığım bu değerli insanın, Sayın Numan Pekgöz’ün yolundan ilerlemeye çalışıyoruz.

Biraz Google App Engine ve kitap hakkında konuşalım:

**Nedir Google App Engine?**

**Google App Engine, Google’nin internette başta iş dünyasına yönelik ortaya çıkardığı bir hosting(barındırma) çözümüdür.**  
  
Web tasarımcıların kullandıkları klasik hosting çözümlerinin ötesinde, daha ileri özellikleri ile çığır açan Google App Engine ortaya çıktığından bugüne ciddi bir biçimde popülerleşmekteydi. Google App Engine hizmetini popüler kılan en temel özellik; İlk etapta, gmail adresi olan herkese 20 adet, reklamsız, sorunsuz ve bedava Python ya da Java hosting hizmeti veriyor olmasıdır. Dolayısıyla Python veya Java ile hazırlanmış web uygulaması olan herkes, bu projesini ücretsiz olarak hayata geçirebiliyor.  
  
**Peki Google hiç mi ücret almıyor?** Evet, alıyor. Ancak sadece siz istediğinizde ve sizin istediğiniz limit altında. Ayrıca sadece tükettiği kadarını alıyor. Bu hakkaniyetli çözümde, her yıl sabit ücret ödemek de yok. Bu şöyle olmaktadır: Siteniz gerçekten belirli bir ziyaretçi sayısına ve sunucu kaynaklarını zorlamaya başlayan aşamaya geldiğinde (ki bunun belirlenmiş sayısal değerleri vardır) Google sizden “billing” moduna geçmenizi istiyor. Size koyabileceğiniz aylık bütçeyi soruyor. Bu bütçe sizin krediniz, o aşamadan sonra siteniz tabiri caizse ne kadar harcadıysa sizden o kadar ücret kesiliyor. Diyelim sitenize kimse girmedi, o zaman hiç bir ücret alınmıyor. Meraklısına söyleyelim; Ufak web projeleri ve firma siteleri için kuruş para ödemeye gerek kalmıyor.  
  
Ancak Google bu hizmeti sunarken, sizden kendisine özel bir biçimde kod yazmanızı istiyor. Google App Engine ile ilgili kaynak önceki teknolojilerden PHP ve Java’ya göre çok azdır. Türkçe kaynak ise yakın zamana kadar bulunmamaktaydı. Blogger’larımızdan Suat ATAN’ın bu boşluğu doldurmak ve bu popüler teknolojiyi Türkiye’deki internet kullanıcıları ile tanıştırmak ve faydalandırmak için Google App Engine hakkında bir kitap yayımladı.  
  
**Kitabın tanıtım metni şöyle:**  
  
    Google desteği ile web projenizi hayata geçirmek için, son zamanların en popüler teknolojilerinden biri olan Google App Engine ile ilgili ilk Türkçe kitap! Biri size, Google ücretsiz olarak kendi sunucularını ücretsiz olarak web programcılarına açıyor dese inanır mıydınız? Yani bir internet iş fikriniz var ve bunu hayata geçirmek için Google size destek oluyor! Üstelik isterseniz tüm Gmail hesabı olanlar sitenizin doğal olarak web uygulamanıza direkt login olabiliyor. Bu mümkün mü? Evet, mümkün! Google App Engine sayesinde artık her çapta web sitenizi ücretsiz olarak, Google altyapısı üzerine hemen hayata geçirebilirsiniz. Bunun bir şartı var, sitenizi Python veya Java ile Google App Engine framework’u ile kodlamak. Bu kitap; son zamanların en kolay öğrenilen, yazımı ve okunabilirliği en basit dillerinden biri olan Python ile Google App Engine projelerini nasıl yapacağınızı öğretiyor.  
  
    Python dilinin gücünü web sayfalarınıza yansıtmaya ve yıllardır kullandığınız programlama dillerinden sonra, Google’ın desteklediği bir altyapıda çalışmaya ne dersiniz? Bu kitap, her seviyeden web programcılığına ilgilenenlere ve özellikle de Python diline ilgili duyanlara hitap ediyor. Sıfırdan basit bir web programından veritabanı uygulamalarına kadar tüm örnekleri barındırıyor. Aynı zamanda bir kaç dakika içinde web projenizi nasıl Google altyapısı üzerindeki sunucularda nasıl yayınlayacağınızı anlatıyor.
