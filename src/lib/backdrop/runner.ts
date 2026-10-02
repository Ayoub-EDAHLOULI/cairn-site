// Runs a cursor-reactive backdrop scene on a canvas.
// - Frames are drawn only while something moves; once the lines settle, the loop stops (zero idle cost).
// - Paused while the hero is off screen; requestAnimationFrame already pauses in hidden tabs.
// - Listens on the hero section only (never window), and ignores touch pointers.

import { approach, hexToRgb } from "./math";

export type Pointer = {
  x: number;
  y: number;
  /** 0 = cursor away (lines at rest), 1 = cursor fully present. Eased in and out. */
  strength: number;
};

export type Colors = {
  line: string;
  accent: string;
  accentRgb: [number, number, number];
  /** The lighter accent (--accent-text), for the comets' glowing heads. */
  glowRgb: [number, number, number];
};

export type Scene = {
  resize(width: number, height: number): void;
  /**
   * Draws one frame on a cleared canvas; `dt` is the time since the previous frame (ms, capped).
   * Returns true while the scene is still animating on its own (e.g. comets in flight).
   */
  draw(ctx: CanvasRenderingContext2D, pointer: Pointer, colors: Colors, dt: number): boolean;
  /** Launches an ambient comet (called by the runner every few seconds, unless paused). */
  launchAmbient?(): void;
  /** Removes the comets the cursor didn't launch (pausing stops them at once). */
  clearAutomatic?(): void;
};

export type Backdrop = {
  stop(): void;
  /** Pauses or resumes the automatic comets. Cursor comets keep responding: the visitor starts those. */
  setPaused(paused: boolean): void;
};

/** How fast the smoothed cursor follows the real one, and how fast the effect fades in and out. */
const FOLLOW = 0.18;
const FADE = 0.08;
/** Higher pixel densities cost more than they show for faint lines. */
const MAX_DPR = 2;
/** Frame time cap, so a stalled frame doesn't teleport comets. */
const MAX_DT = 50;
/** Ambient comets: one every 3–7 seconds, at a random interval. */
const AMBIENT_MIN_MS = 3000;
const AMBIENT_MAX_MS = 7000;

/** Starts the scene. Sets `data-canvas="on"` on the hero once the first frame is drawn. */
export function runBackdrop(canvas: HTMLCanvasElement, scene: Scene, { paused = false } = {}): Backdrop {
  const host = canvas.closest("section") ?? canvas.parentElement;
  const ctx = canvas.getContext("2d");
  if (!host || !ctx) return { stop: () => {}, setPaused: () => {} };

  const root = getComputedStyle(document.documentElement);
  const accent = root.getPropertyValue("--accent").trim();
  const colors: Colors = {
    line: root.getPropertyValue("--contour").trim(),
    accent,
    accentRgb: hexToRgb(accent),
    glowRgb: hexToRgb(root.getPropertyValue("--accent-text").trim()),
  };

  const target = { x: 0, y: 0, active: false };
  const pointer: Pointer = { x: 0, y: 0, strength: 0 };
  let width = 0;
  let height = 0;
  let frame = 0;
  let lastTime = 0;
  let onScreen = true;
  let shown = false;
  let ambientTimer: ReturnType<typeof setTimeout> | undefined;

  // Ambient comets: a single timer between launches, so nothing redraws in between.
  function scheduleAmbient() {
    clearTimeout(ambientTimer);
    if (paused || !scene.launchAmbient) return;
    ambientTimer = setTimeout(
      () => {
        if (onScreen && document.visibilityState === "visible") {
          scene.launchAmbient!();
          request();
        }
        scheduleAmbient();
      },
      AMBIENT_MIN_MS + Math.random() * (AMBIENT_MAX_MS - AMBIENT_MIN_MS),
    );
  }

  function request() {
    if (!frame && onScreen) frame = requestAnimationFrame(render);
  }

  function render(time: number) {
    frame = 0;
    const dt = lastTime ? Math.min(time - lastTime, MAX_DT) : 16;
    lastTime = time;
    const goal = target.active ? 1 : 0;
    pointer.x = approach(pointer.x, target.x, FOLLOW);
    pointer.y = approach(pointer.y, target.y, FOLLOW);
    pointer.strength = approach(pointer.strength, goal, FADE);

    const settling =
      Math.abs(pointer.x - target.x) > 0.3 ||
      Math.abs(pointer.y - target.y) > 0.3 ||
      Math.abs(pointer.strength - goal) > 0.005;
    if (!settling) {
      pointer.x = target.x;
      pointer.y = target.y;
      pointer.strength = goal;
    }

    ctx!.clearRect(0, 0, width, height);
    const sceneMoving = scene.draw(ctx!, pointer, colors, dt);

    if (!shown) {
      shown = true;
      host!.dataset.canvas = "on";
    }
    if (settling || sceneMoving) request();
    // Idle: the next frame (after a pause) starts with a normal frame time.
    else lastTime = 0;
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    scene.resize(width, height);
    request();
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType === "touch") return;
    const rect = canvas.getBoundingClientRect();
    target.x = event.clientX - rect.left;
    target.y = event.clientY - rect.top;
    // Entering from outside: start at the cursor instead of sweeping in from the last position.
    if (!target.active && pointer.strength < 0.01) {
      pointer.x = target.x;
      pointer.y = target.y;
    }
    target.active = true;
    request();
  }

  function onPointerLeave() {
    target.active = false;
    request();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) request();
    else if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    }
  });
  visibilityObserver.observe(host);

  host.addEventListener("pointermove", onPointerMove, { passive: true });
  host.addEventListener("pointerleave", onPointerLeave, { passive: true });
  if (paused) scene.clearAutomatic?.();
  scheduleAmbient();

  function setPaused(next: boolean) {
    paused = next;
    if (paused) {
      clearTimeout(ambientTimer);
      scene.clearAutomatic?.();
      request();
    } else {
      scheduleAmbient();
    }
  }

  function stop() {
    clearTimeout(ambientTimer);
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    host!.removeEventListener("pointermove", onPointerMove);
    host!.removeEventListener("pointerleave", onPointerLeave);
    delete host!.dataset.canvas;
  }

  return { stop, setPaused };
}
