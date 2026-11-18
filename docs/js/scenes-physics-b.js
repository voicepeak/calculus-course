SCENES.fluids = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "pressure";
  if (mode === "pressure") {
    const x0 = w * 0.18, x1 = w * 0.66, y0 = h * 0.2, y1 = h * 0.82;
    ctx.save();
    ctx.fillStyle = hexA(C, 0.06);
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    ctx.strokeStyle = hexA(C, 0.4);
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    ctx.restore();
    const depth = lerp(0.2, 0.75, 0.5 + 0.5 * Math.sin(0.45 * t));
    const by = y0 + (y1 - y0) * depth;
    const bw = w * 0.1, bh = h * 0.1;
    ctx.fillStyle = hexA(C, 0.18);
    ctx.strokeStyle = hexA(C, 0.75);
    ctx.beginPath();
    ctx.roundRect(x0 + (x1 - x0) / 2 - bw / 2, by - bh / 2, bw, bh, 3);
    ctx.fill();
    ctx.stroke();
    const pr = depth;
    for (let i = 0; i < 4; i++) {
      const a = i / 4 * TAU;
      const r1 = Math.max(bw, bh) * 0.7, r2 = r1 + 8 + pr * 16;
      arrow(ctx, x0 + (x1 - x0) / 2 + Math.cos(a) * r1, by + Math.sin(a) * r1 * 0.7, x0 + (x1 - x0) / 2 + Math.cos(a) * r2, by + Math.sin(a) * r2 * 0.7, C, { a: 0.35 + pr * 0.4, w: 1.1, head: 4 });
    }
    line(ctx, x1 + 14, y0, x1 + 14, by, C, { a: 0.4, w: 1 });
    label(ctx, "h", x1 + 20, (y0 + by) / 2, { c: C, a: 0.6, size: 8 });
    label(ctx, "p = ρgh", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "buoy") {
    const yl = h * 0.47;
    ctx.fillStyle = hexA(C, 0.08);
    ctx.fillRect(w * 0.08, yl, w * 0.84, h * 0.42);
    line(ctx, w * 0.08, yl, w * 0.92, yl, C, { a: 0.4, w: 1.2 });
    const sub = 0.35 + 0.25 * Math.sin(0.5 * t);
    const bw = w * 0.2, bh = h * 0.3;
    const bx = w * 0.5 - bw / 2;
    const by = yl - bh * (1 - sub);
    ctx.fillStyle = hexA(C, 0.2);
    ctx.strokeStyle = hexA(C, 0.8);
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 3);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#04070c";
    if (sub > 0.55) ctx.fillRect(bx + 1, yl, bw - 2, bh * sub - 1);
    arrow(ctx, bx + bw / 2, by + bh, bx + bw / 2, by + bh + 26, "#fb7185", { a: 0.9, w: 1.8, head: 6 });
    label(ctx, "G", bx + bw / 2 + 8, by + bh + 24, { c: "#fb7185", a: 0.8, size: 8 });
    arrow(ctx, bx + bw / 2, yl, bx + bw / 2, yl - 16 - sub * 40, C, { a: 0.95, w: 1.8, head: 7 });
    label(ctx, "浮力", bx + bw / 2 + 8, yl - 20 - sub * 40, { c: C, a: 0.85, size: 8 });
    label(ctx, "F = ρgV排", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "pipe") {
    const yc = h * 0.5;
    const top = [];
    for (let i = 0; i <= 60; i++) {
      const u = i / 60;
      const half = h * (0.28 - 0.17 * Math.sin(u * Math.PI));
      top.push([lerp(w * 0.06, w * 0.94, u), yc - half]);
    }
    path(ctx, top, C, { a: 0.5, w: 1.4 });
    path(ctx, top.map(q => [q[0], h - q[1]]), C, { a: 0.5, w: 1.4 });
    for (let i = 0; i < 18; i++) {
      const u = mod(i / 18 + t * 0.06, 1);
      const half = h * (0.28 - 0.17 * Math.sin(u * Math.PI));
      const nx = half / (h * 0.28);
      const speed = 1 / nx;
      const x = lerp(w * 0.06, w * 0.94, mod(u * speed * 0.6, 1));
      const y = yc + (i % 3 - 1) * half * 0.45;
      glow(ctx, x, y, 1.8, C, 0.65, 3);
    }
    label(ctx, "A₁v₁ = A₂v₂", 16, 16, { c: C, a: 0.65, size: 9 });
    label(ctx, "窄处流速快", w - 16, 16, { c: C, a: 0.45, size: 8, align: "right" });
    return;
  }
  if (mode === "bernoulli") {
    const yc = h * 0.52;
    ctx.save();
    ctx.fillStyle = hexA(C, 0.14);
    ctx.strokeStyle = hexA(C, 0.6);
    ctx.beginPath();
    ctx.ellipse(w * 0.46, yc, w * 0.3, h * 0.1, -0.06, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    for (let i = 0; i < 5; i++) {
      const off = i * h * 0.09;
      const pts1 = [], pts2 = [];
      for (let j = 0; j <= 40; j++) {
        const u = j / 40;
        const x = lerp(w * 0.06, w * 0.94, u);
        const bend = Math.sin(u * Math.PI) * h * 0.1;
        pts1.push([x, yc - h * 0.16 - off * 0.5 - bend * (i === 0 ? 0.5 : 0.3)]);
        pts2.push([x, yc + h * 0.16 + off * 0.5 + bend * 0.15]);
      }
      path(ctx, pts1, C, { a: 0.16, w: 1 });
      path(ctx, pts2, C, { a: 0.16, w: 1 });
    }
    for (let i = 0; i < 10; i++) {
      const u = i / 10;
      const x = lerp(w * 0.1, w * 0.86, u);
      const ph = mod(t * 0.8 + i / 10, 1);
      glow(ctx, lerp(w * 0.1, w * 0.86, ph), yc - h * 0.24, 1.6, C, 0.5, 2);
    }
    for (let i = 0; i < 3; i++) {
      const x = w * 0.32 + i * w * 0.16;
      arrow(ctx, x, yc - h * 0.3, x, yc - h * 0.3 - 12 - i * 2, C, { a: 0.25, w: 1, head: 4 });
      arrow(ctx, x, yc + h * 0.3, x, yc + h * 0.3 + 16 + i * 3, C, { a: 0.5, w: 1.2, head: 4 });
    }
    label(ctx, "上快下慢 → 上压强小", 16, 16, { c: C, a: 0.55, size: 8.5 });
    return;
  }
  const y0 = h * 0.24, y1 = h * 0.76;
  const turb = Math.floor(mod(t, 8) / 4) === 1;
  line(ctx, w * 0.1, y0, w * 0.9, y0, C, { a: 0.25, w: 1 });
  line(ctx, w * 0.1, y1, w * 0.9, y1, C, { a: 0.25, w: 1 });
  for (let i = 0; i < 40; i++) {
    const row = i % 6;
    const yy = lerp(y0 + 6, y1 - 6, row / 5);
    const prof = 1 - Math.pow((row - 2.5) / 2.5, 2);
    const ph = mod(t * 0.25 * (0.4 + prof) + i * 0.137, 1);
    const x = lerp(w * 0.1, w * 0.9, ph);
    const wob = turb ? Math.sin(t * 4 + i) * 5 : 0;
    glow(ctx, x, yy + wob, 1.6, C, 0.55, 2);
  }
  label(ctx, turb ? "湍流 · Re 大" : "层流 · 黏性内摩擦", 16, 16, { c: C, a: 0.65, size: 9 });
};

SCENES.gas = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "state";
  const bx = w * 0.1, by = h * 0.18, bw = w * 0.55, bh = h * 0.64;
  const drawBox = (frac = 1) => {
    ctx.save();
    ctx.strokeStyle = hexA(C, 0.4);
    ctx.lineWidth = 1.2;
    ctx.strokeRect(bx, by, bw, bh);
    ctx.restore();
  };
  const molecule = (i, tt, speed) => {
    const rnd = rng(i * 977 + 13);
    const ax = rnd(), ay = rnd(), sp = 0.25 + rnd() * 0.4;
    const tri = z => Math.abs(mod(z, 2) - 1);
    const x = bx + (0.06 + 0.88 * tri(ax + tt * sp * speed)) * bw;
    const y = by + (0.06 + 0.88 * tri(ay + tt * sp * 0.8 * speed)) * bh;
    return [x, y];
  };
  if (mode === "pv") {
    drawBox();
    const comp = 0.5 + 0.32 * Math.sin(0.45 * t);
    const pistonX = bx + bw * comp;
    ctx.save();
    ctx.fillStyle = hexA(C, 0.1);
    ctx.fillRect(pistonX, by + 4, w * 0.06, bh - 8);
    ctx.strokeStyle = hexA(C, 0.7);
    ctx.strokeRect(pistonX, by + 4, w * 0.06, bh - 8);
    ctx.restore();
    line(ctx, pistonX + 4, by - 12, pistonX + 4, by + 2, C, { a: 0.6, w: 1.4 });
    const speed = 0.7 + 0.5 * (1 - comp);
    for (let i = 0; i < 26; i++) {
      const q = molecule(i, t, speed);
      if (q[0] < pistonX - 4) glow(ctx, q[0], q[1], 1.5, C, 0.6, 2);
    }
    label(ctx, "pV = nRT", 16, 16, { c: C, a: 0.7, size: 9 });
    label(ctx, "V ↓  p ↑（T 不变）", w * 0.1, h - 10, { c: C, a: 0.5, size: 8 });
    return;
  }
  if (mode === "maxwell") {
    const V = view(w, h, 0, 4.2, 0, 1.5, 22);
    const T = 0.45 + 0.4 * (0.5 + 0.5 * Math.sin(0.35 * t));
    const f = v => (v * v) / (T * T * 1.6) * Math.exp(-(v * v) / (2 * T * T * 1.2));
    plot(ctx, V, f, 0, 4.1, C, { a: 0.9, w: 1.7 });
    line(ctx, V.X(0), V.Y(0), V.X(4.1), V.Y(0), C, { a: 0.2, w: 1 });
    const vp = Math.sqrt(2 * T * T * 1.2);
    line(ctx, V.X(vp), V.Y(0), V.X(vp), V.Y(f(vp)), C, { a: 0.4, w: 1, dash: [3, 3] });
    glow(ctx, V.X(vp), V.Y(f(vp)), 2.6, C, 0.9, 8);
    label(ctx, "T ↑ → 曲线变宽", 16, 16, { c: C, a: 0.6, size: 8.5 });
    label(ctx, "速率 v", w - 16, V.Y(0) + 12, { c: C, a: 0.45, size: 8, align: "right" });
    return;
  }
  if (mode === "mfp") {
    const rnd = rng(29);
    let x = bx + bw * 0.08, y = by + bh * 0.5;
    const pts = [[x, y]];
    for (let i = 0; i < 6; i++) {
      x += bw * (0.1 + rnd() * 0.16);
      y = by + bh * (0.2 + rnd() * 0.6);
      pts.push([x, y]);
    }
    path(ctx, pts, C, { a: 0.75, w: 1.3 });
    for (let i = 0; i < pts.length - 1; i++) {
      glow(ctx, pts[i][0], pts[i][1], 2.6, C, 0.6, 5);
      const a = clamp((t * 0.35) % 1, 0, 1);
      const qx = lerp(pts[i][0], pts[i + 1][0], a), qy = lerp(pts[i][1], pts[i + 1][1], a);
      glow(ctx, qx, qy, 2.4, C, 0.9, 7);
    }
    const mid = pts[2], mid2 = pts[3];
    line(ctx, mid[0], mid[1] - 8, mid2[0], mid2[1] - 8, C, { a: 0.4, w: 1, dash: [3, 3] });
    label(ctx, "λ", (mid[0] + mid2[0]) / 2, Math.min(mid[1], mid2[1]) - 18, { c: C, a: 0.7, size: 8.5, align: "center" });
    label(ctx, "两次碰撞间的平均路程", 16, 16, { c: C, a: 0.55, size: 8 });
    return;
  }
  if (mode === "dof") {
    const mx = w / 2, my = h * 0.42;
    glow(ctx, mx - 9, my, 5, C, 0.85, 8);
    glow(ctx, mx + 9, my, 5, C, 0.85, 8);
    line(ctx, mx - 9, my, mx + 9, my, C, { a: 0.6, w: 2 });
    for (let i = 0; i < 3; i++) {
      const a = i / 3 * TAU - 0.5;
      arrow(ctx, mx, my, mx + Math.cos(a) * 40, my + Math.sin(a) * 28, C, { a: 0.3, w: 1, head: 4 });
    }
    ring(ctx, mx, my, 22, C, { a: 0.3, w: 1, dash: [3, 4] });
    arrow(ctx, mx + 22, my, mx + 22, my - 14, C, { a: 0.5, w: 1.1, head: 3 });
    for (let i = 0; i < 5; i++) {
      const x = w * 0.14 + i * w * 0.18, y = h * 0.8;
      glow(ctx, x, y, 2.4, C, 0.65, 4);
      label(ctx, "½kT", x, y - 10, { c: C, a: 0.55, size: 6.5, align: "center" });
    }
    label(ctx, "平动 + 转动，每个自由度均分 ½kT", 16, 16, { c: C, a: 0.6, size: 8 });
    return;
  }
  drawBox();
  const T = mode === "internal" ? 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(0.4 * t)) : 0.72;
  const n = 30;
  for (let i = 0; i < n; i++) {
    const q = molecule(i, t, 0.6 + T);
    glow(ctx, q[0], q[1], 1.5, C, 0.5 + T * 0.3, 2);
  }
  if (mode === "first") {
    const q = 0.5 + 0.45 * Math.sin(0.5 * t);
    arrow(ctx, bx - w * 0.02, by + bh * 0.3, bx + bw * 0.18, by + bh * 0.3, "#fb923c", { a: 0.85, w: 1.8, head: 6 });
    label(ctx, "Q", bx + bw * 0.08, by + bh * 0.3 - 10, { c: "#fb923c", a: 0.8, size: 8, align: "center" });
    const pistonX = bx + bw * (0.94 - q * 0.1);
    line(ctx, pistonX, by + 4, pistonX, by + bh - 4, C, { a: 0.8, w: 2.4 });
    arrow(ctx, pistonX + 4, by + bh * 0.5, pistonX + 24 + q * 14, by + bh * 0.5, C, { a: 0.7, w: 1.3, head: 5 });
    label(ctx, "W", pistonX + 30, by + bh * 0.5 - 8, { c: C, a: 0.7, size: 8 });
    label(ctx, "ΔU = Q − W", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "internal") {
    label(ctx, "T ↑ → 分子更活跃 → 内能 ↑", 16, 16, { c: C, a: 0.6, size: 8.5 });
    line(ctx, bx, h - 14, bx + bw, h - 14, C, { a: 0.2, w: 1 });
    line(ctx, bx, h - 14, bx + bw * T, h - 14, C, { a: 0.9, w: 2 });
    return;
  }
  const gx = w * 0.74;
  ["p", "V", "T"].forEach((nm, i) => {
    const y = by + bh * (0.18 + i * 0.3);
    label(ctx, nm, gx, y - 8, { c: C, a: 0.6, size: 8.5 });
    line(ctx, gx, y + 8, w * 0.94, y + 8, C, { a: 0.15, w: 1 });
    const val = 0.55 + 0.04 * Math.sin(t * 2 + i * 2);
    line(ctx, gx, y + 8, gx + (w * 0.18) * val, y + 8, C, { a: 0.75, w: 2 });
    glow(ctx, gx + (w * 0.18) * val, y + 8, 2.2, C, 0.8, 4);
  });
  label(ctx, "平衡态", 16, 16, { c: C, a: 0.6, size: 9 });
};

SCENES.thermo = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "process";
  const V = view(w, h * 0.86, 0, 4.2, 0, 4.2, 24);
  line(ctx, V.X(0), V.Y(0), V.X(4.1), V.Y(0), C, { a: 0.25, w: 1 });
  line(ctx, V.X(0), V.Y(0), V.X(0), V.Y(4.1), C, { a: 0.25, w: 1 });
  label(ctx, "V", V.X(4.05), V.Y(0) + 12, { c: C, a: 0.5, size: 8 });
  label(ctx, "p", V.X(0) - 12, V.Y(3.9), { c: C, a: 0.5, size: 8 });
  if (mode === "process") {
    const idx = Math.floor(mod(t, 12) / 3);
    const pts = [];
    const push = (x, y) => pts.push([V.X(x), V.Y(y)]);
    if (idx === 0) { for (let i = 0; i <= 40; i++) push(1.6, 0.7 + 2.3 * i / 40); }
    else if (idx === 1) { for (let i = 0; i <= 40; i++) push(0.9 + 2.3 * i / 40, 1.5); }
    else if (idx === 2) { for (let i = 0; i <= 40; i++) { const x = 1 + 2.2 * i / 40; push(x, 3.6 / x); } }
    else { for (let i = 0; i <= 40; i++) { const x = 1 + 1.9 * i / 40; push(x, 4.2 / Math.pow(x, 1.4)); } }
    path(ctx, pts, C, { a: 0.9, w: 1.8 });
    const names = ["等容 · V 不变", "等压 · p 不变", "等温 · pV 不变", "绝热 · pVᵞ 不变"];
    label(ctx, names[idx], 16, 16, { c: C, a: 0.75, size: 9 });
    return;
  }
  if (mode === "cycle" || mode === "carnot") {
    const carnot = mode === "carnot";
    let loopPts = [];
    if (!carnot) {
      const v = [1.0, 1.8, 3.4, 2.2], pp = [1.0, 1.1, 2.9, 2.4];
      const segs = [[0, 1], [1, 2], [2, 3], [3, 0]];
      for (const [i, j] of segs) {
        for (let k = 0; k <= 30; k++) {
          loopPts.push([lerp(v[i], v[j], k / 30), lerp(pp[i], pp[j], k / 30)]);
        }
      }
    } else {
      const v1 = 0.9, v2 = 3.2, v3 = 2.6, v4 = 0.75;
      for (let i = 0; i <= 30; i++) { const x = lerp(v1, v2, i / 30); loopPts.push([x, 3.4 / x]); }
      for (let i = 0; i <= 20; i++) { const x = lerp(v2, v3, i / 20); loopPts.push([x, 3.4 / v2 * Math.pow(v2 / x, 1.4)]); }
      for (let i = 0; i <= 30; i++) { const x = lerp(v3, v4, i / 30); loopPts.push([x, 1.35 / x]); }
      for (let i = 0; i <= 20; i++) { const x = lerp(v4, v1, i / 20); loopPts.push([x, 1.35 / v4 * Math.pow(v4 / x, 1.4)]); }
    }
    const scr = loopPts.map(q => [V.X(q[0]), V.Y(q[1])]);
    path(ctx, scr, C, { fill: 0.08, close: true, a: 0.85, w: 1.6 });
    const u = mod(t * 0.12, 1);
    const qi = Math.floor(u * (scr.length - 1));
    glow(ctx, scr[qi][0], scr[qi][1], 3, C, 1, 10);
    if (carnot) {
      label(ctx, "卡诺循环", 16, 16, { c: C, a: 0.75, size: 9 });
      label(ctx, "η = 1 − Tc/Th", 16, 32, { c: C, a: 0.55, size: 8.5 });
      label(ctx, "Th", V.X(3.4), V.Y(3.4 / 3.4) - 10, { c: C, a: 0.4, size: 8 });
      label(ctx, "Tc", V.X(2.4), V.Y(1.35 / 2.4) + 12, { c: C, a: 0.4, size: 8 });
    } else {
      label(ctx, "面积 = 净功 W", 16, 16, { c: C, a: 0.7, size: 9 });
      label(ctx, "η = W / Q₁", 16, 32, { c: C, a: 0.5, size: 8.5 });
    }
    return;
  }
  const groups = [["U", 0.55], ["+ pV", 0.25], ["U", 0.55], ["− TS", 0.3], ["H", 0.8], ["− TS", 0.3]];
  const y0 = h * 0.3;
  const names = ["H = U + pV", "F = U − TS", "G = H − TS"];
  for (let g = 0; g < 3; g++) {
    const y = y0 + g * h * 0.19;
    let x = w * 0.16;
    const items = g === 0 ? [[0.55, "U"], [0.25, "+pV"]] : g === 1 ? [[0.55, "U"], [0.3, "−TS"]] : [[0.55, "U"], [0.25, "+pV"], [0.3, "−TS"]];
    const on = Math.floor(mod(t, 6) / 2) === g;
    items.forEach(([val, nm]) => {
      const ww = w * val * 0.55;
      ctx.fillStyle = hexA(C, on ? 0.28 : 0.1);
      ctx.fillRect(x, y, ww, h * 0.1);
      label(ctx, nm, x + ww / 2, y + h * 0.05, { c: C, a: on ? 0.9 : 0.4, size: 7.5, align: "center" });
      x += ww + 2;
    });
    label(ctx, names[g], w - 18, y + h * 0.05, { c: C, a: on ? 0.75 : 0.3, size: 8, align: "right" });
  }
  label(ctx, "不同约束下的能量账本", 16, 16, { c: C, a: 0.55, size: 8.5 });
};

SCENES.entropy = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "entropy";
  const bx = w * 0.08, by = h * 0.18, bw = w * 0.84, bh = h * 0.58;
  ctx.save();
  ctx.strokeStyle = hexA(C, 0.35);
  ctx.strokeRect(bx, by, bw, bh);
  ctx.restore();
  const prog = smooth(seq(t, 11));
  const rnd = rng(51);
  for (let i = 0; i < 48; i++) {
    const sx = bx + bw * 0.12 + rnd() * bw * 0.16;
    const sy = by + bh * (0.2 + rnd() * 0.6);
    const ex = bx + bw * (0.08 + rnd() * 0.84);
    const ey = by + bh * (0.1 + rnd() * 0.8);
    const x = lerp(sx, ex, prog), y = lerp(sy, ey, prog);
    glow(ctx, x, y, 1.8, C, 0.7, 3);
  }
  const grad = ctx.createRadialGradient(bx + bw * 0.2, by + bh * 0.5, 2, bx + bw * 0.2, by + bh * 0.5, bw * 0.5);
  grad.addColorStop(0, hexA(C, 0.12 * (1 - prog)));
  grad.addColorStop(1, hexA(C, 0));
  ctx.fillStyle = grad;
  ctx.fillRect(bx, by, bw, bh);
  if (mode === "second") {
    arrow(ctx, w * 0.2, h - 30, w * 0.8, h - 30, C, { a: 0.7, w: 1.6, head: 6 });
    label(ctx, "自然方向", w * 0.8, h - 44, { c: C, a: 0.6, size: 8, align: "right" });
    label(ctx, "反向自发？不可能", w * 0.2, h - 14, { c: "#fb7185", a: 0.7, size: 8 });
  } else {
    label(ctx, "S ↑", w - 18, 18, { c: C, a: 0.75, size: 10, align: "right" });
    line(ctx, bx, h - 18, bx + bw, h - 18, C, { a: 0.15, w: 1 });
    line(ctx, bx, h - 18, bx + bw * prog, h - 18, C, { a: 0.9, w: 2 });
    label(ctx, "熵（无序度）", bx, h - 30, { c: C, a: 0.55, size: 8 });
  }
};

SCENES.electro = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "lines";
  const cx = w / 2, cy = h / 2 + 4;
  const m = Math.min(w, h);
  const pos = { x: cx - m * 0.16, y: cy };
  const neg = { x: cx + m * 0.16, y: cy };
  const field = (x, y, charges) => {
    let fx = 0, fy = 0;
    for (const q of charges) {
      const dx = x - q.x, dy = y - q.y;
      const r2 = dx * dx + dy * dy + 40;
      const k = q.q * 2600 / Math.pow(r2, 1.5);
      fx += dx * k;
      fy += dy * k;
    }
    return [fx, fy];
  };
  if (mode === "coulomb" || mode === "field") {
    const d = mode === "coulomb" ? 0.5 + 0.3 * Math.sin(0.5 * t) : 0.42;
    const q1 = { x: cx - m * 0.3 * d, y: cy, q: 1 };
    const q2 = { x: cx + m * 0.3 * d, y: cy, q: 1 };
    glow(ctx, q1.x, q1.y, 7, "#fb7185", 0.95, 14);
    glow(ctx, q2.x, q2.y, 7, "#fb7185", 0.95, 14);
    label(ctx, "+", q1.x, q1.y, { c: "#04070c", a: 1, size: 10, align: "center", weight: 700 });
    label(ctx, "+", q2.x, q2.y, { c: "#04070c", a: 1, size: 10, align: "center", weight: 700 });
    const rep = mode === "coulomb";
    if (rep) {
      arrow(ctx, q1.x - 10, cy - 22, q1.x - 30, cy - 22, "#fb7185", { a: 0.85, w: 1.4, head: 5 });
      arrow(ctx, q2.x + 10, cy - 22, q2.x + 30, cy - 22, "#fb7185", { a: 0.85, w: 1.4, head: 5 });
      label(ctx, "F ∝ 1/r²", 16, 16, { c: C, a: 0.65, size: 9 });
    } else {
      const tx = cx + m * 0.02 + m * 0.14 * Math.sin(0.4 * t);
      const q3 = { x: tx, y: cy + m * 0.2 };
      glow(ctx, q3.x, q3.y, 3.5, "#5eead4", 0.9, 8);
      const f = field(q3.x, q3.y, [q1]);
      const fl = Math.hypot(f[0], f[1]) || 1;
      arrow(ctx, q3.x, q3.y, q3.x + f[0] / fl * 28, q3.y + f[1] / fl * 28, "#5eead4", { a: 0.9, w: 1.5, head: 6 });
      label(ctx, "E", q3.x + f[0] / fl * 34, q3.y + f[1] / fl * 34, { c: "#5eead4", a: 0.85, size: 8.5 });
      label(ctx, "E = F/q₀", 16, 16, { c: C, a: 0.65, size: 9 });
    }
    return;
  }
  if (mode === "lines" || mode === "potential" || mode === "equi") {
    const charges = mode === "lines" ? [{ ...pos, q: 1 }, { ...neg, q: -1 }] : [{ ...pos, q: 1 }, { ...neg, q: -1 }];
    if (mode !== "lines") {
      for (let i = 1; i <= 4; i++) {
        ring(ctx, pos.x, pos.y, 14 + i * 15, C, { a: 0.1, w: 1, dash: [3, 4] });
        ring(ctx, neg.x, neg.y, 14 + i * 15, C, { a: 0.1, w: 1, dash: [3, 4] });
      }
    }
    glow(ctx, pos.x, pos.y, 6, "#fb7185", 0.95, 14);
    glow(ctx, neg.x, neg.y, 6, "#38bdf8", 0.95, 14);
    label(ctx, "+", pos.x, pos.y, { c: "#04070c", a: 1, size: 10, align: "center", weight: 700 });
    label(ctx, "−", neg.x, neg.y, { c: "#04070c", a: 1, size: 10, align: "center", weight: 700 });
    for (let i = 0; i < 12; i++) {
      const startA = i / 12 * TAU;
      let x = pos.x + Math.cos(startA) * 8, y = pos.y + Math.sin(startA) * 8;
      const pts = [[x, y]];
      for (let s = 0; s < 150; s++) {
        const f = field(x, y, charges);
        const l = Math.hypot(f[0], f[1]) || 1;
        x += f[0] / l * 5;
        y += f[1] / l * 5;
        if (x < 4 || x > w - 4 || y < 4 || y > h - 4) break;
        if (Math.hypot(x - neg.x, y - neg.y) < 7) { pts.push([x, y]); break; }
        pts.push([x, y]);
      }
      path(ctx, pts, C, { a: 0.3, w: 1 });
      const idx = Math.floor(mod(t * 12 + i * 9, pts.length));
      if (pts[idx]) glow(ctx, pts[idx][0], pts[idx][1], 1.4, C, 0.6, 2);
    }
    if (mode === "equi") {
      const ax = cx + m * 0.05, ay = cy - m * 0.16;
      const f = field(ax, ay, charges);
      const fl = Math.hypot(f[0], f[1]) || 1;
      arrow(ctx, ax, ay, ax + f[0] / fl * 30, ay + f[1] / fl * 30, C, { a: 0.9, w: 1.6, head: 6 });
      line(ctx, ax - f[1] / fl * 22, ay + f[0] / fl * 22, ax + f[1] / fl * 22, ay - f[0] / fl * 22, C, { a: 0.6, w: 1.2, dash: [4, 4] });
      label(ctx, "E ⊥ 等势面", 16, 16, { c: C, a: 0.65, size: 9 });
      return;
    }
    label(ctx, mode === "lines" ? "电场线：正 → 负" : "电势的等高地形", 16, 16, { c: C, a: 0.6, size: 9 });
    return;
  }
  if (mode === "flux" || mode === "gauss") {
    const inside = mode === "gauss" ? Math.floor(mod(t, 8) / 4) === 0 : true;
    const rx = m * 0.27, ry = m * 0.23;
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = hexA(C, 0.5);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, TAU);
    ctx.stroke();
    ctx.restore();
    const qx = inside ? cx : cx + rx + m * 0.22;
    glow(ctx, qx, cy, 6, "#fb7185", 0.95, 12);
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * TAU;
      let x = qx + Math.cos(a) * 9, y = cy + Math.sin(a) * 9;
      const pts = [[x, y]];
      for (let s = 0; s < 120; s++) {
        x += Math.cos(a) * 4;
        y += Math.sin(a) * 4;
        if (x < 2 || x > w - 2 || y < 2 || y > h - 2) break;
        pts.push([x, y]);
      }
      path(ctx, pts, C, { a: inside ? 0.3 : 0.18, w: 1 });
      if (inside) {
        for (let k = 0; k < pts.length; k += 6) {
          const q = pts[k];
          if (Math.pow((q[0] - cx) / rx, 2) + Math.pow((q[1] - cy) / ry, 2) < 1.05) glow(ctx, q[0], q[1], 1.2, C, 0.35, 0);
        }
      }
    }
    label(ctx, inside ? "内部电荷 q → Φ = q/ε₀" : "外部电荷 → 净通量为 0", 16, 16, { c: C, a: 0.7, size: 8.5 });
    return;
  }
  if (mode === "conductor" || mode === "shield") {
    const R = m * 0.22;
    ctx.save();
    ctx.strokeStyle = hexA(C, 0.6);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, TAU);
    ctx.stroke();
    if (mode === "shield") {
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.7, 0, TAU);
      ctx.stroke();
    }
    ctx.restore();
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * TAU + 0.1;
      glow(ctx, cx + Math.cos(a) * R, cy + Math.sin(a) * R, 2.2, "#fb7185", 0.8, 4);
    }
    for (let i = 0; i < 10; i++) {
      const a = i / 10 * TAU;
      arrow(ctx, cx + Math.cos(a) * (R + 10), cy + Math.sin(a) * (R + 10), cx + Math.cos(a) * (R + 26), cy + Math.sin(a) * (R + 26), C, { a: 0.45, w: 1.1, head: 4 });
    }
    label(ctx, mode === "shield" ? "导体壳内：E = 0" : "电荷全在表面 · 内部 E = 0", 16, 16, { c: C, a: 0.65, size: 8.5 });
    return;
  }
  if (mode === "capacitor") {
    const gap = m * 0.26;
    const ph = 0.5 + 0.45 * Math.sin(0.5 * t);
    line(ctx, cx - gap, cy - h * 0.26, cx - gap, cy + h * 0.26, "#fb7185", { a: 0.8, w: 3 });
    line(ctx, cx + gap, cy - h * 0.26, cx + gap, cy + h * 0.26, "#38bdf8", { a: 0.8, w: 3 });
    const n = 6;
    for (let i = 0; i < n; i++) {
      const y = cy - h * 0.2 + i * h * 0.4 / (n - 1);
      if (i / n < ph) {
        label(ctx, "+", cx - gap - 12, y, { c: "#fb7185", a: 0.85, size: 8, align: "right" });
        label(ctx, "−", cx + gap + 12, y, { c: "#38bdf8", a: 0.85, size: 8 });
      }
      for (let k = 1; k < 5; k++) {
        arrow(ctx, cx - gap + k * gap * 0.4, y, cx - gap + k * gap * 0.4 + 5, y, C, { a: 0.16 * ph, w: 1, head: 3 });
      }
    }
    label(ctx, "C = Q / U", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  const gap = m * 0.26;
  line(ctx, cx - gap, cy - h * 0.26, cx - gap, cy + h * 0.26, "#fb7185", { a: 0.7, w: 2.6 });
  line(ctx, cx + gap, cy - h * 0.26, cx + gap, cy + h * 0.26, "#38bdf8", { a: 0.7, w: 2.6 });
  const rnd = rng(17);
  for (let i = 0; i < 8; i++) {
    const gx = cx - gap * 0.5 + rnd() * gap;
    const gy = cy - h * 0.2 + rnd() * h * 0.4;
    const a = 0.2 * Math.sin(t * 0.8 + i);
    line(ctx, gx - Math.cos(a) * 8, gy - Math.sin(a) * 8, gx + Math.cos(a) * 8, gy + Math.sin(a) * 8, C, { a: 0.6, w: 1.2 });
    glow(ctx, gx - Math.cos(a) * 8, gy - Math.sin(a) * 8, 1.6, "#fb7185", 0.7, 2);
    glow(ctx, gx + Math.cos(a) * 8, gy + Math.sin(a) * 8, 1.6, "#38bdf8", 0.7, 2);
  }
  for (let i = 0; i < 4; i++) {
    const y = cy - h * 0.18 + i * h * 0.12;
    arrow(ctx, cx - gap * 0.6, y, cx + gap * 0.6, y, C, { a: 0.18, w: 1, head: 3 });
  }
  label(ctx, "极化削弱内部场", 16, 16, { c: C, a: 0.6, size: 8.5 });
};

SCENES.circuit = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "current";
  if (mode === "resistance") {
    const y0 = h * 0.5;
    line(ctx, w * 0.1, y0, w * 0.9, y0, C, { a: 0.3, w: 2 });
    const rnd = rng(9);
    for (let i = 0; i < 14; i++) {
      const x = w * 0.14 + rnd() * w * 0.72;
      const y = y0 + (rnd() - 0.5) * 18;
      line(ctx, x, y - 4, x, y + 4, C, { a: 0.35, w: 1.2 });
      glow(ctx, x, y, 1.5, C, 0.25, 0);
    }
    for (let i = 0; i < 8; i++) {
      const ph = mod(t * 0.15 + i / 8, 1);
      const x = lerp(w * 0.1, w * 0.9, ph);
      glow(ctx, x, y0 + Math.sin(ph * 40 + i) * 3, 2.2, "#38bdf8", 0.8, 4);
    }
    label(ctx, "R = ρL/S", 16, 16, { c: C, a: 0.65, size: 9 });
    label(ctx, "晶格碰撞 → 发热", w - 16, 16, { c: C, a: 0.45, size: 8, align: "right" });
    return;
  }
  if (mode === "emf") {
    const x0 = w * 0.22, x1 = w * 0.78, y0 = h * 0.3, y1 = h * 0.72;
    ctx.save();
    ctx.strokeStyle = hexA(C, 0.4);
    ctx.lineWidth = 1.4;
    ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    ctx.restore();
    line(ctx, x0, h * 0.45, x0, h * 0.6, "#fb923c", { a: 0.9, w: 3 });
    line(ctx, x0 - 6, h * 0.45, x0 + 6, h * 0.45, "#fb923c", { a: 0.9, w: 1.5 });
    line(ctx, x0 - 3, h * 0.6, x0 + 3, h * 0.6, "#fb923c", { a: 0.9, w: 1.5 });
    arrow(ctx, x0, h * 0.58, x0, h * 0.47, "#fb923c", { a: 0.8, w: 1.6, head: 5 });
    label(ctx, "ε", x0 - 14, h * 0.52, { c: "#fb923c", a: 0.85, size: 9, align: "right" });
    const ph = mod(t * 0.3, 1);
    for (let i = 0; i < 6; i++) {
      const q = mod(ph + i / 6, 1);
      let x, y;
      if (q < 0.25) { x = lerp(x0, x1, q / 0.25); y = y0; }
      else if (q < 0.5) { x = x1; y = lerp(y0, y1, (q - 0.25) / 0.25); }
      else if (q < 0.75) { x = lerp(x1, x0, (q - 0.5) / 0.25); y = y1; }
      else { x = x0; y = lerp(y1, y0, (q - 0.75) / 0.25); }
      glow(ctx, x, y, 2.2, "#5eead4", 0.8, 4);
    }
    label(ctx, "电源 = 电荷泵", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  const x0 = w * 0.16, x1 = w * 0.84, y0 = h * 0.26, y1 = h * 0.74;
  ctx.save();
  ctx.strokeStyle = hexA(C, 0.4);
  ctx.lineWidth = 1.4;
  ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
  ctx.restore();
  line(ctx, x0, h * 0.45, x0, h * 0.58, "#fb923c", { a: 0.9, w: 3 });
  label(ctx, "I", w / 2, y0 - 10, { c: C, a: 0.7, size: 9, align: "center" });
  const ph = mod(t * 0.12, 1);
  for (let i = 0; i < 10; i++) {
    const q = mod(ph + i / 10, 1);
    let x, y;
    if (q < 0.25) { x = lerp(x0, x1, q / 0.25); y = y0; }
    else if (q < 0.5) { x = x1; y = lerp(y0, y1, (q - 0.25) / 0.25); }
    else if (q < 0.75) { x = lerp(x1, x0, (q - 0.5) / 0.25); y = y1; }
    else { x = x0; y = lerp(y1, y0, (q - 0.75) / 0.25); }
    glow(ctx, x, y, 2, "#38bdf8", 0.85, 4);
  }
  label(ctx, "电流 = 电荷的定向漂移", 16, 16, { c: C, a: 0.55, size: 8.5 });
};

SCENES.magnetism = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "lines";
  const cx = w / 2, cy = h / 2 + 2;
  const m = Math.min(w, h);
  if (mode === "lines") {
    const L = w * 0.16;
    const hh = Math.max(7, h * 0.05);
    ctx.save();
    ctx.fillStyle = hexA("#fb7185", 0.5);
    ctx.fillRect(cx - L, cy - hh, L, hh * 2);
    ctx.fillStyle = hexA("#38bdf8", 0.5);
    ctx.fillRect(cx, cy - hh, L, hh * 2);
    ctx.strokeStyle = hexA(C, 0.55);
    ctx.lineWidth = 1.2;
    ctx.strokeRect(cx - L, cy - hh, L * 2, hh * 2);
    ctx.restore();
    label(ctx, "N", cx - L / 2, cy, { c: "#04070c", a: 0.9, size: 9, align: "center", weight: 700 });
    label(ctx, "S", cx + L / 2, cy, { c: "#04070c", a: 0.9, size: 9, align: "center", weight: 700 });
    for (let i = 1; i <= 3; i++) {
      const rx = L * (1.2 + i * 0.36);
      const ry = hh * (2.4 + i * 1.25);
      ctx.save();
      ctx.strokeStyle = hexA(C, 0.34 - i * 0.05);
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, Math.PI, TAU);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI);
      ctx.stroke();
      ctx.restore();
      arrow(ctx, cx + rx * 0.7, cy - ry * 0.7, cx + rx * 0.78, cy - ry * 0.6, C, { a: 0.45, w: 1, head: 3 });
      arrow(ctx, cx - rx * 0.7, cy + ry * 0.7, cx - rx * 0.78, cy + ry * 0.6, C, { a: 0.45, w: 1, head: 3 });
      for (let k = 0; k < 3; k++) {
        const a = mod(t * 0.25 + i * 0.13 + k / 3, 1) * TAU;
        const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
        if (Math.abs(y - cy) < hh + 2 && Math.abs(x - cx) < L + 2) continue;
        glow(ctx, x, y, 1.4, C, 0.5, 2);
      }
    }
    label(ctx, "闭合磁感线 · 外部 N → S", 16, 16, { c: C, a: 0.55, size: 8.5 });
    return;
  }
  if (mode === "wire" || mode === "ampere") {
    line(ctx, cx, h * 0.12, cx, h * 0.88, "#fb923c", { a: 0.8, w: 2.2 });
    arrow(ctx, cx, h * 0.3, cx, h * 0.22, "#fb923c", { a: 0.8, w: 1.8, head: 6 });
    label(ctx, "I", cx + 8, h * 0.26, { c: "#fb923c", a: 0.85, size: 8.5 });
    for (let i = 0; i < 5; i++) {
      const r = 18 + i * 15;
      const a = mod(t * 0.5 + i * 0.3, 1);
      ctx.save();
      ctx.strokeStyle = hexA(C, mode === "ampere" && i === 3 ? 0.65 : 0.25);
      ctx.lineWidth = mode === "ampere" && i === 3 ? 1.6 : 1;
      if (mode === "ampere" && i === 3) ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, TAU);
      ctx.stroke();
      ctx.restore();
      glow(ctx, cx + Math.cos(a * TAU) * r, cy + Math.sin(a * TAU) * r, 1.6, C, 0.6, 2);
    }
    label(ctx, mode === "ampere" ? "∮B·dl = μ₀I" : "右手定则", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "ampereForce" || mode === "lorentz") {
    const intoPage = mode === "ampereForce";
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 4; j++) {
        const x = w * (0.1 + i * 0.11), y = h * (0.2 + j * 0.18);
        if (intoPage) {
          ctx.save();
          ctx.strokeStyle = hexA(C, 0.35);
          ctx.lineWidth = 1;
          const s = 3;
          ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s);
          ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke();
          ctx.restore();
        } else {
          arrow(ctx, x, y, x + 8, y, C, { a: 0.2, w: 1, head: 3 });
        }
      }
    }
    label(ctx, "B", w - 16, 16, { c: C, a: 0.6, size: 8.5, align: "right" });
    if (intoPage) {
      line(ctx, w * 0.3, h * 0.62, w * 0.72, h * 0.38, "#fb923c", { a: 0.85, w: 2.2 });
      arrow(ctx, w * 0.3, h * 0.62, w * 0.42, h * 0.56, "#fb923c", { a: 0.85, w: 1.8, head: 5 });
      label(ctx, "I", w * 0.36, h * 0.56, { c: "#fb923c", a: 0.85, size: 8 });
      arrow(ctx, (w * 0.3 + w * 0.72) / 2, (h * 0.62 + h * 0.38) / 2, (w * 0.3 + w * 0.72) / 2 + 26, (h * 0.62 + h * 0.38) / 2 - 26, C, { a: 0.85, w: 1.8, head: 6 });
      label(ctx, "F = IL×B", 16, 16, { c: C, a: 0.65, size: 9 });
    } else {
      const R = m * 0.22;
      ring(ctx, cx, cy, R, C, { a: 0.2, w: 1, dash: [4, 4] });
      const a = t * 1.4;
      const bx = cx + Math.cos(a) * R, by = cy + Math.sin(a) * R;
      const tx = -Math.sin(a), ty = Math.cos(a);
      glow(ctx, bx, by, 4, "#fb7185", 0.95, 10);
      arrow(ctx, bx, by, bx + tx * 26, by + ty * 26, "#fbbf24", { a: 0.85, w: 1.5, head: 5 });
      arrow(ctx, bx, by, bx - Math.cos(a) * 22, by - Math.sin(a) * 22, C, { a: 0.85, w: 1.5, head: 5 });
      label(ctx, "v", bx + tx * 30, by + ty * 30, { c: "#fbbf24", a: 0.8, size: 8 });
      label(ctx, "F = qv×B", 16, 16, { c: C, a: 0.65, size: 9 });
    }
    return;
  }
  if (mode === "moment") {
    const intoPage = 1;
    for (let i = 0; i < 20; i++) {
      const x = w * (0.08 + (i % 5) * 0.2), y = h * (0.16 + Math.floor(i / 5) * 0.2);
      ctx.save();
      ctx.strokeStyle = hexA(C, 0.25);
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x - 2, y - 2); ctx.lineTo(x + 2, y + 2);
      ctx.moveTo(x + 2, y - 2); ctx.lineTo(x - 2, y + 2); ctx.stroke();
      ctx.restore();
    }
    const tilt = 0.2 * Math.sin(0.5 * t);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt);
    ctx.strokeStyle = hexA(C, 0.85);
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(0, 0, m * 0.2, m * 0.1, 0, 0, TAU);
    ctx.stroke();
    ctx.restore();
    arrow(ctx, cx, cy, cx, cy - 34, "#e879f9", { a: 0.85, w: 1.6, head: 6 });
    label(ctx, "m", cx + 6, cy - 38, { c: "#e879f9", a: 0.85, size: 8.5 });
    label(ctx, "磁矩感受到力矩", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  if (mode === "hall") {
    const bw = w * 0.5, bh = h * 0.36;
    const bx = cx - bw / 2, by = cy - bh / 2;
    ctx.save();
    ctx.strokeStyle = hexA(C, 0.5);
    ctx.strokeRect(bx, by, bw, bh);
    ctx.fillStyle = hexA(C, 0.05);
    ctx.fillRect(bx, by, bw, bh);
    ctx.restore();
    arrow(ctx, bx, cy, bx + bw, cy, "#fb923c", { a: 0.85, w: 1.8, head: 6 });
    label(ctx, "I", bx + bw - 12, cy - 10, { c: "#fb923c", a: 0.8, size: 8 });
    for (let i = 0; i < 12; i++) {
      const x = bx + 10 + (i % 4) * bw / 4, y = by + 12 + Math.floor(i / 4) * bh / 3;
      ctx.save();
      ctx.strokeStyle = hexA(C, 0.3);
      ctx.beginPath(); ctx.moveTo(x - 2, y - 2); ctx.lineTo(x + 2, y + 2);
      ctx.moveTo(x + 2, y - 2); ctx.lineTo(x - 2, y + 2); ctx.stroke();
      ctx.restore();
    }
    for (let i = 0; i < 5; i++) {
      const x = bx + bw * (0.2 + i * 0.15);
      glow(ctx, x, by + bh - 6, 1.8, "#fb7185", 0.7, 3);
    }
    line(ctx, bx + bw / 2, by, bx + bw / 2, by - 18, C, { a: 0.5, w: 1 });
    label(ctx, "U_H", bx + bw / 2 + 4, by - 22, { c: C, a: 0.7, size: 8 });
    label(ctx, "电荷被磁场挤向一侧", 16, 16, { c: C, a: 0.55, size: 8.5 });
    return;
  }
  const rnd = rng(31);
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      const x = w * (0.12 + i * 0.15), y = h * (0.24 + j * 0.16);
      const base = rnd() * TAU;
      const align = 0.5 + 0.5 * Math.sin(t * 0.5);
      const a = lerp(base, 0, align);
      arrow(ctx, x - Math.cos(a) * 6, y - Math.sin(a) * 6, x + Math.cos(a) * 6, y + Math.sin(a) * 6, C, { a: 0.5, w: 1.1, head: 3 });
    }
  }
  for (let i = 0; i < 3; i++) arrow(ctx, w * 0.08, h * (0.2 + i * 0.24), w * 0.2, h * (0.2 + i * 0.24), C, { a: 0.25, w: 1, head: 4 });
  label(ctx, "磁畴逐渐对齐", 16, 16, { c: C, a: 0.6, size: 8.5 });
};

SCENES.induction = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "faraday";
  const cx = w / 2, cy = h / 2 + 4;
  const m = Math.min(w, h);
  const coilX = w * 0.62;
  const drawCoil = (phase, emf) => {
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.strokeStyle = hexA(C, 0.65 - i * 0.12);
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(coilX + i * 10, cy, 34, 52, 0, 0, TAU);
      ctx.stroke();
      ctx.restore();
    }
    if (emf) {
      for (let i = 0; i < 6; i++) {
        const a = mod(t * 0.7 + i / 6, 1) * TAU;
        const x = coilX + 10 + Math.cos(a) * 34;
        const y = cy + Math.sin(a) * 52;
        glow(ctx, x, y, 2, "#5eead4", 0.6, 3);
      }
    }
  };
  if (mode === "faraday" || mode === "lenz") {
    const ph = Math.sin(0.55 * t);
    const mx = coilX - 90 - 36 * (0.5 + 0.5 * Math.sin(0.55 * t));
    ctx.save();
    ctx.fillStyle = hexA("#fb7185", 0.7);
    ctx.fillRect(mx - 16, cy - 12, 32, 24);
    ctx.fillStyle = hexA("#38bdf8", 0.7);
    ctx.fillRect(mx - 16, cy + 0, 32, 12);
    ctx.restore();
    label(ctx, "N", mx - 8, cy - 3, { c: "#04070c", a: 0.9, size: 7, align: "center" });
    drawCoil(ph, true);
    const emf = Math.cos(0.55 * t);
    line(ctx, coilX - 90, cy - 52, coilX - 90, cy + 52, C, { a: 0.15, w: 1, dash: [2, 4] });
    arrow(ctx, coilX - 90, cy - 30, coilX - 90, cy - 60, C, { a: 0.4 + 0.4 * Math.abs(emf), w: 1.4, head: 5 });
    arrow(ctx, coilX - 90, cy + 30, coilX - 90, cy + 60, C, { a: 0.4 + 0.4 * Math.abs(emf), w: 1.4, head: 5 });
    label(ctx, "ε = −dΦ/dt", 16, 16, { c: C, a: 0.65, size: 9 });
    if (mode === "lenz") {
      label(ctx, emf > 0 ? "感应磁场反抗接近" : "感应磁场反抗离开", w - 16, 16, { c: C, a: 0.6, size: 8, align: "right" });
    }
    return;
  }
  if (mode === "motional") {
    const y1 = cy - h * 0.2, y2 = cy + h * 0.2;
    line(ctx, w * 0.14, y1, w * 0.86, y1, C, { a: 0.4, w: 1.4 });
    line(ctx, w * 0.14, y2, w * 0.86, y2, C, { a: 0.4, w: 1.4 });
    for (let i = 0; i < 12; i++) {
      const x = w * (0.16 + i * 0.06), y = h * (0.24 + (i % 3) * 0.2);
      if (y > y1 && y < y2) {
        ctx.save(); ctx.strokeStyle = hexA(C, 0.28);
        ctx.beginPath(); ctx.moveTo(x - 2, y - 2); ctx.lineTo(x + 2, y + 2);
        ctx.moveTo(x + 2, y - 2); ctx.lineTo(x - 2, y + 2); ctx.stroke(); ctx.restore();
      }
    }
    const rx = lerp(w * 0.3, w * 0.7, 0.5 + 0.4 * Math.sin(0.5 * t));
    line(ctx, rx, y1 - 4, rx, y2 + 4, "#fb923c", { a: 0.9, w: 2.6 });
    arrow(ctx, rx, cy, rx + 24, cy, "#fb923c", { a: 0.7, w: 1.3, head: 5 });
    label(ctx, "v", rx + 28, cy - 8, { c: "#fb923c", a: 0.75, size: 8 });
    for (let i = 0; i < 5; i++) {
      glow(ctx, lerp(w * 0.14, w * 0.86, mod(t * 0.4 + i / 5, 1)), y2, 2, C, 0.5, 2);
    }
    label(ctx, "ε = BLv", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "induced") {
    const loopR = m * 0.24;
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.9);
    ring(ctx, cx, cy, loopR, C, { a: 0.55, w: 1.6 });
    for (let i = 0; i < 16; i++) {
      const a = i / 16 * TAU;
      glow(ctx, cx + Math.cos(a) * loopR, cy + Math.sin(a) * loopR, 1.6, C, 0.2 + 0.5 * pulse, 2);
    }
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * TAU;
      const rr = loopR * 0.7;
      ctx.save();
      ctx.strokeStyle = hexA("#fb7185", 0.25 + 0.3 * pulse);
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * rr - 3, cy + Math.sin(a) * rr - 3);
      ctx.lineTo(cx + Math.cos(a) * rr + 3, cy + Math.sin(a) * rr + 3);
      ctx.moveTo(cx + Math.cos(a) * rr + 3, cy + Math.sin(a) * rr - 3);
      ctx.lineTo(cx + Math.cos(a) * rr - 3, cy + Math.sin(a) * rr + 3); ctx.stroke();
      ctx.restore();
    }
    const a = t * 1.2;
    glow(ctx, cx + Math.cos(a + Math.PI / 2) * loopR, cy + Math.sin(a + Math.PI / 2) * loopR, 2.6, "#38bdf8", 0.9, 6);
    label(ctx, "变化的 B → 感生电场", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  if (mode === "self") {
    const ramp = Math.sin(0.5 * t);
    drawCoil(ramp, true);
    const arrowA = ramp > 0;
    arrow(ctx, coilX - 50, cy - 10, coilX - 50, cy - 40, C, { a: 0.8, w: 1.4, head: 5 });
    arrow(ctx, coilX - 76, cy - 40, coilX - 76, cy - 10, "#fb7185", { a: 0.8, w: 1.4, head: 5, dash: [4, 3] });
    label(ctx, "I 上升 → 反电动势阻止它", 16, 16, { c: C, a: 0.6, size: 8 });
    label(ctx, arrowA ? "电流增加" : "电流减少", w - 16, 16, { c: C, a: 0.5, size: 8, align: "right" });
    return;
  }
  if (mode === "displace") {
    const gap = m * 0.22;
    line(ctx, cx - gap, cy - h * 0.24, cx - gap, cy + h * 0.24, "#fb7185", { a: 0.8, w: 3 });
    line(ctx, cx + gap, cy - h * 0.24, cx + gap, cy + h * 0.24, "#38bdf8", { a: 0.8, w: 3 });
    const e = 0.5 + 0.5 * Math.sin(t * 1.1);
    for (let i = 0; i < 4; i++) {
      const y = cy - h * 0.15 + i * h * 0.1;
      arrow(ctx, cx - gap + 8, y, cx + gap - 8, y, C, { a: 0.2 + 0.5 * e, w: 1.2, head: 4 });
    }
    for (let i = 0; i < 2; i++) {
      ring(ctx, cx, cy, 22 + i * 10, C, { a: 0.3 + 0.3 * e, w: 1.2, dash: [4, 4] });
    }
    label(ctx, "位移电流：dE/dt ≠ 0", 16, 16, { c: C, a: 0.65, size: 8.5 });
    return;
  }
  const V = view(w, h * 0.7, 0, 6, -1.2, 1.2, 16);
  const z = x => Math.sin(x * 1.8 - t * 1.6);
  line(ctx, V.X(0), V.Y(0), V.X(6), V.Y(0), C, { a: 0.15, w: 1 });
  plot(ctx, V, z, 0, 6, C, { a: 0.9, w: 1.7 });
  plot(ctx, V, x => Math.cos(x * 1.8 - t * 1.6) * 0.6, 0, 6, "#38bdf8", { a: 0.6, w: 1.2 });
  const eqs = ["∇·E = ρ/ε₀", "∇·B = 0", "∇×E = −∂B/∂t", "∇×B = μ₀J + μ₀ε₀∂E/∂t"];
  const idx = Math.floor(mod(t, 8) / 2);
  label(ctx, eqs[idx], 16, 16, { c: C, a: 0.75, size: 9 });
  label(ctx, "四个方程统一电、磁、光", w - 16, h - 14, { c: C, a: 0.4, size: 8, align: "right" });
};

SCENES.emwave = function (ctx, w, h, t, p, C) {
  const x0 = w * 0.08, x1 = w * 0.92;
  const yc = h * 0.52;
  const A = h * 0.24;
  line(ctx, x0, yc, x1, yc, C, { a: 0.2, w: 1 });
  const Bpts = [], Epts = [];
  for (let i = 0; i <= 90; i++) {
    const u = i / 90;
    const x = lerp(x0, x1, u);
    const ph = u * 4 * Math.PI - t * 2.2;
    Epts.push([x, yc - Math.sin(ph) * A]);
    Bpts.push([x, yc + Math.sin(ph) * A * 0.55 + h * 0.1]);
  }
  path(ctx, Bpts, "#38bdf8", { a: 0.5, w: 1.3 });
  path(ctx, Epts, C, { a: 0.95, w: 1.8 });
  for (let i = 4; i <= 86; i += 9) {
    const u = i / 90;
    const x = lerp(x0, x1, u), ph = u * 4 * Math.PI - t * 2.2;
    arrow(ctx, x, yc, x, yc - Math.sin(ph) * A, C, { a: 0.25, w: 1, head: 3 });
    arrow(ctx, x, yc, x + Math.sin(ph) * A * 0.4, yc + Math.sin(ph) * A * 0.28 + h * 0.1, "#38bdf8", { a: 0.2, w: 1, head: 3 });
  }
  label(ctx, "E", x1 - 8, yc - A - 8, { c: C, a: 0.85, size: 9, align: "right" });
  label(ctx, "B", x1 - 8, yc + A * 0.55 + h * 0.1 + 10, { c: "#38bdf8", a: 0.85, size: 9, align: "right" });
  label(ctx, "c", x1 - 4, yc, { c: "#fbbf24", a: 0.7, size: 8, align: "right" });
  label(ctx, "E ⊥ B · 同相 · 以 c 前进", 16, 16, { c: C, a: 0.55, size: 8.5 });
};
