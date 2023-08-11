<script lang="ts">
/** External dependencies */
import { defineComponent } from "vue";

/** Internal dependencies */
/** Store */
import { employmentStore } from "@/stores/employment.store"

/** Icon */
import { AntDesignOutlined } from '@ant-design/icons-vue';

export default defineComponent({

  components: {
  },

  setup() {
    return {
      AntDesignOutlined
    };
  },

  data() {
    return {
      /** Store */
      employmentStore: employmentStore()
    };
  },

  async mounted() {
    await this.employmentStore.getEmployments()
  },

  methods: {}

});
</script>

<template lang="pug">
.landing-jobs
  a-row(justify="center")
    a-col(:xl="{ span: 16 }", :lg="{ span: 16 }", :sm="{ span: 24 }")
      a-card.margin-top__50.margin-bottom__50
        h1.padding__0.margin__0 Un buen trabajo puede cambiar tu vida
        h4.color__gray Talento Docente te permite encontrar y postular fácilmente a trabajos exclusivos en increíbles establecimientos dentro de tu país.

        a-row(justify="space-between")
          a-col(:span="12")
            a-button(type="primary", size="large").margin-top__30 Obten información en tu correo
            a-button(type="link", size="large") Añadir una postulación

            a-row.margin-top__30
              a-col(:span="8")
                .font-size__30.font-weight__bold 1.000 +
                .font-size__16 Profesionales

              a-col(:span="8")
                .font-size__30.font-weight__bold 100 +
                .font-size__16 Establecimientos

              a-col(:span="8")
                .font-size__30.font-weight__bold 1000 +
                .font-size__16 Cargos ocupados

          a-col(:span="12")
            a-row(:gutter="[20, 20]").margin-top__30
              a-col(:span="6")
                a-button(type="outlined", shape="round", block) Matematicas

              a-col(:span="6")
                a-button(type="outlined", shape="round", block) Lenguaje

              a-col(:span="6")
                a-button(type="outlined", shape="round", block) Historia

              a-col(:span="6")
                a-button(type="outlined", shape="round", block) Educación Fisica

              a-col(:span="6")
                a-button(type="outlined", shape="round", block) Pre-Básica

              a-col(:span="6")
                a-button(type="outlined", shape="round", block) Básica

              a-col(:span="6")
                a-button(type="outlined", shape="round", block) Medica

        a-divider

        a-row.margin-top__20
          a-col(:span="24")
            h4 ¿Que es lo que estas buscando?
            a-input-search(size="large", placeholder="Reemplazo, Docente de Matemáticas, Educación Física, Diurna, etc...").width__100

            a-row(:gutter="[20, 20]").margin-top__20
              a-col(:span="24", v-for="employment in employmentStore.employments")
                a-card
                  a-list-item
                    a-list-item-meta
                      template(#avatar)
                        a-avatar(:size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }")
                          template(#icon)
                            AntDesignOutlined

                      template(#title)
                        .font-size__30 {{ employment.title }}

                      template(#description)
                        .font-size__16 {{ employment.description }}

                    template(#actions)
                      a-button(type="primary", size="large") Postular


</template>

