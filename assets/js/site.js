// Shared site behavior: theme toggle across pages
(function () {
  const KEY_THEME = 'aucs-theme';

  const savedTheme = localStorage.getItem(KEY_THEME) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(KEY_THEME, t);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const t = document.documentElement.getAttribute('data-theme');
    btn.innerHTML = t === 'dark'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
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

        root.outerHTML = `
<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <!-- optional future content -->
    </div>

    <div class="footer-bottom">

      <div class="footer-left">
<span>
  // <i class="fa-regular fa-copyright"></i>
  2026 Cybersecurity in the Automotive Industry
</span>       <div class="footer-authors">
  // <i class="fa-solid fa-pen-nib"></i>
   Authors: Alper Gumussu &amp; Gerben Brouwer
</div>
      </div>

      <div class="footer-partners">
        <a href="https://www.windesheim.nl/" target="_blank" rel="noopener" aria-label="Windesheim">
          <img class="partner-logo" src="../../assets/img/windesheim-white.png" alt="Windesheim" />
        </a>

        <a href="https://www.rdw.nl/" target="_blank" rel="noopener" aria-label="RDW">
          <img class="partner-logo" src="../../assets/img/rdw-white.png" alt="RDW" />
        </a>

        <a href="https://mitc-flevoland.nl/" target="_blank" rel="noopener" aria-label="MITC Flevoland">
          <img class="partner-logo" src="../../assets/img/mitc-white.png" alt="MITC Flevoland" />
        </a>
      </div>

    </div>
  </div>
</footer>`;
    }

  function buildNav() {
    const root = document.getElementById('site-nav');
    if (!root) return;
    const page = window.location.pathname.split('/').pop();
    const links = [
      { href: '../../Models/HomePage/index.html', label: 'Home' },
      { href: '../../Models/ModuleOverviewPage/modules.html', label: 'Modules' },
      { href: '../../Models/AboutPage/about.html', label: 'About' },
    ];
    const linksHTML = links.map(({ href, label }) => {
      const filename = href.split('/').pop();
      const active = page === filename ? ' class="active"' : '';
      return `<a href="${href}"${active}>${label}</a>`;
    }).join('\n      ');
    root.outerHTML = `<nav class="nav">
<div class="wrap nav-inner">
  <div class="nav-left">
    <a href="../../Models/HomePage/index.html" class="brand">
      <span class="brand-mark"></span>
      <span>AUTO/CYBER</span>
      <small>v.2026</small>
    </a>
  </div>
  <div class="nav-links">
    ${linksHTML}
  </div>
  <div class="nav-right">
    <button class="icon-btn" id="theme-toggle" aria-label="Toggle theme"></button>
  </div>
</div>
</nav>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    buildFooter();
    bindThemeToggle();
  });
})();
