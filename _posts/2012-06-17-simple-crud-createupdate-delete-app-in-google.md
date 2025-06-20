---
categories:
- bilgisayar
- genel
date: 2012-06-17
layout: post
tags:
- english
- google-app-script
- quickread
- technology
title: Simple CRUD (Create,Update Delete) App in Google App Script
---

I want to use Google Spreadsheet as database-like. Normally, this is isn’t posibble at all. But not impossible. I coded a simple CRUD script for spreadsheet. You can use it for developing row-by-row logging apps.  
Enjoy !  
  
  
var belge=SpreadsheetApp.getActiveSpreadsheet();  
var sayfa=belge.getSheets()\[0\];  
  
  
**function** save(data1) {  
    
  var lr=sayfa.getLastRow();  
  var new\_record\_row=lr+1;  
  //generate id  
  var id=uid();  
    
  sayfa.getRange(new\_record\_row, 1).setValue(id)  
    
  sayfa.getRange(new\_record\_row, 2).setValue(data1)  
  return “Saved”;  
    
}  
  
  
**function** update(uid,new\_value){  
  
  
  var lr=sayfa.getLastRow();  
    
  for(i=1;i  
    var okunan=sayfa.getRange(i,1);  
    var okunan\_deger=okunan.getValue();  
    var snc=okunan\_deger.indexOf(uid);  
      
    if(snc != -1){  
      var secili\_satir=sayfa.getRange(i,2).setValue(new\_value);  
      
    }   
  }  
  return “Updated”;  
}  
  
  
**function** remove\_row(uid){  
  
  
var lr=sayfa.getLastRow();  
    
  for(i=1;i  
    var okunan=sayfa.getRange(i,1);  
    var okunan\_deger=okunan.getValue();  
    var snc=okunan\_deger.indexOf(uid);  
      
    if(snc != -1){  
     sayfa.deleteRow(i);  
      
    }   
  }  
  return “Removed”;  
}  
  
  
  
  
  
  
**function** test(){  
  remove\_row(“20125171339918788818”);  
    
  
  
}  
  
  
**function** uid(){  
  
  
var dateObject = new Date();  
     var uniqueId =   
          dateObject.getFullYear() + “ +   
          dateObject.getMonth() + ” +   
          dateObject.getDate() + “ +   
          dateObject.getTime();  
  
  
     var uid=uniqueId.toString();  
     return uid;  
  
  
}  
  
  
**function** delete\_record(uid){  
var lr=sayfa.getLastRow();  
    
  for(i=1;i  
    var okunan=sayfa.getRange(i,1);  
    var okunan\_deger=okunan.getValue();  
    var snc=okunan\_deger.indexOf(uid);  
      
    if(snc != -1){  
      var secili\_satir=sayfa.getRange(i,2).setValue("deleted”);  
      
    }   
  }  
}
