import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { enContent } from "../src/content/en.mjs";
import { escapeHtml } from "../src/templates/html.mjs";
import { huContent } from "../src/content/hu.mjs";
import { renderPage } from "../src/templates/page.mjs";
import { validateLocalePair } from "./validate-content.mjs";

const siteUrl = "https://cv.kovacs.id";

function renderSitemap() {
  const urls = [enContent, huContent]
    .map(content => `  <url><loc>${escapeHtml(siteUrl + content.route)}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function copyPublicFiles(outDir) {
  await Promise.all([
    copyFile("public/CNAME", join(outDir, "CNAME")),
    copyFile("public/favicon.svg", join(outDir, "favicon.svg")),
    copyFile("public/google537486c8762b25a2.html", join(outDir, "google537486c8762b25a2.html")),
    copyFile("src/scripts/site.js", join(outDir, "assets", "site.js")),
  ]);
}

export async function buildSite({ outDir = "dist" } = {}) {
  validateLocalePair(enContent, huContent);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(join(outDir, "hu"), { recursive: true });
  await mkdir(join(outDir, "assets"), { recursive: true });
  await writeFile(join(outDir, "index.html"), renderPage(enContent, huContent));
  await writeFile(join(outDir, "hu", "index.html"), renderPage(huContent, enContent));
  await copyPublicFiles(outDir);
  await writeFile(join(outDir, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://cv.kovacs.id/sitemap.xml\n");
  await writeFile(join(outDir, "sitemap.xml"), renderSitemap());
}

if (import.meta.main) {
  await buildSite();
}
