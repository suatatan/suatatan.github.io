---
title: "ASP.MVC Yüklenmiş Bir Dosyayı Silmek"
date: 2016-05-11
categories: 
  - "genel"
tags: 
  - "aspmvc"
  - "humanfriendlyaspmvc"
---

public ActionResult TutanakSil(int id)

```
    {
        var sonuc = "Tutanak Silme Hatası 1";
        try
        {

            Tutanak tut = db.Tutanak.SingleOrDefault(m => m.ID == id);

            //remove from file system- mappath'a dikkat 
            var fullPath = Request.MapPath("~/Dosyalar/"+tut.FileName);
            if (System.IO.File.Exists(fullPath)) { 
                System.IO.File.Delete(fullPath);
                Debug.WriteLine(fullPath + "-Tutanak dosya sisteminden silindi");
            }
            else { 
                Debug.WriteLine(fullPath + "-Tutanak dosyası dosya sisteminden silinemedi");
            }
            //veritabanından silme
            db.Tutanak.Remove(tut);
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
