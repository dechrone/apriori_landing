---
description: Dashboard UI design principles derived from analysis of Orbix Studio, Finexy, and Veselty dashboards. Apply these rules when building, updating, or reviewing any dashboard component, layout, or page.
globs: **/*.{tsx,jsx,css,scss,html}
alwaysApply: false
---

# Dashboard Design System Rules

## Color

- Use a **single warm accent color** from the orange family (red-orange → vivid orange → coral). Never introduce a second accent color. All expressive work is done by one hue.
- The accent color is a **spotlight, not a paintbrush**. Apply it only to: active nav states, primary CTA buttons, positive trend indicators, selected/highlighted states, and featured card fills. Everything else gets neutrals.
- Page background: warm off-white `#F5F3F0`. Never pure white for the page itself.
- Card background: pure white (`#FFFFFF`).
- Text: near-black for primary values/headings (`#1A1A1A`), medium gray for labels (`#4B5563`), light gray for tertiary/disabled (`#9CA3AF`).
- Status colors follow a fixed semantic map: green = positive/active, red = negative/inactive/error, orange = pending/in-progress, gray = neutral/unknown.

## Sidebar

- Sidebar background must be visually distinct from main content.
  Use `#EEEAE4` (warm tinted) as default. Width: 240px.
- Nav items: 14px, font-weight 500, 10px vertical padding, 12px horizontal.
- Icons: always 18px. Never smaller. Color #9CA3AF default, #F59E0B active.
- Active state: filled pill, background #FEF3C7, text #92400E, icon #F59E0B,
  font-weight 600. Pill must have border-radius 8px and margin 8px from edges.
- Section labels: 11px, font-weight 600, letter-spacing 0.08em, color #9CA3AF.
- The workspace/brand name is treated as a logotype: 17px, font-weight 700.

## Typography Scale (Page Level)

- Page title: 26px, font-weight 700, color #1A1A1A.
- Section headers: 18px, font-weight 600.
- Card titles: 15–16px, font-weight 600.
- Body / form labels: 14px, font-weight 400–500.
- Helper / instructional text: minimum 13px, color #4B5563.
  NEVER use #9CA3AF for instructional copy. That color is for timestamps and microlabels only.
- Step labels: 11px, font-weight 600, letter-spacing 0.07em, #9CA3AF.
  Followed by description at 13px #4B5563.

## Cards

- Cards are the **atomic layout unit**. All content lives inside a card. Nothing bleeds between cards.
- Card separation is achieved with **drop shadow only** — never borders. Borders imply flatness; shadow implies lift.
- Shadow should be subtle: `box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)`.
- Apply a **consistent border-radius** of `14px` to all cards. Inputs get `8px`. Pills get `24px`.
- Internal card padding: `20px`–`24px`. Never less than `16px`.
- Each card has **one clear responsibility**. If a card is doing two things, it should be two cards.

## Empty States

- Empty states are fully designed screens. A gray void with one button is not acceptable.
- Required structure: illustrated icon in tinted circle + benefit-led headline (18px 600) +
  subtext (14px #4B5563, max 360px wide) + primary CTA + 2–3 ghost placeholder cards.
- Ghost cards: opacity 0.35, pointer-events none, show real card structure with
  gray placeholder bars.
- Headlines must sell the feature, not just state the absence.
  "Build your first audience" not "No audiences yet."

## Content Density

- No page should exceed 50% empty gray viewport space unless it is an intentional
  form/focus view.
- Form pages must use a progress step indicator and max-width container (560–640px).
- If a form page is narrow, add a contextual tip or help panel to use remaining space.

## Layout

- Use a **left sidebar** for primary navigation. The sidebar must have grouped sections with labeled categories (e.g. MAIN MENU, ACCOUNT). Flat ungrouped lists are not acceptable.
- Active nav state must be unambiguous — use a filled pill with accent-light background.
- User avatar/profile always appears at the bottom of the sidebar or far top-right of the header.
- Settings and utility links (help, feedback, logout) go at the very bottom of the sidebar at lowest visual priority.
- Main content area uses a **card grid**. Prefer 2–3 column layouts. Allow cards to span columns when content demands it.
- **Header bar is a fixed utility layer** at 56px height: page title (26px bold), notifications icon (20px), user avatar (34px).

## Data & Metrics

- Every metric widget leads with the **oversized number**, followed by the label below it. Never label-then-number.
- Trend indicators use a shared visual language: `↑ 7%` in green or `↓ 5%` in red, always contained in a pill or inline badge. This must be consistent across every widget on the page.
- Use **mixed chart types** across a dashboard. Never repeat the same chart type more than twice on one screen.

## Interactive States

- All cards must have hover states: translateY(-1px) + deeper shadow.
- Input focus: border-color accent, box-shadow 0 0 0 3px rgba(accent, 0.15).
- Floating action buttons: pill shape (border-radius 24px), accent shadow
  rgba(245,158,11,0.35).

## Spacing & Rhythm

- Use an **8px base grid**. All spacing values must be multiples of 8 (8, 16, 24, 32, 40, 48...).
- Gaps between cards: `16px`–`20px`.
- Section spacing (between grid rows): `32px`.
- Sidebar width: `240px` for text sidebars; `72px` for icon-only sidebars.

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
- ❌ Using #9CA3AF for instructional copy (use #4B5563 instead)
- ❌ Empty states with just an icon and text in a gray void