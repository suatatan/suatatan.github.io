---
title: "ASP.MVC Entity Framework’ta kayıt işlemi"
date: 2016-05-10
categories: 
  - "genel"
tags: 
  - "asp-mvc"
  - "humanfriendlyaspmvc"
---

ASP.MVC'de Entity Framework'ta bir veri aşağıdaki gibi tabloya işlenir.

`   Tutanak tut = new Tutanak();  tut.RelevantTalepID = 3  tut.FileName = "Dosya Adı 1";  db.Tutanak.Add(tut);  db.SaveChanges();   `

Burada db'nin sonu Context ifadesi ile biten nesne olduğunu Tutanak ifadesinin ise veritabanında tanımlı ve uygulamanızla eşleşmiş obje olduğunu unutmayın.
