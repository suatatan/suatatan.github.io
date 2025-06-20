---
date: 2010-10-13
layout: post
tags:
- english
- linux
- longread
- technology
- ubuntu
- web-programlama
title: Ubuntu üzerinde PHP,Mysql ve Apache kurmak
---

Ubuntu üzerinde PHP ile web programlama yapacaklar için en kısa yoldan kurulum:

Önce Terminal(Donatılar->Terminal) ya da başka deyimle ubuntunun dos ekranını açıyoruz:

# **Apache'yi kurmak için**

**sudo apt-get install apache2**

diyoruz. Terminal kurulum için  devam edelim mi diye sorunca devam diyoruz.

Ekran tekrar komut bekleme moduna girene kadar(yani kurulum bittikten sonra) mozillamızı açıp

[http://localhost](http://localhost)

(Suat ATAN Hayratı)

yazıyoruz.

Mozilla ekranınd aşağıdaki ibareyi gördüyseniz herşey yolunda:

[![](/images/screenshot-mozilla-firefox1.png "screenshot-mozilla-firefox1")](http://suatatan.wordpress.com/wp-content/uploads/2010/10/screenshot-mozilla-firefox1.png)

# PHP'yi kurmak için

**sudo apt-get install php5 libapache2-mod-php5**

diyoruz. sonra değişikliklerin etkili olabilmesi için:

**sudo /etc/init.d/apache2 restart**

diyerek apacheyi yeninden başlatıyoruz.

Sonra PHP'nin de kurulumunu teyit için:

**sudo gedit /var/www/index.html**

diyerek açılan text dosyasına

Apache tamam (Suat ATAN Hayratı)

**<?php phpinfo();echo "<br/>PHP'de tamam.Suat ATAN hayratıdır:)";?>**

ifadesini yazıp kaydediyoruz.

[http://localhost](http://localhost)

firefoxta dediğimizde Apache Tamam  ve PHP de tamam ifadesini görürsek buraya kadar da işler yolunda.

MySQL kurulumu:

**sudo apt-get install mysql-server libapache2-mod-auth-mysql php5-mysql**

komutunu veriyoruz.

Mysql Kurulumundan sonra:

[![](/images/mysqlroot.png "mysqlroot")](http://suatatan.wordpress.com/wp-content/uploads/2010/10/mysqlroot.png)

Bu ekrana ise MySQL için kullanmayı düşündüğümüz parolayı giriyoruz. Sistem tekrar parola soracaktır. Tekrar giriyoruz.

Terminal tekrar serbest konuma geldiğinde ise kurulum bitmiş oluyor haydi hayırlı olsun.

Buraya kadarki işlemlerle Windosta muhtemelen kullanmış olduğunuz XAMPP, LAMPP,EasyPHP ve merlin gibi Apache,Mysql,PHP üçlüsünü Ubuntu bilgisayarıza kurmuş oldunuz. Apache server bilgisayar her başlatıldığında otomatik olarak başlatılır. Ancak Apache server'in sürekli olarak açık kalmasını istemezseniz Apache'yi açma ve kapama komutları da mevcut.

# Apache'yi sonlandırma,yeniden başlatma

## Apahce'yi sonlandırma(kapatma)

sudo /usr/sbin/apache2ctl stop

## Apache'yi yeniden başlatma(restart)

sudo /usr/sbin/apache2ctl restart

## Apache'yi açma(başlatma)

sudo /usr/sbin/apache2ctl start

# Son zamanların modası kullanıcı dostu (ya da arama motoru dostu) URL'ler:

Seo friendly URL,Pretty Url gibi isimlerle tanınan url' tiplerini (Yani mesela suatatan.com/index.php?sayfa=iletisim yerine suatatan.com/sayfa/iletisim türünden url'ler) bilindiği üzere gerçek sunucular üzerinde httacess dosyası üzerinde yapılır. Ancak bunu ubuntu bilgisayarınızda denemek isterseniz Mod Rewrite kütüphanesi gereklidir bunu kurmak için ise:

sudo a2enmod rewrite

# Hangi ortamda PHP üzerine çalışayım

Ubuntu'da PHP için bir çok IDE vardır ancak ben şiddetle Netbeans'ı öneririrm. Netbeans yanlızca Java değil, PHP,C,Ruby,Python gibi dillerle de kodlamaya olanak veriyor. Farkı nedir derseniz OOP(Object Oriented Programming) nesne yönelimli programlama yaparken, yazdığınız sınıfları ezberlemek zorunda kalmadan direkt olarak hatırlatıcılar vasıtası ile kullanmanıza olanak vermesi, büyük çaplı projelerde arama ve navigasyonunun gücüdür.

# Son Hatırlatma

Ubuntu'da Apache kurduğunuzda ubuntu varsayılan olararak **/var/www/** dizinini kullanır ki bu dizine erişim hakkınız olmayabilir ancak sorun değil, bunun yerine sizin belirlediğiniz sabit bir dizini web root olarak kullanabilirsiniz bunun için ise:

`sudo` `gedit /etc/apache2/sites-available/default`

yazınız. Açılan gedit text editöründe /var/www/ dizini yazan yeri mesela home klasörünüzdeki **/home/suat/myapache** olarak değiştirip dostyayı kaydettikten sonra:

`sudo` `/etc/init.d/apache2 restart`

diyerek apacheyi yeniden başlatınız. Artık myapache klasörünüz altında çalışabilirsiniz

 

(Suat ATAN Hayratı, bu yazının orjinali suatatan.wordress.com'da kopyacılar, paylaşım için teşekkürler diyen afacan hırsızlar için böyle tuhaf yöntemler kullanıyoruz. Ama isim belirtilerek alıntı serbest,alta linkimi vermek kaydıyla)

# Var mı bu şekilde yaptığın site be abi

Şimdi Ubuntu altında dreamweaversiz, flash'sız(bunlar uyuşturucudan beter) ne yapılabilir, saf kodla denilebilir. Örneği var Ben anlattığım araçlarla (elbette kırk fırın da ekmek yemiş olarak) Van Gürpınar ilçesi için hazırladığım Havasor.com görülebilir.

Adresi:

[http://www.havasor.com](http://www.havasor.com)
