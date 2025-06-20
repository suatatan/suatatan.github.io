---
layout: post
title: "ASP.MVC Entity Framework silme işlemi"
date: 2016-05-11
categories: 
  - "genel"
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
