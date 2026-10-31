/* Shared helpers: header/footer, bookmarks, paper cards, tabs, toast */

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---- bookmarks (localStorage with in-memory fallback) ---- */
let _memSaved = [];
function getSaved() {
  try { return JSON.parse(localStorage.getItem("savedPapers") || "[]"); } catch (e) { return _memSaved; }
}
function setSaved(list) {
  _memSaved = list;
  try { localStorage.setItem("savedPapers", JSON.stringify(list)); } catch (e) { /* storage unavailable */ }
}
function isSaved(id) { return getSaved().includes(id); }
function toggleSaved(id) {
  const list = getSaved();
  const i = list.indexOf(id);
  if (i >= 0) list.splice(i, 1); else list.push(id);
  setSaved(list);
  return i < 0;
}

/* ---- toast ---- */
function toast(msg) {
  let t = $(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 2400);
}

/* ---- header + footer ---- */
function renderChrome() {
  const page = document.body.dataset.page || "";
  const links = [
    ["index.html", "Home", "home"], ["papers.html", "Papers", "papers"], ["assistant.html", "AI Assistant", "assistant"],
    ["about.html", "About", "about"], ["contact.html", "Contact", "contact"], ["saved.html", "Saved", "saved"]
  ];
  const header = $("#site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <div class="container nav">
        <a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">M</span>${esc(SITE.name)}</a>
        <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>
        <ul class="nav-links">
          ${links.map(([href, label, key]) => `<li><a href="${href}" class="${page === key ? "active" : ""}">${label}</a></li>`).join("")}
          <li><a class="btn btn-primary btn-sm" href="auth.html">Log in</a></li>
        </ul>
      </div>`;
    const toggle = $(".nav-toggle", header), menu = $(".nav-links", header);
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }
  const footer = $("#site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div><h4>${esc(SITE.name)}</h4><p>${esc(SITE.tagline)}.</p></div>
          <div><h4>Explore</h4><ul><li><a href="papers.html">Research papers</a></li><li><a href="assistant.html">AI assistant</a></li><li><a href="about.html">Our team</a></li></ul></div>
          <div><h4>Account</h4><ul><li><a href="auth.html">Log in / Register</a></li><li><a href="saved.html">Saved papers</a></li><li><a href="contact.html">Enquiries</a></li></ul></div>
          <div><h4>Team access</h4><ul><li><a href="researcher.html">Researcher dashboard</a></li><li><a href="admin.html">Admin dashboard</a></li></ul></div>
        </div>
        <div class="footer-bottom">© <span id="yr"></span> ${esc(SITE.name)}. Sample content for design preview.</div>
      </div>`;
    $("#yr", footer).textContent = new Date().getFullYear();
  }
}

/* ---- paper card ---- */
function paperCard(p) {
  const saved = isSaved(p.id);
  const abs = p.abstract.length > 150 ? p.abstract.slice(0, 150).trim() + "…" : p.abstract;
  return `
    <article class="card paper-card">
      <span class="tag">${esc(p.area)}</span>
      <h3><a href="paper.html?id=${p.id}">${esc(p.title)}</a></h3>
      <p class="meta">${esc(p.authors)} · ${p.year}</p>
      <p class="abs">${esc(abs)}</p>
      <div class="kw">${p.keywords.slice(0, 3).map(k => `<span class="chip">${esc(k)}</span>`).join("")}</div>
      <div class="foot">
        <a href="paper.html?id=${p.id}" class="small">Read more →</a>
        <button class="save-btn ${saved ? "on" : ""}" data-save="${p.id}" aria-pressed="${saved}">${saved ? "★ Saved" : "☆ Save"}</button>
      </div>
    </article>`;
}

// Bookmark clicks anywhere on the page
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-save]");
  if (!btn) return;
  const id = Number(btn.dataset.save);
  const on = toggleSaved(id);
  $$(`[data-save="${id}"]`).forEach(b => {
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", on);
    b.textContent = on ? "★ Saved" : "☆ Save";
  });
  toast(on ? "Saved to your list (log in to keep it across devices)" : "Removed from saved papers");
  if (document.body.dataset.page === "saved" && typeof renderSaved === "function") renderSaved();
});

/* ---- tabs for dashboards ---- */
function initTabs(root = document) {
  const buttons = $$("[data-tab]", root);
  function show(name) {
    buttons.forEach(b => b.classList.toggle("active", b.dataset.tab === name));
    $$(".panel", root).forEach(p => p.classList.toggle("active", p.id === "tab-" + name));
  }
  buttons.forEach(b => b.addEventListener("click", () => show(b.dataset.tab)));
  if (buttons.length) show(buttons[0].dataset.tab);
  return show;
}

/* ---- misc ---- */
const approvedPapers = () => PAPERS.filter(p => p.status === "approved");
function statusBadge(s) {
  const map = { approved: "ok", pending: "warn", rejected: "bad", archived: "muted" };
  return `<span class="badge ${map[s] || "muted"}">${s[0].toUpperCase() + s.slice(1)}</span>`;
}
function initials(name) { return name.replace(/^Dr\.\s*/, "").split(" ").map(w => w[0]).slice(0, 2).join(""); }

document.addEventListener("DOMContentLoaded", renderChrome);
