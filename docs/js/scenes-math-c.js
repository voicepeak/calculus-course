SCENES.vectors = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "dot";
  const P = iso(w, h, 1.0, { dy: h * 0.12 });
  const O = P(0, 0, 0);
  const V3 = (x, y, z) => P(x, y, z);
  const draw = (v, col, name) => {
    const q = V3(v[0], v[1], v[2]);
    arrow(ctx, O[0], O[1], q[0], q[1], col, { a: 0.95, w: 1.8, head: 7 });
    label(ctx, name, q[0] + 6, q[1] - 6, { c: col, a: 0.9, size: 9 });
    return q;
  };
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  if (mode === "vec") {
    const a = [1.15, 0.35, 0.6];
    draw(a, C, "a");
    line(ctx, O[0], O[1], V3(a[0], 0, 0)[0], V3(a[0], 0, 0)[1], C, { a: 0.18, w: 1, dash: [3, 3] });
    ctx.save();
    for (let i = 1; i <= 6; i++) {
      const q = V3(a[0] * i / 6, a[1] * i / 6, a[2] * i / 6);
      glow(ctx, q[0], q[1], 1.2, C, 0.4, 0);
    }
    ctx.restore();
    label(ctx, "|a| = √(x²+y²+z²)", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  if (mode === "dot") {
    const a = [1.35, 0, 0];
    const th = 0.55 + 0.4 * Math.sin(0.4 * t);
    const b = [1.05 * Math.cos(th), 1.05 * Math.sin(th), 0];
    draw(a, C, "a");
    draw(b, "#fb923c", "b");
    const k = dot3(b, a) / dot3(a, a);
    const proj = [a[0] * k, 0, 0];
    const pp = V3(proj[0], 0, 0);
    line(ctx, V3(b[0], b[1], 0)[0], V3(b[0], b[1], 0)[1], pp[0], pp[1], C, { a: 0.35, w: 1, dash: [3, 3] });
    line(ctx, O[0], O[1], pp[0], pp[1], C, { a: 0.75, w: 2.4 });
    glow(ctx, pp[0], pp[1], 2.6, C, 0.9, 8);
    label(ctx, "b 在 a 上的投影", (O[0] + pp[0]) / 2, O[1] + 16, { c: C, a: 0.55, size: 8 });
    label(ctx, "a·b = |a||b|cosθ", 16, 16, { c: C, a: 0.65, size: 8.5 });
    return;
  }
  if (mode === "cross") {
    const a = [1.25, 0, 0];
    const b = [0.75, 0.9, 0];
    const n = [0, 0, a[0] * b[1]];
    const pa = V3(a[0], a[1], 0), pb = V3(b[0], b[1], 0), pab = V3(a[0] + b[0], a[1] + b[1], 0);
    path(ctx, [O, pa, pab, pb], C, { fill: 0.08, close: true, a: 0.4, w: 1, dash: [4, 4] });
    draw(a, C, "a");
    draw(b, "#fb923c", "b");
    const pn = V3(n[0], n[1], n[2]);
    arrow(ctx, O[0], O[1], pn[0], pn[1], "#e879f9", { a: 0.95, w: 1.8, head: 7 });
    label(ctx, "a × b", pn[0] + 6, pn[1] - 6, { c: "#e879f9", a: 0.9, size: 9 });
    label(ctx, "面积 → 法向量", 16, 16, { c: C, a: 0.55, size: 8.5 });
    return;
  }
  const a = [1.15, 0, 0], b = [0.4, 0.9, 0], c = [0.25, 0.2, 0.95];
  const tri = dot3([a[0] * b[1], -a[1] * b[0], 0], c);
  const pc = V3(c[0], c[1], c[2]);
  const corners = [O, V3(a[0], 0, 0), V3(a[0] + b[0], b[1], 0), V3(b[0], b[1], 0)];
  path(ctx, corners, C, { fill: 0.06, close: true, a: 0.4, w: 1 });
  draw(a, C, "a");
  draw(b, "#fb923c", "b");
  draw(c, "#e879f9", "c");
  const up = V3(0, 0, c[2]);
  line(ctx, pc[0], pc[1], V3(0, 0, c[2])[0], V3(0, 0, c[2])[1], C, { a: 0.15, w: 1, dash: [3, 3] });
  label(ctx, "体积 = |(a×b)·c|", 16, 16, { c: C, a: 0.6, size: 8.5 });
};

SCENES.geom3D = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "plane";
  const P = iso(w, h, 1.0, { dy: h * 0.1 });
  if (mode === "plane") {
    const quad = [P(-1.2, -0.8, 0.5), P(1.2, -0.8, 0.5), P(1.2, 0.8, 0.5), P(-1.2, 0.8, 0.5)];
    path(ctx, quad, C, { fill: 0.10, close: true, a: 0.6, w: 1.3 });
    const c0 = P(0, 0, 0.5);
    arrow(ctx, c0[0], c0[1], c0[0] + 34, c0[1] - 34, "#fb923c", { a: 0.95, w: 1.8, head: 7 });
    label(ctx, "n", c0[0] + 40, c0[1] - 42, { c: "#fb923c", a: 0.9, size: 9 });
    glow(ctx, c0[0], c0[1], 2.6, C, 0.9, 8);
    label(ctx, "一点 + 法向量", 16, 16, { c: C, a: 0.55, size: 8.5 });
    return;
  }
  if (mode === "line") {
    const a = P(-1.1, -0.5, -0.4), b = P(1.1, 0.8, 0.7);
    line(ctx, a[0], a[1], b[0], b[1], C, { a: 0.9, w: 1.7 });
    arrow(ctx, a[0], a[1], b[0], b[1], C, { a: 0.9, w: 1.7, head: 7 });
    glow(ctx, a[0], a[1], 3, C, 0.9, 9);
    label(ctx, "方向向量", (a[0] + b[0]) / 2 + 6, (a[1] + b[1]) / 2 - 10, { c: C, a: 0.6, size: 8.5 });
    label(ctx, "一点 + 方向", 16, 16, { c: C, a: 0.55, size: 8.5 });
    return;
  }
  if (mode === "cyl") {
    const prof = z => 0.32 + 0.22 * Math.sin(z * 2.2 + 0.4);
    for (let k = 0; k <= 6; k++) {
      const z = k / 6 * 1.3;
      const pts = [];
      for (let i = 0; i <= 40; i++) {
        const a = i / 40 * TAU;
        pts.push(P(prof(z) * Math.cos(a), prof(z) * Math.sin(a), z));
      }
      path(ctx, pts, C, { a: 0.18, w: 1 });
    }
    for (let k = 0; k < 8; k++) {
      const a = k / 8 * TAU;
      const pts = [];
      for (let i = 0; i <= 30; i++) {
        const z = i / 30 * 1.3;
        pts.push(P(prof(z) * Math.cos(a), prof(z) * Math.sin(a), z));
      }
      path(ctx, pts, C, { a: 0.12, w: 1 });
    }
    const a = t * 0.6;
    const gen = [];
    for (let i = 0; i <= 30; i++) {
      const z = i / 30 * 1.3;
      gen.push(P(prof(z) * Math.cos(a), prof(z) * Math.sin(a), z));
    }
    path(ctx, gen, C, { a: 0.95, w: 1.9 });
    const tip = P(prof(1.3) * Math.cos(a), prof(1.3) * Math.sin(a), 1.3);
    glow(ctx, tip[0], tip[1], 2.8, C, 0.9, 8);
    label(ctx, "母线绕轴旋转", 16, 16, { c: C, a: 0.55, size: 8.5 });
    return;
  }
  if (mode === "quadric") {
    const shapes = ["椭球面", "抛物面", "马鞍面"];
    const idx = Math.floor(mod(t, 10.5) / 3.5);
    const zf = (x, y) => {
      if (idx === 0) return 0.4 + 0.5 * Math.sqrt(Math.max(0, 1 - (x * x + y * y) / 1.3));
      if (idx === 1) return 0.4 + 0.55 * Math.max(0, 1 - (x * x + y * y) / 1.4);
      return 0.65 + 0.4 * (x * x - y * y);
    };
    const N = 10;
    for (let i = 0; i <= N; i++) {
      const lu = [], lv = [];
      for (let j = 0; j <= N; j++) {
        const u = -1.1 + 2.2 * i / N, v = -1.1 + 2.2 * j / N;
        lu.push(P(u, v, zf(u, v)));
        lv.push(P(v, u, zf(v, u)));
      }
      path(ctx, lu, C, { a: 0.45, w: 1 });
      path(ctx, lv, C, { a: 0.45, w: 1 });
    }
    label(ctx, shapes[idx], 16, 16, { c: C, a: 0.7, size: 9 });
    return;
  }
  const turns = 4;
  const pts = [];
  for (let i = 0; i <= 220; i++) {
    const a = i / 220 * TAU * turns;
    pts.push(P(Math.cos(a) * 0.62, Math.sin(a) * 0.62, i / 220 * 1.8));
  }
  line(ctx, P(0, 0, -0.1)[0], P(0, 0, -0.1)[1], P(0, 0, 1.9)[0], P(0, 0, 1.9)[1], C, { a: 0.2, w: 1, dash: [4, 4] });
  path(ctx, pts, C, { a: 0.85, w: 1.5 });
  const u = mod(t * 0.18, 1);
  const a = u * TAU * turns;
  const q = P(Math.cos(a) * 0.62, Math.sin(a) * 0.62, u * 1.8);
  const u2 = Math.min(0.995, u + 0.012);
  const q2 = P(Math.cos(u2 * TAU * turns) * 0.62, Math.sin(u2 * TAU * turns) * 0.62, u2 * 1.8);
  glow(ctx, q[0], q[1], 3.2, C, 1, 10);
  const tl = Math.hypot(q2[0] - q[0], q2[1] - q[1]) || 1;
  arrow(ctx, q[0], q[1], q[0] + (q2[0] - q[0]) / tl * 26, q[1] + (q2[1] - q[1]) / tl * 26, "#fb923c", { a: 0.8, w: 1.3, head: 5 });
  label(ctx, "空间曲线（螺旋线）", 16, 16, { c: C, a: 0.6, size: 8.5 });
  label(ctx, "切向", q[0] + 12, q[1] - 14, { c: "#fb923c", a: 0.7, size: 7.5 });
};
