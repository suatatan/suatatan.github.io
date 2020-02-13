---
layout: post
title:  My AI Classifies News Headlines
date:   2020-01-26 00:00:00 +0300
image:  ai.webp
tags:   NewsAnalytics
---

# A Machine Learning Algorithm for classifying whether any Turkish Headline 'Local' or 'Non-local'.

## Purpose

Online News outlets already have a "search-box". When you write some keyword to here you get results. However, the problem starts in detail.  Intentionally or just a result of the poor algorithm the results include a  lot of irrelevant results.  I experienced it while I scraped the local news from Turkish news sites. To overcome this problem I decided to build my artificial intelligence tool to detect local news and non-local news listed in the search results of the local news keyword. 

I  build a machine learning algorithm for classifying Turkish News in terms of 'local news' or 'non-local news'. The main motivation behind this algorithm is the fuzzy nature of search pages of news outlets. Most of the web pages inject non-local headlines into local news. This algorithm will detect the real nature of the headline.

For this purpose, I scraped the local and non-local news based on special queries. Then I trained multiple algorithms to find the best fit. Linear SVC model winner. <a href='/2020/01/26/yerel_mi_degilmi_siniflandirici/' target='_blank'>Here is my algorithm</a>. With Python language.


The accuracy of the prediction power of the algorithm according to the cross-validation of overall data is more than %95.

Here a simple test:

```python
x = """
Cumhurbaşkanlığı Kararnamesinde yer alan hususlar
"""
y = clf_linear_svc.predict(count_vect.transform([x]))[0]
print(category_id_df[category_id_df['category_id'] == y]['yerelmi'])
```

    Result: 5032    yerel_degil
    Name: yerelmi, dtype: object

```python
x = """
Van'ın Gürpınar ilçesinde Norduz Koyunları ile ilgili
"""
y = clf_linear_svc.predict(count_vect.transform([x]))[0]
print(category_id_df[category_id_df['category_id'] == y]['yerelmi'])
```

    Result: 6286    yerel
    Name: yerelmi, dtype: object



