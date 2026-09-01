import test from "node:test";
import assert from "node:assert/strict";
import { validateLocalePair, ContentValidationError } from "../scripts/validate-content.mjs";

const base = {
  locale: "en", route: "/", seo: {}, person: {}, nav: {}, hero: {}, summary: "Summary",
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
