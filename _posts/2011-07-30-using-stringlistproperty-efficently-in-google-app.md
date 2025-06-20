---
title: "Using StringListProperty efficently in Google App Engine"
date: 2011-07-30
categories: 
  - "bilgisayar"
  - "english"
  - "genel"
tags: 
  - "google-app-engine"
  - "python"
  - "web-programlama"
---

StringListProperty is a datastore value type that stores list items. Using StringListProperty is very easy:  

```
#!/usr/bin/env pythonfrom google.appengine.ext import webappfrom google.appengine.ext.webapp import utilfrom google.appengine.ext import dbclass Page(db.Model):    title=db.StringProperty(multiline=False)    keywords=db.StringListProperty()class MainHandler(webapp.RequestHandler):    def get(self):        newpage=Page()	newpage.title="Suat ATAN's books"        newpage.keywords=["book","author"]        newpage.put()	newpage=Page()	newpage.title="Suat ATAN's life"        newpage.keywords=["canada","author"]        newpage.put()	newpage=Page()	newpage.title="Suat ATAN's gusto"        newpage.keywords=["coffe","pizza"]        newpage.put()	pages=Page().all().filter("keywords" = "author")	for page in pages:	    print i.title+"--"+i.keywordsdef main():    application = webapp.WSGIApplication([('/', MainHandler)],                                         debug=True)    util.run_wsgi_app(application)if __name__ == '__main__':    main()
```

  
We describe the StringListProperty in Page class and use it directly as newpage.keyword=\[“item1”,“item2”\]  
When we want fetching rows that **contains** “author” string two rows will shown. Becuase only “Suat ATAN’s book” and “Suat ATAN’s life” pages have this string in its StringListPropery
