---
categories:
- bilgisayar
date: 2019-04-26
layout: post
tags:
- turkish
- longread
- technology
title: Firebase Kullanmaya Giriş
---

![](/images/image.png)

[Firebase](https://firebase.google.com/) Google'ın sunduğu sunucu tarafı olmasına ihtiyaç bırakmayan bir hosting, veritabanı ve barındırma hizmetidir. Firebase ile hızla site hazırlayıp yayınlayabilirsiniz. PHP, Java, Python, C# veya başka bir dil kullanmaya gerek yoktur. Veri tabanı işlemleri dahi Javascript ile yapılır. Veritabanı olarak da Firebase Collections adlı bulut sisteminde veriler JSON benzeri yapıda tutulur.

Aşağıdaki komutlarla Firebase üzerinde çalışmaya hazır ve veritabanı bağlantısı yapan (Firebase Collection ile) ve Vue gibi herhangi bir araçla bağlantısı olmayan düz bir web uygulaması hazırlanır. Vue kullanarak Vue SPA tarzı bir uygulama için yazının devamındaki başlığa bakın:

Firebase sitesine giderek yeni bir proje oluşturun.

## Aşağıdaki Komutları Çalıştın

```
#Eğer yoksa şu komutla kurun (windoesta sudo kullanmayın)
sudo npm install -g firebase-tools
#Başlatın
firebase init
#Lokalde çalıştırın
firebase serve --only hosting

```

# Daha sonra index.html dosyasını şöyle dizayn edin

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Atan Finans</title>

  <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->

  <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js"></script>

  <!-- Add Firebase products that you want to use -->
  <script src="https://www.gstatic.com/firebasejs/5.9.4/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/5.9.4/firebase-database.js"></script>

  <script src="https://www.gstatic.com/firebasejs/5.9.4/firebase.js"></script>
  <script>
    // Initialize Firebase
    var config = {
      apiKey: "Bu Kodu firebase konsolundan alın webden",
      authDomain: "siteadiniz.firebaseapp.com",
      databaseURL: "https://atanfinans.firebaseio.com",
      projectId: "siteadiniz",
      storageBucket: "siteadiniz.appspot.com",
      messagingSenderId: "Bu kodu fireabse konsolunda alın webden"
    };
    # Veritabanına veri ekleme
    firebase.initializeApp(config);
    var db = firebase.firestore();
    db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

  </script>

  <style media="screen">

  </style>
  </head>
  <body>
    <div class="ana">
      <h1>Atan Finans</h1>

    </div>
  </body>
</html>

```

# Firebase Üzerinde Vue Uygulaması

Vue Uygulaması kendi içinde özel bir dosya yapısı ve modüller barınıdırır. Bunun için özel bir kurulum gerektir:

```
vue create vue-app

```

Vue Uygulamasında Vuex ve Sass kullanmak için (kullanmanız önerilir) modülleri şöyle eklemelisiniz:

```
vue init webpack vue-app
npm i vuex
npm i node-sass sass-loader --save-dev

```

Projeyi lokale çalıştırmak için:

```
npm run dev

```

Projeyi sunucuya yüklemek için:

```
firebase deploy

```
