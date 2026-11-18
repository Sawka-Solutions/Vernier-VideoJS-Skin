# AGENTS.md — VERNIER-10 Video.js v10 Skin Guidelines

## Architecture Rules

1. **Video.js v10 Only**: Never introduce legacy Video.js 8 APIs (`videojs()`, `data-setup`, `registerPlugin()`, or monolithic `video.js` imports). Always use `@videojs/cdn@10.5.0`, `@videojs/html`, and `@videojs/react` composable primitives (`@videojs/react/video` for `videoFeatures`).
2. **Version Pinning**: Keep all `@videojs/cdn` imports pinned to the exact same version (`@10.5.0`) so shared module state across `<video-player>`, `<mux-video>`, `<hlsjs-video>`, and `ui/*` remains synchronized.
3. **Valid Video.js v10 Attributes**:
   - `<media-gesture>` uses `type="tap" | "doubletap"` and actions `togglePaused`, `toggleFullscreen`, `seekStep`, etc.
   - `<media-hotkey>` uses `keys` and actions `togglePaused`, `toggleMuted`, `toggleFullscreen`, `toggleSubtitles`, `seekStep`, `volumeStep`, `seekToPercent`.
   - `<media-time-slider>` exposes `--media-slider-fill`, `--media-slider-buffer`, `--media-slider-pointer`, and `--media-slider-chapter-*` when `<media-time-slider-chapters>` is present.
   - `<media-time>` elements stay empty in HTML (never pre-populate text like `00:00` or Video.js will concatenate onto it); style `media-time:not(:defined):empty::before` if needed.
   - Reset UA `[popover]` background/border/padding on `<media-menu>` and `<media-tooltip>`.
4. **Zero-Dependency Skin Core**: `src/vernier-skin.css` and `src/vernier-skin.js` must remain completely free of Three.js, GSAP, or framework runtime dependencies, and `vernier-skin.css` must use class selectors compatible with both `@videojs/html` and `@videojs/react`.
5. **Accessibility & Motion Discipline**:
   - Include `<media-status-announcer>` (visually hidden, never `display: none`) and `<media-error-dialog>`.
   - Interactive controls in the player deck must retain `>= 44px x 44px` hit areas at all container widths (`@container vernier-player`).
   - Keep auto-hide active after pointer clicks by matching `:focus-visible` rather than `:focus-within`.
   - Maintain high-contrast dual-ring `:focus-visible` outlines for both `obsidian` and `ceramic` polarities, plus `prefers-contrast: more` and `prefers-reduced-transparency: reduce`.
   - All `:hover` transform effects must stay inside `@media (hover: hover) and (pointer: fine)`.
   - All `pointermove` handlers must throttle DOM updates via `requestAnimationFrame`.
   - Respect `@media (prefers-reduced-motion: reduce)` across CSS, WebGL, and Web Audio.
6. **Sync Single-File Drop**: Whenever updating `src/vernier-skin.css`, `src/vernier-skin.js`, or `index.html`, keep `../netlify-drop-skin/index.html` synchronized as a standalone single-file drop.
