---
categories:
- bilgisayar
- genel
date: 2012-02-25
layout: post
tags:
- turkish
- quickread
- technology
title: Google App Engine Pratik Memcache Kullanımı
---

Google App Engine ile pratik memcache kullanımına dair örneğim:  
Sürekli olarak get\_paragraflar fonksiyonunu kullanırız. Böylece bu fonksiyon önce veritabanından verileri alır, memcacheye kaydeder. 3600 saniye (1 saat) boyunca sırf veritabanını yormadan memcacheden okur. Sonra tekrar veritabanından veri çekip memcacheye kaydeder. Böylece her seferinde veritabanı yorulmamış olur.  
  

```
 from google.appengine.api import memcacheimport logginglogging.getLogger().setLevel(logging.DEBUG)def get_paragraflar(self,memcache_key_name,time):        data = memcache.get(memcache_key_name)        logging.info("*****MEMCACHE KAYDI OKUNDU*******")        if data is not None:            return data        else:            data = self.render_paragraflar()            memcache.add(memcache_key_name, data, time)            logging.info("*****MEMCACHE KAYDI YAPILD*******")            return data    def render_paragraflar(self):        paragraflar=Paragraf().all().order("-tarih").fetch(20)        return paragraflar
```
