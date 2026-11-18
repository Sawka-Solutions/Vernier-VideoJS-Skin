# COMMIT-SHEET — VERNIER-10 (Video.js v10 Custom Skin & Workbench)

## 1. Peak / Signature
The player's bottom control deck is a **precision calibrated optical Vernier scrub rail** (`<media-time-slider>` rendered as a millimeter-graduated rule with a vermilion razor playhead needle and a cantilevered optical film-loupe preview showing Mux storyboard frames and tabular pointer timecode), paired with solid anodized switchgear that stays high-contrast over both blinding snow and pitch-black space footage.

## 2. Color
- **Primary Brand Accent:** `oklch(0.60 0.215 28)` — Signal Vermilion (optical calibration red-orange, Dieter Rams / Leica shutter accent).
- **Commitment Tier:** Restrained-to-Committed editorial studio + high-contrast dual-polarity skin tokens.
- **Why not lavender, cream, or category reflex:** Refuses the developer-tool dark-void + purple/cyan glow reflex (1st order) and refuses warm cream/beige editorial serif (2nd order).
- **Showcase Background Lightness (mean L):** **L = 0.925** (`oklch(0.925 0.008 220)` cool mineral drafting vellum). Chosen because precision optical instruments are inspected on a lit architectural light-table, leaving the cinema frame itself as the dark optical aperture (`L ≈ 0.08`).
- **Skin Chassis Tokens:**
  - Obsidian Polarity (default over moving video): `oklch(0.145 0.012 240 / 0.94)` solid-leaning anodized ceramic with `oklch(0.97 0.004 220 / 0.28)` crisp 1px outer mineral rim (`> 13:1` text contrast regardless of frame luminance underneath).
  - Daylight Ceramic Polarity (toggleable): `oklch(0.955 0.006 220 / 0.95)` matte ceramic with `oklch(0.14 0.012 240)` ink and `oklch(0.14 0.012 240 / 0.26)` hairline rim.

## 3. Type
- **Display:** `Bricolage Grotesque` (weights 600–800, optical ink traps, architectural industrial character).
- **UI / Prose:** `Plus Jakarta Sans` (open apertures, crisp legibility across 13–18px).
- **Optical Timecode & Ruler Numerals ONLY:** `JetBrains Mono` with `font-variant-numeric: tabular-nums` inside the video transport deck so ticking timecodes never jitter horizontally.
- **Why not Inter:** Rejected as the 2024–2026 statistical default; `Bricolage Grotesque` + `Plus Jakarta Sans` establish a geometric-display × humanist-text contrast axis.

## 4. Grid Break
The showcase hero uses an **asymmetric 8 / 4 architectural workbench split**: the Video.js v10 optical stage cantilevers across the primary mineral datum plane while a vertical **Calibration & Inspection Rail** overlaps the right stage shoulder (`-24px` seam overlap on desktop) carrying live container-width stress testing (`320px -> 100%`), bright/dark/glare video luminance switching, custom Mux Playback ID loading, polarity toggling, and copyable skin markup.

## 5. Motion Budget
1. **Stage reveal (once):** Subtle `opacity` + `translateY(14px)` `ease-out-quart` (content remains readable with JS disabled).
2. **Switchgear mechanical detent:** `140ms ease-out` `scale(0.96)` press snap + fine-pointer-only magnetic hover (`@media (hover: hover) and (pointer: fine)`).
3. **Controls & optical loupe emergence:** `180ms ease-out` `opacity` + `translateY(6px)` with trigger-anchored `transform-origin`.
All motion respects `@media (prefers-reduced-motion: reduce)` by reducing to gentle `opacity` transitions (no spatial travel, Three.js stage paused, Web Audio cues silenced).

## 6. Reflex Check
- **a) First-order AI reflex (video player skin):** Dark obsidian page, neon cyan/purple gradient seek bar, heavy `backdrop-filter: blur(20px)` floating pill controls.
- **b) Second-order AI reflex (anti-default video player):** Ultra-minimal transparent icons over a bottom vignette with zero tactile personality and unreadable white glyphs on bright frames.
- **c) Our deviation:** High-key architectural light-table showcase (`L = 0.925`) framing an industrial Braun/Steenbeck-inspired Video.js v10 transport skin (`VERNIER`) built around solid-ceramic high-contrast controls, a millimeter-calibrated optical scrub rail, zero lazy glassmorphism, optional zero-dependency Web Audio mechanical switchgear clicks, and a restrained Three.js studio lighting rig behind the stage.

## 7. House Tells Broken
1. **Near-black body background (`L < 0.25`)** -> Replaced by daylit architectural drafting paper (`L = 0.925`, `oklch(0.925 0.008 220)`).
2. **Logo / live-dot / action top bar** -> Replaced by a clean typographic masthead with direct stage controls and zero faux status dots.
3. **Mono service labels in viewport corners** -> Stripped from page corners; monospace is restricted strictly to tabular media timecodes (`MM:SS`) inside the transport deck.
4. **Emissive glow standing in for lighting** -> Replaced by real 1px mechanical rims, crisp dual-ring high-contrast focus outlines, and a directional 4-light Three.js studio rig with zero bloom/grain post-passes.
