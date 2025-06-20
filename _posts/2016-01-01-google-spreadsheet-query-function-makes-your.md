---
title: "Google Spreadsheet Query Function Makes your Spreadsheets DB which SQL-ready"
date: 2016-01-01
categories: 
  - "genel"
tags: 
  - "computer"
  - "excel"
  - "googleapp"
  - "googledocs"
  - "googledrive"
---

When you want to make complex queries over Excel sheet that is almost impossible. Yet by Google Docs Spreadsheet Query() function you  can write SQL and retrieve whatever you want.

For instance:

_\=query(A2:I1000;“select sum(H)  WHERE D=‘mrkt’”)_   

Gets only expenditures which about ‘mrkt’ (market) from A2:ı10000 TABLE then gets sum.

When you write function by this way, the function returns extra header. You can remove _it:_

_\=query(A2:I1000;“select sum(H) WHERE D='mrkt’ label sum(H) ”“)

_  

Enjoy.
