
<template>
  <div id="logo" v-html="src"></div>  
</template>

<script>
export default {
    computed: {
        src() {
            const src = require(`assets/svg/logo3.svg?raw`)
            return src
        }
    }
}
</script>
