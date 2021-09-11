<template>
  <div class="d-flex flex-column vh-100">
    <TheNavBar />

    <main role="main" :class="$store.$isHomePage($route.path) ? 'home' : 'not-home'">
      <Nuxt />
    </main>

    <TheFooter />
  </div>
</template>

<script>
export default {}
</script>
