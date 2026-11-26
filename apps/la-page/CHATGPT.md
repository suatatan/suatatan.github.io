# La Page — ChatGPT integration

When asked "LaPage'e gönder", "LaPage'e yolla" or "LaPage'e at", send the French text from the current conversation, preserving paragraphs. Offer a clickable link. Default to bilingual French/Turkish for learning unless the user requests plain French.

Plain:
https://suatatan.com/apps/la-page/#action=add-text&mode=plain&title=ENCODED_TITLE&text=ENCODED_FRENCH&source=ChatGPT

Bilingual:
https://suatatan.com/apps/la-page/#action=add-text&mode=json&pack=ENCODED_JSON

The JSON must match existing format: {"format":"la-page/v1","title":"...","source":"ChatGPT","paragraphs":[{"sentences":[{"fr":"...","tr":"..."}]}]}. Optional heading and heading_tr on paragraph objects. Encode each value with encodeURIComponent. For long articles use the existing JSON file import instead; URL lengths are client-dependent. The app accepts up to 100000 decoded characters, but keep links much shorter for reliability. Do not include confidential material in links.

Opening the link stores a new document locally and selects it in reader view. Identical imports reopen the existing document and preserve progress and notes. No remote save or cross-device sync. Use the same browser profile as the installed PWA.

Example:
https://suatatan.com/apps/la-page/#action=add-text&mode=json&pack=%7B%22format%22%3A%22la-page%2Fv1%22%2C%22title%22%3A%22Le%20plaisir%20d'apprendre%22%2C%22source%22%3A%22ChatGPT%22%2C%22paragraphs%22%3A%5B%7B%22sentences%22%3A%5B%7B%22fr%22%3A%22Apprendre%20une%20langue%2C%20ce%20n%E2%80%99est%20pas%20seulement%20m%C3%A9moriser%20des%20mots.%22%2C%22tr%22%3A%22Bir%20dil%20%C3%B6%C4%9Frenmek%20yaln%C4%B1zca%20kelimeleri%20ezberlemek%20de%C4%9Fildir.%22%7D%2C%7B%22fr%22%3A%22C%E2%80%99est%20aussi%20d%C3%A9couvrir%20une%20autre%20fa%C3%A7on%20de%20voir%20le%20monde.%22%2C%22tr%22%3A%22Ayn%C4%B1%20zamanda%20d%C3%BCnyaya%20ba%C5%9Fka%20bir%20bak%C4%B1%C5%9F%20a%C3%A7%C4%B1s%C4%B1%20ke%C5%9Ffetmektir.%22%7D%5D%7D%2C%7B%22sentences%22%3A%5B%7B%22fr%22%3A%22M%C3%AAme%20si%20les%20progr%C3%A8s%20semblent%20lents%2C%20quelques%20minutes%20de%20lecture%20par%20jour%20font%20une%20diff%C3%A9rence.%22%2C%22tr%22%3A%22%C4%B0lerleme%20yava%C5%9F%20g%C3%B6r%C3%BCnse%20bile%20g%C3%BCnde%20birka%C3%A7%20dakika%20okumak%20fark%20yarat%C4%B1r.%22%7D%2C%7B%22fr%22%3A%22L%E2%80%99essentiel%20est%20de%20rester%20curieux%20et%20de%20pratiquer%20r%C3%A9guli%C3%A8rement.%22%2C%22tr%22%3A%22%C3%96nemli%20olan%20merakl%C4%B1%20kalmak%20ve%20d%C3%BCzenli%20pratik%20yapmakt%C4%B1r.%22%7D%5D%7D%5D%7D


## Offline word meanings (required for ChatGPT bilingual packs)
Include a top-level `glossary` object with French surface forms mapped to concise Turkish meanings in context. Include all distinct tappable words where practical, including inflections and common function words. Example: `"glossary":{"apprendre":"öğrenmek","mémoriser":"ezberlemek","mots":"kelimeler"}`. Existing v1 packages without glossary remain valid; only missing words use the online service. Reimporting the same text enriches its glossary while preserving notes/progress. Plain mode intentionally has no interactive word meanings.
