---
layout: post
title: "configR paketi ile R'da konfigürasyon dosyaları yazmak, okumak"
date: 2019-11-10
categories: 
  - "bilgisayar"
tags: 
  - "r"
  - "veri-madenciligi"
  - "veribilim"
---

Şöyle bir config dosyamız olsun, iki parametremiz var:

```
[max_allowed_error]
=10

[a]
=10

```

Bu dosyayı R'da okumak için şöyle yaparız:

```
library(configr)
#
config <- read.config(file="config.ini")
print(config$max_allowed_error)
```

Gördüğünüz gibi direkt olarak parametrlerimizi alanımıza çağırdık. Şimdi parametreleri değiştirip config.ini dosyamıza bir daha yazdıralım:

```
yazilacak_veriler <- list(max_allowed_error =200,a=10)
write.config(yazilacak_veriler,file="config.ini")
```

Bu durumda config.ini dosyamızı açınca değerlerimiz 200 ve 10 olarak görülecektir.

Bu configR paketi bizi dosya aç, oku gibi işlemler yerine config.ini dosyalarından kolayca okuma yazma yapmamızı sağlar.

**INI formatı yerine YAML formatı**

Daha pratik olan yaml formatını da kullanabilirsiniz

```
library(configr)
config <- read.config(file="config.ini",file.type = "yaml")
print(config)

yazilacak_veriler <- list(max_allowed_error =200,starting_id=10)
write.config(yazilacak_veriler,file="config.ini",write.type = "yaml")
```

**Sadece Tek Değişkeni Değiştirikten Sonra Dosyaya Yazmak**

Yukarıda her write işleminde tüm değişkenleri yeniden yazmamız gerekirdi, ama aşağıdaki gibi liste parametresini yukarıda tanımlayarak tekli parametre güncellemesinden sonra bunu konfigürasyon dosyasına yazdırabiliriz.

```
library(configr)

yazilacak_veriler <- list(a=10,b=20)

#ilk yazma
write.config(yazilacak_veriler,file="deneme.yaml",write.type = "yaml",)

config <- read.config(file="deneme.yaml",file.type = "yaml")
print(config)

#sadece tek değişkeni editleme
yazilacak_veriler[['a']] = 10000
write.config(yazilacak_veriler,file="deneme.yaml",write.type = "yaml",)

```
