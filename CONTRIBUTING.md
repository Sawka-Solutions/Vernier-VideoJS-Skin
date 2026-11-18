# Contributing to VERNIER-10

Thank you for contributing to VERNIER-10! Please review [`AGENTS.md`](./AGENTS.md) and [`design/DESIGN.md`](./design/DESIGN.md) before modifying skin tokens, CSS rules, or player primitives.

## Core Principles

1. **Video.js v10 Only**: Use `@videojs/cdn@10.5.0`, `@videojs/html`, and `@videojs/react` composable primitives (`@videojs/react/video` for `Video` and `videoFeatures`). Never introduce legacy Video.js 8 globals (`videojs()`, `data-setup`, `registerPlugin()`).
2. **Zero-Dependency Skin Core**: `src/vernier-skin.css` and `src/vernier-skin.js` must remain completely dependency-free (no Three.js, GSAP, or framework runtime imports) and use shared class selectors compatible with both HTML custom elements and `@videojs/react`.
3. **HTML & React Parity**: Keep behavior, ARIA labels, focus-visible outlines, volume thumb tracking (`--media-slider-fill`), loupe dimensions, and container-query reflow synchronized across `src/vernier-skin.html`, `src/vernier-skin.react.tsx`, and `index.html`.
4. **Accessibility & Motion Discipline**:
   - Preserve `>= 44px x 44px` interactive hit targets at every viewport width down to `320px`.
   - Maintain high-contrast dual-ring `:focus-visible` halos across both `obsidian` and `ceramic` polarities, plus `prefers-contrast: more` and `prefers-reduced-transparency: reduce`.
   - Respect `@media (prefers-reduced-motion: reduce)` across CSS, Web Audio (`createVernierAudio`), and the optional Three.js backdrop (`src/stage/opticalStage3d.js`).

## Local Checks

Serve the workbench locally over HTTP (required for ES modules):

```bash
npm run check
npm run dev
```

Before opening a pull request:
- Run `npm run check` and verify `src/vernier-skin.react.tsx` type-checks cleanly under `tsc --strict`.
- Verify both `Obsidian` and `Daylight Ceramic` polarities across `320px` compact and desktop widths in a headless or desktop browser.
- Verify keyboard-only navigation (`Tab`, `Space`/`K`, `J`/`L`, `Arrow` keys, `M`, `C`, `F`, `Escape`) and WebVTT captions clearance above the control deck.

## License

Contributions are licensed under the [Apache License, Version 2.0](./LICENSE).
