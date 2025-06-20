---
title: "PYTHON'da küme işlemleri"
date: 2022-03-02
categories: 
  - "bilgisayar"
---

Matematikteki küme teorisini hatırlarsınız. Python'da bunun birebir karşılıkları var.

Buyrun

# Küme İşlemleri

```
dogu= {"van","hakkari"}
guney={"siirt","diyarbakir"}
dogu.union(guney) #birleşim
```

```
{'diyarbakir', 'hakkari', 'siirt', 'van'}
```

```
dogu= {"van","hakkari","van"}
guney={"siirt","diyarbakir"}
dogu.union(guney)
```

```
{'diyarbakir', 'hakkari', 'siirt', 'van'} # mükerrerler silinir
```

```
a={"suat","agah","aras"}
b= {"agah","ali","ahmet"}
a.intersection(b) #kesişim
```

```
{'agah'}
```

```
a.difference(b) #fark
```

```
{'aras', 'suat'}
```

```
avrupa={"fransa","italya","bulgaristan","romanya"}
balkan ={"romanya","bulgaristan"}
balkan.issubset(avrupa) #alt küme mi?
```

```
True
```

```
balkan.clear()
balkan # boş döner
```

```
set()
```

# KEY-value DÜZENİ

```
baskentler ={"tr":"ankara","usa":"washington","fr":"paris"}
baskentler.keys()
```

```
dict_keys(['tr', 'usa', 'fr'])
```

```
"tr" in baskentler.keys()
```

```
True
```

```
baskentler.values()
```

```
dict_values(['ankara', 'washington', 'paris'])
```

```
"ankara" in baskentler.values()
```

```
True
```

```
baskentler.items()
```

```
dict_items([('tr', 'ankara'), ('usa', 'washington'), ('fr', 'paris')])
```

```
baskentler.get("tr")
```

```
'ankara'
```

# String İşlemleri

```
"suatatan".count("a")
```

```
3
```

```
"suatatan".find("t")
```

```
3
```
