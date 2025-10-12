// Simple icon generator script untuk PWA
// Jalankan dengan: node generate-icons.js

const fs = require("fs");
const path = require("path");

// SVG template untuk icon
const createSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .bg { fill: #0a0a0a; }
      .border { fill: #00ff41; }
      .grid { stroke: #00ff41; stroke-width: ${size / 40}; fill: none; }
      .x { stroke: #00ff41; stroke-width: ${size / 30}; fill: none; }
      .o { stroke: #ff3d00; stroke-width: ${size / 30}; fill: none; }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" class="bg"/>
  
  <!-- Border -->
  <rect x="0" y="0" width="${size}" height="${size / 20}" class="border"/>
  <rect x="0" y="0" width="${size / 20}" height="${size}" class="border"/>
  <rect x="${size - size / 20}" y="0" width="${
  size / 20
}" height="${size}" class="border"/>
  <rect x="0" y="${size - size / 20}" width="${size}" height="${
  size / 20
}" class="border"/>
  
  <!-- Grid -->
  <g class="grid">
    ${Array.from(
      { length: 2 },
      (_, i) =>
        `<line x1="${size * 0.2 + (i + 1) * size * 0.2}" y1="${
          size * 0.2
        }" x2="${size * 0.2 + (i + 1) * size * 0.2}" y2="${size * 0.8}"/>`
    ).join("")}
    ${Array.from(
      { length: 2 },
      (_, i) =>
        `<line x1="${size * 0.2}" y1="${
          size * 0.2 + (i + 1) * size * 0.2
        }" x2="${size * 0.8}" y2="${size * 0.2 + (i + 1) * size * 0.2}"/>`
    ).join("")}
  </g>
  
  <!-- X in top-left -->
  <g class="x">
    <line x1="${size * 0.24}" y1="${size * 0.24}" x2="${size * 0.36}" y2="${
  size * 0.36
}"/>
    <line x1="${size * 0.36}" y1="${size * 0.24}" x2="${size * 0.24}" y2="${
  size * 0.36
}"/>
  </g>
  
  <!-- O in center -->
  <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.06}" class="o"/>
  
  <!-- X in bottom-right -->
  <g class="x">
    <line x1="${size * 0.64}" y1="${size * 0.64}" x2="${size * 0.76}" y2="${
  size * 0.76
}"/>
    <line x1="${size * 0.76}" y1="${size * 0.64}" x2="${size * 0.64}" y2="${
  size * 0.76
}"/>
  </g>
</svg>`;

// Buat directory icons jika belum ada
const iconsDir = path.join(__dirname, "icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

// Generate SVG icons
const sizes = [192, 512];
sizes.forEach((size) => {
  const svg = createSVG(size);
  fs.writeFileSync(path.join(iconsDir, `icon-${size}.svg`), svg.trim());
  console.log(`✓ Generated icon-${size}.svg`);
});

console.log("\n🎮 Icons generated successfully!");
console.log("📁 Check the icons/ directory");
console.log(
  "💡 Tip: Convert SVG to PNG using online converter atau image editor"
);
console.log("🔗 Recommended: https://cloudconvert.com/svg-to-png");
