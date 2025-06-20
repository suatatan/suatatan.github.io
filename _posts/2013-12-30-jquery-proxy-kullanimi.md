---
title: "Jquery proxy() kullanımı"
date: 2013-12-30
categories: 
  - "genel"
---

Jquery eventleri(click vb.) kullanılırken event içinden harici değişken this ile çağrılınca hata vermektedir. Nitekim Jquery event içinde this ifadesi ilgili DOM objesini çağırır. Bu baş ağrıtıcı sorun OOP ile program yazarken berbattır. Bunu aşmak için aşağıdaki sayfadaki çözümün yaradığı tecrübe edilmiştir:  
  
[http://www.jimmycuadra.com/posts/understanding-jquery-14s-proxy-method](http://www.jimmycuadra.com/posts/understanding-jquery-14s-proxy-method)
