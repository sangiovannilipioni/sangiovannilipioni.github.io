<template>
  <div class="container-lg w-100 h-100" style="position: relative">
    <div class="logo h-100 w-100" style="position: absolute" v-html="src"></div>
  </div>
</template>

<style>
body {
  height: 100vh;
}

main {
  height: 100% !important;
}
</style>

<script>

export default {
  layout: "workInProgress",
  computed: {
    src() {
      const src = require(`assets/svg/Work_in_progress_icon.svg?raw`)
      return src
    }
  }
}
</script>
