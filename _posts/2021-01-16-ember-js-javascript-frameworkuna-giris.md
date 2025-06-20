---
title: "Ember.js Javascript Framework'una Giriş"
date: 2021-01-16
---

![How to Create Ember.js Entities from Scratch • Nearsoft](/images/how-t0-create-emberjs-entities-from-scratch-lede.png)

Javascript dünyası hergün daha da hızla ilerliyor. Bu noktada özellikle tecrübeli yazılımcılar eski alışkanlıklarını devam ettirerek Javascript'i sadece HTML içinde çağrılan bir yan araç olarak görme eğilimine giriyor. Oysa durum sandığımız gibi değil. C# veya Java ile sunucu tarafında uygulama geliştirirken MVC denilen mantığa benzer mantık çoktan Javascript'e girdi bile. Diğer yandan bir çok eski yazılımcı sırf Javascript geliştirirken lazım olan bir kütüphaneyi kurmak için komut satırına şunu yazın: `npm` ifadesini gördüğünde hemen yolunu değiştiriyor olabilir. Aslında başta biraz tuhaf ancak kolaylıklarını görünce yazılımcının buna alışmaması içten bile değil.

Eski yazılımcıların diğer bir eğilimi ise bu tür yeni yazılım araçlarına **bir sürü var** diyerek ön yargı ile bakmaları. Aslında evet, bir sürü var ancak bu kötü bir durum değil. Çoğu yeni araç yazılımcıların bir kaç saatte öğrenip kullanmaya başlayabilecekleri şekilde tasarlandı. Dolayısıyla kaçmak yok.

Bir diğer eski yazılımcı adeti: Mevcut yapımı bu yeni yapıya uyarlamam zaman alır kaygısı. Haksız değiller. Ancak çoğu kez bu yapıları hemen uyarlamak zorunda değilsiniz. Ufak pilot uygulamalarla deneyebilir ikna olursanız mevcut sisteme entegre edebilirsiniz.

Şimdi bu yeni icat olmuş araçlardan biri ve en pratiklerinden olan **ember.js** i tanıtacağım. Bunun için dokümantasyonunu tek tek okudum. Oturdum öğrendim:) Bu arada _yeni icat olmuş_ dedim ama bu kütüphane 2011 yılında çıktı. Bu yazının yazıldığı dönem itibariyle kaç yıl oldu? 11 yıl. O nedenle artık yeni diyerek burun kıvırmayın. Onlar kendini biliyor. Ahmet abee...

Yazıyı tasarlarken daha sonra kendim ve başkaları için kolay erişim olsun diye sık kullanılan oluşturma komutlarını en alta **Hızlı Komutlar** altına yazdım. Keyifli okumalar!

Şimdi başlayalım:

**Nedir**:

Herhangi bir tarayıcıda veya cihazda çalışabilecek ve modern uygulamalar geliştirmeye imkan tanıyan bir framework'tür. Daha verimli ve hızlı geliştirme vadeder. Modern Javascript (ES6) özelliklerini Ember ile kullanabilirsiniz.2011'de çıkmıştır. 10 yıldır var olduğuna göre oturmuş bir araç olduğunu düşünüyorum.

Şurada bitmiş bir Ember.js projesi var kodlarına bakmak isteyebilirsiniz:

https://github.com/ember-learn/super-rentals/tree/super-rentals-tutorial-output

Bundan sonraki adımları işleyebilmek için bu yazının altındaki **Hızlı Komutlar** başlığındaki komutları çalıştırın. Şöyle bir gir göz atmak isterseniz okumaya devam edin.

## Sayfa Oluşturma

```
ember new <yeniprojeadi>
```

komutu ile hızlı proje oluşturduktan sonra app/templates altına gidip application.hbs dosyasını kaldırın ve kendi index.hbs dosyanızı yazın. Burada sadece body etiketinin içini yazabilirsiniz. Gerisine gerek yok. Bir div içine yazılar vs.

## Sayfa Ekleme

Mesela `hakkında` diye bir sayfa oluşutacağız.

Önce router.js'a bunu söylemelisiniz.

`app/router.js` dosyasını açın. router.map fonksiyonu içine şu satırı ekleyin:

```
this.route('hakkinda');
```

Kod şu hale gelmeli:

```
Router.map(function() {  this.route('hakkinda');});
```

Şimdi `ap/templates/hakkinda.hbs` sayfamızı oluşturalım ve içine yine HTML ile içerik yazalım.

Şu anda [http://localhost:4200/hakkinda](http://localhost:4200/hakkinda) sayfasına giderseniz sayfanız orada olmalı.

Burada dikkat ettiyseniz 'hakkinda' adı hem rotada hem templates klasöründe aynı ada sahip. Eğer farklı olsun isterseniz şöyle bir yol var:

```
this.route('hakkinda', { path: '/kimizbiz' });​
```

Bu durumda web sayfasında şöyle olamalı:

http://localhost:4200/kimizbiz

Yani bir maskeleme yaptık.

## Sayfaları Birbirine Bağlama

Normalde sayfaları `<a href=''></a>` etiketi ile birbirine bağlarız. Ancak bunu yaptığımızda sayfa 'full refresh' olur yani suncuya gidip yeni sayfayı getirir. Oysa Ember.js kullanıyorsak buna gerek yoktur. Bunun yerine sayfaları şöyle bağlarız:

```
<LinkTo @route="hakkinda" class="button">Hakkımızda</LinkTo>
```

## Otomatize Testler Yapma

```
ember generate acceptance-test <proje_test_adi>
```

Bu arada generate yerine kısaca `g` komutunu da kullanabiliriz.

Bu durumda `tests/acceptance/` klasörü altında otomatik olarak oluşturulmuş test dosyaları hazırlanır.

Peki nedir bu test? Uygulamamızı kullanıcının bakış açısından test ediyorlar - daha önce yaptığımız "tıkla ve çalışıp çalışmadığını gör" testinin otomatikleştirilmiş bir sürümüdür ve tam da ihtiyacımız olan şey budur.

Buraya girip test fonksiyonlarının nasıl yazılacağı için şu linke bakın:

https://guides.emberjs.com/release/tutorial/part-1/automated-testing/

Temel mantık teste sayfaya gidip içeriğe bakmasını ve istediğiniz bazı nesnelerin orada olup olmadığın bakmasını sağlamaktır. Test sunucusunu başlatmak için en alttaki hızlı komutlar listesine bakın.

Bu arada test sunucusu da otomatiktir. Yani siz test fonksionu yazdıkça o test sunucusunun açtığı tarayıcı sayfasında hataları gösterir.

## Bileşen (Component yazma)

Mesala şöyle bir kodumuz olsun her yerde kullancağız:

```
<div id="bizimkodumuz" class="jumbo">  <div class="right tomster"></div>  {{yield}}</div>
```

Bu kodu alıp `/app/components/kodum.hbs` diye kaydedelim. Daha sonra herhangi bir sayfamızda

```
<Kodum>Buraya ne yazarsanız yukarıdaki yield yazan yerin içine yazar</Kodum>
```

Diye yazarsak bu hazır etiketimiz çalışır. Böylece sayfa başlığı veya özel bazı yerleri tekrar tekra yazmanıza gerek kalmaz.

Bu arada yazdığımız bileşenler için de test dosyası yazabiliriz. Bu sayede bileşenlerimizin sağlığında emin oluruz. Bu test kodlarında bileşene bir `yield` yani bileşenin içindeki kısmı gönderip bizim istediğimiz sonuçları verip vermediğini test ediyoruz. Bileşen testleri için şu linke lazım olduğunda bakarsınız:

https://guides.emberjs.com/release/tutorial/part-1/component-basics/

**Outlet** Kavramı:

Master template dediğimiz her sayfada hazır gelmesini istediğimiz şablonlar vardır. Genellikle sayfanın logosu vs. buraya koyarız. Bu tür sayfa için `app/templates/application.hbs` dosyasını kullanırız bu dosya şöyledir:

```
<div class="container">  <NavBar />  <div class="body">    {{outlet}}  </div></div>
```

Bu dosyayı böyle yazdıktan sonra yukarıda sayfa oluşturken yazdığımız `index.hbs`, `hakkinda.hbs` gibi çıplak (yani body tagı olmayan düz divlerden müteşekkil sayfarımız) gidip hep yukarıdaki kodda {{outlet}} yazan yere kendini yazar.

**Bileşenleri komut satırından oluşturma**

Yukarıda elle oluştırduğumuz dosyayı komut satırından da oluşturabiliriz. Bu sayede bileşenin dosyası ile birlikte için kabul test kodu da oluşmuş olur.

```
ember generate component <bilesen_nadi>
```

**Alt bileşen oluturma**

Mesela mağaza ürünü gibi bir bileşen oluşturdunuz. Bileşenin altında bir de ürün diye alt bileşen oluşturbilirsiniz. Bu durumda bu bileşen örneğin `<Magaza>` iken alt bileşen `<Magaza::Resim>` şeklinde olur.

```
ember generate component <bilesen_adi>/<alt_bilesen_adi>
```

**Bileşenlere özellik (attribute) atama**:

Normal HTML'lerdeki `src` veya `title` gibi özellikleri aynen bileşen veya alt bileşenlere aktarmak mümkündür. Bunun için şöyle yaparız:

Mesela mağaza bileşeni için:

```
<Magaza::Resim    src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg"    alt="A picture of Grand Old Mansion"  />
```

Bunun bileşen dosyası şöyle olmalıdır:

```
<div class="image">  <img ...attributes></div>
```

İkinci satırdaki `...attributes` ifadesine dikkat edin. Bu ember.js jargonunda _splattributes_ olarak adlandırılır. Gönderilen ne attribute varsa alır.

## Bileşenlere Davranış Atama

Diyelim ki mağaza resimlerimize tıklanınca büyüsün istiyoruz. Bu durumda önce bu bileşenimiz için bir javascript davranış dosyası oluşturtacağız:

İlk adım magaza/resim bileşenenine bir davranış dosyası (component-class) oluşturma:

```
ember generate component-class magaza/resim
```

Açıp aradaki kodları ekliyoruz: yeri app/compotnets/magaza/resim.js gibi bir yerde.

```
import Component from '@glimmer/component';
​export default class MagazaResimComponent extends Component 

{//şuralar bizim eklediğimiz kod  
constructor(...args) 
{    
super(...args);    
this.isLarge = false;  
}   
isLarge = false; //şuraya kadar}
```

Aslında diyoruz ki bileşemizin bir özelliği var o da `.isLarge` yani resim şu an küçük mü büyük mü? Bunu bir durum yani _state_ olarak tutuyor.

Sonra template dosyamızı app/components/magaza/resim.hbs

konumundan açalım:

```
<div class="image">  
<img ...attributes></div>{{#if this.isLarge}}  
<div class="image large">   
 <img ...attributes>    
<small>Kücült</small>  
</div>{{else}}  

<div class="image">    <img ...attributes>    <small>Buyut</small>  </div>{{/if}}
```

Gördüğünüz gibi template dosyamızın içeriine özel if ve elselerle `isLarge` parametresine eriştirip onun durumuna göre css sınıfı vererek büyütmek ve küçültmek mümkün. Şu hali ile henüz tam çalışmaz çünkü tıklama davranışı tanımlamadık bunun için şuradan devam edebilirsiniz:

https://guides.emberjs.com/release/tutorial/part-1/interactive-components/

## Veriyle çalışmak

Her bir sayfa için ayrıca oluşturulan ve `app/routes/` dizininde yer alan dosyalar içerisine konan direkt JSON verileri veya API adreslerinden alınan modeller oradan sayfaya yollanabilir

```
import Route from '@ember/routing/route';
​export default class IndexRoute extends Route 
{  async model() 
{       let response = await   fetch('/api/rentals.json');         let parsed = await response.json();    
        return parsed;  }}  
```

Bu şekilde _view_ a yollanan veri _view_ içinden `@model` denmek suretiyle çağrılır.

Birden fazla satır halinde olan (genelde veriler böyledir) veriler için ise şu yapı kullanılır (.hbs) dosyası içinde:

```
{{#each @model as |property|}}      
<li><Rental @rental={{property}} /></li>
{{/each}}
```

Burada @model seri halindedir property nesnesi tekil item halindedir. o da direkt olarak component içine yollanmakta orada alt kırılımları açılmaktadır.

Detaylı bilgi: [https://guides.emberjs.com/release/tutorial/part-1/working-with-data/](https://guides.emberjs.com/release/tutorial/part-1/working-with-data/)

## Hızlı Komutlar

```
npm install -g ember-cli
```

`ember` komutu ile kurulumu kontrol edin.

Yeni proje oluşturma:

```
ember new <yeniprojeadi>
```

`cd` komutu ile klasöre gir

Lokalde çalıştırma:

```
ember server
```

Sunucu hot-loading özelliğine sahiptir. Kodu değiştirdiğinizde sayfayı yenilemeye ihtiyaç yoktur.

Test sunucusunu çalıştırma:

```
ember t -s
```

Komponent oluşturmua:

```
ember generate component <bilesen_adi>
```

İç içe alt bileşen oluşturma (Namespaced compontens)

```
ember generate component <bilesen_adi>/<alt_bilesen_adi>
```

## Lüzumlu Linkler

Ember Cheatsheet:

https://ember-learn.github.io/ember-octane-vs-classic-cheat-sheet/

Tüm Ember.js tutoriali (Part 1)

https://guides.emberjs.com/release/tutorial/part-1/recap/

Tüm Ember.js tutoriali (Part 2) [https://guides.emberjs.com/release/tutorial/part-1/recap/](https://guides.emberjs.com/release/tutorial/part-1/recap/)
