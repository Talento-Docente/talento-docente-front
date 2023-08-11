<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({

  components: { },

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
.not-found
  p Pagina no se encuentra
  a-button(@click="() => $router.push({ name: 'Landing' })") Volver
</template>

