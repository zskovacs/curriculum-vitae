import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";

const host = "127.0.0.1";
const port = 4173;
const root = resolve("dist");
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

async function resolveFile(pathname) {
  const candidate = resolve(root, `.${decodeURIComponent(pathname)}`);
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) return null;

  const metadata = await stat(candidate);
  return metadata.isDirectory() ? join(candidate, "index.html") : candidate;
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  try {
    const file = await resolveFile(new URL(request.url, `http://${host}:${port}`).pathname);
    if (!file) throw new Error("Outside preview root");

    response.writeHead(200, {
      "Content-Type": contentTypes.get(extname(file)) ?? "application/octet-stream",
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found\n");
  }
});

server.listen(port, host, () => {
  console.log(`Serving dist at http://${host}:${port}`);
});
