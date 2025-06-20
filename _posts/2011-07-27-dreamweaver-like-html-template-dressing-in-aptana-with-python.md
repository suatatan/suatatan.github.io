---
title: "Dreamweaver-like html template dressing in Aptana with Python"
date: 2011-07-27
categories: 
  - "bilgisayar"
  - "english"
tags: 
  - "python"
  - "web-programlama"
---

The best way for dressing multiple page with a single template is Dreamweaver HTML template system. This system is ok but not available in Aptana.  For this problem i coded a simple python script that can launchable under Aptana. This script reading head elements of main page for css and javascript's after this asks the zero-templated(nude) page name and gets content from zero-templated page and combines template and nude page. After that writing templated page to a html file.

For using this script you must download BeatifulPython script and import it.

```
from BeautifulSoup import BeautifulSoup
root="D:/users/suat.atan/Desktop/myproject/"
index=open(root+"pages/index.html").read()
soup = BeautifulSoup(index)
head= soup.findAll("head")
HEAD= head[0]
html1=""""""
html2="""""" body_name=raw_input("Template page: (withoyut .html expression)-->") body=open(root+"pages/"+body_name+".html").read() html3=""
HTML=html1+str(HEAD)+html2+body+html3
file =open(root+"pages/new_template.html","w")
file.write(HTML)
file.close()
print "Generated"
```
