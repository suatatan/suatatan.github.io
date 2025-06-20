---
categories:
- bilgisayar
date: 2019-10-31
layout: post
tags:
- english
- javascript
- longread
- technology
- web-programlama
title: Artık Script Src denerek Javascript Yazılmıyor
---

![npm ile ilgili görsel sonucu"](/images/images)

Normalde Javascript ile işimiz olduğunda ne yapardık? Eski web uygulama geliştiricileri hatırlayacaklardır. Hatta bir çok genç geliştirici de halen eski yöntemleri sürdürmeye devam ediyor. Çünkü çalışıyor. Nedir bu yöntem:

```
<script src="kutuphane_1"/>
<script>
//Buraya işlerimizi kodlarız
</script>
```

Bu kodları HTML dosyamıza koyarız ve çalışır. Buraya kada problem yok. Sonra ne olur, yeni kütüphaneler ekleriz ve scriptlerimiz şöyle olur

```
<script src="kutuphane_1"/>
<script src="kutuphane_2"/>
<script src="kutuphane_3"/>
<script src="kutuphane_4"/>
<script src="kutuphane_5"/>
<script src="kutuphane_6"/>

<script>
//Buraya işlerimizi kodlarız
</script>
```

## Çorba Hazır!

İşte hikaye ondan sonra başlar, kütüphaneler çakışır, karışır, kodları düzenlerken bilerek bilmeyerek silinir (Ertan abi....!)

Ondan sonra insanlar Javascript'e sövmeye başlar ve Javascript ile harika şekilde halledilebilecek işleri bile garibim sunucu tarafına C#'a veya Java'ya yaptırır.

Oysa kurallar değişmiştir. npm denen mucizevi paket yöneticisi icat olmuş, insanlar aya çıkmıştır ama bir çok kişi bunu görmezden gelmektedir. Haksız sayılmazlar, çünkü sinsi sinsi yayılıp yüzbinden fazla paketi artık bünyesinde barındırmaktadır npm.

## [NPM](https://www.npmjs.com/) nedir?

Visual Studio kullananlar nuget'i, Python kullananlar pip'i, Linux kullananlar apt-get'i bilirler. Komut satırına şunu getir, bunu kur, bunu güncelle deriz. Bu tür araçlar "konsol üzerinden paketlerimizi kurmamıza olanak verir."

NPM ya da npm.js ise Javascript kütüphanelerinin tamamını barındıran evrensel bir yerdir. Bu kütüphane yardımı ile yukarıdaki gibi eski usülde "srcipt src" satırlarını şiir gibi dizmezsiniz, lazım olanlarını "npm install" komutu yardımı ile indirir, daha sonra [browserify](http://browserify.org/) adlı araç yardımı ile (elbette bu da bir npm paketidir) hepsini tek bir "bundle.js" dosyasına sıkıştırır ve sayfanızdan sadece tek bir "bundle.js" dosyası çağırırsınız. Tüm paketler güvenle bir arada olur. Her seferinde bu birleştirme işleminini yapmamak için ise [watchify](https://github.com/browserify/watchify) adlı paket kullanabilirsiniz. Bu ise sizin ayrı ayrı javascriptlerinizi her kaydedişte otomatik birleştirir.

## Haydi Deneyelim

- Linux kullanıyorsanız "sudo apt-get install npm" komutu ile windows kullanıyorsanız önce ilgili programı kurun. [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)
- Konsolu açın ve npm yazıp enter'a basın. Eğer çalışırsa npm kurulmuştur.
- Boş bir klasör açın ve cd komutu ile içine girin
- Konsolda bu klasörde iken "npm init" komutunu verin.
- Bu komut bu klasörde package.json adlı paket envanterini yaratır. Bu bir nevi kuracağınız her paketin otomatik olarak listeleneceği yerdir.
- Şimdi javascript birleştirme aracı browserify'i kurmak için şu komutu verin: _npm install -g browserify_
- Klasöre göz atınca node\_modules adlı klasör oluştuğunu görürsünüz bu otomatik inen paketlerdir.
- Şimdi ise denemek için hesap makinesi kütüphanesi olan [arithmetic](https://www.npmjs.com/package/arithmetic) adlı kütüphaneyi indirelim. Bunun için ise _npm install --save arithmetic_ komutunu kullanırız. Burada save parametresi paketin adını daha önce oluşturduğumuz package.json dosyasına yazar.
- Her şey hazır, şimdi direkt olarak newway.js diye bir dosya oluşturup içerisine aşağıdaki kodları yazalım:

```
 var arithmetic = require('arithmetic');
 var x = arithmetic.add(2,4);
 console.log("---merhaba---");
 console.log(x);
```

- Şimdi ne oluyor diyebilirsiniz? Bu kodları ayrı bir dosyaya yazdık. Bu kodlardaki arithmetic nesnesi için daha önce duymadığımız 'require' fonksiyonunu kullandık. Bu yeni Javascript'çenin importu demek.
- Şimdi browserify yardımı ile bu javascriptimizi sıkıştıracağız.
- Bunun için konsola: `browserify newway.js -o bundle.js` Normalde bu zorunlu değildir ancak olması faydalıdır. Bu komut sonrasında bundle.js adlı bir dosyamız oluşur.
- Şimdi index.html dosyasını açık sadece `<script src="bundle.js">` diyerek dosyamızı çağırabiliriz.

## Ne Yaptık, Ne Fark Var?

Normalde bu işlem için önce gidip artihmetic kütüphanesini bulup dosyasını indirip daha sonra bu dosyayı "script src" ile html dosyamıza çağıracaktık. Sonra da kendi yazdığımız (içinnde merhaba yazan) newway.js dosyamızı oluşturacaktık, ortada iki js dosyası ve html içinden çağrılan iki js referansı olacaktı. Bu daha fazla js için daha fazla iş demekti.

Yeni yöntemdeki senaryoda ise tek js dosyası mevcut, ayrıca kütüphaneleri indirmek için sitesine gitmek gerekmiyor.

## Buna Değer Mi?

npm paketlerini şuradan inceleyebilirsiniz: [https://www.npmjs.com/search?q=keywords:packages](https://www.npmjs.com/search?q=keywords:packages)

Bu paketlerin içersinde daha önce javascript'e yaptırmadığınız onlarca işlevi barındıran süper paketler var. Örneğin resim işlemeden Json içinden sorgu yapmaya, tarihleri şekillendirmeden (moment.js), yapay zeka ile resim tanıma kütüphanelerine kadar "ücretsiz" yüzbinlerce kütüphane var. Emeğinize değer.

Evet bu yazıyı buraya kadar okumuş pek az kişi olacağını biliyorum, o parmaklar ekrandaki yazıları kaydırırken bir çok fırsat kaçıyor :) Buraya kadar okuduysanız da "ehemm" diyip bu yazıyı unutup eski alışkanlıklarınızla kod yazmaya devam edebilirsiniz. Ama konfor zonda kalmak, ilkelliğe razı olmaktır. Daha sonra javascript çakışmaları yaşadığınızda bu yazıyı hatırlayacaksınız:)

Daha detaylı İngilizce bir yazı için: [https://medium.com/jeremy-keeshin/hello-world-for-javascript-with-npm-modules-in-the-browser-6020f82d1072](https://medium.com/jeremy-keeshin/hello-world-for-javascript-with-npm-modules-in-the-browser-6020f82d1072)

Beğendiniz mi?
