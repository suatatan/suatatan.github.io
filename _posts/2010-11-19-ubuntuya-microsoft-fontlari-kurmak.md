---
layout: post
title: "Ubuntu'ya Microsoft fontları kurmak"
date: 2010-11-19
categories: 
  - "bilgisayar"
tags: 
  - "linux"
  - "ubuntu"
---

Ubuntu kullanıcıları özellikle web sayfalarına girdiklerinde ya da Windows ortamında hazırlanmış belgelere baktıklarında fontların olduğundan biraz farklı bazen ise kötü göründüklerini farketmiştlerdir.  Bunun nedeni Windows altında bulunan ve Windows'a has bazı fontların Ubuntu'da tanınmamasıdır ki (ubuntu bunu yapmak zorunda değildir).

Bu içerik Suat  ATAN tarafından yazılmıştır. Blogu: www.suatatan.wordpress.com. Kaynağı belirttiğiniz müddetçe cami WC kapıları arkasına dahi yazabilirsiniz.

Çözümü microsoft fontlarını yüklemektir. Bu işlemi de kolayca ve yine komutla yapıyoruz. Terminail açıp:

sudo apt-get install msttcorefonts

diyeceğiz. Terminal Evet mi hayır mı diye sorunca evet diyeceğiz. En sonda işlemler bitince

sudo fc-cache -fv

diyeceğiz Bu işlemlerden sonra  Microsofta ait truetype denilen aşağıdaki fontlar da ubuntumuza gelir:

- Andale Mono
- Arial Black
- Arial (Bold, Italic, Bold Italic)
- Comic Sans MS (Bold)
- Courier New (Bold, Italic, Bold Italic)
- Georgia (Bold, Italic, Bold Italic)
- Impact
- Times New Roman (Bold, Italic, Bold Italic)
- Trebuchet (Bold, Italic, Bold Italic)
- Verdana (Bold, Italic, Bold Italic)
- Webdings

Bu içerik [http://embraceubuntu.com/2005/09/09/installing-microsoft-fonts/](http://embraceubuntu.com/2005/09/09/installing-microsoft-fonts/) adresinden çevrilmiştir. Kendilerine teşekkür ederiz.
