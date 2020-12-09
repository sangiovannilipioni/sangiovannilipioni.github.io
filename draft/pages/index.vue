<template>
  <div>
    <!-- 
    <h1>Associazione di Promozione Sociale "Nessuno Escluso"</>
    <h2>San Giovanni Lipioni</h2> 
    <video playsinline autoplay muted loop width="400">
      <source
        src="https://storage.googleapis.com/sangiovannilipioni/volo 02 master.mov"
        type="video/mp4"
      />

      Sorry, your browser doesn't support embedded videos.
    </video>
    -->
    <nuxt-content  :document="presentazione"  />
    
  </div>
</template>
<script>
export default {
   async asyncData ({ $content }) {
    const presentazione = await $content('/articles/presentazione').fetch()

    return {
      presentazione
    }
  }
};
</script>

