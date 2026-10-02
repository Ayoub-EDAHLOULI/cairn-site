// The hero's "living topographic map":
// - the rings bend away from the cursor like terrain pushed by a finger, and light up around it;
// - moving the cursor launches comets that race along nearby rings in the direction of travel;
// - on a first visit, a few comets fly once when the canvas takes over (gone within ~2.5s).
// Comets only exist for a moment, so once they're gone and the cursor rests, nothing redraws.

import { cometOpacity, emission, stepHead, wrapIndex } from "./comets";
import { ringPoints } from "./geometry";
import { falloff } from "./math";
import type { Scene } from "./runner";

/** Reach of the cursor, in CSS pixels. */
const RADIUS = 240;
/** How far a line right under the cursor is pushed, in CSS pixels. */
const PUSH = 34;
/** Accent opacity of the lit lines at the cursor. */
const LIGHT = 0.85;
/** Lit lines are drawn a little thicker than the resting ones. */
const LIGHT_WIDTH = 1.6;
/** The SVG rings' stroke width, in viewBox units. */
const STROKE = 1.2;

/** Comets on screen at once. */
const MAX_COMETS = 12;
/** Rings within this distance of the cursor can launch a comet, in CSS pixels. */
const LAUNCH_REACH = 140;
/** Tail length (CSS pixels) and how many fading segments draw it. */
const TAIL = 120;
const TAIL_SEGMENTS = 18;
/** Radius of the glow around a comet's head, in CSS pixels. */
const HEAD_GLOW = 9;
/** Comet speed in px/ms: a base, plus a share of the cursor's speed, up to a ceiling. */
const BASE_SPEED = 0.45;
const SPEED_GAIN = 0.5;
const MAX_SPEED = 1.6;
const LIFE = 1200;
/** The opening flight: these rings each carry one comet. */
const INTRO_RINGS = [3, 5, 7, 9];
const INTRO_LIFE = 2200;
/** Intro comets start in the top part of the hero, above the demo launcher, so they're seen. */
const INTRO_MAX_Y = 0.55;

type Comet = {
  ring: number;
  /** Fractional point index of the head. */
  head: number;
  /** Signed, in points per ms. */
  velocity: number;
  age: number;
  life: number;
};

export function createScene({ intro }: { intro: boolean }): Scene {
  let rings: Float32Array[] = [];
  /** The rings as drawn this frame (bent around the cursor); comets ride on these. */
  let bent: Float32Array[] = [];
  /** Average distance between neighbouring points of each ring, in CSS pixels. */
  let spacing: number[] = [];
  let lineWidth = STROKE;
  let width = 0;
  let height = 0;

  let comets: Comet[] = [];
  let introPending = intro;
  let carry = 0;
  let lastX = Number.NaN;
  let lastY = Number.NaN;

  function launch(ring: number, head: number, direction: number, speed: number, life: number) {
    if (comets.length >= MAX_COMETS) return;
    comets.push({ ring, head, velocity: (direction * speed) / spacing[ring], age: 0, life });
  }

  /** A random point of the ring that's on screen in the top part of the hero, if there is one. */
  function visibleStart(ring: number): number | null {
    const points = rings[ring];
    const count = points.length / 2;
    for (let attempt = 0; attempt < 24; attempt++) {
      const index = Math.floor(Math.random() * count);
      const x = points[index * 2];
      const y = points[index * 2 + 1];
      if (x > 0 && x < width && y > 0 && y < height * INTRO_MAX_Y) return index;
    }
    return null;
  }

  /** A random ring near (x, y), with the index of its closest point. */
  function ringNear(x: number, y: number): { ring: number; index: number } | null {
    const candidates: { ring: number; index: number }[] = [];
    rings.forEach((points, ring) => {
      let best = Infinity;
      let bestIndex = 0;
      for (let i = 0; i < points.length; i += 2) {
        const distance = Math.hypot(points[i] - x, points[i + 1] - y);
        if (distance < best) {
          best = distance;
          bestIndex = i / 2;
        }
      }
      if (best < LAUNCH_REACH) candidates.push({ ring, index: bestIndex });
    });
    return candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : null;
  }

  /** Launches comets from rings near the cursor, along the ring in the direction it moves. */
  function launchFromCursor(x: number, y: number, vx: number, vy: number, dt: number) {
    const speed = Math.hypot(vx, vy);
    const result = emission(speed, dt, carry);
    carry = result.carry;
    for (let n = 0; n < result.count; n++) {
      const near = ringNear(x, y);
      if (!near) return;
      const points = rings[near.ring];
      const count = points.length / 2;
      const next = wrapIndex(near.index + 1, count) * 2;
      const previous = wrapIndex(near.index - 1, count) * 2;
      // Which way along the ring matches the cursor's movement?
      const along = (points[next] - points[previous]) * vx + (points[next + 1] - points[previous + 1]) * vy;
      const direction = along === 0 ? (Math.random() < 0.5 ? -1 : 1) : Math.sign(along);
      launch(near.ring, near.index, direction, Math.min(MAX_SPEED, BASE_SPEED + speed * SPEED_GAIN), LIFE);
    }
  }

  function drawComet(ctx: CanvasRenderingContext2D, comet: Comet, colors: { accentRgb: number[]; glowRgb: number[] }) {
    const points = bent[comet.ring];
    const count = points.length / 2;
    const opacity = cometOpacity(comet.age, comet.life);
    if (opacity <= 0) return;
    const direction = Math.sign(comet.velocity);
    const stride = TAIL / spacing[comet.ring] / TAIL_SEGMENTS;
    const [r, g, b] = colors.accentRgb;

    // The tail: segments behind the head, fading and thinning towards the end.
    for (let k = 0; k < TAIL_SEGMENTS; k++) {
      const from = wrapIndex(Math.round(comet.head - direction * k * stride), count) * 2;
      const to = wrapIndex(Math.round(comet.head - direction * (k + 1) * stride), count) * 2;
      const strength = 1 - k / TAIL_SEGMENTS;
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * strength ** 1.6})`;
      ctx.lineWidth = lineWidth * (1 + 2 * strength);
      ctx.beginPath();
      ctx.moveTo(points[from], points[from + 1]);
      ctx.lineTo(points[to], points[to + 1]);
      ctx.stroke();
    }

    // The head: a soft glow in the lighter accent.
    const head = wrapIndex(Math.round(comet.head), count) * 2;
    const [gr, gg, gb] = colors.glowRgb;
    const glow = ctx.createRadialGradient(points[head], points[head + 1], 0, points[head], points[head + 1], HEAD_GLOW);
    glow.addColorStop(0, `rgba(${gr}, ${gg}, ${gb}, ${opacity})`);
    glow.addColorStop(1, `rgba(${gr}, ${gg}, ${gb}, 0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(points[head] - HEAD_GLOW, points[head + 1] - HEAD_GLOW, HEAD_GLOW * 2, HEAD_GLOW * 2);
  }

  return {
    resize(newWidth, newHeight) {
      width = newWidth;
      height = newHeight;
      const geometry = ringPoints(width, height);
      rings = geometry.rings;
      bent = rings.map((points) => new Float32Array(points.length));
      spacing = rings.map((points) => {
        let length = 0;
        for (let i = 2; i < points.length; i += 2) {
          length += Math.hypot(points[i] - points[i - 2], points[i + 1] - points[i - 1]);
        }
        return length / (points.length / 2);
      });
      lineWidth = STROKE * geometry.scale;
    },

    draw(ctx, pointer, colors, dt) {
      // The opening flight, once.
      if (introPending) {
        introPending = false;
        for (const ring of INTRO_RINGS) {
          if (ring >= rings.length) continue;
          const head = visibleStart(ring);
          if (head === null) continue;
          const direction = Math.random() < 0.5 ? -1 : 1;
          launch(ring, head, direction, 0.9 + Math.random() * 0.5, INTRO_LIFE - Math.random() * 400);
        }
      }

      // Cursor speed from the eased pointer; comets launch only while the cursor is really present.
      if (pointer.strength > 0.5 && !Number.isNaN(lastX)) {
        launchFromCursor(pointer.x, pointer.y, (pointer.x - lastX) / dt, (pointer.y - lastY) / dt, dt);
      }
      lastX = pointer.strength > 0.5 ? pointer.x : Number.NaN;
      lastY = pointer.y;

      // Bend the rings around the cursor.
      const path = new Path2D();
      const pushing = pointer.strength > 0.001;
      rings.forEach((points, ring) => {
        const out = bent[ring];
        for (let i = 0; i < points.length; i += 2) {
          let x = points[i];
          let y = points[i + 1];
          if (pushing) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const distance = Math.hypot(dx, dy);
            const push = falloff(distance, RADIUS) * pointer.strength * PUSH;
            if (push > 0 && distance > 0.001) {
              x += (dx / distance) * push;
              y += (dy / distance) * push;
            }
          }
          out[i] = x;
          out[i + 1] = y;
          if (i === 0) path.moveTo(x, y);
          else path.lineTo(x, y);
        }
        path.closePath();
      });

      ctx.lineWidth = lineWidth;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = colors.line;
      ctx.stroke(path);

      // The same lines again, lit in the accent color, fading out with distance from the cursor.
      if (pointer.strength > 0.01) {
        const [r, g, b] = colors.accentRgb;
        const light = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, RADIUS);
        light.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${LIGHT * pointer.strength})`);
        light.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.strokeStyle = light;
        ctx.lineWidth = lineWidth * LIGHT_WIDTH;
        ctx.stroke(path);
      }

      // Comets: draw, then move along their ring and age; expired ones are dropped.
      for (const comet of comets) drawComet(ctx, comet, colors);
      comets = comets.filter((comet) => {
        comet.head = stepHead(comet.head, comet.velocity, dt, rings[comet.ring].length / 2);
        comet.age += dt;
        return comet.age < comet.life;
      });

      return comets.length > 0;
    },
  };
}
