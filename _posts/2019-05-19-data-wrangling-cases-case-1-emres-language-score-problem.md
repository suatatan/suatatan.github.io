---
layout: post
title: "Data Wrangling Cases: Case #1: Emre's Language Score Problem"
date: 2019-05-19
categories: 
  - "bilgisayar"
tags: 
  - "data-science"
  - "python"
---

![](/images/ekran-gc3b6rc3bcntc3bcsc3bc-2019-05-19-15-55-15.png)

| user | score\_type | score |
| --- | --- | --- |
| jimmy | toefl | 80 |
| catherine | ielts | 33 |
| fitzwilliam | toefl | 90 |
| emre | ielts | 100 |
| emre | toefl | 99 |

Let's contemplate a data set like above. Any user can have TOEFL or IELTS score. Some of them like 'Emre' has two score together. Let's think we want to convert this dataset like below:

| user | ielts | toefl |
| --- | --- | --- |
| jimmy | None | 80 |
| catherine | 33 | None |
| fitzwilliam | 90 | None |
| emre | 100 | None |
| emre | None | 99 |

What we did? We just converted two factor type of `score_type` as a column and get the corresponding values from to the newly generated score columns. During this conversation _if person has not given type of exam we put 'None'_ and _if any person has more than one exam we put each score within a new row_.

How can we perform this conversion? Manually? Perfect for a few row! What we do when there is 40.000 of row? The GG should answer this question? :)

Use Python Language:

```
import pandas as pd
df = pd.read_csv("/home/satan/Masaüstü/data.csv",sep="|")
# you can either use a function disctincts kind of factors from score_type column by df['colname'].unique().tolist()
score_factors = ['toefl','ielts']
for factor in score_factors:
    df[factor] = None
# distribute the values to added columns
j = 3 # due to additional columns should start from 3'th column
score_type_column_nr = 1 # locate where is score_type column
for factor in score_factors:
    for index,row in df.iterrows():
        stype = df.iloc[index,score_type_column_nr]
        corresponding_column_no = j
        if (factor in stype):
            df.iloc[index,corresponding_column_no] = df.iloc[index,2]
        else:
            pass
    j = j+1 

```

That's all. Can you solve this problem with your veteran Excel? I think no :) If you can write, please explain how, to below. Don't forget, to add how much time you spend to solve the problem including goggling.

For me I didn't open the browser and wrote it within 15 minutes! Huh ?

Note: This scenario and its answer is original and firstly published from Dr. Suat ATAN's blog
