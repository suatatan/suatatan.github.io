---
categories:
- bilgisayar
date: 2020-10-15
layout: post
tags:
- turkish
- longread
- metin-madenciligi
- technology
title: 'News Please!: Haber analizi yapanlar için ilaç gibi bir Crawler'
---

Kendi küçük crawler'ınızı oluşturmak ister misiniz? Ben haber analitiği ile ilgili çalışmalarımı yaparken eksteriyetle çok miktarda habere ihtiyaç duyuyorum. Şu ana kadar scra.py, newspaper3k gibi bir çok kütüphane kullandım Python'da. R'da ise Rvest. Ancak bu kütüphaneler bir yere kadar işe yarıyor. Çekebildiğim en fazla miktar 50.000 civarında haber idi. Burada suç bu kütüphanelerin değil, daha teknik ayrıntıda.

Yeni keşfettiğim kütüphane ise scraping değil crawling yapıyor ayrıca her çekilen veriyi .hjson formatında kayedediyor. CLI modunda sadece başlangıç sitesi vermek yeterli. O özel yollarla linkleri buluyor.

Kütüphane linki şurada: https://github.com/fhamborg/news-please#run-the-crawler-via-the-cli

Buradan derlenen haberler bilgisayarınıza json formatında ayrıştırılmış olarak (başlık, tarih, fulltext) ve html dosyasının kendisi ile birlikte gelir. Bu dosyaları ise Python Pandas ile birleştirip analiz edebilirsiniz:

Benim kendi lokalimdeki çalışan kodlar şunlar:

```
path_to_json = '/home/suat/news-please-repo/data/2020/10/15/haberler.com'
json_files = [pos_json for pos_json in os.listdir(path_to_json) if pos_json.endswith('.json')]
print(json_files)  # for me this prints ['foo.json']
jsons_data = pd.DataFrame(columns=['id', 'baslik','tarih','sayfa_url','tanim','anametin'])

i=0
for index, js in enumerate(json_files):
    with open(os.path.join(path_to_json, js)) as json_file:
        json_text = json.load(json_file)
        # here you need to know the layout of your json and each json has to have
        # the same structure (obviously not the structure I have here)
        anametin = json_text['maintext']
        baslik = json_text['title']
        tarih =  json_text['date_publish']
        sayfa_url = json_text['url']
        tanim = json_text['description']
        #city = json_text['features'][0]['properties']['name']
        #lonlat = json_text['features'][0]['geometry']['coordinates']
        # here I push a list of data into a pandas DataFrame at row given by 'index'
        jsons_data.loc[index] = [i,baslik,tarih,sayfa_url,tanim,anametin]
        i=i+1
```
