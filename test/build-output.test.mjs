import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildSite } from "../scripts/build.mjs";
import { enContent } from "../src/content/en.mjs";
import { huContent } from "../src/content/hu.mjs";
import { renderPage } from "../src/templates/page.mjs";

function readPersonJson(html) {
  const serialized = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1];
  assert.ok(serialized, "Person JSON-LD is present");
  return JSON.parse(serialized);
}

function readDefinitionLabels(html) {
  return [...html.matchAll(/<dt>([^<]+)<\/dt>/g)].map(match => match[1]);
}

test("builds crawlable English and Hungarian pages", async () => {
  const outDir = await mkdtemp(join(tmpdir(), "cv-build-"));
  await buildSite({ outDir });

  const en = await readFile(join(outDir, "index.html"), "utf8");
  const hu = await readFile(join(outDir, "hu/index.html"), "utf8");

  assert.match(en, /^<!DOCTYPE html>$/m);
  assert.match(en, /<html lang="en">/);
  assert.match(hu, /<html lang="hu">/);
  assert.match(en, /rel="alternate" hreflang="hu" href="https:\/\/cv\.kovacs\.id\/hu\/"/);
  assert.match(hu, /rel="canonical" href="https:\/\/cv\.kovacs\.id\/hu\/"/);
  assert.match(en, /application\/ld\+json/);
  assert.match(en, /\+36&nbsp;30&nbsp;160&nbsp;6530/);
  assert.doesNotMatch(en, /\n[ \t]+\n/);
  assert.doesNotMatch(en, /class="resume-link"/);
  assert.doesNotMatch(hu, /class="resume-link"/);
  assert.ok(en.indexOf('id="summary"') < en.indexOf('id="expertise"'));
  assert.ok(en.indexOf('id="expertise"') < en.indexOf('id="ai-native"'));
  assert.ok(en.indexOf('id="ai-native"') < en.indexOf('id="fithub"'));
  assert.ok(en.indexOf('id="fithub"') < en.indexOf('id="experience"'));
  assert.match(en, /data-surface="ai-native"/);
  assert.match(en, /data-surface="project"/);
  assert.doesNotMatch(en, /data-percent|progressbar|<img[^>]+portrait/i);

  for (const page of [en, hu]) {
    const nav = page.match(/<nav\b[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? "";
    const fragmentHrefs = [...nav.matchAll(/href="#([^"]+)"/g)].map(match => match[1]);

    for (const id of fragmentHrefs) {
      assert.match(page, new RegExp(`<[^>]+\\bid="${id}"`));
    }
  }

  await stat(join(outDir, "robots.txt"));
  await stat(join(outDir, "sitemap.xml"));
  await stat(join(outDir, "CNAME"));
  await stat(join(outDir, "google537486c8762b25a2.html"));
});

test("Person metadata contains exactly the localized title and documented expertise", async () => {
  const outDir = await mkdtemp(join(tmpdir(), "cv-metadata-"));
  await buildSite({ outDir });

  for (const [path, content] of [["index.html", enContent], ["hu/index.html", huContent]]) {
    const html = await readFile(join(outDir, path), "utf8");
    const person = readPersonJson(html);

    assert.equal(person.jobTitle, content.hero.title);
    assert.deepEqual(person.knowsAbout, content.expertise.flatMap(group => group.items));
    assert.deepEqual(Object.keys(person).sort(), [
      "@context", "@type", "jobTitle", "knowsAbout", "name", "sameAs", "url",
    ].sort());
  }
});

test("renders a localized CV download only when resumeUrl is available", () => {
  const withResume = structuredClone(enContent);
  withResume.resumeUrl = "/zsolt-kovacs-cv.pdf";
  const html = renderPage(withResume, huContent);

  assert.match(html, /<a class="resume-link" href="\/zsolt-kovacs-cv\.pdf" download>Download CV \(PDF\)<\/a>/);
  assert.doesNotMatch(renderPage(enContent, huContent), /class="resume-link"/);
  assert.doesNotMatch(renderPage(huContent, enContent), /class="resume-link"/);
});

test("renders localized FitHub detail labels", async () => {
  const outDir = await mkdtemp(join(tmpdir(), "cv-project-labels-"));
  await buildSite({ outDir });

  const en = await readFile(join(outDir, "index.html"), "utf8");
  const hu = await readFile(join(outDir, "hu/index.html"), "utf8");

  assert.deepEqual(readDefinitionLabels(en), ["Stack", "Infrastructure", "Observability", "Workflow"]);
  assert.deepEqual(readDefinitionLabels(hu), ["Technológiák", "Infrastruktúra", "Megfigyelhetőség", "Munkafolyamat"]);
});

test("build output includes the compiled Tailwind stylesheet", async () => {
  execFileSync("npm", ["run", "build"], { stdio: "pipe" });
  const css = await readFile("dist/assets/site.css", "utf8");
  assert.notEqual(css, "");
});
