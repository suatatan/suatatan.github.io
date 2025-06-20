---
categories:
- bilgisayar
date: 2011-03-24
layout: post
tags:
- english
- excel
- excel-vba
- longread
- technology
title: Excel VBA Makroları ile toplu alt sayfalar oluşturma ve çalışma sayfaları maniplasyonu
---

Bugün çoktandır merak edip araştırdığım Excel Makroları veya VBA denilen hizmeti öğrendim. Bir kaç saat içinde bundan sonraki toplu işlemleri tek kalemde yapmayı sağlayacak 'ilaç' gibi metotları öğrendim. (Daha önce programcılık yaptıysanız bir kaç saatte VBA'yı sökersiniz)

Excel VBA excel'de tabiri caizse hammallık yapmak gerektiğinde uzman excel kullanıcılarını hammallıktan kurtaran ve blok işlem yapabilen güçlü bir sihirli değnek.

Şimdi ilk örneğimi paylaşmak istiyorum. Bu örneği Hakediş tablosu hazırlarken geliştirdim. Temel amacı istenilen adette çalışma sayfasını (metraj için) otomatik olarak oluşturmak  icmal defterindeki her bir kalemdeki yer alan poz no ile poz tanımlarını her bir sayfaya ayrı yapıştırmak.

 

Aşağıdaki kodda gördüğünüz fonksiyonlardan KOPYALA() fonksiyonu halihazırdaki excel tablonuzda M isimli çalışma sayfasından 21 adet kopyalar

BosMetrajTablosuOlustur adlı fonksiyon ise KESIFOZETI tablosunda B sütüunda B5 ten başlayarak B sütunundaki bir veriyi alıp yeni açılmış M1 M2 diye giden çalışma sayfalarındaki B2 hücresine kaydeder ve her seferinde bir sonraki çalışma sayfasına sonraki satır değerini kaydeder. Diğer satırlarda da başka satırlardan veri alıp başka çalışma sayfalarındaki başka alanlara yapıştırır.

DeleteSheet adlı fonksiyon onay almadan parametre olarak verilen çalışma sayfasını siler. TopluSayfaSil ise DeleteSheet fonksiyonu kullanılarak  belirtilen aralıkltaki çalışma sayfalarını siler.

```
Sub KOPYALA()
'
' KOPYALA Makro
'
' Klavye Kısayolu: Ctrl+q
'

    For i = 1 To 18
        Sheets("M").Copy After:=Sheets("M")
        ActiveSheet.Name = "M" & i
        Next i

End Sub

Sub BosMetrajTablosuOlustur()

    For i = 1 To 18

        Sheets("M" & i).Range("B2") = Sheets("KESIFOZETI").Range("B" & i + 4)
        Sheets("M" & i).Range("B3") = Sheets("KESIFOZETI").Range("C" & i + 4)

        Sheets("M" & i).Range("A6") = "Ayarla:" & Sheets("KESIFOZETI").Range("D" & i + 4)
        Next i

End Sub

Sub TopluSayfaSil()
    For i = 15 To 21

        DeleteSheet ("M" & i)
        Next i

End Sub

Sub DeleteSheet(strSheetName As String)
' deletes a sheet named strSheetName in the active workbook
    Application.DisplayAlerts = False
    Sheets(strSheetName).Delete
    Application.DisplayAlerts = True
End Sub
```
