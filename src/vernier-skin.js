/**
 * VERNIER-10 — Companion Runtime for Video.js v10 Custom Optical-Transport Skin
 * License: Apache-2.0
 */

export const DEFAULT_VIDEOJS_CDN = 'https://cdn.jsdelivr.net/npm/@videojs/cdn@10.5.0';

const DEFAULT_POSTER_DATA_URI =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">' +
      '<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#0b0e14"/><stop offset="100%" stop-color="#141922"/></linearGradient>' +
      '<pattern id="g" width="64" height="64" patternUnits="userSpaceOnUse">' +
      '<path d="M 64 0 L 0 0 0 64" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/></pattern></defs>' +
      '<rect width="1280" height="720" fill="url(#bg)"/><rect width="1280" height="720" fill="url(#g)"/>' +
      '<g stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.2" fill="none">' +
      '<circle cx="640" cy="360" r="190"/><circle cx="640" cy="360" r="118" stroke-dasharray="6 8"/>' +
      '<line x1="280" y1="360" x2="500" y2="360"/><line x1="780" y1="360" x2="1000" y2="360"/>' +
      '<line x1="640" y1="110" x2="640" y2="220"/><line x1="640" y1="500" x2="640" y2="610"/></g>' +
      '<g stroke="#ff4e2b" stroke-opacity="0.72" stroke-width="2" fill="none">' +
      '<path d="M 64 96 L 64 64 L 96 64"/><path d="M 1184 64 L 1216 64 L 1216 96"/>' +
      '<path d="M 64 624 L 64 656 L 96 656"/><path d="M 1184 656 L 1216 656 L 1216 624"/></g>' +
      '<circle cx="640" cy="360" r="6" fill="#ff4e2b"/>' +
      '<text x="640" y="592" text-anchor="middle" fill="#cfd6e2" fill-opacity="0.75" ' +
      'font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="18" letter-spacing="4">' +
      'VERNIER-10 // OPTICAL CALIBRATION STAGE</text></svg>'
  );

const VIDEOJS_UI_MODULES = [
  'video-player.js',
  'media/mux-video.js',
  'media/hlsjs-video.js',
  'ui/container.js',
  'ui/controls.js',
  'ui/controls-backdrop.js',
  'ui/controls-content.js',
  'ui/controls-group.js',
  'ui/play-button.js',
  'ui/seek-button.js',
  'ui/mute-button.js',
  'ui/volume-slider.js',
  'ui/time-slider.js',
  'ui/time-slider-chapters.js',
  'ui/time-slider-chapter-title.js',
  'ui/slider-track.js',
  'ui/slider-buffer.js',
  'ui/slider-fill.js',
  'ui/slider-thumb.js',
  'ui/slider-preview.js',
  'ui/slider-value.js',
  'ui/slider-thumbnail.js',
  'ui/time.js',
  'ui/time-group.js',
  'ui/time-separator.js',
  'ui/fullscreen-button.js',
  'ui/playback-rate-button.js',
  'ui/playback-rate-radio-group.js',
  'ui/menu.js',
  'ui/menu-content.js',
  'ui/menu-radio-item.js',
  'ui/menu-item-indicator.js',
  'ui/tooltip.js',
  'ui/tooltip-group.js',
  'ui/pip-button.js',
  'ui/captions-button.js',
  'ui/buffering-indicator.js',
  'ui/poster.js',
  'ui/error-dialog.js',
  'ui/dialog-backdrop.js',
  'ui/dialog-popup.js',
  'ui/dialog-title.js',
  'ui/dialog-description.js',
  'ui/dialog-close.js',
  'ui/hotkey.js',
  'ui/gesture.js',
  'ui/status-announcer.js',
];

const SAMPLE_CAPTIONS_VTT = [
  'WEBVTT',
  '',
  '00:00.400 --> 00:04.800',
  'VERNIER-10 // Precision optical-transport skin built on Video.js v10 primitives.',
  '',
  '00:05.000 --> 00:10.400',
  'Calibrated obsidian and ceramic decks keep 13:1 contrast over snow glare or night cinema.',
  '',
  '00:10.600 --> 00:16.800',
  'Hover or scrub the millimeter rail to inspect Mux storyboard frames, chapters, and tabular timecode.',
  '',
  '00:17.000 --> 00:24.000',
  'Operate every button, slider, and menu by keyboard with clear dual-ring focus indicators.',
].join('\n');

const SAMPLE_CHAPTERS_VTT = [
  'WEBVTT',
  '',
  '00:00.000 --> 00:05.000',
  '01. Optical Aperture & Baseline',
  '',
  '00:05.000 --> 00:11.000',
  '02. High-Contrast Chassis & Scrim',
  '',
  '00:11.000 --> 00:18.000',
  '03. Vernier Storyboard & Scrubbing',
  '',
  '00:18.000 --> 00:45.000',
  '04. Accessibility & Responsive Reflow',
].join('\n');

let cdnElementsSettled = false;

/**
 * Load Video.js v10 custom element modules from the pinned CDN base.
 */
export async function loadVideoJsV10Elements(cdnBase = DEFAULT_VIDEOJS_CDN) {
  const cleanBase = cdnBase.replace(/\/+$/, '');
  try {
    return await Promise.allSettled(
      VIDEOJS_UI_MODULES.map((mod) => import(`${cleanBase}/${mod}`))
    );
  } finally {
    cdnElementsSettled = true;
  }
}

/**
 * Zero-dependency Web Audio API tactile switchgear click synthesizer.
 * Respects prefers-reduced-motion and fires only on explicit pointer clicks.
 */
export function createVernierAudio(initialEnabled = true) {
  let ctx = null;
  let enabled = initialEnabled;

  const isReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function playClick(freq = 1650, gainPeak = 0.04) {
    if (!enabled || isReducedMotion() || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!ctx) ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.42, now + 0.014);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3600, now);
      filter.Q.setValueAtTime(2.5, now);

      gain.gain.setValueAtTime(Math.min(gainPeak, 0.08), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.016);
      osc.onended = () => {
        osc.disconnect();
        filter.disconnect();
        gain.disconnect();
      };
    } catch {
      /* AudioContext may be blocked before user gesture */
    }
  }

  return {
    playClick,
    setEnabled(val) {
      enabled = Boolean(val);
    },
    isEnabled() {
      return enabled;
    },
  };
}

/**
 * Extract a Mux Playback ID from either a raw ID, "mux:<id>", or stream.mux.com URL.
 */
export function parseMuxPlaybackId(raw) {
  const value = String(raw || '').trim();
  if (!value) return null;
  if (value.startsWith('mux:')) {
    const id = value.slice(4).trim();
    return /^[A-Za-z0-9]{16,}$/.test(id) ? id : null;
  }
  const urlMatch = value.match(/^https?:\/\/stream\.mux\.com\/([A-Za-z0-9]{16,})(?:\.m3u8|\/|$)/i);
  if (urlMatch) return urlMatch[1];
  if (/^[A-Za-z0-9]{20,}$/.test(value) && !value.includes('.')) return value;
  return null;
}

export function fmtTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const s = Math.floor(sec % 60);
  const m = Math.floor((sec / 60) % 60);
  const h = Math.floor(sec / 3600);
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/**
 * Attach VERNIER-10 progressive behavior, telemetry sync, rAF loupe preview,
 * Mux/HLS/MP4 source switching, and accessibility fallbacks to a <video-player>.
 */
export function attachVernierSkin(playerEl, options = {}) {
  if (!playerEl) {
    throw new Error('attachVernierSkin requires a <video-player> root element.');
  }

  const stage = playerEl.querySelector('.vernier-stage, media-container');
  const centerPlayBtn = playerEl.querySelector('#center-play-btn, .vernier-aperture-btn');
  const playButtons = Array.from(
    playerEl.querySelectorAll('media-play-button, .vernier-play, .vernier-aperture-btn')
  );
  const deckPlayBtn = playerEl.querySelector('media-play-button.vernier-play, .vernier-play');
  const muteBtn = playerEl.querySelector('media-mute-button, .vernier-mute');
  const timeSlider = playerEl.querySelector('media-time-slider, .vernier-slider');
  const volSlider = playerEl.querySelector('media-volume-slider, .vernier-vol-slider');
  const loupeVal = playerEl.querySelector('media-slider-value, .vernier-loupe-val');
  const loupeChapter = playerEl.querySelector('media-time-slider-chapter-title, .vernier-loupe-chapter');
  const timeCurr = playerEl.querySelector('media-time[type="current"]');
  const timeDur = playerEl.querySelector('media-time[type="duration"]');
  const rateBtn = playerEl.querySelector('media-playback-rate-button, .vernier-rate');
  const speedMenu = playerEl.querySelector('#vernier-speed-menu, media-menu');
  const ccBtn = playerEl.querySelector('media-captions-button, .vernier-cc');
  const pipBtn = playerEl.querySelector('media-pip-button, .vernier-pip');
  const fsBtn = playerEl.querySelector('media-fullscreen-button, .vernier-fs');
  const hudStateText = playerEl.querySelector('#hud-state-text, .vernier-tally-label');
  const streamBadge = playerEl.querySelector('#hud-stream-badge, .vernier-stream-badge');
  const posterEl = playerEl.querySelector('media-poster, .vernier-poster');
  const errorDialog = playerEl.querySelector('media-error-dialog');
  const dialogBackdrop = errorDialog?.querySelector('.vernier-dialog-backdrop, media-dialog-backdrop');
  const dialogPopup = errorDialog?.querySelector('.vernier-dialog-popup, media-dialog-popup');
  const dialogDesc = errorDialog?.querySelector('.vernier-dialog-desc, media-dialog-description');
  const dialogClose = errorDialog?.querySelector('.vernier-dialog-close, media-dialog-close');

  const audio = options.audio || createVernierAudio(options.sfx !== false);
  const onStateChange = typeof options.onStateChange === 'function' ? options.onStateChange : null;
  const isUpgraded = (tag) => Boolean(customElements.get(tag));
  const isMediaReady = (media) => Boolean(media && typeof media.play === 'function');
  const trackBlobUrls = new Set();
  const userBlobUrls = new Set();
  let hasStarted = false;
  let showRemainingTime = false;
  let destroyed = false;

  function makeTrackBlobUrl(content, mime) {
    const url = URL.createObjectURL(new Blob([content], { type: mime }));
    trackBlobUrls.add(url);
    return url;
  }

  function clearTrackBlobs() {
    trackBlobUrls.forEach((u) => URL.revokeObjectURL(u));
    trackBlobUrls.clear();
  }

  function getMedia() {
    return stage?.querySelector('mux-video, hlsjs-video, hls-video, video');
  }

  /* Ensure time slider chapters & focusable controls degrade cleanly when CDN modules aren't upgraded */
  const fallbackButtonTags = [
    'media-play-button',
    'media-seek-button',
    'media-mute-button',
    'media-playback-rate-button',
    'media-captions-button',
    'media-pip-button',
    'media-fullscreen-button',
    'media-dialog-close',
  ];

  function syncSliderA11y() {
    if (destroyed) return;
    const sliders = [timeSlider, volSlider].filter(Boolean);
    if (isUpgraded('media-slider-thumb')) {
      sliders.forEach((sl) => {
        if (sl.getAttribute('role') === 'slider') sl.removeAttribute('role');
        if (sl.hasAttribute('tabindex')) sl.removeAttribute('tabindex');
        sl.removeAttribute('aria-valuemin');
        sl.removeAttribute('aria-valuemax');
        sl.removeAttribute('aria-valuenow');
        sl.removeAttribute('aria-valuetext');
      });
    } else {
      sliders.forEach((sl) => {
        if (!sl.hasAttribute('tabindex')) sl.setAttribute('tabindex', '0');
        if (!sl.hasAttribute('role')) sl.setAttribute('role', 'slider');
      });
    }
  }

  function ensureFallbackA11y() {
    if (stage && !isUpgraded('media-container') && !stage.hasAttribute('tabindex')) {
      stage.setAttribute('tabindex', '0');
    }
    fallbackButtonTags.forEach((tag) => {
      if (isUpgraded(tag)) return;
      playerEl.querySelectorAll(tag).forEach((el) => {
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
        if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      });
    });
    if (timeCurr && timeCurr.hasAttribute('toggle') && !isUpgraded('media-time')) {
      if (!timeCurr.hasAttribute('tabindex')) timeCurr.setAttribute('tabindex', '0');
      if (!timeCurr.hasAttribute('role')) timeCurr.setAttribute('role', 'button');
      if (!timeCurr.hasAttribute('aria-label')) {
        timeCurr.setAttribute('aria-label', 'Toggle elapsed and remaining time');
      }
      timeCurr.dataset.vernierTimeFallback = '1';
    }
    syncSliderA11y();
  }
  ensureFallbackA11y();

  if (!isUpgraded('media-slider-thumb') && typeof customElements?.whenDefined === 'function') {
    customElements.whenDefined('media-slider-thumb').then(syncSliderA11y);
  }
  if (!isUpgraded('media-time') && timeCurr?.hasAttribute('toggle') && typeof customElements?.whenDefined === 'function') {
    customElements.whenDefined('media-time').then(() => {
      if (destroyed || !timeCurr?.dataset.vernierTimeFallback) return;
      delete timeCurr.dataset.vernierTimeFallback;
      timeCurr.removeAttribute('role');
      if (timeCurr.getAttribute('aria-label') === 'Toggle elapsed and remaining time') {
        timeCurr.removeAttribute('aria-label');
      }
    });
  }

  function ensureChapterTrackFallback() {
    if (!timeSlider) return;
    const chaptersWrap = timeSlider.querySelector('media-time-slider-chapters');
    if (!chaptersWrap) return;
    const hasRenderedChapter = Boolean(chaptersWrap.querySelector('.vernier-chapter'));
    if (!hasRenderedChapter && !isUpgraded('media-time-slider-chapters')) {
      const tpl = chaptersWrap.querySelector('template');
      if (tpl?.content) {
        chaptersWrap.appendChild(tpl.content.cloneNode(true));
      }
    }
  }
  ensureChapterTrackFallback();

  function showFallbackError(message) {
    if (!errorDialog || isUpgraded('media-error-dialog')) return;
    if (dialogDesc && message) dialogDesc.textContent = message;
    errorDialog.setAttribute('data-open', '');
    dialogBackdrop?.setAttribute('data-open', '');
    dialogPopup?.setAttribute('data-open', '');
    dialogClose?.focus?.();
  }

  function hideFallbackError() {
    if (!errorDialog || isUpgraded('media-error-dialog')) return;
    errorDialog.removeAttribute('data-open');
    dialogBackdrop?.removeAttribute('data-open');
    dialogPopup?.removeAttribute('data-open');
  }

  const onDialogCloseClick = () => {
    if (!isUpgraded('media-error-dialog')) hideFallbackError();
  };
  dialogClose?.addEventListener('click', onDialogCloseClick);

  function attachDefaultTracks(mediaEl, storyboardUrl = null) {
    if (!mediaEl) return;

    mediaEl.querySelectorAll('track[data-vernier-track]').forEach((t) => t.remove());
    clearTrackBlobs();

    const capTrack = document.createElement('track');
    capTrack.kind = 'captions';
    capTrack.label = 'English';
    capTrack.srclang = 'en';
    capTrack.dataset.vernierTrack = 'captions';
    capTrack.src = makeTrackBlobUrl(SAMPLE_CAPTIONS_VTT, 'text/vtt');
    mediaEl.appendChild(capTrack);

    const chapTrack = document.createElement('track');
    chapTrack.kind = 'chapters';
    chapTrack.label = 'Chapters';
    chapTrack.srclang = 'en';
    chapTrack.default = true;
    chapTrack.dataset.vernierTrack = 'chapters';
    chapTrack.src = makeTrackBlobUrl(SAMPLE_CHAPTERS_VTT, 'text/vtt');
    mediaEl.appendChild(chapTrack);
    if (chapTrack.track && chapTrack.track.mode === 'disabled') {
      chapTrack.track.mode = 'hidden';
    }

    /* <mux-video> injects its own storyboard.vtt track; only append manually for non-mux media */
    if (storyboardUrl && mediaEl.tagName.toLowerCase() !== 'mux-video') {
      const metaTrack = document.createElement('track');
      metaTrack.kind = 'metadata';
      metaTrack.label = 'thumbnails';
      metaTrack.default = true;
      metaTrack.dataset.vernierTrack = 'storyboard';
      metaTrack.src = storyboardUrl;
      mediaEl.appendChild(metaTrack);
    }
  }

  function setPosterImage(posterUrl) {
    if (!posterEl) return;
    posterEl.removeAttribute('hidden');
    const img = posterEl.querySelector('img');
    if (img && posterUrl) img.src = posterUrl;
  }

  function syncState() {
    const media = getMedia();
    if (!media || !stage) return;

    const ready = isMediaReady(media);
    const ended = ready ? Boolean(media.ended) : false;
    const paused = ready ? Boolean(media.paused || ended) : true;
    const dur = ready && Number.isFinite(media.duration) && media.duration > 0 ? media.duration : 0;
    const curr = ready && Number.isFinite(media.currentTime) ? media.currentTime : 0;
    if (ready && (!paused || curr > 0.05)) {
      hasStarted = true;
    }

    stage.classList.toggle('is-paused', paused);
    stage.classList.toggle('is-ended', ended);
    stage.classList.toggle('is-pristine', !hasStarted);

    if (!isUpgraded('media-play-button')) {
      playButtons.forEach((btn) => {
        btn.setAttribute('aria-label', ended ? 'Replay' : paused ? 'Play' : 'Pause');
        if (paused) btn.setAttribute('data-paused', '');
        else btn.removeAttribute('data-paused');
        if (ended) btn.setAttribute('data-ended', '');
        else btn.removeAttribute('data-ended');
      });
    }

    if (hudStateText && !stage.classList.contains('is-buffering')) {
      hudStateText.textContent = ended ? 'ENDED' : paused ? 'STANDBY' : 'TRANSPORT';
    }

    const vol = ready && Number.isFinite(media.volume) ? media.volume : 1;
    const muted = ready ? Boolean(media.muted || vol === 0) : false;
    stage.classList.toggle('is-muted', muted);
    if (muteBtn && !isUpgraded('media-mute-button')) {
      muteBtn.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
      if (muted) muteBtn.setAttribute('data-muted', '');
      else muteBtn.removeAttribute('data-muted');
      const level = muted ? 'off' : vol < 0.35 ? 'low' : vol < 0.7 ? 'medium' : 'high';
      muteBtn.setAttribute('data-volume-level', level);
    }

    if (volSlider && !isUpgraded('media-volume-slider')) {
      const volPct = muted ? 0 : Math.round(vol * 100);
      volSlider.style.setProperty('--media-slider-fill', `${volPct}%`);
      volSlider.setAttribute('aria-valuenow', String(volPct));
      volSlider.setAttribute('aria-valuetext', `${volPct}%`);
    }

    const pct = dur > 0 ? Math.min(100, Math.max(0, (curr / dur) * 100)) : 0;

    if (timeSlider && !isUpgraded('media-time-slider')) {
      timeSlider.style.setProperty('--media-slider-fill', `${pct.toFixed(3)}%`);
      timeSlider.setAttribute('aria-valuenow', String(Math.round(pct)));
      timeSlider.setAttribute('aria-valuetext', `${fmtTime(curr)} of ${fmtTime(dur)}`);
    }

    if (!isUpgraded('media-time')) {
      if (timeCurr) {
        timeCurr.textContent =
          showRemainingTime && dur > 0 ? `-${fmtTime(Math.max(0, dur - curr))}` : fmtTime(curr);
      }
      if (timeDur) timeDur.textContent = fmtTime(dur);
    }

    if (ready && dur > 0 && media.buffered?.length > 0 && timeSlider && !isUpgraded('media-time-slider')) {
      const end = media.buffered.end(media.buffered.length - 1);
      const bufPct = Math.min(100, (end / dur) * 100);
      timeSlider.style.setProperty('--media-slider-buffer', `${bufPct.toFixed(2)}%`);
    }

    if (rateBtn && !isUpgraded('media-playback-rate-button')) {
      const rate = ready && Number.isFinite(media.playbackRate) ? media.playbackRate : 1;
      rateBtn.setAttribute('data-rate', String(rate));
      rateBtn.setAttribute('aria-label', `Playback speed, ${rate}x`);
    }

    const inFs = Boolean(document.fullscreenElement);
    stage.classList.toggle('is-fullscreen', inFs);
    if (fsBtn && !isUpgraded('media-fullscreen-button')) {
      fsBtn.setAttribute('aria-label', inFs ? 'Exit fullscreen' : 'Fullscreen');
      if (inFs) fsBtn.setAttribute('data-fullscreen', '');
      else fsBtn.removeAttribute('data-fullscreen');
    }

    const tracks = ready ? Array.from(media.textTracks || []) : [];
    const ccTrack = tracks.find((t) => t.kind === 'captions' || t.kind === 'subtitles');
    const ccActive = Boolean(ccTrack && ccTrack.mode === 'showing');
    stage.classList.toggle('is-cc-on', ccActive);
    if (ccBtn && !isUpgraded('media-captions-button')) {
      if (ccActive) ccBtn.setAttribute('data-active', '');
      else ccBtn.removeAttribute('data-active');
    }

    const hasMeta =
      media.tagName.toLowerCase() === 'mux-video' ||
      tracks.some((t) => t.kind === 'metadata') ||
      Boolean(media.querySelector('track[kind="metadata"]'));
    stage.classList.toggle('has-storyboard', hasMeta);
    if (hasMeta) stage.removeAttribute('data-no-storyboard');
    else stage.setAttribute('data-no-storyboard', '');

    if (onStateChange) {
      onStateChange({
        paused,
        ended,
        muted,
        volume: vol,
        currentTime: curr,
        duration: dur,
        playbackRate: ready && Number.isFinite(media.playbackRate) ? media.playbackRate : 1,
        fullscreen: inFs,
        captionsOn: ccActive,
        mediaTag: media.tagName.toLowerCase(),
      });
    }
  }

  /* Idle auto-hide manager */
  let idleTimer = null;
  function wakeControls() {
    if (!stage) return;
    stage.classList.remove('is-idle');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      const media = getMedia();
      const menuOpen = Boolean(speedMenu?.hasAttribute('data-open'));
      if (isMediaReady(media) && !media.paused && !menuOpen) {
        stage.classList.add('is-idle');
      }
    }, 2200);
  }

  /* Action helpers (used when custom elements aren't upgraded) */
  function fallbackMuxToMp4(autoplay = false) {
    const current = getMedia();
    if (current && current.tagName.toLowerCase() === 'mux-video' && !isUpgraded('mux-video')) {
      const id = parseMuxPlaybackId(current.getAttribute('src'));
      if (id) {
        loadSource(id, { autoplay });
        return true;
      }
    }
    return false;
  }

  function togglePlay() {
    const media = getMedia();
    if (!media) return;
    if (!isMediaReady(media)) {
      fallbackMuxToMp4(true);
      wakeControls();
      return;
    }
    if (media.paused || media.ended) {
      media.play().catch(() => {});
    } else {
      media.pause();
    }
    wakeControls();
  }

  function toggleMute() {
    const media = getMedia();
    if (!isMediaReady(media)) return;
    if (media.muted || media.volume === 0) {
      media.muted = false;
      if (media.volume === 0) media.volume = 0.7;
    } else {
      media.muted = true;
    }
    syncState();
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else {
      const target = stage?.requestFullscreen ? stage : playerEl;
      target?.requestFullscreen?.().catch(() => {});
    }
  }

  function toggleCaptions() {
    const media = getMedia();
    if (!isMediaReady(media)) return;
    const track = Array.from(media.textTracks || []).find(
      (t) => t.kind === 'captions' || t.kind === 'subtitles'
    );
    if (!track) return;
    track.mode = track.mode === 'showing' ? 'disabled' : 'showing';
    syncState();
  }

  async function togglePip() {
    const media = getMedia();
    if (!isMediaReady(media)) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled && media.requestPictureInPicture) {
        await media.requestPictureInPicture();
      }
    } catch {
      /* Ignore unsupported PiP states */
    }
  }

  const mediaEvents = [
    'play',
    'pause',
    'ended',
    'timeupdate',
    'loadedmetadata',
    'durationchange',
    'volumechange',
    'ratechange',
    'progress',
  ];

  let boundMedia = null;
  const onWaiting = () => {
    stage?.classList.add('is-buffering');
    if (hudStateText) hudStateText.textContent = 'BUFFERING';
  };
  const onPlaying = () => {
    stage?.classList.remove('is-buffering');
    wakeControls();
    syncState();
  };
  const onError = () => {
    stage?.classList.remove('is-buffering');
    if (hudStateText) hudStateText.textContent = 'SIGNAL FAULT';
    const media = getMedia();
    const msg = media?.error?.message || 'Unable to decode or reach the requested media stream.';
    showFallbackError(msg);
  };

  function bindMediaListeners(mediaEl) {
    if (boundMedia === mediaEl) return;
    if (boundMedia) {
      mediaEvents.forEach((ev) => boundMedia.removeEventListener(ev, syncState));
      boundMedia.removeEventListener('waiting', onWaiting);
      boundMedia.removeEventListener('playing', onPlaying);
      boundMedia.removeEventListener('error', onError);
    }
    boundMedia = mediaEl;
    if (!boundMedia) return;
    mediaEvents.forEach((ev) => boundMedia.addEventListener(ev, syncState));
    boundMedia.addEventListener('waiting', onWaiting);
    boundMedia.addEventListener('playing', onPlaying);
    boundMedia.addEventListener('error', onError);
  }

  /* Ensure initial media has tracks and bound listeners */
  const initialMedia = getMedia();
  if (initialMedia) {
    attachDefaultTracks(initialMedia, null);
    bindMediaListeners(initialMedia);
  }

  /**
   * Swap active source cleanly across Mux Playback IDs, HLS streams, MP4s, or local Blob files.
   */
  function loadSource(sourceInput, meta = {}) {
    if (!stage) return;
    const raw = typeof sourceInput === 'string' ? sourceInput.trim() : '';
    if (!raw) return;

    const prevMedia = getMedia();
    const prevReady = isMediaReady(prevMedia);
    const prevVol = prevReady && Number.isFinite(prevMedia.volume) ? prevMedia.volume : 1;
    const prevMuted = prevReady ? Boolean(prevMedia.muted) : false;
    const prevRate = prevReady && Number.isFinite(prevMedia.playbackRate) ? prevMedia.playbackRate : 1;
    const wasPlaying = prevReady ? !prevMedia.paused && !prevMedia.ended : false;

    const muxId = meta.muxPlaybackId || parseMuxPlaybackId(raw);
    const isHls = !muxId && /\.m3u8(\?|$)/i.test(raw);
    const isBlob = raw.startsWith('blob:');

    userBlobUrls.forEach((u) => {
      if (u !== raw) {
        URL.revokeObjectURL(u);
        userBlobUrls.delete(u);
      }
    });

    let targetTag = 'video';
    let finalSrc = raw;
    let posterUrl = meta.poster || DEFAULT_POSTER_DATA_URI;
    let storyboardUrl = meta.storyboard || null;
    let badgeText = meta.badge || 'VIDEO.JS V10 · MP4';

    if (muxId) {
      storyboardUrl = `https://image.mux.com/${muxId}/storyboard.vtt`;
      posterUrl = meta.poster || `https://image.mux.com/${muxId}/thumbnail.webp?time=2`;
      if (isUpgraded('mux-video')) {
        targetTag = 'mux-video';
        finalSrc = `https://stream.mux.com/${muxId}.m3u8`;
        badgeText = 'MUX HLS · STORYBOARD';
      } else {
        targetTag = 'video';
        finalSrc = `https://stream.mux.com/${muxId}/highest.mp4`;
        badgeText = 'MUX MP4 FALLBACK';
      }
    } else if (isHls && isUpgraded('hlsjs-video')) {
      targetTag = 'hlsjs-video';
      badgeText = 'HLS.JS ADAPTIVE';
    } else if (isBlob) {
      userBlobUrls.add(raw);
      badgeText = meta.badge || 'LOCAL FILE';
    }

    if (streamBadge) streamBadge.textContent = badgeText;
    setPosterImage(posterUrl);
    hasStarted = false;
    stage.classList.add('is-pristine');

    const needsCors =
      targetTag === 'mux-video' || targetTag === 'hlsjs-video' || Boolean(storyboardUrl);

    let activeEl = prevMedia;
    if (!activeEl || activeEl.tagName.toLowerCase() !== targetTag) {
      const nextEl = document.createElement(targetTag);
      nextEl.id = prevMedia?.id || 'vjs-media';
      nextEl.setAttribute('playsinline', '');
      nextEl.setAttribute('preload', 'metadata');
      if (needsCors && !isBlob) nextEl.setAttribute('crossorigin', 'anonymous');
      if (posterUrl) nextEl.setAttribute('poster', posterUrl);

      if (prevMedia) {
        prevMedia.replaceWith(nextEl);
      } else {
        stage.prepend(nextEl);
      }
      activeEl = nextEl;
    } else {
      if (needsCors && !isBlob) activeEl.setAttribute('crossorigin', 'anonymous');
      else activeEl.removeAttribute('crossorigin');
      if (posterUrl) activeEl.setAttribute('poster', posterUrl);
    }

    activeEl.volume = prevVol;
    activeEl.muted = prevMuted;
    activeEl.playbackRate = prevRate;
    activeEl.src = finalSrc;
    if (typeof activeEl.load === 'function') activeEl.load();

    attachDefaultTracks(activeEl, storyboardUrl);
    bindMediaListeners(activeEl);
    hideFallbackError();
    stage.classList.remove('is-buffering');

    if (wasPlaying || meta.autoplay) {
      activeEl.play?.().catch(() => {});
    }
    wakeControls();
    syncState();
  }

  /* Pointermove wake throttled via requestAnimationFrame */
  let pointerWakeRaf = 0;
  const onStagePointerMove = () => {
    if (pointerWakeRaf) return;
    pointerWakeRaf = requestAnimationFrame(() => {
      pointerWakeRaf = 0;
      wakeControls();
    });
  };
  stage?.addEventListener('pointermove', onStagePointerMove);
  stage?.addEventListener('pointerdown', wakeControls);
  stage?.addEventListener('focusin', wakeControls);
  stage?.addEventListener('keydown', wakeControls);

  const onStageClickFallback = (e) => {
    if (isUpgraded('media-gesture')) return;
    if (e.target === stage || e.target === getMedia()) {
      if (e.detail > 0) audio.playClick(1700);
      togglePlay();
    }
  };
  stage?.addEventListener('click', onStageClickFallback);

  if (centerPlayBtn) {
    centerPlayBtn.addEventListener('click', (e) => {
      if (e.detail > 0) audio.playClick(1700);
      if (!isUpgraded('media-play-button')) togglePlay();
      if (e.detail > 0 && typeof centerPlayBtn.blur === 'function') {
        requestAnimationFrame(() => centerPlayBtn.blur());
      }
    });
  }

  if (deckPlayBtn && deckPlayBtn !== centerPlayBtn) {
    deckPlayBtn.addEventListener('click', (e) => {
      if (e.detail > 0) audio.playClick(1700);
      if (!isUpgraded('media-play-button')) togglePlay();
    });
  }

  playerEl.querySelectorAll('media-seek-button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (e.detail > 0) audio.playClick(1550);
      if (!isUpgraded('media-seek-button')) {
        const media = getMedia();
        const delta = Number(btn.getAttribute('seconds') || 10);
        if (media && Number.isFinite(media.duration)) {
          media.currentTime = Math.min(media.duration, Math.max(0, media.currentTime + delta));
          syncState();
        }
      }
    });
  });

  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      if (e.detail > 0) audio.playClick(1400);
      if (!isUpgraded('media-mute-button')) toggleMute();
    });
  }

  if (fsBtn) {
    fsBtn.addEventListener('click', (e) => {
      if (e.detail > 0) audio.playClick(1900);
      if (!isUpgraded('media-fullscreen-button')) toggleFullscreen();
    });
  }

  if (ccBtn) {
    ccBtn.addEventListener('click', (e) => {
      if (e.detail > 0) audio.playClick(1550);
      if (!isUpgraded('media-captions-button')) toggleCaptions();
    });
  }

  if (pipBtn) {
    if (!document.pictureInPictureEnabled) {
      pipBtn.hidden = true;
    }
    pipBtn.addEventListener('click', (e) => {
      if (e.detail > 0) audio.playClick(1600);
      if (!isUpgraded('media-pip-button')) togglePip();
    });
  }

  /* Speed menu fallback & open state sync */
  const rates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  let menuObserver = null;
  if (speedMenu && stage) {
    menuObserver = new MutationObserver(() => {
      stage.classList.toggle('has-open-menu', speedMenu.hasAttribute('data-open'));
    });
    menuObserver.observe(speedMenu, { attributes: true, attributeFilter: ['data-open'] });
  }

  if (rateBtn) {
    rateBtn.addEventListener('click', (e) => {
      if (e.detail > 0) audio.playClick(1820);
      if (!isUpgraded('media-playback-rate-button') || !isUpgraded('media-menu')) {
        const media = getMedia();
        if (!isMediaReady(media)) return;
        const idx = rates.indexOf(media.playbackRate);
        media.playbackRate = rates[(idx + 1) % rates.length];
        syncState();
      }
    });
  }

  const onTimeToggleClick = () => {
    if (isUpgraded('media-time') || !timeCurr?.hasAttribute('toggle')) return;
    showRemainingTime = !showRemainingTime;
    syncState();
  };
  const onTimeToggleKeyDown = (e) => {
    if (isUpgraded('media-time') || !timeCurr?.hasAttribute('toggle')) return;
    if (e.key === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      showRemainingTime = !showRemainingTime;
      syncState();
    }
  };
  timeCurr?.addEventListener('click', onTimeToggleClick);
  timeCurr?.addEventListener('keydown', onTimeToggleKeyDown);

  /* rAF-throttled pointermove for Time Slider loupe & fallback scrub */
  function ratioFromPointer(el, clientX) {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 ? Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) : 0;
  }

  function chapterTitleAtTime(media, targetSec) {
    const tracks = Array.from(media?.textTracks || []);
    const chapTrack = tracks.find((t) => t.kind === 'chapters');
    const cues = chapTrack?.cues ? Array.from(chapTrack.cues) : [];
    const match = cues.find((c) => targetSec >= c.startTime && targetSec < c.endTime) || cues.at(-1);
    return match?.text || '';
  }

  let draggingTime = false;
  let sliderPointerRaf = 0;
  let lastPointerX = 0;

  if (timeSlider) {
    timeSlider.addEventListener('pointerenter', () => timeSlider.classList.add('is-pointing'));
    timeSlider.addEventListener('pointerleave', () => {
      if (!draggingTime) timeSlider.classList.remove('is-pointing');
    });
    timeSlider.addEventListener('pointermove', (e) => {
      lastPointerX = e.clientX;
      if (sliderPointerRaf) return;
      sliderPointerRaf = requestAnimationFrame(() => {
        sliderPointerRaf = 0;
        const media = getMedia();
        if (!isUpgraded('media-time-slider')) {
          const r = ratioFromPointer(timeSlider, lastPointerX);
          timeSlider.style.setProperty('--media-slider-pointer', `${(r * 100).toFixed(2)}%`);
          if (isMediaReady(media) && Number.isFinite(media.duration) && media.duration > 0) {
            const targetTime = r * media.duration;
            if (loupeVal && !isUpgraded('media-slider-value')) {
              loupeVal.textContent = fmtTime(targetTime);
            }
            if (loupeChapter && !isUpgraded('media-time-slider-chapter-title')) {
              loupeChapter.textContent = chapterTitleAtTime(media, targetTime);
            }
            if (draggingTime) {
              media.currentTime = targetTime;
              syncState();
            }
          }
        }
      });
    });

    timeSlider.addEventListener('pointerdown', (e) => {
      draggingTime = true;
      stage?.classList.add('is-scrubbing');
      if (e.button === 0) audio.playClick(2050, 0.025);
      const media = getMedia();
      if (!isUpgraded('media-time-slider') && isMediaReady(media) && Number.isFinite(media.duration)) {
        timeSlider.setPointerCapture?.(e.pointerId);
        media.currentTime = ratioFromPointer(timeSlider, e.clientX) * media.duration;
        syncState();
      }
    });

    timeSlider.addEventListener('keydown', (e) => {
      if (isUpgraded('media-time-slider')) return;
      const media = getMedia();
      if (!isMediaReady(media) || !Number.isFinite(media.duration)) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        media.currentTime = Math.max(0, media.currentTime - 5);
        syncState();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        media.currentTime = Math.min(media.duration, media.currentTime + 5);
        syncState();
      }
    });
  }

  /* Volume slider fallback */
  let draggingVol = false;
  let volRaf = 0;
  let lastVolX = 0;
  if (volSlider) {
    volSlider.addEventListener('pointerdown', (e) => {
      draggingVol = true;
      const media = getMedia();
      if (!isUpgraded('media-volume-slider') && isMediaReady(media)) {
        volSlider.setPointerCapture?.(e.pointerId);
        const r = ratioFromPointer(volSlider, e.clientX);
        media.muted = r === 0;
        media.volume = r;
        syncState();
      }
    });
    volSlider.addEventListener('pointermove', (e) => {
      if (!draggingVol || isUpgraded('media-volume-slider')) return;
      lastVolX = e.clientX;
      if (volRaf) return;
      volRaf = requestAnimationFrame(() => {
        volRaf = 0;
        const media = getMedia();
        if (!isMediaReady(media)) return;
        const r = ratioFromPointer(volSlider, lastVolX);
        media.muted = r === 0;
        media.volume = r;
        syncState();
      });
    });
    volSlider.addEventListener('keydown', (e) => {
      if (isUpgraded('media-volume-slider')) return;
      const media = getMedia();
      if (!isMediaReady(media)) return;
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        e.preventDefault();
        media.muted = false;
        media.volume = Math.min(1, media.volume + 0.1);
        syncState();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        e.preventDefault();
        media.volume = Math.max(0, media.volume - 0.1);
        syncState();
      }
    });
  }

  const onWindowPointerUp = () => {
    if (draggingTime) {
      draggingTime = false;
      stage?.classList.remove('is-scrubbing');
      timeSlider?.classList.remove('is-pointing');
    }
    draggingVol = false;
  };
  window.addEventListener('pointerup', onWindowPointerUp);
  document.addEventListener('fullscreenchange', syncState);

  /* Keyboard shortcuts & button activation fallback if custom elements aren't upgraded */
  const onStageKeyDown = (e) => {
    const active = document.activeElement;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(active?.tagName)) return;

    const activeTag = active?.tagName?.toLowerCase();
    if (activeTag && fallbackButtonTags.includes(activeTag) && !isUpgraded(activeTag)) {
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        active.click();
        return;
      }
    }

    if (isUpgraded('media-hotkey')) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const key = e.key.toLowerCase();
    const isBtn = active?.tagName === 'BUTTON' || active?.getAttribute('role') === 'button';
    const onSlider = active === timeSlider || active === volSlider;
    const media = getMedia();

    if (e.key === 'Escape' && errorDialog?.hasAttribute('data-open')) {
      e.preventDefault();
      hideFallbackError();
    } else if (key === 'k' || (e.code === 'Space' && !isBtn)) {
      e.preventDefault();
      togglePlay();
    } else if (key === 'm') {
      e.preventDefault();
      toggleMute();
    } else if (key === 'f') {
      e.preventDefault();
      toggleFullscreen();
    } else if (key === 'c') {
      e.preventDefault();
      toggleCaptions();
    } else if ((key === 'j' || key === 'l') && isMediaReady(media) && Number.isFinite(media.duration)) {
      e.preventDefault();
      const delta = key === 'j' ? -10 : 10;
      media.currentTime = Math.min(media.duration, Math.max(0, media.currentTime + delta));
      syncState();
    } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !onSlider && isMediaReady(media) && Number.isFinite(media.duration)) {
      e.preventDefault();
      const delta = e.key === 'ArrowLeft' ? -5 : 5;
      media.currentTime = Math.min(media.duration, Math.max(0, media.currentTime + delta));
      syncState();
    } else if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !onSlider && isMediaReady(media)) {
      e.preventDefault();
      const delta = e.key === 'ArrowUp' ? 0.05 : -0.05;
      media.muted = false;
      media.volume = Math.min(1, Math.max(0, media.volume + delta));
      syncState();
    } else if (/^[0-9]$/.test(key) && isMediaReady(media) && Number.isFinite(media.duration)) {
      e.preventDefault();
      media.currentTime = media.duration * (Number(key) / 10);
      syncState();
    }
  };
  playerEl.addEventListener('keydown', onStageKeyDown);

  /* Drag-and-drop local media directly onto the player stage */
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && (file.type.startsWith('video/') || file.type.startsWith('audio/'))) {
      const objUrl = URL.createObjectURL(file);
      userBlobUrls.add(objUrl);
      loadSource(objUrl, { badge: file.name.slice(0, 22).toUpperCase() });
    }
  };
  stage?.addEventListener('dragover', onDragOver);
  stage?.addEventListener('drop', onDrop);

  /* If <mux-video> was present initially but CDN failed to upgrade, gracefully fall back to MP4 */
  let fallbackTimer = null;
  if (cdnElementsSettled) {
    fallbackMuxToMp4(false);
  } else {
    fallbackTimer = setTimeout(() => fallbackMuxToMp4(false), 2600);
  }

  syncState();

  return {
    syncState,
    loadSource,
    setPolarity(polarity) {
      stage?.setAttribute('data-vernier-polarity', polarity === 'ceramic' ? 'ceramic' : 'obsidian');
    },
    setLuminanceSim(mode) {
      if (!stage) return;
      if (mode === 'glare' || mode === 'crush') stage.setAttribute('data-luminance-sim', mode);
      else stage.removeAttribute('data-luminance-sim');
    },
    setSfxEnabled: audio.setEnabled,
    getMedia,
    destroy() {
      destroyed = true;
      clearTimeout(idleTimer);
      clearTimeout(fallbackTimer);
      cancelAnimationFrame(pointerWakeRaf);
      cancelAnimationFrame(sliderPointerRaf);
      cancelAnimationFrame(volRaf);
      menuObserver?.disconnect();
      bindMediaListeners(null);
      window.removeEventListener('pointerup', onWindowPointerUp);
      document.removeEventListener('fullscreenchange', syncState);
      stage?.removeEventListener('click', onStageClickFallback);
      stage?.removeEventListener('pointermove', onStagePointerMove);
      stage?.removeEventListener('pointerdown', wakeControls);
      stage?.removeEventListener('focusin', wakeControls);
      stage?.removeEventListener('keydown', wakeControls);
      stage?.removeEventListener('dragover', onDragOver);
      stage?.removeEventListener('drop', onDrop);
      dialogClose?.removeEventListener('click', onDialogCloseClick);
      timeCurr?.removeEventListener('click', onTimeToggleClick);
      timeCurr?.removeEventListener('keydown', onTimeToggleKeyDown);
      playerEl.removeEventListener('keydown', onStageKeyDown);
      clearTrackBlobs();
      userBlobUrls.forEach((u) => URL.revokeObjectURL(u));
      userBlobUrls.clear();
    },
  };
}
