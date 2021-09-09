export default (context, inject) => {
  const isHomePage = (path) => path === "/" || path === "/fr" || path === "/en" || path === "/fr/" || path === "/en/"
  // Inject in Vue, context and store.
  inject("isHomePage", isHomePage)

  // http://stackoverflow.com/questions/20789373/shuffle-array-in-ng-repeat-angular
  // -> Fisher–Yates shuffle algorithm
  const shuffleArray = (array) => {
    let m = array.length,
      t,
      i
    // while there remain elements to shuffle
    while (m) {
      // pick a remaining element
      i = Math.floor(Math.random() * m--)
      // swap it with the current element
      t = array[m]
      array[m] = array[i]
      array[i] = t
    }
    return array
  }
  // Inject in Vue, context and store.
  inject("shuffleArray", shuffleArray)
}
