# Suat Atan Blog

Jekyll tabanlı kişisel blog ve uygulama koleksiyonu.

## Kurulum ve Çalıştırma

### Gereksinimler
- Ruby (2.7 veya üzeri)
- Bundler gem

### İlk Kurulum

1. **Depoyu klonlayın veya indirin**
   ```bash
   git clone [repo-url]
   cd suat-blog
   ```

2. **Gerekli gem'leri yükleyin**
   ```bash
   bundle install
   ```

### Siteyi Çalıştırma

1. **Komut satırını açın** ve blog klasörüne gidin:
   ```bash
   cd d:\suat\repo_candidates\suat-blog
   ```

2. **Jekyll sunucusunu başlatın**:
   ```bash
   bundle exec jekyll serve
   ```

3. **Tarayıcınızda açın**:
   - Varsayılan adres: `http://localhost:4000`
   - Terminal çıktısında tam adresi gösterir

### Hızlı Başlatma

Geliştirme sırasında daha hızlı build için:
```bash
bundle exec jekyll serve --incremental
```

### Build Optimizasyonu

Eğer build süresi uzun sürüyorsa:

1. **Gereksiz dosyaları hariç tutun** (`_config.yml` dosyasına ekleyin):
   ```yaml
   exclude:
     - debug.log
     - "*.py"
     - "*.log"
     - README.md
     - node_modules
     - .git
     - .vscode
   ```

2. **Incremental build kullanın**:
   ```bash
   bundle exec jekyll serve --incremental
   ```

## Site Yapısı

- `_posts/` - Blog yazıları
- `_layouts/` - Sayfa şablonları
- `apps/` - Web uygulamaları
- `pages/` - Statik sayfalar
- `css/` - Stil dosyaları
- `images/` - Görseller

## Özellikler

### Blog
- Türkçe ve İngilizce içerik desteği
- Etiket sistemi
- Responsive tasarım

### Uygulamalar
- **Nefes Egzersizi** (`/apps/breathing-exercise.html`) - 4-4-4-4 nefes tekniği ile rahatlama

### Etiketler
- `#turkish` - Türkçe yazılar
- `#english` - İngilizce yazılar
- `#technology` - Teknoloji konuları
- `#opinion` - Görüş yazıları
- `#disleksi` - Disleksi ile ilgili içerikler

## Yeni İçerik Ekleme

### Yeni Blog Yazısı
1. `_posts/` klasörüne `YYYY-MM-DD-baslik.md` formatında dosya oluşturun
2. Frontmatter ekleyin:
   ```yaml
   ---
   date: 2024-03-03
   layout: post
   title: "Yazı Başlığı"
   tags:
     - turkish
     - technology
   ---
   ```

### Yeni Uygulama
1. `apps/` klasörüne HTML dosyası oluşturun
2. `_layouts/home.html` dosyasında "Uygulamalar" bölümüne link ekleyin

## Sorun Giderme

### Ruby/Bundler Kurulu Değilse
```bash
# Sürümleri kontrol edin
ruby --version
bundler --version

# Bundler kurulumu
gem install bundler
```

### Build Hataları
- Hata mesajını kontrol edin
- `bundle update` ile gem'leri güncelleyin
- `bundle clean --force` ile temizleyin

### Port Sorunu
Eğer 4000 portu kullanımdaysa:
```bash
bundle exec jekyll serve --port 4001
```

## Lisans

Kişisel blog projesi - Suat Atan © 2025
