import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import worker from "./dist/server/index.js";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const publicRoot = join(process.cwd(), "dist", "client");

const mime = {
  ".avif": "image/avif", ".css": "text/css; charset=utf-8", ".gif": "image/gif",
  ".html": "text/html; charset=utf-8", ".ico": "image/x-icon", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".svg": "image/svg+xml", ".txt": "text/plain; charset=utf-8", ".webp": "image/webp",
};

async function fetchAsset(request) {
  const url = new URL(request.url);
  const decoded = decodeURIComponent(url.pathname);
  const relative = normalize(decoded).replace(/^[/\\]+/, "");
  const filePath = join(publicRoot, relative);

  if (!filePath.startsWith(publicRoot)) return new Response("Not found", { status: 404 });
  try {
    const info = await stat(filePath);
    if (!info.isFile()) return new Response("Not found", { status: 404 });
    const body = await readFile(filePath);
    const headers = new Headers({ "Content-Type": mime[extname(filePath).toLowerCase()] || "application/octet-stream" });
    if (url.pathname.startsWith("/assets/")) headers.set("Cache-Control", "public, max-age=31536000, immutable");
    else headers.set("Cache-Control", "public, max-age=3600");
    return new Response(body, { status: 200, headers });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

const server = createServer(async (req, res) => {
  try {
    if (req.url === "/healthz") {
      res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      res.end('{"status":"ok"}');
      return;
    }
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { Allow: "GET, HEAD" });
      res.end("Method not allowed");
      return;
    }

    const forwardedProto = String(req.headers["x-forwarded-proto"] || "").split(",")[0].trim();
    const protocol = forwardedProto === "https" ? "https" : "http";
    const request = new Request(`${protocol}://${req.headers.host || "localhost"}${req.url || "/"}`, { method: req.method, headers: req.headers });
    // The standalone Node server has to serve Vite's compiled assets itself.
    // The Worker runtime delegates these requests to ASSETS automatically,
    // but a plain Node server does not provide that binding.
    let response = await fetchAsset(request);
    if (response.status === 404) {
      response = await worker.fetch(request, { ASSETS: { fetch: fetchAsset } }, { waitUntil() {}, passThroughOnException() {} });
    }
    const headers = Object.fromEntries(response.headers.entries());
    headers["x-content-type-options"] = "nosniff";
    headers["referrer-policy"] = "strict-origin-when-cross-origin";
    headers["permissions-policy"] = "camera=(), microphone=(), geolocation=()";
    res.writeHead(response.status, headers);
    if (req.method === "HEAD" || !response.body) return res.end();
    for await (const chunk of response.body) res.write(chunk);
    res.end();
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal server error");
  }
});

server.listen(port, host, () => console.log(`Store MGMT website listening on ${host}:${port}`));
