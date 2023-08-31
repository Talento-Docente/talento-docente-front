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
      selectStatuses: 'all',

      /** Stores */
      employmentStore: employmentStore(),

      /** Loader */
      loading: false
    }
  },

  async mounted () {
    await this.refresh()
  },

  methods: {
    async refresh () {
      try {
        this.loading = true
        const searchBy = {} as any
        if (this.selectStatuses !== 'all') {
          searchBy.status = this.selectStatuses
        }
        await this.employmentStore.getResume()
        await this.employmentStore.getEmployments(1, 20, searchBy)
      } catch (e) {
        console.log({ e })
      } finally {
        this.loading = false
      }
    }
  }

})
</script>

<template lang="pug">
.main
  a-row(justify="center")
    a-col(:xl="{ span: 16 }", :lg="{ span: 12 }", :sm="{ span: 24 }")
      a-card(:loading="loading")
        a-row(justify="space-between")
          a-col
            h3 Postulaciones
          a-col
            a-button(type="primary", @click="() => $router.push({ name: 'EmploymentForm', params: { method: 'new', id: '0' }})").margin-right__10 Agregar Trabajo
            a-button(type="primary", @click="refresh").margin-right__10 Actualizar

        a-row(justify="space-between")
          a-col
            a-radio-group(v-model:value="selectStatuses", size="large", @change="refresh")
              a-radio-button(value="all") Todas ({{ employmentStore.meta?.total_elements }})
              a-radio-button(value="created") Creadas ({{ employmentStore.resume?.created }})
              a-radio-button(value="in_progress") En Progreso ({{ employmentStore.resume?.in_progress }})
              a-radio-button(value="closed") Cerradas ({{ employmentStore.resume?.closed }})

        a-row(:gutter="[20,20]")
          template(v-if="employmentStore.employments.length == 0")
            a-col(:xl="{ span: 24 }", :lg="{ span: 12 }", :sm="{ span: 24 }").margin-top__20
              span.margin__20 No hay trabajos publicados
          template(v-else)
            a-col(
              :xl="{ span: 24 }", :lg="{ span: 12 }", :sm="{ span: 24 }",
              v-for="employment in employmentStore.employments").margin-top__20
              a-card
                a-row(justify="space-between")
                  a-col
                    .font-size__20 {{ employment.title }} <span class="font-size__14 margin-left__10"> {{ $filters.employmentType(employment.employment_type) }} </span> <span class="font-size__14 margin-left__10"> {{ $filters.employmentScheduleType(employment.schedule_type) }} </span>
                    //p.font-size__10 Publicado hace 4 meses por Felipe Vega Herrera

                  a-col
                    a-button(type="primary", @click="() => $router.push({ name: 'EmploymentForm', params: { method: 'update', id: `${employment.id}` }})").margin-right__10
                      span Editar

                    a-button(type="primary", @click="() => $router.push({ name: 'EmploymentJobsView', params: { id: `${employment.id}` }})")
                      span Ver Postulantes

                a-row(justify="center", :gutter="[20, 20]").margin-top__20
                  a-col(v-for="stage in employment.flow?.stages")
                    a-card.text-align__center
                      .font-size__40 {{ employment.postulations_resume[stage.id] || 0 }}
                      .font-size__12 {{ stage.name }}

</template>
