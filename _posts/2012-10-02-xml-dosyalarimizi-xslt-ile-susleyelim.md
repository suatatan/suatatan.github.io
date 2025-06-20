---
title: "XML dosyalarımızı XSLT ile süsleyelim"
date: 2012-10-02
categories: 
  - "bilgisayar"
  - "genel"
---

Diyelim ki aşağıdakine benzer renksiz, tatsız bir XML dosyanız var:  
  
  
<?xml-stylesheet type="text/xsl" href="**stil.xsl" ?>  
  
  
  
    Suat  
    ATAN  
    Duvarci ustasi  
  
  
    Cihan  
    Sezer  
    Lahmacun Ustasi  
  
  
    Sahabettin  
    Erginoguz  
    Profesor  
  
  
    Fani  
    Dogru  
    Milli atlet  
  
****Bu dosyayı XSL ile HTML içine gömülü olarak yani isterseniz açıklamalı, CSS ile renklendirilmiş olarak da görüntüleyebilirsiniz. Bunun için yukarıda dikkat ettiyseniz stil.xsl dosyası kullandık:  
  
stil.xsl dosyamız ise aşağıdaki gibi olmalıdır:  
  
               Personel Listesi  
         
            td{  
                background-color: gold;  
            }**                  

# **Duz gorunum**

       **ad“/>  
  
  

## Tablo gorunum:

  
  
     
         
         
     
     
         
         
             
             
         
         

| Ad | Soyad |
| --- | --- |
|  |  |

  
  
  
  
  
  
  
  
Gördüğünüz gibi xsl tagları ile xml dosyasındaki düğümleri sıralayabiliyor html dosyamız içine gömebiliyoruz.  
Bu ilki dosya aynı klasörde olmak üzere xml dosyası firefox ile açıldığında aşağaki gibi görünür:  
  

[![](/images/0e63f-xslxml.png)](https://suatatan.wordpress.com/wp-content/uploads/2012/10/0e63f-xslxml.png)**
