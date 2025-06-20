---
title: "Daily Academic Writing Journal"
author: "Suat ATAN"
date: 2025-06-19
layout: post
tags: [text mining, machine learning, local agenda, news analysis, clustering, classification]
---

**Aşağıda eskiden akademik makale okudukça günlük tuttuğum notlar var**

# 04.01.2024

https://media.licdn.com/dms/document/media/D4D1FAQHnl1D48w8Mhw/feedshare-document-pdf-analyzed/0/1703616547966?e=1704931200&v=beta&t=HRRsT9gaQDViCm5VabgL7lan5hozK0CR4EtGLqhCmHg


Sinan Özdemir'in LLM kitabından. Autoencoding LLM modelleri boşluk doldurmaya yarar.  Örnek BERT. Autoregressive modeller ise sonraki gelecek kelime veya cümleye odaklanır.  Gpt3 175B 570GB eğitim datasına ihtiyaç duyar. Modelin kendisi 700GB yer kaplar. Ama Bert training için 20GB diskte model için 1GB alana ihtiyaç duyar.

Transformers'daki encoder sol taraf yani metni anlamaya yarar. Metni alıp küçük parçalara bölüp encode eder. Sonra da sağ taraf da metin üretir. İçteki katmanlar daha çok optimizayson vs. içindir. Bu iki model yani encoder ve decoder bir araya gelince seq2seq modeli olmuş olur.

Autoregressive modeller metin yazma için iyi iken audoencoding modeller  (BERT gibi) metin sınıflandırmaya iyidir.

İkisinin miksi olan T5 modeli vardır. Bu hem metin üretme hem de metin sınıflandırma için eğitilebilir.

bu onları daha güçlü kılar. GPT ailesi decoder only dır.

BERT Wiliedpai ve BookCorpus ile eğitilmiştir.

Sayfa 26 note kısmına kadar geldım.


# 11.11.2021
Scraping with Python kitabında iki yeni bilgi

Ponti: Görsel scraping olayı
Scrapely: Makine öğrenmesi ile farklı sitelerden scraping yapabilme opsiyonu
Scra.py: En hızlı scraper ama bloklama ihtimali var.

# 04.11.2021

Scraping with Python kitabını okuyorum. Kazınan dosyalar sisteme kaydedilmek yerine Redis'e kaydedilmeli. Redis direkt key value sistem. Servis olarak çalışır.
Aynı kitapta bu işlem için hazır bir
Python kütüphanesi olduğunu öğrendim. requests-cache
Bu sayfaları indiriyor, cache de varsa indirmiyor. Diğer yandan redis mongo ve sqlite ile çalışıyor.

Çok. sayfa varsa bu durumda paralel download mümkün
Eğer ayrı ayrı domainde sayfa varsa ve çoksa sırayla
Çekmek yerine paralel harika olur delaya da gerek kalmaz

Paralel yöntem 1: multithreading: işlemci a URLsini indirirken yavaşlama veya durma olursa başka bir thread bekleme yapmadan kuyrukta başka URL i alır

# 05.05.2020

son kaldığım sayfa: 5

**Antons, D., Grünwald, E., Cichy, P., & Salge, T. O. (2020). The application of text mining methods in innovation research: Current state, evolution patterns, and development priorities. R and D Management. https://doi.org/10.1111/radm.12408**

Grünwald ve arkadaşları çalışmalarında metin madenciliğinin özel bir kullanım alanından söz etmektedir: Metin madenciliği ile inovasyon araştırmaları.  İnovasyonun metin madenciliği ile takip edebileceğine gönderme yapan bu literatür bahse konu  çalışmada taranmıştır.

>124 adet dergi taranmıştır bu dergilerden 10'u premier "innovation management" dergisidir. Buradan şunu anlıyorum. İnovasyon yönetimi diye alt bir alan var.

**Metin madenciliği kelime sıklıklarına dayalıdır**: Text mining techniques that rely on word frequency counts to measure contextual, psychological, linguistic, or semantic concepts and constructs are among the most widely adopted approaches for computer-aided analysis of textual data in management related research so far (Duriau et al., 2007; Short et al., 2010).

**Literatür review'in de bir yöntemi vardır:** To provide scholars with a structured overview of the state and evolution of text mining application in the field of innovation research, we conducted a systematic literature review (Mulrow, 1994; Tranfield et al., 2003; Denyer and Tranfield, 2009). We proceeded in the following way.

Literatür review'in nasıl yapılacağına dair makaleler:

- Mulrow, C.D. (1994) Systematic reviews: rationale for systematic reviews

İnovasyon yönetimi ile ilgili bulduğu en önemli dergiler (ileride makale yollanabilir)

- (1) Research Policy, 
- (2) Journal of Product
- (3) R&D Management,
- (4) Technological Forecasting and SocialChange, 
- (5) Research-Technology Management,
- (6) Technovation, 
- (7) Industrial and Corporate Change, 
- (8) IEEE Transactions on EngineeringManagement, 
- (9) the Journal of TechnologyTransfer
- (10) the Journal of Engineering andTechnology Management. 

**Bu çalışmada izlenen literatür tarama metodu**

- En etkili dergileri seç (yukarıda)
- Bu dergilerde önceden açıkça belirlenmiş anahtar terimlerle arama yap (adam bunu makale ekine koymuş) Bu çalışma için için anahtar terimlerinde  text mining, sentiment analysis geçen makaleleri listelemiş
- Bu şekildeki tüm makaleleri indirmiş ancak ilgili olmayanları elle elemiş. (Text mining'de sen de kullanabilirsin)
- Ortada farklı dergilerden 124 makale kalmış
- We applied a combination of bibliometric analysis and manual coding (Alta bak)
- Makale kategorileri belirle (bu çalışmada R için uygulama makaleleri, reviewler ve tanıtım makaleleri olarak belirlenmiş)
- 

**Bibliyometrik çalışmalar için R paketi**
>As for the bibliometric analyses, the R-package ‘bibliometrix’ was used. The package provides several tools for quantitative research models in bibliometrics and scientometrics. The functional scope includes importing and formatting of raw data, the actual bibliometric analyses, as well as the creation of matrices and networks for the visualization of co-citations, couplings, collaborations, and co-work analyses. 

**Bibliyometrik çalışmalar için R verisi**
> After importing the data from the Web Of Science in BibTex format, we used the individual
meta-information to extract the author keywords and to build a co-occurrence network. Subsequently, adopting the Louvain-clustering method, we visualized the distribution and grouping of the author keywords.

**Çoğu metin madenciliği çalışması makaleleri analiz eder, ikinci de patentler vardır**

>With regard to the type of textual data analyzed, we found that 48 articles investigate research papers and 44 analyze patents. Less frequently studied are texts like blog posts and forum entries (12), newspaper articles (7), tweets and other social media entries (5), and product reviews (3). Other texts like annual reports, emails, press releases, interviews have each only been analyzed once. Interestingly, we find a broad variability with regard to the amount of texts that have been used. Of the 124 articles, 58.9% use less than 10,000 texts, 22.6% use more than 10,000 but less than 100,000 documents, 4.8% analyze more than 100,000 but less than 1,000,000 texts, and 13.7% investigate even more than 1,000,000 texts.

## Bu makale ile daha önceden hiç bilmeyip öğrendiğim şeyler

- Literatür taramasının nasıl olacağına dair makaleler vardır.
- Bu çalışma ile literatürü nasıl tarayacağımı öğrendim
- R'da bibliometrix adlı bir kütüphane vardır ve bu kütüphane ile bir çok bibliyometrik analiz gerçkleitirilebilir
- Web of science'den bibliyometrik veri indirilerek analiz yapılabilmektedir.
- Adam 124 makalelik koleksiyonuna da corpus demiş
- Metin madenciliği ile ilgili çalışmalarda 2015 yılından sonra ciddi artış olmuştur

## Yeni Makale Fikirleri

- Türkçe literatürde inovasyon araştırmalarına dair literatür taraması. Bu makale çok iyi olabilir. Özelliklşe [şuradaki](https://bibliometrix.org/screenshots/index.html) ekran görüntülerinden yapılabilecek çalışmalar çok heyecan verici gözüküyor. Ayrıca TTGV için de işe yarayabilir. Ya da ticarileştirilebilir. Özellikle ülkeler arası collaboration harika bir harita sunmakta


# 04.05.2020

Using Machine Learning to Measure Changes in Cable News Coverage of Immigration (2014-2019). (t.y.). Microsoft Social Sciences. https://doi.org/microsoft_corporation.25104.1106

Bu makale metin madenciliği ile göçmenler hakkında Trump'un göreve başlama konuşmasından sonra ortaya çıkan haberleri ve tarihi ele alıyor

# 20.02.2020 - Kmeans

**Dunn indeksi** elde edilen kümeler arasındaki uzaklığı da dikkate alan bir ölçüttür.  Doğal olarak bu değer ne kadar büyük olursa kümelerin birbirinden o  kadar uzakta olduğu anlaşılacaktır. Bu durumda K-Means algoritmasının daha ayrıştırıcı ve net olduğu ortaya çıkar. 
Dunn indeksi *inter-cluster distance* yahut kümeler arası uzaklık olarak da adlandırılmaktadır.  Formülü ise Intertia indeksine göre bir derece daha karmaşık bir formüldür. Intertia değerinde bir kümeye ait ağırlık merkezi ile çevresindeki yakın noktalara olan uzaklık toplamı önceki formülde olduğu gibi $Ig$ iken Interia değeri tüm kümelere ait değerler toplamı idi $\Sigma I_g$, burada tüm $I_g$ değerlerinin en küçüğü $min(I_g)$ olsun. Bir kümenin $g_i$ diğer  küme $g_j$ ile arasındaki  uzaklık ise $E_{g_i,g_j}$olsun. Bu değerlerin en büyüğü de $min(E_{g_i,g_j})$ olarak gösterilsin. Bu durumda Dunn indeksi $D$
$$
D = \frac{max(E_{g_i,g_j})}{min(I_g)}
$$
olacaktır. Burada tüm kümelerin oluşturduğu evrende herhangi iki küme arasındaki uzaklık büyüdükçe (pay) Dunn indeksi küçülecektir. Inertia değeri de küçüldüğünde Dunn Indeksi büyür. Yani kümeler arası ayrışım daha net hale gelir.

**Peki bu değerleri ne için kullanırız?** 

En başta gözetimsiz algoritmalardan biri olan K-means algoritmasının dışarıdan aldığı tek değerin $k$ adet küme değeri olduğunu ele almıştık. Bu durumda eldeki verilerin içeriğindeki küme adedinin bilinmediği durumlarda yanlış $k$ değerinin analiz sonuçlarını yanıltacağı açıktır. İşte bu durumlarda yukarıdaki iki ölçüt en uygun $k$ değerini bulmak için kullanılabilir. Böyle bir durumda $k=2$ değerinden başlanarak K-Means algoritması ile kümeleme analizi yapıltıktan sonra   Inertia değeri hesaplanır, daha sonra $k$ değeri arttırılarak aynı ölçütler yeniden hesaplanır ve bu istenen $k$ miktarına kadar devam edilir. Bu durumda ortaya çıkan Inertia değerlerinin en küçük olduğu $k$ değeri (ya da değerlerinden biri) seçilerek bu değer doğru kabul edilir ve bu $k$ değerine göre üretilmiş kümeler artık veri setindeki kayıtların etiketleri olarak ele alınır.



#  19.02.2020 - KMeans

Görüldüğü üzere K-Means algoritması dışarıdan herhangi bir eğitim verisi almamakta sadece $k$ olarak belirtilen ortaya çıkarılacak küme sayısını almakadır. Bir algoritmanın *gözetimsiz* algoritma olarak nitelendirilme nedeni budur. Ancak $k$ değerinin belirlenmesi zorunludur. Normalde örneğin içeriğinde kredi örneğinde olduğu gibi *borcunu ödeyenler* ve *ödemeyenler* şeklinde iki grubun olacağı önceden biliniyorsa zaten iki grup olduğundan $k=2$ denecektir. Peki, grup sayısının bilinmediği durumlarda ne yapılmalıdır? İşte bu durumda rastgele bir $k$ sayısı seçilebilir ancak bu gerçekçi olmayıp aslında daha fazla sayıda grup varsa grupların birleşmesine, daha az sayıda grup varsa aslında olmayan grupların varmış gibi ortaya çıkmasına neden olabilir. Ancak $k$ değerinin optimal bir değeri vardır ve bu değer seçildiği takdirde gerçek veya ona en yakın sayıdaki kümeler belirlenebilir. Bu optimal $k$ değerinin hesaplanabilmesi için K-Means algoritmasının iki temel ölçütünden söz etmek gerekir.

**Inertia Değeri:** K-Means algoritması tarafından bulunan gruplardaki her bir noktanın  bu grubun ağırlık merkezi olan  ($c_1, c_2$ gibi) noktaya uzaklıklarının toplam değeridi o grup için $I_g$ olsun. Bu değer tüm kümeler için hesaplanır ve genel toplam alınır $ \Sigma I_{g}$. Bu değerin küçük olması tercih edilir nitekim gruptaki noktalar ağırlık merkezine ne kadar yakında o kümedeki noktaların o kadar benzer sınıfta olduğu kabul edilir. Bu *inertia* değeri "küme içi uzaklık" ya da *intra cluster distance* olarak da bilinmektedir.

Inertia değeri her bir kümenin kendi içinde ağırlık merkezi ile grup içindeki noktaların arasına odaklanmakla kümelerin kendi aralarındaki uzaklıkları göz ardı etmektedir. Eğer iki küme arasında mesafe çok yakın ise küçük intertia değerine rağmen bazı noktaların (ara bölgelerde) hangi kümeye ait olduğu net olmayabilir. 

TODO: Opsiyonal: Bir örnek verebilirsin yakın kümelere

Bu durumda kümeler arası uzaklığı da maksimize edecek bir değer daha vardır. Dunn Index

# 18.02.2020 - KMeans

 TODO: Bir grafik, yaş eğitim ve kredi ödeme ile ilgili. Yaşlı ve yüksek eğitimliler mavi ile işaretlenecek sağda onlar kredisini ödüyor

K-Means algoritmasın şekli yukarıdaki gibi basit bir örnekle açıklanabilir. Bu örnekte sadece iki parametre söz konusu olduğundan veriler grafiğe döküldüğünde kümeler kolayca görülebilmektedir. Üç boyutlu olarak da bu durum görsel hale getirilebilir ve kümeler görülebilir ancak daha fazla boyutta yani daha fazla parametrenin söz konusu olması halinde görselleştirilme söz konusu değildir. Bu nedenle kümelerin sayısal olarak bulunması gerekir. K-Means algoritması bu kümeleri şu şekilde bulmaktadır.

Adım 1: Öncelikle kaç adet küme bulunacağına ($k$) karar verilir. 

Adım 2: Daha sonra her bir olası küme içerisindeki noktalardan  tesadüfi bir nokta ya da ağırlık merkezi (centroid) seçilir. Bu sayı en $k$ sayısı kadar olmalıdır.

Adım 3: İlk belirlenen her bir ağırlık merkezine en yakın noktalar bir küme olarak işaretlenir. Örneğin  $k=2$ olduğu durumda iki ağırlık merkezi ve $k_1$ ve $k_2$ noktalarıdır. $k_1$ ağırlık merkezine en yakın noktalar grubu $g_1$, $k_2$ ağırlık merkezine en yakın noktalar grubu ise $g_2$ olarak işaretlenir.

Adım 4: Her bir grubun koordinat sistemindeki ağırlık merkezi yeniden hesaplanır. Bu ilk hesaplamadaki ağırlık merkezi her bir grup için $c_{g_1-i_1}$, $c_{g_2,i_1}$ olarak gösterilsin. Ağırlık merkezi gruptaki her noktaya en yakın yeri ifade eder. Burada bir nokta olmak zorunda değildir. Buradaki $i_1, i_2$ şeklindeki notasyon iterasyon (hesaplama) nosudur.

Adım 5: Bir önceki adımda hesaplanan ağırlık merkezine en yakın noktalar yeniden gruplanır. Bu durumda 3. adımdaki gruplandırma değişebilir. Yani $g_1$ ve $g_2$ grubu  içindeki noktlalar değişebilir. Yeniden gruplandırma sonrası Adım 4'e dönülür ve yeni ağırlık merkezleri hesaplanır bu durumdaki yeni ağırlık merkezi $c_{g_1-i_2},c_{g_2-i_2}$ şeklinde iterasyon sayısına göre artacaktır

Bu durum durdurulmadığı takdirde Adım 4 ve Adım 5 sonsuza kadar sürebilir. İşte tam bu noktada K-means algoritmasının mantığı devreye girmekte ve süreci bir yerde keserek son tahlilde oluşan grupları küme olarak kabul etmektedir. Peki algoritma ne zaman duracaktır?

K-Means algoritması üç özel durumda durur:

Durum 1: Algoritma devam ettiği halde Adım 4'teki ağırlık merkezlerinin $c_{g_1},c_{g_2}$  yeri artık yeni hesaplamaya rağmen değişmiyorsa.

Durum 2:  Algoritma devam ettiği halde her iterasyonda gruplar ($ g_1,g_2 $) değişmiyorsa.

Durum 3: Algoritma için önceden belirlenmiş bir iterasyon sayısına erişildi ise. Örneğin $i=10.000$ olduğunda durum 1 ve durum 2 olmasa dahi algoritma durur.

Yukarıda sayılan durumlarda K-means algoritması duracak ve artık son elde edilen gruplar küme kabul edilecektir.

https://app.getpocket.com/read/2696383230

# 13.02.2020 paper-togg

Konu ile ilgili medyada çıkan haberler genellikle olumlu da olsa, bazı kaynaklar ise bu projeyi vadedilen üretim süresinin çok kısa olması, Hint ve Çin markaları olan Tata ve Gelly'in tasarımının dahil tamamının üretici devletin kaynakları ile ortaya çıkarılması gibi konuları ele alarak eleştirmektedirler. Teknik olarak bu tartışmaların dışında, konu ile ilgili çıkan her türden haberlerin vurgu yaptığı konuların ne olduğunun incelenmesi araç hakkındaki genel anlayışı ve ortaya çıkacak beklentilerin anlaşılmasına yardımcı olabilir.

NOT: Gözetimsiz algoritmalardan K-Means ve Chi-Square kullanarak olumlu ve olumsuz haberlerde en sık görülen kelimeler ve bigramlar ortaya çıkarılabilir. Bu sayede haberlerin vurguladıkları yönler anlaşılabilir. Yine otomobili merkeze alan özel bir kavramlaştırma haritası üretilebilir. 

# 05.02.2020 paper-togg

Yerli ve milli olarak ifade edilen TOGG otomobillerle ilgili yayınlanan haberlerin genel içeriğinin incelenmesi bu konuda medyanın yaklaşımını ortaya çıkarmak bakımından faydalıdır. Ayrıca ilgili araba ile ilgili hangi özelliklerin öne çıkarıldığı hususu da bu analiz neticesinde ortaya çıkacaktır. Diğer taraftan genellikle olumlu haberler çıkan TOGG için olumsuz haberler de analiz edilmiştir. Olumsuz haberlerin de gündemini belirlemek ve temel noktaları ortaya çıkarmak önemlidir. 

# 04.02.2020 free

WordNet, Princeton üniversitesi tarafından geliştirilmiş bir veri tabanıdır. Bu veri tabanında bir kavram ile ilişkili tüm kavramlar listelenmektedir. Eş anlamlılık ve benzeri tüm ilişkiler bu veri tabanında mevcuttur. WordNet açık kaynaklı olup herkesin ücretsiz olarak kullanımına açıktır ve her dil için versiyonu bulunmaktadır. Wordnet'te örneğin "pencere" kelimesi aratıldığında onun "holonym'i" olan "ev" kelimesi ya da "hararet" kelimesinin eş anlamlısı olan "sıcaklık" kelimesi gibi tüm ilişkiler gelir.

WordNet neden önemlidir. Özellikle BoW modeli ile analizde söz gelimi hava durumu haberleri ile ilgili bir analizde "yağmur" kavramı en çok görülen kavram olsun,  "hararet", "sıcaklık", "ısı" gibi kelimeler de sırası ile sık görülen diğer kavramlar olsun. Normalde 3,4 ve 5. kavramların her biri sıcaklık ile ilgilidir ve bu kavramlar bir araya getirildiğinde aslında en sık görülen kavrama dönüşecektir. İşte bu durumda WordNet veya benzeri bir yapının önemi ortaya çıkar. Burada "hararet", "sıcaklık" ve "ısı" kavramları "synset" olarak adlandırılır. Psikolojik olarak insan zihninde aslında çok yakın bir imgeye işaret ederler.

# 03.02.2020 free

SIMNET diye bir metot var tam anlamadım ancak edindiğim izlenim şu:

Metin madenciliğinde bir çok yöntem kelimelerin varlığı veya yokluğuna dayalıdır. Bu varsayım, bir dizi farklı metinden oluşan bir kümede (korpus) kullanılan tüm kelimeler için standart bir yazımın mevcut olduğunu, yazım hatalarının ise çok az olduğu varsayımını gerektirir. Standart metinlerin çoğu için bu durum geçerlidir. Yazım hataları analize zarar vermeyecek kadar azdır. Ancak gerek dilin doğası, gerekse metinleri kaleme alan insanların alışkanlıkları bir olgu farklı kelimeler (eş anlamlı) ele alınabilir ya da bu kelimeler kullanılmaksızın ifadeler dolaylı olarak anlatılabilir. İşte bu tür bir durumda metin madenciliği için önemli bir zorluk ortaya çıkmaktadır. Gözetimli makine öğrenmesi olmaksızın bu problemlerin kelime sıklıklarına dayalı olarak çözümlenmesi çok zordur.  

Bag of words modeli şudur:

> The **bag-of-words** (BOW) model is a representation that turns arbitrary text into **fixed-length vectors** by counting how many times each word appears. This process is often referred to as **vectorization**.

Yani BoW metodu aslında bir korpusu, doküman-terim matrisi olarak adlandırılan dikey eksende dokümanları tanımlayan kimlik bilgisinin (numara, no, seri no vs.), yatay eksende ise kelimelerin (tekrar etmeksizin) yer aldığı bir matristir. Bu matristeki her bir hücre kesişim eksenlerindeki doküman-kelime ikilisinin tekrar adenini gösterir. Bu sayede harhangi bir korpus sayısal olarak gösterilmiş olur. Bir örnek:

# 02.02.2020 free

EN YÜKSEK DERECE MERKEZİLİĞİ EN BÜYÜK ÖNEM MİDİR

Bir ağdaki herhangi bir düğüme $n_i$  ait bağlantı sayısı o düğüme ait derece merkeziliğini $d(n_k) $ ifade etmektedir. Derece merkeziliğinin dağılımı, doğal ağlar için, genellikle istatistiksel olarak *uzun kuyruk* olarak tanımlanan, yani belirli az sayıda bulunan düğümlerin derece merkezilik değerlerinin çok fazla, geri kalanların derece merkezilik değerlerinin çok az olduğu bir yapıdadır. Doğal olmayan bir ağ (bilgisayar tarafından oluşturulmuş) için derece merkeziliği dağılımı uzun kuyruk yapısında değildir. Derece merkeziliği genellikle bir düğümün çeşitli bakımdan önemini ifade etmek için kullanılmaktadır. Örneğin bir sosyal ilişki ağında en yüksek derece merkeziliğine sahip kişi büyük ihtimalle en önemli kişidir. Ancak bu derece merkeziliğinin sayısal olarak yanıltıcı olduğu durumlar da söz konusudur. Örneğin bir iş yerinde e-posta alma ve gönderme ilişkileri ağ diyagramına dönüştürüldüğünde en büyük derece merkeziliği o şirketin yöneticilerine ait olacaktır. Ancak öte yandan sosyal ve mali işler gibi bir birimdeki yönetici de derece merkeziliğine dayalı önem bakımından şirketin üretim departmanından daha önemli olarak görülebilir.  

AHP  + ÇOKLU AĞ ANALİZİ

Bunu yanılgıya düşmemek için alınabilecek önlemlerden biri önem analizinde bir düğüme ait sadece tek bir ağ değil farklı ağlar (örneğin aynı iş yerindeki telefon aramaları ağı) gibi bir ağ için de derece merkezilik değerleri hesaplanarak bu değerlerin normal veya özel olarak belirlenmiş ağırlıklı ortalaması alınabilir. Peki hangi ağın ne kadar önemli olduğu nasıl belirlenebilir? İşte bunun için ise elde bulunan ağlardaki derece merkezililk değerleri AHP ile bulunan önem değerleri ile ağırlıklandırılarak ortalaması alındıktan sonra elde edilen değerler önem derecesi olarak ele alınacaktır.

Matematiksel olarak ifade edilecek olursa, $N_i$ ağı için bir düğümün $n_k$ derece merkeziliği $d_i$, $N_j$ ağı için bir düğümün derece merkeziliği $d_j$ olmak üzere, mevcut ağlar $N=(1,2,3...n)$ AHP analizinde $N_i$ ağı için önem derecesi $w_i$ olsun.  Bu durumda $n_k$ düğüme ait önem $\theta_k$: 
$$
\theta_k = \Sigma_i d_i.w_i
$$
olarak gösterilebilir. 

Bunun yerine derece merkezilikleri ile ilgili birimin herhangi başka bir özelliği kullanılarak makine öğrenmesi de yapılabilir.


# 01.02.2020 paper-tmnovdet

Gözetimsiz algoritmaların gözetimli algoritmalara üstünlüğü eğitim verisine ihtiyaç duymamasıdır. Bu durum analizlerin elde  eğitim verisinin bulunmadığı durumlarda faydalı olacaktır. Öte yandan kümeleme algoritmasının olası tüm kümeleri kendi buluyor olması da veri seti içerisinde araştırmacı tarafından görülemeyecek kümelerin tespitine ya da mevcut kümelerden daha da küçük ve homojen alt kümelerin ortaya çıkarılmasına yardımcı olabilir.   

# 31.01.2020 paper-tmnovdet

K-Means algoritması herhangi bir veri seti içerisinde sınıflandırma yaparken algoritma için lazım olan tek bilgi kaç adet küme belirleneceği (k) bilgisidir. Girilen bu değer ne olursa olsun algoritma ilgili sınıfları bulacaktır. Ancak bu algoritma için ideal *k* değerinin belirlenebilmesi için *inertia* ölçütünün minimum olması gerekir. Bu değer kümenin ağırlık merkezinin kümenin elemanlarına uzaklıklarının toplamıdır. Kümelerin her biri için hesaplanan bu değerlerin genel toplamı ne kadar küçük olursa, kümelerin birbirinden uzaklıkları o kadar büyük olacaktır. 

TODO: K-means algoritmasının çalışma şekli

Şekilde görülen yaş ve gelir düzeyi ile ilgili grafikte kümeler açıkça görülebilmektedir. İki parametreden oluşan böyle bir grafikte kümeleri herhangi bir algoritma kullanmadan da belirlemek mümkündür. Ancak parametr sayısı arttığında bunun grafiksel olarak görümesi olanaklı değildir. Aynı şekilde bazı durumlarda kümeler grafikte kolayca fark edilmeyecek bir durumda da olabilir. 



# 30.01.2020 paper-tmnovdet

Metin madenciliğinde kullanılan **gözetimsiz** algoritmalardna biri de K-means adlı algoritmadır. Bu algoritmanın Python Sklearn kütüphanesi ile yazılmış versiyonunda girilen k parametresi kadar kategori bu algoritma tarafından otomatik olarak belirlenir metin setindeki her bir kelime ile eşleştirilir. 

TODO: Örnek

TODO: Çalışma şekli

# 29.01.2020 paper-tmnovdet

Metin seti içindeki bir kavramın yeni bir kavram olup olmadığını tespit edebilmek için öncelikle bu metin setinde görülen tüm kategorilerin sınıflandırılarak bu sınıflandırmaların hiç birine uymayan bir metnin ya da kavramın "yeni" olarak nitelendirilmesi mümkündür. Böyle bir yol izlenecekse öncelikle metin madenciliğinde kullanılan "sınıflandırma (classifying)" ve "kümeleme (clustering)" yöntemlerinin tanımları ve aralarındaki fark ele alınmalıdır. Elde bulunan bir metin setinde bu metinde bulunan kategoriler (sınıflar) **önceden biliniyor** ve bu bir tahmin edici makine öğrenme algoritmasının sadece bu kategorileri metinlerle eşleştirmesi isteniyorsa bu yöntem **sınıflandırma** olarak kabul edilmektedir. Yaygın kullanılan makine öğrenme algoritmalarından NaiveBayes, SVM, Decision Tree ve Random Forest gibi algoritmaların yanında derin öğrenme algoritmaları da bu tahminleri yapabilir. Sınıflandırmaya örnek olarak şu örnek vaka verilebilir:

*Örnek Vaka 1: Bir haber sitesinde önceden veri tabanında bulunan bir milyon adet haber bulunmaktadır. Bu haberlerin sadece yirmi bin adedi "ekonomi","sağlık" ve "politika" olmak üzere üç kategoriye sahiptir bu kategoriler haberlerin yer aldığı sütunun hemen yanındaki sütunda yer almaktadır. Geri kalan haberlerin de sadece bu üç kategori içerisinde yer aldığı bilinmektedir. Bu durumda **sınıflandırma** algoritmaları ile yirmi bin adet haber makineye öğretilir ve eğer tatmin edici bir tahmin gücü elde edilirse (yine yirmi binlik veri seti üzerinde test edilerek) geri kalan haberlerin tamamı otomatik olarak etiketlenir.*

NaiveBayes, SVM, Decision Tree ve Random Forest gibi makine öğrenme algoritmalarının temel ortak noktası sadece sınıflandırma yapmak değildir. Bu algoritmalar değer tahmini de yapabilirler. Ancak esas ortak özellik, bu algoritmaların **öğrenmek için örnek vakada ele alınan yirmi binlik öğrenme verisi** gibi veriye muhtaç olmalarıdır. Başka bir deyimle bu algoritmalar hariçten bir öğrenme verisi olmadan herhangi bir tahmin gücüne sahip değildir. Bu nedenle bu algoritmalar **gözetlemeli (supervized)** algoritmalar olarak tanımlanırlar.  Örnek vaka 1'de algoritma yirmi binlik veri setinden etiketleri **öğrenmiştir**.

Diğer yandan bazı algoritmalar dışarıdan öğrenme verisine ihtiyaç duymadan veri seti içerisindeki yapılara bakarak bzı çıkarımlar yapabilirler. Bu algoritmalar ise **gözetimsiz (unsupervized)** algoritmalar olarak tanımlanırlar. Bu algoritmalara örnek vaka 1'deki yirmi binlik öğrenme verisi vermeye gerek yoktur. Algoritma direkt olarak bir milyonluk ana veri seti içerisindeki olası kategorileri çıkarabilirler. İşte bu durumda önceden herhangi "ekonomi", "sağlık" ve "politika" gibi etiketler dışında gözden kaçan "magazin" gibi bir etikete tekabül edecek yapıların tespiti de mümkündür. Bu gözetimsiz algoritmalar etiketlerin adlarını vermez, bunun yerine veri setindeki önceden belirlenen örneğin *k* sayısı kadar sınıfı bulup bunlara bir sayı değeri atar, daha sonra bunlara tekabül eden terimleri eşleştirir. Bu sayı değerleri altındaki kavramlar incelendiğinde bu kavramların genellikle insanlar tarafından adlandırılmış "ekonomi", "sağlık" veya "politika" gibi kategorilerle eşleştiği görülür. Bu ikinci durumda **önceden belirlenmiş** bir kategori seti bulunmamaktadır. Bu nedenle bu işlem bir **sınıflandırma** değil **kümeleme** işlemi olmaktadır. Kümeleme ile sınıflandırmanın temel farkı şudur: Kümeleme yaparken tahmin edilecek kategorilerin listesinin önceden belirlenmesine gerek yoktur.

Yarın: K-means ile metin kategorizasyonunu anlat

# 28.01.2020 paper-tmnovdet

Metin madenciliği ile ilgili teknikler genellikle kelimelerin sıklığına dayalıdır. En basit şekliyle çok sayıda dokümanın içerisinde en sık/yaygın kelimeleri çıkarmak da bir metin madenciliği yöntemidir. Kelime sıklığına dayalı analizler sık görülen kelimelerden doğası gereği sık görülen kelimelerin (bağlaçlar gibi) ayıklanmasını gerektirir. Bu ayıklamadan sonra sık  görülen kelimeler tüm metinler hakkında bir hüküm verilebilmesine olanak verir.  Bu durum aslında en çok "görüleni" ortaya çıkarmaya yardım eder.  Bir metin seti makine yerine insan tarafından okunduğunda varılacak hükümler yakındır. Diğer taraftan sadece bir veya daha fazla metin setinde görülen bir gündem, tema veya kavramın söz konusu olduğu durumda kelime sıklık listesinin en üstündeki kelimeler değil, en altındakiler önemli hale gelir. Ancak bu "en az" görülen veya sadece bir kez görülen kelimelerin listesi de uzun olduğunda hangi kavramın tesadüfen az görülen bir kavram olduğu hangi kavramın da gerçekten yepyeni bir kavram olduğunu ölçmenin bir yolu var mıdır? Bu yepyeni kavramın gelecekte daha sık tartışılmaya başlanarak bu metin seti içerisinde yer alıp almayacağını ölçmenin bir yolu var mıdır? 


# 27.01.2020 - paper-localagenda-beingused

Bu çalışma kapsamında geliştirilen makine öğrenme algoritması Türkçe haber siteleri ile ilgili olarak iki sorunun cevabının bulunmasına yardımcı oldu: İlki, ulusal düzeyde yayın yapan haber sitelerinde Türkiye'deki herhangi bir il adı aratıldığında yerel olması beklenen haberlerin ne kadarının gerçekten yerel haber olduğunun anlaşılması idi. Diğer soru ise, bu yerel haberlerin gerçekten en çok hangi konuları ele aldığıydı. 

İlk sorunun cevabının haber sitelerinin okuyucuların ilgisini haber sitelerinde tutmak amacıyla aslında yerel olmayan haberleri de gösterdiği gerçeğidir. Haber sitelerinin yerel ve yerel olmayan haberleri bir arada göstermek suretiyle okurun ilgisini sürdürmeyi amaçlaması olasıdır. Bu durum kasten olmayarak ilgili sitelerin arama motoru algoritmaları ile ilgili bir problemden kaynaklanıyor da olabilir.   

İkinci sorunun cevabı ilk soruya göre algoritma tarafından yerel olmadığı kesine yakın doğrulukta bilinen haberlerin elenmesinden sonra ortaya çıkarılmıştır. Bu yapılırken, haberlerin "ilgili olabilecekleri" bilinen olay, yazılı kaynağa dayalı olma ve özgün haber şeklinde üç tipe göre etiketlemesi yine algoritma tarafından gerçekleştirilmiltir. Buna göre haberlerin çoğunun olaya dayalı haberler (hava durumu, trafik kazaları toplantılar vs) olduğu, daha sonra de yazılı kaynaklara dayalı haberlerin (mahkeme kararları, yazılı açıklamalar vs.) ikinci sırada yer aldığı görülmüştür. Özgün haberler ise en son sırada ve çok az sayıdaki haberlerde görülmüştür. Haberlerin tamamında hakim olan bu sıralama herhangi bir haber kaynağı ya da herhangi bir ile ilgili haberlerde değişmemiştir.  

Haberlerin genellikle olayları ele alması, bu olayların da neredeyse sadece hava durumu, trafik kazaları, mahkeme kararları, gibi haberler ziyaretleri şeklindeki içeriklerden oluşması hususu bu çalışmadaki en teme sonuçlardan biridir. Haber sitelerinin çoğunun ajans haberlerinden beslenmesi ve haberlerde derinlemesine içerikten ziyade sürekli ve güncel bir akışın sağlanmaya çalışılması niyeti bu durumun nedeni olarak görülmektedir. Haberlerde kullanılan kelime hazinesinin TODO olması ve bunun da özellikle daha az bir anahtar terim etrafında dolaşması bunun diğer bir göstergesidir. Yerel haberler içerisinde görülen yerel olmayan haberler de bu niyeti doğrulamaktadır.

Bu çalışmada geliştirilen özel makine öğrenme algoritması haber sitelerinin içeriklerinin sınıflandırılmasında  yerel - yerel olmama durumunu %TODO doğrulukta tespit etmektedir. Bu algoritma veya benzerlerininin bu güçte tespit kapasitesi haberler üzerine araştırmalar yapan araştırmacıları için özel bir araç olarak kullanılabilir.  Diğer taraftan haberlerin ele aldıkları konuları incelerken metin madenciliğinin kullanılması da haber analitiği için başka bir kullanışlı araç olarak ortaya çıkmaktadır.

Çalışmanın sonuçlarının başka araştırmalarla doğrulanması da olasıdır. Diğer yandan bu çalışmada kullanılan mühendislik-yoğun  metot ve yaklaşımların medya üzerine gerçekleştirilecek yeni çalışmalarda özellikle sosyal bilimler alanında farklı ve yeni araştırmalara yardımcı olacağı düşünülmektedir. Sosyal bilimlerin fen bilimleri alanında görece daha yaygın olan araçlardan beslenmesi dünyada da gittikçe yaygınlaşan bir olgudur.

# 26.01.2020 - paper-localagenda-beingused

Hazırlanan sınıflandırma algoritması yerel ve yerel olmayan haberleri % TODO doğrulukta tespit etmiştir. Bu algoritma ile yerel haberler olarak derlenen veri seti 1'deki tüm tüm haberlerin yerel olup olmadığı tahmin edilerek, yerel haber olmadığu halde yerel haberler arasında görülen haberlerin oranı tespit edilmiştir.

İstistansız olarak tüm haber sitelerinin arama sayfalarında il adları yazıldığında o il ile hiç ilgisi olmayan haberlerin de geldiği görülmüştür. Buna göre kayank olarak kullanılan haber sitelerinden hangisinin sonuç sayfalarında yazılan arama terimine "sadakati" % olarak ŞEKİL todo'da gösterilmiştir.

NOT: Yerel olmayan haberler elendikten sonra haberlerin konuları hakkındaki analizi yapmak daha isabetli olabilir. Bu nedenle önce yukarıdaki paragrafın ele aldığı kısımlar sıraya konmalı daha sonra da yerel gündemler.

Yarın: Sonuç üret, sonucu düşün

# 24.01.2020 - paper-localagenda-beingused

**Başlık: Algoritmaların Dorğuluklarının Ölçümü**

Bir sınıflandırma algoritmasının tahmin gücünün **doğruluğu** (accuracy) tahmin ettiği sınıfların yüzde kaçının gerçekten o sınıfta olduğunun göstergesidir. Algoritma'nın %98 doğrulukta olması algoritmanın 100 gözlemin sınıfının 98'ini doğru tahmin ettiği, 2'sini ise yanlış tahmin ettiği anlamına gelir.

|Algoritma/Gerçek| Negatif | Pozitif|
|---------|-----------|-------|
|Negatif| TN |FP|
|Pozitif| FN | TP |

*TODO: Tabloyu şöyle yap: https://towardsdatascience.com/accuracy-precision-recall-or-f1-331fb37c5cb9*

Yorumlarken: https://medium.com/data-science-tr/s%C4%B1n%C4%B1fland%C4%B1rma-modellerinde-ba%C5%9Far%C4%B1-kriterleri-2d86488799c6

https://stanford.edu/~shervine/l/tr/teaching/cs-229/cheatsheet-machine-learning-tips-and-tricks

Bu ölçütler bir algoritmanın doğruluğunu değerlendirirken algoritmayı farklı bakış açılarına göre ele almayı sağlamaktadır. Bununla ilgili şu örnek verilebilir: Bir kişinin en ufak bir ihtimal de olsa kanser teşhisini yakalamak isterken TODO skorunu kullanırız. Bu skor yükseldikçe genellikle kanser olmayan kişilerin de kanserli  olarak değerlendirilme olasılığı vardır. Ancak bu durumdan geri dönülebilir. Öte yandan bir kişinin suçlu olup olmadığını tespit ederken bu eşik yerine TODO kullanılabilir. Nitekim suçsuz birinin suçlu muamele görmesi ihtimalindense az da olsa suçlu bir kaç kişinin masum değerlendirilmesine razı gelinmiş olmaktadır.

Bu algoritmalar incelenirken onların kusursuz çalışmaları beklenebilir. Ancak genellikle bu durum imkansıza yakındır. %100 doğrulukta tahmin yapabilen  bir algoritmanın tahmin ettiği alan ya gerçekten çok basittir ya da algoritmanın "ezberleme" olarak da nitelendirilen "overfit" durumu söz konusudur.  Kaldı ki algoritmaların doğruluğu için kullanılan test verisine göre bu değerler elde edilmektedir. Bir algoritma ise sonsuza kadar test edilemez. Bu nedenle mutlak kusursuzluk söz konusu değildir. 

Bir sınıflandırıcı makine öğrenme algoritmasının en az %50'i üzerinde doğru tahmin yapması beklenir nitekim iki ihtimalin söz konusu olduğu durumda gerçek tahmin yerine yazı tura atılarak tahmin halinde bile %50 doğruluk sağlanacaktır. 



# 23.01.2020 - paper-localagenda-beingused

*NOT: Dün bir haberin yerel olup olmadığını ölçüp ölçemeyeceğimi düşünürken, bunun imkansız olduğuna karar vermiştim. Ancak ulusal gündemleri makineye öğreterek bunun mümkün olabileceğine karar verdim.Şimdi o minvalde yazacağım* 

Haberlerin içerisinde yer alan ve yerel olmadığı halde kaynak haber sitelerinin arama sonuçlarında yerel haber olarak listelenen haberleri ayıklamak için de makine öğrenmesi kullanılmıştır. Bunun için TODO kelime listesesinde yer alan ve sonuçlarının sadece **ulusal** haberler olduğu bilinen TODO adet haber ulusal olarak, TODO kadar haber de yerel haberlerden seçilerek bu veri (Bundan böle veri seti 2 olarak tanımlanmıştır) makineye öğretilmiştir.  Bayes algoritması ile eğitilen algoritmanın doğruluğu % TODO kadardır. Algoritmanın doğruluğu ile ilgili diğer ölçütler şekil TODO'da gösterilmektedir. Bu algoritma ile daha önce derlenen veri seti 1 içerisindeki haberlerden yerel olanlarla ulusal olan haberler ayrıştırılmıştır. Buna göre haberlerin % TODO'su yerel olmadığı halde kaynak haber siteleri içerisnde yerel haberler arasında listelenmiştir. Hangi haber sitesinde yerel olmadığı halde yerel gözüken ne kadar olduğu gösterilmektedir. Bu değerlerin büyüklüğü ilgili haber sitelerinin arama sonuçlarındaki zayıflığı da temsil etmektedir. 

Veri Setleri
|No|Adı|Satır Sayısı|Amaç|
|--|-----------|-----|----------|
|1|İl adları ile ilgili elde edilen yerel haberler|TODO|Araştırma veri seti|
|2|Ulusal gündemlerle ilgili elde edilen haberler|TODO|Yerellik-Ulusallık ayrıştırma algoritması eğitim verisi|

*TODO:FIND A PLACE IN TEXT*
*Makine öğrenme algoritması ile ilgili  bir bölüm aç*
Makina öğrenmesi bilgisayarların açıkça programlanmaksızın bilinmeyen değerleri sınıflandırma  tahmin edebilmesini sağlayan algoritmalardır. Bunu yaparken sadece elde bulunan mevcut verilerden yola çıkarak hareket ederler. Bu algoritmaların tahmin kabiliyeti teorik olarak ıspatlanmıştır. Aynı şekilde elde bulunan verilerin bir kısmı ayrılarak bu elde bulunan verilerle eğitilen algoritmaların ne kadar doğru tahmin edildiği 3 temel ölçütle değerlendirilmektedir. Bu ölçüter yazında genel kabul edilmiş ölçütlerdir.

Yarın: Doğruluk ve kesinliği ve F1 skorunu metin içi anlat, bunu anlatırken PN, TN mevzularını da anlat.


# 22.01.2020 - paper-localagenda-beingused

Derlenen yerel haberler incelendiğinde (TODO: Sample tüm kolonlar) haberlerin ilgili oldukları illerle (kolon TODO) uyumlu olduğu görülürken diğer bir kısmının ise ilgili olmadığı görülmektedir. Bunun nedeni şudur: Haber sitesine girerek söz gelimi "Van" anahtar terimi ile ilgili arama yapıldığında çıkan haberlerin ilk kısımları genellikle anahtar terimle ilgili iken sonraki haberler anahtar terimle ilgisiz durumdadır. Bu durum bir çok Türkçe haber sitesinin ortak problemidir (TODO: Teyit et). Bu makale kapsamında geliştirilen algoritmalardan haber toplayıcı algoritma (Bundan böyle: Algoritma-T olarak adlandırılacaktır) ilgili haber sitelerine girdiğinde aynı haberleri elde etmektedir. Burada bir yazılan bir anahtar terim ile ortaya çıkan haberlerden herhangi birinin ilgililiğini ölçecek basit bir yaklaşım bulunmamaktadır. Aşağıdaki haberleri ele alalım. Aşağıdaki haberlerin "Van" anatar terimi yazıldığında bir haber sitesinde arama sonuçlarında listelenen haberler olduğunu kabul edelim:

1- Bakanlık açıkladı: Sistem sil baştan!

2- Adadaki tarihi yapılar koruma altına alınacak

3- Gürpınar'da 23 Nisan kutlamaları

4- Van'ın sesi olacağız

Yukarıdaki haberler incelendiğinde 4. haber'de birebir "Van" ifadesini içermesi nedeniyle "Van" ile ilgili olduğu kolayca söylenebilir. 3. haber de Van ile ilgili olmakla birlikte bununun anlaşılabilmesi için "Gürpınar" ilçesinin Van'da olduğu bilgisi gereklidir. 2. haberin Van'la ilgili olma olasılığı vardır (Van gölünde bulunan bir adadan ötürü) ancak bu yanlışklıkla arama sonuçlarına dahil olanbaşka bir yere ait bir haber de olabilir. Birinci haber ise yerel olmayan bir haberdir.

"İlgililiği" ölçmek için akla haber metni içinde anahtar terim (ilin adı) ve ilgili anahtar terimler (ilçeler) yazmak gelebilir. Bu durum bir derece ölçme gücü sağlayama potansiyeli barındırır. Ancak bir ildeki ilçeler dışındaki köy ve mahalleler gibi tüm yer adları hatta tarihi eser yahut cadde veya sokak adları da haber başlığında bir gösterge terim olabilir. Bu şekilde bir karşılaştırma listesi çıkarmak ayrı bir inceleme konusudur. 

Arama sonuçlarındaki bu zayıflığın nedeni haber sitelerinin site içi arama algoritmalarının zayıflığı olabilir. Öte yandan bu durum, okuyucuyu haber sitesinde tutmak için kasten yapılması da olasıdır. Her halükarda bu durum ilgili haber sitesinin arama motorunun bir zayıflığı olarak değerlendirilmelidir.  Bu çalışmada her bir haber sitesinin arama motorlarında çıkan sonuçların anahtar terimle görece ilgili olduğu varsayılmaktadır. (TODO: Varsayım listesine ekle).  Haber arama sonuçlarında farklı illerin söz konusu olması halinde dahi çıkan haberlerin tamamı ayrıca incelenmekte olduğundan bu durum araştırmanın sağlığına zarar vermemektedir. Sadece illerle ilgili olarak yapılacak analizlerde sapma ihtimali söz konusudur. 

*NOT: Burada başka bir makale konusu çıkmış oluyor, bu çalışmamda haberlerin yazım alışkanlıklarını incelemekteyim bu nedenle yukarıdaki tanımlayıcı açıklamalar dışında ilgililik yakalama algoritmasınılimdilik başka bir çalışmaya bırakıyorum. İlgililik yakalama algoritması özel bir algoritma olarak haber sitelerinin arama algoritmalarını sadece yerel haberler değil genel olarak analiz edebilir. Bence buradan güzel bir yabancı dilde makale de çıkabilir.*



# 17.01.2020 - paper-localagenda-beingused

Politik veya iş dünyası ile ilgili haberler dışındaki haberlerin herhangi bir yanlış yönlendirme içermesi daha az olasıdır. Yerel haberlerin konu edildiği saha ülkenin geneline göre daha dar ve izlenebilir olduğundan buradaki haberlerin daha nesnel olacağı tahmin edilebilir. Ancak bu nesnellik haberlerin özgün olmayan klişe "duyuru" biçimine dönüşme olasılığını arttıran bir faktördür. Özgün olmayan ve genellikle her yıl bir biçimde tekrar eden tüm haberleri (toplantı, açılış, mahkeme, hava durumu, ziyaret vs.) monoton olarak sınıflandırmak ve gerek il gerekse haber kaynağı açısından değerlendirmek yerel gündemlerle ilgili basının haber yazım alışkanlıklarını ortaya çıkaracaktır. Bu çalışma bu amaca yönelik olarak hazırlanmıştır. Bunu yaparken ilk akla gelen yöntem haberlerin teker teker incelenerek monotonluk sınıflandırmasının buna göre yapılmasıdır. Bu miktardaki haber için bu işlem imkansız değilse de çok zor olacaktır. Diğer taraftan bu gerçekleştirilse bile yeni haberler söz konusu olduğunda aynı okuma işleminin tekrar edilmesi gerekecektir. Ayrıca haber sayısının çok daha falza ve sürekli olduğu günümüzde bu tür araştırmalar için insan dikkat ve zamanını kullanmak efektif olmaz. 

Bu amaca yönelik bir araştırmada haber analizi için diğer bir yol daha vardır. O da **metin madenciliği** adı verilen yöntemdir. Metin madenciliği, çok miktardaki metin yığınları içinden bilgi ayıklama, özetleme, mevcut bilgileri istenen şekilde sınıflandırma gibi bir çok özel işlevi insanların haberleri okumasına ihtiyaç bırakmadan sağlayan yöntemler bütünüdür. Elde bulunan bir metin yığını üzerinden analiz yapmaya yarayacak bir takım hazır araçlar mevcuttur. RapidMiner, Weka gibi yazılımlar metin madenciliği için görsel kullanımı olan daha kolay araçlardır. Öte yandan metin madenciliğinin de dahil olduğu tüm veri madenciliği yöntemlerini kullanabilmek için görsel kullanımı az olan ancak çok güçlü, hızlı ve esnek araçlar bulunmaktadır. Bu araçlar birer *paket program* olmayıp kullanısının yazılım mühendisliği ve cebir gibi alanlarda en az temel düzeyde bilgisini gerektirirler. Bu araçlar R, Python ve Julia gibi yazılım dilleridir. Bu çalışmada R dili kullanılarak sözü edilen yerel haberlerin monotonluk analizi gerçekleştirilmiştir.

Çalışmanın izleyen ilk bölümünde makalenin metin madenciliğine dayalı metodolojisi ele alınacak, sonraki  bölümünde ise bu metotlarla gerçekleştirilen çalışmanın sonuçları ele alınacaktır. Son bölümde ise elde edilen bulgular tartışılacaktır. Bu çalışmada kullanılan **özgünlük ölçeğinin** (TODO: Önceki monotonluk ölçeği ifadesi yerine özgünlük ifadesini kullan) gelecekte medya üzerine yapılan analizlerde monotonluğu ölçmeye yarayacak bir kalite göstergesi olarak kullanılması amaçlanmaktadır.

Yöntem

Bu çalışma kapsamında bir haberi özgünlüğü algılayacak sistemi tasarlamadan önce bir haberin özgün olmadığına işaret eden özelliklerin gözden geçirilmesinde fayda vardir. Bir haberde özgün olmama herhangi bir konunun *sürekli tekrarı* ya da daha önce tekrar edilmese dahi [TODO'un](../00-reading_notes/haber_kaynaklari.md)  tanımına göre haberi kaleme alan kişinin gözleminden ziyade mevcut olay ve olgularla ilgili *klişe* açıklamarla ilgili olması anlamına gelir. Burada mevcut olay ve olgulara dayandığı halde özgün yorum ve açıklamalara dayalı haberlerin özgün olmamasından söz edilemez. Bu bakımdan herhangi bir özgünlük sınıflandırmasında bu hususun da dikkate alınması zorunlu olur. Bu iki nicel göstergeyi nitel ve yansız olarak ele almak için mevcut haberler şu işlemlerden geçirilecektir.

1- Metin madenciliği ile tüm yerel haberlerde en sık tekrar eden kavramlar listelenecektir. Bu listedeki kavramlar daha sonra gruplandırılacaktır. Bu işlem sonunda elde bir haberin sürekli tekrar eden gündemlerle ilgili olup olmaması ile ilgili anahtar terimler elde edilmiş olacaktır. Bu anahtar terimleri içeren haberler *tekrar eden haber* kategorisinde olacaktır. Tüm haberler bu kategoriye göre otomatik olarak kontrol edilerek işaretlenecektir.  Tekrar eden haber sınıfında olmayan haberler 1 puan alacaktır. Burada en sık tekrar eden kavramlar için sıklık eşiği $f$ belirlemek gerekecektir. Bu değer arttıkça daha fazla sayıda haber özgün olmama kategorisine girebilir.  Makul sayıda haberi belirleyebilmek için $f$ değişkeninin az, orta ve yüksek oranda  eşiğe göre sınıflandırma yapılacaktır.

2-  TODO'nun sınıflandırmasına giren kavramlar ise bir önceki listeden derlenerek yeni bir anahtar terim listesi oluşturulacaktır. Bu liste ise *klişe* haberlere tekabül edecektir. Bu kategoriye girmeyen haberler +1 puan daha alacaktır. Bu işlemler sonunda elde edilen üç tip haber olur:

 - 0: Klişe haber
 - 1: Yarı özgün haber
 - 2: Özgün haber

3- Yukarıdaki işlemlerle elde edilen özgünlük oranlarını teyit etmek için elle değerlendirilen haberlerle geliştirilen yapay zeka aracı tüm haberleri yukarıdaki puanlamaya göre makine öğrenmesi ile puanlayacaktır. Bu adımda yapay zekanın doğruluk gücünün yüksek olması durumunda önceki adımlarda elde edilen *kelime bazlı etiketleme* ile bu adımada elde edilen *yapay zeka bazlı etiketleme* gücü mukayese edilecektir.

4- Haber özgünlüğünü belirleyen algoritma üretildikten sonra *haber kaynağı* ve haberin ilgili olduğu *il* bilgisine göre hangi haber kaynakları ve hangi illerde daha özgün haberlerin görüldüğü örnekleri ile birlikte incelenecektir.

5- Elde edilen özgünlük tespit algoritması daha sonra araştırmacıların kendi ellerindeki haber setlerinde benzer çalışmaları yapabilecekleri halde bir yazılım olarak sunulacaktır.

# 15.01.2010 - paper-localagenda-beingused

Öte yandan zaman zaman medyada karşılaşılan ve herhangi bir olguyu enine boyuna inceleyen ve gerçekten okur için bilgilendirici olan haberlerle de karşılaşılmaktadır. Bu tür haberler okur için ilgi çekiciliği sürdürmekle beraber okurun merakını istismar etmek yerine doyurmaktadır. Örneğin 2600 yıldır çürümeyen bir beyin dokusu ile ilgili bir haberde şu ifade geçmiştir: 

"Yumuşak dokuların korunması için genellikle kurutulmaları, dondurulmaları ya da oksijen içermeyen asidik bir ortamda saklanması gerekiyor. Çünkü bir dış etki bulunmasa bile hücrelerin doğal enzimleri kendilerini yok etmeye başlıyor. [Kaynak](https://www.independentturkish.com/node/115286/bilim/2-bin-600-y%C4%B1ll%C4%B1k-beyin-dokusu-bozulmam%C4%B1%C5%9F-halde-bulundu-peki-bu-nas%C4%B1l-m%C3%BCmk%C3%BCn)" 

Bu haberin şu şekilde de daha çarpıcı ve dikkat çekici şeklide verilmesi mümkündür: 

"Mucizevi beynin 2600 yıldır nasıl çürümediği gizemini koruyor. Bir din adamına ait olduğuna inanılan bu beyin..."

İkinci formda, haberdeki "olduğuna inanılan" ifadesinde özne belirsizdir. Benzer şekilde Türk basınında sıkça kullanılan "olarak yorumlandı"  tabiri de aslında sadece yazarın subjektif görüşüdür ancak özne gizlenerek bilerek veya bilmeyerek haberler çarpıtılmaktadır.  Bu çarpıtma sadece haberin ilgi çekiciliğini arttırmaktan, toplumsal olayları körüklemek amacına kadar farklı niyetlerle gerçekleştirilebilir. Haberlerle ilgili bu çarpıtmalar üzerine araştırmalar yapan sivil toplum kuruluşu olan First Draft adlı kuruluşa göre bir haberin "yanlış yönlendirici" ya da "yanlış bilgilendirici" formu yedi farklı şekilde gerçekleşebilir (Kaynak: First Draft, Clarire [https://twitter.com/erenbilal/status/1216804327500718086?s=21](https://twitter.com/erenbilal/status/1216804327500718086?s=21)). 

1- Parodi Haberler: Herhangi bir kişi veya kuruma yönelik zarar niyeti yoktur. Ancak anlamsız veya gerçekçi olmayan içerik söz konusudur.

2-Yanlış yönlendirici içerik: Bir haberde bir kişi veya kuruma yönelik özellikle çarpıtılan bir içerik vardır.

3-Sahtekar içerik: Orjinal kaynakların haberleri çarpıtılarak verilmektedir.

4- Üretilmiş İçerik: Burada içerik tamamen sahtedir. Herhangi bir dayanağı yoktur. Haberin tek amacı zarar vermektedir.

5- Hatalı Bağlantı: Haberin görseli veya başlığı ile içeriği arasında ilişki yoktur.

6- Hatalı Bağlam: Haber orjinal ve doğrudur ancak bu haber sosyal medya veya benzeri kanallardan yayılırken yanlış bir bağlamda yayılmaktadır.

7- Manipüle İçerik: Orjinal bir içeriğin veya resminin kasten insanları kandırmak için şekillendirilmesidir.



Dipnot: "Olarak yorumlandı" şeklinde Google Haberler içerisinde arama yapıldığında 26.000 adet "gizli özneli" Türkçe haber ortaya çıkmaktadır. Bu sayı 2018 ila 2020 yılları arasındadır.

# 13.01.2020 - paper-localagenda-beingused

Monotonluk vasfını ortaya çıkaran en temel kaynak haberin konusudur. Haber konusu ise haberin kelimelerinden anlaşılabilir. TODO monotonluğu nasıl ölçeceğini yaz.

Monotonluk neden ölçülmelidir? Haberlerin sürekli olarak benzer gündemlerin etrafında veya içerisinde dolaşıyor olması bir süre sonra bu gündemlerin dışında hiç bir konunun haberleşememesine neden olabilir. Bu durum artık doğal akışı içerisinde gelişecek olguların habere dönüşmesi yerine, haberleştirilecek olguların yaratılarak haberleşirilmesine ve sığ döngülere neden olur. Özellikle ziyaret ve etkinlik haberlerinin haber sitelerinde sürekli olarak yer bulmaktadır ancak çoğu kez bu etkinliklerin ne ürettiği ya da neyle sonuçlandığı belirsizdir. Çeşitli şehirlerimizde gerçekleştirilen kariyer günleri toplantıları, yerel tarihle ilgili gerçekleştirilen paneller ve benzeri haberler ya da herhangi bir bürokratın bir hastayı ziyareti türünden haberlerin "öncesi" ve "sonrası" belirsizdir. Başka bir deyimle neden gerçekleştirildiği ve daha uzun vadede ne ile sonuçlandığı belli değildir.

# 12.01.2020 - paper-localangenda-beingused

"Kar alarmı", "cezasına çarptırıldı" "start verildi", "toplantısı gerçekleştirildi", "vurgulandı", "karayolunda can pazarı" gibi kalıplar bir çok okur ya da dinleyici için "haber" kavramını çağrıştıracaktır. Bu kavramlar sadece haber jargonu olarak haberlerin içerisinde ara sıra karşılaştımız kavramlar olarak gözükmektedir.  Diğer taraftan, bu kavramlar bir haberin konusunu oluşturabilecek ve aslında oldukça sınırlı bir dizi konu ile eşleşmektedir. Bu konular: olay, belge TODO'dur. TODO KAYNAK. Bu konu listesinin sonundaki konu ise bir muhabir veya haberi yazan kişinin kendi ürettiği ve önceli konulardan bağımsız olan özgün haberlerdir. Bu haberler gerçekten de benzersiz ve özel bir gözlem ve akıl yürütmeye dayalı özgün bir karakter taşımaktadır. 

Özgün olanlar dışında geri kalan haber konularının sürekli aynı gündem etrafında dolaşıyor olması göreli bir monotonluk algısına neden olabilir. Örneğin herhangi bir haber sitesinde kolayca görülebilecek arama alanına "kar alarmı" yazıldığında ortaya çıkacak haberlerde değişen konular sadece kar alarmının hangi bölgeleri etkileyeceği ve tarihleridir.  Dikkatli bir okur gelecek yıla ait kar alarmı haberini daha o yıl gelmeden metine dökerek yazabilir. Böyle bir durumda haber olgusu artık özgünlükten tamamen ayrılmış herhangi dijital bir telefon hatırlatması (push notification) farksız hale gelmektedir.  Ancak bunun aksine özellikle TODO tarafından x haberdir -x haber değildir şeklinde özetlenen türü bir haber aynı monotonluğa sahip değildir. Ancak bu tür haberler de tekrar edildikçe daha az ilgi çeker hale gelmektedir.  Örneğin "Facebook'un güvenlik açığını bulan Türk genci" türü haberler bu kategoridedir.  

Peki haberlere ait bu **monotonluk**, yani haberlerin hep benzer konular içeriyor olması ölçülebilir mi? Ya da bir haberin monoton olduğunu gösterecek nesnel ölçütler var mı? Bunu ölçmenin okuyarak değerlendirme dışında bir alternatifi yokmuş gibi gözükebilir.

IDEA: Olası makale başlığı: Kar Alarmı: Haberler, hep aynı konular mı? Haber Monotonluğunun Ölçülmesi

# 03.01.2020 - paper-localagenda-beingused

Anadolu'nun farklı şehirleri ile ilgili olarak ulusal basında çıkan haberlerin gündemi nedir? Bu çalışma bu gündemi ortaya çıkarmayı amaçlamaktadır. 81 ile ilgili sürekli olarak aynı anda yayınlanan haberlerin tamamında ele alınan konular o şehirlerin hep aynı özelliklerine mi odaklanmaktadır yoksa özgün haberler mi üretilmektedir? Yazılı basın haber üretiminde çeşitli kalıplar kullandığı, haber yazarlarının, basın açıklamalarının, olguların ele alınış şekillerinin haberlerle ilgili olarak bazı klişeler barındırdığı, özellikle sürekli olarak haber üretilmesinden ötürü özgünlüğün yerini güncel ve ilgi çekiciliğe yönlendirdiği, haberlerin ise bu yöne evrildiği düşünülmektedir. Bu düşünce bu araştırmanın test edilecek temel hipotezidir. Bu miktarda çok haberin neden bahsettiğini anlamanın en hızlı yolu haberlerin bir algoritma tarafından okunarak değerlendirilmesidir. Bu çalışma kapsamında geliştirilen algoritma ile TODO adet haber TODO adet kaynaktan elde edilerek bu analiz edilmiştir. Analiz haberlerin özgünlük ve klişe olma karakterini ele alarak metinsel derinliği incelemektedir.  



