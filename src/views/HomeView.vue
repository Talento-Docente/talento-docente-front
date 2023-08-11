<script lang="ts">
/** External dependencies */
import { defineComponent } from 'vue'

/** Internal dependencies */
/** Stores */
import { employmentStore } from "@/stores/employment.store";

export default defineComponent({

  components: {},

  data () {
    return {
      /** Filters */
      selectStatuses: 'opened',

      /** Stores */
      employmentStore: employmentStore()
    }
  },

  async mounted () {
    await this.employmentStore.getEmployments()
  }

})
</script>

<template lang="pug">
.main
  a-row(justify="center")
    a-col(:xl="{ span: 16 }", :lg="{ span: 12 }", :sm="{ span: 24 }")
      a-card
        a-row(justify="space-between")
          a-col
            h3 Postulaciones
          a-col
            a-button(type="primary").margin-right__10 Agregar Cargo
            a-button(type="primary") Agregar Postulante

        a-row(justify="space-between")
          a-col
            a-radio-group(v-model:value="selectStatuses", size="large")
              a-radio-button(value="opened") Abiertas (10)
              a-radio-button(value="pending") Pendientes  (0)
              a-radio-button(value="draft") En Borrador (1)
              a-radio-button(value="closed") Cerradas (1239)

        a-row(:gutter="[20,20]")
          a-col(
            :xl="{ span: 24 }", :lg="{ span: 12 }", :sm="{ span: 24 }",
            v-for="employment in employmentStore.employments").margin-top__20
            a-card
              a-row(justify="space-between")
                a-col
                  .font-size__20 {{ employment.title }} <span class="font-size__14 margin-left__10"> {{ $filters.employmentType(employment.employment_type) }} </span> <span class="font-size__14 margin-left__10"> {{ $filters.employmentScheduleType(employment.schedule_type) }} </span>
                  .font-size__10 Publicado hace 4 meses por Felipe Vega Herrera

                a-col
                  a-button(type="primary")
                    span Más acciones

              a-row(justify="center", :gutter="[20, 20]").margin-top__20
                a-col
                  a-card.text-align__center
                    .font-size__40 40
                    .font-size__12 Invitaciones enviadas
                a-col
                  a-card.text-align__center
                    .font-size__40 12
                    .font-size__12 Postulantes
                a-col
                  a-card.text-align__center
                    .font-size__40 6
                    .font-size__12 Rechazados
                a-col
                  a-card.text-align__center
                    .font-size__40 29
                    .font-size__12 Filtrados
                a-col
                  a-card.text-align__center
                    .font-size__40 0
                    .font-size__12 Candidatos Reales




</template>
