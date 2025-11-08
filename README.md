# 🎮 Pixel Tic Tac Toe PWA

**Retro 8-bit style Tic Tac Toe game dengan full offline support dan responsive design**

![Pixel Style](https://img.shields.io/badge/Style-8--bit%20Pixel-00ff41)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-00ff41)
![Offline First](https://img.shields.io/badge/Offline-First-ff3d00)
![Responsive](https://img.shields.io/badge/Design-Responsive-00ff41)

## 🌟 Features

### ✨ Game Features

- **Pixel Art Style**: Authentic 8-bit retro gaming experience
- **Smooth Animations**: CSS animations untuk setiap interaksi
- **Sound Effects**: Haptic feedback dengan device vibration
- **Score Tracking**: Persistent score storage dengan localStorage
- **Responsive Design**: Optimal di semua ukuran layar (mobile, tablet, desktop)
- **Win Detection**: Animated highlight untuk winning combinations

### 🚀 PWA Features

- **Full Offline Support**: Dapat dimainkan tanpa koneksi internet sama sekali
- **Installable**: Install sebagai native app di device
- **Fast Loading**: Advanced caching strategies untuk performa optimal
- **Cross-Platform**: Berjalan di iOS, Android, Windows, Mac, Linux
- **Auto-Update**: Background updates untuk versi terbaru

### 🎨 Design Features

- **Pixel Perfect**: Menggunakan font "Press Start 2P" untuk authentic retro feel
- **Animated Particles**: Background particles untuk visual enhancement
- **Glowing Effects**: CSS glow effects dan shadows
- **Color Coded**: Hijau neon (#00ff41) untuk X, Orange (#ff3d00) untuk O
- **Smooth Transitions**: Semua element memiliki smooth animations

## 🛠️ Teknologi yang Digunakan

### Frontend

- **HTML5**: Semantic markup untuk accessibility
- **CSS3**:
  - CSS Grid untuk game board layout
  - CSS Custom Properties (Variables) untuk theming
  - CSS Animations & Keyframes untuk effects
  - Responsive design dengan clamp() functions
  - Media queries untuk berbagai breakpoints
- **Vanilla JavaScript**:
  - Modern ES6+ features
  - Local Storage API untuk persistence
  - Vibration API untuk haptic feedback
  - Service Worker API untuk offline capability

### PWA Technologies

- **Service Worker**: Advanced caching strategies
- **Web App Manifest**: Native app-like installation
- **Cache API**: Multiple cache strategies (Cache First, Network First, Stale While Revalidate)
- **Background Sync**: Future-ready untuk sync capabilities
- **Push Notifications**: Ready untuk game challenges

## 📱 Installation & Usage

### 1. Akses Langsung

```
Buka di browser: file:///path/to/index.html
Atau deploy ke web server dan akses via URL
```

### 2. Install sebagai PWA

1. **Chrome/Edge**: Klik tombol "Install PWA" atau icon install di address bar
2. **Safari**: Share → Add to Home Screen
3. **Firefox**: Menu → Install
4. **Mobile**: "Add to Home Screen" dari browser menu

### 3. Offline Usage

- Setelah first load, aplikasi akan cache semua assets
- Dapat dimainkan tanpa internet connection
- Scores tersimpan secara lokal
- Updates otomatis saat online kembali

## 🎯 Cara Bermain

### Basic Rules

1. **Objective**: Buat garis 3 symbol yang sama (horizontal, vertikal, atau diagonal)
2. **Players**: X dan O bergantian
3. **Winning**: First player yang membuat 3 in a row menang
4. **Draw**: Jika board penuh tanpa winner

### Controls

- **Click/Tap**: Tempatkan symbol di cell
- **Restart**: Mulai game baru dengan score tetap
- **Reset Score**: Reset score ke 0-0

### Visual Feedback

- **Cell Animation**: Setiap placement memiliki animation
- **Winning Highlight**: Winning cells akan glow dan animated
- **Turn Indicator**: Current player ditampilkan dengan glow effect
- **Score Updates**: Animated score increments

## 🏗️ Struktur Project

```
simple-pwa/
├── index.html              # Main HTML file
├── style.css              # Pixel-style CSS dengan animations
├── sw.js                  # Enhanced Service Worker
├── manifest.json          # PWA manifest dengan pixel theme
├── icons/                 # PWA icons (192x192, 512x512)
│   ├── icon-192.png
│   └── icon.png
└── README.md              # Dokumentasi ini
```

## 💾 Data Storage

### localStorage Keys

```javascript
- "pixel-ttt-scores": {X: number, O: number}
```

### Cache Names

```javascript
- "pixel-ttt-cache-v2": Static assets cache
- "pixel-ttt-dynamic-v2": Dynamic content cache
```

## 🎨 Design System

### Color Palette

```css
--pixel-primary: #00ff41    /* Neon Green - untuk X dan accents */
--pixel-secondary: #ff3d00  /* Orange Red - untuk O dan warnings */
--pixel-bg-dark: #0a0a0a    /* Deep Black - main background */
--pixel-bg-light: #1a1a1a   /* Dark Gray - containers */
--pixel-border: #333        /* Medium Gray - borders */
--pixel-text: #00ff41       /* Neon Green - primary text */
--pixel-text-alt: #ffffff   /* White - secondary text */
```

### Typography

```css
Primary Font: 'Press Start 2P' (Google Fonts)
Fallback: 'Courier New', monospace
Sizes: Responsive dengan clamp() function
```

### Animations

- **Container Glow**: 2s infinite alternate breathing effect
- **Cell Appear**: 0.5s scale & rotate entrance
- **Cell Fill**: Different animations untuk X (rotate left) dan O (rotate right)
- **Winner Effect**: 0.6s infinite alternate scale dengan glow
- **Button Hover**: translateY untuk 3D button effect

## 📐 Responsive Breakpoints

```css
Mobile Portrait: < 480px
Mobile Landscape: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px

/* Extreme small devices */
@media (max-width: 320px)

/* Print styles */
@media print
```

## 🔧 Customization

### Mengubah Warna Theme

Edit CSS custom properties di `:root`:

```css
:root {
  --pixel-primary: #your-color;
  --pixel-secondary: #your-color;
  /* etc. */
}
```

### Mengubah Animasi Speed

Adjust animation duration di keyframes:

```css
@keyframes cellAppear {
  /* Change dari 0.5s ke durasi yang diinginkan */
}
```

### Menambah Sound Effects

Replace vibration dengan audio:

```javascript
function playSound(type) {
  const audio = new Audio(`sounds/${type}.mp3`);
  audio.play().catch(() => {});
}
```

## 🔄 Service Worker Strategies

### Cache First (Static Assets)

- HTML, CSS, JS, Images, Manifest
- Instant loading dari cache
- Background updates

### Network First (Dynamic Content)

- API calls, external resources
- Fresh content when online
- Cache fallback when offline

### Stale While Revalidate (Fonts)

- Google Fonts
- Serve dari cache, update di background
- Best performance dengan fresh content

## 🚀 Performance Optimizations

### CSS Optimizations

- **CSS Custom Properties**: Consistent theming
- **clamp()**: Responsive sizing tanpa media queries
- **transform**: Hardware-accelerated animations
- **will-change**: Optimize untuk animations

### JavaScript Optimizations

- **Event Delegation**: Efficient event handling
- **Debouncing**: Prevent excessive function calls
- **localStorage**: Client-side persistence
- **Error Handling**: Graceful fallbacks

### PWA Optimizations

- **Resource Hints**: Preconnect untuk Google Fonts
- **Critical CSS**: Inline critical styles
- **Progressive Enhancement**: Works tanpa JavaScript
- **Offline First**: Cache-then-network strategy

## 🐛 Troubleshooting

### Issue: Game tidak responsive

**Solution**: Check CSS viewport meta tag dan clamp() functions

### Issue: Animations tidak smooth

**Solution**:

- Check device performance
- Reduce animation complexity di CSS
- Add `will-change` property

### Issue: Offline tidak working

**Solution**:

- Check Service Worker registration
- Verify cache strategies di DevTools
- Clear cache dan reload

### Issue: PWA tidak installable

**Solution**:

- Verify manifest.json validity
- Check HTTPS requirement (atau localhost)
- Ensure Service Worker active

## 📈 Future Enhancements

### Planned Features

- [ ] **AI Opponent**: Single player vs computer
- [ ] **Multiplayer**: Real-time online gameplay
- [ ] **Tournaments**: Bracket-style competitions
- [ ] **Themes**: Multiple pixel art themes
- [ ] **Sound Pack**: Retro sound effects
- [ ] **Achievements**: Unlock system
- [ ] **Statistics**: Detailed game analytics
- [ ] **Custom Board**: Different grid sizes

### Technical Improvements

- [ ] **Web Components**: Modular architecture
- [ ] **TypeScript**: Type safety
- [ ] **PWA Builder**: Enhanced manifest
- [ ] **WebGL**: Advanced visual effects
- [ ] **WebAssembly**: Performance optimization

## 🤝 Contributing

### Development Setup

1. Clone repository
2. Open index.html di browser atau local server
3. Modify files sesuai kebutuhan
4. Test di berbagai devices dan browsers

### Code Style

- Use semantic HTML
- Follow CSS BEM methodology
- ES6+ JavaScript features
- Comment complex logic
- Mobile-first responsive design

## 📄 License

MIT License - Free untuk personal dan commercial use

## 👨‍💻 Author

hallo kita usahakan kacang ituu.. 
dari jauh tampak menakjubkan 
---

**Nikmati pengalaman gaming retro dengan teknologi modern! 🎮**

_Catatan: Aplikasi ini menggunakan Google Fonts yang memerlukan internet untuk first load, namun setelah di-cache akan berfungsi sepenuhnya offline._
