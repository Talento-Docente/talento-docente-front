<script lang="ts">
import { defineComponent } from "vue";
import LandingNavbar from "@/views/landing/LandingNavbar.vue";
import LandingJobs from "@/views/landing/LandingJobs.vue";

export default defineComponent({

  components: { LandingJobs, LandingNavbar },

  setup() {
    return {};
  },

  data() {
    return {};
  },

  mounted() {
  },

  methods: {}

});
</script>

<template lang="pug">
.landing-schema
  a-layout
    landing-navbar
    landing-jobs
</template>

