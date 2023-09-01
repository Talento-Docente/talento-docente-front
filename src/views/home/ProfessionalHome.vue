<script lang="ts">
/** External dependencies */
import { defineComponent } from 'vue'

/** Internal dependencies */
/** Stores */
import { authStore } from "@/stores/auth.store";

/** Components */
import LandingJobs from "@/views/landing/LandingJobs.vue";

export default defineComponent({

  components: {
    LandingJobs
  },

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
  landing-jobs

</template>
