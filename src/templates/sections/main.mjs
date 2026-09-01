import { renderAiNative } from "./ai-native.mjs";
import { renderBackground } from "./background.mjs";
import { renderContact } from "./contact.mjs";
import { renderExperience } from "./experience.mjs";
import { renderExpertise } from "./expertise.mjs";
import { renderHero } from "./hero.mjs";
import { renderProject } from "./project.mjs";
import { renderSummary } from "./summary.mjs";

const labels = {
  en: { aiNative: "AI-Native Software Engineering", contact: "Contact", education: "Education", experience: "Professional Experience", expertise: "Core Expertise", languages: "Languages & Additional Technologies", project: "Selected Project", technologies: "Technologies" },
  hu: { aiNative: "AI-Native szoftverfejlesztés", contact: "Kapcsolat", education: "Tanulmányok", experience: "Szakmai tapasztalat", expertise: "Főbb szakterületek", languages: "Nyelvek & további technológiák", project: "Kiemelt projekt", technologies: "Technológiák" },
};

export function renderMain(content) {
  const label = labels[content.locale];
  const summaryLabel = content.nav.items.find(item => item.id === "summary").label;
  return `<main id="main-content">
${renderHero({ person: content.person, hero: content.hero, resumeUrl: content.resumeUrl })}
${renderSummary({ label: summaryLabel, summary: content.summary })}
${renderExpertise({ label: label.expertise, groups: content.expertise })}
${renderAiNative({ label: label.aiNative, steps: content.aiNative })}
${renderProject({ label: label.project, project: content.project })}
${renderExperience({ label: label.experience, technologiesLabel: label.technologies, positions: content.experience })}
${renderBackground({ educationLabel: label.education, languagesLabel: label.languages, education: content.education, languages: content.languages, additionalTechnologies: content.additionalTechnologies })}
</main>`;
}

export function renderFooter(content) {
  return renderContact({ label: labels[content.locale].contact, contact: content.contact });
}
