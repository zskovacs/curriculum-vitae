import { renderDocument } from "./html.mjs";
import { renderHeader } from "./sections/header.mjs";
import { renderFooter, renderMain } from "./sections/main.mjs";

export function renderPage(content, alternate) {
  return renderDocument({
    content,
    alternate,
    body: `${renderHeader(content, alternate)}\n${renderMain(content)}\n${renderFooter(content)}`,
  });
}
