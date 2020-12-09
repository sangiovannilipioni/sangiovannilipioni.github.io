<template>
  <div class="logos mx-auto">
    <div v-html="src"></div>
    <div v-html="src1"></div>
    <div v-html="src2"></div>
    <div v-html="src3"></div>
  </div>
</template>
<style>

.logos svg {
  width: 96px;
  height: auto;
}
.logos svg path {
    stroke-width: 32;
}
  
.logos div {
padding: 10px;
}

</style>
<script>
export default {
    name: 'Icon',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    computed: {
        src() {
            const src = require(`assets/svg/logo.svg?raw`)
            return src
        },
        src1() {
            const src = require(`assets/svg/logo1.svg?raw`)
            return src
        },
        src2() {
            const src = require(`assets/svg/logo2.svg?raw`)
            return src
        },
        src3() {
            const src = require(`assets/svg/logo3.svg?raw`)
            return src
        }
    }
}
</script>