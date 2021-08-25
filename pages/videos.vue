<template>
  <div class="album py-5">
    <div class="container">
      <div id="cards" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div v-for="c in cards" :key="c.key">
          <div :id="c.key + '_'" class="col">
            <div :id="c.key" class="card shadow-sm" :style="{ background: 'transparent', position: 'relative' }">
              <vue-plyr v-if="c.vid" :options="options">
                <div data-plyr-provider="youtube" :data-plyr-embed-id="c.vid"></div>
              </vue-plyr>

              <nuxt-img v-else class="img-fluid" :src="c.img" alt="" />

              <div class="card-body">
                <a v-if="c.slug && c.slug != '#'" :href="c.slug" :target="'_' + c.key" class="card-text" style="">
                  {{ c.name }}
                </a>
                <p v-else class="card-text" style="">
                  {{ c.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cards: [],
      options: { mute: true, volume: 0, captions: true }
    }
  },
  async fetch() {
    this.cards = await fetch("/cards.json").then((res) => res.json())
  },
  // call fetch only on client-side
  fetchOnServer: false
}
</script>
<style>
/* 
.card {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.card img {
  cursor: pointer;
}
.card-text {
  font-size: smaller;
}
*/
</style>
