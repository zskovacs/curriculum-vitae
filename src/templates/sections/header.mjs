import { escapeHtml } from "../html.mjs";

const labels = {
  en: { skip: "Skip to content", language: "Magyar", menu: "Menu" },
  hu: { skip: "Ugrás a tartalomra", language: "English", menu: "Menü" },
};

export function renderHeader(content, alternate) {
  const locale = labels[content.locale];
  const navigationId = `site-navigation-${content.locale}`;
  const items = content.nav.items.map(item => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`).join("");
  return `<a class="skip-link" href="#main-content">${escapeHtml(locale.skip)}</a>
<header class="sticky top-0">
  <nav aria-label="${escapeHtml(content.person.name)}">
    <a class="site-name" href="${escapeHtml(content.route)}">${escapeHtml(content.person.name)}</a>
    <details class="site-menu">
      <summary aria-controls="${navigationId}">${escapeHtml(locale.menu)}</summary>
      <div id="${navigationId}" class="site-menu-panel">
        <ul>
          ${items}
        </ul>
        <a class="language-link" href="${escapeHtml(alternate.route)}" hreflang="${escapeHtml(alternate.locale)}" lang="${escapeHtml(alternate.locale)}">${escapeHtml(locale.language)}</a>
      </div>
    </details>
    <div class="desktop-navigation">
      <ul>${items}</ul>
      <a class="language-link" href="${escapeHtml(alternate.route)}" hreflang="${escapeHtml(alternate.locale)}" lang="${escapeHtml(alternate.locale)}">${escapeHtml(locale.language)}</a>
    </div>
  </nav>
</header>
<script src="/assets/site.js" defer></script>`;
}
