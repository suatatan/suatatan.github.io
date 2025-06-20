---
categories:
- cocuklar
- bilgisayar
date: 2017-06-04
layout: post
tags:
- arduino
- english
- longread
- technology
title: Arduino Kullanmaya Giriş
---

![ar2](/images/ar21.jpg)

Arduino yukarıdaki resimde sol tarafta gördüğünüz cihazdır. Bu cihaz bilgisayara bağlanarak içerisine program yüklenebilir ve yüklediğiniz program ile dış dünyaya ses, ışık gibi sinyaller gönderebilirsiniz. Arduini bilgisayara USB ile bağlanıyor.

Sağdaki nesne ise breadboard'dur (İngilizcesi ekmek tahtası) türkçeye devre tahtası olarak çevrilir. Bu nesne elektronik parçaları (diyot, led, direnç) birbirine lehimsiz bağlamak için kullanılır.

Peki bu cihazları nasıl edineceksiniz? Ben 60 TL'ye şuradan [aldım](http://www.robotistan.com/arduino-baslangic-seti).

Değerli hocalarımdan birinin oğluma hediye ettiği bir Arduino kitabı ile benim de Arduino merakım başladı. Zaten kitabın üzerinde 9+ ∞  yazıyordu. Yani çocuktan babasına herkes kullanabilir demek.

Arduino ile ses algılayıcısısından yanıp sönen ledlere (sizin yaptığınınz programa göre), oradan canlı butonlarla etkileşen programlara kadar her şeyi yapabiliyorsunuz.

Arduino çocukların elektronlik devreleri anlamaları, kendileri yapmaları ve eğlenmeleri için müthiş bir araç. Kesinlikle analitik düşünme ve sabır için bire bir.  Oğlum da Arduino ile çok eğleniyor.

Peki programlamayı nasıl öğrenecekler? Malum Arduino'da diyelim ki 10 saniyede bir lambayı yak söndür demek için şu kodları yazarsınız:

```
// the setup function runs once when you press reset or power the board
void setup() {
// initialize digital pin LED_BUILTIN as an output.
pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
digitalWrite(LED_BUILTIN, HIGH); // turn the LED on (HIGH is the voltage level)
delay(1000); // wait for a second
digitalWrite(LED_BUILTIN, LOW); // turn the LED off by making the voltage LOW
delay(1000); // wait for a second
}

```

Bu kodları Çocukların yazması zordur ancak onun için de bir çözüm üretilmiş. [Mblock](http://www.mblock.cc/)  adlı program yardımı ile çocuklar Scratch mantığında yani sürükle bırak yaparak görsel olarak program geliştiriyorlar. Bunu gerçekten başarıyorlar. Oğlum Agah sıkı bir Scratch kullanıcısı. Scratch hakkındaki yazımı [buradan](https://suatatan.wordpress.com/2014/03/28/cocugunuzun-bill-gates-olmasini-ister-misiniz/) okuyun.

![scr.png](/images/scr1.png)

Yukarıda Scratch'ın web sayfası görülüyor. Sağ bloktaki görüntü görsel kodlamaya ait renkli bloklar.

Scratch'ın bir benzeri de var o da [code.org](http://code.org). Bu site çocuklara sertifika da veriyor. Sertifika verdiğini de oğlumun atladığı seviyelerden sonra bana haber vermesi ile öğrendim.

Şimdi gelelim Arduino ile yaptığımız ilk projeye. Bu bir robot veya uzay aracı değil:) yeni başlayan işi bir program. Mantığı şu; Arduino'ya bağladığımız led lambanın bizim belirlediğimiz aralıkla bizim belirlediğimiz kez yanmasını istiyoruz. Adım adım yaptığımız şuydu:

**1- Mblock'ta görsel kodlama ile programı yaz.**

Ekran görüntüsü şöyle:

![ar1](/images/ar1.jpg)

Gördüğünüz gibi sol blokta mantıksal olarak kolayca anlaşılabilen süreç Mblock tarafından otomatik olarak Arduino koduna dönüştürülüyor.

**2- Gerekli bağlantıları yap**

![ar2](/images/ar21.jpg)

Breadborad ile Arduino arasında yaptığımız bağlantı yukarıdaki gibi. Detaylı çizimi ise şöyle:

![ExampleCircuit_sch](/images/examplecircuit_sch.png)

Arduino'nun resmi sitesindne aldığımız bu devrede aslında olay birbirine seri bir biçimde bağlanmış 220 ohm'luk bir direnç ve LED'den ibaret. Tabi çıkışı D13'e bağladığımızı unutmayalım. Çünkü kodda bunu Arduino'ya söylüyoruz.

**3- Programı Arduino'ya yüklüyoruz**

İlk aşamadaki ekran görüntüsüne baktığımızda Bağlan>Seri Port üzerinden COM1 veya COM kaç gelmiş ise onu seçiyoruz. Hangisinin doğru olduğu deneme yanılma.  Daha sonra da sağ blokta yazan "Arduino'ya yükle" butonuna basınca kodlarımız Arduino'nun beynine:) gidiyor.

**4-Programı çalıştırmak**

Program Arduino'nun beynine yüklendiği anda ekrana yükleme tamamlandı yazısı çıkıyor ve Arduino emirlerimizi uyulayarak ledi istediğimiz aralıkta yakıp söndürüyor.

Videosu:

\[youtube https://www.youtube.com/watch?v=dLiwkfl9wj8&w=560&h=315\]

Çocuğunuza öğretici bir merak kazandırmak istiyorsanız kesinlikle Arduino ile ilgilenin.
