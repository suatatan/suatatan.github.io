---
title: "Malthus Popülasyon Yasası Bir Örnek ve R Dili ile Modelleme (Adi Diferansiyel Denklemle)"
date: 2019-02-08
categories: 
  - "r-dili"
---

Sistem dinamiklerinde ‘stocks’ olarak anılan her bir düğüm artış ve azalışa hazir olan bir olgudan başka bir şey değildir. Örneğin stock nüfus olduğunda nüfus için ‘inflow’ doğumlar, ‘outflow’ ölümlerdir. Amaç diyelim ki bugün nüfusunu bildiğimiz bir yerde 10 sene sonraki nüfusu hesaplamaktır. Bu hesaplama yapılırken elbette elimizde nüfusun nasıl artacağına dair bir fonksiyon olmalıdır. Bu fonksiyon literatürden veya uzmanlıktan gelen bir fonksiyon olabilir.

![](/images/image.png)

Girdilerimiz 1970 yılındaki nüfus: 3.7 milyar, artış oranımız: 0.01801. Başka bir şey yok. _aux_ parametremize artış oranını, 1970 yılındaki nüfüsu _sCustomers_ değişkenimize atadık. START<-1970; FINISH<-2008; STEP<-0.25 zaten kendi kendini açıklıyor. Daha sonra her yıl çeyreklik bazda (step) nüfus artışını ve grafikleri ortaya çıkarıyoruz.

Sistem dinamikleri elbette bundan ibaret değil. Malthus modeli gibi modellerin çıktılarını başka bir modele örneğin artan nüfusa göre gıda ihtiyacı fonksiyonuna bağlayarak fonkisyonlardan oluşan bir network yaratarak simülasyonlar yapıyoruz.

Malthus fonksiyonunun matematiksel gösterimi ve çözümü için şuraya bakabilirsin: [https://math.stackexchange.com/questions/345242/differential-equation-word-problem-malthuss-law](https://math.stackexchange.com/questions/345242/differential-equation-word-problem-malthuss-law)

# Modeli Tasarlama

```
library(deSolve)
library(ggplot2)
require(gridExtra)
```

```
library(scales)

# Setup simulation times and time step
START<-1970; FINISH<-2008; STEP<-0.25

# Create time vector
simtime <- seq(START, FINISH, by=STEP)
```

Kademeli olarak çeyreklik bazda (0.25) yılları arttırdık

```
simtime
```

```
##   [1] 1970.00 1970.25 1970.50 1970.75 1971.00 1971.25 1971.50 1971.75
##   [9] 1972.00 1972.25 1972.50 1972.75 1973.00 1973.25 1973.50 1973.75
##  [17] 1974.00 1974.25 1974.50 1974.75 1975.00 1975.25 1975.50 1975.75
##  [25] 1976.00 1976.25 1976.50 1976.75 1977.00 1977.25 1977.50 1977.75
##  [33] 1978.00 1978.25 1978.50 1978.75 1979.00 1979.25 1979.50 1979.75
##  [41] 1980.00 1980.25 1980.50 1980.75 1981.00 1981.25 1981.50 1981.75
##  [49] 1982.00 1982.25 1982.50 1982.75 1983.00 1983.25 1983.50 1983.75
##  [57] 1984.00 1984.25 1984.50 1984.75 1985.00 1985.25 1985.50 1985.75
##  [65] 1986.00 1986.25 1986.50 1986.75 1987.00 1987.25 1987.50 1987.75
##  [73] 1988.00 1988.25 1988.50 1988.75 1989.00 1989.25 1989.50 1989.75
##  [81] 1990.00 1990.25 1990.50 1990.75 1991.00 1991.25 1991.50 1991.75
##  [89] 1992.00 1992.25 1992.50 1992.75 1993.00 1993.25 1993.50 1993.75
##  [97] 1994.00 1994.25 1994.50 1994.75 1995.00 1995.25 1995.50 1995.75
## [105] 1996.00 1996.25 1996.50 1996.75 1997.00 1997.25 1997.50 1997.75
## [113] 1998.00 1998.25 1998.50 1998.75 1999.00 1999.25 1999.50 1999.75
## [121] 2000.00 2000.25 2000.50 2000.75 2001.00 2001.25 2001.50 2001.75
## [129] 2002.00 2002.25 2002.50 2002.75 2003.00 2003.25 2003.50 2003.75
## [137] 2004.00 2004.25 2004.50 2004.75 2005.00 2005.25 2005.50 2005.75
## [145] 2006.00 2006.25 2006.50 2006.75 2007.00 2007.25 2007.50 2007.75
## [153] 2008.00
```

```
#Stock ve Aux değerlerini atadık. Müşteri sayısı 10.000
# Create stock and auxs
stocks  <- c(sCustomers=3712000000)
auxs    <- c(aGrowthFraction=0.018021)
```

Model basit bir fonksiyondur.

```
# Model function
model <- function(time, stocks, auxs){
  with(as.list(c(stocks, auxs)),{ 
    #Denklem: fRecruits işe değerimiz müşteri sayısı ile artış katsayısı
    #çarpımı kadardır
    fRecruits<-sCustomers*aGrowthFraction
    # Inflow
    dC_dt <- fRecruits
    return (list(c(dC_dt),
                 Recruits=fRecruits,
            GF=aGrowthFraction))   
  })
}
```

```
# Modeli ve değerleri Düzenli Difereansiyel Denkleme Sokalım
# Run simulation
o<-data.frame(ode(y=stocks, times=simtime, func = model, 
                  parms=auxs, method="euler"))
```

# Model Sonuçları

Her yıl olacak işe alım ve kayıplar hesaplandı:

| time<dbl> | sCustomers<dbl> | Recruits<dbl> | GF<dbl> |
| --- | --- | --- | --- |
| 1970.00 | 3712000000 | 66893952 | 0.018021 |
| 1970.25 | 3728723488 | 67195326 | 0.018021 |
| 1970.50 | 3745522319 | 67498058 | 0.018021 |
| 1970.75 | 3762396834 | 67802153 | 0.018021 |
| 1971.00 | 3779347372 | 68107619 | 0.018021 |
| 1971.25 | 3796374277 | 68414461 | 0.018021 |
| 1971.50 | 3813477892 | 68722685 | 0.018021 |
| 1971.75 | 3830658563 | 69032298 | 0.018021 |
| 1972.00 | 3847916638 | 69343306 | 0.018021 |
| 1972.25 | 3865252464 | 69655715 | 0.018021 |

Next123456...16Previous1-10 of 153 rows

# Modeli Görselleştirme

```
p1<-ggplot()+
  geom_line(data=o,aes(time,o$sCustomers,color="Customers"))+
  scale_y_continuous(labels = comma)+
  ylab("Stock")+
  xlab("Year") +
  labs(color="")+
  theme(legend.position="none")
p1
```

![](/images/image-1.png)

Görsel 1: Yıllara göre nüfusun artışı
