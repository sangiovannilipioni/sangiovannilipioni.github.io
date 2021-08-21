<template>
  <li class="nav-item b-nav-dropdown dropdown">
    <a role="button" href="#" target="_self" class="nav-link dropdown-toggle" data-toggle="dropdown">
      <img :src="icons[currentLocale]" class="" width="20px" height="20px" />
    </a>
    <ul tabindex="-1" class="dropdown-menu">
      <li role="presentation" v-for="locale in $i18n.locales" :key="locale.code">
        <nuxt-link :to="switchLocalePath(locale.code)" role="menuitem" target="_self" class="dropdown-item">
          <img :src="icons[locale.code]" class="" width="20px" height="20px" />
          <span class="locale-name">{{ locale.name }}</span>
        </nuxt-link>
      </li>
    </ul>
  </li>
</template>

<script>
import enIcon from "svg-country-flags/svg/gb.svg"
import frIcon from "svg-country-flags/svg/fr.svg"
import itIcon from "svg-country-flags/svg/it.svg"

export default {
  data() {
    return {
      icons: {
        en: enIcon,
        fr: frIcon,
        it: itIcon
      }
    }
  },

  computed: {
    currentLocale() {
      return this.$i18n.locale
    }
  }
}
</script>

<style scoped>
.locale-name {
  display: inline-block;
  vertical-align: text-top;
}
</style>
