---
categories:
- bilgisayar
- genel
date: 2009-08-22
layout: post
tags:
- english
- longread
- technology
- web-programlama
title: CSS liste tagları
---

Aşağıdaki gibi bir listenin olduğunu varsayalım:  
  

  

  
- [Site Ekle](http://fins_site.html)
  
- [Sakin Ekle](http://fins_sakin.php)
  
- [Gider Ekle](http://fins_sitegideri.php)
  
- [Ödeme Ekle](http://)
  

  

  
Bu menünün görünümü standart altalta ve başlarında yuvarlaklar bulunan maddeler listesi olarak görüntülenir.  
  
Ancak webde bilinen bir trend olarak menü oluştururken de

ve- tagları kullanma adeti vardır. Dikey menüler böyle oluşturulabilir Ancak Yatay Menüler için css tarafında şu kodları kullanmak gerekir:  
      
    **#menu1 ul**  
    {  
      
    list-style:none;  
      
    }  
      
    **#menu1 ul li**  
    {  
    display: block;  
    float: left;  
    }  
    Bu durumda
- tagları arasındaki ifadeler yanyana ve başlarında yuvarlak olmaksızın görüntülenirler.
