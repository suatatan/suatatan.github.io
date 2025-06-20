---
categories:
- bilgisayar
- genel
date: 2012-02-14
layout: post
tags:
- turkish
- longread
- technology
title: Flask framework
---

[![](/images/logo.png)](http://flask.pocoo.org/static/logo.png)

Python ile web programcılığında ilk akla gelen framework şüphesiz ki [Django](https://www.djangoproject.com/)‘dur. Bilindik frameworklardan biri de [web.py](http://web.py/)'dir. Google App Engine sunduğu python desteğinde web.py'e benzer bir framework kullanır. Python ile web tasarımı yapmış/yapmakta olan biri olarak bu frameworkların çok hızlı, basit ve kod bakımından okunaklı olduğunu söylemeliyim. Özellikle [Jinja](http://jinja.pocoo.org/) benzeri template engine (şablon motoru) ile web programcılığında tasarım ile programlama tam olarak birbirinden ayrıştırılabiliyor. Yeme de yanında yat…

  

Geçenlerde Planet Python'da gezinirken, [Flask](http://flask.pocoo.org/) adlı yeni bir python framework'u ile karşılaştım. web.py'yi andırıyor. Ancak Google App Engine'de url mapping denilen, yani hangi url'nin hangi fonksiyonu çalıştıracağını listeleyen app.yaml adlı dosya yerine direkt python içinden fonksiyonun üzerinden url mapping yapılabiliyor.

```
from flask import Flaskapp = Flask(__name__)@app.route("/")def hello():    return "Merhaba Hacı abi!"if __name__ == "__main__":    app.run()
```

Burada @app.route(“/”)  ifadesi anasayfanın hello() adlı fonksiyonu çalıştıracağını söylüyor. 

  

Kurmak için aşağıdaki komutlarla (Linux altında) hemen flask framework'unu kullanabiliyorsunuz.

```
$ pip install Flask$ python hello.py * Running on http://localhost:5000/
```
