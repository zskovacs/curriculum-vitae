export class ContentValidationError extends Error {}

const required = ["locale", "route", "seo", "person", "nav", "hero", "summary",
  "expertise", "aiNative", "project", "experience", "education", "languages",
  "additionalTechnologies", "contact", "resumeUrl"];

function ids(items) { return items.map(item => item.id); }
function assertSameIds(label, enItems, huItems) {
  if (JSON.stringify(ids(enItems)) !== JSON.stringify(ids(huItems))) {
    throw new ContentValidationError(`${label} IDs differ between locales`);
  }
}

export function validateLocalePair(en, hu) {
  for (const [name, locale] of [["en", en], ["hu", hu]]) {
    for (const key of required) {
      if (!(key in locale)) throw new ContentValidationError(`${name}.${key} is required`);
    }
  }
  assertSameIds("navigation", en.nav.items, hu.nav.items);
  assertSameIds("expertise", en.expertise, hu.expertise);
  assertSameIds("aiNative", en.aiNative, hu.aiNative);
  assertSameIds("experience", en.experience, hu.experience);
  if (en.project.id !== hu.project.id) throw new ContentValidationError("project IDs differ between locales");
}

if (import.meta.main) {
  const [{ enContent }, { huContent }] = await Promise.all([
    import("../src/content/en.mjs"),
    import("../src/content/hu.mjs"),
  ]);
  validateLocalePair(enContent, huContent);
}
