import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || process.argv[2] || 3000);
const host = process.env.HOST || "127.0.0.1";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

async function sendFile(response, filePath) {
  try {
    const body = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream"
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("찾을 수 없습니다");
  }
}

const server = createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url || "/").split("?")[0]);

  if (requestPath.startsWith("/_next/static/")) {
    const staticPath = requestPath.slice("/_next/static/".length);
    void sendFile(response, join(root, ".next", "static", staticPath));
    return;
  }

  if (requestPath === "/" || requestPath === "/index.html") {
    void sendFile(response, join(root, ".next", "server", "app", "index.html"));
    return;
  }

  if (!requestPath.includes("..")) {
    void sendFile(response, join(root, "public", requestPath.slice(1)));
    return;
  }

  void sendFile(response, join(root, ".next", "server", "app", "_not-found.html"));
});

server.listen(port, host, () => {
  console.log(`정적 미리보기가 준비되었습니다: http://${host}:${port}`);
});
