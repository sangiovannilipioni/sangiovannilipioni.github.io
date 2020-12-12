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
      { rel: "manifest", href: "/site.webmanifest" }
      // { rel: "mask-icon", href:"/safari-pinned-tab.svg", color="#5bbad5"}
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/css/style"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: "~/plugins/vue-pdf.js", mode: "client" }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/svg", "@nuxtjs/fontawesome"],

  fontawesome: {
    icons: {
      solid: true,
      brands: true
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://content.nuxtjs.org/
    "@nuxt/content",
    // https://auth.nuxtjs.org/guide/setup
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],

  auth: {
    // Options
    strategies: {}
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
