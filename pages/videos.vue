<template>
  <div class="album py-5">
    <div class="container">
      <div id="cards" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div v-for="c in cards" :key="c.key">
          <div :id="c.key + '_'" class="col">
            <div
              :id="c.key"
              class="card shadow-sm bg-secondary"
              :style="{ background: 'transparent', position: 'relative' }"
            >
              <a :href="c.slug" :target="'_' + c.key">
                <img class="img-fluid" :src="c.img" alt="" />
              </a>
              <div class="card-body text-light bg-dark"><!-- style="display:none;" -->
                <p class="card-text" style="font-size: smaller;">{{ c.name }}</p>
<!--                 <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <a type="button" :id="'watch_'+key" title="title" class="vid btn btn-sm btn-outline-secondary" :data-id="key" data-text="watch">watch</a>
                  </div>
                  <span class="text-muted" style="font-family:'Courier New', Courier, monospace">0:0</span>
                </div>
 -->              </div>
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
    };
  },
  async fetch() {
    this.cards = await fetch("/cards.json").then((res) => res.json());
  },
  // call fetch only on client-side
  fetchOnServer: false,
};
</script>
<style scoped>
/* 
.card {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.card img {
  cursor: pointer;
}
*/
</style>