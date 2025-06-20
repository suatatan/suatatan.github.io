---
layout: post
title: "Page Update Controller with Python"
date: 2012-09-10
categories: 
  - "bilgisayar"
  - "english"
  - "genel"
tags: 
  - "python"
---

Are you bored with controlling updates from any  page? Perhaps you are waiting exam or interview results:  
Here a code below that i coded for checking updates in any page. You can change pageurl . When the page is updated, this python script will open the page with your default browser:  
  
  
“”“  
suatatan.com  
”“”  
  
from urllib import urlopen  
import time  
import webbrowser  
i=0  
pageurl=“http://www.hurriyet.com.tr/anasayfa/”  
page={}  
page\[0\]=urlopen(pageurl).read()  
sleep\_freq=10  
while True:  
    # Code executed here  
    i=i+1  
    page\[i\]= urlopen(pageurl).read()  
    if page\[i\]==page\[i-1\]:  
        print pageurl+“ sayfa ayni–”+str(i)+“–kontrol frekansi=”+str(sleep\_freq)  
        pass  
    else:  
        print “\*\*\*\*sayfada guncelleme var”  
        webbrowser.open(pageurl)  
          
    if i>50:  
        sleep\_freq=50  
    if i>100:  
        sleep\_freq=300  
    time.sleep(sleep\_freq)
