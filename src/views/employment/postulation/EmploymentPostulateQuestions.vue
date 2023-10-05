<script lang="ts">
import { defineComponent } from "vue";

/** Store */
import { employmentStore } from '@/stores/employment.store'
import { authStore } from '@/stores/auth.store'

/** Services */
import { QuillEditor } from "@vueup/vue-quill";

export default defineComponent({

  components: { 
    QuillEditor
  },

  setup() {
    return {};
  },

  data() {
    return {
      /** Store */
      employmentStore: employmentStore(),
      authStore: authStore(),
      

    };
  },

  mounted() {
  },

  methods: {}

});
</script>

<template lang="pug">
.postulate-questions
  .font-size__h3 Postulación a "{{ employmentStore.employment?.title }}"
  a-divider.padding__0.margin__0
  a-row(:gutter="[16,16]", align="middle", justify="center").margin-top__20
  
    a-col(:span="18")
      h4.margin-top__20
        b Señala cuántas horas de práctica debes realizar.
      div
        a-divider.padding__0.margin__0
      div.margin-top__20
        QuillEditor
        
    a-col(:span="18")
      h4.margin-top__20
        b Menciona tus conocimientos en Matematicas y Fisica.
      div
        a-divider.padding__0.margin__0
      div.margin-top__20
        QuillEditor

    a-col(:span="18")
      h4.margin-top__20
        b Indica tu disponibilidad para iniciar.
      div
        a-divider.padding__0.margin__0
      div.margin-top__20
        QuillEditor

</template>

