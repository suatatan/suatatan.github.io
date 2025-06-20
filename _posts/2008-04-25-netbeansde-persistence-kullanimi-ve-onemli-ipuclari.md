---
categories:
- bilgisayar
date: 2008-04-25
layout: post
tags:
- english
- java
- longread
- technology
title: Netbeans'de Persistence Kullanımı ve önemli ipuçları
---

![Java Netbeans Desktop Database App.](/images/running-app.png) (Resim:1 Netbeans resmi sitesinden persistence uygulaması örneği)

Ücretsiz Java Program Geliştirme Ortamı olan Netbeans IDE'nin 6.0 ve üstü sürümlerinde masaüstü programlar için desteklediği Persistence teknolojisi sayesinde veritabanı programcılığının rahatlığının .NET ile boy ölçüşür düzeye geldiği bilinmektedir. Ancak bu teknolojinin yeni olması itibari ile internette ingilizce kaynak bile bulmakta sıkıntı çekilmektedir. Persistence teknolojisinin en temel kullanımı hakkında Netbans'ın resmi sitesindeki: [http://www.netbeans.org/kb/60/java/gui-db.html](http://www.netbeans.org/kb/60/java/gui-db.html) adresli makale inclenebilir. Bu makalede varolan bir veritabanından CRUD uygulaması ya da CREATE,UPDATE,DELETE uygulamasının yani Türkçesi ile; Veri ekleme, Veri güncelleme, Veri Silme uygulamasının yapılışı anlatılmaktadır. Buna bir de listeleme özelliği eklemek gerekir nitekip program listeleme özelliğini de otomatik olarak oluşturuyor. Buraya kadar sorun yok; Ancak Netbeans'ta sözkonusu makalede geçen veritabanından ya da kendinzize ait özel veriabanından spesifik sorgulama yapmak istediğinizde sofistike sql sorgusu rahatlığında işi gerçekleştiremiyorsunuz. Bunun için geçirdiğim iki uykuz geceden sonra ortaya çıkardığım metodu sizlerle paylaşayım:

[![Netbeans\'de persistence kullanımı](/images/netbeans_persistence.png)](http://suatatan.wordpress.com/wp-content/uploads/2008/04/netbeans_persistence.png)

(Resim2: Suat ATAN tarafından yazılan bir uygulanada Netbeans IDE'nin Inspector ekranı)

Gerek Netbeans'ın Desktop Database Project seçeneği ile otomatikmen oluşturulan projelerinde gerekse sizin program içinde herhangi bir component'e sağ tıklayıp data bindirmek için "bind" ibaresini tıklamanızda ekran kesitinde görüldüğü gibi kırmızı ve yeşil şeritle işaretlediğim componentler ortaya çıkar. Bu componentleri sağ tıklayıp properties (özellikleri) incelenince sorgunun:

> SELECT t FROM Teklıfler t

gibi ilginç ve sql'den bozma olduğu görülür. Bu sorguyu maalesef WHERE, ORDER BY gibi taglarla zenginleştiremezsiniz. Bunun için yapmanız gereken işlem biraz uzun,şöyle ki; Spesifik hale getirmek istediğiniz query'i (bundan böyle kırmızı şeritle işraretli comonenti ifade için böyle diyeceğim) seçip yine sağ tıklayarak "customize code" diyeceksiniz. Daha sonra kod bloğuna örneğin şöyle bir sorgu ekleyebilirsiniz:

Orjinalinde parantez içinde geçen sorgu SELECT t FROM Teklıflerlıstesı t iken siz şöyle yazabilirsiniz:

> teklıflıstesıQuery = mocawaPUEntityManager.createQuery("SELECT t FROM Teklıflıstesı t WHERE t.teklıfno ='"+SECILEN\_TEKLIF\_NO\_STRING+"'");

Bu sorgu vasıtasıyla sorgumuzu filitreliyoruz. Gördüğünüz gibi biraz uzun ve sorgu dış parametre kabul etmiyor. Bu yüzden sorgu stringini değişken hale getiriyoruz. Durun daha bitmedi: Bu hali ile herhangi bir yerden SECILEN\_TEKLIF\_NO\_STRING değişkenini alarak veri dökümünü yapmaya çalışırsanız sonuçta yine veri dönmez. Bunun nedeni ise veri döküm listesinin örneğin bir tabloya ya da combobox'a bindirme işleminin Netbeans'ın standart programı içinde initComponents() metodu içinde kalması ya da bir kereye mahsus program başında çalıştırılması işidir. Bu derdi de aşmak için verilerin ilgili component'e bir daha bindirilmesi gerekir. Bunu sağşamak için ise Netbeans'ın initComponents() metodu altındaki standart veri bindirme kodlarını kopyalayıp, sorgu filtre parameteresi ortaya çıktıktan sonraki olayla tekrar tetiklemektir. Yani mesela bir buton tıklamasında bu kodları butonun tıklanma metodu altına tekrar yapıştırmaktır.

Aşağıda bunun güncel bir örneği var: (Kendi programımdan)

> private void BT\_TEKLIF\_DETAYMouseClicked(java.awt.event.MouseEvent evt) { // FİLTRE PARAMETERESİNİ BİR TEXTFİELDDEN ALIP DEĞİŞKENİMİZE YÜKLEDİK SECILEN\_TEKLIF\_NO\_STRING=SECILEN\_TEKLIF\_NO.getText();
> 
> //SORGUYU ENTITY MANAGER ILE TEKRAR İŞLEDİK mocawaPUEntityManager = javax.persistence.Persistence.createEntityManagerFactory("mocawaPU").createEntityManager();
> 
> teklıflıstesıQuery = mocawaPUEntityManager.createQuery("SELECT t FROM Teklıflıstesı t WHERE t.teklıfno ='"+SECILEN\_TEKLIF\_NO\_STRING+"'"); teklıflıstesıList = teklıflıstesıQuery.getResultList();
> 
> //ŞİMDİ SONUÇLARI TABLOYA YENİDEN İŞLİYORUZ org.jdesktop.swingbinding.JTableBinding jTableBinding = org.jdesktop.swingbinding.SwingBindings.createJTableBinding(org.jdesktop.beansbinding.AutoBinding.UpdateStrategy.READ\_WRITE, teklıflıstesıList, TABLO2); org.jdesktop.swingbinding.JTableBinding.ColumnBinding columnBinding = jTableBinding.addColumnBinding(org.jdesktop.beansbinding.ELProperty.create("${teklıfno}")); columnBinding.setColumnName("Teklıfno"); columnBinding.setColumnClass(String.class); columnBinding = jTableBinding.addColumnBinding(org.jdesktop.beansbinding.ELProperty.create("${boy}")); columnBinding.setColumnName("Boy"); columnBinding.setColumnClass(String.class); columnBinding = jTableBinding.addColumnBinding(org.jdesktop.beansbinding.ELProperty.create("${bırımfıyat}")); columnBinding.setColumnName("Bırımfıyat"); columnBinding.setColumnClass(String.class); columnBinding = jTableBinding.addColumnBinding(org.jdesktop.beansbinding.ELProperty.create("${dalga}")); columnBinding.setColumnName("Dalga"); columnBinding.setColumnClass(String.class); columnBinding = jTableBinding.addColumnBinding(org.jdesktop.beansbinding.ELProperty.create("${ebatSerıNo}")); columnBinding.setColumnName("Ebat Serı No"); columnBinding.setColumnClass(String.class); columnBinding = jTableBinding.addColumnBinding(org.jdesktop.beansbinding.ELProperty.create("${en}")); columnBinding.setColumnName("En"); columnBinding.setColumnClass(String.class); columnBinding = jTableBinding.addColumnBinding(org.jdesktop.beansbinding.ELProperty.create("${fıyatsafıaenı}")); columnBinding.setColumnName("Fıyatsafıaenı"); columnBinding.setColumnClass(String.class); columnBinding = jTableBinding.addColumnBinding(org.jdesktop.beansbinding.ELProperty.create("${kalıte}")); columnBinding.setColumnName("Kalıte"); columnBinding.setColumnClass(String.class); columnBinding = jTableBinding.addColumnBinding(org.jdesktop.beansbinding.ELProperty.create("${safıaboyu}")); columnBinding.setColumnName("Safıaboyu"); columnBinding.setColumnClass(String.class); columnBinding = jTableBinding.addColumnBinding(org.jdesktop.beansbinding.ELProperty.create("${safıaenı}")); columnBinding.setColumnName("Safıaenı"); columnBinding.setColumnClass(String.class); columnBinding = jTableBinding.addColumnBinding(org.jdesktop.beansbinding.ELProperty.create("${yukseklık}")); columnBinding.setColumnName("Yukseklık"); columnBinding.setColumnClass(String.class); bindingGroup.addBinding(jTableBinding); jTableBinding.bind();
> 
> TEKLIF\_DETAYLARI.setSize(600, 600); TEKLIFLER\_EKRANI.setVisible(false); TEKLIF\_DETAYLARI.setVisible(true); TEKLIF\_DETAYLARI.setTitle("TEKLİF DETAYI: "+SECILI\_FIRMA.getText()); }

Evet yukarıdan da anlaşılacağı üzere püf noktamız;

1. Sorgumuzu yenilemek
2. Ortaya çıkan sonuçları ilgili componentimize tekrar yüklemek
3. Sorgularımızı alışılmış SQL tarzında değil, biraz daha özel bir formda string olarak kurmak

Değerli arkadaşlar;

Bu makalenin faydalı olacağına inanıyorum. Her türlü soru ve sorunlarınız için bana ulaşabilirsiniz. Bu makaleyi de kaynak göstermek kaydı ile istediğiniz gibi kullanma hakkınız var.

Sevgi ve Java ile...
