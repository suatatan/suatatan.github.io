---
title: "Ready for writing code template for Google App Engine"
date: 2012-02-17
categories: 
  - "english"
  - "genel"
tags: 
  - "google-app-engine"
---

If you coding with google app engine you know that configuring app.yaml file and template files a bit of borrowfull work. I prepared configured and ready for code template for Google App Engine in python. [Download](http://ubuntuone.com/5hPNFfCZY6v6FSRHH2mpkl) this tar.gz file and exract it. This file configured for admin url map in app.yaml file, you can quickly start coding in \*.py file and run. 

Enjoy…

  

Configured app.yaml file here:

  

```
application: kolay-ingilizce-okuversion: beta8runtime: pythonapi_version: 1handlers:- url: /css  static_dir: html/css- url: /js  static_dir: html/js- url: /img  static_dir: html/img#python------------------- url: /admin/.*  script: python/main.py  login: admin- url: /.*  script: python/main.py
```
