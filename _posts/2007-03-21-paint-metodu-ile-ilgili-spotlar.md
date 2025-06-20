---
categories:
- bilgisayar
- genel
date: 2007-03-21
layout: post
tags:
- turkish
- longread
- technology
- web-programlama
title: paint() metodu ile ilgili spotlar
---

[![](/images/koord_java.jpg)](http://bp0.blogger.com/_Ie5YRBfqBlQ/RgEqL_-2n8I/AAAAAAAAAAM/5iyyFh3NudU/s1600-h/koord_java.jpg)

1. Paint metodu bilindiği üzere Java'nın her türlü geometerik şekil, yazı ve resim gibi görselleri göstermek için kullanılan bir metot olup her nesne koordinat düzleminde yerleştirilir.
2. Paint metodunun birebir başka bir event metodu altından çağrılması güç olduğundan çoğunlukla şartlı ifadelerle (if, switch...) olay yakalaması sağlanır.
3. Paint metodunda koordinat düzlemi normal kordinat düzlemine göre Y ekseninde baş aşağıdır. Bu durumun yaratacğı sıkıntıları şöyle aşabilirsiniz. Çizim alanını kare varsayarak ebat adında bir değişken tanımlayın. Mesala int ebat=500 ; olsun Programın her açılışında setSize(ebat,ebat); programı her açılışta 500x500 piksel alanında açmış olursunuz. Koordinatlarınınzın 0,0 noktasının tam ortada olacağını varsayarak orijin diye bir değişken belirleyin: int orijin=(int)(ebat/2);
4. Bundan sonra yapacağınız drawLine metotlarında drawLine(p1x,p1y,p2x,p2y) yerine drawLine(p1x,orijin-p1y,p2x,orijin-p2y) derseniz çizeceğin grafik sizin kendi yarattığınız 0,0 düzlemine göre değişecektir.  
    
5. Appletler içinde paint metodu kullanılca her repaint() çağrısı ekranın bir önceki halini silip yenisini yazar ancak JFrame'ler içinden repaint() işleminde önceki ekran değişmez yazı ve görseller üstüste biner. Bu durumu engellemek için ise repaint() yerine:  
    

g.clearRect(silinecek alan x noktası,silinecek alan y noktası,silinecek alan en,silinecek alan boy);  
  
metodunu kullanabilirsiniz böylece görsel nesneler üstüste binmez.
