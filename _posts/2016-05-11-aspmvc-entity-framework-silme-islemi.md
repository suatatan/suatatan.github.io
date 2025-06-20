---
categories:
- genel
date: 2016-05-11
layout: post
tags:
- english
- longread
title: ASP.MVC Entity Framework silme işlemi
---

`public ActionResult TutanakSil(int id)`

```
    {
        var sonuc = "Tutanak Silme Hatası 1";
        try
        {
            Tutanak tut = db.Tutanak.SingleOrDefault(m => m.ID == id);
            db.Tutanak.Remove(tut);
            //Hep unuturum şu savechanges'i
            db.SaveChanges();
            sonuc = "Tutanak Silindi";
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex);
            sonuc = "Tutanak silinemdi";
        }

        return Content(sonuc);
    }
```

İyi silmeler :)
