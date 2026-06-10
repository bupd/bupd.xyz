# bupd.xyz

Static personal site and blog for Prasanth Baskar, built with Hugo and deployable on Netlify.

## Local development

```bash
hugo server --buildDrafts
```

## Production build

```bash
hugo --gc --minify
```

## Writing posts

Add Markdown files under `content/blogs/`. Hugo publishes each file at `/blogs/<slug>/` and exposes the blog RSS feed at `/blogs/index.xml`.
