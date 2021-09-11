<template>
  <div class="d-flex flex-column vh-100">
    <TheNavBar />

    <main role="main" class="flex-grow-1" style="position: relative">
      <div class="wip" style="position: absolute; top: 10%; right: 10%; bottom: 10%; left: 10%"></div>
      <Nuxt style="position: absolute; top: 1rem; right: 0; bottom: 0; left: 0" />
    </main>
  </div>
</template>

<style>
.wip {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  background-image: url(/svg/Work_in_progress_icon.svg);
}
</style>

<script>
export default {}
</script>
