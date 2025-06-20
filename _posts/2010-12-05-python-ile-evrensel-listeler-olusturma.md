---
layout: post
title: "Python ile evrensel listeler oluşturma"
date: 2010-12-05
categories: 
  - "bilgisayar"
tags: 
  - "web-programlama"
---

[![](/images/passlist.png "PASSLIST")](http://suatatan.wordpress.com/wp-content/uploads/2010/12/passlist.png)

Fantastik amaçla veya Brute Force Attack(Deneme yanılma ile şifre saldırıları) için  evrende belirli karakter sayıları arasındaki var olabilecek tüm harf ve sayı kombinasyonlarını oluşturarak text dosyasına yazan bir python betiği temin ettim.

Bkz: [http://www.backtrack-linux.org/forums/old-programming/10805-another-password-wordlist-generator-python.html](http://www.backtrack-linux.org/forums/old-programming/10805-another-password-wordlist-generator-python.html)

Bu betik, çalıştırılınca önce kombinasyon tipini soruyor, bu kombinasyon sadece sayılardan oluşabileceği gibi sayılar,harfler (büyük ve küçük) de olabilir. Sonra en küçük uzunluk ile en büyük uzunluğu soruyor daha sonra kombinasyonları oluşturarak wordlist.txt dosyasına yazıyor. Elbette büyük uzunluktaki şifreleri oluşturmak saatler sürebiliyor.

Ancak baştan belirteyin. Brute Force Attack uygulamaları teoride münkün olsa da pratikte daha hayır vermedi hiç bir hacker adayına:)

İşte o kodlar:

```
f=open('wordlist', 'w')

def xselections(items, n):
    if n==0: yield []
    else:
        for i in xrange(len(items)):
            for ss in xselections(items, n-1):
                yield [items[i]]+ss

# Numbers = 48 - 57
# Capital = 65 - 90
# Lower = 97 - 122
numb = range(48,58)
cap = range(65,91)
low = range(97,123)
choice = 0
while int(choice) not in range(1,8):
    choice = raw_input('''
    1) Numbers
    2) Capital Letters
    3) Lowercase Letters
    4) Numbers + Capital Letters
    5) Numbers + Lowercase Letters
    6) Numbers + Capital Letters + Lowercase Letters
    7) Capital Letters + Lowercase Letters
    : ''') 

choice = int(choice)
poss = []
if choice == 1:
    poss += numb
elif choice == 2:
    poss += cap
elif choice == 3:
    poss += low
elif choice == 4:
    poss += numb
    poss += cap
elif choice == 5:
    poss += numb
    poss += low
elif choice == 6:
    poss += numb
    poss += cap
    poss += low
elif choice == 7:
    poss += cap
    poss += low

bigList = []
for i in poss:
    bigList.append(str(chr(i)))

MIN = raw_input("What is the min size of the word? ")
MIN = int(MIN)
MAX = raw_input("What is the max size of the word? ")
MAX = int(MAX)
for i in range(MIN,MAX+1):
    for s in xselections(bigList,i): f.write(''.join(s) + '\n')
```
