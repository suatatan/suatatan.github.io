---
layout: post
title: "HTML5 Web Storage Örneği"
date: 2012-05-12
categories: 
  - "bilgisayar"
  - "genel"
---

HTML5 ile gelen güzel özelliklerden biri de web storage ya da local storagedir. Bu özellik ile kullanıcının bilgisayarında cookielere göre daha geniş ve kolay bilgi saklayabilirsiniz. Kullanıcı bilgisayarında HTML5'i destekleyen son sürüm tarayıcı olması lazımdır. Ayrıca kullanıcı bilgisayarına veri kaydedileceği zaman kullanıcıdan izin istenir. Aşağıdaki örnek üzerinden giderek anlatalım:  
  
  
  
  
  
  
  
if(typeof(Storage)!==“undefined”)  
  {  
  localStorage.yazar=“Suat ATAN”;  
  document.getElementById(“sonuc”).innerHTML=“Yazar: ” +localStorage.yazar;  
  }  
else  
  {  
  document.getElementById(“sonuc”).innerHTML=“Tarayıcınız HTML5 veya storage özelliğini desteklemiyor”;  
  }  
  
  
  
  
  
  
  
Bu html sayfasını kaydedip bilgisayarınızda deneyebilirsiniz. Html sayfasında öncelikle  
if(typeof(Storage)!==“undefined”)  
diyerek tarayıcının storage özelliğini destekleyip desteklemediğini araştırdık. Eğer undefined hatası gelmedi ise bu kez locastorage nesnesine **yazar** diye bir nesne oluşturup  
localStorage.yazar=“Suat ATAN”;  
diyerek “Suat ATAN” ifadesini atadık.  
Şimdi hemen bu ifadeyi yine  
localStorage.yazar  
diyerek bulunduğu yerden çağırıyoruz. Sonra sonuc adlı mevcut html ifademizin içine yazdırıyoruz.  
localstorage nesnemize istediğimiz kadar değişken atayıp saklayabiliriz.  
Güzel değil mi?
