---
title: "Excel içinden mail gönderme"
date: 2011-05-13
categories: 
  - "bilgisayar"
tags: 
  - "excel-vba"
---

Excel içerisinden makro ile direkt olarak outlook mesaj gönderme panelinin açılmasını sağlayabilirsiniz.

Kodlar aşağıda. Bu makro özellikle, excelde eposta adresleri barındırıp her birine mail atmak işi rutin halde ise işe yarar bir çözüm olacaktır. İşte kodlar:

```
Sub OutlookMesajOlustur()
Dim olApp As Object
Dim Msg As Object

Set olApp = CreateObject("Outlook.Application")

Set Msg = olApp.CreateItem(0)

Msg.Display

Set Msg = Nothing
Set olApp = Nothing
End Sub
```
