---
title: "Convert String to Google App Engine Date"
date: 2012-07-16
categories: 
  - "english"
  - "genel"
tags: 
  - "google-app-script"
---

When you print from Google App Engine datastore which have DateTimeProperty you see such as this:  
  
Date: '2008-10-10 16:40:25.126049’  
  
You can convert this string directly to Datastore Datetime property with function below:  
  
  
    def **convert\_gae\_datetime**(self,gae\_string\_date):  
        datestr=gae\_string\_date.split(“.”)\[0\]  
        return datetime.strptime(datestr, “%Y-%m-%d %H:%M:%S”)
