import { escapeHtml } from "../html.mjs";

const labels = {
  en: { skip: "Skip to content", language: "Magyar" },
  hu: { skip: "Ugrás a tartalomra", language: "English" },
};

export function renderHeader(content, alternate) {
  const locale = labels[content.locale];
  return `<a href="#main-content">${escapeHtml(locale.skip)}</a>
<header class="sticky top-0">
  <nav aria-label="${escapeHtml(content.person.name)}">
    <a href="${escapeHtml(content.route)}">${escapeHtml(content.person.name)}</a>
    <ul>
      ${content.nav.items.map(item => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`).join("")}
    </ul>
    <a href="${escapeHtml(alternate.route)}" hreflang="${escapeHtml(alternate.locale)}" lang="${escapeHtml(alternate.locale)}">${escapeHtml(locale.language)}</a>
  </nav>
</header>`;
}
