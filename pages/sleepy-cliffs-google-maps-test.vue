<template>
  <div>{{ qweasdzxc }}</div>
</template>
<script>
export default {
  data() {
    return {
      qweasdzxc: undefined
    }
  },
  async fetch() {
    const proxy = "https://sleepy-cliffs-23560.herokuapp.com/proxy?scheme=https&host=maps.googleapis.com&port=443&path="
    const path = "maps/api/place/findplacefromtext/json&input=san+giovanni+lipioni"
    const url = proxy + path
    // console.log(url)
    await fetch(url).then((value) => {
      // console.log("RESOLVE", value)
      this.qweasdzxc = JSON.stringify(value)
    }, (explanation) => {
      // console.log("REJECT", explanation)
      this.qweasdzxc = explanation
    })
  },
  // call fetch only on client-side
  fetchOnServer: true
}
</script>
