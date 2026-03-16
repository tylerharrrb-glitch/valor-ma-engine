# ═══════════════════════════════════════════════════
# PROMPT — VALOR M&A ENGINE REDESIGN
# COPY EVERYTHING BELOW THIS LINE
# ═══════════════════════════════════════════════════

You are redesigning the VALOR M&A Engine — a full-stack M&A analysis platform featuring 7 integrated modules covering merger modeling, LBO analysis, synergy quantification, and fairness opinions, calibrated to Egyptian law, CBE rates, and FRA regulatory requirements. The platform already exists and works. Your job is to completely redesign its visual interface to match an exact design system — without breaking any existing functionality. Every calculation, every module, every input, every output must be preserved. Only the visual layer changes.

---

## MISSION

The designer of this platform also built a personal portfolio website at ahmedwael.pages.dev. The portfolio has a world-class dark financial terminal aesthetic. This platform must look like it belongs to the same brand universe — as if it was built by the same person, on the same day, to the same standard. When someone visits both sites, they should feel a seamless visual continuity.

---

## DESIGN SYSTEM — COPY THESE EXACTLY

### CSS Variables (paste into :root)
```css
:root {
  --bg-primary:     #0A0E17;
  --bg-secondary:   #0F1623;
  --bg-card:        #141B2D;
  --accent-gold:    #C9A84C;
  --accent-blue:    #3B82F6;
  --accent-glow:    #3B82F620;
  --text-primary:   #F0F4FF;
  --text-secondary: #8892A4;
  --text-muted:     #4A5568;
  --border:         #1E2D45;
  --gold-glow:      #C9A84C15;
  --ease: cubic-bezier(.4, 0, .2, 1);
  --ff-display: 'Playfair Display', serif;
  --ff-mono:    'IBM Plex Mono', monospace;
  --ff-body:    'Sora', sans-serif;
}
```

### Google Fonts (paste in <head>)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Playfair+Display:wght@700;900&family=Sora:wght@300;400;600&display=swap" rel="stylesheet">
```

### Body + grain noise overlay
```css
body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--ff-body);
  line-height: 1.7;
  overflow-x: hidden;
}
body::before {
  content: '';
  position: fixed; inset: 0;
  pointer-events: none; z-index: 9999; opacity: .035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")
}
```

---

## COMPONENT SPECIFICATIONS

### Navbar
Fixed top, height 64px, glass morphism:
```css
.navbar {
  position: fixed; top: 0; left: 0; width: 100%;
  z-index: 1000;
  background: rgba(10,14,23,.72);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(30,45,69,.5);
}
```
- Logo left: "VALOR" in Playfair Display font-weight 700, color var(--accent-gold)
- Subtitle next to logo: "M&A Engine" in IBM Plex Mono, small, var(--text-muted)
- Nav links: IBM Plex Mono, .78rem, var(--text-secondary), gold underline draw animation on hover (scaleX 0→1, transform-origin right→left on hover)
- Nav links should correspond to the 7 modules — abbreviated labels in mono
- Right side: "← Back to Portfolio" in IBM Plex Mono, .75rem, var(--text-muted), linking to https://ahmedwael.pages.dev/

### Page Header / Hero Strip
Below navbar, full-width dark hero section:
```css
.hero-strip {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  padding: 52px 0 44px;
  position: relative;
  overflow: hidden;
}
```
Radial glow top-right:
```css
.hero-strip::after {
  content: '';
  position: absolute; top: -20%; right: -5%;
  width: 500px; height: 500px;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  pointer-events: none;
}
```
Content inside:
- Mono label: "M&A ANALYSIS · EGYPTIAN MARKET · FRA CALIBRATED" — .75rem, letter-spacing 3px, uppercase, var(--accent-gold), margin-bottom 12px
- Main title: "VALOR M&A Engine" — Playfair Display 900, clamp(2.2rem,5vw,3.2rem), text-primary
- Subtitle: "Merger Modeling · LBO Analysis · Synergy Quantification · Fairness Opinions" — IBM Plex Mono, .9rem, var(--text-secondary), margin-top 10px
- Four stat badges in a flex row below (margin-top 24px):
  - "7 Integrated Modules"
  - "Egyptian Law Calibrated"
  - "CBE Rate Integration"
  - "FRA Regulatory Framework"
  Each badge: border 1px solid var(--border), background var(--bg-card), font-family mono, .72rem, color var(--text-secondary), padding 6px 16px, border-radius 20px

### Module Navigation Bar (CRITICAL — unique to this engine)
This is the most important UI element. The 7 modules must be visually navigable. Implement a sticky module switcher bar that sits just below the navbar:

```css
.module-bar {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  position: sticky; top: 64px; z-index: 900;
  overflow-x: auto;
  white-space: nowrap;
}
.module-tab {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--ff-mono);
  font-size: .72rem; letter-spacing: 1px;
  text-transform: uppercase;
  padding: 14px 24px;
  border-bottom: 2px solid transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all .3s var(--ease);
}
.module-tab:hover { color: var(--text-secondary); }
.module-tab.active {
  color: var(--accent-gold);
  border-bottom-color: var(--accent-gold);
  background: rgba(201,168,76,.04);
}
.module-tab .tab-number {
  font-size: .65rem;
  color: var(--text-muted);
  margin-right: 2px;
}
.module-tab.active .tab-number { color: var(--accent-gold); opacity: .6; }
```

The 7 module tabs — each with its number prefix:
- 01 · Merger Model
- 02 · LBO Analysis
- 03 · Synergy Engine
- 04 · Fairness Opinion
- 05 · Accretion / Dilution
- 06 · Deal Structuring
- 07 · Regulatory Review

### Section Labels & Titles
Every section gets a mono label above a Playfair title:
```css
.section-label {
  font-family: var(--ff-mono);
  font-size: .75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent-gold);
  margin-bottom: 12px;
  display: block;
}
.section-title {
  font-family: var(--ff-display);
  font-weight: 900;
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 28px;
  line-height: 1.2;
}
```

### Cards (all panels, input blocks, output blocks)
```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 32px;
  position: relative;
  transition: all .4s var(--ease);
  overflow: hidden;
}
.card:hover { border-color: rgba(201,168,76,.35); }
.card.featured { border-left: 3px solid var(--accent-gold); }
```

Gradient border reveal on hover (same as portfolio project cards):
```css
.card::before {
  content: '';
  position: absolute; inset: -1px;
  border-radius: 8px; padding: 1px;
  background: linear-gradient(135deg, transparent 40%, var(--accent-gold) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0; transition: opacity .4s var(--ease);
  pointer-events: none;
}
.card:hover::before { opacity: 1; }
.card:hover { transform: translateY(-2px); }
```

### Form Inputs & Labels
```css
input, select, textarea {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-primary);
  font-family: var(--ff-mono);
  font-size: .85rem;
  padding: 10px 14px;
  width: 100%;
  transition: border-color .3s var(--ease);
}
input:focus, select:focus {
  outline: none;
  border-color: var(--accent-gold);
  box-shadow: 0 0 0 3px var(--gold-glow);
}
label {
  font-family: var(--ff-mono);
  font-size: .72rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
  display: block;
}
```

Input group headers (above related input clusters):
IBM Plex Mono, .72rem, uppercase, letter-spacing 2px, var(--accent-gold), padding-bottom 8px, border-bottom 1px solid var(--border), margin-bottom 16px

### Buttons
Primary (Run Analysis / Calculate / Generate Report):
```css
.btn-gold {
  background: var(--accent-gold);
  color: var(--bg-primary);
  font-family: var(--ff-mono);
  font-size: .82rem; font-weight: 500;
  padding: 12px 28px; border-radius: 4px;
  border: none; cursor: pointer;
  transition: all .35s var(--ease);
  letter-spacing: .5px;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-gold:hover {
  background: #d4b35a;
  box-shadow: 0 0 24px var(--gold-glow);
}
```

Secondary (Export / Reset / Clear):
```css
.btn-outline {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
  font-family: var(--ff-mono);
  font-size: .82rem;
  padding: 12px 28px; border-radius: 4px;
  cursor: pointer; transition: all .35s var(--ease);
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-outline:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
}
```

### Output / Result Numbers
All key output values (deal value, IRR, MOIC, synergies, accretion %):
- Number: Playfair Display 900, clamp(1.6rem,3vw,2.4rem), var(--accent-gold)
- Unit/suffix: IBM Plex Mono, .75rem, var(--text-muted)
- Label: IBM Plex Mono, .72rem, var(--text-secondary), letter-spacing .5px, margin-top 6px
- Container: background var(--bg-secondary), border 1px solid var(--border), border-radius 8px, padding 24px, text-align center

Positive output: var(--accent-gold)
Negative output (dilution, losses): #f87171
Neutral benchmark: var(--accent-blue)

### Tags (module labels, deal type tags, regulatory tags)
```css
.tag {
  font-family: var(--ff-mono);
  font-size: .7rem;
  color: var(--accent-blue);
  background: rgba(59,130,246,.08);
  padding: 4px 12px; border-radius: 4px;
  border: 1px solid rgba(59,130,246,.15);
}
.tag-gold {
  color: var(--accent-gold);
  background: rgba(201,168,76,.08);
  border-color: rgba(201,168,76,.2);
}
.tag-green {
  color: #4ade80;
  background: rgba(74,222,128,.08);
  border-color: rgba(74,222,128,.2);
}
.tag-red {
  color: #f87171;
  background: rgba(248,113,113,.08);
  border-color: rgba(248,113,113,.2);
}
```

### Financial Tables
For merger model output, LBO returns, synergy breakdown, etc.:
```css
.fin-table { width: 100%; border-collapse: collapse; font-family: var(--ff-mono); font-size: .82rem; }
.fin-table th {
  background: var(--bg-secondary);
  color: var(--accent-gold);
  font-size: .7rem; letter-spacing: 2px; text-transform: uppercase;
  padding: 12px 16px; border-bottom: 1px solid var(--border); text-align: right;
}
.fin-table th:first-child { text-align: left; }
.fin-table td {
  padding: 10px 16px; border-bottom: 1px solid rgba(30,45,69,.5);
  color: var(--text-secondary); text-align: right;
}
.fin-table td:first-child { text-align: left; color: var(--text-primary); font-family: var(--ff-body); font-size: .85rem; }
.fin-table tr:hover td { background: rgba(30,45,69,.3); }
.fin-table .total td { color: var(--accent-gold); font-weight: 500; border-top: 2px solid var(--accent-gold); }
.fin-table .subtotal td { color: var(--text-primary); font-weight: 600; border-top: 1px solid var(--border); }
.fin-table .section-header td {
  background: rgba(201,168,76,.06); color: var(--accent-gold);
  font-size: .7rem; letter-spacing: 2px; text-transform: uppercase; padding: 8px 16px;
}
```
Wrap in: background var(--bg-card), border 1px solid var(--border), border-radius 8px, overflow hidden, overflow-x auto

### Charts (Chart.js)
All charts: dark bg (#141B2D), gold primary data, blue secondary.
Grid lines: #1E2D45. Tick labels: #8892A4, IBM Plex Mono. Tooltips: bg #0F1623, border #1E2D45.
Chart title above: IBM Plex Mono, .72rem, uppercase, letter-spacing 2px, var(--accent-gold)

Specific charts for M&A context:
- LBO returns waterfall (entry equity → exit equity → IRR)
- Synergy bridge chart (cost synergies + revenue synergies + total)
- Accretion/Dilution bar (EPS impact per year)
- Deal value breakdown donut (equity + debt + assumed liabilities)
All use: primary color #C9A84C, secondary #3B82F6, negative #f87171, positive #4ade80

### Egyptian Regulatory Badge (unique to this engine)
A special badge that signals the Egyptian market calibration — display it prominently in the hero strip and in the Regulatory Review module:
```html
<div class="egypt-badge">
  <span class="dot"></span>
  <span>Calibrated · Egyptian Law · CBE Rates · FRA Requirements</span>
</div>
```
```css
.egypt-badge {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--ff-mono); font-size: .68rem; letter-spacing: 1px;
  color: var(--accent-gold);
  background: rgba(201,168,76,.08);
  padding: 6px 16px; border-radius: 20px;
  border: 1px solid rgba(201,168,76,.25);
}
.egypt-badge .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent-gold);
  animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
```

### Live Badge
```css
.badge-live {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--ff-mono); font-size: .65rem;
  letter-spacing: 1px; text-transform: uppercase;
  color: #4ade80; background: rgba(74,222,128,.1);
  padding: 4px 12px; border-radius: 20px;
  border: 1px solid rgba(74,222,128,.25);
}
.badge-live .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #4ade80; animation: pulse 2s infinite;
}
```

### Scroll Reveal Animation
```css
.reveal {
  opacity: 0; transform: translateY(40px);
  transition: opacity .7s var(--ease), transform .7s var(--ease);
}
.reveal.visible { opacity: 1; transform: translateY(0); }
```
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### Section Dividers
```css
.section-divider {
  height: 1px;
  background: var(--accent-gold);
  opacity: .3;
  max-width: 1100px;
  margin: 0 auto;
}
```

### Footer
```html
<footer style="padding:40px 0; text-align:center; border-top:1px solid var(--border);">
  <p style="font-family:var(--ff-mono);font-size:.78rem;color:var(--text-secondary);">
    VALOR M&A Engine · Built by
    <a href="https://ahmedwael.pages.dev" style="color:var(--accent-gold);">Ahmed Wael Metwally</a>
    · Cairo, Egypt
  </p>
  <p style="font-family:var(--ff-mono);font-size:.68rem;color:var(--text-muted);margin-top:8px;">
    Merger Modeling · LBO Analysis · Synergy Quantification · Calibrated to Egyptian Law & FRA Requirements
  </p>
</footer>
```

---

## LAYOUT STRUCTURE TO IMPLEMENT

1. **Navbar** — fixed, glass morphism, "VALOR" logo in gold, 7 module nav links, "← Back to Portfolio" right
2. **Hero Strip** — title, subtitle, 4 stat badges, egypt-badge, live badge, radial glow
3. **Module Bar** — sticky below navbar, 7 tabs (01–07), active tab in gold
4. **Section Divider**
5. **Module 01 — Merger Model** — class="card featured reveal", section-label "01 — MERGER MODEL", inputs + output stat cards + merger table
6. **Section Divider**
7. **Module 02 — LBO Analysis** — class="reveal", section-label "02 — LBO ANALYSIS", debt schedule inputs + IRR/MOIC outputs + returns waterfall chart
8. **Section Divider**
9. **Module 03 — Synergy Engine** — class="reveal", section-label "03 — SYNERGY QUANTIFICATION", cost/revenue synergy inputs + bridge chart + NPV of synergies output
10. **Section Divider**
11. **Module 04 — Fairness Opinion** — class="reveal", section-label "04 — FAIRNESS OPINION", valuation range output + methodology summary table
12. **Section Divider**
13. **Module 05 — Accretion / Dilution** — class="reveal", section-label "05 — ACCRETION / DILUTION", EPS impact chart + accretion output (positive = gold, negative = red)
14. **Section Divider**
15. **Module 06 — Deal Structuring** — class="reveal", section-label "06 — DEAL STRUCTURING", consideration mix inputs + deal value breakdown donut chart
16. **Section Divider**
17. **Module 07 — Regulatory Review** — class="card featured reveal", section-label "07 — REGULATORY REVIEW", egypt-badge prominent, FRA compliance checklist, CBE rate display, Egyptian legal framework notes
18. **Section Divider**
19. **Summary Dashboard** — class="card featured reveal", section-label "08 — DEAL SUMMARY", key deal metrics in gold stat cards, export buttons (PDF / Excel)
20. **Footer**

Max-width container: 1100px, margin 0 auto, padding 0 24px. Section padding: 80px 0.

---

## WHAT NOT TO CHANGE
- All 7 module calculation logics and formulas
- All Egyptian law / CBE rate / FRA calibration data
- All input/output data structures and state
- All export functionality (PDF, Excel)
- All existing module switching logic
- File structure and build system

---

## FINAL CHECKLIST BEFORE DELIVERING
- [ ] All fonts loading from Google Fonts CDN
- [ ] Grain noise overlay on body::before
- [ ] Navbar fixed with glass morphism, VALOR logo in gold, back-to-portfolio link
- [ ] Module bar sticky with 7 tabs, active tab in gold with gold underline
- [ ] Hero strip with radial glow, egypt-badge, live badge
- [ ] All cards use bg-card #141B2D, hover gradient border reveal
- [ ] All inputs have gold focus state with glow
- [ ] All result numbers in Playfair Display gold
- [ ] Positive values gold, negative values red (#f87171)
- [ ] Egyptian regulatory badge visible in hero and Module 07
- [ ] All 7 modules styled with numbered section labels
- [ ] Chart colors: gold primary, blue secondary, green positive, red negative
- [ ] Reveal scroll animations on all sections
- [ ] Section dividers between all modules
- [ ] Footer with portfolio link and M&A module credits
- [ ] Fully responsive on mobile (375px), tablet (768px), desktop (1440px)
- [ ] Module bar scrollable horizontally on mobile

# ═══════════════════════════════════════════════════
# END OF PROMPT — VALOR M&A ENGINE REDESIGN
# ═══════════════════════════════════════════════════
