# Übergabe- & Anpassungsanleitung
## Roof D&D Überdachungssysteme GmbH

Diese Website wurde als moderne, conversion-optimierte Webanwendung auf Basis von HTML5, Tailwind CSS, GSAP, Lenis und SplitType entwickelt.

---

### 1. Formspree Formular-Aktivierung

Um Anfragen aus dem Multi-Step Kontaktformular direkt per E-Mail zu erhalten:
1. Kostenlosen Account auf [formspree.io](https://formspree.io) erstellen.
2. Neues Formular mit dem Namen "Roof D&D Anfragen" anlegen.
3. Die generierte Form-ID kopieren (z. B. `xpzgayrw`).
4. In `index.html` in Zeile `action="https://formspree.io/f/YOUR_FORM_ID"` den Platzhalter `YOUR_FORM_ID` durch Ihre ID ersetzen.

---

### 2. Kundenbilder austauschen

Alle Beispielbilder liegen im Ordner `assets/`:
- `hero_terrassendach.jpg` – Haupt-Titelbild
- `system_terrassendach.jpg` – Glas-Terrassendach
- `system_lamellendach.jpg` – Bioklimatische Pergola
- `system_wintergarten.jpg` – Panorama-Wintergarten
- `system_markisen.jpg` – Markisen & Beschattung
- `detail_profile_led.jpg` – LED- und Rinnenprofil-Detail
- `detail_glastueren.jpg` – Glasschiebetüren-Detail

Ersetzen Sie die Dateien einfach durch reale Fotos von gebauten Kundenprojekten (idealerweise im Format JPG oder WebP, Auflösung min. 1600×900 px). Die Labels `.img-badge` können in `index.html` entfernt werden, sobald Originalfotos vorliegen.

---

### 3. Online-Terminkalender aktivieren (Cal.com / Calendly)

Für automatisierte Terminbuchungen:
1. Account bei [cal.com](https://cal.com) oder [calendly.com](https://calendly.com) einrichten.
2. Ereignistyp "Kostenlose Vor-Ort-Beratung Augsburg" (30–60 Min) erstellen.
3. Den Einbettungscode in die Sektion `#termin` in `index.html` anstelle des aktuellen UI-Dummies einfügen.

---

### 4. Hosting & Deployment (Vercel)

Die Seite ist statisch optimiert und kann innerhalb von 60 Sekunden auf Vercel veröffentlicht werden:
```bash
# Im Projektverzeichnis ausführen:
npx vercel
```
Alternativ: Über das GitHub-Repository `RaphaelVSC-cmd/roof-dd-ueberdachungssysteme` direkt in Vercel importieren.
