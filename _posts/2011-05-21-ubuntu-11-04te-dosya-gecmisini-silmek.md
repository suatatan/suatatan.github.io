---
title: "Ubuntu 11.04'te dosya geçmişini silmek"
date: 2011-05-21
categories: 
  - "bilgisayar"
tags: 
  - "linux"
  - "ubuntu"
---

[![](/images/cronologia-file-e-cartelle-unity.png "cronologia-file-e-cartelle-unity")](http://suatatan.wordpress.com/wp-content/uploads/2011/05/cronologia-file-e-cartelle-unity.png) Ubuntu'nun Gnome yerine Unity adlı masaüstü arayüzünü kullanan son sürümünde tüm dosya geçmişi görüntülenebilmekte ancak silinememektedir. Bunun için konsolu açarak aşağıdaki kodu çalıştırıp geçmişi silebilirsiniz.

```
rm ~/.local/share/zeitgeist/activity.sqlite
zeitgeist-daemon --replace
```

Bu yazı http://www.chimerarevo.com/ adlı italyanca siteden çevrilerek yazılmıştır.
