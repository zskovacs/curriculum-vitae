import { escapeHtml } from "../html.mjs";
export function renderHero(content) {
  const [leadership, specialization] = content.hero.title.split(" Full-Stack ");
  const titleLines = specialization
    ? [leadership, "Full-Stack", specialization]
    : [content.hero.title];
  const title = titleLines
    .map(line => `<span class="hero-title-line">${escapeHtml(line)}</span>`)
    .join(" ");
  const resumeLink = content.resumeUrl
    ? `<p class="hero-actions"><a class="resume-link" href="${escapeHtml(content.resumeUrl)}" download>${escapeHtml(content.hero.resumeLabel)}</a></p>`
    : "";
  return `<section class="editorial-section hero" aria-labelledby="hero-title"><p class="eyebrow">${escapeHtml(content.person.name)} · ${escapeHtml(content.person.location)}</p><h1 id="hero-title">${title}</h1><p class="hero-tagline">${escapeHtml(content.hero.tagline)}</p>${resumeLink}</section>`;
}
