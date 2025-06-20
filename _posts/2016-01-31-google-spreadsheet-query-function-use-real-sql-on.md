---
categories:
- genel
date: 2016-01-31
layout: post
tags:
- english
- excel
- google-apps
- google-docs
- longread
- sql
title: 'Google Spreadsheet Query Function: Use real SQL on your spreadsheets'
---

Just like this:

\=query(Yevmiye!$A$2:$I$1004;“select sum(H) WHERE D=’”&A11&“’ label sum(H) ”“)  

D is a column head. Ignore label statement. Sum(H) is the column which will be subject of query.

The formula gives sometimes #N/A due to result of SQL query is null. To be able to overcome it just wrap your function with iferror(param1,param2) function. if the first param1 gives error, function will threat param2 (in this case 0)

\=iferror(query(Yevmiye!$A$2:$I$1004;"select sum(H) WHERE D=’”&A11&“’ label sum(H) ”“) ,0)  

Enjoy
