---
title: "Daha pratik kod yazımı için; Netbeans'da Interface Kullanımı"
date: 2007-03-24
tags: 
  - "bilgisayar"
  - "web-programlama"
---

Yazdığınız program içinde tüm değişkenleri bir class içine yazıp bunları program içinden çağırmak pratik bir iş olacaktır ancak bunun için her seferinde:  
  
CagrilacakClassAdi VekilHarf=new CagrilacakClassAdi();  
VekilHarf.degisken1;  
  
şeklinde yazmak zor bir işlemdir.  
Aşağıda anlatacağım metot ise başka class'da bulunan değişkeni direkt olarak kullanmamızı sağlar  
  
Netbeans'ta project menüsü içinden ilgili projeti seçip sağ tıklayarak “New>New Interface” diyerek bir Interface dosyası içine diyoruz.  
  
package mypack;  
  
/\*\*  
\*  
\* @author Suat ATAN  
\*/  
public interface YeniInterface{  
  
//ZAMAN BELIRTIR  
int ZAMAN=0;  
  
}  
  
Koyu kısım dışındaki kodlar otomatik olarak oluşuyor. Bundan sonra değişkenlerimizi yazıp standart değerlerini yazıyoruz.(mesela zaman gibi)  
  
Daha sonra bu interface'yi yine project menüsünden sağ tıklayarak compile ettikten sonra ana programımızın bulunduğu class'a gelip:  
  
package ana;  
import mypack.YeniInterface;//once degiskenlerin bulundugu class import ediliyor  
/\*\*  
\*  
\* @author Suat ATAN  
\*/  
public class NewJFrame extends javax.swing.JFrame implements YeniInterface{  
….  
  
  
kodlarına yeşil kısımlarda gözüktüğü gibi önce import ile class'ı çağırıyor daha sonra implements ibaresi ile ana programa dahil ediyoruz.  
  
Bundan böyle ana program içinden ZAMAN değişkeni direkt lokal değişkenmiş gibi tanınır.  
  
Bu sistemin faydası çok değişkenkli programlarda değişkenleri tek yerde toplayıp organize etmektir.  
  
Henüz denemedim ama interface içinde metotlar da kullanılabiliyor kanaatindeyim.
