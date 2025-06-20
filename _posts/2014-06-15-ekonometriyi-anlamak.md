---
categories:
- genel
date: 2014-06-15
layout: post
tags:
- ekonometri
- ekonomi
- english
- isletme
- istatistik
- longread
- okuma-notlari
- technology
title: Ekonometriyi anlamak
---

  

  

Ekonometriyi anlayamıyorum, çok soyut ve zevksiz filan diyorsanız bir çözümümüz var. Jon Stewart'ın **“[Understanding Econometrics](http://books.google.com.tr/books/about/Understanding_econometrics.html?id=sSq7AAAAIAAJ&redir_esc=y)”** adlı kitabını bulunca en az Enigma'yı çözmüş kadar sevindim. Nitekim bazen hayal alemine daldırtan ve insani olmaktan çıkan ekonometrik kavramları insani bir dille anlatmaktan söz ediyor ve sıfır ekonometri bilgisine sahip birine anlatırcasına anlatıyordu. Bu yönü ile bu kitabı kesinlikle öneriyorum.

  

![Ön Kapak](/images/books)

  

Kitabı okurken, yine [okuma notu](http://blog.suatatan.com/2013/05/suat-atann-okuma-notlar-neden-var-neden.html) kabilinden aşağıdaki notları aldım. Koyu punto ile gösterilen tanımlar kitaptan yaptığım alıntıların Türkçe halidir.

  

[![](/images/gif.latex)](http://latex.codecogs.com/gif.latex?C%3Da&plus;%5Cbeta%20D)

denklemini ele alalım C: Tüketim, D talep olsun.

  

**Intercept:** a değeridir

**Slope:** Beta değeridir.

**Dependent value:** C değeridir.

**Explanatory variable:** D değedir.

**Marginal Propensity** (Marjinal eğilim), Talebin tüketime eğilimidir.

  

  

Doğal olarak talep ile tüketim arasında yukarıdaki gibi bir denklem gerçekçi olmaz. Çünkü bu denklem doğrusal bir denklemdir ve iş o kadar kolay olsaydı talebe bakıp çat diye tüketimi tahmin ederdik. Eh bunun için denklemi biraz geliştirmemiz gerekiyor:

  

[![](/images/gif.latex)](http://latex.codecogs.com/gif.latex?C%3Da&plus;%5Cbeta%20D&plus;%20u)

  

**Disturbance (**hata terimi): u ile gösterilen genellikle _ne idüğü belirsiz_ değerdir.

  

**En Küçük Kareler Yöntemi**

  

Bir anakütlenin ya da zaman serisinin tamamının kendi içindeki ilişkisi şöyle olsun:

  

![](/images/gif.latex)

  

Anakütleyi bilmediğimiz ya da zaman serisinin bir parçasını aldığımız zamanki denklem yukarıdaki ile aynı değil ama ona yakın olan başka bir denklem olacaktır. Bu denklem de şöyle gösterilsin:

  

![](/images/gif.latex)

  

Şimdi bu iki denklem arasında olan fark ise ![](/images/gif.latex) ile gösterilir ki formülü şu olur: 

  

![](/images/gif.latex)

  

İşte bu ![](/images/gif.latex) değerine kalıntı ya da **residual** denilir.

  

Bu residual kavramını [![](/images/gif.latex)](http://latex.codecogs.com/gif.latex?C%3Da&plus;%5Cbeta%20D&plus;%20u) denklemindeki ![](/images/gif.latex) değeri ile karıştırmayın. U değeri yukarıda belirttiğimiz üzere disturbance (hata terimi) olup artık alfa ve betamızın açıklayamadığı, ya da belki tümden açıklanamayan dolayısıyla tesadüfi olması beklenen bir değerdir.

  

Şimdi ![](/images/gif.latex) denklemimiz ile ![](/images/gif.latex) denklemimiz arasındaki farklı en küçük hale getirmek yani  ![](/images/gif.latex) değerini en küçük hale getirmek istesek ne yaparız? (Niye istiyoruz çünkü örneklem modelimizin ana kütleyi büyük ölçüde yansıtmasını bekleriz) 

  

Kitapta anlatılan ve benimse detayına girmediğim matematiksel ıspatla en küçük kareler yöntemi ile örnekleme serpilme diyagramında öyle bir regresyon çizgisi çizeriz ki anakütle serpilme diyagramı olduğunda buna en yakın halde olsun \[DOĞRULANMALI\].
