---
categories:
- bilgisayar
- english
date: 2017-04-04
layout: post
tags:
- english
- longread
- python
- selenium
- technology
- test
- webscraping
title: Selenium with Python
---

[Selenium](http://www.seleniumhq.org/) is the popular testing package. It has library for Java, C#, nd Python. It is not only for testing  but also very good choice for web scraping task. I have used it during my PhD Thesis for scraping news from Google News.

In fact usage of it with Python slightly easier and readable. For Python 2.7 just install selenium with 'pip install selenium'. If you work on windows you should use path of pip like below before install command.

"c:\\python27\\scripts\\pip.exe"

Besides, you should download chromedriver.exe from [here](https://sites.google.com/a/chromium.org/chromedriver/downloads)

Then you can use Selenium. Here is a code which download relevant image from Google Images with Selenium:

```
from selenium import webdriver
import urllib
from selenium.webdriver.common.keys import Keys
driver = webdriver.Chrome('C:/Python27/Scripts/chromedriver.exe')
word="apple"
url="http://images.google.com/search?q="+word+"&tbm=isch&sout=1"
driver.get(url)
imageXpathSelector='//*[@id="ires"]/table/tbody/tr[1]/td[1]/a/img'
img=driver.find_element_by_xpath(imageXpathSelector)
src=(img.get_attribute('src'))
urllib.urlretrieve(src, word+".jpg")
driver.close()

```
