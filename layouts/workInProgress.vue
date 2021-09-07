<template>
  <div class="d-flex flex-column vh-100">
    <component :is="'style'">
      {{ style }}
    </component>

    <TheNavBar />

    <main role="main" class="wip h-100 flex-grow-1">
      <Nuxt />
    </main>
  </div>
</template>

<style></style>

<script>
export default {
  computed: {
    style() {
      return `
        .wip {
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center center;
          /* background-color: #F96815; 
          background-blend-mode: luminosity; */
          background-image: url(/svg/Work_in_progress_icon.svg);
        }
      `
    }
  }
}
</script>
