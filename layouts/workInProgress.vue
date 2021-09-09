<template>
  <div class="d-flex flex-column vh-100">
    <component :is="'style'">
      {{ style }}
    </component>

    <TheNavBar />

    <main role="main" class="flex-grow-1" style="position: relative">
      <div class="wip" style="position: absolute; top: 10%; right:10%; bottom: 10%; left:10%;">
      </div>
      <Nuxt class="py-2_" style="position: absolute; top: 0; right:0; bottom: 0; left:0;"/>
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
          background-image: url(/svg/Work_in_progress_icon.svg);
        }
      `
    }
  }
}
</script>
