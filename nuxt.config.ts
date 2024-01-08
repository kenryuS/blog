// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  sourcemap: {
    client: true,
    server: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml'],
    },
  },

  site: {
    url: "http://blog-kenryus.vercel.app",
    indexable: true,
  },

  robots: {
    enabled: true,
    allow: ['/'],
    disallow: ['/articleManager'],
    sitemap: '/sitemap.xml',
    blockNonSeoBots: true,
  },

  routeRules: {
    '/articleManager/**': { index: false, ssr: true },
    '/': { prerender: false, ssr: true },
    '/posts/**': { prerender: false, ssr: true },
    '/posts/search': {ssr: true },
    '/about': { ssr: true },
    '/api/**': { cors: true }
  },

  image: {
    screens: {
      'xs': 256,
      'sm': 256,
      'md': 256,
      'lg': 256,
      'xl': 256,
      'xxl': 256,
      '2xl': 256
    },
  },

  pages: true,

  app: {
    head: {
      htmlAttrs: {
          lang: 'ja',
      },
      link: [{
          rel: "icon",
          type: "image/svg",
          href: "/favicon.svg"
      }],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, user-scalable=yes',
    }
  },

  runtimeConfig: {
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_USER: process.env.POSTGRES_USER,
    CMS_PASSWD: process.env.CMS_PASSWD,
    public: {
      DEFAULT_IMAGE_ALT: "/default.svg, default image of blog site"
    }
  },

  modules: ['nuxt-icon', '@nuxt/image', 'nuxt-simple-sitemap', 'nuxt-simple-robots']
})
