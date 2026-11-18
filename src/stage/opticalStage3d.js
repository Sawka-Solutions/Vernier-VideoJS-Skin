/**
 * Restrained Three.js ACESFilmic 4-light studio stage backdrop behind the VERNIER-10 optical bench.
 * Zero fullscreen post-processing passes (no bloom, DoF, or grain) to preserve 60fps at DPR <= 2.
 * Automatically pauses when hidden, scrolled out of view, fullscreen, or under prefers-reduced-motion.
 */

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export class OpticalStage3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.THREE = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.rigGroup = null;
    this.rimLight = null;
    this.accentRingMat = null;
    this.rafId = null;
    this.isVisible = true;
    this.isPaused = false;
    this.isPlaying = false;
    this.pointerTarget = { x: 0, y: 0 };
    this.pointerCurrent = { x: 0, y: 0 };
    this.accentColorHex = 0xe84824;
    this.observer = null;
    this.resizeHandler = null;
    this.pointerHandler = null;
    this.visibilityHandler = null;
    this.fullscreenHandler = null;
  }

  async init(initialAccentCssColor = '#e84824') {
    if (!this.canvas || typeof window === 'undefined') return false;

    try {
      const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js');
      this.THREE = THREE;

      const renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer = renderer;

      const scene = new THREE.Scene();
      this.scene = scene;

      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
      camera.position.set(0, 0.35, 6.4);
      this.camera = camera;

      // 4-light architectural studio rig (cool mineral light-table + accent rim)
      const hemi = new THREE.HemisphereLight(0xf6f9fc, 0x64748b, 1.0);
      scene.add(hemi);

      const key = new THREE.DirectionalLight(0xffffff, 1.9);
      key.position.set(4, 5, 4);
      scene.add(key);

      const fill = new THREE.DirectionalLight(0xb8c7d9, 0.95);
      fill.position.set(-4, 2, 3);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(this.accentColorHex, 2.2);
      rim.position.set(-1.5, 3.2, -4);
      scene.add(rim);
      this.rimLight = rim;

      this.buildOpticalRig(THREE, scene);
      this.setAccentColor(initialAccentCssColor);
      this.resize();
      this.bindEvents();

      if (prefersReducedMotion()) {
        this.renderStatic();
      } else {
        this.start();
      }
      return true;
    } catch {
      return false;
    }
  }

  buildOpticalRig(THREE, scene) {
    const group = new THREE.Group();
    group.position.set(0.35, 0.1, 0);
    group.rotation.set(0.24, -0.35, 0.04);

    const anodizedMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.28,
    });

    const brushedAlloyMat = new THREE.MeshStandardMaterial({
      color: 0xbac4d0,
      metalness: 0.88,
      roughness: 0.24,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: this.accentColorHex,
      metalness: 0.45,
      roughness: 0.32,
    });
    this.accentRingMat = accentMat;

    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.75, 0.028, 20, 96),
      brushedAlloyMat
    );
    group.add(outerRing);

    const barrelRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.48, 0.056, 24, 96),
      anodizedMat
    );
    barrelRing.position.z = -0.18;
    group.add(barrelRing);

    const indexRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.18, 0.015, 16, 84),
      accentMat
    );
    indexRing.position.z = 0.14;
    group.add(indexRing);

    const tickGeo = new THREE.BoxGeometry(0.018, 0.09, 0.036);
    for (let i = 0; i < 24; i += 1) {
      const angle = (i / 24) * Math.PI * 2;
      const tick = new THREE.Mesh(
        tickGeo,
        i % 6 === 0 ? accentMat : anodizedMat
      );
      tick.position.set(Math.cos(angle) * 1.61, Math.sin(angle) * 1.61, 0.03);
      tick.rotation.z = angle + Math.PI / 2;
      group.add(tick);
    }

    scene.add(group);
    this.rigGroup = group;
  }

  setPlaying(playing) {
    this.isPlaying = Boolean(playing);
  }

  setAccentColor(cssColor) {
    if (!this.THREE) return;
    try {
      const col = new this.THREE.Color(cssColor);
      this.accentColorHex = col.getHex();
      if (this.rimLight) this.rimLight.color.copy(col);
      if (this.accentRingMat) this.accentRingMat.color.copy(col);
      if (prefersReducedMotion()) this.renderStatic();
    } catch {
      /* Keep fallback hex if CSS string isn't RGB/hex */
    }
  }

  resize() {
    if (!this.renderer || !this.camera || !this.canvas) return;
    const width = Math.max(this.canvas.clientWidth, 1);
    const height = Math.max(this.canvas.clientHeight, 1);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    if (prefersReducedMotion()) this.renderStatic();
  }

  renderStatic() {
    if (!this.renderer || !this.scene || !this.camera) return;
    if (this.rigGroup) {
      this.rigGroup.rotation.set(0.26, -0.35, 0.08);
    }
    this.renderer.render(this.scene, this.camera);
  }

  bindEvents() {
    this.resizeHandler = () => this.resize();
    window.addEventListener('resize', this.resizeHandler, { passive: true });

    this.pointerHandler = (event) => {
      this.pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 2;
      this.pointerTarget.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', this.pointerHandler, { passive: true });

    this.visibilityHandler = () => {
      this.isPaused = document.hidden || Boolean(document.fullscreenElement);
      if (!this.isPaused && this.isVisible && !prefersReducedMotion()) this.start();
    };
    document.addEventListener('visibilitychange', this.visibilityHandler);

    this.fullscreenHandler = () => {
      this.isPaused = document.hidden || Boolean(document.fullscreenElement);
      if (!this.isPaused && this.isVisible && !prefersReducedMotion()) this.start();
    };
    document.addEventListener('fullscreenchange', this.fullscreenHandler);

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          this.isVisible = Boolean(entry && entry.isIntersecting);
          if (this.isVisible && !this.isPaused && !prefersReducedMotion()) this.start();
        },
        { threshold: 0.05 }
      );
      this.observer.observe(this.canvas);
    }
  }

  start() {
    if (this.rafId !== null || !this.renderer || prefersReducedMotion()) return;
    const tick = (timeMs) => {
      if (this.isPaused || !this.isVisible || prefersReducedMotion()) {
        this.rafId = null;
        if (prefersReducedMotion()) this.renderStatic();
        return;
      }

      this.pointerCurrent.x += (this.pointerTarget.x - this.pointerCurrent.x) * 0.05;
      this.pointerCurrent.y += (this.pointerTarget.y - this.pointerCurrent.y) * 0.05;

      if (this.rigGroup) {
        const rate = this.isPlaying ? 0.00055 : 0.00022;
        const t = timeMs * rate;
        this.rigGroup.rotation.y = -0.35 + this.pointerCurrent.x * 0.12 + Math.sin(t) * 0.05;
        this.rigGroup.rotation.x = 0.24 - this.pointerCurrent.y * 0.08;
        this.rigGroup.rotation.z = t * 0.35;
      }

      this.renderer.render(this.scene, this.camera);
      this.rafId = window.requestAnimationFrame(tick);
    };
    this.rafId = window.requestAnimationFrame(tick);
  }

  dispose() {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.observer) this.observer.disconnect();
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    if (this.pointerHandler) window.removeEventListener('pointermove', this.pointerHandler);
    if (this.visibilityHandler) document.removeEventListener('visibilitychange', this.visibilityHandler);
    if (this.fullscreenHandler) document.removeEventListener('fullscreenchange', this.fullscreenHandler);

    if (this.scene) {
      this.scene.traverse((obj) => {
        if (obj.isMesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
