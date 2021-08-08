<template>
  <div class="album py-5">
    <div class="container">
      <div id="cards" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div v-for="item in items" :key="item.pathShort">
          <div :id="item.pathShort + '_'" class="col">
            <div
              :id="item.pathShort"
              class="card shadow-sm"
              :style="{ background: 'transparent', position: 'relative' }"
            >
              <nuxt-img class="img-fluid" :src="item.pathLong" alt="" />

              <!-- <div class="card-body">
                <p class="card-text" style="">
                  {{ item.pathShort }}
                </p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "photoGallery",

  data() {
    return {
      items: [],
    };
  },

  mounted() {
    const f = require.context("../static/jpeg", true, /\.jpg$/);
    f.keys().forEach((key) => {
      this.items.push({ pathLong: f(key), pathShort: key });
    });
  },
};
</script>
<style>
</style>