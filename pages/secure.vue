<template>
  <div class="container-lg">
    <div role="alert" class="alert alert-warning">{{ this.$t("secureMessage") }}</div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"]
}
</script>
