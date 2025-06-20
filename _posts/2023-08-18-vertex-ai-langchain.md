---
date: 2023-08-18
tags:
- english
- longread
- technology
title: Using VertexAI Instead of OpenAI in LangChain
---

## Using VertexAI Instead of OpenAI in LangChain

So far, using VertexAI was nightmare for me due to setting the credientals. Finally, I found how it works. Just to remember and help users who are in the same situation.

As you see in the Section A in the code, only thing you need to set the path of your credientals JSON file. To access the file (in windows) you need to install gcloud. 

Once you installed file you can open Windows explorer and set this code to there: `%APPDATA%\gcloud\` It will open the your path. You should see `application_default_credentials.json` file there. Then you can copy path and set in the section A

Once you did you'll be able to access VertexAI and use as backend LLM.

```python
# %%
from langchain.llms import VertexAI
from langchain import PromptTemplate, LLMChain
import os
# Section A
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"C:\Users\suat.atan\AppData\Roaming\gcloud\application_default_credentials.json"

template = """Question: {question}

Answer: Let's think step by step."""

prompt = PromptTemplate(template=template, input_variables=["question"])
llm = VertexAI()
llm_chain = LLMChain(prompt=prompt, llm=llm)
question = "What NFL team won the Super Bowl in the year Justin Beiber was born?"

llm_chain.run(question)
# %%

```