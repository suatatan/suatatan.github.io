---
title: "Linux'ta Tamamen Sildiğiniz Dosyayı Geri Getirme"
date: 2019-09-14
categories: 
  - "bilgisayar"
---

Adli bilişimcilik sadece uzmanlarına yarar sağlamaz. Bu bilim özellikle kötü günlerinizde de işe yarayabilir. Diyelim ki tezinizi yanlışlıkla sildiniz. Çöp kutusunda da yok. Bu durumda debian tabanlı linux sürümlerinde (Ubuntu, ElementaryOS gibi) aşağıdaki komutu kullanarak silinmiş dosyayı komut satırında geri getirebilirsiniz. Tabii bu text dosyaları için işe yarıyor. Eğer diğer dosyalar için de tam bir araştırma yapmak isterseniz "photoscan" adlı komutu kullanın.

Gelelim bizim diğer komuta:

```
grep -a -C 200 -F 'sildiğiniz dosyada geçen özel bir kelime' /dev/sda1
```

Bu komutu şöyle kullancaksınız. Sildiğiniz dosyada hatırladığınız bir kelime varsa bunu yukarda ilgili alana yazın. En sonda ise 'sda1' yazan yere disk adını yazın.

Komut eğer bulabilirse tamamen silinmiş dosya veya dosyaları geri getirip içeriğini komut satırında gösteriyor.
