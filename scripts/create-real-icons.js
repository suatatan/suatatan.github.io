const fs = require('fs');
const { createCanvas } = require('canvas');

// Canvas oluştur
function createIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Gradient arka plan
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    // Arka plan - yuvarlatılmış köşeler
    const radius = Math.max(size * 0.125, 4);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, radius);
    ctx.fill();
    
    // Şeffaf daire overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(size/2, size/2, size * 0.35, 0, 2 * Math.PI);
    ctx.fill();
    
    // Ana metin "SA"
    ctx.fillStyle = 'white';
    ctx.font = `bold ${Math.floor(size * 0.25)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText('SA', size/2, size/2 - size * 0.05);
    
    // Alt metin "BLOG" büyük iconlar için
    if (size >= 128) {
        ctx.font = `${Math.floor(size * 0.08)}px Arial`;
        ctx.shadowBlur = 1;
        ctx.fillText('BLOG', size/2, size/2 + size * 0.15);
    }
    
    return canvas;
}

// PNG dosyaları oluştur
const sizes = [32, 144, 192, 512];

sizes.forEach(size => {
    const canvas = createIcon(size);
    const buffer = canvas.toBuffer('image/png');
    const filename = `images/icons/png/icon-${size}x${size}.png`;
    
    fs.writeFileSync(filename, buffer);
    console.log(`Created: ${filename} (${buffer.length} bytes)`);
});

console.log('All PNG icons created successfully!');
