const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Jekyll Server başlatılıyor...');
console.log('📁 Çalışma dizini:', process.cwd());

// Jekyll serve komutunu çalıştır
const jekyll = spawn('bundle', ['exec', 'jekyll', 'serve', '--host=localhost', '--port=4000', '--livereload', '--incremental'], {
    cwd: process.cwd(),
    shell: true,
    stdio: 'inherit'
});

// Server başladığında browser'ı açmak için
setTimeout(() => {
    console.log('\n🌐 Server running at http://localhost:4000');
    console.log('📝 Site hazır! F5\'e bastığınızda otomatik olarak açılacak.');
    
    // Browser'ı aç
    const { exec } = require('child_process');
    exec('start http://localhost:4000', (error) => {
        if (error) {
            console.log('⚠️  Browser otomatik açılamadı. Manuel olarak http://localhost:4000 adresini ziyaret edin.');
        }
    });
}, 5000);

jekyll.on('close', (code) => {
    console.log(`✨ Jekyll server kapandı. Exit code: ${code}`);
});

jekyll.on('error', (err) => {
    console.error('❌ Jekyll server başlatılamadı:', err.message);
    console.log('\n🔧 Muhtemel çözümler:');
    console.log('1. Terminal\'de "bundle install" komutunu çalıştırın');
    console.log('2. Ruby ve Jekyll\'in yüklü olduğundan emin olun');
    console.log('3. Bu dizinde Gemfile\'ın bulunduğundan emin olun');
});