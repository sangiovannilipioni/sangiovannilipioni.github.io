<template>
  <div></div>
</template>
<script>
export default {
  async fetch() {
    const proxy = "https://sleepy-cliffs-23560.herokuapp.com/proxy?scheme=https&host=maps.googleapis.com&port=443&path=";
    const path = "maps/api/place/findplacefromtext/json&input=san+giovanni+lipioni";
    this.qwe = await fetch(proxy+path/* , {
      method: 'GET', mode: 'no-cors'
      } */).then((res) => {
      console.log(res);  // .json()
      return null;});
  },
  // call fetch only on client-side
  fetchOnServer: false,
};
</script>

