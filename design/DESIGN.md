# DESIGN — VERNIER-10

> Style contract for the VERNIER-10 Video.js v10 custom skin and architectural workbench. Read before editing tokens, components, or layout rules.

## Identity
- **The one feeling:** A Braun / Leica precision optical transport instrument resting on a daylit architectural drafting table.
- **Signature / peak:** The millimeter-graduated Vernier scrub rail (`<media-time-slider>` + `<media-time-slider-chapters>`) with its Signal Vermilion razor playhead needle and cantilevered optical film-loupe preview (`<media-slider-thumbnail>` + chapter title + tabular pointer timecode).
- **Register:** `build` (high-craft interactive workbench + reusable component skin).

## Tokens (verbatim from shipped CSS)
```css
:root {
  /* Workbench Surface (Cool Mineral Drafting Vellum, L = 0.925) */
  --wb-bg: oklch(0.925 0.008 220);
  --wb-surface: oklch(0.975 0.004 220);
  --wb-surface-alt: oklch(0.945 0.006 220);
  --wb-ink: oklch(0.15 0.015 240);
  --wb-muted: oklch(0.42 0.015 240);
  --wb-accent: oklch(0.60 0.215 28);

  /* Skin Chassis Tokens (Obsidian Default) */
  --vernier-accent: oklch(0.60 0.215 28);
  --vernier-surface: oklch(0.145 0.012 240 / 0.95);
  --vernier-surface-elevated: oklch(0.19 0.014 240 / 0.98);
  --vernier-ink: oklch(0.97 0.004 220);
  --vernier-ink-muted: oklch(0.76 0.01 230);
  --vernier-rim: oklch(0.97 0.004 220 / 0.24);
  --vernier-focus-ring: oklch(0.63 0.22 28);
  --vernier-focus-halo: oklch(0.99 0.002 220 / 0.94);

  /* Motion */
  --vernier-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}
```

## Typography
- **Display:** `'Bricolage Grotesque'` (weights 600–800, `letter-spacing: -0.025em`, `line-height: 1.02`, `text-wrap: balance`).
- **UI / Prose:** `'Plus Jakarta Sans'` (weights 400–700, `line-height: 1.5`, `max-width: 65ch`–`68ch`, `text-wrap: pretty`).
- **Tabular Numerals & Code:** `'JetBrains Mono'` (`font-variant-numeric: tabular-nums`) reserved strictly for player timecode (`MM:SS`), width gauge badge, and code snippet inspector.
- **Forbidden faces:** `Inter`, `Space Grotesk`, `Instrument Serif`, `Playfair Display`.

## Color rules
- **Commitment tier:** Restrained-to-committed workbench (`L = 0.925`, cool mineral hue 220) paired with high-contrast dark optical cinema aperture (`L ≈ 0.08`) and Signal Vermilion (`oklch(0.60 0.215 28)`) strictly for playhead, live transport indicator, and active calibration states.
- **Forbidden:** Purple-blue gradients (hue 250–290), warm-cream body backgrounds (hue 40–100), gradient text (`background-clip: text`), and low-contrast light-gray labels.

## Motion vocabulary
- **Standard UI transitions:** `120ms`–`220ms` using `cubic-bezier(0.23, 1, 0.32, 1)` (`ease-out-quart`). Zero `ease-in` on UI; zero `transition: all`.
- **Hover interactions:** Always gated behind `@media (hover: hover) and (pointer: fine)`.
- **Origin awareness:** Loupe preview uses `transform-origin: bottom center`; speed menu uses `transform-origin: bottom right`; tooltips use `data-side` origin.
- **Web Audio clicks:** Singleton `AudioContext`, max gain `0.04` (`<= 0.08`), exponential decay, disabled when `prefers-reduced-motion: reduce` matches, and triggered only on explicit pointer clicks (never on hover, scroll, or keyboard navigation).
- **Three.js studio horizon:** 4-light calibrated rig with `ACESFilmicToneMapping`, DPR capped at `2`, zero fullscreen bloom/grain post-passes, and static single-frame render under `prefers-reduced-motion: reduce`.

## Layout patterns
- **Asymmetric 8 / 4 Split (Grid Break):** On viewports `>= 980px`, the Calibration Rail overlaps the right shoulder of the player plinth by `margin-left: -24px`.
- **Below-stage documentation:** Tabular specification ledger (`<table>`) + tabbed copyable code inspector. No repetitive equal-size card grids or bento blocks.
- **Container queries:** `@container vernier-player (max-width: 600px)` and `(max-width: 440px)` preserve `>= 44px` touch targets down to `320px`.

## Rejected — decisions that already have a history

| What was tried | Why it lost | What is there instead |
|---|---|---|
| Dark `#0a0c10` full-page showcase background | Matched the generic dark-mode dev-tool reflex and violated `COMMIT-SHEET.md` §2 (`L = 0.925`) and §7 | Cool mineral drafting vellum (`oklch(0.925 0.008 220)`) with optional Darkroom toggle |
| `backdrop-filter: blur(12px)` on control deck | Triggered `GLASS_CARD` slop heuristic and reduced contrast over bright glare frames | Solid-leaning anodized ceramic (`0.95`–`0.96` alpha) with crisp 1px rim |
| Vidstack `event="pointerup" action="toggle:paused"` attributes | Incompatible with Video.js v10 `@videojs/html` (`type="tap" action="togglePaused"`) | Verified Video.js v10 `<media-gesture>` and `<media-hotkey>` actions (`togglePaused`, `seekStep`, `toggleSubtitles`) |
| Hiding `<media-slider-thumbnail>` via `:not([data-src]):empty` | `@videojs/html` renders thumbnails inside Shadow DOM, so `:empty` is always true | Hide via `[data-hidden]`, `[data-error]`, `[hidden]`, and `.vernier-stage:not(.has-storyboard)` |

| `<media-time>00:00</media-time>` fallback text | Concatenated `"00:00"` + `"0:35"` into `"00:000:35"` after upgrade | Empty `<media-time>` elements with CSS `media-time:not(:defined):empty::before` |
| `.vernier-stage:focus-within` on controls visibility | Mouse clicks left focus on buttons, preventing auto-hide | `:has(:focus-visible)` on `.vernier-controls-content` only |
| Tag-qualified CSS selectors (`media-controls.vernier-controls`) | Broke `@videojs/react` styling because React renders `<div>`/`<button>` | Class-based selectors across `src/vernier-skin.css` shared by HTML and React |
| Fixed full-screen Three.js ring (`x = -1.1`) | Crossed hero masthead text and floated over below-fold tables | Positioned at upper-right hero horizon (`position: absolute; opacity: 0.22`) |

## Editing protocol
1. Read this file and `design/COMMIT-SHEET.md` before modifying tokens or UI components.
2. Keep `src/vernier-skin.css` and `src/vernier-skin.js` zero-dependency and synchronized with `index.html`, `src/vernier-skin.html`, `src/vernier-skin.react.tsx`, and `netlify-drop-skin/index.html`.
3. Verify zero `transition: all`, zero `addEventListener('scroll')`, zero unthrottled `pointermove`, explicit `poster` on every `<video>`, and clean `prefers-reduced-motion` degradation.
