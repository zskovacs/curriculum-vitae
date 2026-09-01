const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => htmlEscapes[character]);
}

export function renderDocument({ content, alternate, body }) {
  const siteUrl = "https://cv.kovacs.id";
  const canonicalUrl = `${siteUrl}${content.route}`;
  const alternateUrl = `${siteUrl}${alternate.route}`;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.person.name,
    url: canonicalUrl,
    sameAs: [content.contact.linkedIn, content.contact.gitHub],
  };
  const personJson = JSON.stringify(person).replace(/[<>&]/g, character =>
    `\\u${character.codePointAt(0).toString(16).padStart(4, "0")}`);

  return `<!DOCTYPE html>
<html lang="${escapeHtml(content.locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(content.seo.title)}</title>
  <meta name="description" content="${escapeHtml(content.seo.description)}">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  <link rel="alternate" hreflang="${escapeHtml(content.locale)}" href="${escapeHtml(canonicalUrl)}">
  <link rel="alternate" hreflang="${escapeHtml(alternate.locale)}" href="${escapeHtml(alternateUrl)}">
  <link rel="alternate" hreflang="x-default" href="${siteUrl}/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:title" content="${escapeHtml(content.seo.title)}">
  <meta property="og:description" content="${escapeHtml(content.seo.description)}">
  <link rel="stylesheet" href="/assets/site.css">
  <script type="application/ld+json">${personJson}</script>
</head>
<body>
${body}
</body>
</html>
`;
}
