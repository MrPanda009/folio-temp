# Shrey Singh — portfolio

A quiet one-page portfolio built with Next.js (Pages Router), React 19 and TypeScript, exported as static HTML.

All content lives in [`public/data.json`](public/data.json): bio, projects, awards, education and stack. Edit that file and rebuild; no component changes needed.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npm test
```

## Deploying

`npm run build` writes a fully static site to `out/`. On Vercel, import the repo and keep the defaults (Next.js preset). Any static host works too: just upload `out/`.

After you pick a domain, update `siteUrl` in `public/data.json`, plus `public/robots.txt` and `public/sitemap.xml`.

## Credits

Design adapted from [miksoft.pro](https://github.com/miksrv/miksoft.pro) by Misha Topchilo (MIT).
