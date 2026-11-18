SCENES.kinematics = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "disp";
  const pos = u => [lerp(w * 0.10, w * 0.88, u), h * 0.74 - h * 0.5 * Math.sin(u * Math.PI * 0.92)];
  const u = smooth(seq(t, 7));
  const trail = [];
  for (let i = 0; i <= 140 * u; i++) trail.push(pos(i / 140));
  path(ctx, trail, C, { a: 0.75, w: 1.7 });
  const p0 = pos(0), p1 = pos(u);
  if (mode === "disp") {
    arrow(ctx, p0[0], p0[1], p1[0], p1[1], C, { a: 0.95, w: 1.9, head: 8 });
    line(ctx, p0[0], p0[1], p0[0], p1[1], C, { a: 0.12, w: 1, dash: [3, 4] });
    line(ctx, p0[0], p1[1], p1[0], p1[1], C, { a: 0.12, w: 1, dash: [3, 4] });
    glow(ctx, p1[0], p1[1], 3.6, C, 1, 12);
    label(ctx, "位移（只看首尾）", p1[0] + 8, p1[1] - 8, { c: C, a: 0.8, size: 8 });
    label(ctx, "路程", (p0[0] + p1[0]) / 2, h - 12, { c: C, a: 0.4, size: 8, align: "center" });
    return;
  }
  const hh = 0.002;
  const a = pos(Math.max(0, u - hh)), b = pos(Math.min(1, u + hh));
  const vx = (b[0] - a[0]) / (2 * hh), vy = (b[1] - a[1]) / (2 * hh);
  const vl = Math.hypot(vx, vy) || 1;
  arrow(ctx, p1[0], p1[1], p1[0] + vx / vl * 32, p1[1] + vy / vl * 32, "#fbbf24", { a: 0.9, w: 1.7, head: 6 });
  arrow(ctx, p1[0], p1[1], p1[0], p1[1] + 26, "#f472b6", { a: 0.9, w: 1.7, head: 6 });
  glow(ctx, p1[0], p1[1], 3.6, C, 1, 12);
  label(ctx, "v", p1[0] + vx / vl * 36, p1[1] + vy / vl * 36, { c: "#fbbf24", a: 0.85, size: 8.5 });
  label(ctx, "a", p1[0] + 7, p1[1] + 30, { c: "#f472b6", a: 0.85, size: 8.5 });
};

SCENES.newton = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "f";
  if (mode === "inertial") {
    const cw = w * 0.62, ch = h * 0.42;
    const x0 = (w - cw) / 2, y0 = h * 0.3;
    const acc = Math.sin(0.5 * t);
    ctx.save();
    ctx.strokeStyle = hexA(C, 0.55);
    ctx.lineWidth = 1.4;
    ctx.strokeRect(x0, y0, cw, ch);
    ctx.restore();
    for (let i = 0; i < 8; i++) {
      const off = mod(t * 40, 22);
      line(ctx, x0 + 10 + i * cw / 8 + off, h * 0.86, x0 + 10 + i * cw / 8 + off, h * 0.86 - 6, C, { a: 0.25, w: 1 });
    }
    line(ctx, x0 + cw * 0.5, y0, x0 + cw * 0.5, y0 + ch * 0.14, C, { a: 0.4, w: 1 });
    const len = ch * 0.42;
    const ang = Math.PI / 2 - acc * 0.38;
    const bx = x0 + cw * 0.5 + Math.cos(ang) * len;
    const by = y0 + ch * 0.14 + Math.sin(ang) * len;
    line(ctx, x0 + cw * 0.5, y0 + ch * 0.14, bx, by, C, { a: 0.75, w: 1.4 });
    glow(ctx, bx, by, 5.5, C, 0.9, 10);
    arrow(ctx, bx, by, bx - acc * 26, by, "#fb7185", { a: 0.8, w: 1.4, head: 6, dash: [4, 3] });
    label(ctx, "惯性力", bx - acc * 26, by + 14, { c: "#fb7185", a: 0.7, size: 8, align: "center" });
    label(ctx, "车厢加速 → 小球后仰", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  const gy = h * 0.72;
  line(ctx, w * 0.08, gy, w * 0.92, gy, C, { a: 0.25, w: 1.2 });
  const F = 0.55 + 0.45 * Math.sin(0.9 * t);
  const bw = w * 0.16, bh = h * 0.24;
  const bx = w * 0.46, by = gy - bh;
  ctx.save();
  ctx.fillStyle = hexA(C, 0.12);
  ctx.strokeStyle = hexA(C, 0.7);
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, 4);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  label(ctx, "m", bx + bw / 2, by + bh / 2, { c: C, a: 0.7, size: 9, align: "center" });
  const fx = bx + bw + 14 + F * 46;
  arrow(ctx, bx + bw, by + bh * 0.5, fx, by + bh * 0.5, "#fb923c", { a: 0.95, w: 2.2, head: 8 });
  label(ctx, "F", fx + 6, by + bh * 0.5 - 10, { c: "#fb923c", a: 0.9, size: 9 });
  arrow(ctx, bx + bw / 2, by - 16, bx + bw / 2 + F * 40, by - 16, C, { a: 0.9, w: 1.8, head: 7 });
  label(ctx, "a = F/m", bx + bw / 2 + F * 40 + 8, by - 16, { c: C, a: 0.8, size: 8.5 });
  line(ctx, w * 0.1, gy - 3, w * 0.9, gy - 3, C, { a: 0.15, w: 1, dash: [4, 4] });
};

SCENES.momentum = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "collision";
  const gy = h * 0.55;
  line(ctx, w * 0.06, gy, w * 0.94, gy, C, { a: 0.18, w: 1 });
  const R = 9;
  if (mode === "impulse") {
    const cycle = seq(t, 5.2);
    const pulse = clamp(Math.sin(cycle * Math.PI / 0.35), 0, 1) * (cycle < 0.35 ? 1 : 0);
    const v = clamp((cycle - 0.05) * 0.55, 0, 1) * 1.0;
    const bx = lerp(w * 0.16, w * 0.82, smooth(clamp((cycle - 0.12) / 0.85, 0, 1)));
    glow(ctx, bx, gy - R, 2.5, C, 0.35, 4);
    glow(ctx, bx, gy - R, R, C, 1, 12);
    arrow(ctx, bx + R + 2, gy - R, bx + R + 2 + pulse * 40, gy - R, "#fb923c", { a: 0.9, w: 2, head: 7 });
    if (pulse > 0.1) label(ctx, "F", bx + R + 2 + pulse * 40 + 5, gy - R - 10, { c: "#fb923c", a: 0.85, size: 8.5 });
    const pv = v * 1.2;
    label(ctx, "p = mv", 18, h * 0.2, { c: C, a: 0.6, size: 8.5 });
    line(ctx, 18, h * 0.26, 18 + w * 0.34, h * 0.26, C, { a: 0.15, w: 1 });
    line(ctx, 18, h * 0.26, 18 + w * 0.34 * pv, h * 0.26, C, { a: 0.9, w: 2 });
    label(ctx, "冲量 = 力 × 时间", w / 2, 16, { c: C, a: 0.5, size: 8.5, align: "center" });
    return;
  }
  const cyc = seq(t, 6);
  let x1, x2, v1, v2;
  const meet = w * 0.6;
  if (cyc < 0.5) {
    const u2 = smooth(cyc / 0.5);
    x1 = lerp(w * 0.16, meet - R - 4, u2);
    x2 = lerp(w * 0.46, meet + R + 4, u2);
    v1 = 1.2; v2 = 0.4;
  } else {
    const u2 = smooth((cyc - 0.5) / 0.5);
    x1 = lerp(meet - R - 4, w * 0.76, u2);
    x2 = lerp(meet + R + 4, w * 0.92, u2);
    v1 = 0.4; v2 = 1.2;
  }
  glow(ctx, x1, gy - R, R, C, 0.95, 12);
  glow(ctx, x2, gy - R, R, "#fb923c", 0.95, 12);
  label(ctx, "1", x1, gy - R, { c: "#04070c", a: 0.9, size: 8.5, align: "center" });
  label(ctx, "2", x2, gy - R, { c: "#04070c", a: 0.9, size: 8.5, align: "center" });
  arrow(ctx, x1, gy - R - 16, x1 + v1 * 22, gy - R - 16, C, { a: 0.7, w: 1.3, head: 5 });
  arrow(ctx, x2, gy - R - 16, x2 + v2 * 22, gy - R - 16, "#fb923c", { a: 0.7, w: 1.3, head: 5 });
  const base = h * 0.8;
  const bar = (x, v, col, name) => {
    const hh = 16;
    ctx.fillStyle = hexA(col, 0.25);
    ctx.fillRect(x - 22, base - hh, 44, hh);
    ctx.fillStyle = hexA(col, 0.85);
    const ww = Math.abs(v) * 18;
    ctx.fillRect(x - ww / 2, base - hh, ww, hh);
    label(ctx, name, x, base + 10, { c: col, a: 0.6, size: 7.5, align: "center" });
    label(ctx, "p", x, base - hh - 8, { c: col, a: 0.7, size: 7.5, align: "center" });
  };
  bar(w * 0.28, v1, C, "1");
  bar(w * 0.5, v2, "#fb923c", "2");
  bar(w * 0.74, 1.6, "#5eead4", "总");
  label(ctx, "碰撞前后总动量不变", w / 2, 16, { c: C, a: 0.5, size: 8.5, align: "center" });
};

SCENES.work = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "work";
  if (mode === "cons") {
    const A = [w * 0.12, h * 0.7], B = [w * 0.88, h * 0.28];
    for (let i = 0; i < 7; i++) {
      const x = w * 0.14 + i * w * 0.12;
      arrow(ctx, x, h * 0.2, x, h * 0.3, C, { a: 0.16, w: 1, head: 4 });
    }
    const straight = (u) => [lerp(A[0], B[0], u), lerp(A[1], B[1], u)];
    const curved = (u) => [lerp(A[0], B[0], u), lerp(A[1], B[1], u) - Math.sin(u * Math.PI) * h * 0.3];
    const s1 = [], s2 = [];
    for (let i = 0; i <= 80; i++) { s1.push(straight(i / 80)); s2.push(curved(i / 80)); }
    path(ctx, s1, C, { a: 0.35, w: 1.3, dash: [5, 4] });
    path(ctx, s2, C, { a: 0.75, w: 1.6 });
    const ph = seq(t, 6);
    const u = smooth(ph);
    const q1 = straight(u), q2 = curved(u);
    glow(ctx, q1[0], q1[1], 3, C, 0.85, 8);
    glow(ctx, q2[0], q2[1], 3, "#fb923c", 0.85, 8);
    glow(ctx, A[0], A[1], 3.2, "#5eead4", 0.9, 10);
    glow(ctx, B[0], B[1], 3.2, "#5eead4", 0.9, 10);
    label(ctx, "A", A[0] - 10, A[1] + 12, { c: "#5eead4", a: 0.8, size: 8.5 });
    label(ctx, "B", B[0] + 4, B[1] - 10, { c: "#5eead4", a: 0.8, size: 8.5 });
    label(ctx, "重力做功只认高度差", w / 2, 16, { c: C, a: 0.55, size: 8.5, align: "center" });
    return;
  }
  const gy = h * 0.68;
  line(ctx, w * 0.06, gy, w * 0.94, gy, C, { a: 0.2, w: 1 });
  const cycle = seq(t, 5.5);
  const u = smooth(cycle);
  const bw = w * 0.14, bh = h * 0.2;
  const bx = lerp(w * 0.12, w * 0.66, u);
  ctx.save();
  ctx.fillStyle = hexA(C, 0.12);
  ctx.strokeStyle = hexA(C, 0.7);
  ctx.beginPath();
  ctx.roundRect(bx, gy - bh, bw, bh, 4);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  const force = mode === "ke" ? 1 : 0.65 + 0.3 * Math.sin(t * 0.8);
  arrow(ctx, bx + bw, gy - bh * 0.5, bx + bw + 30 + force * 30, gy - bh * 0.5, "#fb923c", { a: 0.95, w: 2, head: 7 });
  line(ctx, w * 0.12, gy + 12, bx + bw / 2, gy + 12, C, { a: 0.5, w: 1.2 });
  label(ctx, "s", (w * 0.12 + bx + bw / 2) / 2, gy + 24, { c: C, a: 0.55, size: 8, align: "center" });
  if (mode === "work") {
    label(ctx, "W = F·s", 18, 16, { c: C, a: 0.7, size: 9 });
  } else {
    const v = u;
    label(ctx, "W = ΔKE = ½mv²", 18, 16, { c: C, a: 0.7, size: 9 });
    glow(ctx, bx + bw / 2 - 10, gy - bh * 0.5, 2, "#fbbf24", 0.8, 6);
    arrow(ctx, bx - 4, gy - bh * 0.5, bx - 4 - v * 26, gy - bh * 0.5, "#fbbf24", { a: 0.6 + 0.3 * v, w: 1.4, head: 5 });
    label(ctx, "v", bx - 4 - v * 26 - 12, gy - bh * 0.5, { c: "#fbbf24", a: 0.75, size: 8 });
  }
};

SCENES.pendulum = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "energy";
  const cx = w * 0.44, y0 = h * 0.2, L = h * 0.56;
  const th = 0.48 * Math.cos(1.35 * t);
  const bx = cx + Math.sin(th) * L, by = y0 + Math.cos(th) * L;
  line(ctx, cx - 30, y0, cx + 30, y0, C, { a: 0.5, w: 2 });
  line(ctx, cx, y0, bx, by, C, { a: 0.75, w: 1.3 });
  glow(ctx, bx, by, 8, C, 0.9, 14);
  const pe = (1 - Math.cos(th)) / (1 - Math.cos(0.48));
  const ke = 1 - pe;
  if (mode === "swing") {
    const arc = [];
    for (let i = 0; i <= 40; i++) {
      const a = lerp(-0.7, 0.7, i / 40);
      arc.push([cx + Math.sin(a) * L, y0 + Math.cos(a) * L]);
    }
    path(ctx, arc, C, { a: 0.18, w: 1, dash: [4, 4] });
    line(ctx, cx, y0, cx, y0 + L, C, { a: 0.12, w: 1, dash: [3, 4] });
    label(ctx, "θ", cx + 16, y0 + 26, { c: C, a: 0.7, size: 9 });
    ring(ctx, w * 0.85, h * 0.3, 18, C, { a: 0.35, w: 1.2 });
    line(ctx, w * 0.85, h * 0.3, w * 0.85, h * 0.3 - 18, C, { a: 0.8, w: 1.5 });
    const a2 = t * 1.35 / 1.35 * 1.35;
    line(ctx, w * 0.85, h * 0.3, w * 0.85 + Math.sin(a2) * 18, h * 0.3 - Math.cos(a2) * 18, C, { a: 0.7, w: 1.4 });
    label(ctx, "T", w * 0.85, h * 0.3 + 30, { c: C, a: 0.6, size: 8, align: "center" });
    label(ctx, "小角度 ≈ 简谐", 16, 16, { c: C, a: 0.55, size: 8.5 });
    return;
  }
  const bx2 = w * 0.82;
  const bw = 16;
  const hgt = h * 0.42;
  const base = h * 0.72;
  const peH = pe * hgt * 0.5, keH = ke * hgt * 0.5;
  if (mode === "energy") {
    ctx.fillStyle = hexA(C, 0.18);
    ctx.fillRect(bx2, base - peH, bw, peH);
    ctx.fillStyle = hexA("#38bdf8", 0.55);
    ctx.fillRect(bx2, base - peH - keH, bw, keH);
    line(ctx, bx2 - 6, base - peH - keH, bx2 + bw + 6, base - peH - keH, "#5eead4", { a: 0.7, w: 1, dash: [3, 3] });
    label(ctx, "KE", bx2 + bw + 10, base - peH - keH / 2, { c: "#38bdf8", a: 0.8, size: 8 });
    label(ctx, "PE", bx2 + bw + 10, base - peH / 2, { c: C, a: 0.8, size: 8 });
    label(ctx, "总量恒定", 16, 16, { c: C, a: 0.55, size: 8.5 });
  } else {
    ctx.fillStyle = hexA(C, 0.4);
    const hh = pe * hgt;
    ctx.fillRect(bx2, base - hh, bw, hh);
    line(ctx, bx2 - 6, base, bx2 + bw + 6, base, C, { a: 0.5, w: 1 });
    label(ctx, "PE ∝ 高度", 16, 16, { c: C, a: 0.55, size: 8.5 });
    label(ctx, Math.round(pe * 100) + "%", bx2 + bw / 2, base - hh - 10, { c: C, a: 0.7, size: 8, align: "center" });
  }
  line(ctx, cx, y0, cx, y0 + L, C, { a: 0.1, w: 1, dash: [3, 4] });
};

SCENES.centroid = function (ctx, w, h, t, p, C) {
  const cx = w / 2, cy = h / 2 + 4;
  const rnd = rng(83);
  const pts = [];
  for (let i = 0; i < 26; i++) {
    const a = rnd() * TAU, r = Math.sqrt(rnd()) * Math.min(w, h) * 0.3;
    pts.push([cx + Math.cos(a) * r * 1.3, cy + Math.sin(a) * r * 0.8, 0.5 + rnd()]);
  }
  let mx = 0, my = 0, mt = 0;
  pts.forEach(q => { mx += q[0] * q[2]; my += q[1] * q[2]; mt += q[2]; });
  mx /= mt; my /= mt;
  pts.forEach((q, i) => {
    glow(ctx, q[0] + Math.sin(t * 0.6 + i) * 1.5, q[1] + Math.cos(t * 0.5 + i) * 1.5, 1.6 + q[2] * 2.2, C, 0.35 + 0.25 * q[2], 4);
  });
  cross(ctx, mx, my, 9, C, 0.95);
  glow(ctx, mx, my, 4, C, 0.9, 14);
  ring(ctx, mx, my, 14 + 2 * Math.sin(t * 2), C, { a: 0.25, w: 1 });
  label(ctx, "质心", mx + 12, my - 12, { c: C, a: 0.8, size: 8.5 });
  label(ctx, "质量分布的平均位置", 16, 16, { c: C, a: 0.5, size: 8.5 });
};

SCENES.rotation = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "torque";
  const cx = w / 2, cy = h / 2 + 4;
  if (mode === "torque") {
    const hx = w * 0.28;
    const ang = 0.16 * Math.sin(1.2 * t);
    const L = w * 0.4;
    const doorX = hx + Math.cos(ang) * L, doorY = cy + Math.sin(ang) * L;
    line(ctx, hx, cy, doorX, doorY, C, { a: 0.85, w: 3 });
    glow(ctx, hx, cy, 3, C, 0.8, 8);
    const r = 0.58 + 0.22 * Math.sin(0.7 * t);
    const fx = hx + Math.cos(ang) * L * r, fy = cy + Math.sin(ang) * L * r;
    glow(ctx, fx, fy, 3, "#fb923c", 0.9, 8);
    arrow(ctx, fx, fy, fx + 20, fy - 42, "#fb923c", { a: 0.9, w: 1.8, head: 7 });
    line(ctx, hx, cy, fx, fy, C, { a: 0.35, w: 1, dash: [4, 4] });
    label(ctx, "r", (hx + fx) / 2, cy + 14, { c: C, a: 0.65, size: 8 });
    label(ctx, "τ = r × F", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "L") {
    const R = Math.min(w, h) * 0.24;
    ring(ctx, cx, cy, R, C, { a: 0.25, w: 1.2, dash: [4, 5] });
    const a = t * 0.9;
    const bx = cx + Math.cos(a) * R, by = cy + Math.sin(a) * R;
    line(ctx, cx, cy, bx, by, C, { a: 0.5, w: 1.2 });
    arrow(ctx, bx, by, bx - Math.sin(a) * 22, by + Math.cos(a) * 22, "#fbbf24", { a: 0.85, w: 1.5, head: 5 });
    glow(ctx, bx, by, 3.4, C, 1, 10);
    arrow(ctx, cx, cy, cx, cy - 36, "#e879f9", { a: 0.8, w: 1.6, head: 6 });
    label(ctx, "L", cx + 6, cy - 40, { c: "#e879f9", a: 0.85, size: 8.5 });
    label(ctx, "L = r × mv", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "skater") {
    const ext = 0.5 + 0.5 * Math.cos(0.5 * t);
    const phi = 1.5 * t - 2.2 * Math.sin(0.5 * t);
    ring(ctx, cx, cy, 9, C, { a: 0.6, w: 1.2 });
    glow(ctx, cx, cy, 3, C, 0.5, 8);
    const arm = 16 + ext * 40;
    for (const dir of [0, Math.PI]) {
      const ex = cx + Math.cos(phi + dir) * arm;
      const ey = cy + Math.sin(phi + dir) * arm;
      line(ctx, cx, cy, ex, ey, C, { a: 0.8, w: 1.6 });
      glow(ctx, ex, ey, 3, C, 0.8, 6);
    }
    for (let i = 0; i < 3; i++) {
      ring(ctx, cx, cy, 18 + i * 14, C, { a: 0.08 + 0.05 * i, w: 1, dash: [2, 6] });
    }
    label(ctx, "r ↓ ⇒ ω ↑", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "I") {
    const R = Math.min(w, h) * 0.26;
    const r = 0.5 + 0.4 * (0.5 + 0.5 * Math.sin(0.5 * t));
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * TAU + t * 0.3;
      glow(ctx, cx + Math.cos(a) * R * r, cy + Math.sin(a) * R * r, 4, C, 0.8, 8);
    }
    ring(ctx, cx, cy, R * r, C, { a: 0.25, w: 1, dash: [4, 4] });
    label(ctx, "I = Σmr²", 16, 16, { c: C, a: 0.65, size: 9 });
    const barW = w * 0.5;
    line(ctx, 16, h - 16, 16 + barW, h - 16, C, { a: 0.2, w: 1 });
    line(ctx, 16, h - 16, 16 + barW * r, h - 16, C, { a: 0.9, w: 2 });
    return;
  }
  if (mode === "parallel") {
    const R = Math.min(w, h) * 0.22;
    const d = R * (0.35 + 0.45 * (0.5 + 0.5 * Math.sin(0.45 * t)));
    ring(ctx, cx, cy, R, C, { a: 0.5, w: 1.4 });
    ring(ctx, cx, cy, 4, C, { a: 0.9, w: 2 });
    glow(ctx, cx, cy, 2.4, C, 0.7, 6);
    cross(ctx, cx + d, cy, 7, "#fb923c", 0.95);
    line(ctx, cx, cy - R - 10, cx + d, cy - R - 10, "#fb923c", { a: 0.7, w: 1.2 });
    label(ctx, "d", cx + d / 2, cy - R - 20, { c: "#fb923c", a: 0.8, size: 8, align: "center" });
    label(ctx, "I = I_c + md²", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  const a = t * 0.8;
  ring(ctx, cx, cy, Math.min(w, h) * 0.24, C, { a: 0.4, w: 1.3 });
  for (let i = 0; i < 8; i++) {
    const b = a + i / 8 * TAU;
    glow(ctx, cx + Math.cos(b) * Math.min(w, h) * 0.24, cy + Math.sin(b) * Math.min(w, h) * 0.24, 3, C, 0.8, 6);
  }
  line(ctx, cx, cy, cx + Math.cos(a) * Math.min(w, h) * 0.24, cy + Math.sin(a) * Math.min(w, h) * 0.24, C, { a: 0.5, w: 1.2 });
  label(ctx, "刚体：各点同步转动", 16, 16, { c: C, a: 0.55, size: 8.5 });
};

SCENES.kepler = function (ctx, w, h, t, p, C) {
  const cx = w / 2, cy = h / 2 + 6;
  const S = Math.min(w, h) * 0.34;
  const e = 0.55;
  const a = 1;
  const M = mod(t * 0.55, TAU);
  let E = M;
  for (let i = 0; i < 5; i++) E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  const px = a * (Math.cos(E) - e), py = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const orbit = [];
  for (let i = 0; i <= 120; i++) {
    const EE = i / 120 * TAU;
    orbit.push([cx + a * (Math.cos(EE) - e) * S * 0.92, cy - a * Math.sqrt(1 - e * e) * Math.sin(EE) * S * 0.92]);
  }
  path(ctx, orbit, C, { a: 0.25, w: 1.2 });
  glow(ctx, cx, cy, 7, "#fbbf24", 0.95, 18);
  const bx = cx + px * S * 0.92, by = cy - py * S * 0.92;
  line(ctx, cx, cy, bx, by, C, { a: 0.4, w: 1 });
  const prevE = E - 0.02;
  const ppx = a * (Math.cos(prevE) - e), ppy = a * Math.sqrt(1 - e * e) * Math.sin(prevE);
  const tx = px - ppx, ty = py - ppy;
  const tl = Math.hypot(tx, ty) || 1;
  arrow(ctx, bx, by, bx + tx / tl * 26, by - ty / tl * 26, "#5eead4", { a: 0.9, w: 1.6, head: 6 });
  glow(ctx, bx, by, 4, C, 1, 10);
  label(ctx, "近日点：快", cx - S * 0.72, cy - 10, { c: C, a: 0.5, size: 7.5 });
  label(ctx, "远日点：慢", cx + S * 0.62, cy + 12, { c: C, a: 0.5, size: 7.5 });
  label(ctx, "等面积速度", 16, 16, { c: C, a: 0.55, size: 8.5 });
};

SCENES.shm = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "shm";
  if (mode === "resonance") {
    const V = view(w, h, 0.35, 2.6, 0, 2.2, 20);
    const w0 = 1.2, damp = 0.32;
    const amp = ww => 1 / Math.sqrt(Math.pow(w0 * w0 - ww * ww, 2) + Math.pow(damp * ww, 2));
    plot(ctx, V, amp, 0.4, 2.55, C, { a: 0.85, w: 1.6 });
    line(ctx, V.X(w0), V.Y(0), V.X(w0), V.Y(2.1), C, { a: 0.3, w: 1, dash: [4, 4] });
    const wd = 0.45 + mod(t * 0.25, 1.9);
    const A = clamp(amp(wd), 0, 2.1);
    glow(ctx, V.X(wd), V.Y(A), 3.2, C, 1, 10);
    label(ctx, "振幅", V.X(0.45), V.Y(1.9), { c: C, a: 0.5, size: 8 });
    label(ctx, "驱动频率 ω", w - 16, V.Y(0) + 14, { c: C, a: 0.5, size: 8, align: "right" });
    const ox = w * 0.16, oy = h * 0.24;
    ring(ctx, ox, oy, 3 + A * 6, C, { a: 0.6, w: 1.2 });
    glow(ctx, ox, oy, 2 + A * 2.4, C, 0.8, 8);
    label(ctx, A > 1.7 ? "共振！" : "", ox, oy - 18, { c: C, a: 0.8, size: 8.5, align: "center" });
    return;
  }
  const wallX = w * 0.08;
  const eqX = w * 0.5;
  const cy = h * 0.34;
  const amp = w * 0.2;
  const frame = mode === "damped" ? Math.exp(-0.22 * mod(t, 14)) : 1;
  const x = eqX + Math.sin(1.35 * t) * amp * (mode === "damped" ? Math.exp(-0.22 * mod(t, 14)) : 1);
  line(ctx, wallX, cy - 18, wallX, cy + 18, C, { a: 0.5, w: 2 });
  spring(ctx, wallX, cy, x - 8, 7, 8, C, 0.55);
  ctx.fillStyle = hexA(C, 0.2);
  ctx.strokeStyle = hexA(C, 0.9);
  ctx.beginPath();
  ctx.roundRect(x - 8, cy - 12, 16, 24, 3);
  ctx.fill();
  ctx.stroke();
  glow(ctx, x, cy, 3, C, 0.9, 8);
  const traceY = h * 0.7;
  const traceH = h * 0.16;
  line(ctx, wallX, traceY, w - 16, traceY, C, { a: 0.12, w: 1 });
  const pts = [];
  for (let i = 0; i <= 120; i++) {
    const tt = t - 5 + 5 * i / 120;
    const val = Math.sin(1.35 * tt) * amp * (mode === "damped" ? Math.exp(-0.22 * mod(tt, 14)) : 1);
    pts.push([lerp(wallX, w - 16, i / 120), traceY - val / amp * traceH * frame]);
  }
  if (mode === "damped") {
    for (const sgn of [1, -1]) {
      const env = [];
      for (let i = 0; i <= 60; i++) {
        const tt = t - 5 + 5 * i / 60;
        env.push([lerp(wallX, w - 16, i / 60), traceY - sgn * Math.exp(-0.22 * mod(tt, 14)) * traceH]);
      }
      path(ctx, env, C, { a: 0.15, w: 1, dash: [4, 4] });
    }
  }
  path(ctx, pts, C, { a: 0.8, w: 1.4 });
  if (mode === "phase") {
    const R = Math.min(w, h) * 0.17;
    const pcx = w * 0.18, pcy = h * 0.28;
    ring(ctx, pcx, pcy, R, C, { a: 0.35, w: 1.2 });
    const a = 1.35 * t;
    line(ctx, pcx, pcy, pcx + Math.cos(a) * R, pcy - Math.sin(a) * R, C, { a: 0.7, w: 1.3 });
    line(ctx, pcx + Math.cos(a) * R, pcy - Math.sin(a) * R, pcx + Math.cos(a) * R, pcy, C, { a: 0.25, w: 1, dash: [2, 3] });
    glow(ctx, pcx + Math.cos(a) * R, pcy - Math.sin(a) * R, 2.4, C, 0.9, 8);
    label(ctx, "φ", pcx + 8, pcy - 8, { c: C, a: 0.7, size: 8 });
    return;
  }
  label(ctx, mode === "params" ? "A 振幅 · T 周期" : mode === "damped" ? "振幅衰减" : "x(t) = A sin(ωt)", 16, 16, { c: C, a: 0.6, size: 9 });
  if (mode === "params") {
    line(ctx, eqX - amp, traceY - h * 0.2, eqX + amp, traceY - h * 0.2, C, { a: 0.35, w: 1, dash: [3, 3] });
    label(ctx, "A", eqX + amp + 4, traceY - h * 0.2, { c: C, a: 0.7, size: 8 });
    const T = TAU / 1.35;
    const x1 = wallX + (w - 16 - wallX) * (5 - T) / 5;
    const x2 = w - 16;
    line(ctx, x1, traceY + h * 0.2, x2, traceY + h * 0.2, C, { a: 0.35, w: 1 });
    label(ctx, "T", (x1 + x2) / 2, traceY + h * 0.2 + 12, { c: C, a: 0.7, size: 8, align: "center" });
  }
};
