---
categories:
- bilgisayar
- genel
date: 2012-12-15
layout: post
tags:
- turkish
- google-app-engine
- longread
- technology
title: Google App Engine kitabımda bazı okurlarımızın 7. bölümde karşılaştıkları hata
  hakkında
---

  

**Okurlarımdan Cemali Gencer Bey şöyle sordu:**  
  

Merhaba Suat Bey, Kitabınızdaki 7 Bölümde bulunan uygulamada problem yaşadım. Users kütüphanesi ve üye oturum yönetimi örneği (projem6 örneği) örneğini çalıştıramadım.Karşıma anlamadığım hatalar çıktı ekran görüntüsünü de bir adrese yükledim vaktiniz varsa inceler misiniz?

  

[![](/images/b9751-348sozl.png)](https://suatatan.wordpress.com/wp-content/uploads/2012/12/dd3c2-348sozl.png)

  

**Cevabım:**

  

Sorunun kaynağı; anaprogram.py dosyasındaki # ile başlaytan yorum satırlarında geçen bozuk karakterlermiş. Bu 2. kere sizde oldu. Sebebi kullandığınız kod editörlerindeki codeset ayarları olabilir. Ancak ayrıntıya hiç gerek yok. Hata raporunda dikkat ettiyseniz **‘ascii codec’ can’t decode** hatasına bir daha denk gelirseniz python dosyanızdaki bozuk karakter varsa silin.

  

Düzeltilmiş kaynak kodlar şuradan [indirilebilir](http://ubuntuone.com/2Ge8Ba3cTqdcp1bFG6I6YP).

  

Kendisine teşekkür ederim.
