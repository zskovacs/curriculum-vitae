import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { validateLocalePair, ContentValidationError } from "../scripts/validate-content.mjs";
import { enContent } from "../src/content/en.mjs";
import { huContent } from "../src/content/hu.mjs";

const base = {
  locale: "en", route: "/", seo: {}, person: {},
  nav: { items: [{ id: "summary" }, { id: "contact" }] }, hero: {}, summary: "Summary",
  expertise: [{ id: "backend" }], aiNative: [{ id: "sdd" }], project: { id: "fithub" },
  experience: [{ id: "mi-software" }], education: {}, languages: [],
  additionalTechnologies: [], contact: {}, resumeUrl: null,
};

test("accepts locale objects with matching structural IDs", () => {
  const hu = structuredClone(base);
  hu.locale = "hu";
  hu.route = "/hu/";
  assert.doesNotThrow(() => validateLocalePair(base, hu));
});

test("rejects a missing required locale field with its path", () => {
  const hu = structuredClone(base);
  hu.locale = "hu";
  hu.route = "/hu/";
  delete hu.contact;
  assert.throws(() => validateLocalePair(base, hu), error =>
    error instanceof ContentValidationError && error.message.includes("hu.contact"));
});

test("rejects mismatched ordered item IDs", () => {
  const hu = structuredClone(base);
  hu.locale = "hu";
  hu.route = "/hu/";
  hu.experience[0].id = "different";
  assert.throws(() => validateLocalePair(base, hu), /experience IDs/);
});

test("rejects navigation IDs that differ in order between locales", () => {
  const hu = structuredClone(base);
  hu.locale = "hu";
  hu.route = "/hu/";
  hu.nav.items.reverse();

  assert.throws(() => validateLocalePair(base, hu), /navigation IDs/);
});

test("the authoritative locale data remains structurally aligned", () => {
  assert.doesNotThrow(() => validateLocalePair(enContent, huContent));
  assert.equal(enContent.hero.title, "Senior / Lead Full-Stack Software Engineer");
  assert.equal(huContent.hero.title, "Senior / Lead Full-Stack Szoftverfejlesztő");
  assert.equal(enContent.project.url, "https://www.fithub.hu");
  assert.equal(enContent.experience.length, 5);
  assert.equal(huContent.experience.length, 5);
  assert.equal(enContent.resumeUrl, null);
  assert.equal(huContent.resumeUrl, null);
});

test("locale data excludes forbidden personal fields", () => {
  const serialized = JSON.stringify([enContent, huContent]);
  for (const key of ["birthDate", "gender", "citizenship", "streetAddress", "drivingLicence"]) {
    assert.equal(serialized.includes(`\"${key}\"`), false);
  }
});

test("the validation CLI validates the authoritative locale modules", () => {
  assert.doesNotThrow(() => execFileSync(process.execPath, ["scripts/validate-content.mjs"], {
    cwd: process.cwd(),
    stdio: "pipe",
  }));
});
