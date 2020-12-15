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
.country-icon {
  width: 30px;
  height: 30px;
  display: inline-block;
  vertical-align: baseline;
  border: 1px solid #dee2e6;
  box-shadow: 0px 1px 3px rgba(24, 29, 38, 0.1);
}

.country-icon.as-toggle {
  margin-top: 5px;
}

.locale-name {
  display: inline-block;
  vertical-align: baseline;
}
</style>