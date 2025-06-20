---
title: "WordCluster Python paketi ne işe yarar"
date: 2022-05-17
---

Metin madenciliği ile uğraşırken insanın önüne ilginç problemler çıkıyor.

Aslında sorum şöyle başlamıştı:

```
list = ['computer','computers 12','old computer','laptop','lap top','laptops']
```

Bu listedeki bilgisayar ve laptop farklı yazımlarını nasıl gruplarım.

Oturdum, üşenmedim bir clustering modeli yazdım. Paket şurada:

[https://pypi.org/project/wordcluster/](https://pypi.org/project/wordcluster/)

Bu paket yardımıyla yukarıdaki listeden şu şekilde sonuç alınır:

```
[{'word': 'computer', 'cluster': 'oldcomputer'},
 {'word': 'computeri', 'cluster': 'oldcomputer'},
 {'word': 'oldcomputer', 'cluster': 'oldcomputer'},
 {'word': 'laptop', 'cluster': 'laptop'},
 {'word': 'lap top', 'cluster': 'laptop'},
 {'word': 'laptops', 'cluster': 'laptop'}]
```

[![](/images/image.png)](https://suatatan.wordpress.com/wp-content/uploads/2022/05/image.png)

Paket oluşturmak için yazdığım şu kılavuzu inceleyebilirsiniz: [https://suatatan.wordpress.com/2022/05/18/hizli-pip-paketi-olusturma/](https://suatatan.wordpress.com/2022/05/18/hizli-pip-paketi-olusturma/)

GitHub'da da yıldızlamayı unutmayın:

[https://github.com/suatatan/word-cluster-package/settings](https://github.com/suatatan/word-cluster-package/settings)
