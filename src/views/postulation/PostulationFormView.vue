<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import type { TableColumnsType } from 'ant-design-vue';

/** Internal dependencies */
/** Store */
import { postulationStore } from '@/stores/postulation.store'

/** Interfaces */
import type { PostulationInterface } from '@/interfaces/postulation.interface'

/** Constants */
const COLUMNS = ref<TableColumnsType>([
  {
    title: 'Actividad',
    key: 'activity',
    dataIndex: 'activity'
  },
  // {
  //   title: 'Nombre',
  //   key: 'name',
  //   dataIndex: 'name'
  // },
  {
    title: 'Descripción',
    key: 'description',
    dataIndex: 'description'
  },
  {
    title: 'Duración',
    key: 'duration',
    dataIndex: 'duration'
  },
  {
    title: 'Estado',
    key: 'status',
    dataIndex: 'status'
  },
  {
    title: 'Acciones',
    key: 'action',
    dataIndex: 'action'
  }
])

export default defineComponent({

  data: () => ({
    /** Form */
    labelCol: { style: { width: '150px' } },
    wrapperCol: { span: 24 },
    selectedPostulationId: ref<number>(0),
    selectedMethod: ref<string | string[]>('new'),

    postulationActivities: [] as any,

    /** Table */
    columns: COLUMNS,

    /** Store */
    postulationStore: postulationStore(),

    /** Loader */
    loadingPostulation: false,
    loadingSave: false
  }),

  async mounted() {
    const { method, id } = this.$route.params
    if (method && id) {
      this.selectedPostulationId = parseInt(`${id}`, 10)
      this.selectedMethod = method
      if (method === 'show') {
        await this.getPostulation()
      }
    } else {
      message.error('Error al obtener información')
      this.back()
    }
  },

  methods: {
    back () {
      this.$router.push({ name: 'PostulationList' })
    },

    async getPostulation() {
      try {
        this.loadingPostulation = true
        await this.postulationStore.getPostulation(this.selectedPostulationId)
        const response = await this.postulationStore.getActivities(this.selectedPostulationId)
        console.log({ response })
        this.postulationActivities = response.postulation_activities
      } catch (error) {
        console.log({ error })
        this.back()

      } finally {
        this.loadingPostulation = false
      }
    },

    async onFinish(values: any) {
      try {
        // this.loadingSave = true
        // if (this.selectedMethod === 'new') {
        //   const response = await this.postulationStore.createPostulation(values)
        //   if (response.status !== 'success') {
        //     message.error('Error al guardar información')
        //   } else {
        //     message.success('Actualización exitosa')
        //     this.back()
        //   }
        // } else {
        //   const response = await this.postulationStore.updatePostulation(this.selectedPostulationId, values)
        //   if (response.status !== 'success') {
        //     message.error('Error al guardar información')
        //   } else {
        //     message.success('Actualización exitosa')
        //     this.back()
        //   }
        // }

      } catch (error) {
        console.log({ error })
        message.error('Error al guardar información')

      } finally {
        this.loadingSave = false

      }
    }
  }

})

</script>

<template lang="pug">
.postulation-form
  a-row
    a-col
      a-button(type="primary", @click="() => $router.push({ name: 'Postulation' })").margin-top__5.margin-right__10 Volver
      a-button(type="primary", @click="getPostulation").margin-top__5.margin-right__10 Refrescar
    a-col
      .font-size__h3 Postulación a {{ postulationStore.postulation?.employment?.title }} en {{ postulationStore.postulation?.establishment?.name }}

  a-table(
    :columns="columns",
    :data-source="postulationActivities").margin-top__40

    template(#emptyText)
      span No actividades pendientes

    template(#bodyCell="{ column, record, text }")

      template(v-if="column.key === 'activity'")
        template(v-if="record.postulation_activity.reference_type === 'document'")
          a-tag(color="blue") DOCUMENTO
          .font-size__14.padding__0.margin__0 {{ record.stage_configuration_reference.name }}

        template(v-else-if="record.postulation_activity.reference_type === 'test'")
          a-tag(color="blue") Prueba
          .font-size__14.padding__0.margin__0 {{ record.resource.name }}

      template(v-if="column.key === 'description'")
        template(v-if="record.postulation_activity.reference_type === 'document'")
          .font-size__12.padding__0.margin__0 {{ record.stage_configuration_reference.description }}

        template(v-else-if="record.postulation_activity.reference_type === 'test'")
          .font-size__12.padding__0.margin__0 {{ record.resource.description }}

      template(v-if="column.key === 'duration'")
        span Por Definir
        //template(v-if="record.postulation_activity.reference_type === 'document'")
        //  .font-size__12.padding__0.margin__0 {{ record.stage_configuration_reference.description }}
        //
        //template(v-else-if="record.postulation_activity.reference_type === 'test'")
        //  .font-size__12.padding__0.margin__0 {{ record.resource.description }}

      template(v-if="column.key === 'status'")
        template(v-if="record.postulation_activity.status === 'created'")
          a-tag(color="warning") Pendiente
        template(v-else)
          a-tag(color="green") Realizado

      template(v-if="column.dataIndex === 'action'")
        a-button(
          :disbled="record.postulation_activity.status === 'realized'",
          type="primary",
          @click="() => $router.push({ name: 'PostulationForm', params: { method: 'show', id: `${record.id}` }})"
        )
          span Realizar

</template>
