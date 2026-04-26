# Design System — `/simulations/product-flow/sample-hexahealth`

A reference of the visual language used on the HexaHealth sample product-flow report page. This page is composed of three building blocks:

1. **`TopBar`** (`src/components/app/TopBar.tsx`) — fixed app shell header
2. **`FlowAnalysisView`** (`src/components/flow-analysis/FlowAnalysisView.tsx`) — sticky tab bar + content router
3. **Tab contents** — `StudyOverviewTab`, `DropOffFunnel`, optional `DeepDiveTab`

All visual tokens below are sourced from those files plus `src/app/globals.css` and `src/app/layout.tsx`.

---

## 1. Foundations

### 1.1 Page frame

| Property | Value |
|---|---|
| `html/body` background | `#F2F0EC` (warm off‑white / "paper") |
| Flow page background | `#F5F4F2` (slightly cooler paper) |
| Study Overview tab background | `#F2F0EC` |
| Content max-width | `1280px`, centered with `32px 24px 80px` padding |
| TopBar height | `64px` (`h-16`), `sticky top-0`, `z-30` |
| Tab bar | `sticky top: 52`, `z-20`, `borderBottom: 1px solid #E5E7EB` |
| Horizontal gutter | `24px` (desktop), `16px` (mobile) |
| Base rhythm | 4px spacing scale (`--space-1`..`--space-24`) |

### 1.2 Color palette

**Brand / accent**

| Token | Hex | Usage |
|---|---|---|
| Primary accent | `#E8583A` | Active tab underline + text, ActDivider gradient, hero glow, brand label "THE HEADLINE FINDING" |
| Accent gold | `#F59E0B` | User avatar fallback, TopBar tertiary accent (`--accent-gold`) |
| Accent gold dark | `#B8860B` | Reading-guide help icon |

**Neutrals (light surface set — what the page actually uses)**

| Token | Hex | Usage |
|---|---|---|
| Paper (body) | `#F2F0EC` | Page background |
| Paper 2 (flow) | `#F5F4F2` | FlowAnalysisView background |
| Card surface | `#FFFFFF` | All cards (score cards, friction cards, theme cards, modals) |
| Muted surface | `#F9FAFB` | MiniStat, DetailRow, connected-item blocks |
| Near-black ink | `#1A1A1A` | Primary text, headings, H1 in TopBar |
| Dark hero bg | `#1A1814` | ExecSummary banner background |
| Secondary text | `#4B5563` | Body copy in cards / modals |
| Tertiary text | `#6B7280` | Subtitles, breadcrumb, inactive tab |
| Quaternary text | `#9CA3AF` | Captions, "View details →", rank numbers |
| Divider | `#E5E7EB` | Borders, dividers |
| Divider warm | `#E8E4DE` | TopBar bottom border, reading-guide card |
| Hairline | `#D1D5DB` | Card outer borders (`0.5px solid`) |
| Row hover | `#F5F5F5` | TopBar icon-button hover |

**Semantic (status) colors**

| Intent | Text | Tint BG | Used by |
|---|---|---|---|
| Success / positive | `#10B981` / `#065F46` | `#D1FAE5` | Completion, positive deltas, "This Sprint", SUS A/B |
| Success alt | `#16A34A` | `#F0FDF4` / border `#BBF7D0` | Funnel "Enter" / remaining ≥ 70% |
| Warning | `#F59E0B` / `#92400E` | `#FEF3C7` | "Needs improvement", SUS C/D |
| Warning alt | `#D97706` / `#EA580C` | `#FFF7ED` / border `#FED7AA` | High-severity friction drop % |
| Danger | `#EF4444` / `#991B1B` | `#FEE2E2` / `#FEF2F2` | Critical severity, negative delta, "What actually happened" panel |
| Info | `#3B82F6` / `#1E40AF` | `#DBEAFE` | "Next Sprint" routing |
| Neutral | `#6B7280` | `#F3F4F6` | Backlog, unaffected personas |

**Persona chip palette** (soft pastels, text darkened)

| Persona | BG | Text | Border |
|---|---|---|---|
| Pragmatist | `#EDE9FE` | `#5B21B6` | `#C4B5FD` |
| Skeptic | `#FEF3C7` | `#92400E` | `#FCD34D` |
| Enthusiast | `#D1FAE5` | `#065F46` | `#6EE7B7` |
| Confused Novice | `#DBEAFE` | `#1E40AF` | `#93C5FD` |
| Default fallback | `#F3F4F6` | `#374151` | `#D1D5DB` |

**Emotion tags** reuse success/warning/danger tints (`CONFIDENT/DELIGHTED` → green, `HESITATED` → amber, negative → red).

---

## 2. Typography

Three font families are loaded at the root and per-page:

| Font | CSS variable | Where used |
|---|---|---|
| **Inter** (default sans) | `--font-inter` | Body text, numbers, UI chrome |
| **Plus Jakarta Sans** (500/600/700/800) | `--font-plus-jakarta` | Section titles like "Drop-Off Funnel" (uppercase, tracked) |
| **Geist Mono** | `--font-geist-mono` | Monospace / data |
| **Playfair Display** | `--font-flow-display` | Loaded on this page, display accent (editorial headings) |
| **DM Sans** | `--font-flow-body` | Loaded on this page, alt body pairing |

### 2.1 Type scale (as used in components)

| Role | Size | Weight | Color | Letter-spacing |
|---|---|---|---|---|
| Page title (TopBar H1) | `text-2xl` / 24px | 700 | `#1A1A1A` | — |
| Breadcrumb | `text-sm` / 14px | 400 | `#6B7280` | — |
| ActDivider label | 28px | 800 | `#1A1A1A` | `-0.02em` |
| Section title (`SectionTitle`) | 18px | 500 | `#1A1A1A` | — |
| Section number (`01` / `02`) | 11px | 500 | `#6B7280` | `1px`, UPPERCASE |
| Section subtitle | 13px | 400 | `#6B7280` | — |
| Card title | 15–16px | 500 | `#1A1A1A` | `line-height 1.4–1.45` |
| Score value | 36px | 800 | `#1A1A1A` | `line-height 1` |
| Big drop % | 28px | 500 | `fpDropColor(sev)` | `line-height 1` |
| Hero finding (exec) | 24px | 500 | `#FFF` | `-0.01em`, max-width 980 |
| Pill | 12px | 600 | intent-specific | — |
| Meta chip (dark hero) | 11px | 600 | `rgba(255,255,255,0.65)` | — |
| Eyebrow ("THE HEADLINE FINDING") | 12px | 600 | `#E8583A` | `0.16em`, UPPERCASE |
| Key label ("What users said") | 11px | 500 | `#6B7280` | `0.5px`, UPPERCASE |
| Caption | 11–12px | 400 | `#9CA3AF` | — |
| Tab label | 18px | 500 inactive / 600 active | `#6B7280` / `#E8583A` | — |
| Body in cards | 13–14px | 400 | `#4B5563` | `line-height 1.5–1.6` |
| Quote | 13px italic | 400 | `#4B5563` | — |

Global utility classes in `globals.css` also expose `.text-display`, `.text-h1`…`.text-h4`, `.text-body-lg`, `.text-body`, `.text-caption`, `.text-label` but the components on this page mostly use inline sizing.

---

## 3. Layout

### 3.1 Shell

```
┌───────────────────────────────────────────────┐  h 64  #FFF, border-bottom #E8E4DE, sticky
│  TopBar: title + breadcrumb │ credits bell ▾ │
├───────────────────────────────────────────────┤  h ~52, sticky, #F5F4F2, border-bottom #E5E7EB
│  [ Overview ]  [ Drop-Off Funnel ]  [ Deep… ] │  active = #E8583A underline
├───────────────────────────────────────────────┤
│                                               │
│   ReadingGuide (dismissible, white card)      │  max-w 1280, px 24, pt 12
│                                               │
│   Tab content                                 │  max-w 1280, px 24, pb 80
│                                               │
└───────────────────────────────────────────────┘
```

### 3.2 Study Overview grid (Act 1 / Act 2 / Act 3)

- **ActDivider** — 2px gradient bar (`#E8583A → #E5E7EB → #E8583A`) with a centered 28/800 title (`What Happened`, `Why It Happened`, `What To Do`).
- **SectionHeader** — uppercase number eyebrow → 18/500 title → 13/400 subtitle.
- **SectionDivider** — `marginTop/Bottom: 36`, `1px solid #E5E7EB`.
- **Score strip** — 3-up responsive grid, `gridTemplateColumns: repeat(auto-fit, minmax(280px, 1fr))`, gap 16.
- **Friction points grid** — ≤3 items → `repeat(N, 1fr)`; ≥4 → `1fr 1fr`; gap 12.
- **Themes grid** — `1fr 1fr`, gap 12.
- **Comparison / segment table** — two-column comparison.

### 3.3 Drop-Off Funnel layout

Three-column layout (`dropoff-3col` class) with a 240 px sticky left funnel pinned at `top: 120`, gap 20.

---

## 4. Components & patterns

### 4.1 Card (primary)

- Background `#FFFFFF`
- Border `0.5px solid #D1D5DB` (note: **half-pixel**, not 1 px — gives a precise editorial feel)
- Border-radius **12**
- Padding `18–20px 20px`
- Hover: border → `#9CA3AF`, `.viewHint` text → `#1A1A1A`, `transition-colors 0.15s`
- Footer hint: `View details →` at 11 px right-aligned

### 4.2 Score card

- White card, border-radius **16**, border `1px solid #E5E7EB`
- Left 4 px colored rail in status color (`radius 16 0 0 16`)
- Box-shadow `0 1px 4px rgba(0,0,0,0.04)`
- Title: 12/600 uppercase `#9CA3AF`, letter-spacing `0.06em`, with `InfoTooltip` `i` affordance
- Value: 36/800 `#1A1A1A`
- Subtitle row for pills / deltas

### 4.3 Pill / chip

```
padding: 4px 12px;
border-radius: 999px;
font: 12/600;
white-space: nowrap;
bg + text from intent map
```

### 4.4 Executive summary banner (hero)

- Background `#1A1814` (near-black warm), `border-radius 20`, `padding 40px 44px`
- Ambient glow: absolute 280×280 circle, `rgba(232,88,58,0.18)`, `filter: blur(90px)` top-right
- Eyebrow: brand accent
- Meta chips: `rgba(255,255,255,0.06)` bg, `1px solid rgba(255,255,255,0.1)`, rounded-full
- Hero sentence: 24/500 white, 1.4 line-height, max-width 980
- "Also true" grid: translucent `rgba(255,255,255,0.04)` cards, border `rgba(255,255,255,0.08)`, radius 10

### 4.5 Modal / popup (friction point, theme, behavioral pattern)

- Scrim: `rgba(0,0,0,0.4)` full-screen, `zIndex 9999`, flex-centered, 24 px padding
- Sheet: white, radius **12**, `max-width 680`, `max-height 85vh`, `overflow-y auto`, padding 28
- Close button: 16 px `X`, thin border `1px solid #E5E7EB`, radius 6, icon color `#9CA3AF`
- Internal hierarchy: H4 18/500 → severity pill row → expected/experienced split panel → quotes → metadata grid → cross-links

### 4.6 Expected vs experienced panel

Stacked panel inside radius-10 border `1px solid #E5E7EB`:

- Top row ("What users expected"): plain white, 11/500 grey label → 13/1.5 body
- Bottom row ("What actually happened"): `#FEF2F2` bg, `#991B1B` label

### 4.7 Quote line

- `MessageSquareQuote` icon 13 px, `#D1D5DB`, aligned top
- Quote 13 px italic `#4B5563`, wrapped in curly quotes (`&ldquo; &rdquo;`)
- Attribution 11 px `#9CA3AF` persona_type under the quote

### 4.8 Tab bar

- 14 px / 24 px padding per tab
- 18/500 (inactive) → 18/600 (active)
- Active underline: `2.5px solid #E8583A`, sits on the bottom border of the strip (`marginBottom: -1`)
- Icon size 18, opacity `1` active / `0.5` inactive

### 4.9 Info tooltip

- 14×14 circled lowercase `i`, `0.5px solid #D1D5DB`, `#6B7280`, 9 px
- Opens after 150 ms hover delay, above or below based on available space
- Floating card: 280 px wide, white, `0.5px solid #E5E7EB`, radius 12, padding 16, shadow `0 4px 20px rgba(0,0,0,0.10)`, 8×8 rotated caret

### 4.10 Drop-off funnel pieces

- "Enter" badge: `#F0FDF4` bg, `#BBF7D0` border, `#16A34A` text, 11/600 in a pill
- Severity badges: critical `#FEE2E2/#DC2626/#FCA5A5`, warning `#FFF7ED/#EA580C/#FED7AA`, safe `#F0FDF4/#16A34A/#BBF7D0`
- Remaining % color thresholds: ≥70 green, 40–70 orange, <40 red

### 4.11 Reading guide (`ReadingGuide.tsx`)

- White card, `1px solid #E8E4DE`, radius 12, padding 20, shadow `0 1px 3px rgba(0,0,0,0.04)`
- 3-column responsive explainer (`md:grid-cols-3`)
- `HelpCircle` in `#B8860B`
- Dismissal stored at `localStorage["apriori.readingGuide.dismissed.v1"]`; dismissed state shows a tiny `How to read this report` trigger

---

## 5. Radii, borders, shadows

| Element | Radius |
|---|---|
| Chip / pill | `999` (full) |
| Small button / close | 6 |
| Muted row / inner block | 10 |
| Default card, modal | 12 |
| Score card | 16 |
| Exec summary banner | 20 |

| Border | Value |
|---|---|
| Hairline card | `0.5px solid #D1D5DB` |
| Standard | `1px solid #E5E7EB` |
| Warm (shell) | `1px solid #E8E4DE` |
| Dashed empty-state | `1px dashed #D1D5DB` |

| Shadow | Value |
|---|---|
| Card | `0 1px 4px rgba(0,0,0,0.04)` |
| Reading guide | `0 1px 3px rgba(0,0,0,0.04)` |
| Tooltip | `0 4px 20px rgba(0,0,0,0.10)` |
| TopBar dropdown | `0 4px 24px rgba(0,0,0,0.1)` |

---

## 6. Motion

Framer Motion is used in overview + funnel components with a consistent grammar:

| Pattern | Values |
|---|---|
| Section/card mount | `initial {opacity:0, y:10–12}` → `animate {opacity:1, y:0}`, `duration 0.35–0.4` |
| Modal scrim | `opacity 0 ↔ 1`, `duration 0.18` |
| Modal sheet | `opacity 0, scale 0.96, y 10` → `1, 1, 0`, `duration 0.2` |
| Tab content | CSS `animate-fadeIn`, `animation-duration: 200ms` |
| Hover transitions | `transition-colors 0.15s` on borders and text |
| Easing tokens (CSS) | `--ease-in-out`, `--ease-out`, `--ease-in`, `--ease-bounce` |

---

## 7. Iconography

- Library: **lucide-react** used throughout (`BarChart3`, `Layers`, `TrendingDown`, `Activity`, `ChevronDown/Right`, `X`, `HelpCircle`, `MessageSquareQuote`, `ArrowUp/Down`, `Info`, `Bell`, `Menu`, `LogOut`).
- Default sizes: 13 (in-flow), 14 (tooltip target, chevrons), 16 (modal close, nav), 18 (tab icon), 20 (TopBar actions).
- Stroke uses current color; tinted via `color` prop or inline `style`. Standard icon sizes also exposed as CSS vars: `--icon-xs 14`, `--icon-sm 16`, `--icon-md 20`, `--icon-lg 24`, `--icon-xl 32`, `--icon-2xl 48`.

---

## 8. Interaction / affordance rules

- **Hover-only cards expose depth via border darkening**, never via shadow growth.
- **"View details →"** hint brightens from `#9CA3AF` to `#1A1A1A` as the only text-color signal that a card is clickable.
- **Popups close** via scrim click, `X` button, and stop click-propagation on the sheet.
- **Stickiness stacking**: TopBar z-30 > tab bar z-20 > funnel sticky column (`top: 120`).
- **Empty states** use `#F9FAFB` bg, `1px dashed #D1D5DB`, centered 14 px grey message.

---

## 9. Writing / micro-copy conventions

- Section eyebrows are numeric and uppercase: `01`, `02`, `03`.
- Uppercase labels (severity, persona) are pushed through `humanize()` which replaces `_` with space and title-cases — e.g. `needs_improvement` → `Needs Improvement`.
- Quotes always use true curly quotes (`&ldquo;`, `&rdquo;`).
- Score units appear as small grey follow-ons, never as superscripts.
- Deltas are signed with `ArrowUp`/`ArrowDown` in green/red plus `Math.abs(value).toFixed(1)`.

---

## 10. Tokens quick-reference (copy-paste)

```ts
// Brand
const ACCENT = "#E8583A";
const ACCENT_GOLD = "#F59E0B";

// Surfaces
const PAGE_BG = "#F2F0EC";
const FLOW_BG = "#F5F4F2";
const CARD_BG = "#FFFFFF";
const MUTED_BG = "#F9FAFB";
const HERO_BG = "#1A1814";

// Ink
const INK = "#1A1A1A";
const TEXT_2 = "#4B5563";
const TEXT_3 = "#6B7280";
const TEXT_4 = "#9CA3AF";

// Lines
const BORDER = "#E5E7EB";
const BORDER_WARM = "#E8E4DE";
const HAIRLINE = "#D1D5DB";  // used at 0.5px

// Status
const OK = "#10B981";  const OK_BG = "#D1FAE5";  const OK_INK = "#065F46";
const WARN = "#F59E0B"; const WARN_BG = "#FEF3C7"; const WARN_INK = "#92400E";
const BAD = "#EF4444";  const BAD_BG = "#FEE2E2";  const BAD_INK = "#991B1B";
const INFO = "#3B82F6"; const INFO_BG = "#DBEAFE"; const INFO_INK = "#1E40AF";
```

---

## 11. Notable quirks worth preserving

1. **0.5 px hairlines** on default cards — deliberately thinner than the 1 px system border; gives an editorial, print-like feel against the warm paper background.
2. **Two paper backgrounds** (`#F2F0EC` vs `#F5F4F2`) depending on tab — both chosen to contrast softly with white cards without being neutral grey.
3. **Single brand hue** — only `#E8583A` is used as brand; everything else is either neutral or a semantic status color. Avoid introducing a second brand tint.
4. **Gradient usage is rare and intentional** — limited to ActDivider bars and the exec-summary radial glow.
5. **Globals.css declares a dark theme too** (`--bg-primary: #0A0E1A`, amber accents), but this page does **not** consume them — it lives entirely in the light surface set.
6. **Font loading is per-page**: Playfair Display + DM Sans are attached via CSS variables (`--font-flow-display`, `--font-flow-body`) on the `sample-hexahealth` wrapper; the rest of the app uses Inter / Plus Jakarta / Geist Mono from the root layout.
