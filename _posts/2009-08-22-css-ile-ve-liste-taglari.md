---
title: "CSS liste tagları"
date: 2009-08-22
categories: 
  - "bilgisayar"
tags: 
  - "web-programlama"
---

Aşağıdaki gibi bir listenin olduğunu varsayalım:

<div id="menu1"> <ul> <li><a href="fins\_site.html">Site Ekle</a></li> <li><a href="fins\_sakin.php">Sakin Ekle</a></li> <li><a href="fins\_sitegideri.php">Gider Ekle</a></li> <li><a href="">Ödeme Ekle</a></li> </ul> </div> Bu menünün görünümü standart altalta ve başlarında yuvarlaklar bulunan maddeler listesi olarak görüntülenir.

Ancak webde bilinen bir trend olarak menü oluştururken de <ul> ve <li> tagları kullanma adeti vardır. Dikey menüler böyle oluşturulabilir Ancak Yatay Menüler için css tarafında şu kodları kullanmak gerekir:

**#menu1 ul** {

list-style:none;

}

**#menu1 ul li** { display: block; float: left; } Bu durumda <li> tagları arasındaki ifadeler yanyana ve başlarında yuvarlak olmaksızın görüntülenirler.
