/**
 * VERNIER-10 — React Skin Adapter for Video.js v10 (@videojs/react)
 * License: Apache-2.0
 */

import React from 'react';
import {
  Container,
  Controls,
  PlayButton,
  SeekButton,
  MuteButton,
  VolumeSlider,
  TimeSlider,
  Slider,
  Time,
  Menu,
  PlaybackRateButton,
  PlaybackRateRadioGroup,
  CaptionsButton,
  PiPButton,
  FullscreenButton,
  Poster,
  BufferingIndicator,
  StatusAnnouncer,
  Tooltip,
  Gesture,
  Hotkey,
  ErrorDialog,
  createPlayer,
} from '@videojs/react';
import { Video, videoFeatures } from '@videojs/react/video';
import { MuxVideo } from '@videojs/react/media/mux-video';
import './vernier-skin.css';

const { Player, usePlayer } = createPlayer({ features: videoFeatures });

export interface VernierPlayerProps {
  muxPlaybackId?: string;
  src?: string;
  poster?: string;
  captionsSrc?: string;
  chaptersSrc?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  polarity?: 'obsidian' | 'ceramic';
  className?: string;
}

function VernierHudStatus({ badge }: { badge: string }) {
  const paused = usePlayer((s) => s.paused);
  const ended = usePlayer((s) => s.ended);
  const label = ended ? 'ENDED' : paused ? 'STANDBY' : 'TRANSPORT';

  return (
    <div className="vernier-hud-top">
      <div className="vernier-tally-pill">
        <span className="vernier-tally-led" aria-hidden="true" />
        <span className="vernier-tally-label">{label}</span>
      </div>
      <div className="vernier-stream-badge">{badge}</div>
    </div>
  );
}

export function VernierPlayer({
  muxPlaybackId = 'BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM',
  src,
  poster,
  captionsSrc,
  chaptersSrc,
  crossOrigin,
  polarity = 'obsidian',
  className = '',
}: VernierPlayerProps) {
  const resolvedPoster =
    poster ??
    (!src && muxPlaybackId
      ? `https://image.mux.com/${muxPlaybackId}/thumbnail.webp?time=2`
      : undefined);

  const badge = src ? 'VIDEO.JS V10 · MP4' : 'MUX HLS · STORYBOARD';

  return (
    <div className={`vernier-player ${className}`.trim()}>
      <Player>
        <Container className="vernier-stage" data-vernier-polarity={polarity}>
        {src ? (
          <Video
            src={src}
            poster={resolvedPoster}
            crossOrigin={crossOrigin}
            playsInline
            preload="metadata"
          >
            {captionsSrc ? (
              <track kind="captions" src={captionsSrc} srcLang="en" label="English" />
            ) : null}
            {chaptersSrc ? (
              <track kind="chapters" src={chaptersSrc} srcLang="en" label="Chapters" default />
            ) : null}
          </Video>
        ) : (
          <MuxVideo
            source={{ playbackId: muxPlaybackId }}
            poster={resolvedPoster}
            playsInline
            crossOrigin="anonymous"
          >
            {captionsSrc ? (
              <track kind="captions" src={captionsSrc} srcLang="en" label="English" />
            ) : null}
            {chaptersSrc ? (
              <track kind="chapters" src={chaptersSrc} srcLang="en" label="Chapters" default />
            ) : null}
          </MuxVideo>
        )}

        <Poster.Root className="vernier-poster">
          <Poster.Image alt="Video preview frame" decoding="async" />
        </Poster.Root>

        <Gesture type="tap" action="togglePaused" pointer="mouse" region="center" />
        <Gesture type="doubletap" action="seekStep" value={-10} region="left" />
        <Gesture type="doubletap" action="toggleFullscreen" region="center" />
        <Gesture type="doubletap" action="seekStep" value={10} region="right" />

        <Hotkey keys="Space" action="togglePaused" />
        <Hotkey keys="k" action="togglePaused" />
        <Hotkey keys="m" action="toggleMuted" />
        <Hotkey keys="f" action="toggleFullscreen" />
        <Hotkey keys="c" action="toggleSubtitles" />
        <Hotkey keys="ArrowLeft" action="seekStep" value={-5} />
        <Hotkey keys="ArrowRight" action="seekStep" value={5} />
        <Hotkey keys="j" action="seekStep" value={-10} />
        <Hotkey keys="l" action="seekStep" value={10} />
        <Hotkey keys="ArrowUp" action="volumeStep" value={0.05} />
        <Hotkey keys="ArrowDown" action="volumeStep" value={-0.05} />
        <Hotkey keys="0-9" action="seekToPercent" />

        <StatusAnnouncer className="vernier-status-announcer" />

        <div className="vernier-scrim" aria-hidden="true" />

        <div className="vernier-reticles" aria-hidden="true">
          <span className="vernier-reticle tl" />
          <span className="vernier-reticle tr" />
          <span className="vernier-reticle bl" />
          <span className="vernier-reticle br" />
        </div>

        <VernierHudStatus badge={badge} />

        <div className="vernier-center-aperture">
          <PlayButton
            className="vernier-aperture-btn"
            render={(props) => (
              <button type="button" aria-label="Play video" {...props}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="7,4 20,12 7,20" />
                </svg>
              </button>
            )}
          />
        </div>

        <BufferingIndicator className="vernier-buffer" aria-label="Buffering">
          <span className="vernier-buffer-ring" aria-hidden="true" />
        </BufferingIndicator>

        <div className="vernier-controls">
          <Controls.Root>
            <Controls.Backdrop />
            <Controls.Content className="vernier-controls-content">
            <Tooltip.Provider delay={450} closeDelay={100} timeout={600}>
              <div className="vernier-deck">
                <div className="vernier-rail-wrap">
                  <TimeSlider.Root className="vernier-slider" aria-label="Seek timeline">
                    <TimeSlider.Chapters
                      className="vernier-chapters"
                      renderChapter={(props) => (
                        <div {...props} className="vernier-chapter">
                          <TimeSlider.Track className="vernier-track">
                            <TimeSlider.Buffer className="vernier-buffer-bar" />
                            <TimeSlider.Fill className="vernier-fill" />
                          </TimeSlider.Track>
                        </div>
                      )}
                    />
                    <TimeSlider.Thumb className="vernier-thumb" />
                    <TimeSlider.Preview className="vernier-loupe">
                      <Slider.Thumbnail.Root className="vernier-loupe-thumb">
                        <Slider.Thumbnail.Image />
                      </Slider.Thumbnail.Root>
                      <div className="vernier-loupe-meta">
                        <TimeSlider.ChapterTitle className="vernier-loupe-chapter" />
                        <TimeSlider.Value className="vernier-loupe-val" type="pointer" />
                      </div>
                    </TimeSlider.Preview>
                  </TimeSlider.Root>
                </div>

                <Controls.Group className="vernier-controls-row" aria-label="Playback controls">
                  <div className="vernier-cluster">
                    <Tooltip.Root side="top" boundary="container">
                      <Tooltip.Trigger
                        render={(triggerProps) => (
                          <PlayButton {...triggerProps} className="v-ctrl vernier-play">
                            <svg className="icon-play" viewBox="0 0 24 24" aria-hidden="true">
                              <polygon points="7,5 19,12 7,19" fill="currentColor" stroke="none" />
                            </svg>
                            <svg className="icon-pause" viewBox="0 0 24 24" aria-hidden="true">
                              <rect x="6.5" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
                              <rect x="13.5" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
                            </svg>
                            <svg className="icon-replay" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                              <path d="M3 3v5h5" />
                            </svg>
                          </PlayButton>
                        )}
                      />
                      <Tooltip.Popup className="vernier-tooltip">
                        <Tooltip.Label>Play / Pause (K)</Tooltip.Label>
                      </Tooltip.Popup>
                    </Tooltip.Root>

                    <Tooltip.Root side="top" boundary="container">
                      <Tooltip.Trigger
                        render={(triggerProps) => (
                          <SeekButton {...triggerProps} seconds={-10} className="v-ctrl vernier-seek-btn" aria-label="Seek back 10 seconds">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M11 17l-5-5 5-5" />
                              <path d="M18 17l-5-5 5-5" />
                            </svg>
                            <span className="v-seek-tag" aria-hidden="true">10</span>
                          </SeekButton>
                        )}
                      />
                      <Tooltip.Popup className="vernier-tooltip">
                        <Tooltip.Label>Back 10s (J)</Tooltip.Label>
                      </Tooltip.Popup>
                    </Tooltip.Root>

                    <Tooltip.Root side="top" boundary="container">
                      <Tooltip.Trigger
                        render={(triggerProps) => (
                          <SeekButton {...triggerProps} seconds={10} className="v-ctrl vernier-seek-btn" aria-label="Seek forward 10 seconds">
                            <span className="v-seek-tag" aria-hidden="true">10</span>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M13 17l5-5-5-5" />
                              <path d="M6 17l5-5-5-5" />
                            </svg>
                          </SeekButton>
                        )}
                      />
                      <Tooltip.Popup className="vernier-tooltip">
                        <Tooltip.Label>Forward 10s (L)</Tooltip.Label>
                      </Tooltip.Popup>
                    </Tooltip.Root>

                    <div className="vernier-volume-group">
                      <Tooltip.Root side="top" boundary="container">
                        <Tooltip.Trigger
                          render={(triggerProps) => (
                            <MuteButton {...triggerProps} className="v-ctrl vernier-mute">
                              <svg className="icon-vol-high" viewBox="0 0 24 24" aria-hidden="true">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                              </svg>
                              <svg className="icon-vol-low" viewBox="0 0 24 24" aria-hidden="true">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                              </svg>
                              <svg className="icon-muted" viewBox="0 0 24 24" aria-hidden="true">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <line x1="22" y1="9" x2="16" y2="15" />
                                <line x1="16" y1="9" x2="22" y2="15" />
                              </svg>
                            </MuteButton>
                          )}
                        />
                        <Tooltip.Popup className="vernier-tooltip">
                          <Tooltip.Label>Mute (M)</Tooltip.Label>
                        </Tooltip.Popup>
                      </Tooltip.Root>

                      <VolumeSlider.Root className="vernier-vol-slider" aria-label="Volume">
                        <VolumeSlider.Track className="vernier-vol-track">
                          <VolumeSlider.Fill className="vernier-vol-fill" />
                        </VolumeSlider.Track>
                        <VolumeSlider.Thumb className="vernier-vol-thumb" />
                      </VolumeSlider.Root>
                    </div>

                    <Time.Group className="vernier-time-group" aria-label="Time progress">
                      <Time.Value className="vernier-time-toggle" type="current" toggle />
                      <Time.Separator className="vernier-sep" />
                      <Time.Value className="vernier-time-duration" type="duration" />
                    </Time.Group>
                  </div>

                  <div className="vernier-cluster">
                    <div className="vernier-speed-wrap">
                      <Menu.Root side="top" align="end" boundary="container">
                        <Menu.Trigger
                          render={(triggerProps) => (
                            <PlaybackRateButton
                              {...triggerProps}
                              className="v-ctrl vernier-rate"
                              render={(rateProps, state) => (
                                <button {...rateProps}>
                                  {Math.round(state.rate * 100) / 100}&times;
                                </button>
                              )}
                            />
                          )}
                        />
                        <Menu.Popup className="vernier-menu">
                          <Menu.Content className="vernier-menu-content">
                            <PlaybackRateRadioGroup.Root>
                              <PlaybackRateRadioGroup.Options
                                className="vernier-rate-group"
                                renderItem={(itemProps, itemState) => (
                                  <Menu.RadioItem {...itemProps} className="vernier-menu-item">
                                    <span>{itemState.label}</span>
                                    <Menu.ItemIndicator className="vernier-menu-indicator" forceMount />
                                  </Menu.RadioItem>
                                )}
                              />
                            </PlaybackRateRadioGroup.Root>
                          </Menu.Content>
                        </Menu.Popup>
                      </Menu.Root>
                    </div>

                    <Tooltip.Root side="top" boundary="container">
                      <Tooltip.Trigger
                        render={(triggerProps) => (
                          <CaptionsButton {...triggerProps} className="v-ctrl vernier-cc">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
                              <path d="M10 10.2a2.2 2.2 0 1 0 0 3.6" />
                              <path d="M16.5 10.2a2.2 2.2 0 1 0 0 3.6" />
                            </svg>
                            <span className="vernier-cc-bar" aria-hidden="true" />
                          </CaptionsButton>
                        )}
                      />
                      <Tooltip.Popup className="vernier-tooltip">
                        <Tooltip.Label>Captions (C)</Tooltip.Label>
                      </Tooltip.Popup>
                    </Tooltip.Root>

                    <Tooltip.Root side="top" boundary="container">
                      <Tooltip.Trigger
                        render={(triggerProps) => (
                          <PiPButton {...triggerProps} className="v-ctrl vernier-pip">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                              <rect x="11.5" y="11" width="7.5" height="5.5" rx="1" fill="currentColor" stroke="none" />
                            </svg>
                          </PiPButton>
                        )}
                      />
                      <Tooltip.Popup className="vernier-tooltip">
                        <Tooltip.Label>Picture in Picture</Tooltip.Label>
                      </Tooltip.Popup>
                    </Tooltip.Root>

                    <Tooltip.Root side="top" boundary="container">
                      <Tooltip.Trigger
                        render={(triggerProps) => (
                          <FullscreenButton {...triggerProps} className="v-ctrl vernier-fs">
                            <svg className="icon-enter" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                              <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                              <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
                              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                            </svg>
                            <svg className="icon-exit" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M4 9h4V5" />
                              <path d="M20 9h-4V5" />
                              <path d="M4 15h4v4" />
                              <path d="M20 15h-4v4" />
                            </svg>
                          </FullscreenButton>
                        )}
                      />
                      <Tooltip.Popup className="vernier-tooltip">
                        <Tooltip.Label>Fullscreen (F)</Tooltip.Label>
                      </Tooltip.Popup>
                    </Tooltip.Root>
                  </div>
                </Controls.Group>
              </div>
            </Tooltip.Provider>
            </Controls.Content>
          </Controls.Root>
        </div>

        <ErrorDialog.Root>
          <ErrorDialog.Backdrop className="vernier-dialog-backdrop" />
          <ErrorDialog.Popup className="vernier-dialog-popup">
            <ErrorDialog.Title className="vernier-dialog-title">Playback Signal Interrupted</ErrorDialog.Title>
            <ErrorDialog.Description className="vernier-dialog-desc" />
            <ErrorDialog.Close className="vernier-dialog-close">Dismiss</ErrorDialog.Close>
          </ErrorDialog.Popup>
        </ErrorDialog.Root>
      </Container>
      </Player>
    </div>
  );
}

export default VernierPlayer;
