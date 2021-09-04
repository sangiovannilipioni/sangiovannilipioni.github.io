export default (context, inject) => {
    const isHomePage = (path) => path === "/" || path === "/fr" || path === "/en" || path === "/fr/" || path === "/en/"
    // Inject $hello(msg) in Vue, context and store.
    inject('isHomePage', isHomePage)
  }