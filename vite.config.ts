import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import { athlete } from './src/data/athlete'

function portfolioMetadata(): Plugin {
  return {
    name: 'portfolio-metadata',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const { seo } = athlete
        const sharingImage = seo.image && seo.siteUrl
          ? new URL(seo.image, seo.siteUrl.replace(/\/?$/, '/')).href
          : seo.image
        return {
          html,
          tags: [
            { tag: 'title', children: seo.title },
            { tag: 'meta', attrs: { name: 'description', content: seo.description } },
            { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
            { tag: 'meta', attrs: { property: 'og:locale', content: 'pt_BR' } },
            { tag: 'meta', attrs: { property: 'og:title', content: seo.title } },
            { tag: 'meta', attrs: { property: 'og:description', content: seo.description } },
            ...(sharingImage ? [{ tag: 'meta', attrs: { property: 'og:image', content: sharingImage } }] : []),
            ...(seo.siteUrl ? [
              { tag: 'meta', attrs: { property: 'og:url', content: seo.siteUrl } },
              { tag: 'link', attrs: { rel: 'canonical', href: seo.siteUrl } },
            ] : []),
          ].map((tag) => ({ ...tag, injectTo: 'head' as const })),
        }
      },
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwind(), portfolioMetadata()],
})

