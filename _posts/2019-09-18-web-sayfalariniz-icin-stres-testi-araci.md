---
categories:
- bilgisayar
date: 2019-09-18
layout: post
tags:
- english
- longread
- technology
title: Web Sayfalarınız için Stres Testi Aracı
---

Web sayfanıza aynı anda çok fazla sayıda kullanıcı girdiğinde ne olacağını simüle mi etmek istiyorsunuz? Buyrun buradan: [Locust](https://locust.io/).

Bu araç python ile yazılmış. Bunu kullanabilmek için bilgisayarınıza Python kurulmuş olmalıdır. Python kurulumu için: buradan.

Python'u kurduktan sonra konsoldan

```
pip install locustio
```

dediğinide Locust kurulmuş olur. Daha sonra test dosyanızı yazarsınız. En ilkel versiyonu burada. Bu dosyayı **locustfile**.**py** olarak adlandırın. Bu dosya sadece o sayfaya girmek içindir. Login olmak ve form doldurtmak gibi fonksiyonlar da mümküdür:

```
from locust import HttpLocust, TaskSet, task
class UserBehavior(TaskSet):
    def on_start(self):
        self.diger_sayfa()
    @task(1)
    def diger_sayfa(self):
        response = response = self.client.get("/authentication/register")
class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 0
    max_wait = 0

```

Son olarak bu kodların bulunduğu klasöre konsoldan gidin ve aşağıdaki komutu çalıştırın:

```
locust -f locustfile.py --host=http://testedeceginizadres.com
```

Bu komutu çalıştırdıktan sonra [http://localhost:8089](http://localhost:8089) sayfasını açın. Bu sayfa şöyledir:  

Bu komutu çalıştırdıktan sonra [http://localhost:8089](http://localhost:8089) sayfasını açın. Bu sayfa şöyledir:  

![](/images/image.png)

Bu alana aynı anda 100 kullanıcının 10 "hatch rate"si ile gireceğimizi simüle edeceğimizi söyledik. "Start swarming' butona basınca ekran şöyle olur:

![](/images/image-1.png)

Burada sayfanın bu strese nasıl cevap verdiği, cevap verme süreleri ve eğer erişim durdu ise erişimin kesilmesi gibi bilgiler görüntülenir.

![](/images/image-2.png)

Charts ekranından da sayfanın tepkilerini canlı izleyebiliriz.

Bu araç sayesinde ilk stres testimizi yapmış olduk. Daha ileri testler için Locust dokümantasyonunu okuyabilirsiniz.: [https://docs.locust.io/en/stable/](https://docs.locust.io/en/stable/)

Kolay gelsin
