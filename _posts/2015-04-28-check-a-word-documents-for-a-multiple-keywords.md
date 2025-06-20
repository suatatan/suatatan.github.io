---
title: "Check a word documents for a multiple keywords sequentially in a smart way"
date: 2015-04-28
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "computer"
  - "excelvba"
---

Let’s consider your boss requested check documents more than 100+ item is include key word like “draft” and “temporary” etc. Doing this manually is exhausitive work. But there are another method for smart workers:) which avoids iterative tasks.

Here in how:

Sub Makro1()  
’  
’ Makro1 Makro  
’  
   Selection.Find.ClearFormatting  
   With Selection.Find  
       .Text = “Draft”  
       .Replacement.Text = “”  
       .Forward = True  
       .Wrap = wdFindAsk  
       .Format = False  
       .MatchCase = True  
       .MatchWholeWord = True  
       .MatchWildcards = False  
       .MatchSoundsLike = False  
       .MatchAllWordForms = False  
   End With  
   Selection.Find.Execute

   Selection.Find.ClearFormatting  
   With Selection.Find  
       .Text = “Temporary”  
       .Replacement.Text = “”  
       .Forward = True  
       .Wrap = wdFindAsk  
       .Format = False  
       .MatchCase = True  
       .MatchWholeWord = True  
       .MatchWildcards = False  
       .MatchSoundsLike = False  
       .MatchAllWordForms = False  
   End With  
   Selection.Find.Execute

End Sub
