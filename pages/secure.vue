<template>
  <div class="container">
    <div role="alert" class="alert alert-warning">{{ this.$t("secureMessage") }}</div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"]
}
</script>
