<script lang="ts">
/** External dependencies */
import { defineComponent } from 'vue'

/** Internal dependencies */
/** Stores */
import { authStore } from "@/stores/auth.store";

export default defineComponent({

  components: {},

  data () {
    return {
      /** Stores */
      authStore: authStore(),

      /** Loader */
      loading: false
    }
  },

  async mounted () {
  },

  methods: {
  }

})
</script>

<template lang="pug">
.main
  span Por definir

</template>
