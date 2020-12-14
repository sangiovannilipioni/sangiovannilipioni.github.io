import { version } from "./package.json";
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Nessuno Escluso",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "theme-color", content: "#ffffff" }
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
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg" }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/css/style"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: "~/plugins/vue-pdf.js", mode: "client" }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    "@nuxtjs/svg",
    "@nuxtjs/fontawesome",
    "@nuxtjs/google-analytics"
  ],

  fontawesome: {
    icons: {
      solid: true,
      brands: true
    }
  },

  googleAnalytics: {
    id: "UA-163898058-3"
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://content.nuxtjs.org/
    "@nuxt/content",
    // https://auth.nuxtjs.org/guide/setup
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    //
    "nuxt-i18n"
  ],

  i18n: {
    lazy: true,
    langDir: "lang/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      onlyOnRoot: true, // recommended
      alwaysRedirect: true
    },
    locales: [
      {
        name: "Italiano",
        code: "it",
        iso: "it-IT",
        file: "it-IT.js"
      },
      {
        name: "English",
        code: "en",
        iso: "en-US",
        file: "en-US.js"
      }
    ],
    defaultLocale: "it"
  },

  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      home: "/"
    },
    strategies: {
      google: {
        // https://github.com/nuxt-community/auth-module/issues/931#issue-764604267
        clientId:
          "804480548931-gis93majiebm1o4idpuilslm5arn9l0k.apps.googleusercontent.com",
        // https://stackoverflow.com/a/64080397/1070215
        // https://github.com/nuxt-community/auth-module/issues/931#issue-764604267
        // https://stackoverflow.com/questions/64073309/parameter-not-allowed-for-this-message-type-code-challenge-method-how-to-fix-i/64080397#64080397
        // https://github.com/nuxt-community/auth-module/issues/850
        codeChallengeMethod: ""
      },
      facebook: {
        endpoints: {
          userInfo:
            "https://graph.facebook.com/v6.0/me?fields=id,name,email,picture{url}"
        },
        clientId: "104250825478",
        scope: ["public_profile", "email"]
      }
    }
  },

  env: {
    packageVersion: version
  },

  content: {
    markdown: {
      remarkPlugins: [["remark-emoji", { emoticon: true }]]
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    /*
     * https://github.com/nuxt-community/dotenv-module/issues/11#issuecomment-640277825
     ** You can extend webpack config here
     */

    extend(config, ctx) {
      config.node = {
        fs: "empty"
      };
    }
  }
};
