---
layout: post
title: "Vide.js ve Howler.js kütüphaneleri ne işe yarar?"
date: 2023-04-18
---

Vide.js ve Howler.js, web geliştiricilerin video ve ses öğeleriyle çalışmayı kolaylaştırmak için kullanabilecekleri JavaScript kütüphaneleridir.

Vide.js, HTML5 video etiketini kullanarak özel video oynatıcıları oluşturmaya yardımcı olur. Vide.js, video oynatıcısını özelleştirmek için CSS ve JavaScript kullanımını kolaylaştırır. Bu kütüphane, videoların oynatılmasını kontrol etmek ve dinamik olarak videoları yüklemek gibi özellikleri de sağlar. Ayrıca tam sayfa video arkaplanlar da oluşturabilirsiniz.

Örnek olarak, bir HTML sayfasına vide.js kütüphanesini dahil ederek özel bir video oynatıcı oluşturabilirsiniz:

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Özel Video Oynatıcı</title>
  <link href="https://vjs.zencdn.net/7.15.4/video-js.css" rel="stylesheet">
  <script src="https://vjs.zencdn.net/7.15.4/video.min.js"></script>
</head>
<body>
  <video id="my-video" class="video-js" controls preload="auto" width="640" height="264" data-setup="{}">
    <source src="video.mp4" type='video/mp4'>
  </video>
  <script>
    var player = videojs('my-video');
  </script>
</body>
</html>
```

Howler.js ise web sayfalarına ses eklemeyi kolaylaştıran bir JavaScript kütüphanesidir. Bu kütüphane, müzik, ses efektleri veya konuşma gibi birçok farklı ses türünü oynatmak için kullanılabilir. Howler.js, ses dosyalarını yüklemek, oynatmak, duraklatmak ve yeniden başlatmak gibi çeşitli özellikler sağlar.

Örnek olarak, bir HTML sayfasına howler.js kütüphanesini dahil ederek bir ses dosyası çalabilirsiniz:

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Howler.js Kullanımı</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js"></script>
</head>
<body>
  <button onclick="playSound()">Ses Dosyasını Çal</button>
  <script>
    var sound = new Howl({
      src: ['sound.mp3']
    });
    function playSound() {
      sound.play();
    }
  </script>
</body>
</html>
```

Yukarıdaki örnekte, howler.js kütüphanesini dahil ediyoruz ve "Ses Dosyasını Çal" adlı bir düğme ekliyoruz. Düğme tıklandığında, "sound.mp3" dosyasını çalmak için bir howl nesnesi oluşturuyoruz ve oynatma işlemini gerçekleştiriyoruz. Dikkat ettiyseniz dışarıdan bir dosya çağırmadık hepsi howler.js ile birlikte hazır geliyor.
