# VERNIER-10

**A tactile, precision optical-transport custom skin and inspection workbench for Video.js v10.**

VERNIER-10 styles Video.js v10 composable Web Components (`@videojs/html`, `@videojs/cdn@10.5.0`) and `@videojs/react` primitives with solid anodized ceramic control decks, a millimeter-graduated Vernier timeline rail, Mux storyboard frame loupes, and dual Obsidian / Daylight Ceramic polarity.

Licensed under **Apache-2.0**.

---

## Key Features

- **Video.js v10 Native Composable Architecture**: Built purely on `<video-player>`, `<media-container>`, `<media-controls>`, `<media-time-slider-chapters>`, `<media-slider-thumbnail>`, `<media-menu>`, `<media-tooltip>`, `<media-status-announcer>`, `<media-error-dialog>`, `<media-gesture>`, and `<media-hotkey>` with zero legacy Video.js 8 globals.
- **HTML & React Parity**: `src/vernier-skin.css` uses framework-agnostic class selectors, relies on Video.js's native `--media-slider-fill` / `--media-slider-buffer` / `--media-slider-pointer` CSS properties, and supports public `--media-*` custom properties (`--media-accent-color`, `--media-accent-text-color`, `--media-border-radius`, `--media-border-color`, `--media-font-family`, `--media-object-fit`, `--media-object-position`).
- **CDN-Offline Progressive Fallback**: `src/vernier-skin.js` degrades cleanly if CDN custom elements are unreachable—falling back from `<mux-video>` to Mux MP4, exposing keyboard-focusable controls (`tabindex="0"`, `role="button"`, `Enter`/`Space` activation), scrubbing, volume/mute, speed cycling, captions, and error recovery dialogs.
- **Millimeter-Graduated Vernier Scrub Rail**: Uniform physical caliper graduations, segmented WebVTT chapter tracks, buffered bar, vermilion razor needle, and a cantilevered optical film-loupe showing storyboard preview thumbnails, chapter titles, and tabular `MM:SS` pointer timecode.
- **First-Class Mux Support**: Plays adaptive HLS streams via `<mux-video>` with automatic `storyboard.vtt` scrubbing thumbnails and poster loading, plus `<hlsjs-video>`, `.mp4`, and local drag-and-drop video files.
- **Readable Over Extreme Footage**: Opaque-leaning anodized ceramic surfaces (`95%+` opacity), 1px mineral rims, protective optical scrims, captions lifted cleanly above visible decks, and `prefers-contrast: more` / `prefers-reduced-transparency: reduce` overrides.
- **Dual Chassis Polarity**: Switch between `Obsidian` (`data-vernier-polarity="obsidian"`) and `Daylight Ceramic` (`data-vernier-polarity="ceramic"`).
- **Accessible & Responsive**:
  - Minimum `44px x 44px` interactive touch targets across desktop and mobile via `@container vernier-player` queries down to `320px`.
  - Full keyboard operation (`Space`/`K`, `J`/`L`, `ArrowLeft`/`ArrowRight`, `ArrowUp`/`ArrowDown`, `M`, `C`, `F`, `0-9`, `Escape`) with dual-ring `:focus-visible` outlines and `<media-status-announcer>` live-region feedback.
  - Auto-hides controls during active playback while staying visible when paused, when a menu is open, or when keyboard `:focus-visible` is inside the deck.
  - Full `@media (prefers-reduced-motion: reduce)` support: drops spatial motion, freezes spinner animation, pauses WebGL backdrop rotation, and silences optional Web Audio tactile clicks.

---

## Repository Layout

```text
vernier-videojs-skin/
├── index.html                  # Interactive light-table workbench & showcase
├── src/
│   ├── vernier-skin.css        # Standalone token-driven CSS skin (HTML + React)
│   ├── vernier-skin.js         # Companion runtime (CDN loader, Mux/MP4 router, Web Audio)
│   ├── vernier-skin.html       # Drop-in HTML markup snippet
│   ├── vernier-skin.react.tsx  # Type-checked adapter component for @videojs/react
│   ├── stage/
│   │   └── opticalStage3d.js   # Restrained 4-light Three.js studio horizon for workbench
│   └── tracks/
│       ├── sample-captions.vtt # Sample WebVTT captions track
│       └── sample-chapters.vtt # Sample WebVTT chapters track
├── assets/
│   ├── poster-cinema.svg       # Offline calibration poster frame
│   └── poster-daylight.svg     # Daylight test poster frame
├── design/
│   ├── COMMIT-SHEET.md         # Visual & motion art direction record
│   └── DESIGN.md               # Locked style contract & tokens
├── AGENTS.md                   # Video.js v10 contributor guidelines
├── CONTRIBUTING.md             # Contribution & verification checklist
├── LICENSE                     # Apache License 2.0
├── package.json                # Package exports, check script & optional peerDeps
├── netlify.toml                # Netlify static deployment config
└── vercel.json                 # Vercel static deployment config
```

---

## Quick Start

### 1. HTML + CDN (`@videojs/cdn@10.5.0`)

Include `src/vernier-skin.css`, load Video.js v10 core, copy the player markup from `src/vernier-skin.html`, and attach `src/vernier-skin.js`:

```html
<link rel="stylesheet" href="./src/vernier-skin.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@videojs/cdn@10.5.0/video-player.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@videojs/cdn@10.5.0/media/mux-video.js"></script>

<video-player class="vernier-player" id="vjs-player">
  <media-container class="vernier-stage is-paused" data-vernier-polarity="obsidian">
    <mux-video
      src="https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM.m3u8"
      poster="https://image.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/thumbnail.webp?time=2"
      playsinline
      crossorigin="anonymous"
    ></mux-video>
    <!-- Controls, announcer & loupe markup from src/vernier-skin.html -->
  </media-container>
</video-player>

<script type="module">
  import { loadVideoJsV10Elements, attachVernierSkin } from './src/vernier-skin.js';
  await loadVideoJsV10Elements();
  attachVernierSkin(document.getElementById('vjs-player'));
</script>
```

### 2. React (`@videojs/react`)

Install the optional peer dependencies (`@videojs/mux-video` is required when playing `muxPlaybackId` streams):

```bash
npm install @videojs/react @videojs/mux-video react react-dom
```

Then mount `VernierPlayer` from `src/vernier-skin.react.tsx`:

```tsx
import { VernierPlayer } from './src/vernier-skin.react';

export function App() {
  return (
    <VernierPlayer
      muxPlaybackId="BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM"
      captionsSrc="/tracks/sample-captions.vtt"
      chaptersSrc="/tracks/sample-chapters.vtt"
      polarity="obsidian"
    />
  );
}
```

#### `VernierPlayerProps`

| Prop | Type | Default | Description |
|---|---|---|---|
| `muxPlaybackId` | `string` | `'BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM'` | Mux Playback ID (renders `<MuxVideo>` with HLS & storyboard track) |
| `src` | `string` | `undefined` | Direct video URL (renders `<Video>` from `@videojs/react/video`) |
| `poster` | `string` | Mux thumbnail when `!src` | Explicit poster image URL |
| `captionsSrc` | `string` | `undefined` | English WebVTT captions/subtitles track URL |
| `chaptersSrc` | `string` | `undefined` | Default WebVTT chapters track URL |
| `crossOrigin` | `'anonymous' \| 'use-credentials'` | `undefined` | Optional CORS mode for `<Video>` when `src` uses cross-origin tracks |
| `polarity` | `'obsidian' \| 'ceramic'` | `'obsidian'` | Control chassis color polarity |
| `className` | `string` | `''` | Additional CSS class on `.vernier-player` |

### 3. Local Preview Workbench & Scripts

Serve the repository root with any static HTTP server (required so ES module imports load cleanly):

```bash
npm run check   # Syntax-check src/vernier-skin.js & src/stage/opticalStage3d.js
npm run dev     # Serve interactive workbench at http://localhost:4173
```

Open `http://localhost:4173` and use the overlapping **Calibration Rail** to test:
- **Chassis Polarity**: Toggle `Obsidian` vs `Ceramic` (or `Darkroom` workbench mode).
- **Container Width Stress**: Slide smoothly from `320px` mobile to `100%` desktop to inspect `@container vernier-player` reflow.
- **Footage Luminance Sim**: Apply `Snow Glare` or `Night Crush` filters over live video to verify readability.
- **Mux & Local Sources**: Switch sample Mux HLS & MP4 reels, paste any Mux Playback ID or `.mp4` / `.m3u8` URL, or drop a local video file directly onto the player.

Static deployments work out of the box via [`vercel.json`](./vercel.json) (`npm run deploy`) or [`netlify.toml`](./netlify.toml) (`npm run deploy:netlify`).

---

## Customization Tokens

Override either standard Video.js `--media-*` custom properties or `--vernier-*` tokens on `:root` or `.vernier-stage`:

| Token | Default (Obsidian) | Purpose |
|---|---|---|
| `--media-accent-color` / `--vernier-accent` | `oklch(0.60 0.215 28)` | Primary Signal Vermilion needle, progress fill, and active indicators |
| `--media-accent-text-color` / `--vernier-accent-text` | `#ffffff` | Foreground text on accent surfaces |
| `--media-border-radius` / `--vernier-radius` | `14px` | Outer player bezel radius |
| `--vernier-surface` | `oklch(0.145 0.012 240 / 0.95)` | Control deck, tally pill, and center aperture chassis background |
| `--vernier-ink` | `oklch(0.975 0.004 220)` | Primary icon and tabular timecode ink |
| `--vernier-rim` | `oklch(0.97 0.004 220 / 0.24)` | 1px mechanical rim around chassis and buttons |
| `--vernier-focus-ring` | `oklch(0.64 0.22 28)` | Inner high-contrast keyboard focus outline |

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `Space` / `K` | Play or pause |
| `J` / `L` | Seek back / forward 10 seconds |
| `ArrowLeft` / `ArrowRight` | Seek back / forward 5 seconds |
| `ArrowUp` / `ArrowDown` | Adjust volume 5% |
| `M` | Mute / unmute |
| `C` | Toggle English WebVTT captions |
| `F` | Toggle fullscreen |
| `0`–`9` | Jump to 0%–90% of duration |
| `Escape` | Close playback speed menu or error dialog |

---

## Contributing & License

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`AGENTS.md`](./AGENTS.md) for architecture rules and pre-PR checks.

Copyright 2026 Sawka Solutions. Licensed under the [Apache License, Version 2.0](./LICENSE).
