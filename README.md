# 💍 Wedding Invitation Website
### Selva Jeyanthi J & Pandeeswaran G

A beautiful, elegant single-page wedding invitation website built with React + Vite, TailwindCSS, and GSAP ScrollTrigger animations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── CountdownTimer.jsx    # Live countdown to wedding day
│   ├── FloralDivider.jsx     # Decorative SVG floral divider
│   ├── Navbar.jsx            # Fixed navigation with mobile menu
│   └── PetalBackground.jsx   # Animated floating petals
├── sections/
│   ├── Hero.jsx              # Full-screen opening with countdown
│   ├── Story.jsx             # Love story prose section
│   ├── Timeline.jsx          # Visual timeline of the journey
│   ├── Events.jsx            # Wedding event cards
│   ├── Gallery.jsx           # Photo grid gallery
│   ├── RSVP.jsx              # RSVP form + contact buttons
│   └── Footer.jsx            # Closing footer
├── hooks/
│   └── useScrollAnimation.js # GSAP scroll helpers
├── data/
│   └── weddingData.js        # 🔑 All customisable data lives here
├── App.jsx
├── main.jsx
└── index.css
```

---

## ✏️ How to Customise

### 1. Edit names, dates, events
Open `src/data/weddingData.js` — every text field, event detail, phone number, and date is defined here. No other files need touching for basic personalisation.

### 2. Add photos to the gallery
Set the `src` field in the `gallery` array to your image paths (place images in `/public/photos/`):
```js
{ id: 1, src: '/photos/couple1.jpg', alt: 'Our story', label: 'A quiet moment' }
```

### 3. Change colors
Colors are defined in `tailwind.config.js` and used as inline styles throughout components. The primary palette uses:
- **Violet/Lavender** `#8b6fa6` / `#c4b5fd` — dominant accent
- **Blush/Rose** `#d4a0b5` / `#f9d5e5` — secondary accent
- **Cream** `#fdfaf6` — backgrounds

### 4. Connect the RSVP form
In `src/sections/RSVP.jsx`, replace the `handleSubmit` function with a real API call (Formspree, EmailJS, Firebase, etc.):
```js
const handleSubmit = async (e) => {
  e.preventDefault();
  await fetch('https://formspree.io/f/YOUR_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  setSubmitted(true);
};
```

### 5. Update map links
Change `mapLink` in each event object in `weddingData.js` to the real Google Maps URL of your venue.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Font Display | Playfair Display | Headings, names |
| Font Serif | Cormorant Garamond | Body text, quotes |
| Font Sans | Jost | Labels, UI text |
| Primary | `#5c3d7a` | Main purple |
| Accent Violet | `#c4b5fd` | Borders, dividers |
| Accent Blush | `#d4a0b5` | Highlights |
| Background | `#fdfaf6` | Cream white |

---

## 📱 Mobile Features
- Responsive layout for all screen sizes
- Click-to-call phone links (`tel:`)
- WhatsApp deep links
- Mobile hamburger navigation

---

## ⚡ Performance
- Lazy-loaded images
- GSAP animations trigger once on scroll
- CSS `transform` & `opacity` only (GPU composited)
- Minimal re-renders with stable data imports

---

## 🛠 Tech Stack
- **React 18** + **Vite 5**
- **TailwindCSS 3**
- **GSAP 3** + ScrollTrigger
- **Google Fonts** — Playfair Display, Cormorant Garamond, Jost

---

*Made with 💜 for Selva Jeyanthi & Pandeeswaran*
