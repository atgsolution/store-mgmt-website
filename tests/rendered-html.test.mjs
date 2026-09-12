import assert from "node:assert/strict";
import test from "node:test";

test("renders Store MGMT metadata and primary content", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Store MGMT Community Edition<\/title>/i);
  assert.match(html, /Open-source, self-hosted POS and store management/i);
  assert.match(html, /A practical POS for one small shop/i);
  assert.match(html, /https:\/\/github\.com\/atgsolution\/store-mgmt-community/i);
  assert.doesNotMatch(html, /Starter Project|codex-preview/i);
});
