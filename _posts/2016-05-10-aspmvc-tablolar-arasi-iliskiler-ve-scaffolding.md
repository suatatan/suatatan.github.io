---
categories:
- bilgisayar
- genel
date: 2016-05-10
layout: post
tags:
- asp-mvc
- english
- humanfriendlyaspmvc
- longread
- technology
title: ASP.MVC Tablolar Arası İlişkiler ve Scaffolding
---

Bir blogumuz olsun bu blogda BlogPost'lar blogumuzdaki kayıtlar olsun. Her kayda ait sadece bir kategori olabilir. Bu durumda bir kategoride her zaman birden fazla içerik olabilir. Bu durumda istediğimiz formda blogun başlığı yanında kategori seçmemiz için bir dropdown gerekecektir. Bunu ASP.MVC ile en hızlı şekilde nasıl yapabiliriz?

En kısa yol şudur:

**1-Model Classını yaz:**

public class BlogPost { \[Key\]

```
    public int ID { get; set; }
    public string title { get; set; }
    public string entry { get; set; }
    public int CategoryID { get; set; }
    public virtual Category Category { get; set; }
```

}

`public class Category`

```
    [Key]
    public int CategoryID { get; set; }
    public string CategoryName { get; set; }
   //virtual'a dikkat
    public virtual IEnumerable BlogPosts { get; set; }

}
```

**2-Projeyi sağ tıkla Add->New Scaffolded Item de. Sonda ise 2. seçeneği (Entity Framework ifadesini içeren) seç. Scaffoldingi bekle**

Dropdownu da içeren viewler hazır olacaktır.

Bu arada ViewBag üzerinden dropdown elemanı doldurulmaz diyen üstatlara selam olsun. Visual Studio bile bu iş için ViewBag kullanıyor:

_View Tarafı:_

`@Html.DropDownList("CategoryID", null, htmlAttributes: new { @class = "form-control" })`

_Controller tarafı:_

ViewBag.CategoryID = new SelectList(db.Categories, “CategoryID”, “CategoryName”, blogPost.CategoryID);

Bunun dışında da bazı yöntemler mevcut. Bunlardan biri ile ilgili olarak StackOverFlow'da soru sormuş ve güzel bir cevap almıştım. Okumak için [burayı](http://stackoverflow.com/questions/37073491/sending-form-data-in-asp-mvc/37073673#37073673) tıklayın

Yaptığımız şey one-to-many tablo ilişkisidir.
