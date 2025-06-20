---
title: "Converting Google App Engine Datastore Model Class to XML"
date: 2012-07-17
categories: 
  - "genel"
tags: 
  - "google-app-engine"
---

Model class actually have to\_xml() function but this xml schema not customizable and entity based. You can export your model as xml with bit of code:  
This functionality is good for data exporting operations:  

{% raw %}
```python
class TestModule(webapp.RequestHandler):
    def get(self):
        props = AuditLog().properties()
        data = "\n"
        for prop in props:
            data = data + "  <{0}>{{{{i.{0}}}}}</{0}>\n".format(prop)
        data = data + ""
        self.response.out.write(data)
```
{% endraw %}
