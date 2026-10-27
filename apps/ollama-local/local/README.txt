LOCAL / OLLAMA — WINDOWS YEREL PAKETİ

1. ZIP dosyasını bir klasöre tamamen çıkart.
2. Ollama'yı ve kullanacağın indirilmiş modeli hazır tut.
3. Kart eklemek için masaüstü Anki'yi aç. AnkiConnect kurulu olmalı.
4. BASLAT.cmd dosyasına çift tıkla. Python 3.10+ gerekir; pip kurulumu gerekmez.
5. Tarayıcı http://127.0.0.1:18765 adresinde açılır. Komut penceresi açık kalsın.

Bu pakette Ollama ve Anki için tarayıcı CORS ayarı yapmana gerek yoktur.
Uygulama yalnız kendi bilgisayarında açılır. Bağlantıları yerel Python aracı yapar.
Ollama/Anki'de OLLAMA_HOST veya webBindAddress ayarını değiştirme.
Ollama portu: 11434. AnkiConnect portu: 8765.
AnkiConnect API anahtarı varsa uygulamanın Ayarlar bölümüne gir.

İnternetsiz kullanılabilir; Ollama'daki model önceden indirilmiş olmalıdır.
Cloud modeller internet gerektirir. AnkiWeb senkronizasyonu için de internet gerekir;
kartı yerel Anki'ye eklemek için internet gerekmez.

Sohbetler tarayıcının localStorage alanında tutulur. Her açılışta aynı adresi kullan.
Sitedeki sohbet geçmişi farklıdır: sitede Yedekle, yerel uygulamada İçe aktar.
Site verilerini temizlemeden önce JSON yedeği al.

Port zaten kullanılıyorsa açık uygulamayı ziyaret et veya önceki komut penceresini kapat.
Komut satırıyla alternatif: python bridge.py --port 18766
Port değişirse tarayıcı geçmişi ayrı olur; yedekle/içe aktar ile taşıyabilirsin.

Paket programları veya Anki eklentisini otomatik kurmaz; ayarlarını otomatik değiştirmez.
Yeni sürüm için siteden paketi indirip dosyaları güncelle. Paket kendi kendini güncellemez.
Kaynaklar ve üçüncü taraf lisansları paketle birlikte gelir.
