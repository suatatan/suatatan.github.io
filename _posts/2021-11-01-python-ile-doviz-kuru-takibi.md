---
categories:
- bilgisayar
date: 2021-11-01
layout: post
tags:
- turkish
- bot
- doviz
- finans
- longread
- piyasa-takibi
- python
- technology
title: Python ile döviz kuru takibi
---

Döviz kurları sürekli değiştiğinden her dakika takip etmek insanı yorabiliyor. Bunun için ufak bir script yazdım. Bu scriptte TEPE ve DIP parametrelerini ayarlayıp kur belirttiğiniz değerlerin üstüne veya altına geçtiğinde ekranda hatırlatma yapabiliyor.

Çalıştırmak için Python kurmalısınız. Kuramazsanız yorum kısmına yazın. Kurduktan sonra bu scripti çalıştırmak için konsola girip \`python pad.py\` diye komut vermeniz yeterli. Aşağıdaki kodları pad.py adı ile kaydedin.

Kodu çalıştırabilmek için bir de \`geckodriver.exe\` adlı programı kurmanız gerekir. O da [şurada](https://github.com/mozilla/geckodriver/releases). Uğraşamam derseniz

```
driver = webdriver.Firefox(executable_path="F:\\geckodriver.exe") #bu kodu silip şunu yazın:
driver = webdriver.Chrome(ChromeDriverManager().install())
```

Yatırım tavsiyesi değildir:)

```
import time
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import datetime
import time

KAC_DAKIKADA_BIR_KONTROL = 5
def kur_kontrol():
    driver = webdriver.Firefox(executable_path="F:\\geckodriver.exe")
    #driver = webdriver.Firefox(executable_path ="/home/suat/Genel/apps/geckodriver")
    url_a = "https://www.halkyatirim.com.tr/doviz-kurlari"
    driver.get(url_a)
    a = driver.find_element(By.XPATH,'/html/body/main/div[1]/div/main/div[4]/table[1]/tbody/tr[12]/td[4]').text
    GUNCELKUR = float(a.replace(",","."))
    # config
    TEPE=11.09
    DIP = 10.9
    saat = datetime.datetime.now().strftime("%H:%M")
    if GUNCELKUR>=TEPE:
        print(f"Euro gittikçe pahalanıyor, sat Saat:{saat}")
    elif(GUNCELKUR<=DIP):
        print(f"Euro çok ucuz, hemen sat Saat:{saat}")
    else:
        print(f"Al sat sinyali yok, cari kur:{GUNCELKUR} Saat:{saat}")
    driver.close()
    return None

while True:
    print("Kur kontrolu çalışıyor")
    kur_kontrol()
    time.sleep(KAC_DAKIKADA_BIR_KONTROL*60)
```

Kod çalışınca ekran şöyle olur:

[![](/images/image.png)](https://suatatan.wordpress.com/wp-content/uploads/2021/11/image.png)
