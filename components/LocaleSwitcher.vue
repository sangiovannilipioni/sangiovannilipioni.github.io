<template>
  <b-nav-item-dropdown>
    <!-- https://stackoverflow.com/a/53436065 -->
    <template slot="button-content"
      ><b-img
        :src="icons[currentLocale]"
        class=""
        
        width="20px"
        height="20px"
      />
    </template>

    <b-dropdown-item
      v-for="locale in $i18n.locales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
    >
      <b-img :src="icons[locale.code]" 
        class=""
        
        width="20px"
        height="20px" />
      <span class="locale-name">{{ locale.name }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import enIcon from "svg-country-flags/svg/gb.svg";
import frIcon from "svg-country-flags/svg/fr.svg";
import itIcon from "svg-country-flags/svg/it.svg";

export default {
  data() {
    return {
      icons: {
        en: enIcon,
        fr: frIcon,
        it: itIcon,
      },
    };
  },

  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
  },
};
</script>

<style scoped>
.locale-name {
  display: inline-block;
  vertical-align: text-top;
}
</style>