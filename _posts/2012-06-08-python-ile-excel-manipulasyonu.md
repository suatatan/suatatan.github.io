---
title: "Python ile Excel Manipülasyonu"
date: 2012-06-08
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "python"
  - "web-programlama"
---

[![](/images/65558-python_excel_logos.png)](https://suatatan.wordpress.com/wp-content/uploads/2012/06/65558-python_excel_logos.png)

Python üzerinden Excel dosyalarına erişim sağlayarak içindeki verileri alıp işlemek ve daha sonrasında bu verileri excel dosyasına yazdırmak pratik bir çözüm olabilir. Çünkü bazen exceldeki formüllerle aşılamayacak durumları oluyor. Bu durumlarda büyük miktardaki verileri python ile işlemek büyük kolaylık sağlıyor. Bu iş için  excel dosyası ile okuma operasyonlarında [xlrd](http://pypi.python.org/pypi/xlrd) ve yazma operasyonlarında [xlwt](http://pypi.python.org/pypi/xlwt) kütüphanelerini kullanacağız.  
Aşağıdaki hazırladığım örnek risk.xls dosyası içindeki parasal değerleri alıp, risk değerli olarak 1 ila 5 arasındaki değerleri atıyor. Sonra bu sonuçları output-risk.xls dosyasına yazdırıyor.  
  
  
  
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
  
  
#———————————————- 
  
Bu kodları aşağıdaki linkten indirebilirsiniz:  
[https://docs.google.com/open?id=0B2QbjSFSlgaMemZqSnl2T1BtOVE](https://docs.google.com/open?id=0B2QbjSFSlgaMemZqSnl2T1BtOVE)  
  
Aynı işi Makro (Excel VBA) ile yapmak isterseniz şu makaleme bakın:  
[http://blog.suatatan.com/2012/06/excel-makrolar-icinde-gelismis.html](http://blog.suatatan.com/2012/06/excel-makrolar-icinde-gelismis.html)  
  
Aynı işi Google App Script ile yapmak isterseniz şu makaleme bakın:  
[http://blog.suatatan.com/2012/06/google-app-script-ile-tablo.html](http://blog.suatatan.com/2012/06/google-app-script-ile-tablo.html)
