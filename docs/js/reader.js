"use strict";

(function () {
  const entries = Array.from(document.querySelectorAll(".entry"));
  const chapters = Array.from(document.querySelectorAll(".chapter")).filter(ch => ch.id !== "term-index");
  const searchInput = document.getElementById("search");
  const searchCount = document.getElementById("search-count");
  const tocNav = document.getElementById("toc-nav");
  const tocMobileNav = document.getElementById("toc-mobile-nav");
  const tocNote = document.querySelector(".toc-note");
  const mobileToc = document.querySelector(".toc-mobile");

  function plainTitle(entry) {
    if (entry.dataset.toc) return entry.dataset.toc;
    return entry.querySelector(".entry-title").textContent
      .replace(/\\[()]/g, "")
      .replace(/[\\{}]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function buildToc() {
    chapters.forEach(ch => {
      const num = ch.dataset.num || "";
      const title = ch.dataset.title || "";
      const a = document.createElement("a");
      a.className = "toc-chapter";
      a.href = "#" + ch.id;
      a.dataset.chapter = ch.id;
      a.innerHTML = '<span class="num">' + num + '</span><span>' + title + '</span>';
      tocNav.appendChild(a);

      const entriesWrap = document.createElement("div");
      entriesWrap.className = "toc-entries";
      ch.querySelectorAll(".entry").forEach(entry => {
        const ea = document.createElement("a");
        ea.className = "toc-entry";
        ea.href = "#" + entry.id;
        ea.textContent = plainTitle(entry);
        entriesWrap.appendChild(ea);
      });
      tocNav.appendChild(entriesWrap);

      const ma = document.createElement("a");
      ma.className = "toc-chapter";
      ma.href = "#" + ch.id;
      ma.innerHTML = '<span class="num">' + num + '</span><span>' + title + '</span>';
      tocMobileNav.appendChild(ma);
      ch.querySelectorAll(".entry").forEach(entry => {
        const ea = document.createElement("a");
        ea.className = "toc-entry";
        ea.href = "#" + entry.id;
        ea.textContent = plainTitle(entry);
        tocMobileNav.appendChild(ea);
      });
    });
    if (mobileToc) {
      tocMobileNav.addEventListener("click", e => {
        if (e.target.closest("a")) mobileToc.open = false;
      });
    }
  }

  function buildIndex() {
    const host = document.getElementById("term-index-body");
    if (!host) return;
    let totalTerms = 0;
    chapters.forEach(ch => {
      const group = document.createElement("div");
      group.className = "term-group";
      const h = document.createElement("h4");
      h.textContent = (ch.dataset.num ? ch.dataset.num + " · " : "") + (ch.dataset.title || "");
      group.appendChild(h);
      ch.querySelectorAll(".entry").forEach(entry => {
        const terms = (entry.dataset.terms || "").split("|").map(s => s.trim()).filter(Boolean);
        terms.forEach(term => {
          const a = document.createElement("a");
          a.href = "#" + entry.id;
          a.textContent = term;
          group.appendChild(a);
          totalTerms++;
        });
      });
      if (group.querySelector("a")) host.appendChild(group);
    });
    if (tocNote) {
      const articleCount = entries.length;
      tocNote.innerHTML = "15 章 · " + articleCount + " 篇笔记<br>" + totalTerms + " 个术语";
    }
  }

  function applySearch() {
    const q = searchInput.value.trim().toLowerCase();
    let count = 0;
    entries.forEach(entry => {
      const haystack = (entry.dataset.terms || "") + " " + entry.textContent;
      const ok = !q || haystack.toLowerCase().includes(q);
      entry.hidden = !ok;
      if (ok) count++;
    });
    chapters.forEach(ch => {
      const has = ch.querySelector(".entry:not([hidden])") !== null;
      ch.hidden = !has;
    });
    const indexSection = document.getElementById("term-index");
    if (indexSection) indexSection.hidden = !!q;
    document.querySelectorAll(".toc-entry").forEach(a => {
      const el = document.getElementById(a.getAttribute("href").slice(1));
      a.hidden = !!(el && el.hidden);
    });
    document.querySelectorAll(".toc-chapter").forEach(a => {
      const el = document.getElementById(a.getAttribute("href").slice(1));
      a.hidden = !!(el && el.hidden);
    });
    searchCount.textContent = q ? (count ? count + " 篇" : "无结果") : "";
    document.body.classList.toggle("search-active", !!q);
  }

  function setupSearch() {
    searchInput.addEventListener("input", applySearch);
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        searchInput.value = "";
        applySearch();
        searchInput.blur();
      }
    });
    document.addEventListener("keydown", e => {
      if (e.key === "/" && document.activeElement !== searchInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });
  }

  function setupSpy() {
    const links = Array.from(document.querySelectorAll(".toc-chapter"));
    let ticking = false;
    function update() {
      let current = chapters[0];
      chapters.forEach(ch => {
        if (ch.getBoundingClientRect().top <= 140) current = ch;
      });
      links.forEach(link => {
        link.classList.toggle("active", link.dataset.chapter === current.id);
      });
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  function renderMath() {
    if (typeof renderMathInElement !== "function") return;
    renderMathInElement(document.body, {
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false,
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "option"]
    });
  }

  buildToc();
  buildIndex();
  setupSearch();
  setupSpy();
  renderMath();
})();
