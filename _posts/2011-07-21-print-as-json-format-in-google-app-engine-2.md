---
categories:
- bilgisayar
- english
- genel
date: 2011-07-21
layout: post
tags:
- english
- google-app-engine
- longread
- python
- technology
- web-programlama
title: Print as json format in Google App Engine
---

When you want print a content you using “self.response.out.write()”. But this function can’t print json format. But you can print a some changes in this function:  
  
Firslty import simplejson library:  

```
from django.utils import simplejson
```

  
And print json:  

```
my_response = {'status':'ok' ,'message':'Suat ATAN Blog suatatan.wordpresscom'}self.response.headers['Content-Type'] = 'text/plain'self.response.out.write(simplejson.dumps(my_response))
```

  
**You can process this reponse with Jquery:**  

```
$(document).ready(function(){	$('input[type=submit]').attr("onclick","return false");	var action_url = $("#ajaxform").attr("action");    $('input[type=submit]').click(function(){    	var formdata = $('form').serialize();        $.post(action_url, formdata,            function(response){				$("#formalert").html(response.message);            }, 'json');    })});
```

  
Enjoy !
