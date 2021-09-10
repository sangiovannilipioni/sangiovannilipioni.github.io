// https://stackoverflow.com/a/63341004/1070215
export default ({ app, $auth }) => {
  $auth.onRedirect((to, from) => {
    return app.localePath(to)
  })
}
