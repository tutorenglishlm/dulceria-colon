# Design — Dulcería y Sorbetería Colón

<!-- impeccable:design-doc 1 -->

Direction: **"El Paseo, 1907"** — a belle-époque promenade down Paseo de Montejo rendered as an enamel-and-brass institution. Deliberately refuses the AI heritage rut (cream ground + high-contrast serif + terracotta). Persuade surface. Documented from the shipped `index.html` / `styles.css` / `script.js`.

## Palette (promenade night)

| Role | Token | Value |
|---|---|---|
| Ground (base) | `--green-850` | `#0f2419` |
| Ground (deep/section) | `--green-900` | `#0c1d16` |
| Panel | `--green-800` | `#12281d` |
| Enamel plaque field | `--enamel` | `#0d3b2c` (edge `#08281e`) |
| Marble band | `--marble` / `--ivory-soft` | `#f6f0e2` / `#efe4c9` |
| Ivory (text on dark) | `--ivory` / `--on-dark` | `#f4ecd6` / `#f1e9d6` |
| Dim text on dark (brass-tinted, never gray) | `--on-dark-dim` | `#c8bd9e` |
| Brass | `--brass` / hi `--brass-hi` / lo `--brass-lo` | `#c69a4c` / `#e7cb84` / `#8a6b30` |
| Brass hairline | `--brass-line` | `rgba(198,154,76,.42)` |
| Fruit accent (sparingly) | `--mamey` / `--guanabana` | `#cf6a43` / `#e9e2c4` |

Color strategy: **Full palette** — dark green owns the page; brass is the structural accent; one marble band and one fruit accent (mamey) used sparingly. Dark chosen from the use scene: an evening promenade at golden hour.

## Type

- Display / wordmark / plaques / review quotes: **Marcellus** (`--serif`) — engraved Roman caps, evokes brass/stone inscriptions.
- Labels / small caps / buttons / kickers: **Marcellus SC** (`--sc`), tracked `.12–.42em`, uppercase.
- Body: **Hanken Grotesk** (`--sans`), 300–700. Chosen for legibility across a multi-generational, older audience.
- Headings `letter-spacing:-.01em`, `line-height:1.05`; hero title clamps to 7.5rem; body clamps ~1.0–1.075rem.

## Signature motifs

- **Enamel street-plaque:** deep-green field, brass inset bevel (triple inset box-shadow), ivory inscribed caps. Reused for the hero tagline, the Historia fact chips, the 5 branch plaques, and the toast.
- **Brass hairlines & rules** (`.brass-rule`, `.plate-label` with flanking rules) as chrome.
- **Marble Historia band** breaks the dark for light/dark rhythm, edged with a brass dashed frieze.

## Components

- Buttons: `.btn--brass` (gradient brass, dark ink), `.btn--ghost` (brass-line outline), `.btn--ink` (enamel).
- `.flavor` cards: brass-framed inset, image + engraved name + small-caps kicker; click → `.modal` lightbox.
- `.plaque` branch cards along the `.promenade` drawn SVG boulevard.
- Reusable carousel engine (`makeCarousel`): arrows, dots, swipe, autoplay — used for Celebridades and Reviews.
- `.modal` lightbox (focus-managed, Esc/overlay close).

## Motion (orchestrated, one grammar)

- Hero `ken-burns` (26s) + gaslight glow scrim; scroll cue line.
- `.reveal` scroll-in (IntersectionObserver, exponential ease-out from visible default).
- Champola brass leader-line `.callout`s draw in sequence when the figure enters view.
- "También de temporada" list reveals line-by-line.
- `.promenade__road` SVG dashes draw across on view.
- All bounded by `prefers-reduced-motion`.

## Browser surfaces

Themed from palette: `::selection` brass-on-green, brass custom scrollbar, brass-hi `:focus-visible` rings, `theme-color` `#0c1d16`.

## Sections

Nav (fixed, brass-hairline shrink on scroll) → Hero (100svh storefront) → Historia (marble) → Champola (monument + callouts) → Sabores (flavor cards + seasonal list) → Celebridades (carousel) → Visítanos (promenade map of 5 enamel branch plaques + hours + reviews) → Footer.

## Fonts loaded

`Marcellus`, `Marcellus SC`, `Hanken Grotesk:wght@300;400;500;600;700` via Google Fonts.

## Accepted trades

- `.nav__inner` transitions `padding` on the scroll-shrink (detector `layout-transition` warning): deliberate, single element, fires once at the 30px threshold.
