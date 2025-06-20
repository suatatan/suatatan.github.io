---
title: "Simple Python Inheritence Tutorial"
date: 2015-03-27
categories: 
  - "bilgisayar"
  - "genel"
tags: 
  - "python"
---

```
class Personel(object):
    def __init__(self,name,surname):
        self.name=name
        self.surname=surname
    def mynameis(self):
        return "My name is "+str(self.name)
        

class Expert(Personel):
    def __init__(self,name,surname):
        Personel.__init__(self,name,surname)
        self.title="Expert"
        
        

per=Personel("aras","atan")
#print("1:"+per.name)

print(per.mynameis())

#use other function defined under Perso0nel
#becuase you used this code: class Expert(Personel):
exp=Expert("agah","atan")
print(exp.mynameis())

```
