## Text Summarization with LangChain

So far I have used the HuggingFace models to summarize long text. But after discovering LangChain's extraction capabilities I tried to do an pipeline to summarize long text.

In this example my pipeline will summarize this paper: https://journals.sagepub.com/doi/epub/10.1177/23409444231185790
*Sensing, seizing, and reconfiguring dynamic capabilities in innovative firms: Why does strategic leadership make a difference?* is a academic paper and I don't want read it at all. I'll decide after the reading AI generated summary.

🤖 **Unlocking the Magic of Document Summarization with Python!** 📚🔍

Hey there, code wizards! 👋 Are you ready to dive into a world where your Python spells can turn lengthy documents into bite-sized nuggets of wisdom? 🧙‍♂️ Today, we're going to unravel the mysteries of document summarization using a pinch of code and a sprinkle of AI fairy dust! ✨

🔮 **The Quest for Knowledge**

Imagine you've stumbled upon a mystical text known as "sample-paper.pdf". 📜 But, oh dear adventurer, it's as thick as an ancient tome! Fear not, for we have a spell to split these pages into manageable chunks using the mighty PyPDFLoader! 📚✂️

```python
# %% MR Read PDF
loader = PyPDFLoader("sample-paper.pdf")
pages = loader.load_and_split()
```

🌟 **Forging the Index of Power**

Now that our pages are in hand, let's forge an index that'll make finding knowledge a breeze! Meet FAISS, a trusty tool that creates an index using the power of OpenAIEmbeddings! 🔍🔗

```python
# %% MR Make Index
faiss_index = FAISS.from_documents(pages, OpenAIEmbeddings())
```

🔍 **Seeking the Golden Nuggets**

Ever wished for a magical magnifying glass that finds the juiciest bits of information in the blink of an eye? Our FAISS index can do just that! 🕵️‍♀️ Let's summon it to search for a specific incantation, "What about CEOs?", and retrieve the top 5 results!

```python
# %% MR Search
docs = faiss_index.similarity_search("What about CEOs?", k=5)
for doc in docs:
    print(str(doc.metadata["page"]) + ":", doc.page_content[:300])
    print("----")
```

📝 **Summoning the Summary Sorcery**

But wait, there's more! 🎩✨ Our enchanted code can also summarize these findings into beautiful, concise gems. With the power of OpenAI's language model, we can create both regular summaries and bullet-point wonders! Let's weave the magic:

```python
# %% MR
llm = OpenAI(temperature=0)
map_prompt = """
Write a concise summary of the following:
"{text}"
CONCISE SUMMARY:
"""
map_prompt_template = PromptTemplate(template=map_prompt, input_variables=["text"])

combine_prompt = """
Write a concise summary of the following text delimited by triple backquotes.
Return your response in bullet points which covers the key points of the text.
```{text}```
BULLET POINT SUMMARY:
"""
combine_prompt_template = PromptTemplate(template=combine_prompt, input_variables=["text"])

summary_chain = load_summarize_chain(llm=llm,
                                     chain_type='map_reduce',
                                     map_prompt=map_prompt_template,
                                     combine_prompt=combine_prompt_template,
                                    )

mapreduce_output = summary_chain.run(docs)
```

🎉 **Unveiling the Treasures**

And there you have it, fellow explorers! With a wave of your coding wand, you've tamed the wild words and unleashed their essence. From splitting ancient texts to summoning concise summaries, your journey has been nothing short of magical! 🌟✨

So go forth, brave coders! May your code be bug-free and your summaries be succinct. Remember, the world of AI and coding is as enchanting as the stories it unveils. Until next time, happy coding! 🚀🔥

---

There you go! A playful and informative blog post that introduces the provided code in a whimsical manner. Feel free to customize and adjust the text as needed to match your style and preferences.

🎉 **Bonus**

The AI gives me this result:

- This study examined the exploratory and exploitative learning, as well as the transactional and transformational leadership styles of CEOs in two departments (marketing and production).
- Cronbach's alpha coefficients were found to be .86, .71, and .84 for sensing, seizing, and reconfiguration capabilities respectively.
- Exploratory and exploitative learning are related to sensing and seizing capabilities in both marketing and production departments.
- Transformational leadership style was found to reinforce the relationship between exploratory learning and sensing capability in both departments.
- Correlation and descriptive analyses showed positive relationships between OL, leadership style, and the DCs of the firm.
- Multiple and hierarchical regression analysis was used to test hypotheses, and results showed a statistically significant relationship between exploratory learning and sensing capability for production departments, and a positive and statistically significant relationship between exploitative learning and sensing capability for marketing departments.