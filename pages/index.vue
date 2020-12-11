<template>
  <div id="bg"></div>
</template>

<style scoped>
#bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/jpg/panoramix2.jpg") no-repeat center center fixed;
  z-index: -1000;
  /* 
  filter: blur(2px) grayscale(50%);
  opacity: 0.2;
  filter: sepia(.5) hue-rotate(-30deg) saturate(1.4); 
  */
}

img.bg {
  /* Set rules to fill background */
  min-height: 100%;
  min-width: 1024px;

  /* Set up proportionate scaling */
  width: 100%;
  height: auto;

  /* Set up positioning */
  position: fixed;
  top: 0;
  left: 0;
}
</style>

<script>
export default {};
</script>

