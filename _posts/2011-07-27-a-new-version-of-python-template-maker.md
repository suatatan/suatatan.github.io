---
layout: post
title: "A new version of Python template maker"
date: 2011-07-27
categories: 
  - "bilgisayar"
  - "english"
tags: 
  - "python"
  - "web-programlama"
---

I developed a [script](http://suatatan.wordpress.com/2011/07/27/dreamweaver-like-html-template-dressing-in-aptana-with-python/) early for dressing pages with demanded template here is newer version:

```
from BeautifulSoup import BeautifulSoup
#Configuration
root="D:/users/suat.atan/Desktop/yenisehrivan/"
cssroot="/htmlres/css/"
jsroot="/htmlres/js/"

class TemplateMaker():
    def generate(self,NUDEPAGE_NAME):
        NUDEPAGE=open(root+"pages/"+NUDEPAGE_NAME+".html").read()
        index=open(root+"pages/index.html").read()
        soup = BeautifulSoup(index)
        head= soup.findAll("head")
        #header
        header_1=soup.findAll("div",id="header")
        #menu
        header_2=soup.findAll("div",id="topmenu")
        #change css
        css=soup.findAll("link",id="maincss")
        css[0]['href']=cssroot+NUDEPAGE_NAME+".css"
        #change js
        js=soup.findAll("script",id="mainjs")
        js[0]['src']=jsroot+NUDEPAGE_NAME+".js"
        HEADER=str(header_1[0])+str(header_2[0])
        HEAD= str(head[0])
        html1="""\n
        """
        html2="""\n
```

""" html3="

\\n

```
\n"
        sign=""
        HTML=html1+HEAD+html2+HEADER+NUDEPAGE+html3
        file =open(root+"pages/gen-"+NUDEPAGE_NAME+".html","w")
        file.write(HTML)
        file.close()
        print "--Generated "+NUDEPAGE_NAME
        return True

tm=TemplateMaker()
tm.generate("detail")
```
