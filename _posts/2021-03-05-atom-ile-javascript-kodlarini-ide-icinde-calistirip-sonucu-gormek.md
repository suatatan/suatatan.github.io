---
title: "Atom ile Javascript Kodlarını IDE içinde çalıştırıp sonucu görmek"
date: 2021-03-05
categories: 
  - "bilgisayar"
---

Bir kodun nasıl çalıştığını görmek için derlemek veya çalıştırmak gerekir. Javascript için de o sayfayı açmak gerekir. Ancak bir şey olsa ve o satırdaki çalıştırıp kod nasıl işliyor diye bakmak istediğiniz oldu mu? Ama araç yoktu değil mi? Var!

Atom IDE'yi kurun, orada "Hydrogen" adlı eklentiyi kurun. Daha sonra Node.js aracım NPM kurun. Bu kurulumlar sonunda konsoldan şu komutları çalıştırın

`npm install -g ijavascript`

Sonra

`ijsinstall` 

Daha sonra javascript dosyanızı açıp Ctrl+F5 diyerek istediğini satırı şöyle çalıştırabilirsiniz:

<figure>

[![](/images/image.png)](https://suatatan.wordpress.com/wp-content/uploads/2021/03/image.png)

</figure>

**Ne oluyor?**

Aslında Hyrdogen, Python kullananların bildiği bir hızlıca kod çalıştırma, deneme yanılma aracı. Jupyter de aynı işi yapar. Oturup Javascript için de aynısını yapmışlar. Bu yöntem literal programlama olarak biliniyor. Kodlarken ne yaptığınızı bilerek gidiyorsunuz.

İyi kodlamalar
