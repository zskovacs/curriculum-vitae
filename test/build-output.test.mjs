import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildSite } from "../scripts/build.mjs";

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
  assert.doesNotMatch(en, /download.*resume/i);
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

test("build output includes the compiled Tailwind stylesheet", async () => {
  execFileSync("npm", ["run", "build"], { stdio: "pipe" });
  const css = await readFile("dist/assets/site.css", "utf8");
  assert.notEqual(css, "");
});
