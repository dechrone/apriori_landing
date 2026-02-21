---
description: Dashboard UI design principles derived from analysis of Orbix Studio, Finexy, and Veselty dashboards. Apply these rules when building, updating, or reviewing any dashboard component, layout, or page.
globs: **/*.{tsx,jsx,css,scss,html}
alwaysApply: false
---

# Dashboard Design System Rules

## Color

- Use a **single warm accent color** from the orange family (red-orange → vivid orange → coral). Never introduce a second accent color. All expressive work is done by one hue.
- The accent color is a **spotlight, not a paintbrush**. Apply it only to: active nav states, primary CTA buttons, positive trend indicators, selected/highlighted states, and featured card fills. Everything else gets neutrals.
- Page background: light gray or warm off-white (e.g. `#F5F5F5`, `#F7F6F4`). Never pure white for the page itself.
- Card background: pure white (`#FFFFFF`).
- Text: near-black for primary values/headings (`#1A1A1A`), medium gray for labels (`#6B7280`), light gray for tertiary/disabled (`#9CA3AF`).
- Status colors follow a fixed semantic map: green = positive/active, red = negative/inactive/error, orange = pending/in-progress, gray = neutral/unknown.

## Cards

- Cards are the **atomic layout unit**. All content lives inside a card. Nothing bleeds between cards.
- Card separation is achieved with **drop shadow only** — never borders. Borders imply flatness; shadow implies lift.
- Shadow should be subtle: `box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)`.
- Apply a **consistent border-radius** of `12px`–`16px` to all cards, buttons, badges, inputs, and chart containers. This radius is a design token — it must be uniform.
- Internal card padding: `20px`–`24px`. Never less than `16px`.
- Each card has **one clear responsibility**. If a card is doing two things, it should be two cards.

## Typography

- Use a clean **geometric or humanist sans-serif**. Avoid decorative or display fonts. The typeface is neutral — hierarchy is expressed through size and weight, not the font itself.
- Every data widget follows this strict hierarchy:
  1. **Primary metric** — largest text on the card, bold (e.g. `2rem`–`2.5rem`)
  2. **Card label** — small, medium-gray, lighter weight (e.g. `0.75rem`, `font-weight: 500`)
  3. **Secondary context** — smallest, muted (e.g. `0.7rem`, gray)
- The number is the content. The label describes it. Size the number first.
- Page/section titles: large and bold. They orient, not decorate.

## Layout

- Use a **left sidebar** for primary navigation. The sidebar must have grouped sections with labeled categories (e.g. MAIN MENU, ACCOUNT). Flat ungrouped lists are not acceptable.
- Active nav state must be unambiguous — use a filled pill, left border highlight, or bold weight with accent color.
- User avatar/profile always appears at the bottom of the sidebar or far top-right of the header.
- Settings and utility links (help, feedback, logout) go at the very bottom of the sidebar at lowest visual priority.
- Main content area uses a **card grid**. Prefer 2–3 column layouts. Allow cards to span columns when content demands it.
- **Header bar is a fixed utility layer** containing, always in this order: Search (center-left), Notifications icon (top-right area), User profile avatar + name (far top-right). Do not deviate from this arrangement.

## Data & Metrics

- Every metric widget leads with the **oversized number**, followed by the label below it. Never label-then-number.
- Trend indicators use a shared visual language: `↑ 7%` in green or `↓ 5%` in red, always contained in a pill or inline badge. This must be consistent across every widget on the page.
- Use **mixed chart types** across a dashboard. Never repeat the same chart type more than twice on one screen. Variety prevents visual fatigue and makes each widget feel purpose-built.
  - Good mix: bar chart + area chart + progress ring + sparkline + heatmap
  - Bad: five bar charts
- Embed **inline filtering controls** directly on the card that owns the data. Use dropdowns (`This month ▾`), filter chips (pill buttons), or toggle groups. Never require navigation to filter data.
- Tooltips should appear on hover for charts, showing contextual values (e.g. `+19%` callout on a data point).

## Spacing & Rhythm

- Use an **8px base grid**. All spacing values must be multiples of 8 (8, 16, 24, 32, 40, 48...).
- Gaps between cards: `16px`–`24px`.
- Section spacing (between grid rows): `24px`.
- Sidebar width: `220px`–`260px` for text sidebars; `56px`–`72px` for icon-only sidebars.

## Interaction & States

- Every interactive element must have a clear **hover state** and a clear **active/selected state**.
- Active nav items must be immediately distinguishable at a glance — not subtle.
- Filter chips/pills: selected state uses accent color fill with white text; unselected uses gray background with dark text.
- Primary CTA buttons use **accent color fill**. Secondary actions use white/outline style.
- Overflow actions (`...` menus) are acceptable for table rows and cards where surfacing all actions would cause clutter.

## What to Avoid

- ❌ More than one accent color family
- ❌ Card borders instead of shadows
- ❌ All the same chart type across a dashboard
- ❌ Decorative or display typefaces
- ❌ Labels above or beside numbers instead of below them
- ❌ Navigation away from a card to filter its data
- ❌ Irregular border-radius across components
- ❌ Pure white page backgrounds
- ❌ Flat navigation lists without grouped sections
- ❌ Search, notifications, or user avatar in non-standard header positions
