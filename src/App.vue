<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  data() {
    return {
      count: 1
    }
  }
})

</script>

<template lang="pug">
router-view
</template>
