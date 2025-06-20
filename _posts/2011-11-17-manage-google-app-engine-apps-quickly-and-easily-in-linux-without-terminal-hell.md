---
title: "Manage Google App Engine Apps quickly and easily in linux without terminal-hell"
date: 2011-11-17
categories: 
  - "bilgisayar"
  - "english"
tags: 
  - "linux"
  - "ubuntu"
---

[![](/images/ekrangoruntusu-2011-11-17-122346.png "EkranGoruntusu - 2011-11-17 12:23:46")](http://suatatan.wordpress.com/wp-content/uploads/2011/11/ekrangoruntusu-2011-11-17-122346.png)

I'm developing apps with Google App Engine Python on Ubuntu. I always working with three commands for managing app: run local, update app, and download source code of app. This opeations executing with standard dev\_appserver.py and appcfg.py commands that its very boring. I determined writing a bash script for executing this operationgs quickly and without boring. The source codes are below. Copy and paste them, create a document on your desktop gae.sh and paste these codes inside. Then, from terminal, set permissions with: chmod +x gae.sh and run it ./gae.sh

This script will ask you smartly for commands. Follow the process

Bash script of gae.sh:

```
#!/bin/bash
#config*****************************
#appcfg.py or dev_appserver.py path
appcfg_path="/home/marco/Genel/google_appengine"
#default app what you want work with it
default_app_name="kolay-ingilizce-oku"
#config/////////////////////////////////////

#welcome messsage
echo "Welcome to gae.sh for managing google app engine apps easily"
echo "You can edit the configs in gae.sh document with your local variables as appcfg.py path and default_app_name"
echo "You can use this script free. But i want support my free app notesuat.appspot.com"
echo "Suat ATAN suatatan.wordpress.com"
echo "**********SELECT OPERATION***************"

#function runlocal
runlocal(){
echo "Local will run"
read -p "Write app name that you want run it [ for default, $default_app_name: x] ": "app_name"
if [ $app_name = x ]
then app_name=$default_app_name
echo "****default_app $app_name is running****"
fi
command="$appcfg_path/dev_appserver.py $appcfg_path/$app_name"
echo "$command is processing----"
python $command
echo "echo $app_name is running"
}

#function download_app
download_app() {
echo "Downloading Google App Engine app source code"
read -p "Write app name that you want download it [ for default, $default_app_name: x] ": "app_name"
read -p "Write app version that you want download it [1,2,beta... ] ": "version"
if [ $app_name = x ]
then app_name=$default_app_name
echo "****default_app $app_name is downloading****"
fi
command="$appcfg_path/appcfg.py download_app -A $app_name -V $version $appcfg_path/$app_name"

echo "$command is processing----"
python $command
echo "echo $app_name Source code downloaded"
}
#function upload app
upload_app(){
echo "Google app engine app will update(upload)"
read -p "Write app name that you want update it [ for default, $default_app_name: x] ": "app_name"
if [ $app_name = x ]
then app_name=$default_app_name
echo "****default_app $app_name is downloading****"
fi
command="$appcfg_path/appcfg.py update $appcfg_path/$app_name"

echo "$command is processing----"
python $command
echo "echo $app_name updated"

}

#maincommand***************************************************************************************
read -p "What you want? [download_app=d,update=u,runlocal=r]:" want
if [ $want = d ]
then download_app
elif [ $want = r ]
then runlocal
elif [ $want = u ]
then upload_app
fi
```
