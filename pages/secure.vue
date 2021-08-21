<template>
  <div class="container">
    <div role="alert" class="alert alert-warning">This is a secure page!</div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"]
}
</script>
