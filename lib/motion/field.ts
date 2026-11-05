/**
 * "Think in Algorithm" — the hero's signature WebGL field.
 *
 * A scattered cloud of nodes sorts itself into the CodeMindset </> mark (chaos → algorithm),
 * turns in 3D toward the pointer, bends away from the cursor or finger, and drifts apart as the
 * visitor scrolls on.
 *
 * Budget: raw WebGL2, 1 program, 2 draw calls (nodes + edges), zero per-frame allocations.
 * All motion lives in the vertex shader; the CPU only writes ~10 uniforms per frame.
 * Runs on gsap.ticker (the same single ticker as Lenis) and only while the hero is on screen.
 */
import { gsap } from 'gsap';

type Tier = { nodes: number; dpr: number };

/** The CodeMindset mark (public/brand/codemindset-mark.svg), as polygons. */
const MARK: [number, number][][] = [
  [
    [20, 76],
    [124, 31],
    [124, 65],
    [66, 91],
    [124, 117],
    [124, 151],
    [20, 106],
  ],
  [
    [380, 76],
    [276, 31],
    [276, 65],
    [334, 91],
    [276, 117],
    [276, 151],
    [380, 106],
  ],
  [
    [231, 18],
    [267, 18],
    [169, 190],
    [133, 190],
  ],
];
const MARK_BOX = { x: 20, y: 18, w: 360, h: 172 };

function inPoly(x: number, y: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]!;
    const [xj, yj] = poly[j]!;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Deterministic PRNG so the composition is identical on every visit. */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickTier(): Tier {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const mem = nav.deviceMemory ?? 4;
  const dpr = window.devicePixelRatio || 1;
  if (cores <= 2 || mem <= 2) return { nodes: 900, dpr: 1 };
  if (cores <= 4 || mem <= 4 || window.innerWidth < 768)
    return { nodes: 1600, dpr: Math.min(dpr, 1.5) };
  return { nodes: 2600, dpr: Math.min(dpr, 2) };
}

function buildData(n: number) {
  const r = rng(7);
  const from = new Float32Array(n * 3);
  const to = new Float32Array(n * 3);
  const seed = new Float32Array(n);
  const s = 2 / MARK_BOX.w; // mark spans x ∈ [-1, 1]
  let i = 0;
  while (i < n) {
    const x = MARK_BOX.x + r() * MARK_BOX.w;
    const y = MARK_BOX.y + r() * MARK_BOX.h;
    if (!MARK.some((p) => inPoly(x, y, p))) continue;
    to[i * 3] = (x - MARK_BOX.x - MARK_BOX.w / 2) * s;
    to[i * 3 + 1] = -(y - MARK_BOX.y - MARK_BOX.h / 2) * s;
    to[i * 3 + 2] = (r() - 0.5) * 0.16; // extruded, so it has real depth when it turns
    // Scattered start: a wide, flat-ish cloud.
    const a = r() * Math.PI * 2;
    const rad = 0.35 + Math.sqrt(r()) * 1.5;
    from[i * 3] = Math.cos(a) * rad * 1.25;
    from[i * 3 + 1] = Math.sin(a) * rad * 0.75;
    from[i * 3 + 2] = (r() - 0.5) * 1.6;
    seed[i] = r();
    i++;
  }

  // Edges: each node links to its nearest neighbours in the finished mark (grid hash, O(n)).
  const cell = 0.09;
  const grid = new Map<string, number[]>();
  const key = (x: number, y: number) => `${Math.floor(x / cell)},${Math.floor(y / cell)}`;
  for (let k = 0; k < n; k++) {
    const kk = key(to[k * 3]!, to[k * 3 + 1]!);
    const bucket = grid.get(kk);
    if (bucket) bucket.push(k);
    else grid.set(kk, [k]);
  }
  const pairs: number[] = [];
  for (let k = 0; k < n; k++) {
    if (seed[k]! > 0.55) continue; // only some nodes reach out: a sparse, legible web
    const x = to[k * 3]!;
    const y = to[k * 3 + 1]!;
    const cx = Math.floor(x / cell);
    const cy = Math.floor(y / cell);
    let best = -1;
    let bestD = 0.06 * 0.06;
    for (let gx = cx - 1; gx <= cx + 1; gx++)
      for (let gy = cy - 1; gy <= cy + 1; gy++)
        for (const j of grid.get(`${gx},${gy}`) ?? []) {
          if (j <= k) continue;
          const dx = to[j * 3]! - x;
          const dy = to[j * 3 + 1]! - y;
          const d = dx * dx + dy * dy;
          if (d > 0.0004 && d < bestD) {
            bestD = d;
            best = j;
          }
        }
    if (best >= 0) pairs.push(k, best);
  }
  // Line vertices carry the same attributes as their node, so one shader places both.
  const m = pairs.length;
  const lFrom = new Float32Array(m * 3);
  const lTo = new Float32Array(m * 3);
  const lSeed = new Float32Array(m);
  pairs.forEach((k, v) => {
    lFrom.set(from.subarray(k * 3, k * 3 + 3), v * 3);
    lTo.set(to.subarray(k * 3, k * 3 + 3), v * 3);
    lSeed[v] = seed[k]!;
  });
  return { from, to, seed, lFrom, lTo, lSeed, lines: m };
}

const VERT = `#version 300 es
precision highp float;
in vec3 aFrom; in vec3 aTo; in float aSeed;
uniform float uT, uAssemble, uScroll, uAspect, uScale, uSize, uLine;
uniform vec2 uCenter, uRot;
uniform vec3 uPointer;
out float vA; out float vHot; out float vSeed;
void main(){
  float a = clamp(uAssemble * 1.4 - aSeed * 0.4, 0.0, 1.0);
  a = a * a * (3.0 - 2.0 * a);
  vec3 p = mix(aFrom, aTo, a);
  float drift = 0.012 + (1.0 - a) * 0.05;
  p += drift * vec3(sin(uT * 0.7 + aSeed * 40.0), cos(uT * 0.6 + aSeed * 31.0), sin(uT * 0.5 + aSeed * 17.0));
  p += uScroll * vec3((aSeed - 0.5) * 1.4, 0.6 + aSeed * 1.2, (fract(aSeed * 7.0) - 0.5) * 2.0);
  // Turn the mark toward the pointer.
  float cy = cos(uRot.x), sy = sin(uRot.x), cx = cos(uRot.y), sx = sin(uRot.y);
  p.xz = mat2(cy, -sy, sy, cy) * p.xz;
  p.yz = mat2(cx, -sx, sx, cx) * p.yz;
  float f = 2.4 / (2.4 - p.z);
  vec2 s = p.xy * f * uScale;
  // Pointer: a soft force field, computed in aspect-correct screen units.
  vec2 scr = s + uCenter * vec2(uAspect, 1.0);
  vec2 d = scr - uPointer.xy * vec2(uAspect, 1.0);
  float fall = exp(-dot(d, d) / 0.045) * uPointer.z;
  scr += normalize(d + 1e-5) * fall * 0.12;
  vHot = fall;
  gl_Position = vec4(scr / vec2(uAspect, 1.0), 0.0, 1.0);
  gl_PointSize = uSize * f * (0.65 + aSeed * 0.7) * (1.0 + fall * 0.8);
  float leave = 1.0 - uScroll;
  // Lines vanish early as the mark disperses, so they never stretch into streaks.
  vA = (0.28 + 0.72 * a) * leave * mix(1.0, a * a * 0.35 * leave * leave * leave, uLine);
  vSeed = aSeed;
}`;

const FRAG = `#version 300 es
precision mediump float;
in float vA; in float vHot; in float vSeed;
uniform highp float uLine; // must match the vertex shader's precision
out vec4 o;
void main(){
  float m = 1.0;
  if (uLine < 0.5) {
    vec2 c = gl_PointCoord - 0.5;
    float r = dot(c, c);
    m = smoothstep(0.25, 0.08, r);
  }
  vec3 violet = vec3(0.427, 0.157, 0.851);   // #6d28d9
  vec3 lilac  = vec3(0.659, 0.333, 0.969);   // #a855f7
  vec3 amber  = vec3(0.984, 0.749, 0.141);   // #fbbf24
  vec3 col = mix(violet, lilac, vSeed);
  col = mix(col, amber, clamp(vHot * 1.4, 0.0, 1.0));
  float a = vA * m;
  o = vec4(col * a, a);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(sh) ?? 'shader');
  return sh;
}

export type FieldHandle = { destroy: () => void };

export function startField(
  canvas: HTMLCanvasElement,
  hero: HTMLElement,
  anchor: HTMLElement | null,
  onReady: () => void,
  onFail: () => void,
): FieldHandle | null {
  const gl = canvas.getContext('webgl2', {
    antialias: false,
    alpha: true,
    premultipliedAlpha: true,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
  });
  if (!gl) return null;

  const tier = pickTier();
  let dpr = tier.dpr;
  let drawCount = tier.nodes;
  const data = buildData(tier.nodes);

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn('[hero-field]', gl.getProgramInfoLog(prog));
    return null;
  }
  gl.useProgram(prog);

  const vao = (from: Float32Array, to: Float32Array, seed: Float32Array) => {
    const v = gl.createVertexArray()!;
    gl.bindVertexArray(v);
    (
      [
        ['aFrom', from, 3],
        ['aTo', to, 3],
        ['aSeed', seed, 1],
      ] as const
    ).forEach(([name, arr, size]) => {
      const loc = gl.getAttribLocation(prog, name);
      const b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    });
    return v;
  };
  const nodesVao = vao(data.from, data.to, data.seed);
  const linesVao = vao(data.lFrom, data.lTo, data.lSeed);
  gl.bindVertexArray(null);

  type UName =
    | 'uT'
    | 'uAssemble'
    | 'uScroll'
    | 'uAspect'
    | 'uScale'
    | 'uSize'
    | 'uLine'
    | 'uCenter'
    | 'uRot'
    | 'uPointer';
  const U = Object.fromEntries(
    [
      'uT',
      'uAssemble',
      'uScroll',
      'uAspect',
      'uScale',
      'uSize',
      'uLine',
      'uCenter',
      'uRot',
      'uPointer',
    ].map((n) => [n, gl.getUniformLocation(prog, n)]),
  ) as Record<UName, WebGLUniformLocation | null>;

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const state = {
    assemble: 0,
    px: 0,
    py: 0,
    pz: 0, // pointer strength
    rx: 0,
    ry: 0,
    cx: 0.45,
    cy: 0,
    scale: 0.5,
    aspect: 1,
  };
  const target = { px: 0, py: 0, pz: 0, rx: 0, ry: 0 };

  const layout = () => {
    const r = canvas.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    state.aspect = r.width / r.height;
    // Centre the mark on the visual column (or the hero's lower half on phones).
    const a = anchor?.getBoundingClientRect();
    if (a && a.width > 0) {
      state.cx = ((a.left + a.width / 2 - r.left) / r.width) * 2 - 1;
      state.cy = 1 - ((a.top + a.height / 2 - r.top) / r.height) * 2;
      // The mark fills the anchor's width (in clip-space height units).
      state.scale = a.width / r.height;
    } else {
      state.cx = 0;
      state.cy = -0.3;
      state.scale = Math.min(1, (r.width * 0.9) / r.height);
    }
  };
  const ro = new ResizeObserver(layout);
  ro.observe(canvas);
  layout();

  // Pointer, mouse and touch alike.
  const toNdc = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    target.px = ((e.clientX - r.left) / r.width) * 2 - 1;
    target.py = 1 - ((e.clientY - r.top) / r.height) * 2;
  };
  const onMove = (e: PointerEvent) => {
    toNdc(e);
    target.pz = e.pointerType === 'mouse' ? 1 : 1.4;
    target.rx = (target.px - state.cx) * 0.35;
    target.ry = -(target.py - state.cy) * 0.25;
  };
  const onLeave = () => {
    target.pz = 0;
    target.rx = 0;
    target.ry = 0;
  };
  hero.addEventListener('pointermove', onMove, { passive: true });
  hero.addEventListener('pointerdown', onMove, { passive: true });
  hero.addEventListener('pointerleave', onLeave, { passive: true });
  hero.addEventListener('pointercancel', onLeave, { passive: true });

  // Only draw while the hero is visible and the tab is in front.
  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting), { threshold: 0 });
  io.observe(hero);

  // Assemble: chaos → algorithm.
  // Assemble (chaos → algorithm) the first time the mark is actually on screen, so phones,
  // where it sits below the fold, still see it happen.
  const intro = gsap.to(state, { assemble: 1, duration: 2.6, ease: 'expo.out', paused: true });
  const seen = new IntersectionObserver(
    ([e]) => {
      if (e?.isIntersecting) {
        intro.play();
        seen.disconnect();
      }
    },
    { threshold: 0.35 },
  );
  seen.observe(anchor ?? hero);

  // Adaptive quality: if frames run slow, drop resolution, then node count. Never below 60 fps.
  let frames = 0;
  let slow = 0;
  let last = 0;
  let readySent = false;
  let lost = false;

  const render = (time: number) => {
    if (lost || !visible || document.hidden) return;
    if (last) {
      const dt = time - last;
      if (frames < 240) {
        frames++;
        if (dt > 0.022) slow++;
        if (frames === 120 && slow > 40) {
          if (dpr > 1) {
            dpr = 1;
            layout();
          } else drawCount = Math.floor(drawCount * 0.6);
          frames = 0;
          slow = 0;
        }
      }
    }
    last = time;

    const k = 0.08;
    state.px += (target.px - state.px) * k * 2;
    state.py += (target.py - state.py) * k * 2;
    state.pz += (target.pz - state.pz) * k;
    state.rx += (target.rx - state.rx) * k * 0.6;
    state.ry += (target.ry - state.ry) * k * 0.6;

    // Disperse as the mark leaves: starts when its bottom edge passes 55% of the viewport,
    // complete when it reaches the top. Measured on the mark, so it works on every layout.
    const ab = (anchor ?? hero).getBoundingClientRect().bottom;
    const vh = window.innerHeight * 0.55;
    const scroll = Math.min(1, Math.max(0, 1 - ab / vh));
    // Size in pixels, scaled with the mark so density looks the same on every screen.
    const size = Math.max(2.2, Math.min(5.2, state.scale * 7)) * dpr;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(U.uT, time);
    gl.uniform1f(U.uAssemble, state.assemble);
    gl.uniform1f(U.uScroll, scroll);
    gl.uniform1f(U.uAspect, state.aspect);
    gl.uniform1f(U.uScale, state.scale);
    gl.uniform1f(U.uSize, size);
    gl.uniform2f(U.uCenter, state.cx, state.cy);
    gl.uniform2f(U.uRot, state.rx + Math.sin(time * 0.25) * 0.06, state.ry);
    gl.uniform3f(U.uPointer, state.px, state.py, state.pz);

    gl.uniform1f(U.uLine, 1);
    gl.bindVertexArray(linesVao);
    gl.drawArrays(gl.LINES, 0, Math.floor((data.lines * drawCount) / tier.nodes / 2) * 2);
    gl.uniform1f(U.uLine, 0);
    gl.bindVertexArray(nodesVao);
    gl.drawArrays(gl.POINTS, 0, drawCount);

    if (!readySent) {
      readySent = true;
      onReady();
    }
  };
  gsap.ticker.add(render);

  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
    onFail();
  };
  canvas.addEventListener('webglcontextlost', onLost);

  return {
    destroy: () => {
      gsap.ticker.remove(render);
      intro.kill();
      seen.disconnect();
      ro.disconnect();
      io.disconnect();
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerdown', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      hero.removeEventListener('pointercancel', onLeave);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
