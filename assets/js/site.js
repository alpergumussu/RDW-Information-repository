// Shared site behavior: theme + palette across pages
(function () {
  const KEY_THEME = 'aucs-theme';
  const KEY_PALETTE = 'aucs-palette';

  const savedTheme = localStorage.getItem(KEY_THEME) || 'light';
  const savedPalette = localStorage.getItem(KEY_PALETTE) || 'ignition';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('data-palette', savedPalette);

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(KEY_THEME, t);
    updateThemeIcon();
  }
  function setPalette(p) {
    document.documentElement.setAttribute('data-palette', p);
    localStorage.setItem(KEY_PALETTE, p);
    refreshPaletteUI();
  }

  function updateThemeIcon() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const t = document.documentElement.getAttribute('data-theme');
    btn.innerHTML = t === 'dark'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  function refreshPaletteUI() {
    const p = document.documentElement.getAttribute('data-palette');
    document.querySelectorAll('.tweaks-swatch').forEach(el => {
      el.classList.toggle('active', el.dataset.palette === p);
    });
  }

  function buildTweaks() {
    if (document.getElementById('tweaks-panel')) return;
    const trigger = document.createElement('button');
    trigger.className = 'tweaks-trigger';
    trigger.id = 'tweaks-trigger';
    trigger.setAttribute('aria-label', 'Open palette tweaks');
    trigger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="13.5" r="2.5"/><circle cx="10.5" cy="17.5" r="2.5"/><circle cx="6.5" cy="10.5" r="2.5"/></svg>';

    const panel = document.createElement('div');
    panel.className = 'tweaks';
    panel.id = 'tweaks-panel';
    panel.innerHTML = `
      <div class="tweaks-header">
        <h5>// PALETTE</h5>
        <button class="tweaks-close" id="tweaks-close" aria-label="Close">×</button>
      </div>
      <div class="tweaks-row">
        <label>Color scheme</label>
        <div class="tweaks-swatches">
          <button class="tweaks-swatch sw-ignition" data-palette="ignition" title="Ignition"></button>
          <button class="tweaks-swatch sw-circuit" data-palette="circuit" title="Circuit"></button>
          <button class="tweaks-swatch sw-telemetry" data-palette="telemetry" title="Telemetry"></button>
        </div>
      </div>
      <div class="tweaks-row">
        <label id="palette-name">Ignition</label>
      </div>
    `;

    document.body.appendChild(panel);
    document.body.appendChild(trigger);

    trigger.addEventListener('click', () => {
      panel.classList.add('open');
      trigger.style.display = 'none';
    });
    document.getElementById('tweaks-close').addEventListener('click', () => {
      panel.classList.remove('open');
      trigger.style.display = '';
    });
    panel.querySelectorAll('.tweaks-swatch').forEach(el => {
      el.addEventListener('click', () => {
        setPalette(el.dataset.palette);
        document.getElementById('palette-name').textContent =
          el.dataset.palette[0].toUpperCase() + el.dataset.palette.slice(1);
      });
    });
    refreshPaletteUI();
    document.getElementById('palette-name').textContent =
      savedPalette[0].toUpperCase() + savedPalette.slice(1);
  }

  function bindThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      setTheme(cur === 'dark' ? 'light' : 'dark');
    });
    updateThemeIcon();
  }

  function buildFooter() {
    const root = document.getElementById('site-footer');
    if (!root) return;
    root.outerHTML = `<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <div class="brand" style="margin-bottom: 16px;">
          <span class="brand-mark"></span>
          <span>AUTO/CYBER</span>
        </div>
        <p style="color: var(--ink-soft); font-size: 14px; max-width: 36ch;">
          An open educational primer on the cybersecurity of road vehicles. Written for students of computer science, automotive engineering, and the curious public.
        </p>
      </div>
      <div>
        <h4>Modules</h4>
        <ul>
          <li><a href="modules/module-1.html">01 — The Connected Vehicle</a></li>
          <li><a href="modules/module-2.html">02 — Attack Surfaces</a></li>
          <li><a href="modules/module-3.html">03 — Case Studies</a></li>
          <li><a href="modules/module-4.html">04 — Defenses</a></li>
        </ul>
      </div>
      <div>
        <h4>Reference</h4>
        <ul>
          <li><a href="modules/module-4.html#regulation">UNECE WP.29 R155</a></li>
          <li><a href="modules/module-4.html#regulation">ISO/SAE 21434</a></li>
          <li><a href="modules/module-3.html#jeep">Miller &amp; Valasek (2015)</a></li>
        </ul>
      </div>
      <div>
        <h4>Color</h4>
        <ul>
          <li><a href="#" onclick="document.getElementById('tweaks-trigger').click();return false;">Switch palette →</a></li>
          <li><a href="#" onclick="document.getElementById('theme-toggle').click();return false;">Toggle dark mode →</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>// AUTO/CYBER · 2026 · educational use</span>
      <div class="footer-partners">
        <span class="footer-partners-label">Partners</span>
        <a href="https://www.windesheim.nl/" target="_blank" rel="noopener" aria-label="Windesheim">
          <img class="partner-logo" src="assets/img/windesheim-white.png" alt="Windesheim" />
        </a>
        <a href="https://mitc-flevoland.nl/" target="_blank" rel="noopener" aria-label="MITC Flevoland">
          <img class="partner-logo" src="assets/img/mitc-white.png" alt="MITC Flevoland" />
        </a>
        <a href="https://www.rdw.nl/" target="_blank" rel="noopener" aria-label="RDW">
          <img class="partner-logo" src="assets/img/rdw-white.png" alt="RDW" />
        </a>
      </div>
    </div>
  </div>
</footer>`;
  }

  function buildNav() {
    const root = document.getElementById('site-nav');
    if (!root) return;
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const links = [
      { href: 'index.html',   label: 'Home' },
      { href: 'modules.html', label: 'Modules' },
      { href: 'about.html',   label: 'About' },
    ];
    const linksHTML = links.map(({ href, label }) => {
      const active = page === href ? ' class="active"' : '';
      return `<a href="${href}"${active}>${label}</a>`;
    }).join('\n      ');
    root.outerHTML = `<nav class="nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand">
      <span class="brand-mark"></span>
      <span>AUTO/CYBER</span>
      <small>v.2026</small>
    </a>
    <div class="nav-links">
      ${linksHTML}
    </div>
    <div class="nav-tools">
      <button class="icon-btn" id="theme-toggle" aria-label="Toggle theme"></button>
    </div>
  </div>
</nav>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    buildFooter();
    bindThemeToggle();
    buildTweaks();
  });
})();
