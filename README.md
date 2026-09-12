# Store MGMT Website

The official bilingual landing page for [Store MGMT Community Edition](https://github.com/atgsolution/store-mgmt-community): a self-hosted POS and store-management system for small shops, cafés, and restaurants.

This repository contains presentation code and media only. It has no operational Store MGMT data or application database.

## Run with Docker

```bash
git clone https://github.com/atgsolution/store-mgmt-website.git
cd store-mgmt-website
cp .env.example .env
docker compose up -d --build
docker compose ps
```

Open `http://<server-address>:6087`. The container health endpoint is `/healthz`.

To use another host port, change `STORE_MGMT_WEBSITE_PORT` in `.env` and recreate the container.

## Reverse proxy

Point `storemgmt.atg-solution.vn` to the server, then proxy HTTPS traffic to:

```text
http://127.0.0.1:6087
```

Example Nginx location:

```nginx
location / {
    proxy_pass http://127.0.0.1:6087;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Enable HTTPS before publishing the domain.

## Architecture

- Next.js-compatible React application built with Vinext and Vite.
- Static product media is kept in `public/` and served from the same container.
- `server.mjs` provides the production HTTP server and health endpoint.
- Docker runs the site as a non-root Node.js process. No runtime secrets are required.

## Update

```bash
git pull --ff-only
docker compose up -d --build --remove-orphans
docker image prune -f
```

## Local development

Requires Node.js 22 or later. The verification scripts use a POSIX shell; Docker is the recommended production path.

```bash
npm ci
npm run dev
```

Production verification:

```bash
npm run build
npm test
```

To serve an existing production build locally:

```bash
PORT=6087 npm run serve
```

## Content and assets

Product screenshots and branding are sourced from the Store MGMT Community Edition repository. The website defaults to English and provides an in-page Vietnamese language switch. The product preview GIF is stored at `public/media/product-preview.gif`.

## License

Apache License 2.0. See [LICENSE](LICENSE).
