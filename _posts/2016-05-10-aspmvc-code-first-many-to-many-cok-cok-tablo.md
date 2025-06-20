---
title: "ASP.MVC Code First Many-to-Many (Çok-Çok) Tablo ilişkisi Kurma"
date: 2016-05-10
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "asp-mvc"
---

İki tablomuz var: Projects ve Employee (çalışan). Bir çalışan birden fazla projede yer alabilir, bir projede birden fazla çalışan yer alabilir. Dolayısıyla tablolar araası ilişki many-to-many (çok-çok) ilişkisi.

1-Bunu Code First mimarisi içinde şöyle tanımlarız:

`public class Employee {`

```
    public int EmployeeID { get; set; }
    public string Name { get; set; }
    //Navigational Property
    public virtual ICollection Projects { get; set; }
}
```

`public class Project {`

```
    public int ProjectID { get; set; }
    public string Name { get; set; }
    //Navigational Property
    public virtual ICollection Employees { get; set; }

}
```

2-Daha sonra scaffolding yaparı. Bu durumda veritabanında otomatik olarak bu iki tablo ve bir de many-to-many ilişkisini birbirine bağlamak için kesiştirme tablosu (junction table) oluşur.

3-Normalde one-to-many ilişkisinde scaffolding yapılınca view tarafında size iş kalmaz neredeyse. Ancak bu örnekte henüz view tarafında formda örneğin projenin ilgili olduğu çalışanları seçme işlemini yapacak multiselect dropdownu hazırlamak bize kalıyor. Nitekim en azından şimdilik bunu otomatik olarak yapabilecek bir sistem bulunmuyor. (Şu makale söyledi: [https://blogs.msdn.microsoft.com/mcsuksoldev/2013/09/20/managing-entity-relationships-with-mvc-scaffolding/](https://blogs.msdn.microsoft.com/mcsuksoldev/2013/09/20/managing-entity-relationships-with-mvc-scaffolding/))
