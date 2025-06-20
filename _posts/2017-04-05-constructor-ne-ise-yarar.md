---
title: "Constructor ne işe yarar?"
date: 2017-04-05
categories: 
  - "bilgisayar"
tags: 
  - "c"
  - "oop"
---

Modern tüm programlama dillerinde constructor yapısı mevcuttur. Onu daha önce kullanma ihtiyacı duymamış olabilirsiniz.  Ancak bu yapıyı öğrenmek işinize çok yarayacaktır.  Constructor yapısını anlayabilmek için class (sınıf)  yapısını anlamak gerekir.

Constructor'un ne işe yaradığını ifade etmek için soyut ifadeler yerine basit bir problemden yola çıkalım. Soyut açıklamaları sonra yaparız.

İş yerinizde çalışanlara tekabül eden Employee adlı bir sınıfınız olsun. Bu sınıfa maaş adlı bir property (özellik) eklemek istiyorsunuz. Bunu tanımlamak için constructor kullanabilirsiniz. Örnek şöyle: (C#)

```
public class Employee
{
public int salary;
//Constructor buradan başlar
public Employee(int annualSalary)
{
salary = annualSalary;
}
//Constructor burada biter.

}

```

Ne oldu peki? Henüz hiç bir şey. Ancak eğer bu Employee nesnemizi çağırırsak şöyle çağırma şansımız oluşuyor:

```
Employee e1 = new Employee(30000);

```

Bu durumda maaş bilsini sınıfa tanımlamış oluyoruz. Evet hepsi bu!. Sorunu köpürtelim: Girdiğimiz maaş bilgisi yıllık idi. Peki maaş bilgisi haftalık olursa ne olacak? Birden fazla constructor tanımlayabilir miyiz? Evet. O da şöyle:

```
 public class Employee
        {
            public int salary;

            public Employee(int annualSalary)
            {
                salary = annualSalary;
            }

            public Employee(int weeklySalary, int numberOfWeeks)
            {
//Haftalık maaş değeri ile hafta sayısı (bir yıldaki) çarplıyor.
                salary = weeklySalary * numberOfWeeks;
            }
        }

```

Sınıfımızı böyle tanımladıktan sonra ise aşağıdaki her iki türde de sınıfı çağırabiliriz.

```
Employee e1 = new Employee(30000);
Employee e2 = new Employee(500, 52);

```

Bu sınıfımız girdi olarak haftalık veya yıllık nasıl girersek girelim bize yıllık maaş olarak sonucu verecek. Constructor'lar bu dinamizmi sağlıyor.

Peki teknik tanım nedir?:

> When a [class](https://msdn.microsoft.com/en-us/library/0b0thckt.aspx) or [struct](https://msdn.microsoft.com/en-us/library/ah19swz4.aspx) is created, its constructor is called. Constructors have the same name as the class or struct, and they usually initialize the data members of the new object.
> 
> _Bir sınıf tanımlandığında constructor çağrılır. Constructorlar sınıf ile aynı isime sahiptirler. Genellikle yeni tanımlanan bir nesneye veri elemanlarını aktarmak için kullanılırlar._

Yararlanılan kaynak: [Microsoft](https://msdn.microsoft.com/en-us/library/ms173115.aspx)
