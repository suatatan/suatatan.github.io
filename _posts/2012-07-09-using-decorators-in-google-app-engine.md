---
title: "Using Decorators in Google App Engine"
date: 2012-07-09
categories: 
  - "genel"
tags: 
  - "google-app-engine"
---

If you can use **python decorator** in your app engine project, there is tiny and smart example below which you can use it:  
The print will be user email  
  

def **uzman**(func):  
    def check\_auth(\*args, \*\*kwargs):  
        user=users.get\_current\_user()  
        print user  
        return func(\*args, \*\*kwargs)  
    return check\_auth

  
class TestModule(webapp.RequestHandler):  
    **@uzman**  
    def get(self):   
          pass
