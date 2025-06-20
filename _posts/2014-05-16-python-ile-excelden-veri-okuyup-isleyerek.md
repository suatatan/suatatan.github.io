---
layout: post
title: "Python ile Excel'den veri okuyup işleyerek sonuçları Excel dosyasına yazdırma"
date: 2014-05-16
categories: 
  - "genel"
---

Python dili ile Excel dosyalarına erişim sağlayarak verileri almak ve işlemek mümkündür. Aşağıda parasal değerleri alıp her biri için risk değerlemesi yaptıktan sonra sonuçları output-risk.xls dosyasına yazdıran bir kod betiği var. Bizzat yazdım. Excel'de  normalde excel fonksiyonları ile yazılamayacak karmaşıklıktaki veri işleme operasyonları için Excel'e pythondan dışarıdan müdahale etmek iyi bir çözüm olabilir.  
Aynı işi Excel makroları ile yapmak mümkün ise de python daha sade bir çözüm sunuyor.  
Bu kodlar python ile excelden veri okumak için [xlrd](http://pypi.python.org/pypi/xlrd), python ile excele veri yazmak için [xlwt](http://pypi.python.org/pypi/xlwt) kütüphanesi kullanıyor.  
  
İşte kodlar:  
  
\# -\*- coding: utf-8-\*- 
import xlrd  
import xlwt  
#read  
  
“”“  
tek satira kaydedilmiş proje parasal degerlerini check edip  
risk degerlendirmesi yapar 1 ila 5 arasindaki risk puanlarini bulur.  
output-risk.xls dosyasina parasal degerler ve karsilik gelen risk degerlerini yazar  
”“”  
class DataController:  
    def data\_risk\_test(self,parasal\_deger=0):  
        x=parasal\_deger  
        if (x>10000)&(x  
                risk=1  
        elif(x>100000)&(x  
            risk=2  
        elif(x>500000)&(x  
            risk=3  
        elif(x>1000000)&(x  
            risk=4  
        elif(x>2000000):  
            risk=5  
        else:  
            risk=0  
        return risk  
     
    def risk\_test(self):  
        okuwb = xlrd.open\_workbook(‘risk.xls’)  
        okuwb.sheet\_names()  
        okuhucre = okuwb.sheet\_by\_index(0)  
        okuhucre = okuwb.sheet\_by\_name(u'Sheet1’)  
        #write  
        yazwb = xlwt.Workbook()  
        yazhucre = yazwb.add\_sheet('Otomatik1’)  
        risk=0  
        i=0  
        for rownum in range(okuhucre.nrows):  
            #print sh.row\_values(rownum)  
            VAL=okuhucre.row\_values(rownum)  
            x=VAL\[0\]  
            risk=self.data\_risk\_test(x)             
            #print str(x)+“:”+str(risk)  
            yazhucre.write(i,0,x)  
            yazhucre.write(i,1,risk)  
            i=i+1  
        yazwb.save(“output-risk.xls”)  
        print “\*\*Risk kontrolleri yapilarak output-risk.xls dosyasina islendi”  
#\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
dc=DataController()  
dc.risk\_test()  
  
      
**Dosyayı indirmek için ise aşağıdaki linki kullanabilirsiniz:**  
  
[https://docs.google.com/open?id=0B2QbjSFSlgaMemZqSnl2T1BtOVE](https://docs.google.com/open?id=0B2QbjSFSlgaMemZqSnl2T1BtOVE)
