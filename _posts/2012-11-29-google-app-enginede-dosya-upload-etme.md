---
categories:
- bilgisayar
- genel
date: 2012-11-29
layout: post
tags:
- english
- google-app-engine
- quickread
- technology
title: Google App Engine'de dosya upload etme
---

Google App Engine ile dosya upload etmek için aşağıdaki kodları kullanabilirsiniz. Bu kodları test ettiğinizde önce dosya ekleme arayüzü açılır sonra dosyanız yüklendikten sonra “dosya yüklendi” diye ifade çıkar. Ayrıca bir link çıkar bu linke tıklayınca dosyanızın sunucadaki halini geri indirebiilirsiniz.  
Peki dosyanız nereye kaydedilmiş oluyor?  
Google App Engine'de bildiğimiz anlamda bir FTP yoktur. Bu nedenle dosya herhangi bir dizin içine değil, blobstore denilen bir nevi dosya veritabanına kaydedilir. Bu blobstore'a gerek lokalde gerek gerçek sunucuda “Yönetici Dashboard” üzerinden erişip görebilirsiniz.  
  
  
  
[https://gist.github.com/171af1a0a8486d488a13.js](https://gist.github.com/171af1a0a8486d488a13.js)
