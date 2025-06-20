---
layout: post
title: "Excel içinden mail gönderme"
date: 2011-05-13
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "excel-vba"
---

Excel içerisinden makro ile direkt olarak outlook mesaj gönderme panelinin açılmasını sağlayabilirsiniz.  
  
Kodlar aşağıda. Bu makro özellikle, excelde eposta adresleri barındırıp her birine mail atmak işi rutin halde ise işe yarar bir çözüm olacaktır. İşte kodlar:  

```
Sub OutlookMesajOlustur()Dim olApp As ObjectDim Msg As ObjectSet olApp = CreateObject("Outlook.Application")Set Msg = olApp.CreateItem(0)Msg.DisplaySet Msg = NothingSet olApp = NothingEnd Sub
```
