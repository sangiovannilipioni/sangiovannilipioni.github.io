<template>
  <div id="patrimonio" class="container">
    <b-card v-for="unit in units" v-bind:key="unit.index" style="margin-bottom:0.75rem">
        
      <div class="d-flex align-items-center">
        <div class="flex-grow-1 text-left">
            <div>{{ unit.key }}</div>
            <div v-if="unit.foto" ><NuxtLink to="/buildings/A02" ><font-awesome-icon :icon="['fas', 'external-link-alt']" /></NuxtLink></div>
        </div>
        <div class="flex-shrink-1" style="text-align:right"><img class="thmb img-fluid" v-if="unit.foto" :src="'/foto/'+   unit.foto" alt=""></div>
      </div>
        <!--b-card-text></!--b-card-text-->
    </b-card>
  </div>
</template>

<style>
#patrimonio .thmb {
  width: 140px;
  height: auto;
}
</style>

<script>
export default {
  data() {
    return {
      units: [
        { key: "Via Roma, 37", value: "qwe", foto: "GOPR1232.JPG" },
        { key: "Via Vicenne. 4", value: "asd", foto: "GOPR1232.JPG" },
        { key: "...", value: "..." },
        { key: "...", value: "..." },
        { key: "...", value: "..." },
        { key: "...", value: "..." },
        { key: "...", value: "..." },
        { key: "...", value: "..." },
        { key: "...", value: "..." },
        { key: "...", value: "..." },
        { key: "...", value: "..." },
      ],
    };
  },
};
</script>
