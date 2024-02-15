<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import ListView from '../components/ListView.vue'

export default {
  name: 'home',
  components: {ListView},
  setup() {
    const { error, documents } = getCollection('playlists')
    console.log(documents)

    return { error, documents }
  }
}
</script>
