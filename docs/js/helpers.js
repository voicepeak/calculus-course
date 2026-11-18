"use strict";

const TAU = Math.PI * 2;
const SCENES = {};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = t => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
const easeOut = t => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
const mod = (a, n) => ((a % n) + n) % n;
const seq = (t, dur) => mod(t, dur) / dur;

function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
}

function line(ctx, x1, y1, x2, y2, c, o = {}) {
  const w = o.w == null ? 1.4 : o.w, a = o.a == null ? 1 : o.a;
  ctx.save();
  ctx.strokeStyle = hexA(c, a);
  ctx.lineWidth = w;
  if (o.dash) ctx.setLineDash(o.dash);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function path(ctx, pts, c, o = {}) {
  const w = o.w == null ? 1.5 : o.w, a = o.a == null ? 1 : o.a;
  if (!pts.length) return;
  ctx.save();
  ctx.strokeStyle = hexA(c, a);
  ctx.lineWidth = w;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  if (o.dash) ctx.setLineDash(o.dash);
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  if (o.close) ctx.closePath();
  if (o.fill) { ctx.fillStyle = hexA(c, o.fill); ctx.fill(); }
  if (o.stroke !== false) ctx.stroke();
  ctx.restore();
}

function arrow(ctx, x1, y1, x2, y2, c, o = {}) {
  const w = o.w == null ? 1.6 : o.w, a = o.a == null ? 1 : o.a;
  const head = o.head == null ? 7 : o.head;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len < 0.4) return;
  const hd = Math.min(head, len * 0.55);
  ctx.save();
  ctx.strokeStyle = hexA(c, a);
  ctx.fillStyle = hexA(c, a);
  ctx.lineWidth = w;
  ctx.lineCap = "round";
  if (o.dash) ctx.setLineDash(o.dash);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2 - Math.cos(ang) * hd * 0.55, y2 - Math.sin(ang) * hd * 0.55);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - Math.cos(ang - 0.42) * hd, y2 - Math.sin(ang - 0.42) * hd);
  ctx.lineTo(x2 - Math.cos(ang + 0.42) * hd, y2 - Math.sin(ang + 0.42) * hd);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function glow(ctx, x, y, r, c, a = 1, blur = 13) {
  ctx.save();
  ctx.shadowColor = hexA(c, a);
  ctx.shadowBlur = blur;
  ctx.fillStyle = hexA(c, a);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function ring(ctx, x, y, r, c, o = {}) {
  const w = o.w == null ? 1.2 : o.w, a = o.a == null ? 1 : o.a;
  ctx.save();
  ctx.strokeStyle = hexA(c, a);
  ctx.lineWidth = w;
  if (o.dash) ctx.setLineDash(o.dash);
  ctx.beginPath();
  ctx.arc(x, y, Math.max(0.1, r), 0, TAU);
  ctx.stroke();
  ctx.restore();
}

function label(ctx, text, x, y, o = {}) {
  const c = o.c || "#8fa3ba";
  const a = o.a == null ? 1 : o.a;
  const size = o.size || 10.5;
  ctx.save();
  ctx.fillStyle = hexA(c, a);
  ctx.font = (o.weight || 400) + " " + size + "px " + (o.serif ? '"Songti SC",Georgia,serif' : (o.sans ? '"Microsoft YaHei",sans-serif' : '"Cascadia Mono",Consolas,monospace'));
  ctx.textAlign = o.align || "left";
  ctx.textBaseline = o.base || "middle";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function view(w, h, x0, x1, y0, y1, pad = 16) {
  return {
    w, h, x0, x1, y0, y1,
    X: x => pad + (x - x0) / (x1 - x0) * (w - pad * 2),
    Y: y => h - pad - (y - y0) / (y1 - y0) * (h - pad * 2)
  };
}

function plot(ctx, V, f, x0, x1, c, o = {}) {
  const n = o.n || 130;
  const pts = [];
  let open = false;
  for (let i = 0; i <= n; i++) {
    const x = x0 + (x1 - x0) * i / n;
    let y;
    try { y = f(x); } catch (e) { y = NaN; }
    if (!isFinite(y) || y < V.y0 - 900 || y > V.y1 + 900) { open = false; continue; }
    if (!open) { pts.length = 0; open = true; }
    pts.push([V.X(x), V.Y(y)]);
  }
  path(ctx, pts, c, o);
}

function area(ctx, V, f, x0, x1, c, o = {}) {
  const n = o.n || 90;
  const base = o.base == null ? V.y0 : o.base;
  const pts = [[V.X(x0), V.Y(base)]];
  for (let i = 0; i <= n; i++) {
    const x = x0 + (x1 - x0) * i / n;
    const y = clamp(f(x), V.y0 - 3, V.y1 + 3);
    pts.push([V.X(x), V.Y(y)]);
  }
  pts.push([V.X(x1), V.Y(base)]);
  path(ctx, pts, c, { fill: o.a == null ? 0.16 : o.a, stroke: false, close: true });
}

function axes(ctx, V, c, o = {}) {
  const a = o.a == null ? 0.5 : o.a;
  if (V.y0 < 0 && V.y1 > 0) line(ctx, V.X(V.x0), V.Y(0), V.X(V.x1), V.Y(0), c, { a, w: 1 });
  const ay = o.axisY == null ? 0 : o.axisY;
  line(ctx, V.X(V.x0), V.Y(ay), V.X(V.x1), V.Y(ay), c, { a, w: 1 });
  line(ctx, V.X(0), V.Y(V.y0), V.X(0), V.Y(V.y1), c, { a, w: 1 });
}

function bracket(ctx, x1, y1, x2, y2, c, text, o = {}) {
  label(ctx, text, (x1 + x2) / 2 + (o.dx || 0), (y1 + y2) / 2 + (o.dy || -10), { c, size: 9.5, align: "center", a: o.a == null ? 0.95 : o.a });
}

function cross(ctx, x, y, s, c, a = 1) {
  line(ctx, x - s, y, x + s, y, c, { a, w: 1 });
  line(ctx, x, y - s, x, y + s, c, { a, w: 1 });
}

function rng(seed) {
  let s = seed % 2147483647;
  return () => {
    s = s * 16807 % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function spring(ctx, x1, y, x2, amp, coils, c, a = 0.8) {
  const n = coils * 12;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    pts.push([lerp(x1, x2, u), y + Math.sin(u * coils * TAU) * amp]);
  }
  path(ctx, pts, c, { a, w: 1.2 });
}

function iso(w, h, s = 1, o = {}) {
  const cx = w / 2 + (o.dx || 0), cy = h / 2 + (o.dy || 0);
  const k = s * Math.min(w, h) * 0.4;
  return (x, y, z) => [cx + (x - y) * 0.8 * k, cy + (x + y) * 0.34 * k - z * 0.62 * k];
}

function waveform(ctx, X0, Y0, X1, amp, k, phase, c, o = {}) {
  const pts = [];
  const n = o.n || 90;
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    pts.push([lerp(X0, X1, u), Y0 + Math.sin(u * k + phase) * amp]);
  }
  path(ctx, pts, c, o);
}

function pulseDot(ctx, x, y, r, c, t, blur = 12) {
  glow(ctx, x, y, r, c, 0.95, blur);
  ring(ctx, x, y, r + 2 + 2 * Math.sin(t * 3), c, { a: 0.25, w: 1 });
}
