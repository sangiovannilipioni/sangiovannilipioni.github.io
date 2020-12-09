export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "draft",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/css/style"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://content.nuxtjs.org/
    "@nuxt/content"
  ],

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