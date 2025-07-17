// PNG Icon Generator for PWA
// Run this in a browser console to generate PNG icons

function generatePNGIcon(size) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = size;
    canvas.height = size;
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    // Draw background with rounded corners
    const radius = size * 0.125; // 12.5% border radius
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, radius);
    ctx.fill();
    
    // Draw circle overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(size/2, size/2, size * 0.3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw text "SA"
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.25}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SA', size/2, size/2 * 0.95);
    
    // Add "BLOG" text for larger sizes
    if (size >= 192) {
        ctx.font = `${size * 0.08}px Arial, sans-serif`;
        ctx.fillText('BLOG', size/2, size/2 * 1.35);
    }
    
    return canvas.toDataURL('image/png');
}

// Generate and download icons
function downloadIcon(dataUrl, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
}

// Create icons
console.log('Generating PNG icons...');
downloadIcon(generatePNGIcon(32), 'icon-32x32.png');
downloadIcon(generatePNGIcon(192), 'icon-192x192.png');
downloadIcon(generatePNGIcon(512), 'icon-512x512.png');
console.log('Icons generated! Move them to images/icons/png/');
