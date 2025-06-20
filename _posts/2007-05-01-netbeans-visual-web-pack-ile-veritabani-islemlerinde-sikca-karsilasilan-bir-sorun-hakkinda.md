---
title: "Netbeans Visual Web Pack ile veritabanı işlemlerinde sıkça karşılaşılan bir sorun hakkında"
date: 2007-05-01
categories: 
  - "bilgisayar"
---

Netbeans Visual Web Pack ile Veritabanı işlemlerinde; herhangi bir veritabanını kullanmak için malum olduğu üzere önce veritabanı bağlantısı Runtime penceresi altından kurulup istenen tablo sürükle-bırak yöntemi ile sayfa içine çekilir.  
Daha sonra istenen bir form elemanına sağ tıklanıp "Bind to Data" diyilerek veriler bu form elemanına bindirilir.  
Bu yöntemi tutoriallerde uzun uzadıya anlatırlar. Ancak hep es geçilen önemli bir sorun vardır.  
MySQL veritabanı bağlantısı kurulurken bu işlemde "Bind to Data" işleminden sonra Netbeans tablo sütün adlarını okuyamaz ve adamı illet eder.  
Bu durumdan kurtulmanın yolu şudur:  
Netbeansa entegre Tomcat sunucusna ait klasörlere ulaşılıp bunun altındaki "common" klasörü altındaki lib klasörüne MySQL bağdaştırıcsına ait jar dosyası konulur.  
Mesela ben MySQL resmi sitesinden indirdiğim: mysql-connector-java-5.0.5-bin.jar dosyasını  
C:\\Program Files\\netbeans-5.5\_withJDK1.6.0\\enterprise3\\apache-tomcat-5.5.17\\common\\lib  
  
dizinine yerleştirdim. Bunun yanında Netbeans'ta project menüsünden de library altına da aynı jar dosyasını ekledim.  
Bu illet de böylece çözülmüş oldu.  
Bu sorunun çözümünü esasen Java Üstadım ve kardeşim Bahadır ŞAYLAN yaptı.  
(Bu sorunu bu minval üzerine halleylen her kişi üstat ruhuna bir fatiha okuya, gaflet olunmaya:)
