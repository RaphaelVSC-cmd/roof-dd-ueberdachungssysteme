# Design System & Technische Architektur
## Roof D&D Überdachungssysteme GmbH

---

### 1. Farbpsychologie & Design-Tokens

#### Branche: Hochwertige Überdachungssysteme, Lamellendächer & Wintergärten
- **Themenfeld:** Architektonischer Wetterschutz, pulverbeschichtetes Aluminium, Verbundsicherheitsglas (VSG), stilvoller Outdoor-Wohnraum für 365 Tage im Jahr.
- **Atmosphäre:** Luxuriös, modern, architektonisch präzise, langlebig und wertsteigernd.

#### Dark Mode (Standard / Default Theme):
```css
:root, [data-theme="dark"] {
  --bg: #070a0f;                  /* Tiefes Schiefer-Obsidian */
  --bg-secondary: #0f1520;        /* Dunkles Titan-Anthrazit */
  --fg: #f8fafc;                  /* Kristallines Reinweiß */
  --fg-muted: #94a3b8;            /* Architektonisches Silbergrau */
  --card-bg: rgba(15, 21, 32, 0.85);
  --card-shell: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 255, 255, 0.10);
  --border-focus: rgba(6, 182, 212, 0.5);

  /* Akzentfarben */
  --accent-cyan: #06b6d4;         /* Kristallines Glas-Cyan / Himmel */
  --accent-cyan-hover: #0891b2;
  --accent-emerald: #10b981;      /* Garten-Frische & Beständigkeit */
  --accent-gold: #f59e0b;         /* Sonnenschutz & Luxus-Schimmer */
  --accent-glow: rgba(6, 182, 212, 0.25);
  
  /* Aurora Gradienten */
  --aurora-1: hsla(189, 94%, 48%, 0.18); /* Glas-Cyan-Aura */
  --aurora-2: hsla(217, 91%, 60%, 0.16); /* Architektonisches Saphirblau */
}
```

#### Light Mode:
```css
[data-theme="light"] {
  --bg: #f8fafc;                  /* Frisches Architektur-Weiß */
  --bg-secondary: #ffffff;
  --fg: #090e17;                  /* Sattes Graphit-Schwarz */
  --fg-muted: #475569;            /* Lesbares Anthrazit */
  --card-bg: rgba(255, 255, 255, 0.95);
  --card-shell: rgba(9, 14, 23, 0.05);
  --border: rgba(9, 14, 23, 0.12);
  --border-focus: rgba(8, 145, 178, 0.6);

  /* Akzentfarben */
  --accent-cyan: #0891b2;         /* Sattes Architektur-Cyan */
  --accent-cyan-hover: #0e7490;
  --accent-emerald: #059669;
  --accent-gold: #d97706;
  --accent-glow: rgba(8, 145, 178, 0.15);

  /* Aurora Gradienten */
  --aurora-1: hsla(189, 94%, 60%, 0.15);
  --aurora-2: hsla(217, 91%, 70%, 0.15);
}
```

---

### 2. Typografie-System
- **Display-Font (Headings h1, h2):** `'Playfair Display', Georgia, serif`
  - Edler, architektonischer Schnitt mit handwerklicher Souveränität.
  - H1 Hero: `clamp(2.75rem, 6.5vw, 5.5rem)` – Gewicht 900, Zeilenhöhe 1.05.
  - H2 Sektionen: `clamp(2.0rem, 4.5vw, 3.5rem)` – Gewicht 700, Zeilenhöhe 1.15.
- **Body-Font (Fließtext, UI, Navigation):** `'Plus Jakarta Sans', system-ui, sans-serif`
  - Präzise Geometrie, hervorragende Lesbarkeit auf Mobilgeräten und 4K-Displays.
- **Eyebrow-Badges:** `font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600;`

---

### 3. Animation-Blueprint & Alleinstellungsmerkmale

1. **Kinetic Text Reveal (H1 & Section Titles):**
   - SplitType zerlegt Titel in Linien und Wörter.
   - Text mit `.text-accent` erhält feste Akzentfarbe und `-webkit-text-fill-color: var(--accent-cyan)` (kein transparenter Textverlust durch SplitType!).
2. **Scroll-Driven Horizontal Marquee (§ 16):**
   - Zwei gegenläufig scrollende Marquee-Reihen mit Detail- und Systemfotos (Aluminiumprofile, LED-Stripes, ZIP-Screens, Schiebewände).
3. **Sticky Card-Stacking Effekt (§ 15):**
   - 4 maßgeschneiderte System-Karten (1. Glas-Terrassendach, 2. Bioklima-Lamellendach, 3. Panorama-Wintergarten, 4. Markisen & ZIP-Screens).
   - Desktop (>= 901px): GSAP Scrubbed Scaling.
   - Mobile (<= 900px): Sauberes vertikales Einreihen ohne Überlappungen.
4. **Animierte Counter-Zahlen:**
   - Zähler für: `5.0` Google Sterne, `100%` Schneelast- & Statiksicher, `10` Jahre System-Garantie, `48h` Vor-Ort-Aufmaß Augsburg.
5. **Interaktiver Terrassendach- & Maß-Rechner (§ 6):**
   - Schieberegler von 10–80 m² und Systemwahl mit sofortiger Schätzung der Preisspanne.
6. **Lenis Smooth Scroll:**
   - `duration: 0.9`, `wheelMultiplier: 1.0`, `smoothTouch: false`, native passive Event-Listener.

---

### 4. Header-Architektur: Palomar-Pattern (Variante B)
- **Einklappbare Announcement-Leiste:** `☀️ Maßgefertigte Überdachungen & Wintergärten • Augsburg & Schwaben • ☎ 0821 4544735` (klappt bei Scroll sanft ein).
- **Glassmorphism Main-Header:**
  - Logo `Roof D&D Überdachungssysteme`.
  - Navigation: Systeme, Galerie, Rechner, Vorteile, FAQ, Kontakt.
  - Theme-Toggle Button (☀️ / 🌙) mit `localStorage`-Persistenz.
  - Magnetischer Telefon-CTA `0821 4544735`.
  - Morphing Hamburger für Smartphones (3 Linien → 1 X ohne zweites X-Icon).

---

### 5. Business Features & Legal Setup
- **DSGVO Consent Banner:**
  - Blockiert Google Maps iframe (`data-src`) bis explizite Einwilligung.
  - Reopen-Link im Footer (`#cookieSettingsLink`).
- **Legal Modals (Impressum & Datenschutz):**
  - `#impressumModal` & `#datenschutzModal` als responsive Dialog-Cards mit Double-Bezel, Backdrop-Blur, Innen-Scroll und Tastatursteuerung (ESC).
  - Mit echten Geschäftsführungsdaten (Yunus Deveci) und Augsburger Anschrift.
- **WhatsApp Widget:**
  - Floatend unten rechts, `wa.me/498214544735`, animierter Glow-Pulse, Mobil-Optimierung.
- **Multi-Step Funnel Formular (3 Schritte):**
  - Schritt 1: System-Typ (Glas-Terrassendach, Lamellendach, Wintergarten, Markisen/Beschattung).
  - Schritt 2: Geschätzte Maße (Breite × Tiefe) & Montageort.
  - Schritt 3: Kontaktdaten mit Pflicht-DSGVO-Checkbox & Honeypot.
- **Online-Terminbuchung UI-Dummy:**
  - Cal.com/Calendly Dummy-Card mit Direktruf-Fallback.

---

### 6. Pre-Delivery Checklist
* [x] Favicon vorhanden
* [x] Genau EIN Header (Palomar-Pattern, kein Doppelheader)
* [x] Hamburger: genau EIN X-Mechanismus (Morphing)
* [x] Dark/Light Toggle vorhanden mit localStorage
* [x] Touchpad-Scroll: passive Listener, kein preventDefault
* [x] Alle Texte auf Hintergrund lesbar (Kontrast geprüft, kein webkit-text-fill SplitType Bug)
* [x] Mindestens 2 Alleinstellungsmerkmale implementiert (Card-Stacking + Dual Marquee + Counter)
* [x] Lenis + GSAP + SplitType CDN eingebunden
* [x] Kinetic Typography auf h1 + h2
* [x] Staggered Load Animations auf Hero-Elementen
* [x] GSAP ScrollTrigger Fade-Up + Blur auf alle `[data-animate]`
* [x] Double-Bezel auf allen Karten
* [x] Aurora + Noise im Hero
* [x] Skip-to-Content Link als erstes Element
* [x] Alle `<img>` mit alt, width, height
* [x] Alle Icon-Buttons mit aria-label
* [x] FAQ: aria-expanded + aria-controls + Keyboard-Nav
* [x] DSGVO-Banner eingebaut (vanilla JS)
* [x] Google Maps: data-src statt src + Consent-Sperre
* [x] WhatsApp-Widget mit internationalem Tel-Format (498214544735)
* [x] Multi-Step Kontaktformular (3 Schritte + Formspree + Honeypot)
* [x] Branchenrechner implementiert (Terrassendach & Wintergarten)
* [x] Erweitertes Schema.org (OpeningHoursSpec + FAQPage + AggregateRating)
* [x] Impressum (§ 5 TMG) & Datenschutz (DSGVO Art. 13) als responsive Modals
* [x] LCP-Bild: fetchpriority="high"
* [x] Alle anderen Bilder: loading="lazy"
* [x] Responsiv: single-column unter 768px, Buttons ohne Text-Überlauf
* [x] Alle Bilder mit generate_image + "Beispielbild"-Badge
* [x] Keine halluzinierten Daten (0 Halluzinationen)
