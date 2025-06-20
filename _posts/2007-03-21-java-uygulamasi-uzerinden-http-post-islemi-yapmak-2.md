---
date: 2007-03-21
layout: post
tags:
- turkish
- bilgisayar
- quickread
- technology
- yeni-ufuk-gazetesi
title: Java Uygulaması Üzerinden HTTP POST işlemi yapmak
---

Diyelim ki web sayfanızı php veya başka bir dil ile hazıladırnız. yazdığınız bir Java programından tıpkı html formlarından post yapar gibi veri yollamak istiyorsunuz. Bunun için aşağıdaki kodlar tam size göre. Aşağıdaki postdata metodu DATA\_1 DATA\_2 VE DATA\_3 şeklindeki 3 datayı ALICI\_URL'ye gönderiyor.  
bu metodu şöyle kullanabilirsiniz.  
postdata(“http://adresim.com/konukdefteri.php”,“Suat”,“ATAN”,“VAN”);  
  
bu metot ile  
[http://adresim.com/konukdefteri.php](http://adresim.com/konukdefteri.php)  
adresine Suat,ATAN ve Van stringleri yollanır.ancak gönderilen URL'de değişkenlerin adlarının DATA\_1,DATA\_2 VE DATA\_3 olması gerekir. bu adları kendinize göre değişebilirsiniz.  
metodu boolean fırtlatacak şekilde yaptım data post edilirse true  
fırlatacak.  
Bu metotun çalışan bir örneğini:  
[](http://www.myjavaserver.com/%7Esuatatan/gundimsn/index.jnlp)[http://www.myjavaserver.com/~suatatan/gundimsn/index.jnlp](http://www.myjavaserver.com/~suatatan/gundimsn/index.jnlp)  
adresini tıklayarak çalıştırabilirsiniz.  
Bu Java ile yazılmış bir ziyaretçi defteri swing uygulaması ve bu uygulamadan yollanan mesaj  
[http://www.van-gurpinar.bel.tr/eklenenmesajlar.php](http://www.van-gurpinar.bel.tr/eklenenmesajlar.php)  
sayfasında yayına geçiyor.  
\_\_\_\_\_\_\_  
public boolean postdata(String ALICI\_URL,String DATA\_1,String DATA\_2,String DATA\_3) {  
  
//BIR APPLIKASYON UZERINDEN DATA POST ETMEYI SAGLAR  
  
  
try  
{  
String data = (new StringBuilder()).append(URLEncoder.encode(“DATA\_1”, “iso-8859-9”)).append(“=”).append(URLEncoder.encode(DATA\_1, “iso-8859-9”)).toString();  
data = (new StringBuilder()).append(data).append(“&”).append(URLEncoder.encode(“DATA\_2”, “iso-8859-9”)).append(“=”).append(URLEncoder.encode(DATA\_2, “iso-8859-9”)).toString();  
data = (new StringBuilder()).append(data).append(“&”).append(URLEncoder.encode(“DATA\_3”, “iso-8859-9”)).append(“=”).append(URLEncoder.encode(DATA\_3, “iso-8859-9”)).toString();  
  
  
URL url = new URL(ALICI\_URL);  
URLConnection conn = url.openConnection();  
conn.setDoOutput(true);  
OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());  
wr.write(data);  
wr.flush();  
BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));  
String line;  
  
  
while((line = rd.readLine()) != null)  
{  
  
  
System.out.println(“data post edildi”);  
sonuc=true;  
System.out.println(“———–ok————–”);  
  
}  
  
wr.close();  
rd.close();  
  
} catch(Exception e) {  
  
sonuc=false;  
  
}  
  
return sonuc;  
}  
  
\_\_\_\_\_\_\_\_\_  
Metot String cinsinden DATA\_1 parametresini alıp uzak sunucuda bulunan dosyaya yine DATA\_1 parametresi ile yollluyor, metot dikkatle incelendiğinde tırnak içindeki ilk DATA\_1 parametresi verinin post edileceği dosyadaki DATA\_1 parametresine yollanıyor.Bu adları değiştirebilirsiniz.
