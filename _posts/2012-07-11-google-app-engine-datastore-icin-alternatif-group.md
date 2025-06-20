---
categories:
- genel
date: 2012-07-11
layout: post
tags:
- turkish
- quickread
- technology
title: Google App Engine Datastore için alternatif Group By Fonksiyonu
---

Google App Engine datastore SQL'deki Group By fonksiyonunu kabul etmiyor. Bunun yerine geliştirdiğim şey aşağıda:  
Data şöyşe olsun:  
Ürün kodu: Fiyat  
  
302-4-0:150000  
101-1-1:850000  
302-3-0:16000  
302-3-0:20000  
  
 Aynı ürün kodlarının fiyatını toplayıp listeleyerek şunu istiyoruz   
302-4-0:150000  
101-1-1:850000  
302-3-0:36000  
  
  
Bunun için şu kodları kullanın. tedbir objesi python dictionary dir.  
  
  
  
  
class TestModule(webapp.RequestHandler):  
    def get(self):   
        auditrecords=AuditRecord().all()  
         tedbir={}  
        for i in auditrecords:  
            tdbr=i.measure  
            val=int(i.textanswer)  
            if tdbr in tedbir:  
                tedbir\[tdbr\]=tedbir\[tdbr\]+val  
            else:  
                tedbir\[tdbr\]=val  
         
        data=“”  
        for i in tedbir:  
            data=data+i+“-”+str(tedbir\[i\])+“  
”
