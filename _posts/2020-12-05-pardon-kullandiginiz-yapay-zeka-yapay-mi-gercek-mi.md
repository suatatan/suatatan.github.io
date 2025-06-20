---
date: 2020-12-05
layout: post
tags:
- turkish
- longread
- opinion
- technology
- yapay-zeka
title: Pardon! Kullandığınız yapay zeka yapay mı gerçek mi ?
---

Neredeyse kod yazan herkesin **yapay zeka kullanıyoruz** dediği bir çağdayız. Bu durum organik sertifikası almadığı halde pazarlarda organik elma armut vs. etiketi yapıştıranlarla aynı ticari stratejiye dayanan bir oyun: Satma.

İnsanlar çoğu kez ani gelen bilgilere karşı anlık refleksleri ile olgunun tersini sorgulamadan kabul edebiliyor. Yapılan bir [araştırma](https://www.theverge.com/2019/3/5/18251326/ai-startups-europe-fake-40-percent-mmc-report) pazardaki durumun (sebze meyve pazarı) vehametinin bilişim pazarı için de aynı olduğunu gösteriyor. Üstelik Avrupa’da! Yapay zeka kullandıklarını idddia eden firmaların sadece %60'ının gerçekten yapay zeka kullandığı diğerlerinin en basitinden (hani regresyon filan diyelim) yapay zekanın ‘Y’sini bile kullanmadıklarını ortaya çıkarmış.

Türkiye’den ise daha ilginç bir örnek var. Döner kesme makinesinde yapay zeka kullanıldığını iddia eden ve kısa sürede popüler hale gelen şu twit aslında bir kaç cümledir anlatmaya çalıştığımız durumu özetlemiş.

![Image for post](/images/12445-1uqgzq0_sfoxwiipextx0iq.png)

Kaldı ki firmalar yapay zekayı kullansa bile akla şu soru geliyor. Yahu yapay zeka kullansak ne olacak? Evet çok haklı bir eleştiri. Yapay zeka her yerde kullanılmak zorunda değil nitekim kabaca şöyle bir ilke kurabiliriz: **bir problem yapay zeka olmadan kolayca ve başarılı olarak çözüldülebildiği takdirde yapay zekaya gerek yoktur**. Yapay zeka sadece hız, isabetlilik veya başka bir fayda sağlıyorsa işe yarar. Yapay zeka çıkana değin çözülebilen bir çok günlük yaşam problemi böyle çözülmüştür. Örneğin döner kesme makinesi için en azından şimdilik yapay zeka olmadan işlem mümkünse yapay zeka kullanmak fayda yaratmayabilir:) Bu noktada **bir bilişimcinin veya bilişim firmasının yapay zeka kullanması onun daha başarılı olduğuna dair bir gönderme yapmaz, yapmamalıdır.** Bu bilgelik bize bir problemi yapay zeka ile çözmek istediğimizde de ön plana çıkar. Şu soruyu sormalıyız? Gerçekten gerek var mı? Ya da yolun başlangıcında gerek var mı?

İşte size bir örnek Times’a kapak olan 15 yaşındaki genç kız Gitanjali RAO, siber zorbalığa karşı geliştirdiği bir araç nedeniyle [ödül almış](https://analyticsindiamag.com/how-this-ai-solution-by-15-yo-won-her-first-ever-times-kid-of-the-year-award/). Gerçekten takdire şayan bu hikayeyi okurken bu genç kızın ilk çalışmasının yapay zeka olmadığı ilk aracını **hard-coding** ile yazdığını ifade etmiş. İyi de yapmış nitekim teknoloji odaklı değil amaç odaklı başlamış çalışmaya daha sonra imkanları gördükçe daha ileri teknolojilere yönelmiş. Yazıda şöyle bir yer var:

_[Kindly](https://kindly.godaddysites.com/) — an app and Chrome extension — was also built by Rao in order to help detect cyberbullying at an early age. Powered by artificial intelligence, this app was developed as Rao **started to hard-code in some words that could be considered bullying**. Further explaining how it works, she said that her engine then took those words and also identified similar words. The engine can self-learn and is adaptive, that can be invoked on a variety of different platforms._

Peki bu yazıda geçen **“hard-coding”** ne anlama gelir? Bunu sizler için açıkladık. Niye açıkladık? Hard-coding basit bir kavram gibi görünse de arkasında önemli bir hikaye barındırıyor. Olay bilgisayarın bir şeyleri anlamasını istendiği zaman eskiden yapılan ve yapay zeka sonrasında yeni ortaya çıkan alternatifleri düşünme ile başlıyor. Bu yazıdan sonra yapay zeka’nın yapay mı gerçek mi olduğunu kolayca anlayabileceğiz.

Şimdi diyelim ki içeriğinde hakaret bulunan metinleri yakalamak istediğimizi var sayalım. Amacımız bir metin içinde _bizim hakaret kabul_ _ettiğimiz_ herhangi bir ifade ya da ifadeler yer aldığında bu metni yakalamak, bu ifadelerin yer almadığı bir metni ise masum kabul etmek. Olayı basitçe anlatmak adına şöyle tanımlayalım. Diyelim ki metin içinde sadece **“it, köpek, şerefsiz”** gibi kelimeleri yakalamak istedik.

# Hard-Coding

İşlemi koda düz mantıkla şöyle diyoruz. Python dilinde bir metinde bu ifadeler yer alıyorsa yakalamasını söyleyelim:

```
def bu_metinde_hakaret_varmi(metin):    metin = "it herif gelip ne dedi"    if "it" in metin or "köpek" in metin or "şerefsiz" in metin:        print("Metin hakaret içeriyor")    else:        print("Metin masum")
```

Python dilinde yazdığımız bu kodlar o kadar net ki herhalde metinde üç hakaret ifadesi geçtiğinde kodun metnin hakaret içerdiğini anladınız:). Haydi test edelim

# Test 1

```
bu_metinde_hakaret_varmi("şerefsiz insanları tanımam")bu_metinde_hakaret_varmi("köpek gibi çalışıyorsun")
```

Sonuçlar şöyle olacaktır:

```
Metin hakaret içeriyorMetin hakaret içeriyor
```

Şu anda her şey yolunda görünüyor değil mi? Başta da demiştik, düz mantıkla evet, yolunda görünüyor. Teorik olarak da her şey kusursuz. Ancak gerçek hayat bir sürü ististna içerdiği gibi burada da epey önemli bir istisna içerir. Şimdi gösterelim.

# Test 2

```
bu_metinde_hakaret_varmi("mahalledeki köpekler belediyece toplandı")bu_metinde_hakaret_varmi("IT birimi şu anda eğitimde")
```

Sonuçlar şöyle olacaktır:

```
Metin hakaret içeriyorMetin hakaret içeriyor
```

Evet çok sevdiğimiz hard-coded algoritma bu kez çuvallayacaktır nitekim her iki ifadede de hakaret yoktur. IT birimi ile it aynı anlamda anlaşılıp kod tarafından hakaret olarak işaretlenmiştir. Bu problemi çözmek için için koda “it birimi” ifadesi olduğunda bunun hakaret olmayacağını söyleyebiliriz ancak “mahalledeki köpekler” için durum bu kadar basit değil. İşte tam da burada öyle bir çözüm lazım ki biz ona tek tek ya da kelime bazlı olarak olayı öğretmeyelim, o kendi kendine öğrensin ve karar versin. Makine öğrenmesine hoş geldiğiniz. Artık nerede lazım onu biliyorsunuz.

<figure>

[![](/images/kodgif.gif)](https://suatatan.wordpress.com/wp-content/uploads/2020/12/kodgif.gif)

<figcaption>

Yukarıda gösterdiğimiz kodun çalıştır hali

</figcaption>

</figure>

# Makine Öğrenmesi

Şimdi keşke şöyle bir liste olsa da onu makineye öğretebilsek dediğinizi duyar gibiyim:

<figure>

[![](/images/tab-1.png)](https://suatatan.wordpress.com/wp-content/uploads/2020/12/tab-1.png)

<figcaption>

Training Data

</figcaption>

</figure>

Evet bu şekilde (ama bu kadar az satırla değil) ve sadece iki kolonu olan bir tablonuz varsa makineye öğretecek datanız hazır demektir. Makine öğrenmesi literatüründe biz buna “training data” deriz. İlk kolonu “makine oğlum hadi öğren bu da örnek” dediğimiz kolon, ikinci kolon ise **etiket** yani “bak oğlum bu hakaret ya da değil” dediğimiz kolondur. Datamız hazır peki makineye nasıl öğreteceğiz.

Bunun için bir de makine öğrenme algoritmasına ihtiyacınız olacak, yazının devamında azlarını zikredeceğim bu algoritmalara (bunlar hazır araçlar değildir, kodlanması icap eder) elinizdeki veriyi (diyelim yukarıdaki gibi) öğrettiğinizde elinizde şöyle bir fonksiyon olur:

```
Classifier.predict("tahmin edilecek metin")
```

Burada “tahmin edilecek metin” ifadesi içerisinde şöyle bir şey yazdınız diyelim

```
Classifier.predict("Dün akşam IT departmanı yemekteymiş")
```

Bu durumda bu cümle yukarıdaki tabloda yer alan cümlelerden hiç biriyle aynı olmadığı halde makine şu sonucu verir:

```
Metin masum
```

İyi de nasıl? İşte şu anda makine öğrenme modellerinin arkasındaki matematiğin sınırlarındayız! Kabaca şöyle: Elimizdeki datalardaki cümlelerde “IT departmanı” ifadesi geçen iki cümlede sonuç “masum”. O zaman bu metin de büyük olasılıkla “masum”. Peki algoritma her bir kelimeyi tek tek alıp işaretliyor mu? El-cevap: evet. Algoritmanın metni tanıması için her bir kelime aşağıdaki gibi gösterilebilecek şekilde sayıya dönüştürülüyor:

<figure>

[![](/images/dtm-1.png)](https://suatatan.wordpress.com/wp-content/uploads/2020/12/dtm-1.png)

<figcaption>

Sayıya dönüştürülen ifadeler matrisi, nam-ı diğer: document-term-matri

</figcaption>

</figure>

Elbette gri alanlar var. Yani IT departmanında birine köpek dediğinizde algoritmanın kafası karışabilir:) ancak yine de veri seti yeterince zenginse algoritma işini kolayca yapar. İşte bu durumda makine öğrenmesi kullanmış olursunuz.

# Turnusol Kağıdı

Literatür bize makine öğrenmesi öncesinde de bilişimle gerçekleştirilen işlerin yapay zeka olarak adlandırılabildiğini söylüyor (tüccarlar düymasın). Başka bir deyimle hard-coding ile geliştirilen araç yapay zeka sayılır. Ancak literatür de gerçek yaşam da hard-coded bir aracın yapay zeka sayılsa bile **makine öğrenmesi** olmayacağını ifade eder. Makine öğrenmesi bugün günlük yaşamda yapay zeka ile eş anlamlı kullanılmaktadır. Onun “bir tık üstü” olan **derin öğrenme** de benzer anlamlarda kullanılmaktadır. Elbette iyi geliştirilmiş bir **öğrenmiş sistem** hard-coded sistemden daha başarılıdır. Arkasında da daha büyük bir efor içerir. Bu nedenle yapay zeka ile bir şeyler yaptığını iddia eden arkadaşlarımıza soracağımız soru **yapay zekanız yapay mı?** sorusu değil **hangi makine öğrenme modelini kullanıyorsunuz** sorusudur. Bu soru turnusol kağıdı gibidir. Eğer cevap açıkça NaiveBayes, SVM, DecisionTree, KNN gibi bir algoritma ya da bu algoritmaları çalıştırdığımız Tensorflow, ScikitLearn, Keras, PyTorch gibi bir ifade değilse (elbette daha fazla algoritma ve araç var bunlar bazıları) o araç makine öğrenme modeli kullanmıyordur.

# Turnusol.org

[![](/images/bg.png)](https://suatatan.wordpress.com/wp-content/uploads/2020/12/bg.png)

Bu örnekleri hard-coding ile makine öğrenmesinin farklarını göstermek için kullanık. Aslında her ikisi de yapay zeka kabul edilmektedir. Ancak günümüzdeki yapay zeka uygulamaları arasında hard-coded araç kalmamış gibidir ya da en azından çok azlık bir kısmı hard-coded olabilir. Bu nedenle günümüzde “YAPAY ZEKA = MAKİNE ÖĞRENMESİ” kabul edilebilir. Yapay zeka ile ayrıştırıcı dil ve yanıltıcı haberle karşı geliştirdiğimiz araçlar için ne kullanıyoruz peki?

[**Factomat**](https://turnusol.org/factomat/editor)adlı yanıltıcı haberleri tahmin aracımız yukarıdaki tanımlardakinin aynısında olduğu gibi **yapay zeka** kullanıyor. Öğrenme verilerini [teyit.org](http://teyit.org) ve [doğruluk payı](https://www.dogrulukpayi.com/) gibi açık kaynaklardan derliyor. Turnusol kağıdını kullanmak isterseniz cevap: NaiveBayes!

Diğer yandan ayrıştırıcı dil tahmin aracımız [**ADYA**](https://turnusol.org/factomat/premium_tool_factomat_nefret_soylem) ise “şimdilik” hard-coded. Nitekim elimizde eğitim verisi “henüz” yok. Peki sizin elinizde herhangi bir alanda makinaya öğreteceğiniz bir veri ve geliştirmek istediğiniz bir algoritma ve her şeyden daha önemlisi çözmek istediğiniz gerçek bir yaşam problemi var mı? O zaman Turnusol.org ile irtibata geçin. Birlikte çözelim. Ya da mevcut araçlarımız sizin için bu problemi çözsün.

Dr. Suat ATAN

(Bu yazının aslı turnusol.org’da yayınlanmıştır)
