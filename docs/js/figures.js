"use strict";

(function () {
  const ACCENT = {
    lim: "#5eead4", der: "#fbbf24", int: "#4ade80", field: "#a78bfa", ser: "#60a5fa",
    ode: "#f472b6", geo: "#9fb0c4", mec: "#fb7185", flu: "#22d3ee", th: "#fb923c",
    em: "#38bdf8", wav: "#818cf8", opt: "#fde047", q: "#e879f9", rel: "#f59e0b"
  };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const norm = s => s.replace(/[\s·\-–—()（）:：]/g, "").toLowerCase();
  const byTerm = new Map(TERMS.map(t => [norm(t.zh), t]));
  const chapterById = {};
  CHAPTERS.forEach(c => { chapterById[c.id] = c; });

  TERMS.forEach((term, i) => {
    term._acc = ACCENT[term.ch] || "#5eead4";
    let hash = 0;
    const key = term.en + term.zh;
    for (let k = 0; k < key.length; k++) hash = (hash * 33 + key.charCodeAt(k)) % 997;
    term._phase = hash / 89;
  });

  const active = new Set();
  const modal = document.getElementById("viz-modal");
  const vizCanvas = document.getElementById("viz-canvas");
  const vizKicker = document.getElementById("viz-kicker");
  const vizTitle = document.getElementById("viz-title");
  const vizEn = document.getElementById("viz-en");
  const vizD = document.getElementById("viz-d");
  const vizFormula = document.getElementById("viz-formula");
  const vizCap = document.getElementById("viz-cap");
  let openTerm = null;

  function sizeCanvas(cv) {
    const rect = cv.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
    }
    const ctx = cv.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  function draw(cv, t) {
    const term = cv._term;
    if (!term || !cv.isConnected) return;
    const rect = cv.getBoundingClientRect();
    if (rect.width < 4 || rect.height < 4) return;
    const { ctx, w, h } = sizeCanvas(cv);
    ctx.clearRect(0, 0, w, h);
    const scene = SCENES[term.viz];
    if (!scene) return;
    try {
      scene(ctx, w, h, t, term.p || {}, term._acc);
    } catch (err) {
      console.error(term.zh, err);
    }
  }

  function openFigure(term) {
    openTerm = term;
    const ch = chapterById[term.ch];
    vizKicker.textContent = (ch ? ch.num + " · " + ch.zh : "");
    vizTitle.textContent = term.zh;
    vizEn.textContent = term.en;
    vizD.textContent = term.d;
    vizCap.textContent = term.c;
    vizFormula.innerHTML = "";
    vizFormula.hidden = true;
    const tex = FORMULAS[term.zh];
    if (tex && typeof katex !== "undefined") {
      try {
        katex.render(tex, vizFormula, { displayMode: true, throwOnError: false });
        vizFormula.hidden = false;
      } catch (err) {
        vizFormula.hidden = true;
      }
    }
    vizCanvas._term = term;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => draw(vizCanvas, reduceMotion ? 1.4 : performance.now() / 1000));
    modal.querySelector(".viz-close").focus({ preventScroll: true });
  }

  function closeFigure() {
    modal.hidden = true;
    document.body.style.overflow = "";
    openTerm = null;
    vizCanvas._term = null;
  }

  function makePlate(term) {
    const fig = document.createElement("figure");
    fig.className = "plate inline-figure";
    fig.tabIndex = 0;
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "放大图：" + term.zh);
    const frame = document.createElement("div");
    frame.className = "plate-figure";
    const cv = document.createElement("canvas");
    cv._term = term;
    cv.setAttribute("aria-hidden", "true");
    frame.appendChild(cv);
    const cap = document.createElement("figcaption");
    const zh = document.createElement("span");
    zh.textContent = term.zh;
    const en = document.createElement("span");
    en.className = "en";
    en.textContent = term.en;
    cap.append(zh, en);
    fig.append(frame, cap);
    fig.addEventListener("click", () => openFigure(term));
    fig.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFigure(term);
      }
    });
    return fig;
  }

  const SECTION_OVERRIDES = {
    "理想气体状态方程": "系统、状态参量与理想气体",
    "隐函数求导": "隐函数与参数方程求导"
  };

  function firstTarget(prose, term) {
    const full = norm(term.zh);
    const parts = term.zh.split("·").map(s => norm(s)).filter(Boolean);
    const matches = text => full && text.includes(full) || parts.some(p => p && text.includes(p));
    const heads = Array.from(prose.querySelectorAll("h4"));
    const wanted = SECTION_OVERRIDES[term.zh];
    const head = wanted
      ? heads.find(h => norm(h.textContent || "").includes(norm(wanted)))
      : heads.find(h => matches(norm(h.textContent || "")));
    if (head) {
      let block = head.nextElementSibling;
      while (block && block.classList && block.classList.contains("plate")) block = block.nextElementSibling;
      return block || head;
    }
    for (const child of Array.from(prose.children)) {
      if (child.classList && child.classList.contains("plate")) continue;
      if (matches(norm(child.textContent || ""))) return child;
    }
    return null;
  }

  function insertAfter(prose, fig, block) {
    let anchor = block.nextSibling;
    while (anchor && anchor.nodeType === 1 && anchor.classList && anchor.classList.contains("plate")) {
      anchor = anchor.nextSibling;
    }
    prose.insertBefore(fig, anchor);
  }

  function buildPlates() {
    document.querySelectorAll(".entry").forEach(entry => {
      const names = (entry.dataset.terms || "").split("|").map(s => s.trim()).filter(Boolean);
      const terms = names.map(n => byTerm.get(norm(n))).filter(Boolean);
      if (!terms.length) return;
      const head = document.createElement("header");
      head.className = "entry-head";
      Array.from(entry.children).forEach(child => {
        if (child.classList.contains("entry-meta") || child.classList.contains("entry-title") || child.classList.contains("entry-en")) {
          head.appendChild(child);
        }
      });
      if (head.children.length) entry.insertBefore(head, entry.firstChild);
      const prose = entry.querySelector(".prose");
      if (!prose) return;
      terms.forEach(term => {
        const fig = makePlate(term);
        const target = firstTarget(prose, term);
        if (!target) prose.appendChild(fig);
        else insertAfter(prose, fig, target);
      });
    });
  }

  function observePlates() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const cv = e.target.querySelector("canvas");
        if (!cv) return;
        if (e.isIntersecting) {
          if (reduceMotion) draw(cv, 1.2);
          else active.add(cv);
        } else {
          active.delete(cv);
        }
      });
    }, { rootMargin: "260px 0px", threshold: 0.01 });
    document.querySelectorAll(".plate").forEach(p => io.observe(p));
  }

  function setupModal() {
    modal.querySelectorAll("[data-viz-close]").forEach(el => el.addEventListener("click", closeFigure));
    document.addEventListener("keydown", e => {
      if (!modal.hidden && e.key === "Escape") closeFigure();
    });
  }

  function loop(ts) {
    const t = ts / 1000;
    active.forEach(cv => {
      const entry = cv.closest(".entry");
      if (entry && entry.hidden) return;
      draw(cv, t + cv._term._phase);
    });
    if (!modal.hidden && openTerm) draw(vizCanvas, t + openTerm._phase);
    requestAnimationFrame(loop);
  }

  buildPlates();
  observePlates();
  setupModal();
  if (!reduceMotion) requestAnimationFrame(loop);
})();
