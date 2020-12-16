<template>
  <video playsinline autoplay muted loop>
    <source :src="src" :type="type" />

    Sorry, your browser doesn't support embedded videos.
  </video>
</template>

<style scoped>
video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

