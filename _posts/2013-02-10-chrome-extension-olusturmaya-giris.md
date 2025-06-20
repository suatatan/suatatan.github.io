---
categories:
- bilgisayar
- genel
date: 2013-02-10
layout: post
tags:
- english
- longread
- opinion
- technology
title: Chrome Extension Oluşturmaya Giriş
---

#   

![Chrome Extensions](/images/google_chrome_extensions.jpg)  
  
  

* * *

Bu makaleyi tam olarak anlamak için şu kavramları biliyor olmalısınız?  
Eğer bilmiyorsanız kavramların üzerine tıklayarak ne oldukları hakkında fikir edindikten sonra makaleyi okumaya devam edebilirsiniz  
  

| [Chrome](http://www.google.com/intl/tr/chrome/browser/features.html) | [Chrome Extension](http://bilgisayamiyorum.com/question/147.aspx) |
| --- | --- |
| [HTML](http://tr.wikipedia.org/wiki/HTML) | [Javascript](http://bid.ankara.edu.tr/yardim/www/javasturk/javascr.html) |

  

* * *

## [](http://www.blogger.com/blogger.g?blogID=9086217116613741623)İçerik:

[Chrome Extension ile neler yapılabilir](http://www.blogger.com/blogger.g?blogID=9086217116613741623#1)  
[Neye benziyor? Bu Makalenin Yazarı fakir'in ilk chrome extension denemeleri](http://www.blogger.com/blogger.g?blogID=9086217116613741623#2)  
[Chrome Extension'u hangi dille yazılır?](http://www.blogger.com/blogger.g?blogID=9086217116613741623#3)  
[15 Dakika'da kendi Chrome Extension'unuzu oluşturun](http://www.blogger.com/blogger.g?blogID=9086217116613741623#4)  
       [Dizin İçeriği](http://www.blogger.com/blogger.g?blogID=9086217116613741623#5)  
       [Kodların genel görünümü](http://www.blogger.com/blogger.g?blogID=9086217116613741623#6)  
       [Paketlenmemiş Chrome uzantısı dosyasının bilgisayarınızdaki Chrome'a yüklenmesi](http://www.blogger.com/blogger.g?blogID=9086217116613741623#8)  
       [Peki Ya Sonra](http://www.blogger.com/blogger.g?blogID=9086217116613741623#9)  
       [Chrome Extensionlar o kadar da önemli mi?](http://www.blogger.com/blogger.g?blogID=9086217116613741623#10)  

## [](http://www.blogger.com/blogger.g?blogID=9086217116613741623)Chrome Extension ile neler yapılabilir?

Teknik ayrıntılar içeren makaleye giriş yapmadan evvel bir chrome extension ile neler yapılabileceğini, yeni bir chrome extension oluşturmanın ne gibi faydaları olacağını açıklayalım; elbette bu bölümü hakkında genel fikriniz varsa atlayabilirsiniz.  
  

1. [Chrome Web Mağazasında](https://chrome.google.com/webstore/category/extensions?hl=tr) görebileceğiniz onbinlerce değişik uygulamanın tamamı, Chrome Extension'udur. Bu uygulamaları incelerseniz Chrome extension'ların sınırsız imkanlarını tahmin edebilirsiniz.  
    
2. Chrome Extension'ları (Uzantı) ile tarayıcı üzerinden çalışan, ilgili sayfanın içeriğini okuyabilen, bildirimler çıkarabilen programlar yazabilirsiniz. Mesela; bir sayfa içinde bilinmeyen bir kelime üzerine tıklanınca hemen yanında anlamını göstren  sözlük uygulamaları (Örnek: [Seslisözlük](https://chrome.google.com/webstore/detail/seslisozluk/jnincmfahpbejkdebeobohlnpckfobap?hl=tr) Extension), ya da Gmail'inize yeni bir eposta geldiğinde onu popup olarak hatırlatan [(Gmail Checker)](https://chrome.google.com/webstore/detail/google-mail-checker/mihcahmgecmbnbcchbopgniflfhgnkff?hl=tr)  extension'lar gibi  bir çok uygulama hazırlanabilir. 
3. Hazırladığınız extension'ları Chrome Web mağazasında yayınlabilirsiniz. (İlk üyelikte bir sefere mahsus 5$‘lık bir ücret alınıyor)

## [](http://www.blogger.com/blogger.g?blogID=9086217116613741623)Neye benziyor? Bu Makalenin Yazarı fakir'in ilk chrome extension denemeleri

![Notesuat'ın çalışır hali](/images/notesuat_extension.jpg)  
(Notesuat'ın çalışır hali)  
  
Çok profesyonel olmasalar da, bu makalenin yazarının da bazı Chrome Web Mağazasında bulunan bazı uygulamaları bulunmaktadır. Basit bir Not tutma ve saklama uygulaması olan Notesuat'ı inceleyebilirsiniz. (Bkz: [Notesuat](https://chrome.google.com/webstore/detail/notesuat/afnmicbkaoobcnlbfbeaablakcgmkeeo?hl=tr))  
  
Ya da İngilizce metin okuyarak ingilizcelerini geliştirenler için; ücretli Babylon uygulamasının altertnatifi, kelime üzerine tıklanınca Türkçe karşılığını gösteren, aynı zamanda kullanıcı arzu ettiğinde bu kelimeyi, kullanıcının hesabına tanımlı “kelime hazinesine” ekleyen “Kolay İngilizce Oku” extension'unu deneyebilirsiniz. (Bkz: [Kolay İngilizce Oku Extension](https://chrome.google.com/webstore/detail/kolay-i%CC%87ngilizce-oku/hjcemlbinfmfpadijnabafgimockkhei?hl=tr), [Kolay İngilizce Oku WebApp](http://www.kolay-ingilizce-oku.appspot.com/))  
  
![Kolay İngilizce Oku Extension](/images/kolayingilizce.jpg)  
  

## [](http://www.blogger.com/blogger.g?blogID=9086217116613741623)Chrome Extension'u hangi dille yazılır?

Chrome Extension'u hazırlayabilmek için sadece [HTML](http://tr.wikipedia.org/wiki/HTML)bilmeniz yeterlidir. Ancak daha iyi uygulamalar için [Javascript](http://bid.ankara.edu.tr/yardim/www/javasturk/javascr.html)de bilmelisiniz. İlk uygulamanız için hiç birini bilmeden de başlayabilir, HTML ve Javascript öğrenmeyi sonraya erteleyebilirsiniz.  
  
[Başa dön](http://www.blogger.com/blogger.g?blogID=9086217116613741623#top)  

## [15 Dakika'da kendi Chrome Extension'unuzu oluşturun](http://www.blogger.com/4)

Şimdi oluşturacağımız Chrome Extension sadece üzerine tıklanınca “Merhaba Ahiret” diyecek. (Programlamaya giriş kitaplarında ekrana ilk yazdırılan cümle “Merhaba Dünya”'dır. Biz ise “Merhaba Ahiret” yazdırıyoruz:)  
Ancak bu basit uygulama, bir Chrome Extension'u baştan sona nasıl oluşturacağınızı öğretecek. Daha fazlası ise size kalmış.  
  
Şimdi adım adım öğrenelim;  

### [](http://www.blogger.com/blogger.g?blogID=9086217116613741623)Dizin İçeriği

[Ekteki](https://docs.google.com/file/d/0B2QbjSFSlgaMMml3Si1DQzZvUUk/edit?usp=sharing)dosyayı indirin. Sıkıştırılmış dosyayı ayıklayın. Dosya içinde 4 dosya var:  
  
\-manifest.json  
\-popup.html  
\-popup.js  
\-icon.png  
  
Önce bu dosyaların ne işe yaradığını açıklayıp daha sonra bilgisayarınzda kurulu chrome'a nasıl yükleyeceğinizi anlatalım.  
  
\-manifest.json dosyası extension'un adı, açıklaması, talep ettiği izinler gibi verileri tutmaktadır. Basit bir dosyadır. Ancak esas işin bu dosya yapmaz. Bir nevi kimlik dosyasıdır. [Json](http://turgaysahtiyan.com/post/JSON-Nedir.aspx)formatındadır.  
  
\-popup.html dosyası  tahmin edileceği gibi, uzantının görsel arayüzleri ile ilgili verilerin tutulduğu dosyadır. “Merhaba Ahiret” yazısını bu dosyayı açtığınızda görebilirsiniz. [HTML](http://tr.wikipedia.org/wiki/HTML) ile yazılmıştır.  
  
\-popup.js: Bu örnek için boş geçilmiştir.  popup.html içinden çağrılır. [Javascript](http://bid.ankara.edu.tr/yardim/www/javasturk/javascr.html) ile yazılmıştır. Doğal olarak, kullanıcı davranışları, etkileşimler, olay tetikleyiciler bu dosya içinden çağrılır. Yine örneğin YouTube, Flickr ve benzeri API'lerle çalışan zengin uygulamalar yazacaksanız, ana kodlar yine bu dosyada yer alır.  
  
\-icon.png: Uzantı Chrome'a eklendikten sonra düğme ikonu olarak görülecek olan resim dosyasıdır. 16x16 piksel ebadında olmalıdır.  
  
  
[Başa dön](http://www.blogger.com/blogpost.html.html#top)  

### [](http://www.blogger.com/blogger.g?blogID=9086217116613741623)Kodların genel görünümü;

  
[https://gist.github.com/suatatan/4749964.js](https://gist.github.com/suatatan/4749964.js)  

### [](http://www.blogger.com/blogger.g?blogID=9086217116613741623)Paketlenmemiş Chrome uzantısı dosyasının bilgisayarınızdaki Chrome'a yüklenmesi

Chrome 'nuzu açın; aşağıdaki adımları uygulayın:  
  
  
En sağdaki üstüste üç çizgi menüsünden >Araçlar>Uzantılar 'ı tıklayın  
![Chrome'da uzantılar alanı](/images/EkranGoruntusu-Yeni%2520Sekme%2520-%2520Google%2520Chrome-1.png)  
  
Aşağıdaki gibi bir ekran açılacaktır:  
![Chrome Uzantılar ekranı](/images/yukleme_ani.png)  
  
Açılan bu ekranda sağ üst köşedeki “Geliştirici Modu” işaretini tıklayın (Henüz geliştirilmekte olan bir uygulamayı test edeceğiniz için)  
Sonra “Paketlenmemiş uzantıyı yükle”butonunu tıklayın. Açılan dosyadan masaüstünüzdeki “ilk\_chrome\_extension” dosyasını seçin. Tamam diyin. Eğer bir hata oluşmamış ise, eklenmiş olan Chrome uzantısı, Uzantılar listesinde aşağıdaki gibi yerini alacaktır:  
  
![Yüklenmiş Chrome Extension'u](/images/yukenmis_uzanti.png)  
Gördüğünüz gibi burada görülen bilgilerin kaynağı “manifest.json” dosyasıdır.  
  
Buraya kadar geldiyseniz; tarayıcınızın sağ üst köşesinde ![İkon](/images/icon.png)işaretini göreceksiniz. Bu işaret dosyamızdaki icon.png dosyasıdır. Şimdi o ikon dosyasını tıklayın. Aşağıdaki gibi “Merhaba Ahiret” yazısını görmelisiniz:  
  
![İlk chrome uzantınız hazır](/images/ortaya_cikacak_gorunut.png)  
  
Evet tebrikler, ![İkon](/images/icon.png)ikonuna basılınca popup.html dosyamızdaki “Merhaba Ahiret” yazısı görülüyor.  
  
  
[Başa dön](http://www.blogger.com/blogpost.html.html#top)  
  

## [](http://www.blogger.com/blogger.g?blogID=9086217116613741623)Peki Ya Sonra

Buraya kadar kazasız belasız geldiyseniz, Chrome Extension programcılığında yolu yarılamışsınız demektir. Temel süreç gördüğünüz gibi sadece bundan ibarettir. Bundan sonrası, bazı küçük denemeler yaptıktan sonra, gerçekten işe yarar bir projeye girişmek ve lazım olan bilgileri araştıra araştıra bulmak ve uygulamaktadır. Genel olarak [Chrome Web Mağazasında](https://chrome.google.com/webstore/category/extensions?hl=tr) neler yapılabilceğine dair bir çok örnek var. Yukarıda izah ettiğim en basit ve belki de ilk etapta size işe yaramaz gibi gelen model üzerine kurulu olan dahi bir sürü güzel uygulama vardır.  
  
[Başa dön](http://www.blogger.com/blogpost.html.html#top)  
  

## [](http://www.blogger.com/blogger.g?blogID=9086217116613741623)Chrome Extension'lar o kadar da önemli mi?

Chrome extension'lar neticede [Mozilla Firefox](http://www.mozilla.org/tr/firefox/new/) tarayıcılar için [Mozilla Add-on](https://addons.mozilla.org/en-US/firefox/) ya da Explorer için geriden gelen eklentiler gibidir. Ancak Chrome extension geliştirmek, diğerlerine göre, nispeten daha kolaydır. Ayrıca Chrome eklentilerle “Desktop Notification” yani “Masaüstü Bildirimleri” de yapılabilmektedir. Bu ise; neredeyse gerçek “native” bir Windows ya da Linux uygulaması gibi, etkileşimli, gerçekçi ve güzel uygulamalar yazılabilmesini sağlar. Daha da önemlisi, sürekli olarak internele etkileşim halinde, setup gerektirmeyen, her yerden erişilebilir programlar yazmak mümkündür.   
Chrome'da senkronizasyon özelliğini kullananlar yani Chrome kullanırken gmail hesapları ile Login yaparak kullanlar örneğin iş yerinde sizin hazırladığınız bir uzantıyı chrome tarayıcılarına yüklendiklerinde, evlerinde de Chrome kullanıyorlarsa, sizin eklentiniz evdeki Chrome'a da otomatik olarak eklenir.  
Dikkat edilirse, ciddi web girişimleri tek tıkla kurulabilen, hızlı, light Chrome Extension'larını unutmamakta, web uygulamalarına (Webware) tarayıcı özelliği eklemektedirler.  
  
[Başa dön](http://www.blogger.com/blogpost.html.html#top)  

## [](http://www.blogger.com/blogger.g?blogID=9086217116613741623)Sonraki hedef  

Bu makaleyi beğendiniz mi? Yorumlarınızı, sorularınızı ve eleştirilerinizi bekliyorum. Bu yazı belirli bir olgunluğa eriştikten sonra, hazırladığınız eklentileri [Chrome Web Mağazasında](https://chrome.google.com/webstore/category/extensions?hl=tr) nasıl yayınlayacağınızı anlatacağım.  
İyi eğlenceler.  
  
[Başa dön](http://www.blogger.com/blogpost.html.html#top)  
  

Bu içerik özgündür. Yani bu blog yazarı tarafından belirli bir emek harcanarak, hiç bir yerden kopyala-yapıştır yapılmadan hazırlanmıştır. Sadece bilgi paylaşımı içindir. Bu nedenle siz değerli okurlarından istirhamı, kaynak gösterilmeden alıntı yapılmamasıdır. Kaynak gösterilmeden alıntı yaptığınızı tespit, profesyoneller açısından çok kolaydır. Böyle bir durumda istemediğimiz müeyyideleri tatbik yoluna başvurabiliriz. Bu bloga link vermek suretiyle rahatlıkla kullanabilirsiniz. Teşekkürler.
