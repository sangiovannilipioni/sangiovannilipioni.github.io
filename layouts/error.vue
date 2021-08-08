<!-- https://www.damirscorner.com/blog/posts/20200904-ErrorHandlingInNuxtjs.html -->
<template>
  <div class="container mt-4">
    <h4>
      <b>{{ error.statusCode }}.</b> That’s an error.
    </h4>
    <div v-if="error.statusCode === 404" class="mb-4">
      The requested URL <span class="text-danger">{{ slug }}</span> was not found on this server.
      <div class="text-muted">That's all I know.</div>
    </div>
    <div v-if="error.statusCode === 500" class="mb-4">
      <b>Internal Server Error</b> The server has encountered a situation it doesn't know how to handle.
      <div class="text-muted">That's all I can say.</div>
    </div>
    <NuxtLink to="/">Go back to home page</NuxtLink>
    <div>
      <nuxt-img src="/svg/Logo_sad.svg" class="float-right img-fluid" style="max-width: 25vh" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error", // you can set a custom layout for the error page
  data() {
    return {
      slug: this.$nuxt.$route.path,
    };
  },
};
</script>
