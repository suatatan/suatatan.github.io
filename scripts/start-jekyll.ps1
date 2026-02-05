# Jekyll Server Starter Script
Write-Host "🚀 Jekyll Blog Server Başlatılıyor..." -ForegroundColor Green
Write-Host "📁 Dizin: $PWD" -ForegroundColor Yellow

# Bundle check
if (!(Test-Path "Gemfile")) {
    Write-Host "❌ Gemfile bulunamadı!" -ForegroundColor Red
    exit 1
}

# Bundle install check
Write-Host "🔧 Bundle bağımlılıkları kontrol ediliyor..." -ForegroundColor Blue
bundle install --quiet

# Jekyll server başlat
Write-Host "🌟 Jekyll server başlatılıyor..." -ForegroundColor Green
Write-Host "🌐 Site adresi: http://localhost:4000" -ForegroundColor Cyan
Write-Host "🔄 Live reload aktif - değişiklikler otomatik yüklenecek" -ForegroundColor Cyan
Write-Host "⏹️  Durdurmak için Ctrl+C" -ForegroundColor Yellow
Write-Host "" 

# Browser'ı 5 saniye sonra aç
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 5
    Start-Process "http://localhost:4000"
} | Out-Null

# Jekyll serve
bundle exec jekyll serve --host=localhost --port=4000 --livereload --incremental --drafts