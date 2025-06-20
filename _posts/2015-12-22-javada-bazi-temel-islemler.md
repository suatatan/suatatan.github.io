---
categories:
- bilgisayar
- genel
date: 2015-12-22
layout: post
tags:
- turkish
- java
- longread
title: Java’da bazı temel işlemler
---

Java’da sıkça yazmadığım için sıkça unuttuğum ve unutulan bazı temel işlevlerle ilgili el altı linkleri ve snippetleri

Satır satır metin okumak:

```
try(BufferedReader br = new BufferedReader(new FileReader(file))) {
    for(String line; (line = br.readLine()) != null; ) {
        // process the line.
    }
    // line is not visible here.
}
```

Satır satır metin yazmak: [Linki](http://www.programcreek.com/2011/03/java-write-to-a-file-code-example/)

Metin parçalara ayırmak Regex ile: [Linki](http://stackoverflow.com/questions/3976616/how-to-find-nth-occurrence-of-character-in-a-string)

Metni basit parçalara ayırmak: [Linki](http://stackoverflow.com/questions/3481828/how-to-split-a-string-in-java)

String parametrik formatlama: [Linki](http://javarevisited.blogspot.com.tr/2012/08/how-to-format-string-in-java-printf.html)

CSV okuma/yazma: [Linki](http://viralpatel.net/blogs/java-read-write-csv-file/)
