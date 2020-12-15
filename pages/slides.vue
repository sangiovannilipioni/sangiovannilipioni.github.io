<template>
  <div class="row">
    <vueper-slides class="col" fractions progress>
      <vueper-slide
        v-for="(slide, i) in slides"
        :key="i"
        :title="slide.title"
        :content="slide.content"
      ></vueper-slide>
    </vueper-slides>
  </div>
</template>

<style scoped>
.vueperslides__progress {
  background: rgba(0, 0, 0, 0.25);
  color: #ff5252;
}
</style>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      slides: [
        {
          title: "Slide #1",
          content: "Slide content.",
        },
        {
          title: "Slide #2",
          content: 'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: yellow">why not?</span>',
        },
        {
          title: "Slide #3",
          content: "Slide content.",
        },
      ],
    };
  },
};
</script>

