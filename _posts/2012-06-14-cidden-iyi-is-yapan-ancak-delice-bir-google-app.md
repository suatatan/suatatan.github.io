---
layout: post
title: "Cidden iyi iş yapan ancak delice bir Google App Script"
date: 2012-06-14
categories: 
  - "genel"
tags: 
  - "google-app-script"
---

Google App Script ile kaynak tablo içinde(0) başka bir tablo içindeki(1) liste halindeki her bir veriyi alıp kaynak tablodan arayarak bulduğu takdirde,bulduğu satırdaki başka bir hücre verisini alıp, 1. tablodaki listenin yanındaki satırlara yazdıran acaibül garaip suat atan hayratı scipt.  
Yanlız çalışınca çok CPU harcıyor. Hesaplamalar uzun sürüyor.  
  
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  
function goster(ifade){  
  Browser.msgBox(ifade);  
}  
  
  
function tara(aif){  
   
  var belge=SpreadsheetApp.getActiveSpreadsheet();  
  var sayfa=belge.getSheets()\[0\];  
  for(i=6;i  
    var okunan=sayfa.getRange(i,5);  
    var okunan\_deger=okunan.getValue();  
    var snc=okunan\_deger.indexOf(aif);  
     
    if(snc != -1){  
     
    okunan.setBackground(“red”);  
    var pcu=sayfa.getRange(i,20).getValue();  
    sayfa.getRange(i,20).setBackground(“cyan”);  
    var hq=sayfa.getRange(i,21).getValue();  
    }  
    else  
    {  
    okunan.setBackground(“white”);  
    }  
     
     
  }  
  return pcu;  
  
  
  
  
}  
function yaz()  
{  
  
  
var belge=SpreadsheetApp.getActiveSpreadsheet();  
var sayfa=belge.getSheets()\[1\];  
for(j=1;j  
  var kyn=sayfa.getRange(j,1).getValue();  
  var snc=tara(kyn);  
  sayfa.getRange(j,2).setValue(snc);  
}  
  
  
  
  
}  
  
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
