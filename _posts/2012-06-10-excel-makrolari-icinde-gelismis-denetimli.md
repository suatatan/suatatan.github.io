---
categories:
- bilgisayar
- genel
date: 2012-06-10
layout: post
tags:
- ekonomi
- english
- excel
- excel-vba
- isletme
- muhendislik
- quickread
- technology
- web-programlama
title: Excel makroları içinde gelişmiş denetimli formüller yazma
---

Bazen excel'deki formüllerin yetmediği durumlar olabilir. Mesela içiçe 5 eğer fonksiyonu veya karmaşık matematiksel hesaplamalar gibi. Bu durumlarda excel makrolarını kullanabilirsiniz.  
Aşağıdaki ekte bulunan makro bundan evvel  [şu makalede](http://blog.suatatan.com/2012/06/python-ile-excel-manipulasyonu.html) anlattığımız python ile yaptığımız parasal değere karşılık risk analizi yapan formülasyonun  excel makrosu dili (VBA) ile yazılmış halidir.  
Şu adresten indirip makro alanına import edebilirsiniz.  
[https://docs.google.com/open?id=0B2QbjSFSlgaMX2NJWkU2U0dhT28](https://docs.google.com/open?id=0B2QbjSFSlgaMX2NJWkU2U0dhT28)  
  
Makro kaynak kodları ise şöyle:  
  
  
Sub VeriKontrol()  
    ‘For dongumuzu acalim  
    For i = 1 To 99  
        'Parasal degerimizi tanimliyoruz  
        Dim parasal\_deger As Long  
        'Sonra bu degere A1,A2,A3… hucremizden aldigimiz degeri atiyoruz her seferinde  
        parasal\_deger = Range(“A” & i)  
          
        'Parasal degerimizi checkediyoruz.  
        'Bunun icin parasal degeri x sayalim  
        Dim x As Long  
        x = parasal\_deger  
        'Risk degerimizi varsayian olarak 0 atayalim  
        Dim risk As Integer  
        risk = 0  
        'If blogumuz pythondaki : yerine Then ve sonda Endif kullandik  
        If x > 10000 And x  
            risk = 1  
        ElseIf x > 100000 And x  
            risk = 2  
        ElseIf x > 500000 And x  
            risk = 3  
        ElseIf x > 1000000 And x  
            risk = 4  
        ElseIf x > 2000000 Then  
            risk = 5  
        Else:  
            risk = 0  
        End If  
        'Simdi hesaplanan risk degerimizi B sutunumuza siraliyoruz  
        Range(“B” & i) = risk  
        'For dongumuzu guzel guzel next ile devam ettiryoruz  
        Next i  
End Sub
