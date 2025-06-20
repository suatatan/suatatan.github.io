---
title: "NumPy Matrix Opeartions"
date: 2015-03-24
categories: 
  - "genel"
tags: 
  - "numpy"
  - "python"
---

NumPy is a kind a untangible yet powerful model of excel in Python. Excel provides easy environment for seeing a matrix but doesn’t provide functions for batch operation. For instance for getting sum of all columns you have to write sum() function in excel then drag the function cell to right up to reach matrix x-axis end. However NumPy gives more; an matrix can be define as just a variable “f” or another variable, then getting sum of columns is: f.sum(axis=0)

Result is in array type. It’s so easy. Here is how:

## Define empty matrix

\>>> empty=np.zeros(shape=(4,4))  
\>>> empty  
array(\[\[ 0.,  0.,  0.,  0.\],  
      \[ 0.,  0.,  0.,  0.\],  
      \[ 0.,  0.,  0.,  0.\],  
      \[ 0.,  0.,  0.,  0.\]\])  

## Assign Value (Element-wise)

\>>> empty\[0,1\]=3  
\>>> empty  
array(\[\[ 0.,  3.,  0.,  0.\],  
      \[ 0.,  0.,  0.,  0.\],  
      \[ 0.,  0.,  0.,  0.\],  
      \[ 0.,  0.,  0.,  0.\]\])  
\>>>

## Get the rows and  columns sum

f=np.matrix(“1 2 3;4 5 6 ;7 8 9”)  

\>>> f  
matrix(\[\[1, 2, 3\],  
       \[4, 5, 6\],  
       \[7, 8, 9\]\])  
\>>> f.sum(**axis=0**)  
matrix(\[\[12, 15, 18\]\])  
  

axis=0 means up-to-down on matrix

## Get the column which have maximum sum value from matrix

\>>> f.sum(axis=1)  
matrix(\[\[ 6\],  
       \[15\],  
       \[24\]\])  
\>>> f.sum(axis=0).**argmin()**  
0

## Get column which sum of its is>0:

np.where(f.sum(axis=0) > 0)  

Thanks for answer in [StackOverFlow to my question](http://stackoverflow.com/questions/29217072/get-the-column-which-have-maximum-sum-value-from-matrix/29217161?noredirect=1#comment46643726_29217161)
