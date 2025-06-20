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
title: Netbeans'ta JSlider(Slider) Kullanımı
---

[![](/images/SliderDemo.png)](http://java.sun.com/docs/books/tutorial/figures/uiswing/components/SliderDemo.png)  
Java programcılığı yaparken son kullanıcı için özellikle hızlı biçimde herhangi bir değer değişikliği yapmak istenildiğinde Slider'ler kullanılır. Resimde örneği görülen JSlider 0 ila 30 arasında saniyede değişecek kare hızını değiştiriyor.  
  
Sizler de Netbeans içinde JSlider kullanarak benzer ve kullanışlı şeyler geliştirebilirsiniz.  
  
JSlider'in Netbeansta kullanımı çok kolaydır.  
  
Aşağıdaki yönergeleri takip ederek resimde görülen JSlider benzeri bir amaca hizmet eden bir obje yaratabilirsiniz.  
  
  

1. Öncelikle Netbeans Palette menüsünden Swing alt menüsü içerisinden (jbuton, jtextfield gibi objelerin seçildiği alan) JSlideri seçiyoruz.
2. Bu obje seçili durumda iken properties menüsünden Max Value ve Min Value yazan yerlere Max Value(en büyük değer) olarak 30 Min Value (En küçük değer olarak) 0 yazıyoruz. Bunun anlamı JSliderimiz her sürüklendiğinde 0 ila 30 arasında değişecek.
3. Şimdi Netbeans klasiği olarak yine Jslider objesi seçili iken sağ tıklayıp events menüsünden change alt menüsünü oradan da StateChanged tıklayıp JSlider sürüklendiğinde yapılacak işlemi tanımlamaya başlıyoruz.
4. Aşağıdaki kod 3. maddede anlatılan ve JSliderin sürüklenmesi ile dinamik olarak değerin nasıl alınıp kullanılacağını göstermektedir: ------------------- 
    
    ```
    public void stateChanged(ChangeEvent e) {    JSlider dinamikdeger= (JSlider)e.getSource();    if (!source.getValueIsAdjusting()) {        int fps = (int)dinamikdeger.getValue();        if (fps == 0) {            if (!frozen) stopAnimation();        } else {            delay = 1000 / fps;            timer.setDelay(delay);            timer.setInitialDelay(delay * 10);            if (frozen) startAnimation();        }    }}---------
    ```
    
5. Yeşil ile yazılan kısımlara dikkat edilecek olursa öncelikle dinamikdeger adlı bir JSlider objesi yaratılıyor. Bunu her seferinde siz de yapacaksınız.
6. Daha sonra bu deger .getValue() metodu ile alınıyor. Bu metot sonucunda ortaya çıkan Integer değer JSliderin sürüklenip bırakıldığı andaki 0 ile 30 arasındaki (tabi bizim uygulamamız içinde) değerdir.
7. Bu değer yukarıdaki programda fps adlı değişkene yüklenip program içinde animasyon hızı olarak kullanılıyor.
8. Max ve Min Value değerleri eksi işaretli de olabili söz gelimi -250 ila +250 arasında da JSlider yapılabilir.  
    

  
İşte JSlider bu kadar basit ve kullanışlı bir objedir. Bu objeyi kullanırken oluşan problemler için mesajlarınızı bekliyoruz.  
  
  
  

```

```
