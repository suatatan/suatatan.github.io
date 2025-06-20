---
title: "İlk Google App Script Uygulamam"
date: 2012-06-10
categories: 
  - "genel"
tags: 
  - "excel"
  - "excel-vba"
  - "google-app-script"
---

Google Drive (Docs) kullanıyorsanız excel makroları muadili olarak kullanılan ve saf Javascriptle yazılan “Google App Script” kodlamayla üstün ve karmaşık işlemler yapabilirsiniz. Buna mail gönderimi, google data servislerine erişim de dahildir. Bu yönüyle excel makrolarından daha fazla şey vadediyor. Ve daha kolay…  
Script A1 hücresindeki değeri alıp kdv'sini hesaplayıp B1'e yazıyor.  
  
İşte ilk scriptim:  
  
  
function **kdv\_hesapla**(deger) {  
  var kdv=deger\*0.18;  
  return kdv;  
}  
function **run**(){  
  var ss=SpreadsheetApp.getActiveSpreadsheet();  
  var sheet=ss.getSheets()\[0\];  
        
  var kaynak=sheet.getRange(“A1”);  
  var hedef=sheet.getRange(“B1”);  
  var deger=kdv\_hesapla(kaynak.getValue());  
  hedef.setValue(deger)  
        
}
