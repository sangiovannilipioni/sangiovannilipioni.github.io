<template>
  <div class="p-2">

    <TheNavBar />

    <div v-html="src" class="logo w-100 h-100 blurp d-flex justify-content-center align-items-center"></div>

  </div>
</template>

<style>
.blurp {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: auto;
  filter: opacity(10%) blur(3px);
}
.blurp svg {
  width: 100%;
}
</style>

<script>
export default {
  computed: {
    src() {
      const src = require(`assets/svg/Work_in_progress_icon.svg?raw`)
      return src
    }
  }
}
</script>
