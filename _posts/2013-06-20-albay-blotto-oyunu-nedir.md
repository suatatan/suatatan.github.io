---
categories:
- genel
date: 2013-06-20
layout: post
tags:
- akademik
- english
- isletme
- longread
- technology
title: Albay Blotto Oyunu Nedir?
---

  

Colonel Blotto (Albay Blotto) tanımlanırken genelde savaş örneği verilir. Taraflardan biri Albay Blotto'dur. Biz ise bunu yerelleştirerek bu oyunun mantığını anlatalım:  
  
Yıldırım Beyazıt ile Timur Ankara ve Konya'da savaşacaklardır. Yıldırım Beyazıt'ın 3 ordusu Timur'un 4 ordusu olsun. Bu savaş oyunu anlaşma ile bu iki cephede en fazla ordu bulunduran kişi o cepheyi kazanacak olsun. Yani mesela Yıldırım Beyazıt Konya'ya 2, Timur 3 ordu gönderirse Timur kazanır ve 1 puan alır. Bu iki taraf birbirinin hangi cepheye kaç ordu göndereceğini bilmeyecek.  
Bu durumu şöyle şematize edelim.  
  

| [![](/images/ab2d6-colonelblotto2.jpg)](https://suatatan.wordpress.com/wp-content/uploads/2013/06/ab2d6-colonelblotto2.jpg) |
| --- |
| İllüstrasyon: Bendeniz. |

  
Bu durumdaki olasılıklar şöyle modellenebilir:  
Örneğin:  
Yıldırım Beyazıt Konya'ya 3,m Ankara'ya 0 ordu yollarsa Yıldırım Beyazıt için (4,0)  
Timur Konya'ya 0,Ankara'ya 4 ordu yollarsa Timur için (0,3)  
  
Böyle bir durumda Konya'da 4-0: 4 Yıldırım Beyazıt kazanır, Ankara'da ise 0-3 3 Timur Kazanır  
Toplam puan olarak da Yıldırım beyazıt Konyada 4 Ankara'da -3 puan alacağından 4-3=1'dir  
Timur için ise Ankara'da -4, Konya'da 3 puan alacağından -1 puandır.  
  
Tüm bu ihtimaller matris olarak gösterilebilir:  
  
[http://mindyourdecisions.com/blog/2012/01/24/the-colonel-blotto-game/](http://mindyourdecisions.com/blog/2012/01/24/the-colonel-blotto-game/) örneği var.  
  
İşte bu Colonel Blotto oyunudur. 1921'de Emile Borel tarafından ortaya konmuştur. Bu oyun için optimum çözüm nasıl sağlanır?  
Hangi taktik baskın olur. Onu da öğrenince paylaşacağım. Ya da biliyorsanız siz yorum olarak yazabilirsiniz.
