---
title: "R’da tüm korelasyonları toplu göstermek"
date: 2016-11-26
categories: 
  - "genel"
tags: 
  - "r"
  - "veribilim"
---

Verisetiniz içerisinde kaç parametre varsa bunların birbirleri ile ilişkisi için teker teker korelasyonlara bakmanıza gerek yok. R'da bu işlemi topluca yaparak zaman kazanabilirsiniz.

Veri Amerika'nın Wyoming eyaletindeki suç verileri (2013)

```
  library(xlsx)
  a=xlsx::read.xlsx("wyoming.xls",sheetName = "13tbl8wy"
                    ,as.data.frame = T
                    ,stringAsFactors=F)
  #NA konları sil
  a=a[colSums(!is.na(a)) > 0]
  #correlation pairs
  panel.cor <- function(x, y, digits = 2, prefix = "", cex.cor, ...)
  {
    usr <- par("usr"); on.exit(par(usr))
    par(usr = c(0, 1, 0, 1))
    r <- abs(cor(x, y))
    txt <- format(c(r, 0.123456789), digits = digits)[1]
    txt <- paste0(prefix, txt)
    if(missing(cex.cor)) cex.cor <- 0.8/strwidth(txt)
    text(0.5, 0.5, txt, cex = cex.cor * r)
  }
  pairs(a[1:5], lower.panel = panel.smooth, upper.panel = panel.cor)

```

#corelation pairs fonksiyonundan sonraki kısımla aşağıdaki gibi koralasyon tablosu elde edebiliyorsunuz.

![](/images/tumblr_inline_oh8rhbjuFp1r4exmc_540.png)

Gördüğünüz üzere hem korelasyonlar hem grafikler kolayca eşleştirilebiliyor. Bu grafikten ne anlıyoruz. Wyoming için 2013 yılında şehir bazında nüfus ile işlenen şiddet içeren suçlar arasında ciddi ilişki var. O zaman küçük yerler daha güvenli olabilir. Ama kumarbaz yanılgısına düşmeyin. Küçük ihtimaller gelip sizi bulabilir.
