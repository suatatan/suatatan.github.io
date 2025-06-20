---
layout: post
title: "Python ile Twitter'dan topluca Veri Çekme (API'siz)"
date: 2020-12-12
categories: 
  - "bilgisayar"
tags: 
  - "veri-madenciligi"
---

Twitter API'si olmadan aşağıdaki kodlar yardımı ile örneğin içeriğinde "umutsuz" ifadesi geçen ve 11 Mart 2020 ile 1 Nisan 2020 arasındaki twitleri çekip excele kaydedebilirsiniz:

```python
import snscrape.modules.twitter as sntwitter
import pandas as pd

# Creating list to append tweet data to
tweets_list2 = []

# Using TwitterSearchScraper to scrape data and append tweets to list
for i,tweet in enumerate(sntwitter.TwitterSearchScraper('umutsuz since:2020-03-1 until:2020-04-11').get_items()):
    print(i)
    if i>5000:
        break
    tweets_list2.append([tweet.date, tweet.id, tweet.content])

# Creating a dataframe from the tweets list above
tweets_df2 = pd.DataFrame(tweets_list2, columns=['Datetime', 'Tweet Id', 'Text' ])
tweets_list2.to_excel("sonuc_umutsuz.xls")
```

Daha ayrıntılı kod burada:

https://gist.github.com/suatatan/d914633b6f666621a73068956dc85d63

Bu arada çalışmıyor diyen arkadaşlara not: Lütfen hata mesajınızı da yazın.
