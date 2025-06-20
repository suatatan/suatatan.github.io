---
layout: post
title: "İşletmenin nakit ihtiyacı nasıl belirlenir?"
date: 2014-11-30
categories: 
  - "genel"
tags: 
  - "finans"
  - "isletme"
---

![image](/images/tumblr_inline_nfus1fmFuX1r4exmc.jpg)

[Şu yazımızda](http://blog.suatatan.com/post/103972391975/isletme-sermayesi-ihtiyac-nas-l-hesaplan-r) işletmelerin, **işletme sermayesi** ihtiyacının nasıl hesaplanacağını anlattık. Hatırlarsanız Orada Agah Greyfurt Reçelleri A.Ş. adlı firmanın ne kadar **çalışma sermayesine ihtiyaç duyduğunu** analiz etmiştik ve yıllık 10.000 TL çalışma sermayesi gerekir demiştik. Peki Bu 10.000 TL içerisinde nakit düzeyimiz ne olmalıdır? Öyle ki artan nakdi dönen varlıklar ortamından çıkmadan, faiz veya hızlıca paraya çevirebileceğimiz hisse senedi veya tahvile yatırabilelim. Yani optimum düzeyde nakit tutalım. Bunun için 3 yöntem vardır.

```
- Baumol Yöntemi
- Miller-Orr Yöntemi
- Stone Yöntemi
- Beranek Yöntemi
```

Bu 3 yöntem **nakit ihtiyacı** hesabı içindir, **işletme sermayesi** hesabı için **değildir** zinhar karıştırılmaya.

Mezkur örneğimizde;Agah Portakal Senede 100.000 TL'lik satış yapmakta, satılan malların maliyeti ise **60.000 TL** demiştik. Agah Greyfurt Reçelleri A.Ş. bilançosu ise şöyle idi:

Agah Portakal Reçelleri A.Ş.‘nin işletme sermayesi şöyledir:

```
- Kasa                 10.000 TL
- Banka                 5.000 TL
- T.Alacaklar           2.500 TL
- Stoklar               1.200 TL
- İŞLETME SERMAYESİ:   18.700 TL
```

Şimdi Kasa'daki bu 10.000 TL gerçekten, gereğinden fazla mı az mı?

Şimdi Baumol Yöntemi ile Nakit İhtiyacımızı Hesaplayalım:

## Baumol Yöntemi ile Nakit İhtiyacı Hesabı

Teorik açıklamalarını sonra anlatacağım, hesabımızı şöyle yaparız:

![image](/images/tumblr_inline_nfurzslR8w1r4exmc.gif)

Burada:

- Q: Optimal Nakit Düzeyini  
- N: İşletmenin yıllık nakit ihtiyacını
- F: Vadeli Mevduat hesabından para çekmenin işlem başı bedelini (Eğer tahville işlem yapılıyorsa tahvil satış giderini)
- i: Vadeli Mevduat hesabının faiz oranını (Eğer tahville işlem yapılıyorsa tahvil faizini) temsil eder. ([Kaynak](http://www.howard-fletcher.com/uploads/Cash_Flow_Part_12_-_Cash_Models.pdf))

Şimdi, Agah Greyfurt Reçelleri A.Ş.'nin her sene 60.000TL'ye ihtiyacı vardır. Bunu biliyoruz. Diyelim ki, F değeri, yani işlem harcı işlem başına 3 TL, faiz oranı (i) de %5 yani=0.05 olsun.

[Wolfram Hesap Makinesinden](http://www.wolframalpha.com/input/?i=sqrt%282*60000*3%2F0.05%29) işlem yaptığımızda:

```
Q=2683.28 TL olarak hesaplarız.
```

## Yorum

Agah Greyfurt Reçelleri A.Ş'nin kasasında 10.000 TL nakit tutulmaktadır. Oysa Baumol Modeline göre hesapladığımız Optimal Nakit tutarı 2683.28 TL'dir. Agah Bey gereğinden fazla nakit tutmaktadır. Yıllık Nakit ihtiyacı 2 katına bile çıksa yani 60.000 TL yerine 120.000 TL'ye bile ihtiyaç duysa, kasada tutulan miktar çok fazladır. Çünkü Wolfram'da N=120.000 ile hesap yapılınca [Q=3794.73](http://www.wolframalpha.com/input/?i=sqrt%282*120000*3%2F0.05%29) TL elde edilmektedir.

Şimdi somut örneğimizden sonra bu formülün nereden çıktığından kısaca söz edelim: Baumol modeli, işletmenin nakit ihtiyacını tıpkı stok gibi ele alıp, optimal stok miktarı formülünden yola çıkarak ortaya koymuştur. Nakdi stok gibi ele almak -dikkatli blog okurum farkedecektir- nakdin böyle bir mal gibi güzel güzel azalıp, üstüne konduğunda arttığını varsaymak anlamına da geliyor. Oysa nakit öyle azalıp artmaz, aniden bir ceza ödersiniz nakdiniz tepe taklak olur, ya da bir karşılığı kalmayan, umut kesitğiniz bir alacak vardır, bir sabah tahsil edersiniz (Not:Her türlü çek senet tahsili için beni arayın:) o nedenle, nakit akışını böyle lineer saymayan modellere de ihtiyaç vardır. Heyecanlanmayın, millet bulmuş, aha da modeller:

- Miller-Orr Modeli
- Beranek Modeli
- Stone Modeli

Bu modelleri bir sonraki yazımda anlatırım (belki). Yoğun istek olursa:)
