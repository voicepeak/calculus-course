SCENES.limitSeq = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "conv";
  const V = view(w, h, 0, 62, 0, mode === "diverge" ? 1.9 : 1.32, 20);
  line(ctx, 20, h - 20, w - 16, h - 20, C, { a: 0.18, w: 1 });
  label(ctx, "n →", w - 16, h - 30, { align: "right", c: C, a: 0.5, size: 9 });
  const prog = seq(t, mode === "diverge" ? 6.5 : 5.2);
  const nMax = 2 + Math.floor(58 * smooth(prog));
  const f = mode === "diverge" ? n => 0.028 * n : n => 1 - 1 / (n + 0.55);
  if (mode === "conv") {
    const yl = V.Y(1);
    line(ctx, 20, yl, w - 16, yl, C, { a: 0.4, dash: [4, 5] });
    label(ctx, "a = 1", w - 22, yl - 9, { c: C, a: 0.75, size: 9.5, align: "right" });
  }
  for (let n = 1; n <= nMax; n++) {
    const x = V.X(n), y = V.Y(f(n));
    const head = n >= nMax - 1;
    if (head) continue;
    ctx.globalAlpha = 1;
    glow(ctx, x, y, 1.7, C, 0.16 + 0.5 * (n / nMax), 0);
  }
  const nh = nMax;
  const xh = V.X(nh), yh = V.Y(f(nh));
  glow(ctx, xh, yh, 3.2, C, 1, 16);
  if (mode === "diverge") {
    arrow(ctx, xh, yh - 6, xh + 2, yh - 26, C, { a: 0.65, w: 1.3, head: 7 });
    label(ctx, "→ ∞", Math.min(xh + 8, w - 12), yh - 34, { c: C, a: 0.85, size: 10 });
  }
  label(ctx, mode === "diverge" ? "aₙ 越来越大" : "点列落向水平线", 20, 18, { c: C, a: 0.6, size: 9 });
};

SCENES.limitFn = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "both";
  if (mode === "tiny") {
    const V = view(w, h, 0, 6.4, 0, 2.1, 18);
    line(ctx, V.X(0), V.Y(0), V.X(6.4), V.Y(0), C, { a: 0.25, w: 1 });
    plot(ctx, V, x => 1.5 / (x + 0.6), 0.12, 6.3, C, { a: 0.9, w: 1.7 });
    const s = smooth(seq(t, 5));
    const x0 = lerp(0.35, 6.1, s), y0 = 1.5 / (x0 + 0.6);
    glow(ctx, V.X(x0), V.Y(y0), 3, C, 1, 14);
    label(ctx, "f(x) → 0", w - 18, V.Y(0) - 14, { c: C, a: 0.8, size: 9.5, align: "right" });
    label(ctx, "x → ∞", 18, V.Y(0) - 14, { c: C, a: 0.5, size: 9 });
    return;
  }
  const V = view(w, h, -1.7, 1.7, -0.25, 2.5, 20);
  const A = mode === "sides" ? 1 : 1;
  line(ctx, V.X(-1.6), V.Y(A), V.X(1.6), V.Y(A), C, { a: 0.35, dash: [4, 5] });
  label(ctx, "A", V.X(1.55), V.Y(A) - 10, { c: C, a: 0.7, size: 9.5, align: "right" });
  plot(ctx, V, x => Math.abs(x) < 0.012 ? NaN : Math.sin(x) / x, -1.6, 1.6, C, { a: 0.85, w: 1.6 });
  if (mode === "sides") {
    plot(ctx, V, x => x > 0.02 ? Math.sin(x) / x + 1 : NaN, 0.02, 1.6, C, { a: 0.6, w: 1.4 });
    label(ctx, "A⁺ = 2", V.X(1.58), V.Y(2) - 8, { c: C, a: 0.7, size: 9.5, align: "right" });
    ring(ctx, V.X(0), V.Y(2), 3, C, { a: 0.8, w: 1.3 });
    ring(ctx, V.X(0), V.Y(1), 3, C, { a: 0.8, w: 1.3 });
    label(ctx, "A⁻ = 1", V.X(0.06), V.Y(1) + 12, { c: C, a: 0.7, size: 9 });
  }
  const s = smooth(seq(t, 4.4));
  const d = mode === "sides" ? lerp(1.5, 0.015, s) : lerp(1.55, 0.015, s);
  const yl = Math.sin(d) / d;
  glow(ctx, V.X(-d), V.Y(yl), 2.6, C, 0.95, 12);
  if (mode !== "sides") glow(ctx, V.X(d), V.Y(yl), 2.6, C, 0.95, 12);
  else glow(ctx, V.X(d), V.Y(yl + 1), 2.6, C, 0.95, 12);
  ring(ctx, V.X(0), V.Y(1), 4, C, { a: 0.9, w: 1.4 });
  label(ctx, "x₀", V.X(0), h - 8, { c: C, a: 0.55, size: 9, align: "center" });
  label(ctx, mode === "sides" ? "左右夹向不同的高度" : "两翼夹向空心点", w / 2, 16, { c: C, a: 0.55, size: 9, align: "center" });
};

SCENES.infCompare = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "equiv";
  if (mode === "equiv") {
    const V = view(w, h, -1.5, 1.5, -0.25, 1.35, 20);
    plot(ctx, V, x => x, -1.4, 1.4, C, { a: 0.4, w: 1.1, dash: [5, 5] });
    plot(ctx, V, x => Math.sin(x), -1.45, 1.45, C, { a: 1, w: 1.8 });
    label(ctx, "y = x", V.X(-1.15), V.Y(-1.15) + 4, { c: C, a: 0.5, size: 9 });
    label(ctx, "y = sin x", V.X(0.75), V.Y(0.68), { c: C, a: 0.9, size: 9.5 });
    const s = 0.5 + 0.5 * Math.sin(t * 1.2);
    ring(ctx, V.X(0), V.Y(0), 10 + 8 * s, C, { a: 0.35 * (1 - s), w: 1.2 });
    label(ctx, "sin x ~ x", w / 2, 16, { c: C, a: 0.65, size: 9, align: "center" });
    return;
  }
  const V = view(w, h, -0.06, 1.22, -0.05, 1.35, 20);
  plot(ctx, V, x => x, 0, 1.2, C, { a: 0.4, w: 1.2, dash: [4, 4] });
  plot(ctx, V, x => x * x, 0, 1.2, C, { a: 1, w: 1.8 });
  label(ctx, "x", V.X(1.05), V.Y(1.05) + 10, { c: C, a: 0.55, size: 9.5 });
  label(ctx, "x²", V.X(0.82), V.Y(0.62), { c: C, a: 0.9, size: 9.5 });
  const s = 0.5 - 0.5 * Math.cos(t * 0.9);
  const x = lerp(1.12, 0.08, s);
  line(ctx, V.X(x), V.Y(x), V.X(x), V.Y(x * x), C, { a: 0.3, w: 1, dash: [3, 4] });
  glow(ctx, V.X(x), V.Y(x), 2.4, C, 0.85, 8);
  glow(ctx, V.X(x), V.Y(x * x), 2.4, C, 0.85, 8);
  label(ctx, "x² / x → 0", 20, 18, { c: C, a: 0.6, size: 9 });
};

SCENES.continuity = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "cont";
  const V = view(w, h, -2.6, 2.6, -0.2, 3.4, 20);
  if (mode === "cont") {
    const f = x => 1.4 + 0.75 * Math.sin(x * 1.1) + 0.18 * x;
    const s = seq(t, 6);
    const x = lerp(-2.4, 2.4, smooth(s));
    const fx = f(x);
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const xx = lerp(-2.5, x, i / 80);
      pts.push([V.X(xx), V.Y(f(xx))]);
    }
    path(ctx, pts, C, { a: 0.85, w: 1.8 });
    glow(ctx, V.X(x), V.Y(fx), 3.2, C, 1, 14);
    line(ctx, V.X(x), V.Y(fx), V.X(x), V.Y(0), C, { a: 0.22, w: 1, dash: [3, 4] });
    label(ctx, "f(x₀) = lim f(x)", w / 2, 16, { c: C, a: 0.6, size: 9, align: "center" });
    return;
  }
  const kind = Math.floor(mod(t, 9.6) / 3.2);
  if (kind === 0) {
    plot(ctx, V, x => x < 0 ? 0.9 + 0.35 * x : 2.3 + 0.35 * x, -2.5, 2.5, C, { a: 0.9, w: 1.8 });
    ring(ctx, V.X(0), V.Y(0.9), 3.5, C, { a: 0.95, w: 1.4 });
    glow(ctx, V.X(0), V.Y(2.3), 3, C, 0.95, 10);
    label(ctx, "跳跃间断", 18, 16, { c: C, a: 0.7, size: 9 });
  } else if (kind === 1) {
    plot(ctx, V, x => Math.abs(x - 0.5) < 0.03 ? NaN : 1 + (x - 0.5), -2.5, 2.5, C, { a: 0.9, w: 1.8 });
    ring(ctx, V.X(0.5), V.Y(1), 3.5, C, { a: 0.95, w: 1.4 });
    glow(ctx, V.X(0.5), V.Y(2.35), 3, C, 0.9, 10);
    line(ctx, V.X(0.5), V.Y(1), V.X(0.5), V.Y(2.35), C, { a: 0.25, w: 1, dash: [3, 4] });
    label(ctx, "可去间断", 18, 16, { c: C, a: 0.7, size: 9 });
  } else {
    const f = x => x <= 0.045 ? NaN : 1.6 + 1.1 * Math.sin(1 / x);
    plot(ctx, V, f, 0.045, 2.5, C, { a: 0.9, w: 1.4, n: 500 });
    label(ctx, "振荡间断", 18, 16, { c: C, a: 0.7, size: 9 });
  }
  label(ctx, "连续被破坏的三种方式", w - 18, 16, { c: C, a: 0.4, size: 8.5, align: "right" });
};

SCENES.ivt = function (ctx, w, h, t, p, C) {
  const V = view(w, h, 0, 4, -1.6, 1.6, 20);
  const f = x => 0.62 * x - 1.24 + 0.34 * Math.sin(2.1 * x);
  line(ctx, V.X(0.25), V.Y(0), V.X(3.8), V.Y(0), C, { a: 0.25, w: 1 });
  plot(ctx, V, f, 0.3, 3.75, C, { a: 0.95, w: 1.8 });
  const a = 0.35, b = 3.65;
  line(ctx, V.X(a), V.Y(-1.5), V.X(a), V.Y(1.5), C, { a: 0.2, w: 1, dash: [3, 4] });
  line(ctx, V.X(b), V.Y(-1.5), V.X(b), V.Y(1.5), C, { a: 0.2, w: 1, dash: [3, 4] });
  label(ctx, "a", V.X(a), h - 8, { c: C, a: 0.6, size: 9, align: "center" });
  label(ctx, "b", V.X(b), h - 8, { c: C, a: 0.6, size: 9, align: "center" });
  glow(ctx, V.X(a), V.Y(f(a)), 2.6, C, 0.8, 8);
  glow(ctx, V.X(b), V.Y(f(b)), 2.6, C, 0.8, 8);
  let level;
  if ((p.mode || "ivt") === "zero") level = 0;
  else level = lerp(f(a), f(b), 0.5 + 0.5 * Math.sin(t * 0.7));
  line(ctx, V.X(a), V.Y(level), V.X(b), V.Y(level), C, { a: 0.5, w: 1.2, dash: [5, 5] });
  label(ctx, (p.mode || "ivt") === "zero" ? "y = 0" : "y = c", V.X(a) + 4, V.Y(level) - 9, { c: C, a: 0.7, size: 9 });
  let prev = f(a) - level;
  for (let i = 1; i <= 120; i++) {
    const x = lerp(a, b, i / 120);
    const cur = f(x) - level;
    if (prev * cur <= 0 && Math.abs(prev - cur) > 0.0001) {
      glow(ctx, V.X(x), V.Y(level), 3.2, C, 0.95, 12);
      ring(ctx, V.X(x), V.Y(level), 6 + 2 * Math.sin(t * 3), C, { a: 0.3, w: 1 });
    }
    prev = cur;
  }
  label(ctx, (p.mode || "ivt") === "zero" ? "异号 ⇒ 必有零点" : "中间值必被取到", w / 2, 16, { c: C, a: 0.6, size: 9, align: "center" });
};

SCENES.derivative = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "tan";
  const V = view(w, h, -2.3, 2.3, -0.4, 1.9, 20);
  const f = mode === "corner" ? (x => 0.72 * Math.abs(x) + 0.12) : (x => 0.55 * Math.sin(1.35 * x) + 0.35 * x + 0.55);
  plot(ctx, V, f, -2.1, 2.1, C, { a: 0.9, w: 1.8 });
  const s = 0.5 + 0.5 * Math.sin(t * 0.55);
  const x0 = lerp(-1.9, 1.9, s);
  const y0 = f(x0);
  const hh = 1e-4;
  const d = (f(x0 + hh) - f(x0 - hh)) / (2 * hh);
  glow(ctx, V.X(x0), V.Y(y0), 3.2, C, 1, 13);
  if (mode === "corner" && Math.abs(x0) < 0.12) {
    line(ctx, V.X(x0 - 0.5), V.Y(y0 + 0.36), V.X(x0), V.Y(y0), C, { a: 0.5, w: 1.2, dash: [4, 4] });
    line(ctx, V.X(x0), V.Y(y0), V.X(x0 + 0.5), V.Y(y0 + 0.36), C, { a: 0.5, w: 1.2, dash: [4, 4] });
    glow(ctx, V.X(x0), V.Y(y0), 2.2, "#fb7185", 1, 10);
    label(ctx, "左导数 ≠ 右导数 · 不可导", w / 2, 16, { c: "#fb7185", a: 0.9, size: 9, align: "center" });
  } else {
    const xa = x0 - 0.95, xb = x0 + 0.95;
    line(ctx, V.X(xa), V.Y(y0 + d * (xa - x0)), V.X(xb), V.Y(y0 + d * (xb - x0)), C, { a: 0.95, w: 1.6 });
    label(ctx, "f′(x₀) = " + d.toFixed(2), 18, 16, { c: C, a: 0.7, size: 9 });
  }
  if (mode === "corner") {
    line(ctx, V.X(x0), V.Y(f(x0)), V.X(x0), V.Y(0.12), C, { a: 0.18, w: 1, dash: [3, 4] });
  } else {
    line(ctx, V.X(x0), V.Y(y0), V.X(x0), V.Y(0.55), C, { a: 0.18, w: 1, dash: [3, 4] });
  }
};

SCENES.differential = function (ctx, w, h, t, p, C) {
  const V = view(w, h, 0.55, 2.35, 0.45, 2.7, 22);
  const f = x => 0.62 * x * x;
  const d = x => 1.24 * x;
  const x0 = 0.95;
  const dx = 0.28 + 0.26 * (0.5 + 0.5 * Math.sin(t * 1.1));
  const y0 = f(x0), y1 = f(x0 + dx);
  plot(ctx, V, f, 0.7, 2.25, C, { a: 0.9, w: 1.8 });
  const xs = x0 + dx;
  line(ctx, V.X(x0), V.Y(y0), V.X(xs), V.Y(y0 + d(x0) * dx), C, { a: 0.9, w: 1.5, dash: [5, 4] });
  line(ctx, V.X(x0), V.Y(y0), V.X(xs), V.Y(y0), C, { a: 0.4, w: 1 });
  line(ctx, V.X(x0), V.Y(y0), V.X(x0), V.Y(y1), C, { a: 0.25, w: 1, dash: [3, 3] });
  line(ctx, V.X(xs), V.Y(y0 + d(x0) * dx), V.X(xs), V.Y(y1), C, { a: 0.35, w: 1 });
  const errPts = [[V.X(xs), V.Y(y0 + d(x0) * dx)]];
  for (let i = 1; i <= 20; i++) {
    const xx = lerp(xs, x0, i / 20);
    errPts.push([V.X(xx), V.Y(lerp(y0 + d(x0) * dx, y1, i / 20))]);
  }
  path(ctx, errPts, C, { a: 0.18, w: 1, fill: 0.1 });
  glow(ctx, V.X(x0), V.Y(y0), 3, C, 1, 12);
  glow(ctx, V.X(xs), V.Y(y1), 2.6, C, 0.8, 10);
  label(ctx, "Δx", V.X(x0 + dx / 2), V.Y(y0) + 11, { c: C, a: 0.65, size: 9, align: "center" });
  label(ctx, "dy = f′Δx", V.X(xs) + 8, V.Y(y0 + d(x0) * dx) - 10, { c: C, a: 0.8, size: 9 });
  label(ctx, "Δy", V.X(x0) - 8, V.Y((y0 + y1) / 2), { c: C, a: 0.6, size: 9, align: "right" });
  label(ctx, "切线代替曲线的误差", 18, 16, { c: C, a: 0.5, size: 8.5 });
};

SCENES.higherDeriv = function (ctx, w, h, t, p, C) {
  const xc = w / 2;
  const A = Math.min(w * 0.3, 118);
  const s = Math.sin(0.95 * t), c = Math.cos(0.95 * t);
  const px = xc + A * s;
  const trackY = h * 0.78;
  line(ctx, 24, trackY, w - 24, trackY, C, { a: 0.25, w: 1 });
  for (let i = 1; i <= 26; i++) {
    const x = xc + A * Math.sin(0.95 * (t - i * 0.035));
    glow(ctx, x, trackY, 1.6, C, 0.16 * (1 - i / 26), 0);
  }
  glow(ctx, px, trackY, 4.5, C, 1, 16);
  label(ctx, "x", 26, trackY + 1, { c: C, a: 0.55, size: 9 });
  const lane1 = h * 0.3, lane2 = h * 0.52;
  label(ctx, "v", 26, lane1, { c: "#fbbf24", a: 0.75, size: 9 });
  label(ctx, "a", 26, lane2, { c: "#f472b6", a: 0.75, size: 9 });
  line(ctx, 44, lane1, w - 26, lane1, C, { a: 0.08, w: 1 });
  line(ctx, 44, lane2, w - 26, lane2, C, { a: 0.08, w: 1 });
  const vlen = c * A * 0.78;
  const alen = -s * A * 0.5;
  arrow(ctx, xc, lane1, xc + vlen, lane1, "#fbbf24", { a: 0.85, w: 2, head: 8 });
  arrow(ctx, xc, lane2, xc + alen, lane2, "#f472b6", { a: 0.85, w: 2, head: 8 });
  glow(ctx, xc, lane1, 2, "#fbbf24", 0.6, 6);
  glow(ctx, xc, lane2, 2, "#f472b6", 0.6, 6);
  label(ctx, "位移 → 速度 → 加速度", w - 18, 16, { c: C, a: 0.45, size: 8.5, align: "right" });
};

SCENES.implicit = function (ctx, w, h, t, p, C) {
  const S = Math.min(w, h) / 4.6;
  const X = x => w / 2 + x * S, Y = y => h / 2 - y * S;
  const r = 1.45;
  ring(ctx, w / 2, h / 2, r * S, C, { a: 0.75, w: 1.7 });
  const a = 0.45 * t;
  const px = r * Math.cos(a), py = r * Math.sin(a);
  line(ctx, w / 2, h / 2, X(px), Y(py), C, { a: 0.3, w: 1, dash: [3, 4] });
  const tx = -Math.sin(a), ty = Math.cos(a);
  line(ctx, X(px - 1.5 * tx), Y(py - 1.5 * ty), X(px + 1.5 * tx), Y(py + 1.5 * ty), C, { a: 0.95, w: 1.6 });
  glow(ctx, X(px), Y(py), 3.4, C, 1, 13);
  label(ctx, "F(x,y) = x² + y² − r² = 0", 16, 18, { c: C, a: 0.6, size: 9 });
  label(ctx, "y′ = −x / y", 16, 34, { c: C, a: 0.8, size: 9.5 });
  label(ctx, "切线", X(px + 1.35 * tx) + 4, Y(py + 1.35 * ty) - 6, { c: C, a: 0.6, size: 8.5 });
};

SCENES.paramDeriv = function (ctx, w, h, t, p, C) {
  const S = Math.min(w, h) / 4.2;
  const X = x => w / 2 + x * S, Y = y => h / 2 - y * S;
  const P = u => [1.5 * Math.sin(u), 1.05 * Math.sin(2 * u)];
  const pts = [];
  for (let i = 0; i <= 180; i++) {
    const q = P(i / 180 * TAU);
    pts.push([X(q[0]), Y(q[1])]);
  }
  path(ctx, pts, C, { a: 0.35, w: 1.2 });
  const u = mod(0.7 * t, TAU);
  const q = P(u);
  const vx = 1.5 * Math.cos(u), vy = 2.1 * Math.cos(2 * u);
  const k = 0.55;
  const cx = X(q[0]), cy = Y(q[1]);
  glow(ctx, cx, cy, 3.2, C, 1, 13);
  arrow(ctx, cx, cy, cx + vx * S * k, cy, "#38bdf8", { a: 0.85, w: 1.5, head: 6 });
  arrow(ctx, cx, cy, cx, cy - vy * S * k, "#fb923c", { a: 0.85, w: 1.5, head: 6 });
  arrow(ctx, cx, cy, cx + vx * S * k, cy - vy * S * k, C, { a: 0.95, w: 1.8, head: 7 });
  label(ctx, "dx/dt", cx + vx * S * k * 0.55, cy + 12, { c: "#38bdf8", a: 0.7, size: 8, align: "center" });
  label(ctx, "dy/dt", cx - 20, cy - vy * S * k * 0.5, { c: "#fb923c", a: 0.7, size: 8 });
  const slope = Math.abs(vx) > 0.05 ? vy / vx : NaN;
  label(ctx, "dy/dx = (dy/dt)/(dx/dt)" + (isFinite(slope) ? " = " + slope.toFixed(2) : ""), 16, 16, { c: C, a: 0.65, size: 8.5 });
};

SCENES.arcElement = function (ctx, w, h, t, p, C) {
  const V = view(w, h, -0.2, 2.6, -0.1, 1.9, 22);
  const f = x => 0.55 + 0.42 * Math.sin(1.25 * x) + 0.22 * x;
  plot(ctx, V, f, -0.05, 2.45, C, { a: 0.85, w: 1.8 });
  const s = 0.5 + 0.5 * Math.sin(0.5 * t);
  const x0 = lerp(0.3, 1.6, s);
  const dx = 0.55;
  const x1 = x0 + dx;
  const y0 = f(x0), y1 = f(x1);
  glow(ctx, V.X(x0), V.Y(y0), 3, C, 1, 10);
  glow(ctx, V.X(x1), V.Y(y1), 2.6, C, 0.7, 8);
  line(ctx, V.X(x0), V.Y(y0), V.X(x1), V.Y(y0), C, { a: 0.75, w: 1.3 });
  line(ctx, V.X(x1), V.Y(y0), V.X(x1), V.Y(y1), C, { a: 0.75, w: 1.3 });
  line(ctx, V.X(x0), V.Y(y0), V.X(x1), V.Y(y1), C, { a: 0.95, w: 1.6 });
  label(ctx, "dx", V.X(x0 + dx / 2), V.Y(y0) + 10, { c: C, a: 0.8, size: 8.5, align: "center" });
  label(ctx, "dy", V.X(x1) + 8, V.Y((y0 + y1) / 2), { c: C, a: 0.8, size: 8.5 });
  label(ctx, "ds", V.X((x0 + x1) / 2) - 12, V.Y((y0 + y1) / 2) - 10, { c: C, a: 0.9, size: 9 });
  label(ctx, "ds = √(dx² + dy²)", 16, 16, { c: C, a: 0.65, size: 8.5 });
};

SCENES.mvt = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "lagrange";
  if (mode === "cauchy") {
    const S = Math.min(w, h) / 4.4;
    const X = x => w / 2 + x * S, Y = y => h / 2 - y * S;
    const P = u => [1.3 * Math.sin(u) + 0.15 * Math.sin(3 * u), 0.9 * Math.sin(2 * u)];
    const pts = [];
    for (let i = 0; i <= 160; i++) {
      const q = P(-1.35 + 2.7 * i / 160);
      pts.push([X(q[0]), Y(q[1])]);
    }
    path(ctx, pts, C, { a: 0.9, w: 1.7 });
    const a = P(-1.35), b = P(1.35);
    line(ctx, X(a[0]), Y(a[1]), X(b[0]), Y(b[1]), C, { a: 0.45, w: 1.1, dash: [5, 5] });
    const u = lerp(-1.35, 1.35, 0.5 + 0.5 * Math.sin(0.6 * t));
    const q = P(u);
    const du = 0.01;
    const q1 = P(u - du), q2 = P(u + du);
    const tanx = (q2[0] - q1[0]), tany = (q2[1] - q1[1]);
    const len = Math.hypot(tanx, tany) || 1;
    line(ctx, X(q[0] - tanx / len * 1.1), Y(q[1] - tany / len * 1.1), X(q[0] + tanx / len * 1.1), Y(q[1] + tany / len * 1.1), C, { a: 0.95, w: 1.6 });
    glow(ctx, X(q[0]), Y(q[1]), 3, C, 1, 12);
    label(ctx, "参数曲线上的弦 ∥ 某点切线", w / 2, 16, { c: C, a: 0.6, size: 9, align: "center" });
    return;
  }
  const V = view(w, h, -1.7, 1.7, -0.2, 2.1, 20);
  const f = mode === "rolle" ? (x => 1.5 - 0.55 * x * x) : (x => 0.75 + 0.65 * Math.sin(1.25 * x));
  plot(ctx, V, f, -1.5, 1.5, C, { a: 0.9, w: 1.8 });
  const a = -1.4, b = 1.4;
  const ya = f(a), yb = f(b);
  line(ctx, V.X(a), V.Y(ya), V.X(b), V.Y(yb), C, { a: 0.45, w: 1.2, dash: [5, 5] });
  glow(ctx, V.X(a), V.Y(ya), 2.6, C, 0.8, 8);
  glow(ctx, V.X(b), V.Y(yb), 2.6, C, 0.8, 8);
  const slope = (yb - ya) / (b - a);
  let best = { x: 0, err: 1e9 };
  for (let i = 0; i <= 200; i++) {
    const x = lerp(a, b, i / 200);
    const d = (f(x + 1e-4) - f(x - 1e-4)) / 2e-4;
    if (Math.abs(d - slope) < best.err) best = { x, err: Math.abs(d - slope), d };
  }
  const bx = best.x, by = f(bx);
  line(ctx, V.X(bx - 0.8), V.Y(by - 0.8 * slope), V.X(bx + 0.8), V.Y(by + 0.8 * slope), C, { a: 0.95, w: 1.7 });
  glow(ctx, V.X(bx), V.Y(by), 3.4, C, 1, 13);
  if (mode === "rolle") label(ctx, "f(a) = f(b) ⇒ f′(c) = 0", w / 2, 16, { c: C, a: 0.65, size: 9, align: "center" });
  else label(ctx, "f′(c) = 割线斜率", w / 2, 16, { c: C, a: 0.65, size: 9, align: "center" });
};

SCENES.taylor = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "formula";
  const V = view(w, h, -6.3, 6.3, -2.4, 2.4, 18);
  const f = Math.sin;
  line(ctx, V.X(-6.2), V.Y(0), V.X(6.2), V.Y(0), C, { a: 0.15, w: 1 });
  plot(ctx, V, f, -6.2, 6.2, C, { a: 0.38, w: 1.2, dash: [4, 5] });
  const orders = mode === "series" ? [1, 3, 5, 7, 9, 11, 13, 15] : [1, 3, 5, 7, 9, 11];
  const idx = Math.floor(mod(t, orders.length * 1.7) / 1.7);
  const k = orders[idx];
  const poly = x => {
    let s = 0;
    for (let i = 1; i <= k; i += 2) {
      const sign = ((i - 1) / 2) % 2 === 0 ? 1 : -1;
      s += sign * Math.pow(x, i) / factorial(i);
    }
    return s;
  };
  plot(ctx, V, poly, -6.2, 6.2, C, { a: 0.95, w: 1.8 });
  glow(ctx, V.X(0), V.Y(0), 3, C, 0.9, 10);
  label(ctx, "n = " + k, w - 18, 16, { c: C, a: 0.8, size: 10, align: "right" });
  label(ctx, "sin x 的泰勒逼近", 18, 16, { c: C, a: 0.55, size: 9 });
};

SCENES.lhopital = function (ctx, w, h, t, p, C) {
  const x0 = 0.92 * (1 - smooth(seq(t, 4.2))) + 0.018;
  const f = x => Math.sin(1.35 * x);
  const g = x => 1.4 * x;
  const V = view(w, h, -0.9, 0.9, -0.2, 1.3, 16);
  line(ctx, V.X(-0.85), V.Y(0), V.X(0.85), V.Y(0), C, { a: 0.2, w: 1 });
  plot(ctx, V, f, -0.85, 0.85, "#fbbf24", { a: 0.85, w: 1.5 });
  plot(ctx, V, g, -0.85, 0.85, "#38bdf8", { a: 0.8, w: 1.5 });
  line(ctx, V.X(x0), V.Y(0), V.X(x0), V.Y(f(x0)), C, { a: 0.3, w: 1, dash: [3, 3] });
  glow(ctx, V.X(x0), V.Y(f(x0)), 2.4, "#fbbf24", 0.9, 3);
  glow(ctx, V.X(x0), V.Y(g(x0)), 2.4, "#38bdf8", 0.9, 3);
  label(ctx, "f", V.X(-0.8), V.Y(0.9), { c: "#fbbf24", a: 0.8, size: 9 });
  label(ctx, "g", V.X(-0.8), V.Y(0.9) + 14, { c: "#38bdf8", a: 0.8, size: 9 });
  const rx0 = w * 0.58, rx1 = w - 20;
  const RV = view(w * 0.58, h, 0, 1, 0.5, 1.6, 20);
  const xmap = x => rx0 + (1 - x) * 0;
  line(ctx, w * 0.56, 16, w * 0.56, h - 16, C, { a: 0.12, w: 1 });
  line(ctx, rx0, RV.Y(1.3), rx1, RV.Y(1.3), C, { a: 0.4, w: 1, dash: [4, 4] });
  label(ctx, "f′/g′", rx1, RV.Y(1.3) - 10, { c: C, a: 0.6, size: 8.5, align: "right" });
  const pts = [];
  for (let i = 0; i <= 80; i++) {
    const x = lerp(0.9, 0.02, i / 80);
    const xx = rx0 + (0.9 - x) / 0.88 * (rx1 - rx0);
    const yy = clamp(f(x) / g(x), 0.5, 1.6);
    pts.push([xx, RV.Y(yy)]);
  }
  path(ctx, pts, C, { a: 0.75, w: 1.4 });
  const cx = rx0 + (0.9 - x0) / 0.88 * (rx1 - rx0);
  const cy = RV.Y(clamp(f(x0) / g(x0), 0.5, 1.6));
  glow(ctx, cx, cy, 3, C, 1, 10);
  label(ctx, "0/0 → 导数接管", 18, 16, { c: C, a: 0.6, size: 9 });
};

SCENES.extremum = function (ctx, w, h, t, p, C) {
  const V = view(w, h, -2.4, 2.4, -2.3, 2.3, 20);
  const f = x => 0.38 * x * x * x - 1.15 * x;
  const d = x => 1.14 * x * x - 1.15;
  plot(ctx, V, f, -2.1, 2.1, C, { a: 0.9, w: 1.8 });
  line(ctx, V.X(-2.2), V.Y(0), V.X(2.2), V.Y(0), C, { a: 0.2, w: 1 });
  for (let i = 0; i < 30; i++) {
    const x = lerp(-2.1, 2.1, i / 29 + 0.017);
    const dd = d(x);
    if (Math.abs(dd) < 0.08) continue;
    const px = V.X(x), py = V.Y(0) + 14;
    arrow(ctx, px, py, px + Math.sign(dd) * 6, py, dd > 0 ? "#4ade80" : "#fb7185", { a: 0.35, w: 1, head: 4 });
  }
  const xm = lerp(-1.9, 1.9, 0.5 + 0.5 * Math.sin(0.5 * t));
  const ym = f(xm);
  const dd = d(xm);
  line(ctx, V.X(xm - 0.65), V.Y(ym - 0.65 * dd), V.X(xm + 0.65), V.Y(ym + 0.65 * dd), C, { a: 0.7, w: 1.3 });
  glow(ctx, V.X(xm), V.Y(ym), 2.8, C, 0.95, 10);
  glow(ctx, V.X(-1.0), V.Y(f(-1.0)), 3.2, C, 0.9, 12);
  glow(ctx, V.X(1.0), V.Y(f(1.0)), 3.2, C, 0.9, 12);
  label(ctx, "极大", V.X(-1.0) - 4, V.Y(f(-1.0)) - 14, { c: C, a: 0.7, size: 8.5, align: "center" });
  label(ctx, "极小", V.X(1.0) + 2, V.Y(f(1.0)) + 16, { c: C, a: 0.7, size: 8.5, align: "center" });
  label(ctx, "f′ 的符号", w - 18, 16, { c: C, a: 0.45, size: 8.5, align: "right" });
};

SCENES.concavity = function (ctx, w, h, t, p, C) {
  const V = view(w, h, -2.2, 2.2, -2.1, 2.1, 20);
  const f = x => 0.4 * x * x * x - 0.8 * x;
  const d2 = x => 2.4 * x;
  for (let i = 0; i < 24; i++) {
    const x = lerp(-2.0, 0, i / 24 + 1 / 48);
    area(ctx, V, f, x, Math.min(0, x + 0.09), "#f472b6", { a: 0.05 });
  }
  for (let i = 0; i < 24; i++) {
    const x = lerp(0, 2.0, i / 24);
    area(ctx, V, f, x, Math.min(2.1, x + 0.09), "#5eead4", { a: 0.05 });
  }
  plot(ctx, V, f, -2.05, 2.05, C, { a: 0.95, w: 1.8 });
  line(ctx, V.X(-2.1), V.Y(0), V.X(2.1), V.Y(0), C, { a: 0.15, w: 1 });
  glow(ctx, V.X(0), V.Y(0), 3.6, "#fbbf24", 1, 14);
  label(ctx, "拐点", V.X(0), V.Y(0) - 14, { c: "#fbbf24", a: 0.9, size: 8.5, align: "center" });
  label(ctx, "f″ > 0", V.X(1.35), V.Y(0.6), { c: "#5eead4", a: 0.7, size: 8.5 });
  label(ctx, "f″ < 0", V.X(-1.85), V.Y(0.6), { c: "#f472b6", a: 0.7, size: 8.5 });
  const s = 0.5 + 0.5 * Math.sin(0.55 * t);
  const xm = lerp(-1.85, 1.85, s);
  glow(ctx, V.X(xm), V.Y(f(xm)), 2.6, C, 0.85, 8);
};

SCENES.asymptote = function (ctx, w, h, t, p, C) {
  const V = view(w, h, 0.2, 6.2, -0.2, 2.3, 20);
  const f = x => 1 / x + 0.85;
  line(ctx, V.X(0.2), V.Y(0.85), V.X(6.1), V.Y(0.85), C, { a: 0.4, w: 1.1, dash: [5, 5] });
  label(ctx, "y = 0.85", V.X(5.6), V.Y(0.85) - 10, { c: C, a: 0.6, size: 8.5 });
  line(ctx, V.X(0.2), V.Y(2.2), V.X(0.2), V.Y(0), C, { a: 0.3, w: 1.1, dash: [5, 5] });
  label(ctx, "x = 0", V.X(0.2) + 6, V.Y(2.0), { c: C, a: 0.55, size: 8.5 });
  plot(ctx, V, f, 0.32, 6.1, C, { a: 0.95, w: 1.8 });
  const s = 0.5 + 0.5 * Math.sin(0.4 * t);
  const xm = lerp(0.45, 5.9, s);
  glow(ctx, V.X(xm), V.Y(f(xm)), 3, C, 1, 11);
  line(ctx, V.X(xm), V.Y(f(xm)), V.X(xm), V.Y(0.85), C, { a: 0.18, w: 1, dash: [2, 4] });
  label(ctx, "无限接近", w - 18, 16, { c: C, a: 0.5, size: 8.5, align: "right" });
};

SCENES.curvature = function (ctx, w, h, t, p, C) {
  const N = 240;
  const S = u => [w / 2 + u * w * 0.34, h * 0.54 + h * 0.17 * Math.sin(u * 3.1) + h * 0.05 * u * u];
  const pts = [];
  for (let i = 0; i <= N; i++) pts.push(S(-1 + 2 * i / N));
  path(ctx, pts, C, { a: 0.85, w: 1.7 });
  const u = 0.82 * Math.sin(0.42 * t);
  const P = [S(u - 0.03), S(u), S(u + 0.03)];
  const [A, B, D] = P;
  const d = 2 * (A[0] * (B[1] - D[1]) + B[0] * (D[1] - A[1]) + D[0] * (A[1] - B[1]));
  if (Math.abs(d) > 1e-4) {
    const a2 = A[0] * A[0] + A[1] * A[1], b2 = B[0] * B[0] + B[1] * B[1], c2 = D[0] * D[0] + D[1] * D[1];
    const ux = (a2 * (B[1] - D[1]) + b2 * (D[1] - A[1]) + c2 * (A[1] - B[1])) / d;
    const uy = (a2 * (D[0] - B[0]) + b2 * (A[0] - D[0]) + c2 * (B[0] - A[0])) / d;
    const R = Math.hypot(B[0] - ux, B[1] - uy);
    if (R < w * 1.4) {
      ring(ctx, ux, uy, R, C, { a: 0.32, w: 1.1, dash: [3, 5] });
      line(ctx, ux, uy, B[0], B[1], C, { a: 0.6, w: 1.1 });
      glow(ctx, ux, uy, 2, C, 0.7, 6);
      label(ctx, "R = 1/κ", (ux + B[0]) / 2 + 4, (uy + B[1]) / 2 - 8, { c: C, a: 0.7, size: 8 });
    }
  }
  glow(ctx, B[0], B[1], 3.2, C, 1, 12);
  label(ctx, "弯曲越急，贴合圆越小", w - 18, 16, { c: C, a: 0.5, size: 8.5, align: "right" });
};

function factorial(n) {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}
