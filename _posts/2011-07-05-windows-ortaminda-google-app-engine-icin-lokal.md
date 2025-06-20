---
title: "Windows ortamında Google App Engine için lokal sqlite veritabanı"
date: 2011-07-05
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "web-programlama"
---

Google App Engine launcher'e yapacağımız küçük ayarlama ile Google App Engine uygulamalarımızda kaydettiğimiz verileri gerçek Sqlite veritabanına kaydetmeyi sağlayabiliriz. Böylelikle test aşamasında her seferinde veri girme zorunluluğu kalmadığı gibi sonradan gerçek sunucuya yüklerken de kolaylık olacaktır.  
  
Google App Engine uygulamamamızı açıp, uygulamamızı seçtikten sonra Ctrl+I diyerek açılan ekrandaki “Launch Settings” bölümündeki “Extra command line filags” kısmında şu ifadeyi yazıyoruz:  
`    --datastore_path=D:/Users/suat.atan/Desktop/suat.db --use_sqlite    `  
  
Daha sonra uygulamamızı çalıştırıyoruz. Uygulama çalıştığında verilerimiz masaüstündeki suat.db adlı dosyaya kaydedilecektir. Bu dosya veritabanı dosyamızdır. Bu dosyanın içeriğini Sqlite Broswer türü programlarla görebiliriz.
