---
categories:
- english
- genel
date: 2016-06-20
layout: post
tags:
- aspmvc
- bilgisyar
- computer
- english
- jquery
- longread
title: Fixing Error of Metronic Theme PagedList component
---

Metronic Theme have PagedList component which provide users prepare paged list quickly. However, it have a issue: When user clicks the number of active page link number page thwors error. Because link of active page misdefined. To fix this I’ve prepared a jquery patch.

`$(document).ready(function () {`

```
    //fixing pagedlist bug-patch s.atan

    $(".pagination > .active > a").mouseover(function () {

        var href = $(this).attr("href");

        console.log(href);

        $(this).attr('href', 'javascript:');

        $(this).attr('style', 'color:green; font-weight:bold');

    });

});
```
