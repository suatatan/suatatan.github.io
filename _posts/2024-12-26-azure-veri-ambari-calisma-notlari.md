---
date: 2024-12-26
layout: post
tags:
- azure
- bulut-bilisim
- cloud
- english
- longread
- technology
title: Azure Veri Ambarı Çalışma Notları
---

Azure Veri Ambarı normalde on-premise yani lokalde bildiğimiz gelenekel sunucular üzerinde veri işleme projelerinde yaptığınız işlemleri bulut üzerinde yapmanıza yardımcı olur. Bunu yaparken bir çok konuda alışkanlıklarımızdan vaz geçmek zorunda kalırız.

Burada bu çalışmaları yaparken ileride işlerinize yarayabilecek bazı notları yazmak istedim:

- Azure Data Factory size kod yazmadan örneğin bir CSV dosyasını Azure Blob Storage denen ve bulutta veri dosyalarınızı muhafaza edebileceğiniz ortamdan, yine Azure üzerinde çalıştıracağınız SQL sunucuya aktarabilmenizi sağlar. Bunun için kod yazmaz, sürükle bırak yaparak _pipeline_ oluşturursunuz. Bu basit bir süreçtir ancak kod yazarak yapabileceğiniz bazı karmaşık şeyleri burada yapmak çok zordur.

- Azure Data Factory'de pipeline yaratmak için hazır bileşenler vardır bunlardan en temel olanları:
    - CopyData
    
    - DataFlow
    
    - Filter

- CopyData ile verileri Blob Storage'dan SQL Server'a aktarabilirsiniz.

- DataFlow da aynı işi yapar ancak tam olarak neden ayrı bir bileşen olduğunu anlamadım.

- Filter bildiğimiz SQL where gibidir.

- Bu bileşenleri şu iş bitince şunu şuna bağla şeklinde birbirine bağlayıp test edebilirsiniz.

- Bu süreçler görsel bir arayüz üzerinden ilerler ancak JSON olarak da bir döküm ortaya çıkar.

- Zaman zaman bu görsel süreçler tammaen kodla düşünen deneyimli yazılımcıları zorlayabilir. Bunun için önerim şudur:

- **_Önce source ve target datasetleri oluşturun örneğin kaynak BlobStore, Hedef SQL server sonra da oluşan JSON'u alıp ChatGPT'ye bu kodu vererek arzu ettiğiniz pipeline'ı talep edin. İşe yarıyor_**

- Bu durumda Azure Functions'u düşünebilirsiniz. Özünde Azure Functions'a Python kodları yazabilir ve çalıştırabilirsiniz ancak bunu lokalde yapabilecekken neden bulutta yapasınız? Yani lokaldeki verilerinizi Azure SQL sunucusuna yüklemek istediğinizde bunu bildiğimiz _Jupyter Notebook_'lara yazacağınız Python kodları ile yapabilirsiniz. Ancak bunu Functions ile yapmanızın şöyle bir faydası olabilir:

- Azure Functions örneğin Azure Blob Storage üzerine bir "CSV dosyası yüklendiği anda bunu hemen SQL Server'a yükle " şeklindeki bir isteği icra edebilir. Bu da yine Python'la olmaktadır ancak trigger kurma imkanı vardır ve bu değerlidir.

- Azure Functions için kodları kendi bilgisayarınızda yazıp Azure buluta yollayabilirsiniz. Ancak bunu yaparken de bazı güvenlik bağlantıları ve konfigürasyonları gerekir.

- **Lokalden verileri topluca buluta taşıma durumları için Lokalde çalışan Azure File Sync gibi bir opsiyon var kolayca akla gelmiyor ancak kullanışlı.**

- PowerBI Desktop'u indirerek (Web sürümünü değil) Azure SQL veritabanınıza bağlanıp oradan verilerinizi
    - İçe aktarabilir ya da
    
    - DirectQuery olarak direkt kaynağından kullanabilirsiniz.

- PowerBI içerisinde de veri dönüşümü yapılabilmektedir bu kaynağa etki etmeden o düzeyde işleme yardımcı olur.

- DirectQuery ile bu dönüşümler bazen olmayabilir bu nedenle bağlama biçimini iyi düşünmelisiniz.

- DataBricks ile Python kodu ile dönüşüm modülü yazıp Amazon Data Factory içindeki sürükle bırak alan içerisinde kullanabilirsiniz (henüz denemedim)

**Olay Bazlı Tetiklenme**

- Azure'da diyelim ki blobstore'a bir CSV dosyası kaydettiğiniz anda onun işlenip SQL sunucuya gitmesini sağlayabilirsiniz. Burada dosyanın blob store'a yüklenmesi "olay" olup "SQL veritabanına gidiş" işlemini "tetiklemektedir."

- Bu tetikleyicileri
    - Azure Functions'da kod yazarak
    
    - Azure Event Grid'de sürükle bırak yöntemi ile yapabilirsiniz

**Zaman Bazlı Tetikleme**

- Her ayın ilk günü şuradaki CSV dosyasını SQL'e aktar şeklindeki işlem zaman bazlı tetiklemedir.

- Zaman bazlı tetiklemeyi ise en pratik olarak Azure Data Factory ile yapabilirsiniz.

**Dönüşümler**

- Veri dönüşümleri için Azure Data Factory içinde Data Flow aktivitesi kullanmalısınız. Bunu yaparek debug etmek için makine açılır. İşiniz bitince kapatın çok yazabilir ve masraflı olabilir gerçi her halükarda belirlediğiniz 1 saat veya ne kadarsa sonra duracaktır.

- Data Flow'daki aktiviteyi data pipeline ortamına sürüklemelisiniz ki çalışsın.

**Github**

Pipeline projenizi GitHub ile eşleştirin bu sayede datset, pipeline, dataflow ne varsa yedeği alınmış oluyor ayrıca bu sayede bu JSON kodlarını ChatGPT'ye sorarak çok uğraşmadan bazı ayarlamalar yapmanız mümkün oluyor.
