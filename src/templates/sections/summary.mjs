import { escapeHtml } from "../html.mjs";
export function renderSummary(content) { return `<section id="summary" class="editorial-section summary" aria-labelledby="summary-title"><p class="section-number" aria-hidden="true">01</p><div class="section-content"><h2 id="summary-title">${escapeHtml(content.label)}</h2><p class="lede">${escapeHtml(content.summary)}</p></div></section>`; }
