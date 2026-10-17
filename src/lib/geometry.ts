// Small geometry helpers for the hand-made SVG drawings. Everything runs at build time.

export type Pt = [number, number];

const f = (n: number) => Number(n.toFixed(2));

/** Seeded random numbers, so sketches look hand-drawn but build identically every time. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const polar = (cx: number, cy: number, r: number, deg: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

/**
 * An open belt around two pulleys (external tangents). Returns the closed path, running
 * clockwise on screen (top strand from pulley 1 towards pulley 2), and its length.
 */
export function beltPath(c1: Pt, r1: number, c2: Pt, r2: number) {
  const dx = c2[0] - c1[0];
  const dy = c2[1] - c1[1];
  const d = Math.hypot(dx, dy);
  const ux = dx / d;
  const uy = dy / d;
  // Perpendicular pointing "up" (to the left of the c1->c2 direction on screen).
  const px = uy;
  const py = -ux;
  const k = (r1 - r2) / d;
  const s = Math.sqrt(1 - k * k);
  const nTop: Pt = [ux * k + px * s, uy * k + py * s];
  const nBot: Pt = [ux * k - px * s, uy * k - py * s];
  const t1: Pt = [c1[0] + r1 * nTop[0], c1[1] + r1 * nTop[1]];
  const t2: Pt = [c2[0] + r2 * nTop[0], c2[1] + r2 * nTop[1]];
  const b1: Pt = [c1[0] + r1 * nBot[0], c1[1] + r1 * nBot[1]];
  const b2: Pt = [c2[0] + r2 * nBot[0], c2[1] + r2 * nBot[1]];
  const phi = Math.asin(k);
  const span = Math.sqrt(d * d - (r1 - r2) ** 2);
  const arc1 = r1 * (Math.PI + 2 * phi);
  const arc2 = r2 * (Math.PI - 2 * phi);
  const large1 = Math.PI + 2 * phi > Math.PI ? 1 : 0;
  const large2 = Math.PI - 2 * phi > Math.PI ? 1 : 0;
  const dPath =
    `M${f(t1[0])} ${f(t1[1])}L${f(t2[0])} ${f(t2[1])}` +
    `A${r2} ${r2} 0 ${large2} 1 ${f(b2[0])} ${f(b2[1])}` +
    `L${f(b1[0])} ${f(b1[1])}` +
    `A${r1} ${r1} 0 ${large1} 1 ${f(t1[0])} ${f(t1[1])}Z`;
  return { d: dPath, length: 2 * span + arc1 + arc2, t1, t2, b1, b2 };
}

/** A pencil circle: slightly irregular, with an overshoot where the hand lifted. */
export function sketchCircle(cx: number, cy: number, r: number, seed = 1, wobble = 0.04) {
  const rand = rng(seed);
  const start = rand() * 360;
  const sweep = 360 + 18 + rand() * 25;
  const steps = 28;
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const rr = r * (1 + (rand() - 0.5) * wobble * 2 + (t - 0.5) * wobble);
    pts.push(polar(cx, cy, rr, start + sweep * t));
  }
  return smooth(pts);
}

/** A pencil line between two points, with a little bow and wobble. */
export function sketchLine(a: Pt, b: Pt, seed = 1, bow = 2.5) {
  const rand = rng(seed);
  const pts: Pt[] = [];
  const n = 6;
  const nx = -(b[1] - a[1]);
  const ny = b[0] - a[0];
  const len = Math.hypot(nx, ny) || 1;
  const k = (rand() - 0.5) * 2 * bow;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const off = Math.sin(Math.PI * t) * k + (rand() - 0.5) * bow * 0.5;
    pts.push([a[0] + (b[0] - a[0]) * t + (nx / len) * off, a[1] + (b[1] - a[1]) * t + (ny / len) * off]);
  }
  return smooth(pts);
}

/** Catmull-Rom through points, as cubic Beziers. */
export function smooth(pts: Pt[]) {
  if (pts.length < 2) return "";
  let d = `M${f(pts[0]![0])} ${f(pts[0]![1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[i + 2] ?? p2;
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** Radial tick marks around a circle (pulley teeth). */
export function ticks(cx: number, cy: number, r: number, n: number, h: number, offsetDeg = 0) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = offsetDeg + (360 / n) * i;
    const [x1, y1] = polar(cx, cy, r, a);
    const [x2, y2] = polar(cx, cy, r + h, a);
    d += `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`;
  }
  return d;
}

/** A toothed pulley outline: square teeth around a root circle. */
export function toothedOutline(cx: number, cy: number, r: number, n: number, h: number) {
  const pts: string[] = [];
  const step = 360 / n;
  for (let i = 0; i < n; i++) {
    const a = step * i;
    const seq: [number, number][] = [
      [r, a],
      [r + h, a + step * 0.12],
      [r + h, a + step * 0.5],
      [r, a + step * 0.62],
    ];
    for (const [rr, aa] of seq) {
      const [x, y] = polar(cx, cy, rr, aa);
      pts.push(`${f(x)} ${f(y)}`);
    }
  }
  return `M${pts.join("L")}Z`;
}

/** Spokes between two radii. */
export function spokes(cx: number, cy: number, r0: number, r1: number, n: number, offsetDeg = 0) {
  return ticks(cx, cy, r0, n, r1 - r0, offsetDeg);
}

/** A revision cloud (the scalloped redline mark) around an ellipse. */
export function revCloud(cx: number, cy: number, rx: number, ry: number, bumps = 12) {
  let d = "";
  for (let i = 0; i <= bumps; i++) {
    const a = (i / bumps) * Math.PI * 2;
    const x = cx + rx * Math.cos(a);
    const y = cy + ry * Math.sin(a);
    if (i === 0) d += `M${f(x)} ${f(y)}`;
    else {
      const r = (Math.PI * (rx + ry)) / bumps / 1.6;
      d += `A${f(r)} ${f(r)} 0 0 1 ${f(x)} ${f(y)}`;
    }
  }
  return d;
}
