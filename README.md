# Zsolt Kovács — CV

The source for [cv.kovacs.id](https://cv.kovacs.id) is a static, bilingual
professional CV site. Node.js renders semantic HTML from the content modules;
Tailwind CSS builds the stylesheet. The generated `dist/` directory is the
deployable artifact and is not source content.

## Routes

- English: `/`
- Magyar: `/hu/`

Each route has its own localized metadata, canonical URL, alternate-language
links, and structured data.

## Updating content

Edit the language-specific content modules, then rebuild the site:

- English content: `src/content/en.mjs`
- Hungarian content: `src/content/hu.mjs`
- Page templates: `src/templates/`
- Site styles: `src/styles/site.css`

Content validation ensures the two locales keep the same required structure.

### PDF CVs

PDF download links are intentionally optional. Add current language-specific
PDF files and their links only when the files are available; the site must not
link to a PDF that is not present in the repository.

## Local development

Use Node.js 24 (see `.nvmrc`).

```bash
npm ci
npm test
npm run build
npm run check
npm run preview
npm run test:e2e
```

`npm run check` runs unit tests, validates the localized content, builds the
site, and validates the generated HTML. `npm run preview` serves the generated
`dist/` directory locally. Browser tests use Playwright; install its Chromium
binary once when necessary:

```bash
npx playwright install chromium
```

## Deployment

Pushing to the default branch triggers the GitHub Pages workflow. The workflow
installs dependencies, runs the site checks, builds `dist/`, and deploys that
generated directory to GitHub Pages. The custom domain is configured through
`public/CNAME`.
