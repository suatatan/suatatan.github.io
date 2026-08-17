# suatatan.com Google Indexing Audit

Audit date: 2026-08-17

## Scope and method

The supplied Search Console export says 63 URLs, but the source list contains **62 unique URL lines**. The malformed SQL Server path contains a literal space; it is represented below as `%20`. Every supplied URL was matched against Jekyll source, front matter, generated-route rules, content depth, duplicate candidates, metadata and sitemap behavior.

Classification meanings follow the requested scheme: **KEEP**, **UPDATE**, **REDIRECT**, **IGNORE**, and **NOINDEX**. `IGNORE` means the historical page stays accessible but is not actively promoted in the sitemap. It does not mean deletion.

## URL decisions

| # | URL | Classification | Reason | Recommended / implemented action and target |
|---:|---|---|---|---|
| 1 | `https://suatatan.com/bilgisayar/genel/2013/02/10/chrome-extension-olusturmaya-giris.html` | UPDATE | Substantial original technical tutorial; browser APIs and extension manifests have changed. | Keep self-canonical and indexable; show the standard historical technical note; surface through the curated technical archive. |
| 2 | `https://suatatan.com/2017/12/25/2017de-neler-okudum.html` | KEEP | Substantial original annual reading record with durable personal-archive value. | Preserve body, date, authorship and self-canonical URL. |
| 3 | `https://suatatan.com/bilgisayar/2008/11/03/ajax-ile-veri-cekerken-veriyi-salt-veya-htmlnin-okunmus-hali-olarak-alma.html` | UPDATE | Stronger and better-formatted copy of a duplicated AJAX tutorial. | Keep as canonical target; add historical technical note and archive link. |
| 4 | `https://suatatan.com/genel/2012/04/01/seffafligin-kutsanmasi.html` | KEEP | Original essay of meaningful length; historical age is not a quality defect. | Preserve and keep indexable. |
| 5 | `https://suatatan.com/bilgisayar/genel/2012/10/23/google-app-script-ile-basit-bir-mesaj-formu.html` | UPDATE | Useful original Apps Script example, but old APIs may have changed. | Keep indexable with historical technical note and self-canonical. |
| 6 | `https://suatatan.com/genel/2013/02/08/batch-file-in-windows-cmd-how-do-i-prompt-for.html` | NOINDEX | Thin excerpt whose title and content point to a Stack Overflow answer rather than substantial original content. | Add `noindex,follow`; remove from sitemap; keep accessible in the archive. |
| 7 | `https://suatatan.com/bilgisayar/genel/2008/12/21/dom-erisimi-ile-tarayici-tarafinda-dinamik-olarak.html` | REDIRECT | Duplicate/truncated slug for a more complete DOM tutorial copy. | Redirect and canonicalize to `https://suatatan.com/bilgisayar/2008/12/21/dom-erisimi-ile-tarayici-tarafinda-dinamik-olarak-icerik-olusturulmasi.html`; exclude the old URL from sitemap. |
| 8 | `https://suatatan.com/genel/2014/11/20/stratejik-yonetim-okumalari-kisa-notlar-yorumlar.html` | KEEP | Substantial original management reading notes. | Preserve and keep indexable. |
| 9 | `https://suatatan.com/bilgisayar/genel/2013/09/04/samsung-mu-iphone-mi-google-trendleri-uzerinden.html` | UPDATE | Original trend analysis, but conclusions are date-sensitive. | Keep indexable; preserve historical framing and rely on date/author metadata. |
| 10 | `https://suatatan.com/bilgisayar/2022/03/02/pythonda-kume-islemleri.html` | UPDATE | Short but useful Python reference with clear search intent. | Keep indexable, add technical archive link and historical note. |
| 11 | `https://suatatan.com/bilgisayar/genel/2012/02/15/libreoffice-35-yayinlandi.html` | IGNORE | Very short version announcement with little current search value. | Keep accessible; remove from sitemap; do not delete or noindex solely because of age. |
| 12 | `https://suatatan.com/bilgisayar/genel/2011/10/12/excelde-hucre-nedir-2.html` | UPDATE | Thin beginner tutorial but still answers a direct question. | Keep indexable with generated description and historical note. |
| 13 | `https://suatatan.com/2020/02/21/veri-tabani-guvenligi-egitimi-notlari.html` | KEEP | Original training notes on a still-relevant topic. | Preserve and keep self-canonical/indexable. |
| 14 | `https://suatatan.com/bilgisayar/genel/2012/12/19/python-ile-xml-verisini-islemek-parse-etmek.html` | UPDATE | Valuable Python/XML example; library usage may be dated. | Keep indexable, add historical note, and feature in technical archive. |
| 15 | `https://suatatan.com/genel/2011/10/13/ayinesi-istir-kisinin-evet-fakat-lafa-da-bakilir-2.html` | KEEP | Original essay with sufficient substance and archive value. | Preserve unchanged and indexable. |
| 16 | `https://suatatan.com/genel/2013/09/25/fast-track-hizli-yol-nedir.html` | IGNORE | Accurate but extremely short definition. | Keep accessible; remove from sitemap rather than deleting or forcing noindex. |
| 17 | `https://suatatan.com/genel/2016/10/26/mutluluk-parayla-satin-alinabilir.html` | KEEP | Substantial original essay. | Preserve and keep indexable. |
| 18 | `https://suatatan.com/bilgisayar/genel/2012/02/14/blogger-icin-android-uygulamasi.html` | IGNORE | Historical workaround depends on obsolete Android Market/APK links. | Keep accessible as archive material; remove from sitemap. |
| 19 | `https://suatatan.com/2024/03/03/disleksinin_tarihcesi.html` | UPDATE | Valuable topical article, but nested front matter was visibly rendered and the title/description were machine-like. | Merge nested metadata into real front matter, improve title/description, repair wiki links, retain self-canonical and indexability. |
| 20 | `https://suatatan.com/podcast/sağlık/2025/07/17/podcast-nefes-egzersizi-4-4-4-4.html` | KEEP | Substantial original podcast guide with complete description and topical tags. | Preserve; keep self-canonical and indexable. |
| 21 | `https://suatatan.com/okuma-notlari/2018/12/12/yaklasirken-hizli-uzaklasirken-yavasiz.html` | KEEP | Original reading note with adequate depth. | Preserve and keep indexable. |
| 22 | `https://suatatan.com/2006/09/12/yuzler-ve-kaybolan-kimlikler-2.html` | KEEP | Long original historical essay. | Preserve body, date and indexability. |
| 23 | `https://suatatan.com/genel/2013/08/04/bus-cianin-kullandigi-sosyal-medya-muhendisligine.html` | KEEP | Substantial original media-analysis essay despite its provocative historical title. | Preserve and keep indexable. |
| 24 | `https://suatatan.com/bilgisayar/genel/2011/07/08/css-ile-bir-div-icinde-divi-ortalama-2.html` | UPDATE | Very short but directly useful CSS answer. | Keep indexable; use generated description and historical technical framing. |
| 25 | `https://suatatan.com/data/performance/sql%20server/2025/08/07/sql-approx-query.html` | UPDATE | Valuable SQL article, but a category containing a space created a malformed/non-normalized path. The body also contains an internal-looking schema/table identifier. | Keep the existing route unchanged in this PR. Before moving it, anonymize or explicitly approve republication of the internal-looking identifier; then move to `/data/performance/sql-server/2025/08/07/sql-approx-query.html` with an edge redirect. |
| 26 | `https://suatatan.com/cocuklar/diller/2017/03/03/cocuklar-icin-fransizca-ogrenme-siteleri.html` | UPDATE | Useful resource page with clear intent but thin text and potentially aging links. | Keep indexable; preserve content and review outbound links separately. |
| 27 | `https://suatatan.com/genel/2013/06/10/yillik-faiz-oranlari-ile-aylik-faiz-oranlari-nasil.html` | KEEP | Original explanatory finance note with durable informational value. | Preserve and keep indexable. |
| 28 | `https://suatatan.com/tag/turkish.html` | NOINDEX | Navigational tag listing with no unique editorial content. | Add `noindex,follow`; remove all tag pages from sitemap; keep crawlable and usable for navigation. |
| 29 | `https://suatatan.com/genel/2011/02/07/vanda-bir-takim-yerel-gazetelere-iliskin-bazi.html` | KEEP | Original local-media essay and part of the historical archive. | Preserve and keep indexable. |
| 30 | `https://suatatan.com/genel/2014/06/15/hizsiz-okuma.html` | KEEP | Substantial original essay on reading behavior. | Preserve and keep indexable. |
| 31 | `https://suatatan.com/yazilarim/2006/09/24/papa-hazretleri-16benediktus-nietszche-dayi-ve-ramazan-ayinda-turk-televizyonculugu-arasinda-sizofrence-tespit-edilmis-bir-bag.html` | KEEP | Long original historical essay; age and title length alone do not justify removal. | Preserve, self-canonicalize and keep indexable. |
| 32 | `https://suatatan.com/cocuklar/bilgisayar/2017/06/04/arduino-kullanmaya-giris.html` | UPDATE | Substantial original Arduino tutorial. | Keep indexable; add historical note and curated technical-archive link. |
| 33 | `https://suatatan.com/genel/2006/09/12/misyonerlik-tarihi2-2.html` | KEEP | Long original historical essay. | Preserve and keep indexable. |
| 34 | `https://suatatan.com/2024/03/03/disleksi_ve_ilac.html` | UPDATE | Useful guidance, but nested front matter was visible and internal wiki links were broken. | Merge metadata, improve human-facing title/description, convert wiki links and retain self-canonical/indexable status. |
| 35 | `https://suatatan.com/bilgisayar/2019/10/31/artik-script-src-denerek-javascript-yazilmiyor.html` | UPDATE | Substantial JavaScript article; tooling conventions continue to evolve. | Keep indexable with historical technical note. |
| 36 | `https://suatatan.com/bilgisayar/2011/07/06/jquery-ile-json-uzerinden-flickr-apiden-photoset-listesini-cekme.html` | UPDATE | Original code tutorial built on older Flickr/jQuery APIs. | Keep indexable with historical technical note. |
| 37 | `https://suatatan.com/2023/08/28/sympy.html` | UPDATE | Valuable Python/SymPy tutorial had no Jekyll front matter, title metadata or generated article page guarantees. | Add complete front matter, English language metadata, description, tags and normal post layout. |
| 38 | `https://suatatan.com/bilgisayar/genel/2011/10/06/linux-nedir-duymayanlar-icin-iyi-bir-baslangic-2.html` | UPDATE | Substantial beginner Linux article with historical software references. | Keep indexable with historical technical note. |
| 39 | `https://suatatan.com/genel/2011/06/14/sehir-olmadan-buyuksehir-olmayi-dusunmek.html` | KEEP | Long original urban/local-government essay. | Preserve and keep indexable. |
| 40 | `https://suatatan.com/bilgisayar/genel/2014/12/08/outlook-aramalari-icin-ozel-filtreler.html` | UPDATE | Short but directly useful productivity reference; interface may have changed. | Keep indexable with historical technical note. |
| 41 | `https://suatatan.com/2014/12/04/ذ-ل-ك-ال-ذ-ي-ي-ب-ش-ر-الل-ه-ع-ب-اد-ه.html` | NOINDEX | Thin quotation page had no title and almost no original commentary. | Add descriptive title “Şûrâ Suresi 23. Ayet”; `noindex,follow`; remove from sitemap; preserve page. |
| 42 | `https://suatatan.com/2014/12/05/ا-ن-ي-ش-أ-ي-س-ك-ن-الر-يح-ف-ي-ظ-ل-ل-ن.html` | NOINDEX | Thin quotation page had no title and almost no original commentary. | Add descriptive title “Şûrâ Suresi 33. Ayet”; `noindex,follow`; remove from sitemap; preserve page. |
| 43 | `https://suatatan.com/bilgisayar/2019/11/01/rcrawler-ile-web-crawling-islemi.html` | UPDATE | Useful R crawling tutorial with original code. | Keep indexable, add historical note, and surface in technical archive. |
| 44 | `https://suatatan.com/genel/2013/09/06/fredrika-stahl-fast-moving-train.html` | NOINDEX | Eight-word automated Facebook/Fizy status with a dead-service title. | Add `noindex,follow`; remove from sitemap; keep as accessible historical artifact. |
| 45 | `https://suatatan.com/bilgisayar/english/2011/07/27/dreamweaver-like-html-template-dressing-in-aptana-with-python.html` | UPDATE | Original English Python/Aptana tutorial; tooling is historical. | Keep indexable with English historical technical note. |
| 46 | `https://suatatan.com/genel/2012/02/26/issiz-olmak-ya-da-olmamak-iste-butun-mesele-bu.html` | KEEP | Original essay of adequate depth. | Preserve and keep indexable. |
| 47 | `https://suatatan.com/bilgisayar/genel/2012/04/13/javascript-ile-url-parametrelerine-erisim.html` | UPDATE | Short but useful JavaScript reference. | Keep indexable with historical technical note and archive link. |
| 48 | `https://suatatan.com/bilgisayar/genel/2011/01/05/ucretsiz-ziyaretci-istatistik-uygulamalari-2.html` | IGNORE | Historically useful comparison, but the listed analytics products and interfaces are dated. | Keep accessible; remove from sitemap; do not delete. |
| 49 | `https://suatatan.com/bilgisayar/2023/02/13/featurewiz-ile-otomatik-feature-selection.html` | UPDATE | Useful machine-learning tool note with direct technical value. | Keep indexable; surface through curated technical archive. |
| 50 | `https://suatatan.com/bilgisayar/genel/2008/11/03/ajax-ile-veri-cekerken-veriyi-salt-veya-htmlnin.html` | REDIRECT | Duplicate, less complete/less clean copy of URL #3. | Redirect and canonicalize to `https://suatatan.com/bilgisayar/2008/11/03/ajax-ile-veri-cekerken-veriyi-salt-veya-htmlnin-okunmus-hali-olarak-alma.html`; exclude old URL from sitemap. |
| 51 | `https://suatatan.com/bilgisayar/genel/2011/07/17/retrieve-videos-from-a-spesific-youtube-user-with.html` | UPDATE | Original Python/YouTube API tutorial; endpoint behavior is historical. | Keep indexable with English historical technical note. |
| 52 | `https://suatatan.com/bilgisayar/ekonomi/muhendislik/yazilim/2019/03/28/market-sepeti-analizi-nedir.html` | UPDATE | Concise but valuable data-science explanation using Python/R context. | Keep indexable and surface in technical archive. |
| 53 | `https://suatatan.com/2023/08/17/effective-journaling.html` | UPDATE | Substantial English productivity article had no front matter/title metadata. | Add complete Jekyll front matter, description, language and tags; keep indexable. |
| 54 | `https://suatatan.com/bilgisayar/genel/2012/06/17/simple-crud-createupdate-delete-app-in-google.html` | UPDATE | Original Apps Script CRUD tutorial; service APIs may have changed. | Keep indexable with historical technical note. |
| 55 | `https://suatatan.com/genel/2011/02/23/kalabaliklari-anlamak-3.html` | KEEP | Long original essay. | Preserve and keep indexable. |
| 56 | `https://suatatan.com/din/yazilarim/2017/03/21/soylenmeyin.html` | KEEP | Original essay with adequate depth and archive value. | Preserve and keep indexable. |
| 57 | `https://suatatan.com/2014/11/21/ا-م-ا-الس-ف-ين-ة-ف-ك-ان-ت-ل-م-س-اك-ين.html` | NOINDEX | Thin quotation page had no title and little original commentary. | Add descriptive title “Kehf Suresi 79. Ayet”; `noindex,follow`; remove from sitemap; preserve page. |
| 58 | `https://suatatan.com/bilgisayar/genel/2012/02/14/flask-framework.html` | UPDATE | Useful historical Flask introduction. | Keep indexable with historical technical note and curated archive link. |
| 59 | `https://suatatan.com/bilgisayar/english/genel/2011/07/27/a-new-version-of-python-template-maker-2.html` | UPDATE | Original English project note with Python/web-development value. | Keep indexable with historical technical note. |
| 60 | `https://suatatan.com/bilgisayar/english/genel/2011/07/21/print-as-json-format-in-google-app-engine-2.html` | UPDATE | Original App Engine/Python code note; API is historical. | Keep indexable with historical technical note. |
| 61 | `https://suatatan.com/bilgisayar/genel/2008/11/02/flock-sanal-sosyallik-tarayicilara-kadar-indi-2.html` | KEEP | Original technology commentary and useful historical-web record. | Preserve and keep indexable. |
| 62 | `https://suatatan.com/bilgisayar/genel/2012/06/08/python-ile-excel-manipulasyonu.html` | UPDATE | Valuable Python/Excel tutorial with original examples. | Keep indexable, add historical note and feature in technical archive. |

## Cross-site technical findings

- The hand-written sitemap included redirect pages, duplicated the homepage, emitted `/index-en.html`, and generated non-existent `/tag/<tag>/` routes. It also ignored `noindex` and `sitemap: false` on posts.
- `robots.txt` contained an unrendered `{{ site.url }}` Liquid expression because the file had no front matter. The sitemap declaration was therefore invalid in production.
- Post, landing and editorial layouts hard-coded `index, follow`, making page-level noindex decisions ineffective.
- The default image in `_config.yml` still pointed to the superseded social preview, overriding the newer post-layout fallback.
- Twenty-three migrated 2024 posts had a second YAML block rendered as article text. Twenty-two were safely repaired in this change; the legacy `kimim.md` source was left untouched because it contains an expiring LinkedIn image token and has already been superseded by the maintained About page. The same migration also left Obsidian-style `[[slug]]` links unresolved.
- `sympy.html` and `effective-journaling.html` came from files without Jekyll front matter and therefore lacked reliable generated pages and metadata.
- The `SQL Server` category produced a path containing a literal space.
- The SQL route move was intentionally deferred because changing the post republishes an internal-looking schema/table identifier. No content was exposed or rewritten to force the URL migration.
- Duplicate-title scanning across the entire archive found additional high-confidence pairs, including `demokrasi-bir-sayi-rejimi-midir`, `marquee-tagiyla-kayan-yazi-olusturma`, `tasavvufu-raflardan-indirmek`, `getting-youtube-video-thumbnails-via-javascript`, `basit-bir-jquery-news-slider-uygulamasi`, `kendiliginden-kayma-ozelligi-de-olan-basit-bir-jquery-content-slider`, and `javascript-ile-goo.gl-url-kisaltma`. These were **not mass-redirected** in this change because backlink/traffic evidence was not supplied and aggressive consolidation would conflict with the historical-archive principle.

## Redirect infrastructure limitation

GitHub Pages cannot configure origin-level HTTP 301 responses from repository content alone. Confirmed duplicate routes now use a zero-delay HTML redirect, a canonical target, `noindex,follow`, and sitemap exclusion. This is the safest repository-only consolidation. True HTTP 301 status codes should be added later at the CDN/DNS edge (for example Cloudflare Redirect Rules) without changing the canonical decisions above.
