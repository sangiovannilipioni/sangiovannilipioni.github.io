import { version } from "./package.json"

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  loading: { color: "#fff" },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Nessuno Escluso",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Associazione Nessuno Escluso : Proposta per un programma di rilancio dell’abitato di San Giovanni Lipioni."
      },
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "theme-color", content: "#ffffff" },
      {
        hid: "description",
        name: "description",
        content:
          "San Giovanni Lipioni è un piccolo paese dell’Abruzzo interno collinare, posto a 545 m.s.l.m. sul versante sinistro del fiume Trigno, al confine con il Molise. Il territorio in cui è collocato degrada progressivamente verso il mare Adriatico da cui dista appena 40 Km."
      },
      {
        hid: "image",
        name: "image",
        content: "https://sangiovannilipioni.net/_nuxt/img/panoramix2.b0cd889.jpg"
      },

      // Schema.org for Google

      { hid: "name", name: "name", content: "Nessuno Escluso" },
      {
        hid: "description",
        name: "description",
        content:
          "San Giovanni Lipioni è un piccolo paese dell’Abruzzo interno collinare, posto a 545 m.s.l.m. sul versante sinistro del fiume Trigno, al confine con il Molise. Il territorio in cui è collocato degrada progressivamente verso il mare Adriatico da cui dista appena 40 Km."
      },
      {
        hid: "image",
        name: "image",
        content: "https://sangiovannilipioni.net/_nuxt/img/panoramix2.b0cd889.jpg"
      },

      // Open Graph general (Facebook, Pinterest & Google+)

      { hid: "og:title", name: "og:title", content: "Nessuno Escluso" },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "San Giovanni Lipioni è un piccolo paese dell’Abruzzo interno collinare, posto a 545 m.s.l.m. sul versante sinistro del fiume Trigno, al confine con il Molise. Il territorio in cui è collocato degrada progressivamente verso il mare Adriatico da cui dista appena 40 Km."
      },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://sangiovannilipioni.net/_nuxt/img/panoramix2.b0cd889.jpg"
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "https://sangiovannilipioni.net/"
      },
      {
        hid: "og:video",
        name: "og:video",
        content: "https://storage.googleapis.com/sangiovannilipioni/volo%2002%20master.mov"
      },
      { hid: "fb:admins", name: "fb:admins", content: "708154592" },
      { hid: "fb:app_id", name: "fb:app_id", content: "104250825478" },
      { hid: "og:type", name: "og:type", content: "website" },
      { hid: "og:image:type", name: "og:image:type", content: "image/jpeg" },
      { hid: "og:image:width", name: "og:image:width", content: "1600" },
      { hid: "og:image:height", name: "og:image:height", content: "1200" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css"
      }
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/@popperjs/core@latest/dist/umd/popper.min.js",
        type: "text/javascript"
      },
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.min.js",
        type: "text/javascript"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/scss/style"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/global.js",
    "~/plugins/persistedState",
    { src: "./plugins/vue-awesome-swiper.client.js", mode: "client" },
    { src: "~/plugins/medium-zoom.client.js", mode: "client" },
    { src: "~/plugins/vue-masonry.client.js", mode: "client" },
    { src: "~/plugins/vue-pdf.client.js", mode: "client" },
    { src: "~/plugins/vue-plyr.client.js", mode: "client" }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    "@nuxt/image",
    "@nuxtjs/fontawesome",
    "@nuxtjs/google-analytics",
    "@nuxtjs/google-fonts",
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources",
    "@nuxtjs/svg"
  ],

  googleFonts: {
    families: {
      "Libre Franklin": [400, 700],
      "Ubuntu Mono": [400]
    }
  },

  pwa: {
    meta: {
      theme_color: "#cce18d"
    }
  },

  fontawesome: {
    icons: {
      solid: [
        "faArrowLeft",
        "faArrowRight",
        "faCode",
        "faDatabase",
        "faDizzy",
        "faExternalLinkAlt",
        "faImages",
        "faIndustry",
        "faInfoCircle",
        "faList",
        "faMapMarker",
        "faMapMarkerAlt",
        "faMarker",
        "faMinus",
        "faPlus",
        "faServer",
        "faSignOutAlt",
        "faSpinner",
        "faUser"
      ],
      brands: ["faFacebook", "faGithub"]
    }
  },

  googleAnalytics: {
    id: "UA-163898058-3"
  },

  styleResources: {
    scss: ["assets/scss/_variables.scss"]
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://content.nuxtjs.org/
    "@nuxt/content",
    // https://axios.nuxtjs.org/
    "@nuxtjs/axios",
    // https://auth.nuxtjs.org/guide/setup
    "@nuxtjs/auth-next",
    // https://i18n.nuxtjs.org/
    "nuxt-i18n",
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
    "cookie-universal-nuxt"
  ],

  i18n: {
    lazy: true,
    langDir: "lang/",
    vueI18nLoader: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      onlyOnRoot: true, // recommended
      alwaysRedirect: true
    },
    locales: [
      {
        name: "English",
        code: "en",
        iso: "en-US",
        file: "en-US.js"
      },
      {
        name: "Français",
        code: "fr",
        iso: "fr-FR",
        file: "fr-FR.js"
      },
      {
        name: "Italiano",
        code: "it",
        iso: "it-IT",
        file: "it-IT.js"
      }
    ],
    strategy: "prefix_except_default",
    defaultLocale: "it"
  },

  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      home: "/"
    },
    plugins: ["~/plugins/auth.js"],
    strategies: {
      facebook: {
        endpoints: {
          userInfo: "https://graph.facebook.com/v6.0/me?fields=id,name,email,picture{url}"
        },
        clientId: "104250825478",
        scope: ["public_profile", "email"]
      }
    }
  },

  content: {
    markdown: {}
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    extend(config, ctx) {
      config.node = {
        fs: "empty"
      }
      // https://medium.com/js-dojo/debugging-nuxt-js-with-vs-code-60a1a9e75cf6
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map"
      }
    },
    babel: {
      compact: true,
      plugins: [["@babel/plugin-proposal-private-property-in-object", { loose: true }]]
    }
  },

  // https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/
  publicRuntimeConfig: {
    axios: {
      baseURL:
        process.env.NODE_ENV === "production"
          ? "https://api.sangiovannilipioni.net/api/v1"
          : process.env.SGL_API_URL || "http://localhost:3002/api/dev"
    },
    dev: process.env.NODE_ENV !== "production",
    generationTimestamp: process.env.NUXT_ENV_GENERATION_TIMESTAMP,
    gitDirty: process.env.NUXT_ENV_GIT_DIRTY,
    githubUsername: "cthiebaud",
    gitSha: process.env.NUXT_ENV_CURRENT_GIT_SHA,
    gitShaAPI: process.env.NUXT_ENV_API_GIT_SHA,
    packageVersion: version
  },
  privateRuntimeConfig: {
    githubToken: process.env.GITHUB_TOKEN
  },

  // https://nuxtjs.org/docs/2.x/deployment/netlify-deployment/
  generate: {
    fallback: true
  }
}
