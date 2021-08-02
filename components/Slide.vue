<template>
  <div>
    <nuxt-content :document="slide"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: {},
    };
  },
  async fetch() {
    this.slide = await this.$content(
      `${this.currentLocale}/slides`,
      this.src
    ).fetch();
    console.log(this.slide);
    return { slide: this.slide };
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
  },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
};
</script>