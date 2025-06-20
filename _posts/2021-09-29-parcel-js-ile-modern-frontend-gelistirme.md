---
layout: post
title: "Parcel.js ile modern frontend geliştirme"
date: 2021-09-29
categories: 
  - "bilgisayar"
tags: 
  - "javascript"
---

Daha önce npm kullanımını anlatmış, Javascript için dinazor tanımında kalan biz eskilerin alışkanlarını değiştirecek şu yazıyı yazmıştım:

https://suatatan.wordpress.com/2019/10/31/artik-script-src-denerek-javascript-yazilmiyor/

Tabii bu yazıda geçen işlemler her frontend geliştirme sürecinde yenilenmesi gereken sıkıcı formaliteleri içeriyordu. Bu formalitere hiç girmeden Vue ve Firebase ile konsoldan bu işleri tek seferde halletmek [mümkündü](https://suatatan.wordpress.com/2019/04/26/firebase-kullanmaya-giris/).

Ancak Vue kullanmadan daha da basit hali ile LESS (veya SCSS) CSS build işleminin, Javascript paketlemenin (Bundling) otomatize olduğu bir framework arıyordum. Bu framework React veya Vue değil dümdüz HTML ve JS'a izin vermeliydi. Bulamıyor ve üzülüyordum. Artık buldum :)

PARCEL.JS

https://parceljs.org/

## Ne işe yarar?

![](/images/parcel-front.png)

Siz sadece html ve javascript dosyanızı yazar ve şu komutla otomatik olarak browser'da açılan sayfayı kullanırsınız

`parcel index.html`

[![](/images/resim.png)](https://suatatan.wordpress.com/wp-content/uploads/2021/09/resim.png)

Bu kadar mı? Değil. Tüm JS ekosistemi için örnek kodlar da sitesinde verilmiş. Kod çalıştıkça dist klasöründe yayına hazır optimize kodları barındırıyor.

Keyifli kullanımlar.

Parcel.js, Pug, Vue ile basit bir uygulamanın kodları burada:

[https://gist.github.com/suatatan/483d10e9e34b14f931f06af24e8948a3](https://gist.github.com/suatatan/483d10e9e34b14f931f06af24e8948a3)

Yayınlayınca yazarım.
