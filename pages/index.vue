<template>
  <div id="bg" class="d-flex align-items-center justify-content-center">
    <h1>{{ $t("hello") }}</h1>
  </div>
</template>

<style scoped lang="scss">
#bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 
  background: url("/jpg/panoramix2.jpg") no-repeat center center fixed;
  background-size: cover;
  */
  h1 {
    font-size: 12rem;
    color: white;
    opacity: 0.4;
  }
}
</style>

<script>
export default {};
</script>

