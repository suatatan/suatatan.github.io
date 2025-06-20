---
categories:
- bilgisayar
- genel
date: 2012-06-10
layout: post
tags:
- turkish
- excel-vba
- google-app-script
- quickread
- technology
title: Google App Script ile tablo manipülasyonu
---

Google App Script ile aşağıda yazdığım fonksiyonlarla A sütununda sıralanmış parasal tutarların risk değerleri için 1 ila 5 arası değerleme yapılıp B sütununa otomatik olarak yazdırılır.  
  
İşte script:  
  
function **risk\_test(tutar)**{  
  var x=tutar;  
  var risk=0;  
  if ((x>10000) && (x  
    risk=1;  
  }  
  else if ((x>100000) && (x  
    risk=2;  
  }  
  else if ((x>500000) && (x  
    risk=3;  
  }  
  else if ((x>1000000) && (x  
    risk=4;  
  }  
  else if (x>2000000){  
    risk=5;  
  }  
  else  
  {  
  risk=0;  
  }  
  return risk;  
}  
  
  
  
  
function **risk\_hesabi\_yap\_suat\_atan\_abi()**{  
  var ss=SpreadsheetApp.getActiveSpreadsheet();  
  var sheet=ss.getSheets()\[0\];  
  
  
    for(i=2;i  
        
       var kaynak=sheet.getRange(i,1).getValue();  
       var hedef=sheet.getRange(i,2);  
       var sonuc=risk\_test(kaynak);  
       hedef.setValue(sonuc);  
         
    }    
  Browser.msgBox(“Risk hesaplandı”);  
        
}
