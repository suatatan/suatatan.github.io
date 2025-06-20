---
categories:
- genel
date: 2015-03-12
layout: post
tags:
- english
- longread
- matematik
- sayisalyontemler
- technology
title: SymPy ile python’da sembolik cebir
---

![](/images/tumblr_inline_nl30cgNfjH1r4exmc.png)

Bol formüllü matematiksel ifadeler içeren makalelerdeki o gizemli denklemlerin çalışır hali var mıdır?  Bu makalelerde boğulduğum anlarda aklıma hep bu soru gelirdi. Meğer bu denklemler, makale sayfaları üzerinde gözden kaybolmaya mahkum değil. SymPy adlı python kütüphanesi ile denklem tanımlayabiliyor, her türlü denklem işlemi yapabiliyorsunuz. Dahası, buna integral, türev de dahil. Ayrıca denklemler çözümlenebiliyor.

[SymPy web](http://live.sympy.org/) sayfasında kütüphaneyi indirmeksizin sympy kullanabileceğiniz interaktif bir terminal var. Oradan basit bir denememin ekran görüntüsü şöyle:

![](/images/tumblr_inline_nl30c1K8fS1r4exmc.png)

İşin güzel tarafı, formülleri çağırınca gerçekten formül gibi ekrana geliyor.

İyi eğlenceler.

**2023 güncellemesi**

\-7 sene önce yazdığım şeyi şu anda bir veri bilimci olarak kullanmak için döndüm. SymPy ile yazılan fonksiyonlarla kolayca kısmi türev hesabı da oluyor. işte örnek:

```
>>> from sympy import symbols, diff
>>> x, y, z = symbols('x y z', real=True)
>>> f = 4*x*y + x*sin(z) + x**3 + z**8*y
>>> diff(f, x)
4*y + sin(z) + 3*x**2
```

Aynı şekilde kısmi türevi ekrana da yazdırabiliyorsunuz formül olarak.
