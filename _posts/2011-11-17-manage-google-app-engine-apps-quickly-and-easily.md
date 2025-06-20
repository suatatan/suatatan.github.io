---
title: "Manage Google App Engine Apps quickly and easily in linux withoutterminal-hell"
date: 2011-11-17
categories: 
  - "bilgisayar"
  - "english"
  - "genel"
tags: 
  - "linux"
  - "ubuntu"
---

[![](/images/ekrangoruntusu-2011-11-17-122346.png "EkranGoruntusu - 2011-11-17 12:23:46")](http://suatatan.wordpress.com/wp-content/uploads/2011/11/ekrangoruntusu-2011-11-17-122346.png)  
  
I’m developing apps with Google App Engine Python on Ubuntu. I always working with three commands for managing app: run local, update app, and download source code of app. This opeations executing with standard dev\_appserver.py and appcfg.py commands that its very boring.  
I determined writing a bash script for executing this operationgs quickly and without boring. The source codes are below. Copy and paste them, create a document on your desktop gae.sh and paste these codes inside. Then, from terminal, set permissions with:  
chmod +x gae.sh  
and run it  
./gae.sh  
  
This script will ask you smartly for commands. Follow the process  
  
[https://gist.github.com/suatatan/5742762.js](https://gist.github.com/suatatan/5742762.js)
