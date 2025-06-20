---
categories:
- bilgisayar
- english
date: 2011-07-30
layout: post
tags:
- english
- google-app-engine
- longread
- opinion
- python
- technology
- web-programlama
title: Using StringListProperty efficently in Google App Engine
---

StringListProperty is a datastore value type that stores list items. Using StringListProperty is very easy:

```
#!/usr/bin/env python
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext import db

class Page(db.Model):
    title=db.StringProperty(multiline=False)
    keywords=db.StringListProperty()

class MainHandler(webapp.RequestHandler):
    def get(self):
        newpage=Page()
	newpage.title="Suat ATAN's books"
        newpage.keywords=["book","author"]
        newpage.put()

	newpage=Page()
	newpage.title="Suat ATAN's life"
        newpage.keywords=["canada","author"]
        newpage.put()

	newpage=Page()
	newpage.title="Suat ATAN's gusto"
        newpage.keywords=["coffe","pizza"]
        newpage.put()

	pages=Page().all().filter("keywords" = "author")
	for page in pages:
	    print i.title+"--"+i.keywords

def main():
    application = webapp.WSGIApplication([('/', MainHandler)],
                                         debug=True)
    util.run_wsgi_app(application)

if __name__ == '__main__':
    main()
```

We describe the StringListProperty in Page class and use it directly as newpage.keyword=\["item1","item2"\] When we want fetching rows that **contains** "author" string two rows will shown. Becuase only "Suat ATAN's book" and "Suat ATAN's life" pages have this string in its StringListPropery
