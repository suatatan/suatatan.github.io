---
title: "batch file - In Windows cmd, how do I prompt for user input and use the result in another command? - Stack Overflow"
date: 2013-02-08
categories: 
  - "genel"
---

[In Windows cmd, how do I prompt for user input and use the result in another command? - Stack Overflow](http://stackoverflow.com/questions/1223721/in-windows-cmd-how-do-i-prompt-for-user-input-and-use-the-result-in-another-com): “  
  
@echo off  
set /p id="Enter ID: ” %=%  
You can then use %id% as a parameter to another batch file. For example:  
  
jstack %id%  
EDIT: This works just fine for me. Sorry I can’t help more.  
  
set /P id=Enter id: %=%  
jstack %id% > jstack.txt
