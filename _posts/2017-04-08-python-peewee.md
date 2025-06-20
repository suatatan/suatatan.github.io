---
layout: post
title: "Python Peewee"
date: 2017-04-08
categories: 
  - "bilgisayar"
tags: 
  - "python"
---

![2017-04-08 19_52_35-peewee — peewee 2.9.2 documentation](/images/2017-04-08-19_52_35-peewee-e28094-peewee-2-9-2-documentation.png)

Python ile birlikte birçok küçük ve orta ölçekli projenizde kullanabileceğiniz Peewee adlı bir veri tabanı var. Peewee ORM(Object Relational Map) imkanı da sunuyor. Yani veri tabanına eklenecek kayıtları bir nesne olarak tanımlayabiliyorsunuz.  Ben [Flask](http://flask.pocoo.org/) ile birlikte bir web projemde kullanmış ve pratikliğinden epey memnun kalmışım.  Peewee Sqlite ile birlikte de çalışabiliyor:

```
from peewee import *

db = SqliteDatabase('people.db')

class Person(Model):
    name = CharField()
    birthday = DateField()
    is_relative = BooleanField()

    class Meta:
        database = db # This model uses the "people.db" database.

```

Örnek bir kod burada: Kayıt yapmak bu kadar kolay:

```
>>> from datetime import date
>>> uncle_bob = Person(name='Bob', birthday=date(1960, 1, 15), is_relative=True)
>>> uncle_bob.save() # bob is now stored in the database

```

Bu da veri çekmek için:

```
>>> grandma = Person.select().where(Person.name == 'Grandma L.').get()

```

Peewee dökümantasyonu: [burada](http://docs.peewee-orm.com/en/latest/peewee/quickstart.html#retrieving-data)[burada](http://docs.peewee-orm.com/en/latest/peewee/quickstart.html#retrieving-data)
