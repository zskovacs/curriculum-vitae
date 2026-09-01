import { escapeHtml } from "../html.mjs";

const labels = {
  en: { expertise: "Core Expertise", aiNative: "AI-Native Software Engineering", experience: "Professional Experience", education: "Education", languages: "Languages & Additional Technologies", contact: "Contact", technologies: "Technologies", project: "Selected Project", resume: "Download résumé" },
  hu: { expertise: "Főbb szakterületek", aiNative: "AI-Native szoftverfejlesztés", experience: "Szakmai tapasztalat", education: "Tanulmányok", languages: "Nyelvek & további technológiák", contact: "Kapcsolat", technologies: "Technológiák", project: "Kiemelt projekt", resume: "Önéletrajz letöltése" },
};

function renderList(items) {
  return `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

export function renderMain(content) {
  const label = labels[content.locale];
  const resume = content.resumeUrl === null ? "" : `<p><a href="${escapeHtml(content.resumeUrl)}" download>${escapeHtml(label.resume)}</a></p>`;

  return `<main id="main-content">
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">${escapeHtml(content.hero.title)}</h1>
    <p>${escapeHtml(content.hero.tagline)}</p>${resume ? `
    ${resume}` : ""}
  </section>
  <section id="summary" aria-labelledby="summary-title">
    <h2 id="summary-title">${escapeHtml(content.nav.items.find(item => item.id === "summary").label)}</h2>
    <p>${escapeHtml(content.summary)}</p>
  </section>
  <section id="expertise" aria-labelledby="expertise-title">
    <h2 id="expertise-title">${escapeHtml(label.expertise)}</h2>
    ${content.expertise.map(group => `<section aria-labelledby="${escapeHtml(group.id)}"><h3 id="${escapeHtml(group.id)}">${escapeHtml(group.title)}</h3>${renderList(group.items)}</section>`).join("")}
  </section>
  <section id="ai-native" aria-labelledby="ai-native-title">
    <h2 id="ai-native-title">${escapeHtml(label.aiNative)}</h2>
    ${renderList(content.aiNative.map(item => item.description))}
  </section>
  <section id="project" aria-labelledby="project-title">
    <h2 id="project-title">${escapeHtml(label.project)}</h2>
    <article>
      <h3><a href="${escapeHtml(content.project.url)}">${escapeHtml(content.project.title)}</a></h3>
      <p>${escapeHtml(content.project.period)}</p>
      <p>${escapeHtml(content.project.description)}</p>
      <p>${escapeHtml(content.project.stack)}</p>
      <p>${escapeHtml(content.project.infrastructure)}</p>
      <p>${escapeHtml(content.project.observability)}</p>
      <p>${escapeHtml(content.project.workflow)}</p>
    </article>
  </section>
  <section id="experience" aria-labelledby="experience-title">
    <h2 id="experience-title">${escapeHtml(label.experience)}</h2>
    ${content.experience.map(position => `<article><h3>${escapeHtml(position.role)} — ${escapeHtml(position.company)}</h3><p>${escapeHtml(position.period)} · ${escapeHtml(position.industry)}</p>${renderList(position.bullets)}${position.technologies ? `<p><strong>${escapeHtml(label.technologies)}:</strong> ${escapeHtml(position.technologies)}</p>` : ""}</article>`).join("")}
  </section>
  <section id="education" aria-labelledby="education-title">
    <h2 id="education-title">${escapeHtml(label.education)}</h2>
    <h3>${escapeHtml(content.education.degree)}</h3>
    <p>${escapeHtml(content.education.institution)}</p>
    <p>${escapeHtml(content.education.period)}</p>
    <p>${escapeHtml(content.education.specialization)}</p>
    <p>${escapeHtml(content.education.thesis)}</p>
  </section>
  <section id="languages" aria-labelledby="languages-title">
    <h2 id="languages-title">${escapeHtml(label.languages)}</h2>
    <ul>${content.languages.map(item => `<li><strong>${escapeHtml(item.language)}:</strong> ${escapeHtml(item.level)}</li>`).join("")}</ul>
    ${renderList(content.additionalTechnologies)}
  </section>
</main>`;
}

export function renderFooter(content) {
  const label = labels[content.locale];
  const phone = content.contact.phone.replace(/[^+\d]/g, "");
  const displayedPhone = escapeHtml(content.contact.phone).replace(/ /g, "&nbsp;");
  return `<footer id="contact">
  <h2>${escapeHtml(label.contact)}</h2>
  <ul>
    <li><a href="tel:${escapeHtml(phone)}">${displayedPhone}</a></li>
    <li><a href="mailto:${escapeHtml(content.contact.email)}">${escapeHtml(content.contact.email)}</a></li>
    <li><a href="${escapeHtml(content.contact.linkedIn)}">LinkedIn</a></li>
    <li><a href="${escapeHtml(content.contact.gitHub)}">GitHub</a></li>
  </ul>
</footer>`;
}
