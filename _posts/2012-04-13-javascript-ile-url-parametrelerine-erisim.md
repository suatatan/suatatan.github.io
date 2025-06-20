---
title: "Javascript ile Url Parametrelerine Erişim"
date: 2012-04-13
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "jquery"
---

[http://suatatan.com](http://suatatan.com)?git=iletisim&referans=facebook şeklindeki bir adresteki git ve referans parametre değerlerine javascript üzerinen erişim sağlamak için şu fonksiyonu kullanabilirsiniz:  
  
function getUrlVars()  
{  
    var vars = \[\], hash;  
    var hashes = window.location.href.slice(window.location.href.indexOf(’?’) + 1).split(’&’);  
    for(var i = 0; i     {  
        hash = hashes\[i\].split(’=’);  
        vars.push(hash\[0\]);  
        vars\[hash\[0\]\] = hash\[1\];  
    }  
    return vars;  
}  
  
Bu fonksiyonu şöyle kullanırız.  
  

var urlvars=getUrlVars()

var git=urlvars\[’git’\]  
  
  
  
  
urlvars değişkeni dizi halinde tüm paremetreleri çağırır
