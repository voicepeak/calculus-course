SCENES.riemann = function (ctx, w, h, t, p, C) {
  const V = view(w, h, 0, 3.3, 0, 1.6, 22);
  const f = x => 0.5 + 0.42 * Math.sin(1.55 * x) + 0.12 * x;
  const ns = [4, 8, 16, 32, 64, 128];
  const n = ns[Math.floor(mod(t, ns.length * 1.5) / 1.5)];
  const x0 = 0.12, x1 = 3.1;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const xa = lerp(x0, x1, i / n), xb = lerp(x0, x1, (i + 1) / n);
    const mid = (xa + xb) / 2;
    const ht = f(mid);
    sum += ht * (xb - xa);
    const px = V.X(xa), pw = V.X(xb) - V.X(xa), py = V.Y(ht), base = V.Y(0);
    ctx.fillStyle = hexA(C, 0.08);
    ctx.fillRect(px + 0.5, py, pw - 1, base - py);
    line(ctx, px, py, px + pw, py, C, { a: 0.3, w: 1 });
  }
  line(ctx, V.X(x0), V.Y(0), V.X(x1), V.Y(0), C, { a: 0.25, w: 1 });
  plot(ctx, V, f, x0, x1, C, { a: 0.95, w: 1.8 });
  let exact = 0;
  for (let i = 0; i < 400; i++) {
    const xa = lerp(x0, x1, i / 400), xb = lerp(x0, x1, (i + 1) / 400);
    exact += f((xa + xb) / 2) * (xb - xa);
  }
  label(ctx, "n = " + n, 18, 16, { c: C, a: 0.8, size: 9.5 });
  label(ctx, "黎曼和 " + sum.toFixed(3), 18, 32, { c: C, a: 0.5, size: 8.5 });
  label(ctx, "积分 " + exact.toFixed(3), 18, 46, { c: C, a: 0.5, size: 8.5 });
};

SCENES.areaFunction = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "family";
  const f = x => 0.55 + 0.35 * Math.sin(1.25 * x);
  const F = x => 0.55 * x - 0.28 * Math.cos(1.25 * x);
  const F0 = F(0.3);
  const xt = lerp(0.3, 3.5, 0.5 - 0.5 * Math.cos(0.55 * t));
  const V1 = view(w, h * 0.55, 0.3, 3.6, -0.05, 1.35, 16);
  area(ctx, V1, f, 0.3, xt, C, { a: 0.15 });
  plot(ctx, V1, f, 0.3, 3.55, C, { a: 0.9, w: 1.6 });
  line(ctx, V1.X(xt), V1.Y(0), V1.X(xt), V1.Y(f(xt)), C, { a: 0.3, w: 1, dash: [3, 4] });
  glow(ctx, V1.X(xt), V1.Y(f(xt)), 2.8, C, 0.95, 9);
  label(ctx, "f(x)", 14, 14, { c: C, a: 0.6, size: 9 });
  line(ctx, 16, h * 0.57, w - 16, h * 0.57, C, { a: 0.12, w: 1 });
  ctx.save();
  ctx.translate(0, h * 0.55);
  const V2 = view(w, h * 0.45, 0.3, 3.6, -0.5, 2.5, 16);
  line(ctx, V2.X(0.3), V2.Y(0), V2.X(3.55), V2.Y(0), C, { a: 0.18, w: 1 });
  if (mode === "family") {
    [-0.5, -0.25, 0.25, 0.5].forEach(cc => {
      plot(ctx, V2, x => F(x) - F0 + cc, 0.3, 3.55, C, { a: 0.16, w: 1.1 });
    });
    plot(ctx, V2, x => F(x) - F0, 0.3, 3.55, C, { a: 0.95, w: 1.7 });
    label(ctx, "F(x) + C", 14, 14, { c: C, a: 0.65, size: 9 });
  } else {
    plot(ctx, V2, x => F(x) - F0, 0.3, 3.55, C, { a: 0.95, w: 1.7 });
    glow(ctx, V2.X(xt), V2.Y(F(xt) - F0), 3, C, 1, 10);
    line(ctx, V2.X(xt), V2.Y(0), V2.X(xt), V2.Y(F(xt) - F0), C, { a: 0.3, w: 1, dash: [3, 4] });
    label(ctx, "Φ(x) = ∫f dt", 14, 14, { c: C, a: 0.65, size: 9 });
  }
  ctx.restore();
};

SCENES.substitution = function (ctx, w, h, t, p, C) {
  const V = view(w, h, -0.05, 2.1, -0.1, 4.3, 24);
  const g = x => x * x;
  line(ctx, V.X(0), V.Y(0), V.X(2.05), V.Y(0), C, { a: 0.25, w: 1 });
  line(ctx, V.X(0), V.Y(0), V.X(0), V.Y(4.25), C, { a: 0.25, w: 1 });
  label(ctx, "x", V.X(2.02), V.Y(0) + 12, { c: C, a: 0.55, size: 9 });
  label(ctx, "u = g(x)", V.X(0) + 6, V.Y(4.15), { c: C, a: 0.55, size: 9 });
  plot(ctx, V, g, 0, 2.0, C, { a: 0.9, w: 1.7 });
  const a = 0.42 + 0.1 * Math.sin(0.5 * t);
  const b = 1.35 + 0.28 * Math.sin(0.35 * t + 1.4);
  const ua = g(a), ub = g(b);
  area(ctx, V, g, a, b, C, { a: 0.14 });
  line(ctx, V.X(a), V.Y(0), V.X(a), V.Y(ua), C, { a: 0.5, w: 1, dash: [3, 4] });
  line(ctx, V.X(b), V.Y(0), V.X(b), V.Y(ub), C, { a: 0.5, w: 1, dash: [3, 4] });
  line(ctx, V.X(a), V.Y(ua), V.X(0), V.Y(ua), C, { a: 0.4, w: 1, dash: [3, 4] });
  line(ctx, V.X(b), V.Y(ub), V.X(0), V.Y(ub), C, { a: 0.4, w: 1, dash: [3, 4] });
  line(ctx, V.X(0) - 6, V.Y(ua), V.X(0) - 6, V.Y(ub), C, { a: 0.8, w: 1.4 });
  line(ctx, V.X(a), V.Y(0) + 6, V.X(b), V.Y(0) + 6, C, { a: 0.8, w: 1.4 });
  label(ctx, "dx", V.X((a + b) / 2), V.Y(0) + 18, { c: C, a: 0.75, size: 8.5, align: "center" });
  label(ctx, "du", V.X(0) - 12, V.Y((ua + ub) / 2), { c: C, a: 0.75, size: 8.5, align: "right" });
  glow(ctx, V.X(a), V.Y(ua), 2.6, C, 0.9, 8);
  glow(ctx, V.X(b), V.Y(ub), 2.6, C, 0.9, 8);
  label(ctx, "区间被 g(x) 拉伸", w - 16, 16, { c: C, a: 0.5, size: 8.5, align: "right" });
};

SCENES.byparts = function (ctx, w, h, t, p, C) {
  const rw = w * 0.5, rh = h * 0.55;
  const x0 = (w - rw) / 2, y0 = (h - rh) / 2 + 8;
  const flip = 0.5 + 0.5 * Math.sin(t * 0.9);
  line(ctx, x0, y0, x0 + rw, y0, C, { a: 0.2, w: 1 });
  line(ctx, x0, y0 + rh, x0 + rw, y0 + rh, C, { a: 0.2, w: 1 });
  line(ctx, x0, y0, x0, y0 + rh, C, { a: 0.2, w: 1 });
  line(ctx, x0 + rw, y0, x0 + rw, y0 + rh, C, { a: 0.2, w: 1 });
  ctx.fillStyle = hexA(C, 0.05 + 0.10 * (1 - flip));
  ctx.fillRect(x0 + rw * 0.62, y0, rw * 0.38, rh);
  ctx.fillStyle = hexA(C, 0.05 + 0.10 * flip);
  ctx.fillRect(x0, y0 + rh * 0.7, rw, rh * 0.3);
  line(ctx, x0 + rw * 0.62, y0, x0 + rw * 0.62, y0 + rh, C, { a: 0.45, w: 1, dash: [4, 4] });
  line(ctx, x0, y0 + rh * 0.7, x0 + rw, y0 + rh * 0.7, C, { a: 0.45, w: 1, dash: [4, 4] });
  label(ctx, "u", x0 + rw / 2, y0 - 10, { c: C, a: 0.7, size: 10, align: "center" });
  label(ctx, "v", x0 - 12, y0 + rh / 2, { c: C, a: 0.7, size: 10, align: "right" });
  label(ctx, "u · v", x0 + rw * 0.3, y0 + rh * 0.35, { c: C, a: 0.55, size: 9 });
  label(ctx, "∫u dv", x0 + rw * 0.7, y0 + rh * 0.32, { c: C, a: 0.85, size: 9, align: "center" });
  label(ctx, "∫v du", x0 + rw * 0.5, y0 + rh * 0.86, { c: C, a: 0.85, size: 9, align: "center" });
  label(ctx, "∫u dv = uv − ∫v du", w / 2, h - 12, { c: C, a: 0.7, size: 9, align: "center" });
};

SCENES.improper = function (ctx, w, h, t, p, C) {
  const phase = Math.floor(mod(t, 9) / 4.5);
  const pw = phase ? 1.12 : 2;
  const V = view(w, h, 0.15, 9, 0, 2.3, 20);
  const f = x => Math.pow(x, -pw);
  const N = lerp(0.55, 8.8, smooth(seq(t, 6)));
  area(ctx, V, f, 0.2, N, C, { a: 0.16 });
  area(ctx, V, f, N, 8.95, C, { a: 0.05 });
  plot(ctx, V, f, 0.2, 8.95, C, { a: 0.95, w: 1.7 });
  line(ctx, V.X(N), V.Y(0), V.X(N), V.Y(f(N)), C, { a: 0.5, w: 1, dash: [3, 4] });
  glow(ctx, V.X(N), V.Y(f(N)), 2.8, C, 0.95, 9);
  label(ctx, "∫₁∞ x^(−p) dx", 18, 16, { c: C, a: 0.7, size: 9 });
  label(ctx, "p = " + pw.toFixed(2), 18, 32, { c: C, a: 0.8, size: 9 });
  label(ctx, pw > 1.5 ? "尾巴迅速变薄 → 收敛" : "尾巴面积不收敛", w - 18, 16, { c: C, a: 0.6, size: 8.5, align: "right" });
};

SCENES.solidRev = function (ctx, w, h, t, p, C) {
  const X = x => w * 0.14 + (x / 2) * w * 0.72;
  const axY = h * 0.72;
  const S = h * 0.36;
  const f = x => 0.55 + 0.3 * Math.sin(1.6 * x + 0.4);
  line(ctx, X(0) - 8, axY, X(2) + 14, axY, C, { a: 0.4, w: 1.1 });
  label(ctx, "x", X(2) + 18, axY, { c: C, a: 0.5, size: 9 });
  const xm = lerp(0.06, 1.94, 0.5 + 0.5 * Math.sin(0.55 * t));
  for (let i = 0; i <= 30; i++) {
    const xx = i / 30 * 2;
    const yy = f(xx) * S;
    const act = Math.abs(xx - xm) < 0.08;
    ctx.save();
    ctx.strokeStyle = hexA(C, act ? 0.85 : 0.22);
    ctx.lineWidth = act ? 1.5 : 1;
    ctx.beginPath();
    ctx.ellipse(X(xx), axY, yy * 0.24, yy, 0, 0, TAU);
    ctx.stroke();
    if (act) { ctx.fillStyle = hexA(C, 0.10); ctx.fill(); }
    ctx.restore();
  }
  const prof = [];
  for (let i = 0; i <= 80; i++) {
    const xx = i / 80 * 2;
    prof.push([X(xx), axY - f(xx) * S]);
  }
  path(ctx, prof, C, { a: 0.85, w: 1.6 });
  label(ctx, "V = ∫π f(x)² dx", 16, 16, { c: C, a: 0.65, size: 9 });
};

SCENES.riemann2D = function (ctx, w, h, t, p, C) {
  const P = iso(w, h, 1.05, { dy: h * 0.14 });
  const f = (x, y) => 0.35 + 0.28 * Math.sin(x * 2.2) * Math.cos(y * 1.9) + 0.25 * Math.exp(-(x * x + y * y));
  const N = 6;
  const xs = [], ys = [];
  for (let i = 0; i <= N; i++) { xs.push(-1.15 + 2.3 * i / N); ys.push(-1.15 + 2.3 * i / N); }
  for (let i = 0; i <= N; i++) {
    const a = P(-1.15, ys[i], 0), b = P(1.15, ys[i], 0);
    line(ctx, a[0], a[1], b[0], b[1], C, { a: 0.2, w: 1 });
    const c = P(xs[i], -1.15, 0), d = P(xs[i], 1.15, 0);
    line(ctx, c[0], c[1], d[0], d[1], C, { a: 0.2, w: 1 });
  }
  for (let i = 1; i < N; i++) {
    for (let j = 1; j < N; j++) {
      const x = xs[i], y = ys[j];
      const z = f(x, y) * (1 + 0.05 * Math.sin(t * 1.2 + i + j));
      const pb = P(x, y, 0), pt = P(x, y, z);
      line(ctx, pb[0], pb[1], pt[0], pt[1], C, { a: 0.55, w: 1.2 });
      const r = 0.09;
      const q1 = P(x - r, y - r, z), q2 = P(x + r, y - r, z), q3 = P(x + r, y + r, z), q4 = P(x - r, y + r, z);
      path(ctx, [[q1[0], q1[1]], [q2[0], q2[1]], [q3[0], q3[1]], [q4[0], q4[1]]], C, { a: 0.7, w: 1, fill: 0.2, close: true });
      glow(ctx, pb[0], pb[1], 1.3, C, 0.5, 2);
    }
  }
  label(ctx, "∬ f dA  →  ∭ f dV", 16, 16, { c: C, a: 0.6, size: 9 });
};

SCENES.coordChange = function (ctx, w, h, t, p, C) {
  const cy = h * 0.54;
  const S1 = Math.min(w * 0.19, h * 0.30);
  const c1x = w * 0.24;
  for (let i = -3; i <= 3; i++) {
    line(ctx, c1x + i * S1 * 0.55, cy - S1 * 1.5, c1x + i * S1 * 0.55, cy + S1 * 1.5, C, { a: 0.09, w: 1 });
    line(ctx, c1x - S1 * 1.5, cy + i * S1 * 0.55, c1x + S1 * 1.5, cy + i * S1 * 0.55, C, { a: 0.09, w: 1 });
  }
  line(ctx, c1x - S1 * 1.6, cy, c1x + S1 * 1.6, cy, C, { a: 0.3, w: 1 });
  line(ctx, c1x, cy - S1 * 1.6, c1x, cy + S1 * 1.6, C, { a: 0.3, w: 1 });
  label(ctx, "直角坐标", c1x, h - 12, { c: C, a: 0.5, size: 8.5, align: "center" });
  const r = 0.55 + 0.33 * Math.sin(0.45 * t);
  const th = 0.45 * t;
  const px = c1x + r * Math.cos(th) * S1, py = cy - r * Math.sin(th) * S1;
  line(ctx, c1x, cy, px, py, C, { a: 0.5, w: 1.1 });
  glow(ctx, px, py, 3, C, 1, 10);
  label(ctx, "P", px + 6, py - 8, { c: C, a: 0.75, size: 8.5 });
  const c2x = w * 0.76;
  for (let i = 1; i <= 3; i++) ring(ctx, c2x, cy, S1 * 0.28 * i, C, { a: 0.14 + 0.05 * i, w: 1 });
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * TAU;
    line(ctx, c2x, cy, c2x + Math.cos(a) * S1 * 0.86, cy - Math.sin(a) * S1 * 0.86, C, { a: 0.08, w: 1 });
  }
  const px2 = c2x + r * Math.cos(th) * S1, py2 = cy - r * Math.sin(th) * S1;
  line(ctx, c2x, cy, px2, py2, C, { a: 0.7, w: 1.4 });
  ring(ctx, c2x, cy, 15, C, { a: 0.25, w: 1 });
  glow(ctx, px2, py2, 3, C, 1, 10);
  label(ctx, "r", (c2x + px2) / 2 + 6, (cy + py2) / 2 - 6, { c: C, a: 0.7, size: 8.5 });
  label(ctx, "θ", c2x + 24, cy - 10, { c: C, a: 0.7, size: 8.5 });
  label(ctx, "极坐标", c2x, h - 12, { c: C, a: 0.5, size: 8.5, align: "center" });
  line(ctx, w * 0.5, 22, w * 0.5, h - 22, C, { a: 0.08, w: 1 });
};

SCENES.lineIntegral = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "mass";
  const P = u => [lerp(w * 0.1, w * 0.9, u), h * 0.52 - h * 0.22 * Math.sin(u * 2.7) + h * 0.08 * Math.cos(u * 4.5)];
  const pts = [];
  for (let i = 0; i <= 160; i++) pts.push(P(i / 160));
  if (mode === "work") {
    for (let ix = 0; ix < 9; ix++) {
      for (let iy = 0; iy < 4; iy++) {
        const x = w * 0.08 + (w * 0.86) * ix / 8;
        const y = h * 0.24 + h * 0.28 * iy / 3;
        arrow(ctx, x, y, x + 10, y - 4, C, { a: 0.10, w: 1, head: 4 });
      }
    }
  }
  path(ctx, pts, C, { a: mode === "mass" ? 0.5 : 0.35, w: mode === "mass" ? 2.4 : 1.4 });
  const prog = seq(t, 6);
  const u = smooth(prog);
  const q = P(u);
  const q2 = P(Math.min(1, u + 0.012));
  const tx = q2[0] - q[0], ty = q2[1] - q[1];
  const tl = Math.hypot(tx, ty) || 1;
  if (mode === "mass") {
    for (let i = 0; i <= 30; i++) {
      const uu = i / 30;
      const qq = P(uu);
      const dens = 0.35 + 0.65 * Math.abs(Math.sin(uu * 9.5));
      const rad = 1.3 + dens * 2.4;
      const lit = uu <= u;
      glow(ctx, qq[0], qq[1], rad, C, lit ? 0.85 : 0.2, lit ? 6 : 0);
    }
    glow(ctx, q[0], q[1], 3.6, C, 1, 14);
    label(ctx, "∫ ρ ds", 16, 16, { c: C, a: 0.65, size: 9 });
    const barW = w * 0.5;
    line(ctx, 16, h - 14, 16 + barW, h - 14, C, { a: 0.18, w: 1 });
    line(ctx, 16, h - 14, 16 + barW * u, h - 14, C, { a: 0.9, w: 2 });
  } else {
    const fx = 0.75, fy = -0.3;
    const fl = Math.hypot(fx, fy);
    const dot = (fx * tx + fy * ty) / (fl * tl);
    arrow(ctx, q[0], q[1], q[0] + fx * 34, q[1] + fy * 34, "#38bdf8", { a: 0.75, w: 1.4, head: 6 });
    arrow(ctx, q[0], q[1], q[0] + tx / tl * 30, q[1] + ty / tl * 30, dot >= 0 ? "#4ade80" : "#fb7185", { a: 0.9, w: 1.6, head: 6 });
    glow(ctx, q[0], q[1], 3.4, C, 1, 12);
    label(ctx, "F · dr", 16, 16, { c: C, a: 0.65, size: 9 });
    label(ctx, dot >= 0 ? "同向：正功" : "反向：负功", w - 16, 16, { c: dot >= 0 ? "#4ade80" : "#fb7185", a: 0.8, size: 8.5, align: "right" });
  }
};

SCENES.surfaceIntegral = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "mass";
  const P = iso(w, h, 0.95, { dy: h * 0.1 });
  const surf = (u, v) => 0.22 * Math.sin(2.2 * u) * Math.cos(2 * v) + 0.18;
  const N = 10;
  for (let i = 0; i <= N; i++) {
    const lineU = [], lineV = [];
    for (let j = 0; j <= N; j++) {
      const u = -1 + 2 * i / N, v = -1 + 2 * j / N;
      lineU.push(P(u, v, surf(u, v)));
      lineV.push(P(v, u, surf(v, u)));
    }
    path(ctx, lineU, C, { a: 0.22, w: 1 });
    path(ctx, lineV, C, { a: 0.22, w: 1 });
  }
  if (mode === "mass") {
    for (let i = 1; i < N; i++) {
      for (let j = 1; j < N; j++) {
        const u = -1 + 2 * i / N, v = -1 + 2 * j / N;
        const q = P(u, v, surf(u, v));
        glow(ctx, q[0], q[1], 1.5, C, 0.25 + 0.4 * (0.5 + 0.5 * Math.sin(t * 1.3 + i * 0.7 + j * 0.5)), 4);
      }
    }
    label(ctx, "∬ ρ dS", 16, 16, { c: C, a: 0.65, size: 9 });
  } else {
    for (let i = 1; i < N; i += 2) {
      for (let j = 1; j < N; j += 2) {
        const u = -1 + 2 * i / N, v = -1 + 2 * j / N;
        const zb = surf(u, v);
        const prog = mod(t * 0.45 + (i * 3 + j) * 0.11, 1);
        const z = lerp(-0.35, 0.85, prog);
        const q = P(u, v, z);
        glow(ctx, q[0], q[1], 1.8, C, 0.5, 4);
        if (Math.abs(z - zb) < 0.1) glow(ctx, q[0], q[1], 3, C, 0.9, 8);
      }
    }
    label(ctx, "∬ F · dS", 16, 16, { c: C, a: 0.65, size: 9 });
    label(ctx, "粒子穿过曲面", w - 16, 16, { c: C, a: 0.45, size: 8.5, align: "right" });
  }
};

SCENES.theorem = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "green";
  if (mode === "green") {
    const cx = w / 2, cy = h / 2 + 4, rx = w * 0.3, ry = h * 0.3;
    const curve = a => [cx + Math.cos(a) * rx * (1 + 0.08 * Math.sin(3 * a)), cy + Math.sin(a) * ry];
    const loop = [];
    for (let i = 0; i <= 120; i++) loop.push(curve(i / 120 * TAU));
    path(ctx, loop, C, { fill: 0.05, close: true, stroke: false });
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        const x = cx + (i - 2) * rx * 0.34, y = cy + (j - 1) * ry * 0.42;
        const inside = Math.pow((x - cx) / rx, 2) + Math.pow((y - cy) / ry, 2) < 0.85;
        if (!inside) continue;
        const a = t * 2 + i + j;
        ring(ctx, x, y, 5, C, { a: 0.3, w: 1 });
        arrow(ctx, x + Math.cos(a) * 5, y + Math.sin(a) * 5, x + Math.cos(a + 1.4) * 5, y + Math.sin(a + 1.4) * 5, C, { a: 0.45, w: 1, head: 3 });
      }
    }
    path(ctx, loop, C, { a: 0.85, w: 1.7, close: true });
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * TAU + t * 0.8;
      const q = curve(a), q2 = curve(a + 0.08);
      line(ctx, q[0], q[1], q2[0], q2[1], C, { a: 0.9, w: 2.2 });
    }
    label(ctx, "∮ F·dr = ∬ curl F dA", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "gauss") {
    const cx = w / 2, cy = h / 2 + 4, rx = w * 0.25, ry = h * 0.3;
    ctx.save();
    ctx.strokeStyle = hexA(C, 0.55);
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, TAU);
    ctx.stroke();
    ctx.restore();
    const rnd = rng(7);
    for (let i = 0; i < 4; i++) {
      const sx = cx + (rnd() - 0.5) * rx * 0.9;
      const sy = cy + (rnd() - 0.5) * ry * 0.9;
      glow(ctx, sx, sy, 2.6, C, 0.9, 9);
      for (let k = 0; k < 10; k++) {
        const a = k / 10 * TAU + i;
        const rr = 10 + mod(t * 30 + k * 14 + i * 20, Math.max(rx, ry) * 0.9);
        const qx = sx + Math.cos(a) * rr, qy = sy + Math.sin(a) * rr * 0.8;
        if (Math.pow((qx - cx) / rx, 2) + Math.pow((qy - cy) / ry, 2) > 1.15) continue;
        glow(ctx, qx, qy, 1.4, C, 0.5 * (1 - rr / (Math.max(rx, ry) * 0.9)), 0);
      }
    }
    label(ctx, "∯ F·dS = ∭ div F dV", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  const cx = w / 2, cy = h * 0.6;
  const rx = w * 0.28, ry = h * 0.23;
  const patch = [];
  for (let i = 0; i <= 90; i++) {
    const a = i / 90 * TAU;
    patch.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry - Math.sin(a * 2 + 0.6) * 6]);
  }
  path(ctx, patch, C, { fill: 0.07, close: true });
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * TAU + t * 1.6;
    const x = cx + Math.cos(a) * rx * 0.5, y = cy + Math.sin(a) * ry * 0.45;
    const b = t * 2.4 + i;
    ring(ctx, x, y, 4.5, C, { a: 0.35, w: 1 });
    arrow(ctx, x + Math.cos(b) * 4.5, y + Math.sin(b) * 4.5, x + Math.cos(b + 1.5) * 4.5, y + Math.sin(b + 1.5) * 4.5, C, { a: 0.6, w: 1, head: 3 });
  }
  path(ctx, patch, C, { a: 0.85, w: 1.7, close: true });
  for (let i = 0; i < 7; i++) {
    const a = i / 7 * TAU + t * 0.7;
    const q = [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry - Math.sin(a * 2 + 0.6) * 6];
    glow(ctx, q[0], q[1], 2.6, C, 0.9, 8);
  }
  label(ctx, "∬ curl F·dS = ∮ F·dr", 16, 16, { c: C, a: 0.65, size: 9 });
};

SCENES.vectorField = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "div";
  const cx = w / 2, cy = h / 2 + 4;
  const m = Math.min(w, h);
  const gridArrows = (fn, o = {}) => {
    const gx = o.gx || 8, gy = o.gy || 5;
    for (let i = 1; i < gx; i++) {
      for (let j = 1; j < gy; j++) {
        const x = w * i / gx, y = h * j / gy;
        const v = fn(x - cx, y - cy);
        const mag = Math.hypot(v[0], v[1]);
        if (mag < 0.001) continue;
        const len = (o.len || 11) * clamp(mag, 0.3, 1.6);
        arrow(ctx, x - v[0] / mag * len * 0.5, y - v[1] / mag * len * 0.5, x + v[0] / mag * len * 0.5, y + v[1] / mag * len * 0.5, C, { a: o.a || 0.3, w: 1, head: 4 });
      }
    }
  };
  if (mode === "div" || mode === "nosource") {
    if (mode === "div") {
      gridArrows((x, y) => [x, y], { a: 0.35 });
      for (let i = 0; i < 26; i++) {
        const ph = mod(t * 0.35 + i / 26, 1);
        const a = i * 2.399;
        const r = 6 + ph * m * 0.55;
        glow(ctx, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.8, 1.8, C, 0.7 * (1 - ph), 3);
      }
      glow(ctx, cx, cy, 4, C, 0.9, 14);
      label(ctx, "div F > 0 · 源", 16, 16, { c: C, a: 0.65, size: 9 });
    } else {
      const y0 = h * 0.35, y1 = h * 0.72;
      line(ctx, w * 0.1, y0, w * 0.9, y0, C, { a: 0.22, w: 1 });
      line(ctx, w * 0.1, y1, w * 0.9, y1, C, { a: 0.22, w: 1 });
      for (let i = 0; i < 10; i++) {
        const x = w * 0.12 + (w * 0.76) * i / 9;
        const y = (y0 + y1) / 2;
        arrow(ctx, x, y, x + 12, y, C, { a: 0.4, w: 1.1, head: 4 });
        const ph = mod(t * 0.5 + i / 10, 1);
        glow(ctx, w * 0.12 + w * 0.76 * ph, y - 8, 1.6, C, 0.5, 2);
        glow(ctx, w * 0.12 + w * 0.76 * ph, y + 8, 1.6, C, 0.5, 2);
      }
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = hexA(C, 0.5);
      ctx.strokeRect(cx - 42, cy - 42, 84, 84);
      ctx.restore();
      label(ctx, "流入 = 流出 · div F = 0", 16, 16, { c: C, a: 0.6, size: 9 });
    }
    return;
  }
  if (mode === "curl" || mode === "circ") {
    gridArrows((x, y) => [-y, x], { a: 0.32 });
    if (mode === "curl") {
      const a = t * 2.2;
      for (let i = 0; i < 4; i++) {
        const b = a + i / 4 * TAU;
        line(ctx, cx, cy, cx + Math.cos(b) * 16, cy + Math.sin(b) * 16, C, { a: 0.9, w: 2 });
        glow(ctx, cx + Math.cos(b) * 16, cy + Math.sin(b) * 16, 2, C, 0.7, 6);
      }
      ring(ctx, cx, cy, 17, C, { a: 0.4, w: 1 });
      label(ctx, "curl F ≠ 0", 16, 16, { c: C, a: 0.65, size: 9 });
    } else {
      const R = m * 0.3;
      ring(ctx, cx, cy, R, C, { a: 0.35, w: 1.2, dash: [6, 6] });
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * TAU;
        const x1 = cx + Math.cos(a) * R, y1 = cy + Math.sin(a) * R;
        const x2 = cx + Math.cos(a + 0.18) * R, y2 = cy + Math.sin(a + 0.18) * R;
        line(ctx, x1, y1, x2, y2, C, { a: 0.75, w: 2 });
      }
      const a = mod(t * 0.9, TAU);
      glow(ctx, cx + Math.cos(a) * R, cy + Math.sin(a) * R, 3.2, C, 1, 10);
      label(ctx, "环量 ∮ F·dr", 16, 16, { c: C, a: 0.65, size: 9 });
    }
    return;
  }
  if (mode === "grad" || mode === "pot") {
    for (let i = 1; i <= 4; i++) ring(ctx, cx, cy, 14 + i * 16, C, { a: 0.16, w: 1, dash: [4, 5] });
    const arrowAt = (x, y) => {
      const dx = cx - x, dy = cy - y;
      const l = Math.hypot(dx, dy) || 1;
      arrow(ctx, x, y, x + dx / l * 14, y + dy / l * 14, C, { a: 0.6, w: 1.2, head: 5 });
    };
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * TAU;
      const rr = 32 + (i % 3) * 22;
      arrowAt(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
    }
    if (mode === "grad") {
      label(ctx, "∇f 垂直于等高线", 16, 16, { c: C, a: 0.6, size: 9 });
      const a = t * 0.7;
      const rr = 38 + 14 * Math.sin(t * 0.4);
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
      glow(ctx, x, y, 3, C, 1, 10);
      arrow(ctx, x, y, x + (cx - x) / rr * 26, y + (cy - y) / rr * 26, C, { a: 0.95, w: 1.8, head: 7 });
    } else {
      const a = t * 0.5;
      const rr = 46;
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
      glow(ctx, x, y, 3, C, 1, 10);
      label(ctx, "沿等势线走，V 不变", 16, 16, { c: C, a: 0.6, size: 9 });
    }
    return;
  }
  if (mode === "flux") {
    for (let j = 0; j < 4; j++) {
      const y = h * 0.3 + j * h * 0.14;
      for (let i = 0; i < 6; i++) arrow(ctx, w * 0.08 + i * w * 0.15, y, w * 0.08 + i * w * 0.15 + 14, y, C, { a: 0.22, w: 1, head: 4 });
    }
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = hexA(C, 0.6);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, h * 0.22);
    ctx.lineTo(cx, h * 0.8);
    ctx.stroke();
    ctx.restore();
    for (let j = 0; j < 5; j++) {
      const y = h * 0.3 + j * h * 0.11;
      const ph = mod(t * 0.5 + j * 0.19, 1);
      const x = lerp(w * 0.06, w * 0.94, ph);
      glow(ctx, x, y, 2.2, C, Math.abs(x - cx) < 8 ? 1 : 0.45, Math.abs(x - cx) < 8 ? 9 : 2);
    }
    label(ctx, "通量 = 穿过面的总量", 16, 16, { c: C, a: 0.62, size: 9 });
    return;
  }
  if (mode === "norot") {
    gridArrows((x, y) => [1, 0], { a: 0.35 });
    const x = cx + Math.sin(t * 0.7) * w * 0.2;
    const a = 0;
    for (let i = 0; i < 4; i++) {
      const b = a + i / 4 * TAU;
      line(ctx, x, cy, x + Math.cos(b) * 14, cy + Math.sin(b) * 14, C, { a: 0.85, w: 1.8 });
    }
    ring(ctx, x, cy, 15, C, { a: 0.45, w: 1 });
    label(ctx, "桨轮不自转 · curl F = 0", 16, 16, { c: C, a: 0.6, size: 9 });
    return;
  }
  const curve = [];
  const R = m * 0.3;
  for (let i = 0; i <= 90; i++) {
    const a = i / 90 * TAU;
    curve.push([cx + Math.cos(a) * R * 1.15, cy + Math.sin(a) * R * 0.75]);
  }
  for (let i = 1; i <= 4; i++) ring(ctx, cx - 20, cy - 10, i * 17, C, { a: 0.12, w: 1, dash: [4, 5] });
  path(ctx, curve, C, { a: 0.35, w: 1.2, dash: [5, 5], close: true });
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * TAU;
    const x = cx + Math.cos(a) * R * 1.15, y = cy + Math.sin(a) * R * 0.75;
    const dx = x - (cx - 20), dy = y - (cy - 10);
    const l = Math.hypot(dx, dy) || 1;
    const dir = i < 7 ? 1 : -1;
    arrow(ctx, x, y, x + dx / l * 12 * dir, y + dy / l * 12 * dir, dir > 0 ? "#4ade80" : "#fb7185", { a: 0.6, w: 1.2, head: 4 });
  }
  glow(ctx, cx, cy, 3, C, 0.8, 10);
  label(ctx, "闭合路径总功 = 0", 16, 16, { c: C, a: 0.62, size: 9 });
};

SCENES.surfaceSlice = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "surface";
  const P = iso(w, h, 1.05, { dy: h * 0.08 });
  const f = (x, y) => 0.5 * Math.exp(-0.8 * (x * x + y * y)) + 0.12 * x + 0.42;
  const D = 1.2;
  const N = 8;
  const zs = 1 + 0.04 * Math.sin(t * 0.9);
  for (let i = 0; i <= N; i++) {
    const lu = [], lv = [];
    for (let j = 0; j <= N; j++) {
      const u = -D + 2 * D * i / N, v = -D + 2 * D * j / N;
      lu.push(P(u, v, f(u, v) * zs));
      lv.push(P(v, u, f(v, u) * zs));
    }
    path(ctx, lu, C, { a: 0.2, w: 1 });
    path(ctx, lv, C, { a: 0.2, w: 1 });
  }
  if (mode === "partial") {
    const alt = Math.floor(mod(t, 9) / 4.5);
    const fixed = 0.35 * Math.sin(t * 0.4);
    const cur = [];
    for (let i = 0; i <= 40; i++) {
      const s = -D + 2 * D * i / 40;
      cur.push(alt === 0 ? P(s, fixed, f(s, fixed)) : P(fixed, s, f(fixed, s)));
    }
    path(ctx, cur, C, { a: 0.95, w: 1.8 });
    const x0 = alt === 0 ? 0.2 : fixed, y0 = alt === 0 ? fixed : 0.2;
    const q = P(x0, y0, f(x0, y0));
    glow(ctx, q[0], q[1], 3, C, 1, 10);
    label(ctx, alt === 0 ? "固定 y，只让 x 动 → ∂f/∂x" : "固定 x，只让 y 动 → ∂f/∂y", 16, 16, { c: C, a: 0.65, size: 8.5 });
    return;
  }
  if (mode === "total") {
    const x0 = -0.25, y0 = 0.3, hh = 0.002;
    const zx = (f(x0 + hh, y0) - f(x0 - hh, y0)) / (2 * hh);
    const zy = (f(x0, y0 + hh) - f(x0, y0 - hh)) / (2 * hh);
    const z0 = f(x0, y0);
    const sz = 0.55;
    const corner = (dx, dy) => P(x0 + dx, y0 + dy, z0 + zx * dx + zy * dy);
    const quad = [corner(-sz, -sz), corner(sz, -sz), corner(sz, sz), corner(-sz, sz)];
    path(ctx, quad, C, { a: 0.55, w: 1.2, fill: 0.14, close: true });
    const q0 = P(x0, y0, z0);
    glow(ctx, q0[0], q0[1], 3, C, 1, 10);
    label(ctx, "dz = f_x dx + f_y dy", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "dir") {
    const a = 0.6 * Math.sin(0.3 * t);
    const x0 = -0.15, y0 = -0.1;
    const dir = [Math.cos(a), Math.sin(a)];
    const len = 0.9;
    const p0 = P(x0, y0, 0);
    const p1 = P(x0 + dir[0] * len, y0 + dir[1] * len, 0);
    arrow(ctx, p0[0], p0[1], p1[0], p1[1], C, { a: 0.95, w: 1.6, head: 6 });
    label(ctx, "方向 l", p1[0] + 4, p1[1], { c: C, a: 0.7, size: 8 });
    const curve = [];
    for (let i = 0; i <= 30; i++) {
      const s = i / 30 * len;
      curve.push(P(x0 + dir[0] * s, y0 + dir[1] * s, f(x0 + dir[0] * s, y0 + dir[1] * s)));
    }
    path(ctx, curve, C, { a: 0.8, w: 1.5 });
    const q = P(x0, y0, f(x0, y0));
    glow(ctx, q[0], q[1], 3, C, 1, 10);
    label(ctx, "∂f/∂l", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  label(ctx, "z = f(x, y)", 16, 16, { c: C, a: 0.6, size: 9 });
};

SCENES.jacobian = function (ctx, w, h, t, p, C) {
  const cx = w / 2, cy = h / 2 + 4;
  const S = Math.min(w, h) * 0.13;
  const a = 0.32 * t, sh = 0.5 * Math.sin(t * 0.27), sc = 1 + 0.33 * Math.sin(t * 0.21 + 1);
  const M = (x, y) => {
    let sx = x * sc, sy = y * sc;
    let tx = sx + sh * sy, ty = sy;
    return [cx + Math.cos(a) * tx - Math.sin(a) * ty, cy + Math.sin(a) * tx + Math.cos(a) * ty];
  };
  for (let i = -3; i <= 3; i++) {
    const a1 = M(i / 1.5, -2.2), a2 = M(i / 1.5, 2.2);
    const b1 = M(-2.2, i / 1.5), b2 = M(2.2, i / 1.5);
    line(ctx, a1[0], a1[1], a2[0], a2[1], C, { a: 0.16, w: 1 });
    line(ctx, b1[0], b1[1], b2[0], b2[1], C, { a: 0.16, w: 1 });
  }
  const c0 = M(0, 0), c1 = M(1, 0), c2 = M(1, 1), c3 = M(0, 1);
  path(ctx, [c0, c1, c2, c3], C, { fill: 0.16, close: true, w: 1.4, a: 0.7 });
  glow(ctx, c0[0], c0[1], 2.4, C, 0.8, 6);
  label(ctx, "det J ≈ " + (sc * sc).toFixed(2), 16, 16, { c: C, a: 0.7, size: 9 });
  label(ctx, "面积被拉伸", 16, 32, { c: C, a: 0.45, size: 8.5 });
};

SCENES.chainRule = function (ctx, w, h, t, p, C) {
  const y = h * 0.5;
  const nx = [w * 0.16, w * 0.5, w * 0.84];
  const nodes = [["x", "输入"], ["u = g(x)", "中间"], ["z = f(u)", "输出"]];
  for (let i = 0; i < 2; i++) {
    const x1 = nx[i] + 20, x2 = nx[i + 1] - 20;
    arrow(ctx, x1, y, x2, y, C, { a: 0.4, w: 1.3, head: 6 });
    const ph = mod(t * 0.6 + i * 0.5, 1);
    glow(ctx, lerp(x1, x2, ph), y, 2.6, C, 1, 8);
    label(ctx, i === 0 ? "du/dx" : "dz/du", (x1 + x2) / 2, y - 14, { c: C, a: 0.7, size: 8.5, align: "center" });
  }
  for (let i = 0; i < 3; i++) {
    ring(ctx, nx[i], y, 17, C, { a: 0.6, w: 1.3 });
    glow(ctx, nx[i], y, 4, C, 0.25, 8);
    label(ctx, nodes[i][0], nx[i], y - 2, { c: C, a: 0.95, size: 9, align: "center" });
    label(ctx, nodes[i][1], nx[i], y + 26, { c: C, a: 0.35, size: 7.5, align: "center" });
  }
  label(ctx, "dz/dx = (dz/du)(du/dx)", w / 2, h - 16, { c: C, a: 0.65, size: 9, align: "center" });
};

SCENES.implicitThm = function (ctx, w, h, t, p, C) {
  const S = Math.min(w, h) / 3.2;
  const X = x => w / 2 + x * S, Y = y => h / 2 + 6 - y * S;
  ring(ctx, w / 2, h / 2 + 6, S, C, { a: 0.45, w: 1.4 });
  const xs = 0.88 * Math.sin(0.4 * t);
  const ys = Math.sqrt(Math.max(0, 1 - xs * xs));
  const bx = X(xs), by = Y(ys);
  const branch = [];
  for (let i = 0; i <= 60; i++) {
    const x = lerp(-0.97, 0.97, i / 60);
    branch.push([X(x), Y(Math.sqrt(1 - x * x))]);
  }
  path(ctx, branch, C, { a: 0.95, w: 1.8 });
  glow(ctx, bx, by, 3.2, C, 1, 12);
  const warn = Math.abs(xs) > 0.75;
  ring(ctx, bx, by, 7 + 2 * Math.sin(t * 3), warn ? "#fb7185" : C, { a: warn ? 0.7 : 0.25, w: 1 });
  label(ctx, "F(x, y) = 0", 16, 16, { c: C, a: 0.6, size: 9 });
  label(ctx, warn ? "接近 F_y = 0 · 分支法失效" : "局部可解出 y = f(x)", 16, 32, { c: warn ? "#fb7185" : C, a: 0.65, size: 8.5 });
};

SCENES.lagrange = function (ctx, w, h, t, p, C) {
  const S = Math.min(w, h) / 4.6;
  const X = x => w / 2 + x * S, Y = y => h / 2 + 6 - y * S;
  const r = 1.2;
  const cxE = 1.85;
  const kMin = (r + cxE) * (r + cxE);
  const prog = seq(t, 9);
  const k = lerp(30, kMin, smooth(Math.min(1, prog / 0.72)));
  const ell = (kk, alpha, lw) => {
    ctx.save();
    ctx.strokeStyle = hexA(C, alpha);
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.ellipse(X(cxE), Y(0), Math.sqrt(kk) * S, Math.sqrt(kk / 0.7) * S, 0, 0, TAU);
    ctx.stroke();
    ctx.restore();
  };
  [kMin + 9, kMin + 5, kMin + 2].forEach(kk => ell(kk, 0.08, 1));
  ell(k, 0.85, 1.5);
  ring(ctx, X(0), Y(0), r * S, C, { a: 0.8, w: 1.7 });
  label(ctx, "g(x,y)=c", X(0) + 8, Y(-r) + 14, { c: C, a: 0.5, size: 7.5 });
  const at = smooth(clamp((prog - 0.55) / 0.3, 0, 1));
  if (at > 0) {
    const px = -r, py = 0;
    glow(ctx, X(px), Y(py), 3 + 2 * at, C, at, 14);
    arrow(ctx, X(px), Y(py), X(px) - 34 * at, Y(py), "#fb7185", { a: 0.8 * at, w: 1.5, head: 6 });
    arrow(ctx, X(px), Y(py), X(px) - 24 * at, Y(py), C, { a: 0.9 * at, w: 1.5, head: 6 });
    label(ctx, "∇f ∥ ∇g", X(px) - 12, Y(py) + 18, { c: C, a: 0.75 * at, size: 8, align: "right" });
    label(ctx, "相切点", X(px) + 6, Y(py) - 12, { c: C, a: 0.55 * at, size: 7.5 });
  }
  label(ctx, "等值线碰到约束的瞬间", 16, 16, { c: C, a: 0.55, size: 8.5 });
};

SCENES.seriesSum = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "conv";
  let f, ymax, limit, name;
  if (mode === "div") { f = k => 1 / Math.sqrt(k); ymax = 17; limit = null; name = "Σ 1/√k"; }
  else if (mode === "cond") { f = k => (k % 2 ? 1 : -1) / k; ymax = 5.2; limit = Math.log(2); name = "Σ (−1)ᵏ⁺¹/k"; }
  else if (mode === "alt") { f = k => (k % 2 ? 1 : -1) / k; ymax = 1.35; limit = Math.log(2); name = "Σ (−1)ᵏ⁺¹/k"; }
  else { f = k => 1 / (k * k); ymax = 2.1; limit = Math.PI * Math.PI / 6; name = "Σ 1/k²"; }
  const V = view(w, h, 0, 62, 0, ymax, 22);
  line(ctx, V.X(0), V.Y(0), V.X(60), V.Y(0), C, { a: 0.2, w: 1 });
  const prog = mod(t, 7.5) / 5.4;
  const nMax = clamp(1 + Math.floor(59 * smooth(Math.min(1, prog))), 1, 60);
  let s = 0;
  const pts = [];
  const harmonic = mode === "cond" ? [] : null;
  let sh = 0;
  for (let k = 1; k <= nMax; k++) {
    s += f(k);
    pts.push([V.X(k), V.Y(clamp(s, 0, ymax))]);
    if (harmonic) {
      sh += 1 / k;
      harmonic.push([V.X(k), V.Y(clamp(sh, 0, ymax))]);
    }
  }
  if (harmonic) {
    for (let i = 0; i < harmonic.length; i++) {
      glow(ctx, harmonic[i][0], harmonic[i][1], 1.5, "#fb7185", 0.35, 0);
    }
    label(ctx, "加绝对值后发散", V.X(48), V.Y(ymax * 0.65), { c: "#fb7185", a: 0.7, size: 8.5 });
  }
  for (let i = 0; i < pts.length; i++) glow(ctx, pts[i][0], pts[i][1], i === pts.length - 1 ? 3.2 : 1.5, C, i === pts.length - 1 ? 1 : 0.45, i === pts.length - 1 ? 11 : 0);
  if (limit != null) {
    const yl = V.Y(limit);
    line(ctx, V.X(0), yl, V.X(60), yl, C, { a: 0.4, w: 1, dash: [4, 5] });
    label(ctx, "极限 " + limit.toFixed(3), V.X(60), yl - 9, { c: C, a: 0.6, size: 8.5, align: "right" });
  }
  label(ctx, name, 18, 16, { c: C, a: 0.7, size: 9 });
  label(ctx, mode === "div" ? "部分和一路向上" : mode === "cond" ? "条件收敛" : "部分和收敛", w - 16, 16, { c: C, a: 0.5, size: 8.5, align: "right" });
};

SCENES.powerSeries = function (ctx, w, h, t, p, C) {
  const V = view(w, h, -1.5, 1.5, -0.5, 5, 20);
  const S = (x, n) => {
    let s = 0, p = 1;
    for (let k = 0; k <= n; k++) { s += p; p *= x; }
    return s;
  };
  const ns = [1, 2, 3, 5, 8, 13, 21, 34];
  const n = ns[Math.floor(mod(t, 9.6) / 1.2)];
  plot(ctx, V, x => 1 / (1 - x), -1.48, 1.48, C, { a: 0.25, w: 1.1, dash: [4, 5] });
  plot(ctx, V, x => S(x, n), -1.48, -1.02, C, { a: 0.45, w: 1.2 });
  plot(ctx, V, x => S(x, n), -0.98, 0.98, C, { a: 0.95, w: 1.7 });
  plot(ctx, V, x => S(x, n), 1.02, 1.48, C, { a: 0.45, w: 1.2 });
  ctx.fillStyle = hexA(C, 0.04);
  ctx.fillRect(V.X(-1), V.Y(5), V.X(1) - V.X(-1), V.Y(-0.5) - V.Y(5));
  line(ctx, V.X(-1), V.Y(-0.5), V.X(-1), V.Y(5), C, { a: 0.5, w: 1, dash: [4, 4] });
  line(ctx, V.X(1), V.Y(-0.5), V.X(1), V.Y(5), C, { a: 0.5, w: 1, dash: [4, 4] });
  label(ctx, "R = 1", V.X(1) + 6, V.Y(4.5), { c: C, a: 0.6, size: 8.5 });
  label(ctx, "n = " + n, 18, 16, { c: C, a: 0.75, size: 9 });
  label(ctx, "1/(1−x) = Σxᵏ", 18, 32, { c: C, a: 0.5, size: 8.5 });
};

SCENES.fourier = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "sum";
  if (mode === "sum") {
    const V = view(w, h, 0, 4 * Math.PI, -1.5, 1.5, 18);
    line(ctx, V.X(0), V.Y(0), V.X(4 * Math.PI), V.Y(0), C, { a: 0.12, w: 1 });
    const ks = [1, 3, 5, 9, 15, 25, 41];
    const kMax = ks[Math.floor(mod(t, ks.length * 1.6) / 1.6)];
    const target = x => Math.sign(Math.sin(x)) * 0.85;
    for (let seg = 0; seg < 4; seg++) {
      plot(ctx, V, target, seg * Math.PI + 0.01, (seg + 1) * Math.PI - 0.01, C, { a: 0.28, w: 1.1, dash: [4, 4] });
    }
    for (const k of [1, 3, 5]) {
      if (k > kMax) continue;
      plot(ctx, V, x => 4 / Math.PI * Math.sin(k * x) / k * 0.85, 0, 4 * Math.PI, C, { a: 0.13, w: 1 });
    }
    const sum = x => {
      let s = 0;
      for (let k = 1; k <= kMax; k += 2) s += Math.sin(k * x) / k;
      return 4 / Math.PI * s * 0.85;
    };
    plot(ctx, V, sum, 0, 4 * Math.PI, C, { a: 0.95, w: 1.7 });
    label(ctx, "N = " + kMax, 16, 16, { c: C, a: 0.8, size: 9 });
    label(ctx, "方波 = 正弦波之和", w - 16, 16, { c: C, a: 0.5, size: 8.5, align: "right" });
    return;
  }
  if (mode === "spec") {
    const base = h * 0.8;
    const nShow = 1 + Math.floor(mod(t, 8) / 1);
    for (let i = 0; i < 8; i++) {
      const k = i * 2 + 1;
      const x = w * 0.12 + i * w * 0.1;
      const ht = (1 / k) * (h * 0.62) * 1.2;
      const on = i < nShow;
      ctx.fillStyle = hexA(C, on ? 0.5 : 0.08);
      ctx.fillRect(x - w * 0.016, base - ht, w * 0.032, ht);
      label(ctx, String(k), x, base + 12, { c: C, a: on ? 0.7 : 0.25, size: 8, align: "center" });
      glow(ctx, x, base - ht, 1.8, C, on ? 0.7 : 0.1, 4);
    }
    line(ctx, w * 0.06, base, w * 0.94, base, C, { a: 0.25, w: 1 });
    label(ctx, "傅里叶系数 4/(πk)", w / 2, 16, { c: C, a: 0.65, size: 9, align: "center" });
    return;
  }
  const V = view(w, h, 0, TAU, -1.4, 1.4, 18);
  line(ctx, V.X(0), V.Y(0), V.X(TAU), V.Y(0), C, { a: 0.15, w: 1 });
  plot(ctx, V, x => Math.sin(x), 0, TAU, C, { a: 0.3, w: 1.1 });
  plot(ctx, V, x => Math.sin(2 * x), 0, TAU, C, { a: 0.3, w: 1.1 });
  const prod = x => Math.sin(x) * Math.sin(2 * x);
  plot(ctx, V, prod, 0, TAU, C, { a: 0.95, w: 1.7 });
  for (let i = 0; i < 48; i++) {
    const x0 = TAU * i / 48, x1 = TAU * (i + 1) / 48;
    const mid = prod((x0 + x1) / 2);
    const pos = mid > 0;
    ctx.fillStyle = hexA(pos ? C : "#fb7185", 0.12);
    ctx.fillRect(V.X(x0), Math.min(V.Y(0), V.Y(mid)), Math.max(1, V.X(x1) - V.X(x0)), Math.abs(V.Y(0) - V.Y(mid)));
  }
  label(ctx, "∫ sin x · sin 2x dx = 0", 16, 16, { c: C, a: 0.65, size: 9 });
  label(ctx, "正负面积抵消", w - 16, 16, { c: C, a: 0.45, size: 8.5, align: "right" });
};

SCENES.ode = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "family";
  if (mode === "second") {
    const V = view(w, h, 0, 7, -1.35, 1.35, 20);
    line(ctx, V.X(0), V.Y(0), V.X(6.9), V.Y(0), C, { a: 0.18, w: 1 });
    const bs = [0.12, 0.55, 1.3];
    const idx = Math.floor(mod(t, 7.5) / 2.5);
    bs.forEach((b, i) => {
      const on = i === idx;
      plot(ctx, V, x => Math.exp(-b * x) * Math.cos(2 * x), 0, 6.9, on ? C : C, { a: on ? 0.95 : 0.18, w: on ? 1.8 : 1.1 });
      plot(ctx, V, x => (i === 0 ? Math.exp(-b * x) : NaN), 0, 6.9, C, { a: on ? 0.3 : 0.08, w: 1, dash: [3, 4] });
    });
    label(ctx, "b = " + bs[idx], 16, 16, { c: C, a: 0.8, size: 9 });
    label(ctx, "特征根决定形态", w - 16, 16, { c: C, a: 0.45, size: 8.5, align: "right" });
    return;
  }
  let V, fn, sols, hi, labelText;
  if (mode === "sep") {
    V = view(w, h, -0.5, 5, 0, 4, 18);
    fn = (x, y) => 0.42 * y;
    sols = [0.4, 0.9, 1.6, 2.6];
    hi = 0.9;
    labelText = "dy/dx = f(x)g(y)";
  } else if (mode === "hom") {
    V = view(w, h, 0.35, 4.2, 0, 3.4, 18);
    fn = (x, y) => y / x;
    sols = [0.35, 0.7, 1.15, 1.7];
    hi = 0.7;
    labelText = "y = ux · 齐次";
  } else if (mode === "linear") {
    V = view(w, h, -0.5, 5, 0, 3.4, 18);
    fn = (x, y) => 1 - y;
    sols = [0.2, 0.9, 1.8, 2.7];
    hi = 1.8;
    labelText = "y′ + P(x)y = Q(x)";
  } else if (mode === "euler") {
    const V2 = view(w, h, 0.25, 4.5, 0, 3.8, 20);
    line(ctx, V2.X(0.25), V2.Y(0), V2.X(4.4), V2.Y(0), C, { a: 0.18, w: 1 });
    const pm = [0.5, 1, 1.6];
    const idx = Math.floor(mod(t, 7.5) / 2.5);
    plot(ctx, V2, x => Math.pow(x, pm[idx]), 0.3, 4.4, C, { a: 0.95, w: 1.8 });
    label(ctx, "y = x^" + pm[idx], 18, 16, { c: C, a: 0.8, size: 9 });
    label(ctx, "x = eᵗ 换元", w - 16, 16, { c: C, a: 0.5, size: 8.5, align: "right" });
    label(ctx, "x", V2.X(4.35), V2.Y(0) + 12, { c: C, a: 0.5, size: 8.5 });
    return;
  } else {
    V = view(w, h, -0.5, 7, 0, 3.6, 18);
    fn = (x, y) => 0.4 * y * (1 - y / 3);
    sols = [0.35, 0.8, 1.6, 3.1];
    hi = 0.8;
    labelText = "通解 + 初值 = 特解";
  }
  for (let i = 1; i < 9; i++) {
    for (let j = 1; j < 6; j++) {
      const x = lerp(V.x0, V.x1, i / 9), y = lerp(V.y0, V.y1, j / 6);
      const d = fn(x, y);
      const l = Math.hypot(1, d);
      const px1 = V.X(x - 0.07), py1 = V.Y(y - d * 0.07);
      const px2 = V.X(x + 0.07), py2 = V.Y(y + d * 0.07);
      arrow(ctx, px1, py1, px2, py2, C, { a: 0.13, w: 1, head: 3 });
    }
  }
  if (mode === "family") {
    sols.forEach(y0 => {
      plot(ctx, V, x => { const e = Math.exp(-0.4 * x); return 3 / (1 + (3 / y0 - 1) * e); }, V.x0 + 0.01, V.x1, C, { a: 0.2, w: 1.1 });
    });
    const prog = smooth(seq(t, 7));
    const xEnd = lerp(V.x0, V.x1, prog);
    plot(ctx, V, x => 3 / (1 + (3 / hi - 1) * Math.exp(-0.4 * x)), V.x0 + 0.01, xEnd, C, { a: 0.95, w: 1.9 });
    const yy = 3 / (1 + (3 / hi - 1) * Math.exp(-0.4 * xEnd));
    glow(ctx, V.X(xEnd), V.Y(yy), 3.2, C, 1, 11);
  } else if (mode === "hom") {
    sols.forEach(m => plot(ctx, V, x => m * x, V.x0, V.x1, C, { a: 0.18, w: 1.1 }));
    plot(ctx, V, x => hi * x, V.x0, V.x1, C, { a: 0.95, w: 1.9 });
    label(ctx, "解沿射线自相似", w / 2, 16, { c: C, a: 0.45, size: 8.5, align: "center" });
  } else {
    for (const y0 of sols) {
      const f2 = mode === "sep" ? (x => y0 * Math.exp(0.42 * x)) : (x => 1 + (y0 - 1) * Math.exp(-x));
      plot(ctx, V, f2, V.x0 + 0.02, V.x1, C, { a: 0.18, w: 1.1 });
    }
    const fh = mode === "sep" ? (x => hi * Math.exp(0.42 * x)) : (x => 1 + (hi - 1) * Math.exp(-x));
    plot(ctx, V, fh, V.x0 + 0.02, V.x1, C, { a: 0.95, w: 1.9 });
    glow(ctx, V.X(V.x0 + 0.05), V.Y(fh(V.x0 + 0.05)), 3, C, 1, 10);
  }
  label(ctx, labelText, 16, 16, { c: C, a: 0.65, size: 9 });
  line(ctx, V.X(0), V.Y(0), V.X(0), V.Y(V.y1), C, { a: 0.08, w: 1 });
};
