<template>

  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="LocaleSwitcherNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <nuxt-img :src="icons[currentLocale]" class="" width="20px" height="20px" style="vertical-align: sub;"/>
    </a>
    <ul class="dropdown-menu" aria-labelledby="LocaleSwitcherNavbarDropdown">
      <li role="presentation" v-for="locale in $i18n.locales" :key="locale.code">
        <nuxt-link :to="switchLocalePath(locale.code)" role="menuitem" target="_self" class="dropdown-item">
          <nuxt-img :src="icons[locale.code]" class="" width="20px" height="20px" style="vertical-align: sub;"/>
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
