---
title: "Python'da return yerine yield"
date: 2018-10-16
---

Bir fonksiyon içinde döngü yaptırıp döngü sonucunu listeye atayıp fonksiyondan return ettirdiğimiz durumlar olur. Burada fonksiyon içinde liste tanımlayıp içine tekrar elemanları eklemek icap eder. Bunun yerine daha hızlı bir yol vardır:

```
def fon():
    sayilar =range(10)
    for sayi in sayilar:
        yield sayi*sayi

for sayi in fon():
    print sayi

```

  Dikkat ettiyseniz fonksiyon içinde liste filan yok. yield yardımı ile döngü sonucunu sanki listeye ekletip return ettirmiş oluyoruz.
