---
title: "Python ile XML verisini işlemek (parse etmek)"
date: 2012-12-19
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "google-app-engine"
  - "python"
---

Aşağıda bir projemde kullandığım ve işinize yarayabilecek bir örnek var. İteratif XML verilerini ayıklamak işinizi görecektir  
XML değişkenine atanmış XML satırları bir sonraki kodlarla işlenmektedir:  
Burada kullanılan kütüphane Minidom'dur. Python'un standart kütüphanesidir ve Google App Engine içinde de kullanımı mümkündür.  
[https://gist.github.com/3e64fdc2a0586943a0ed.js](https://gist.github.com/3e64fdc2a0586943a0ed.js)  
  
  
  
Bu işlem aşağıdaki gibi de yapılabilir:  
  
  
dom = parseString(XML)  
          
        questions=dom.getElement**s**ByTagName(‘question’)  
        for question in questions:  
            #NVAL=node.getElementsByTagName(“id”)\[0\].toxml()  
            **id**\=question.getElementsByTagName(“id”)\[0\].**firstChild.data**  
            text=question.getElementsByTagName(“text”)\[0\].firstChild.data  
              
      
            RESULT=RESULT+**id**+“  
”;  
        self.response.out.write(RESULT)
