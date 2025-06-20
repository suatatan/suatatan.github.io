---
title: "Google'ın tüm datası elimin altında ama!"
date: 2021-03-09
categories: 
  - "bilgisayar"
---

Commom Crawl (Bundan böyle CC yazacağım [https://commoncrawl.org/](https://commoncrawl.org/) sitesinden yayın yapan) kar amacı gütmeyen bir kuruluştur. Bir nevi Google gibi tüm webi tarar ancak verileri kendine saklamaz. Bunun yerine düzenli olarak yayınlar. Şimdi hemen heyecanlanmayın gidip alayım diye. Devasa büyüklükte verilerdir. Öyle açıp bakamazsınız. Bir takım özel yetenekler gerekir. Bunları bu kısa yazıda anlatmamız mümkün değil. Ama bazı kavramlara kısaca bakalım. Not: Ben kısmen de olsa bu verilere erişebiliyorum :) Parmaklarımdan yıldırımlar çakıyor :)

WARC dosyası: Bu dosya tipi webi tarayan uygulamaların bir nevi zip dosyasıdır. Çeşitli konularda taranmış olan web sayfaları paketler halinde bu dosyanın içine konur. Common Crawl sitesinden gidip bu dosyaları indirmelisiniz. Ancak bu dosyalar sadece metaverileri içerir. Web'in büyüklüğünü siz düşünün.

Nereden indirebilirim, nasıl indiririm: [https://stackoverflow.com/questions/55762306/download-small-sample-of-aws-common-crawl-to-local-machine-via-http](https://stackoverflow.com/questions/55762306/download-small-sample-of-aws-common-crawl-to-local-machine-via-http)

Aşağıda bir çok ufak bir WARC dosyasını açtım (840 MB). Dikkat edin sadece sayfaların adresleri var. Gidip okuması size ait

<figure>

[![](/images/image-20210309235108416.png)](https://suatatan.wordpress.com/wp-content/uploads/2021/03/image-20210309235108416.png)

</figure>

WARC dosyalarını nasıl açarım: Maalesef o da ayrı zorluk. WebRecorder Player adlı uygulamayı indirip oraya upload ederek lokalden dosyaya bakabilirsiniz. Programı şuradan indirebilirsiniz: [https://github.com/webrecorder/webrecorder-desktop](https://github.com/webrecorder/webrecorder-desktop)

Diğer yöntem: [https://guides.lib.vt.edu/webarchiving/openwarc](https://guides.lib.vt.edu/webarchiving/openwarc)

Python ile kısmi açma: [https://dmorgan.info/posts/common-crawl-python/](https://dmorgan.info/posts/common-crawl-python/)
