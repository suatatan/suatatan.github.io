---
layout: post
title: "Veri Tabanı Güvenliği Eğitimi Notları"
date: 2020-02-21
---

- [https://www.exploit-db.com/ghdb/4924](https://www.exploit-db.com/ghdb/4924) SQL yedeklerini internette unutan siteleri bulup bu dosyaalarından veri tabanı şifreleri bujlunabilir.
- SQL Union select fonksiyononu url'den göndererek diğer tablo adlarını öğrenebilir ve faydalanabilirsiniz: [https://portswigger.net/web-security/sql-injection/union-attacks](https://portswigger.net/web-security/sql-injection/union-attacks) Bu fonksiyonda tablo adı ve kolonları bilmeye gerek yoktur.
- Yukarıdaki işlemden sonra kullamnıcı tablosunda kullancı adları ve şfireleri de elde edilebilir.
- Bunu elle yapmak yerine SQLMap adlı uygulama ile elle de yapılabilir. sqlmap -u "url" denerek sonuçlar görüntülenebilir ve buradan zaafiyetler tespit edilebilir.
- vulnweb.com adlı web sayfasından öğrendiğiniz saldırı tekniklerini deneyebilirsiniz.
- İç güvenliği teminen hangi kullanıcnın hangi IP'den girebileceği ve ne yapacağı belirlenmeli ve ayarlanmalıdır.
- Kullanıcıların çalıştırabileceği fonksiyonlar belirlenmeli. Kullanıcılara insert select gibi fonksiyonlarda kısıtlama getirilebilir. **Grant insert,update on firma.tablo1 to 'editor\_kullanici'@ip** şeklinde bir sınırlama getirilebilir.
- **show grants** komutu ile hangi tabloda kimin ne yetkisi olduğu görülebilir.
- Hangi tablolara gireceği ayarlanmalıdır.
- Diyelim 'developer' diye bir grup var. Kullanıcı adı sabit, farklı IP'ler tanımlanarak tek tanımlama ile grup halinde tanımlşama da yapılabilir.
- Yetkilendirmek için 'grant' yetki kaldırmaki için 'revoke' kullanılır.
- Bir kullanıcıyı sadece spesifik bir veri tabanına tanımlayıp geri kalanını izole etmek mümkündür.
- Her ne kadar bazen kapalı da olsa sql iiçerisinde LOAD\_FILE adlı bir komut vardır. Bu komout ile sistemdeki herhangi bir yere dosya yazmak olasıdır. Eğer bu açık varsa bu çok iyi şekilde kullanılabilir. Bu foksiyonla dosya okumak da mümkündür.
- Load file açık gelir MySQL ve SQLServer'da. DÜZELTİLMELİ.
- Yukarıdaki senaryoda bu durumda PHP dosyası içerisinde exec fonksiyonu içerisinde $\_GET("") içerisine CMD yazılarak buradan konsolda istenen şey çalıştırılabilir. Böylece o php dosyasını web arayzüden çalıştırıp url'den paramatere yollanabilir.
- Düzenli mysql yedeği için mysqldump komutu Cron Jobs olarak tanımlanmalıdır.
- MySQL'de logları tabloda da haricen text dosyalarında da tutmak mümkündür.
- Loglar üzerindeki logları incelmeek için select \* from mysql.general\_log ile konutlar görünür.
- Ama komutlar hexadesimal olarak görünür convert fonsksiynonu ile komutlae görünmelidir.
- Güvenlik amacıyla logların text olarak saklanması iyidir. Bu biraz yer kaplar.
- Dosya halinde log tutulduğu takdirde logun yazılacağı yerdeki dosya izinleri iyi ayarlanmalıdır.
- MSSQL'de xmp\_cmdshell saldırıları çok kritiktir. Bu sayede veri tabanı sunucusu üzerinde sunucu konsoluna komut yollanabilir. Bunu engellemek için 'sa' kullanıcısı uygulamaların içerisinde kullanılmamalıdır.
- Bu ilkelere uyulduğu takdirde paralı bir güvenlik uygulaması olmaksızın da sunucu güvenliği sağlanabilir.
- Port numaraları defaulttan değiştirilmelidir ki Shodan yakalamasın.
