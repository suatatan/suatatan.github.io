---
layout: post
title: "Microsoft Word içinde makro yardımı ile bir dökümanda toplu değişiklikler yapma"
date: 2011-09-06
categories: 
  - "bilgisayar"
---

Onlar hatta yüzlerce sayfadan oluşan ve her birinde yapacağınız değişiklikler aynı olan dosyalarınız varsa her birini teker teker açıp Ctrl+F ile örneğin 5 değişikliğin 5'i için aynı işlem yapmaya gerek duyarsınız. Sizi bu "hammallıkltan" kurtarmak için "sırtımın ağrıdığı" anda bulduğum bir çözüm var:

Bu çözümle aynı makroyu her dosya için çalıştırıp tüm değişiklikleri yapabilirsiniz. Gerçi her seferinde dosyayı açıp makroya atadığınız kısayolu ile makroyu çalıştırmak gerekiyor ama olsun.  Toplu dosyaları açmadan işlemek için de bir çözüm var. Bununla ilgili makaleyi de yazmayı planlıyorum. Tabii ki bizzat uyguladıktan sonra. Ancak dosya açmadan toplu makro işlemini merak ediyorsanız [şu harici dökümanı inceleyebilirsiniz.](http://vbaexpress.com/kb/getarticle.php?kb_id=13)

Aşağıdaki makroyu kullanın (makro kullanımı hakkında bilginiz yoksa araştırın nitekim bununla ilgili henüz makale yazmadım)

Makro Şu:

```
Sub TopluDegisiklikYap()
'Buraya değitirilecek ifadeleri satır satır yapıyoruz, ilk parametre değiştirilecek ifade sonraki ise yerine gelecek
'ifade
Degis "New York", "Nevada"
Degis "Diyarbakır", "Kulp"
Degis "Suat", "Recep Tayyip"

End Sub

Sub Degis(Kaynak As String, Hedef As String)
    Selection.Find.ClearFormatting
    Selection.Find.Replacement.ClearFormatting
    With Selection.Find
        .Text = Kaynak
        .Replacement.Text = Hedef
        .Forward = True
        .Wrap = wdFindContinue
        .Format = False
        .MatchCase = False
        .MatchWholeWord = False
        .MatchWildcards = False
        .MatchSoundsLike = False
        .MatchAllWordForms = False
    End With
    Selection.Find.Execute Replace:=wdReplaceAll

End Sub
```
