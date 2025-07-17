const fs = require('fs');
const path = require('path');

// Create a simple PNG header (1x1 transparent pixel as placeholder)
function createPlaceholderPNG() {
    // Minimal PNG header for a 1x1 transparent pixel
    const pngData = Buffer.from([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
        0x00, 0x00, 0x00, 0x0D, // IHDR chunk length
        0x49, 0x48, 0x44, 0x52, // IHDR
        0x00, 0x00, 0x00, 0x01, // Width: 1
        0x00, 0x00, 0x00, 0x01, // Height: 1
        0x08, 0x06, 0x00, 0x00, 0x00, // Bit depth: 8, Color type: RGBA, Compression: 0, Filter: 0, Interlace: 0
        0x1F, 0x15, 0xC4, 0x89, // CRC
        0x00, 0x00, 0x00, 0x0A, // IDAT chunk length
        0x49, 0x44, 0x41, 0x54, // IDAT
        0x78, 0x9C, 0x62, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, // Compressed data
        0xE2, 0x21, 0xBC, 0x33, // CRC
        0x00, 0x00, 0x00, 0x00, // IEND chunk length
        0x49, 0x45, 0x4E, 0x44, // IEND
        0xAE, 0x42, 0x60, 0x82  // CRC
    ]);
    return pngData;
}

// Create directory if it doesn't exist
const iconsDir = path.join(__dirname, 'images', 'icons', 'png');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// Create placeholder PNG files
const sizes = [32, 192, 512];
const placeholderPNG = createPlaceholderPNG();

sizes.forEach(size => {
    const filename = path.join(iconsDir, `icon-${size}x${size}.png`);
    fs.writeFileSync(filename, placeholderPNG);
    console.log(`Created placeholder: ${filename}`);
});

console.log('Placeholder PNG icons created!');
console.log('Open images/icons/generate-icons.html in your browser to create proper icons.');
