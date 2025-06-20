---
categories:
- bilgisayar
- genel
date: 2011-07-17
layout: post
tags:
- english
- longread
- technology
- web-programlama
title: Retrieve videos from a spesific Youtube user with Python
---

  
2. Download Gdata Python client libraries from: [http://code.google.com/p/gdata-python-client/downloads/list](http://code.google.com/p/gdata-python-client/downloads/list)
  
4. Go to “src” directory and copy them to your Python workspace. It’s possible be Google App engine workspace.
  
6. import needed library to your source code. e.g:
  

  

  

```
import gdata.youtubeimport gdata.youtube.service
```

  

  

Try these codes:

  

  

```
class TestPage(webapp.RequestHandler):    def get(self):        sonuc=self.GetAndPrintUserUploads("suatatanvan")        html_degerleri={'TESTDATA': sonuc }        path = os.path.join(os.path.dirname(__file__), 'pages/test.htm')        self.response.out.write(template.render(path, html_degerleri))    def GetAndPrintUserUploads(self,username):      yt_service = gdata.youtube.service.YouTubeService()      uri = 'http://gdata.youtube.com/feeds/api/users/%s/uploads' % username      feed= (yt_service.GetYouTubeVideoFeed(uri))      sonuc=""      for entry in feed.entry:          sonuc ="Title: %s Content: %s  ID: %s "%(entry.title.text,entry.media.thumbnail[1].url,entry.content.text,entry.id)+sonuc      return sonuc
```

  

  

You can call  

```
GetYouTubeVideoFeed(uri)
```

  
function over the  

```
yt_service = gdata.youtube.service.YouTubeService()
```

  

  

 Youtube service object.

  

 It’s uri parameter in GetYoutubeVideoFeed function is likely as this:

  

 [http://gdata.youtube.com/feeds/api/users/suatatanvan/uploads](http://gdata.youtube.com/feeds/api/users/suatatanvan/uploads)

  

This url returns raw xml page that contain the user spesific uploads. And we can retrieve needed datum from it.

  

With for lookup:

  

  

```
for entry in feed.entry:          sonuc= entry.title.text+""+sonuc      return sonuc
```

  

  

Notice that feed.entry a XML node in response page that have xml nodes for each video entity.
