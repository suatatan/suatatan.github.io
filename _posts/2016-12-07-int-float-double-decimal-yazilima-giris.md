---
title: "Int, Float, Double, Decimal... Yazılım’a giriş dersi neden önemlidir."
date: 2016-12-07
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "aspmvc"
---

Yazılım'a giriş derslerinde her nedese ‘String'den önce hep sayısal değerler öğretilir. Hep de hızla geçilir. Integer akılda kalır, float ve decimal farkı hatırlanmaz. Ama gün gelir, parayla pulla ilgili bir uygulamayı yazar/geliştirsiniz işte orada küsüratlar kuruşlar değerli hale geldiğinde ilk derslerde duyduğunuz/okuduğunz şeyler durumu değiştirir.

Hikaye şuradan başlıyor: Daha önce C#‘da hazırlanmış ve parasal işlemlerle ilgili epey kompleks süreçler yürüten kodların veritabanıyla çok ilişkisi olması gerekçesiyle SQL Stored Procedure ile yeniden yazılmıştı.Yazılan bu kodlarda daha önce C#'da float olak tanımlanmış parasal değerler SQLServer'daki Stored Procedure'ler içinde yeni kodlarımızda Decimal(18,6) şeklinde tanımlanmıştı.

Günün birinde, Decimal(18,6)'nın float olmadığını gördük:) Saçma gelebilir ancak kodlarımızda C# tarafında diyelim ki 5.20 gelen (tabii ki 5.19 da gelecek) float değerlerin SQL Stored Procedure tarafında 5.2 olarak hesaplandığını gördük. Sonra da [çözümü](http://dba.stackexchange.com/questions/56451/float-datatype-with-2-digits-after-decimal-point/56453#56453?newreg=4548ccdc01db40f2be964bbf6e2ec40f) bulduk.

Biraz da modifiye ederek şu iki satırla öğrendik:

```

declare @x as float(24);

set @x = 7376.628 - 199.01 - 46.63
--set @x = @x - 199.01 - 46.63

select convert(decimal(10,6),@x)

```

Yukarıdaki kodları siz de deneyebilirsiniz. float değerinden 24 parametresini kaldırdığınızda 'küsüratların intikamını’ görebilirsiniz.

Tecrübe: Sayısal değer tiplerini adam yerine koyun:)

Tecrübe 2: SQLServer’da da float var:) Hatta money tipi var.
