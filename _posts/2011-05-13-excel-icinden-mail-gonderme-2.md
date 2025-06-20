---
categories:
- bilgisayar
- genel
date: 2011-05-13
layout: post
tags:
- turkish
- excel-vba
- quickread
- technology
title: Excel içinden mail gönderme
---

Excel içerisinden makro ile direkt olarak outlook mesaj gönderme panelinin açılmasını sağlayabilirsiniz.  
  
Kodlar aşağıda. Bu makro özellikle, excelde eposta adresleri barındırıp her birine mail atmak işi rutin halde ise işe yarar bir çözüm olacaktır. İşte kodlar:  

```
Sub OutlookMesajOlustur()Dim olApp As ObjectDim Msg As ObjectSet olApp = CreateObject("Outlook.Application")Set Msg = olApp.CreateItem(0)Msg.DisplaySet Msg = NothingSet olApp = NothingEnd Sub
```
