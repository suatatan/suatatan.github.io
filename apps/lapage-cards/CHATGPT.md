# LaPage Cards — ChatGPT integration

When the user says “Kart yolla” or “Kartı LaPage Cards'a gönder”, summarize the current learning topic as a single Markdown note with a concise title, tags, rules and examples. Produce a clickable link, not a claim of remote saving.

Format:
https://suatatan.com/apps/lapage-cards/#action=add-card&title=ENCODED_TITLE&tags=ENCODED_TAGS&body=ENCODED_MARKDOWN

Encode each value as UTF-8 URL encoding (encodeURIComponent). Max title 200 characters, body 30000, tags 500. Prefer concise links. A URL fragment is read locally in the receiving browser, not sent as an HTTP request to the web server. Do not put sensitive information into links. Opening the link saves the note to localStorage in that browser/profile, skips an exact title/body duplicate and displays the saved note. The app clears the fragment after saving. No automatic synchronization with other devices or browser profiles. On Android, use the same Chrome profile as the installed PWA.

Example:
https://suatatan.com/apps/lapage-cards/#action=add-card&title=D%C3%A8s%20que%20%2F%20Quand%20%2B%20futur%20simple&tags=FR%2C%20B1-B2%2C%20temps&body=%23%23%20Kural%0AGelecekteki%20olaylar%20i%C3%A7in%20**d%C3%A8s%20que%20%2F%20quand%20%2B%20futur%20simple**%20kullan%C4%B1labilir%3A%20-%C4%B1nca%2F-di%C4%9Finde.%0A%0A%23%23%20%C3%96rnekler%0A-%20D%C3%A8s%20que%20j%E2%80%99arriverai%2C%20je%20t%E2%80%99appellerai.%0A-%20Quand%20j%E2%80%99aurai%20le%20temps%2C%20je%20lirai.%0A%0A**Dikkat%3A**%20%C4%B0ngilizceden%20farkl%C4%B1%20olarak%20zaman%20yan%20c%C3%BCmlesinde%20de%20gelecek%20zaman%20kullan%C4%B1labilir.
