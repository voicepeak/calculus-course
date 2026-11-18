SCENES.wave = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "travel";
  if (mode === "types") {
    const y1 = h * 0.32, y2 = h * 0.74;
    const pts = [];
    for (let i = 0; i <= 60; i++) {
      const u = i / 60;
      pts.push([lerp(w * 0.08, w * 0.92, u), y1 + Math.sin(u * 6 * Math.PI - t * 2) * h * 0.1]);
    }
    path(ctx, pts, C, { a: 0.8, w: 1.6 });
    pts.forEach((q, i) => { if (i % 4 === 0) glow(ctx, q[0], q[1], 1.8, C, 0.6, 3); });
    label(ctx, "横波：振动 ⊥ 传播", w * 0.08, h * 0.12, { c: C, a: 0.6, size: 8 });
    for (let i = 0; i < 34; i++) {
      const u = i / 34;
      const x = lerp(w * 0.08, w * 0.92, u) + Math.sin(u * 6 * Math.PI - t * 2) * 8;
      glow(ctx, x, y2, 1.7, C, 0.55, 2);
    }
    label(ctx, "纵波：振动 ∥ 传播（疏密）", w * 0.08, h * 0.9, { c: C, a: 0.6, size: 8 });
    return;
  }
  if (mode === "front") {
    const sx = w * 0.14, sy = h * 0.55;
    glow(ctx, sx, sy, 4, C, 0.9, 12);
    for (let i = 1; i <= 4; i++) {
      const ph = mod(t * 0.25 + i / 4, 1);
      ring(ctx, sx, sy, ph * w * 0.78, C, { a: 0.4 * (1 - ph), w: 1.2 });
    }
    for (let i = 0; i < 7; i++) {
      const a = -0.7 + i / 6 * 1.4;
      line(ctx, sx + Math.cos(a) * 20, sy + Math.sin(a) * 20, sx + Math.cos(a) * w * 0.8, sy + Math.sin(a) * w * 0.8, C, { a: 0.16, w: 1, dash: [5, 6] });
    }
    label(ctx, "波前 / 波面", w * 0.55, h * 0.18, { c: C, a: 0.6, size: 8 });
    label(ctx, "波线", sx + 30, sy - 40, { c: C, a: 0.45, size: 8 });
    return;
  }
  if (mode === "energy") {
    const V = view(w, h * 0.7, 0, 4, -1.2, 1.2, 16);
    const A = 0.55 + 0.35 * (0.5 + 0.5 * Math.sin(0.45 * t));
    plot(ctx, V, x => A * Math.sin(x * 3 - t * 2), 0, 4, C, { a: 0.9, w: 1.7 });
    for (let i = 0; i <= 12; i++) {
      const x = i / 12 * 4;
      const y = A * Math.sin(x * 3 - t * 2);
      glow(ctx, V.X(x), V.Y(y), 1.8, C, 0.5, 2);
      line(ctx, V.X(x), V.Y(0), V.X(x), V.Y(y), C, { a: 0.12, w: 1 });
    }
    const bar = A / 0.9;
    line(ctx, w * 0.1, h - 14, w * 0.9, h - 14, C, { a: 0.15, w: 1 });
    line(ctx, w * 0.1, h - 14, w * 0.1 + w * 0.8 * bar * bar, h - 14, C, { a: 0.85, w: 2.4 });
    label(ctx, "强度 ∝ 振幅²", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  const V = view(w, h, 0, 4, -1.3, 1.3, 18);
  line(ctx, V.X(0), V.Y(0), V.X(4), V.Y(0), C, { a: 0.14, w: 1 });
  plot(ctx, V, x => Math.sin(3 * x - t * 2.2), 0, 4, C, { a: 0.95, w: 1.8 });
  const lam = TAU / 3;
  const xb = 1.2;
  line(ctx, V.X(xb), V.Y(-1.15), V.X(xb + lam), V.Y(-1.15), C, { a: 0.5, w: 1.1 });
  line(ctx, V.X(xb), V.Y(-1.15) - 3, V.X(xb), V.Y(-1.15) + 3, C, { a: 0.5, w: 1.1 });
  line(ctx, V.X(xb + lam), V.Y(-1.15) - 3, V.X(xb + lam), V.Y(-1.15) + 3, C, { a: 0.5, w: 1.1 });
  label(ctx, "λ", V.X(xb + lam / 2), V.Y(-1.15) + 12, { c: C, a: 0.75, size: 8.5, align: "center" });
  arrow(ctx, w * 0.12, h * 0.2, w * 0.32, h * 0.2, C, { a: 0.6, w: 1.3, head: 5 });
  label(ctx, "v = λf", w * 0.33, h * 0.2, { c: C, a: 0.6, size: 8 });
  const xd = mod(t * 0.3, 1);
  glow(ctx, V.X(xd * 4), V.Y(Math.sin(3 * xd * 4 - t * 2.2)), 2.4, C, 0.8, 5);
};

SCENES.huygens = function (ctx, w, h, t, p, C) {
  const x0 = w * 0.16;
  const y0 = h * 0.2, y1 = h * 0.8;
  line(ctx, x0, y0, x0, y1, C, { a: 0.7, w: 1.6 });
  for (let i = 0; i <= 8; i++) {
    const y = lerp(y0, y1, i / 8);
    glow(ctx, x0, y, 1.8, C, 0.6, 3);
  }
  const ph = mod(t * 0.22, 1);
  const r = ph * w * 0.7;
  for (let i = 0; i <= 8; i++) {
    const y = lerp(y0, y1, i / 8);
    ctx.save();
    ctx.strokeStyle = hexA(C, 0.28 * (1 - ph * 0.6));
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x0, y, Math.max(0.1, r), -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.restore();
  }
  line(ctx, x0 + r, y0, x0 + r, y1, C, { a: 0.55, w: 1.4, dash: [6, 5] });
  label(ctx, "子波包络 = 新波前", 16, 16, { c: C, a: 0.65, size: 8.5 });
  if (p.mode === "fresnel") {
    for (let i = 0; i < 4; i++) {
      const y = lerp(y0 + 10, y1 - 10, i / 3);
      glow(ctx, x0 + r + 6, y, 2, C, 0.5 + 0.4 * Math.sin(t * 2 + i), 3);
    }
    label(ctx, "子波相干叠加 → 衍射图样", w - 16, 16, { c: C, a: 0.45, size: 8, align: "right" });
  }
};

SCENES.superposition = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "add";
  if (mode === "add") {
    const V = view(w, h, 0, 4, -2.2, 2.2, 16);
    line(ctx, V.X(0), V.Y(0), V.X(4), V.Y(0), C, { a: 0.12, w: 1 });
    plot(ctx, V, x => Math.sin(x * 3 - t * 2), 0, 4, C, { a: 0.3, w: 1.1 });
    plot(ctx, V, x => 0.6 * Math.sin(x * 5.2 + t * 1.3 + 1), 0, 4, C, { a: 0.3, w: 1.1 });
    plot(ctx, V, x => Math.sin(x * 3 - t * 2) + 0.6 * Math.sin(x * 5.2 + t * 1.3 + 1), 0, 4, C, { a: 0.95, w: 1.8 });
    label(ctx, "位移直接相加", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  if (mode === "interf") {
    const s1 = [w * 0.24, h * 0.46], s2 = [w * 0.24, h * 0.66];
    [s1, s2].forEach(s => glow(ctx, s[0], s[1], 3, C, 0.9, 8));
    for (let k = 0; k < 4; k++) {
      const ph = mod(t * 0.3 + k / 4, 1);
      [s1, s2].forEach(s => ring(ctx, s[0], s[1], ph * w * 0.7, C, { a: 0.22 * (1 - ph), w: 1 }));
    }
    const scr = w * 0.9;
    for (let i = 0; i < 40; i++) {
      const y = h * 0.12 + (h * 0.76) * i / 39;
      const r1 = Math.hypot(scr - s1[0], y - s1[1]);
      const r2 = Math.hypot(scr - s2[0], y - s2[1]);
      const v = Math.cos((r1 - r2) * 0.07);
      const inten = v * v;
      glow(ctx, scr, y, 1.4, C, 0.1 + 0.7 * inten, 0);
    }
    label(ctx, "相干叠加 → 明暗条纹", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  if (mode === "standing") {
    const V = view(w, h, 0, 4, -2, 2, 16);
    line(ctx, V.X(0), V.Y(0), V.X(4), V.Y(0), C, { a: 0.12, w: 1 });
    plot(ctx, V, x => Math.sin(2.4 * x - t * 2), 0, 4, C, { a: 0.18, w: 1 });
    plot(ctx, V, x => -Math.sin(2.4 * x + t * 2), 0, 4, C, { a: 0.18, w: 1 });
    plot(ctx, V, x => 2 * Math.sin(2.4 * x) * Math.cos(t * 2), 0, 4, C, { a: 0.95, w: 1.8 });
    for (let k = 0; k <= 3; k++) {
      const x = k * Math.PI / 2.4;
      if (x > 4) break;
      glow(ctx, V.X(x), V.Y(0), 2.4, "#fb7185", 0.8, 5);
      label(ctx, "节", V.X(x), V.Y(0) + 12, { c: "#fb7185", a: 0.55, size: 7, align: "center" });
    }
    label(ctx, "波节不动，波腹振荡", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  if (mode === "reflect") {
    const cy = h * 0.5;
    const wall = w * 0.88;
    line(ctx, wall, cy - 40, wall, cy + 40, C, { a: 0.5, w: 2 });
    const cyc = seq(t, 6);
    let xc, amp;
    if (cyc < 0.5) { xc = lerp(w * 0.12, wall, cyc / 0.5); amp = 1; }
    else { xc = lerp(wall, w * 0.12, (cyc - 0.5) / 0.5); amp = -1; }
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const x = lerp(w * 0.08, wall, i / 80);
      const d = (x - xc) / (w * 0.09);
      pts.push([x, cy - amp * Math.exp(-d * d) * h * 0.14]);
    }
    path(ctx, pts, C, { a: 0.9, w: 1.8 });
    label(ctx, "固定端反射 → 相位翻转 π", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  const srcY = h * 0.62;
  const sx = w * 0.5 + Math.sin(t * 0.4) * w * 0.16 * (mod(t, 20) < 20 ? 1 : 1);
  for (let i = 0; i < 14; i++) {
    const te = t - i * 0.45;
    if (te < 0) continue;
    const sxE = w * 0.5 + Math.sin(te * 0.4) * w * 0.22;
    const r = (t - te) * w * 0.12;
    if (r < 2 || r > w) continue;
    ring(ctx, sxE, srcY, r, C, { a: 0.4 * Math.max(0, 1 - r / w), w: 1.1 });
  }
  glow(ctx, sx, srcY, 5, C, 1, 12);
  arrow(ctx, sx - 20, srcY + 26, sx, srcY + 26, C, { a: 0.6, w: 1.4, head: 5 });
  label(ctx, "前方波前更密 → 频率更高", 16, 16, { c: C, a: 0.6, size: 8.5 });
};

SCENES.optics = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "refract";
  if (mode === "path") {
    const y1 = h * 0.3, y2 = h * 0.64;
    const slabX = w * 0.44, slabW = w * 0.24;
    ctx.save();
    ctx.fillStyle = hexA(C, 0.08);
    ctx.fillRect(slabX, h * 0.16, slabW, h * 0.68);
    ctx.strokeStyle = hexA(C, 0.35);
    ctx.strokeRect(slabX, h * 0.16, slabW, h * 0.68);
    ctx.restore();
    label(ctx, "n", slabX + slabW / 2, h * 0.1, { c: C, a: 0.5, size: 8, align: "center" });
    for (const y of [y1, y2]) {
      line(ctx, w * 0.08, y, w * 0.92, y, C, { a: 0.4, w: 1.2 });
      for (let i = 0; i < 5; i++) {
        const x = w * 0.08 + (w * 0.84) * mod(t * 0.25 + i / 5, 1);
        glow(ctx, x, y, 1.6, C, 0.5, 2);
      }
    }
    const V = view(w, h, 0, 6, -1, 1, 0);
    const off = (slabW / w * 0.84) * 0.785 * 6;
    label(ctx, "光程 = n × 路程", 16, 16, { c: C, a: 0.65, size: 8.5 });
    label(ctx, "两束光相位错开 → 干涉", w - 16, 16, { c: C, a: 0.45, size: 8, align: "right" });
    return;
  }
  const yl = h * 0.48;
  line(ctx, w * 0.06, yl, w * 0.94, yl, C, { a: 0.4, w: 1.3 });
  const tg = mode === "tir" ? "介质 2 · n₂ = 1" : "介质 1 · n₁ = 1";
  const bg = mode === "tir" ? "介质 1 · n₁ = 1.5" : "介质 2 · n₂ = 1.9";
  label(ctx, tg, w * 0.08, yl - 10, { c: C, a: 0.4, size: 8 });
  label(ctx, bg, w * 0.08, yl + 18, { c: C, a: 0.4, size: 8 });
  const ox = w * 0.5;
  line(ctx, ox, yl - 50, ox, yl + 50, C, { a: 0.2, w: 1, dash: [4, 4] });
  if (mode === "refract") {
    const n1 = 1, n2 = 1.9;
    const th = 0.55 + 0.35 * Math.sin(0.4 * t);
    const ix = ox - Math.sin(th) * 90, iy = yl - Math.cos(th) * 90;
    line(ctx, ix, iy, ox, yl, "#fde047", { a: 0.9, w: 1.8 });
    const th2 = Math.asin(Math.sin(th) * n1 / n2);
    line(ctx, ox, yl, ox + Math.sin(th2) * 90, yl + Math.cos(th2) * 90, "#fde047", { a: 0.9, w: 1.8 });
    glow(ctx, ox, yl, 2.6, "#fde047", 0.9, 8);
    label(ctx, "入射", ix - 4, iy + 16, { c: "#fde047", a: 0.5, size: 7.5, align: "center" });
    label(ctx, "折射", ox + 30, yl + 56, { c: "#fde047", a: 0.5, size: 7.5 });
    label(ctx, "n₁sinθ₁ = n₂sinθ₂", 16, 16, { c: C, a: 0.65, size: 8.5 });
    return;
  }
  const n1 = 1.5, n2 = 1;
  const th = 0.3 + 0.5 * (0.5 + 0.5 * Math.sin(0.45 * t));
  const ix = ox - Math.sin(th) * 90, iy = yl + Math.cos(th) * 90;
  line(ctx, ix, iy, ox, yl, "#fde047", { a: 0.9, w: 1.8 });
  const sin2 = Math.sin(th) * n1 / n2;
  const tir = sin2 > 1;
  if (!tir) {
    const th2 = Math.asin(sin2);
    line(ctx, ox, yl, ox + Math.sin(th2) * 90, yl - Math.cos(th2) * 90, "#fde047", { a: 0.9 * Math.max(0.15, 1 - sin2), w: 1.8 });
  }
  if (tir || sin2 > 0.9) {
    line(ctx, ox, yl, ox + Math.sin(th) * 90, yl + Math.cos(th) * 90, "#fde047", { a: tir ? 0.9 : 0.25, w: 1.8 });
    if (tir) label(ctx, "全反射", ox + 52, yl + 42, { c: "#fde047", a: 0.9, size: 8.5 });
  }
  glow(ctx, ox, yl, 2.6, "#fde047", 0.9, 8);
  label(ctx, tir ? "超过临界角，光全部返回" : "入射角增大中…", 16, 16, { c: C, a: 0.6, size: 8 });
  label(ctx, "θc ≈ 41.8°", w - 16, 16, { c: C, a: 0.45, size: 7.5, align: "right" });
};

SCENES.interference = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "double";
  if (mode === "film") {
    if (Math.floor(mod(t, 10) / 5) === 0) {
      const y0 = h * 0.34, y1 = h * 0.58;
      const xa = w * 0.12, xb = w * 0.88;
      line(ctx, xa, y0, xb, y0, C, { a: 0.5, w: 1.4 });
      line(ctx, xa, y1, xb, y0 + 6, C, { a: 0.5, w: 1.4 });
      for (let i = 0; i < 18; i++) {
        const x = lerp(xa, xb, i / 18);
        const d = (x - xa) / (xb - xa);
        const inten = 0.5 + 0.5 * Math.cos(d * 26 + t * 0.4);
        glow(ctx, x, y0 + (y1 - y0) * d * 0.6, 1.6 + inten * 2, C, 0.15 + inten * 0.6, 3);
      }
      for (let i = 0; i < 3; i++) {
        const x = w * 0.3 + i * w * 0.2;
        line(ctx, x, h * 0.14, x, y0, "#fde047", { a: 0.35, w: 1.1 });
      }
      label(ctx, "劈尖：膜厚决定明暗", 16, 16, { c: C, a: 0.6, size: 8.5 });
    } else {
      const cx = w / 2, cy = h * 0.5;
      for (let i = 0; i < 6; i++) {
        const r = 8 + i * 11 + 2 * Math.sin(t + i);
        ring(ctx, cx, cy, r, C, { a: 0.4 + 0.25 * (i % 2), w: 1.4 });
      }
      glow(ctx, cx, cy, 2.4, C, 0.7, 6);
      label(ctx, "牛顿环：等厚干涉条纹", 16, 16, { c: C, a: 0.6, size: 8.5 });
    }
    return;
  }
  const wallX = w * 0.3;
  const s1 = [wallX, h * 0.4], s2 = [wallX, h * 0.62];
  line(ctx, wallX, h * 0.12, wallX, h * 0.36, C, { a: 0.3, w: 1.2 });
  line(ctx, wallX, h * 0.44, wallX, h * 0.58, C, { a: 0.3, w: 1.2 });
  line(ctx, wallX, h * 0.66, wallX, h * 0.9, C, { a: 0.3, w: 1.2 });
  for (let k = 0; k < 4; k++) {
    const ph = mod(t * 0.28 + k / 4, 1);
    [s1, s2].forEach(s => {
      ctx.save();
      ctx.strokeStyle = hexA(C, 0.24 * (1 - ph));
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(s[0], s[1], ph * w * 0.62, -1.05, 1.05);
      ctx.stroke();
      ctx.restore();
    });
  }
  const scrX = w * 0.9;
  line(ctx, scrX, h * 0.1, scrX, h * 0.9, C, { a: 0.2, w: 1 });
  for (let i = 0; i < 46; i++) {
    const y = h * 0.12 + (h * 0.76) * i / 45;
    const r1 = Math.hypot(scrX - s1[0], y - s1[1]);
    const r2 = Math.hypot(scrX - s2[0], y - s2[1]);
    const inten = Math.pow(Math.cos((r1 - r2) * 0.075), 2);
    glow(ctx, scrX, y, 1.5, C, 0.08 + 0.8 * inten, 0);
  }
  label(ctx, "双缝：两列相干光相加", 16, 16, { c: C, a: 0.6, size: 8.5 });
};

SCENES.diffraction = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "single";
  if (mode === "res") {
    const V = view(w, h, -2.2, 2.2, 0, 1.25, 20);
    const sep = 1.3 - 1.05 * (0.5 + 0.5 * Math.sin(0.35 * t));
    const f = (x, c) => Math.exp(-Math.pow((x - c) / 0.28, 2));
    plot(ctx, V, x => f(x, -sep / 2), -2.1, 2.1, C, { a: 0.35, w: 1.2 });
    plot(ctx, V, x => f(x, sep / 2), -2.1, 2.1, "#fb923c", { a: 0.35, w: 1.2 });
    plot(ctx, V, x => f(x, -sep / 2) + f(x, sep / 2), -2.1, 2.1, C, { a: 0.95, w: 1.8 });
    label(ctx, "两光点靠近 → 逐渐糊在一起", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  const slitX = w * 0.22;
  const cy = h * 0.5;
  if (mode === "single") {
    const gap = h * 0.3;
    line(ctx, slitX, h * 0.06, slitX, cy - gap / 2, C, { a: 0.45, w: 1.4 });
    line(ctx, slitX, cy + gap / 2, slitX, h * 0.94, C, { a: 0.45, w: 1.4 });
    for (let i = 0; i <= 6; i++) {
      const y = cy - gap / 2 + gap * i / 6;
      const rr = mod(t * 0.3 + i * 0.09, 1) * w * 0.7;
      ctx.save();
      ctx.strokeStyle = hexA(C, 0.18);
      ctx.beginPath();
      ctx.arc(slitX, y, rr, -0.9, 0.9);
      ctx.stroke();
      ctx.restore();
    }
    const scrX = w * 0.86;
    for (let i = 0; i < 40; i++) {
      const yy = h * 0.1 + h * 0.8 * i / 39;
      const beta = (yy - cy) * 0.09;
      const inten = Math.abs(beta) < 1e-4 ? 1 : Math.pow(Math.sin(beta) / beta, 2);
      glow(ctx, scrX, yy, 1.4, C, 0.06 + 0.75 * inten, 0);
    }
    label(ctx, "单缝衍射 · 中央宽亮纹", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  line(ctx, slitX, h * 0.08, slitX, h * 0.24, C, { a: 0.5, w: 2 });
  for (let i = 0; i < 9; i++) {
    const y = h * 0.26 + i * h * 0.055;
    line(ctx, slitX, y, slitX, y + 3, C, { a: 0.85, w: 2 });
  }
  line(ctx, slitX, h * 0.76, slitX, h * 0.92, C, { a: 0.5, w: 2 });
  for (let i = 0; i < 5; i++) {
    const y = h * 0.16 + i * h * 0.14;
    const x = w * 0.06 + mod(t * 8, 1) * 8;
    arrow(ctx, x, y, x + 26, y, C, { a: 0.25, w: 1, head: 4 });
  }
  const scrX = w * 0.9;
  line(ctx, scrX, h * 0.08, scrX, h * 0.92, C, { a: 0.18, w: 1 });
  const pattern = [];
  for (let i = 0; i <= 70; i++) {
    const yy = h * 0.1 + h * 0.8 * i / 70;
    const beta = (yy - cy) * 0.16;
    const inten = Math.pow(Math.sin(4 * beta) / (4 * Math.sin(beta + 1e-5)), 2);
    pattern.push([scrX - inten * 50, yy]);
  }
  path(ctx, pattern, C, { a: 0.7, w: 1.2 });
  for (let i = 0; i < 4; i++) {
    const yy = cy + (i - 1.5) * h * 0.1;
    glow(ctx, scrX, yy, 2, C, 0.8, 4);
    line(ctx, scrX, yy, w * 0.98, yy, C, { a: 0.25, w: 1 });
  }
  label(ctx, "光栅衍射 · 锐利主极大", 16, 16, { c: C, a: 0.6, size: 8.5 });
};

SCENES.polarization = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "wave";
  const cy = h * 0.52;
  if (mode === "wave") {
    const filtX = w * 0.55;
    line(ctx, filtX, h * 0.16, filtX, h * 0.84, C, { a: 0.35, w: 2 });
    for (let i = 0; i < 6; i++) line(ctx, filtX, h * (0.2 + i * 0.12), filtX, h * (0.24 + i * 0.12), C, { a: 0.5, w: 1 });
    const pts = [];
    for (let i = 0; i <= 50; i++) {
      const u = i / 50;
      const x = lerp(w * 0.08, filtX - 8, u);
      const a = Math.sin(u * 9 - t * 2.2);
      const ang = 0.7;
      pts.push([x, cy - Math.sin(ang) * a * h * 0.2]);
    }
    path(ctx, pts, C, { a: 0.6, w: 1.4 });
    for (let i = 4; i <= 46; i += 7) {
      const u = i / 50;
      const x = lerp(w * 0.08, filtX - 8, u);
      const a = Math.sin(u * 9 - t * 2.2);
      const ang = 0.7;
      const ex = x + Math.cos(ang) * a * 20, ey = cy - Math.sin(ang) * a * h * 0.2;
      line(ctx, x, cy, ex, ey, C, { a: 0.3, w: 1 });
    }
    const pts2 = [];
    for (let i = 0; i <= 30; i++) {
      const u = i / 30;
      const x = lerp(filtX + 8, w * 0.92, u);
      pts2.push([x, cy - Math.sin(u * 9 - t * 2.2) * h * 0.2]);
    }
    path(ctx, pts2, C, { a: 0.9, w: 1.7 });
    label(ctx, "偏振片只放行一个方向", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  if (mode === "malus") {
    const V = view(w, h * 0.62, 0, Math.PI / 2, 0, 1.15, 16);
    line(ctx, V.X(0), V.Y(0), V.X(Math.PI / 2), V.Y(0), C, { a: 0.18, w: 1 });
    plot(ctx, V, x => Math.pow(Math.cos(x), 2), 0, Math.PI / 2, C, { a: 0.8, w: 1.5 });
    const th = mod(t * 0.5, Math.PI / 2);
    const inten = Math.pow(Math.cos(th), 2);
    glow(ctx, V.X(th), V.Y(inten), 3, C, 1, 9);
    label(ctx, "I = I₀cos²θ", 16, 16, { c: C, a: 0.7, size: 9 });
    const bx = w * 0.2, by = h - 18, bw = w * 0.6;
    line(ctx, bx, by, bx + bw, by, C, { a: 0.15, w: 1 });
    line(ctx, bx, by, bx + bw * inten, by, C, { a: 0.9, w: 2.4 });
    return;
  }
  const yl = h * 0.5;
  line(ctx, w * 0.06, yl, w * 0.94, yl, C, { a: 0.35, w: 1.2 });
  const ox = w * 0.52;
  const thB = Math.atan(1.5);
  line(ctx, ox, yl - 50, ox, yl + 50, C, { a: 0.18, w: 1, dash: [3, 4] });
  line(ctx, ox - 100, yl - 100, ox, yl, "#fde047", { a: 0.9, w: 1.8 });
  line(ctx, ox, yl, ox + 60, yl - 90, "#fb7185", { a: 0.9, w: 1.8 });
  line(ctx, ox, yl, ox + 90, yl + 30, "#fde047", { a: 0.6, w: 1.4 });
  for (let i = 0; i < 4; i++) glow(ctx, ox + 20 + i * 9, yl - 30 - i * 20, 1.6, "#fb7185", 0.8, 3);
  label(ctx, "反射光完全偏振", ox + 20, yl - 80, { c: "#fb7185", a: 0.8, size: 8 });
  label(ctx, "θB = arctan(n₂/n₁)", 16, 16, { c: C, a: 0.65, size: 8.5 });
};

SCENES.quantum = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "psi";
  const cy = h / 2 + 2;
  if (mode === "planck") {
    const V = view(w, h, 200, 2400, 0, 1.15, 20);
    const Ts = [3200, 4500, 6500];
    const idx = Math.floor(mod(t, 12) / 4);
    const planck = (lam, T) => {
      const x = lam / 1000;
      const v = 1 / (Math.pow(x, 5) * (Math.exp(1.44 / (x * T / 1000)) - 1));
      return v;
    };
    Ts.forEach((T, i) => {
      const peak = Math.max(...Array.from({ length: 80 }, (_, k) => planck(200 + k * 27, T)));
      const on = i === idx;
      plot(ctx, V, l => planck(l, T) / peak, 250, 2380, C, { a: on ? 0.95 : 0.16, w: on ? 1.8 : 1.1 });
    });
    label(ctx, "T = " + Ts[idx] + " K", 16, 16, { c: C, a: 0.8, size: 9 });
    line(ctx, V.X(200), V.Y(0), V.X(2380), V.Y(0), C, { a: 0.18, w: 1 });
    label(ctx, "波长 λ", w - 16, V.Y(0) + 12, { c: C, a: 0.45, size: 8, align: "right" });
    return;
  }
  if (mode === "quantum") {
    const x0 = w * 0.24, x1 = w * 0.8;
    for (let i = 0; i <= 4; i++) {
      const y = h * 0.24 + i * h * 0.13;
      line(ctx, x0, y, x1, y, C, { a: 0.35, w: 1.2 });
      label(ctx, (i === 0 ? "E₀" : i + "hν"), x0 - 8, y, { c: C, a: 0.55, size: 7.5, align: "right" });
    }
    for (let i = 0; i < 3; i++) {
      const ph = mod(t * 0.4 + i / 3, 1);
      const x = lerp(x1, x0, ph);
      const y = h * 0.24 + 4 * h * 0.13 * ph;
      glow(ctx, x, y, 2.6, C, 0.8, 5);
    }
    label(ctx, "能量一份一份 E = hν", 16, 16, { c: C, a: 0.65, size: 8.5 });
    return;
  }
  if (mode === "photoelec") {
    const plateY = h * 0.66;
    line(ctx, w * 0.2, plateY, w * 0.8, plateY, "#fb923c", { a: 0.8, w: 4 });
    for (let i = 0; i < 4; i++) {
      const ph = mod(t * 0.7 + i / 4, 1);
      const x = w * 0.3 + i * w * 0.13;
      const y = lerp(h * 0.1, plateY, ph);
      glow(ctx, x, y, 2.4, "#fde047", 0.8, 6);
    }
    const high = Math.floor(mod(t, 8) / 4) === 1;
    if (high) {
      for (let i = 0; i < 4; i++) {
        const ph = mod(t * 0.5 + i / 4, 1);
        const y = plateY - ph * h * 0.5;
        glow(ctx, w * 0.4 + i * w * 0.1, y, 2, "#5eead4", 0.8, 4);
      }
      label(ctx, "ν > ν₀ → 打出电子", w - 16, 16, { c: "#5eead4", a: 0.8, size: 8, align: "right" });
    } else {
      label(ctx, "ν < ν₀ → 没有电子", w - 16, 16, { c: "#fb7185", a: 0.8, size: 8, align: "right" });
    }
    label(ctx, "光强只改数量，频率决定能量", 16, 16, { c: C, a: 0.5, size: 8 });
    return;
  }
  if (mode === "photon") {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const u = i / 40;
      const x = lerp(w * 0.08, w * 0.5, u);
      pts.push([x, cy + Math.sin(u * 20 - t * 2) * h * 0.12]);
    }
    path(ctx, pts, C, { a: 0.4, w: 1.4 });
    for (let i = 0; i < 4; i++) {
      const ph = mod(t * 0.4 + i / 4, 1);
      const x = lerp(w * 0.52, w * 0.92, ph);
      glow(ctx, x, cy, 3, C, 0.85, 7);
      line(ctx, x - 8, cy, x + 8, cy, C, { a: 0.25, w: 1 });
    }
    label(ctx, "光 = 一包包能量子", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  if (mode === "compton") {
    const ex = w * 0.38, ey = cy + h * 0.1;
    glow(ctx, ex, ey, 4.5, "#5eead4", 0.9, 10);
    arrow(ctx, w * 0.1, ey - h * 0.22, ex - 8, ey - 8, "#fde047", { a: 0.8, w: 1.6, head: 5 });
    label(ctx, "λ", w * 0.1, ey - h * 0.28, { c: "#fde047", a: 0.8, size: 8 });
    const a = lerp(0.15, 0.9, 0.5 + 0.5 * Math.sin(0.5 * t));
    const sx = ex + Math.cos(a) * 90, sy = ey - Math.sin(a) * 90;
    arrow(ctx, ex + 8, ey - 8, sx, sy, "#fb923c", { a: 0.85, w: 1.6, head: 6 });
    label(ctx, "λ′ > λ", sx + 4, sy - 8, { c: "#fb923c", a: 0.85, size: 8 });
    arrow(ctx, ex, ey, ex + 50, ey + 28, "#5eead4", { a: 0.7, w: 1.3, head: 5 });
    label(ctx, "康普顿散射", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  if (mode === "broglie") {
    const x = lerp(w * 0.15, w * 0.8, mod(t * 0.12, 1));
    glow(ctx, x, cy, 4, C, 1, 10);
    const lam = 40 + 30 * Math.sin(0.4 * t);
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const xx = x - i * 2.2;
      if (xx < 8) break;
      pts.push([xx, cy + Math.sin((x - xx) / lam * TAU) * 10 * (1 - i / 45)]);
    }
    path(ctx, pts, C, { a: 0.3, w: 1.2 });
    label(ctx, "λ = h/p", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "uncert") {
    const s = 0.5 + 0.5 * Math.sin(0.35 * t);
    const sigmaX = lerp(0.16, 0.4, s);
    const sigmaP = lerp(0.4, 0.16, s);
    const baseY = h * 0.66;
    const panels = [
      { x0: w * 0.06, x1: w * 0.44, sigma: sigmaX, name: "位置 Δx", sub: s < 0.5 ? "窄" : "宽" },
      { x0: w * 0.56, x1: w * 0.94, sigma: sigmaP, name: "动量 Δp", sub: s < 0.5 ? "宽" : "窄" }
    ];
    panels.forEach((pn, idx) => {
      line(ctx, pn.x0, baseY, pn.x1, baseY, C, { a: 0.3, w: 1 });
      const c = (pn.x0 + pn.x1) / 2;
      const pts2 = [];
      for (let i = 0; i <= 60; i++) {
        const u = i / 60;
        const x = lerp(pn.x0, pn.x1, u);
        const g = Math.exp(-Math.pow((x - c) / (pn.sigma * (pn.x1 - pn.x0) * 0.5), 2));
        pts2.push([x, baseY - g * h * 0.3]);
      }
      path(ctx, pts2, idx === 0 ? C : "#fb923c", { a: 0.9, w: 1.6 });
      const half = pn.sigma * (pn.x1 - pn.x0) * 0.5 * Math.sqrt(2) * 0.9;
      line(ctx, c - half, baseY + 7, c + half, baseY + 7, idx === 0 ? C : "#fb923c", { a: 0.6, w: 1.2 });
      line(ctx, c - half, baseY + 3, c - half, baseY + 11, idx === 0 ? C : "#fb923c", { a: 0.6, w: 1 });
      line(ctx, c + half, baseY + 3, c + half, baseY + 11, idx === 0 ? C : "#fb923c", { a: 0.6, w: 1 });
      label(ctx, pn.name + " " + pn.sub, c, baseY + 22, { c: idx === 0 ? C : "#fb923c", a: 0.7, size: 7.5, align: "center" });
    });
    line(ctx, w * 0.5, h * 0.2, w * 0.5, h * 0.8, C, { a: 0.06, w: 1 });
    label(ctx, "Δx · Δp ≥ ℏ/2", 16, 16, { c: C, a: 0.75, size: 8.5 });
    label(ctx, "一边压窄，另一边必然变宽", w - 16, 16, { c: C, a: 0.4, size: 7.5, align: "right" });
    return;
  }
  if (mode === "well" || mode === "psi") {
    const wx0 = w * 0.16, wx1 = w * 0.84;
    const base = h * 0.72;
    const top = h * 0.18;
    line(ctx, wx0, top, wx0, base, C, { a: 0.5, w: 1.6 });
    line(ctx, wx1, top, wx1, base, C, { a: 0.5, w: 1.6 });
    line(ctx, wx0, base, wx1, base, C, { a: 0.3, w: 1 });
    const n = 1 + Math.floor(mod(t, 8) / 2) % 4;
    const pts = [], prob = [];
    for (let i = 0; i <= 80; i++) {
      const u = i / 80;
      const x = lerp(wx0, wx1, u);
      const s = Math.sin(n * Math.PI * u);
      pts.push([x, base - h * 0.16 - s * h * 0.1]);
      prob.push([x, base - Math.abs(s) * h * 0.16]);
    }
    if (mode === "psi") {
      line(ctx, wx0, base - h * 0.16, wx1, base - h * 0.16, C, { a: 0.12, w: 1, dash: [3, 4] });
      path(ctx, pts, C, { a: 0.9, w: 1.6 });
      ctx.save();
      ctx.fillStyle = hexA("#fb923c", 0.09);
      ctx.beginPath();
      ctx.moveTo(prob[0][0], base);
      prob.forEach(q => ctx.lineTo(q[0], q[1]));
      ctx.lineTo(prob[prob.length - 1][0], base);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      path(ctx, prob, "#fb923c", { a: 0.65, w: 1.2 });
      label(ctx, "ψ", wx0 + 6, base - h * 0.3, { c: C, a: 0.8, size: 8 });
      label(ctx, "|ψ|²", wx0 + 6, base - h * 0.05, { c: "#fb923c", a: 0.8, size: 8 });
      label(ctx, "n = " + n, w - 16, 16, { c: C, a: 0.6, size: 8.5, align: "right" });
    } else {
      for (let k = 1; k <= 4; k++) {
        const y = base - k * k * h * 0.045;
        line(ctx, wx0, y, wx1, y, C, { a: k === n ? 0.7 : 0.18, w: k === n ? 1.5 : 1 });
      }
      const pp = [];
      for (let i = 0; i <= 80; i++) {
        const u = i / 80;
        pp.push([lerp(wx0, wx1, u), base - n * n * h * 0.045 + Math.sin(n * Math.PI * u) * h * 0.03]);
      }
      path(ctx, pp, C, { a: 0.9, w: 1.6 });
      label(ctx, "Eₙ ∝ n²", 16, 16, { c: C, a: 0.7, size: 9 });
      label(ctx, "n = " + n, w - 16, 16, { c: C, a: 0.6, size: 8.5, align: "right" });
    }
    return;
  }
  if (mode === "tunnel") {
    const bx0 = w * 0.42, bx1 = w * 0.58;
    const bTop = h * 0.26, bBot = h * 0.74;
    ctx.save();
    ctx.fillStyle = hexA(C, 0.1);
    ctx.fillRect(bx0, bTop, bx1 - bx0, bBot - bTop);
    ctx.strokeStyle = hexA(C, 0.5);
    ctx.strokeRect(bx0, bTop, bx1 - bx0, bBot - bTop);
    ctx.restore();
    const mid = (bTop + bBot) / 2;
    const pts = [];
    for (let i = 0; i <= 100; i++) {
      const u = i / 100;
      const x = lerp(w * 0.06, w * 0.94, u);
      let amp = 1, k = 40;
      if (x > bx0 && x < bx1) { amp = Math.exp(-(x - bx0) / (bx1 - bx0) * 3.2); }
      if (x >= bx1) amp = Math.exp(-3.2);
      pts.push([x, mid - Math.sin(u * 30 - t * 3) * h * 0.16 * amp]);
    }
    path(ctx, pts, C, { a: 0.9, w: 1.6 });
    label(ctx, "隧穿：波没有归零", 16, 16, { c: C, a: 0.65, size: 8.5 });
    return;
  }
  if (mode === "qn") {
    const ax = w / 2, ay = h * 0.56;
    glow(ctx, ax, ay, 3, "#fde047", 0.9, 8);
    for (let n = 1; n <= 3; n++) {
      ring(ctx, ax, ay, 16 + n * 18, C, { a: n === 3 ? 0.5 : 0.2, w: 1.2, dash: [3, 4] });
    }
    const a = t * 1.1;
    const R = 16 + 18 * 3;
    glow(ctx, ax + Math.cos(a) * R, ay + Math.sin(a) * R * 0.55, 2.6, "#38bdf8", 0.9, 6);
    label(ctx, "n 主量子数 · l · m · s", 16, 16, { c: C, a: 0.6, size: 8 });
    return;
  }
  if (mode === "pauli") {
    const x0 = w * 0.24, x1 = w * 0.76;
    for (let i = 0; i < 4; i++) {
      const y = h * 0.24 + i * h * 0.16;
      line(ctx, x0, y, x1, y, C, { a: 0.35, w: 1.2 });
      label(ctx, "E" + (i + 1), x0 - 8, y, { c: C, a: 0.55, size: 7.5, align: "right" });
      glow(ctx, x0 + 20, y - 5, 2, "#fb7185", 0.7, 3);
      glow(ctx, x0 + 34, y + 5, 2, "#38bdf8", 0.7, 3);
      if (i < 2) { glow(ctx, x1 - 20, y - 5, 2, "#fb7185", 0.7, 3); glow(ctx, x1 - 34, y + 5, 2, "#38bdf8", 0.7, 3); }
    }
    label(ctx, "一个态最多两个电子（自旋相反）", 16, 16, { c: C, a: 0.6, size: 8 });
    return;
  }
  if (mode === "invert") {
    const base = h * 0.78;
    const lowX = w * 0.28, highX = w * 0.62;
    const inv = 0.5 + 0.45 * Math.sin(0.4 * t);
    const lowN = 1 - inv * 0.75, highN = inv * 0.75;
    [[lowX, lowN, "低能级"], [highX, highN, "高能级"]].forEach(([x, v, nm]) => {
      line(ctx, x, base, x, h * 0.2, C, { a: 0.15, w: 1 });
      ctx.fillStyle = hexA(C, 0.35);
      ctx.fillRect(x - 18, base - v * h * 0.5, 36, v * h * 0.5);
      label(ctx, nm, x, base + 14, { c: C, a: 0.55, size: 7.5, align: "center" });
    });
    label(ctx, inv > 0.6 ? "粒子数反转 → 增益" : "正常分布", 16, 16, { c: C, a: 0.65, size: 8.5 });
    return;
  }
  if (mode === "stim" || mode === "laser") {
    const lx = w * 0.2, rx = w * 0.8;
    line(ctx, lx, h * 0.2, lx, h * 0.8, C, { a: 0.4, w: 2 });
    line(ctx, rx, h * 0.2, rx, h * 0.8, C, { a: 0.4, w: 2 });
    for (let i = 0; i < 4; i++) {
      const y = h * (0.3 + i * 0.13);
      glow(ctx, lx + 12, y, 1.8, "#fb7185", 0.5, 2);
    }
    const ph = mod(t * 0.5, 1);
    for (let i = 0; i < 3; i++) {
      const x = lerp(lx + 10, rx - 10, mod(ph + i / 3, 1));
      glow(ctx, x, h * 0.5, 2.4, "#fde047", 0.9, 5);
    }
    for (let i = 1; i <= 3; i++) {
      glow(ctx, lx + 10 + i * 20, h * 0.5, 1.8, "#fde047", 0.45, 2);
    }
    label(ctx, mode === "laser" ? "光子在镜间来回放大" : "一个光子诱发两个相同光子", 16, 16, { c: C, a: 0.6, size: 8 });
    return;
  }
};

SCENES.relativity = function (ctx, w, h, t, p, C) {
  const mode = p.mode || "clock";
  const cy = h / 2 + 2;
  if (mode === "lorentz" || mode === "simul") {
    if (mode === "simul") {
      const trainY = h * 0.52;
      const beta = 0.4;
      const tx = lerp(w * 0.15, w * 0.72, 0.5 + 0.4 * Math.sin(0.4 * t));
      const carL = w * 0.26, carH = h * 0.18;
      ctx.save();
      ctx.strokeStyle = hexA(C, 0.5);
      ctx.strokeRect(tx - carL / 2, trainY - carH, carL, carH);
      ctx.restore();
      const fl = tx - carL / 2, fr = tx + carL / 2;
      glow(ctx, fl, trainY - carH / 2, 2.6, "#fde047", 0.9, 6);
      glow(ctx, fr, trainY - carH / 2, 2.6, "#fde047", 0.9, 6);
      const mid = (fl + fr) / 2;
      glow(ctx, mid, trainY - carH / 2, 2.6, "#5eead4", 0.8, 5);
      const rr = mod(t * 0.8, 1) * w * 0.32;
      ring(ctx, fl, trainY - carH / 2, rr, "#fde047", { a: 0.2, w: 1 });
      ring(ctx, fr, trainY - carH / 2, rr, "#fde047", { a: 0.2, w: 1 });
      label(ctx, "地面看：两端光同时出发，但中点已向右移动", 16, 16, { c: C, a: 0.55, size: 7.8 });
      return;
    }
    const ox = w * 0.34, oy = h * 0.8;
    const S = Math.min(w, h) * 0.64;
    const beta = 0.18 + 0.37 * (0.5 + 0.5 * Math.sin(0.32 * t));
    const al = Math.atan(beta);
    const ex = [Math.cos(al), -Math.sin(al)];
    const et = [Math.sin(al), -Math.cos(al)];
    ctx.save();
    ctx.beginPath();
    ctx.rect(w * 0.03, h * 0.04, w * 0.94, h * 0.9);
    ctx.clip();
    for (let k = -4; k <= 4; k++) {
      line(ctx, ox + k * S * 0.15, oy, ox + k * S * 0.15, oy - S, C, { a: 0.05, w: 1 });
      line(ctx, ox, oy - k * S * 0.15, ox + S, oy - k * S * 0.15, C, { a: 0.05, w: 1 });
    }
    for (let k = -3; k <= 3; k++) {
      const c1 = [ox + k * S * 0.15 * ex[0], oy + k * S * 0.15 * ex[1]];
      line(ctx, c1[0] - et[0] * S, c1[1] - et[1] * S, c1[0] + et[0] * S, c1[1] + et[1] * S, C, { a: 0.14, w: 1 });
      const c2 = [ox + k * S * 0.15 * et[0], oy + k * S * 0.15 * et[1]];
      line(ctx, c2[0] - ex[0] * S, c2[1] - ex[1] * S, c2[0] + ex[0] * S, c2[1] + ex[1] * S, C, { a: 0.14, w: 1 });
    }
    ctx.restore();
    arrow(ctx, ox, oy, ox + S * 0.9, oy, C, { a: 0.5, w: 1.2, head: 5 });
    arrow(ctx, ox, oy, ox, oy - S * 0.9, C, { a: 0.5, w: 1.2, head: 5 });
    line(ctx, ox, oy, ox + S * 0.82, oy - S * 0.82, C, { a: 0.35, w: 1, dash: [5, 5] });
    line(ctx, ox, oy, ox + S * 0.82, oy + S * 0.82, C, { a: 0.08, w: 1, dash: [5, 5] });
    arrow(ctx, ox, oy, ox + ex[0] * S * 0.72, oy + ex[1] * S * 0.72, "#fb923c", { a: 0.9, w: 1.6, head: 6 });
    arrow(ctx, ox, oy, ox + et[0] * S * 0.72, oy + et[1] * S * 0.72, "#fb923c", { a: 0.9, w: 1.6, head: 6 });
    label(ctx, "x", ox + S * 0.78, oy + 14, { c: C, a: 0.55, size: 8 });
    label(ctx, "ct", ox - 12, oy - S * 0.8, { c: C, a: 0.55, size: 8, align: "right" });
    label(ctx, "x′", ox + ex[0] * S * 0.78 + 6, oy + ex[1] * S * 0.78, { c: "#fb923c", a: 0.85, size: 8 });
    label(ctx, "ct′", ox + et[0] * S * 0.78 + 6, oy + et[1] * S * 0.78, { c: "#fb923c", a: 0.85, size: 8 });
    label(ctx, "β = " + beta.toFixed(2), 16, 16, { c: C, a: 0.7, size: 8.5 });
    label(ctx, "光锥 45° 不动，坐标轴被速度捏斜", w - 16, 16, { c: C, a: 0.4, size: 7.5, align: "right" });
    return;
  }
  if (mode === "c") {
    const y1 = h * 0.42, y2 = h * 0.7;
    [[w * 0.16, "地面系"], [w * 0.6, "运动系"]].forEach(([x0, nm], i) => {
      const ph = mod(t * 0.5 + i * 0.1, 1);
      glow(ctx, x0, y1, 3.4, "#fde047", 0.9, 8);
      ring(ctx, x0, y1, 6 + ph * 24, "#fde047", { a: 0.5 * (1 - ph), w: 1.2 });
      arrow(ctx, x0, y1, x0 + 30 + i * 18, y1, C, { a: 0.3, w: 1, head: 4 });
      label(ctx, nm, x0 - 6, y2, { c: C, a: 0.5, size: 8 });
      label(ctx, "c", x0 + 34, y1 - 8, { c: "#fde047", a: 0.8, size: 8.5 });
    });
    label(ctx, "两边的光速读数都是 c", 16, 16, { c: C, a: 0.6, size: 8.5 });
    return;
  }
  if (mode === "clock") {
    const drawClock = (x0, moving) => {
      const top = h * 0.22, bot = h * 0.72;
      const period = moving ? 3.3 : 2.1;
      const xAt = tt => x0 + (moving ? Math.sin(tt * 0.55) * w * 0.055 : 0);
      const yAt = tt => {
        const ph = mod(tt / period, 2);
        const f = ph < 1 ? ph : 2 - ph;
        return lerp(top + 3, bot - 3, f);
      };
      const pts = [];
      for (let i = 0; i <= 26; i++) {
        const tt = t - (26 - i) * 0.019 * period;
        pts.push([xAt(tt), yAt(tt)]);
      }
      path(ctx, pts, moving ? "#fde047" : C, { a: moving ? 0.35 : 0.4, w: 1.2 });
      const xc = xAt(t);
      line(ctx, xc - 17, top, xc + 17, top, C, { a: 0.55, w: 2 });
      line(ctx, xc - 17, bot, xc + 17, bot, C, { a: 0.55, w: 2 });
      glow(ctx, xAt(t), yAt(t), 2.8, "#fde047", 0.95, 8);
    };
    drawClock(w * 0.3, false);
    drawClock(w * 0.72, true);
    label(ctx, "静止钟", w * 0.3, h * 0.84, { c: C, a: 0.55, size: 8, align: "center" });
    label(ctx, "运动钟：光的路径更长，所以更慢", w * 0.72, h * 0.84, { c: C, a: 0.55, size: 8, align: "center" });
    label(ctx, "时间膨胀", 16, 16, { c: C, a: 0.65, size: 9 });
    return;
  }
  if (mode === "length") {
    const v = 0.5 + 0.4 * Math.sin(0.35 * t);
    const gamma = 1 / Math.sqrt(1 - v * v);
    const full = w * 0.62, half = full / gamma;
    const cx = w / 2;
    line(ctx, cx - half / 2, cy - 10, cx + half / 2, cy - 10, "#9fb0c4", { a: 0.25, w: 3, dash: [5, 4] });
    line(ctx, cx - full / 2, cy + 10, cx + full / 2, cy + 10, C, { a: 0.9, w: 3 });
    for (let i = 0; i <= 8; i++) {
      const x = cx - full / 2 + full * i / 8;
      line(ctx, x, cy + 4, x, cy + 16, C, { a: 0.4, w: 1 });
    }
    label(ctx, "L = L₀/γ", 16, 16, { c: C, a: 0.7, size: 9 });
    label(ctx, "运动前方的尺子变短", w - 16, 16, { c: C, a: 0.45, size: 8, align: "right" });
    return;
  }
  if (mode === "mass") {
    const V = view(w, h, 0, 1, 0, 4.5, 22);
    const f = vv => 1 / Math.sqrt(Math.max(0.001, 1 - vv * vv));
    plot(ctx, V, f, 0, 0.985, C, { a: 0.9, w: 1.7 });
    line(ctx, V.X(0), V.Y(0), V.X(1), V.Y(0), C, { a: 0.2, w: 1 });
    const v = 0.55 + 0.4 * (0.5 + 0.5 * Math.sin(0.4 * t));
    const e = f(v);
    line(ctx, V.X(v), V.Y(0), V.X(v), V.Y(e), C, { a: 0.4, w: 1, dash: [3, 4] });
    glow(ctx, V.X(v), V.Y(e), 3, C, 1, 9);
    label(ctx, "E = γmc²", 16, 16, { c: C, a: 0.7, size: 9 });
    label(ctx, "v → c 时能量暴增", w - 16, 16, { c: C, a: 0.45, size: 8, align: "right" });
    return;
  }
  const cx2 = w / 2;
  glow(ctx, cx2, cy, 8 + 3 * Math.sin(t * 2), "#fde047", 0.8, 20);
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * TAU;
    const r = 30 + mod(t * 30 + i * 4, 60);
    glow(ctx, cx2 + Math.cos(a) * r, cy + Math.sin(a) * r, 1.6, "#fde047", 0.5 * (1 - (r - 30) / 60), 2);
  }
  label(ctx, "E = mc²", cx2, cy, { c: "#04070c", a: 0.9, size: 9, align: "center", weight: 700 });
  label(ctx, "质量就是能量", 16, 16, { c: C, a: 0.6, size: 8.5 });
};
