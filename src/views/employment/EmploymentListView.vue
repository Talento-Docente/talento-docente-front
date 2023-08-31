<script lang="ts">
/** External dependencies */
import { defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue'

/** Internal dependencies */
/** Store */
import { employmentStore } from '@/stores/employment.store'
import { authStore } from '@/stores/auth.store'

/** Interfaces */
import type { TableColumnsType } from 'ant-design-vue'

/** Icons */
import {
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  UserSwitchOutlined
} from '@ant-design/icons-vue';

/** Constants */
const COLUMNS = ref<TableColumnsType>([
  {
    title: 'Titulo',
    key: 'title',
    dataIndex: 'title'
  },
  {
    title: 'Estado',
    key: 'status',
    dataIndex: 'status'
  },
  {
    title: 'Visibilidad',
    key: 'visible',
    dataIndex: 'visible'
  },
  {
    title: 'Formalidad',
    key: 'employment_type',
    dataIndex: 'employment_type'
  },
  {
    title: 'Experiencia',
    key: 'qualification',
    dataIndex: 'qualification'
  },
  {
    title: 'Horario',
    key: 'schedule_type',
    dataIndex: 'schedule_type'
  },
  {
    title: 'Acciones',
    key: 'action',
    dataIndex: 'action'
  }
])
export default defineComponent({

  components: {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
    UserSwitchOutlined
  },

  data: () => ({
    /** Table */
    columns: COLUMNS,

    /** Filters */
    searchBy: {
      search_text: null
    },

    /** Store */
    employmentStore: employmentStore(),
    authStore: authStore(),

    /** Loader */
    loadingEmployment: false,
    loadingDelete: false
  }),

  watch: {
    'authStore.selectedEstablishment'(value) {
      if (value) {
        this.init()
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    async init () {
      try {
        this.loadingEmployment = true
        await this.employmentStore.getEmployments(1, 20, this.searchBy)
      } catch (error: any) {
        this.employmentStore.clearStore()
        console.log({ error })
        message.warn(String(error.message))
      } finally {
        this.loadingEmployment = false
      }
    },

    async deleteElement(employmentId: number) {
      try {
        this.loadingDelete = true
        await this.employmentStore.destroyEmployment(employmentId)
        await this.init()
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingDelete = false
      }
    }
  }

})
</script>

<template lang="pug">
.employment-list
  .title.font-size__h3 Trabajos

  .filter.margin-top__30
    a-row(:gutter="[20, 20]")

      a-col(:xl="{ span: 6 }")
        a-form-item(label="Buscar por")
          a-input(v-model:value="searchBy.search_text", placeholder="Nombre...")

      a-col
        a-form-item
          a-button(@click="init", type="primary")
            search-outlined
            span Buscar

      a-col
        a-form-item
          a-button(@click="() => $router.push({ name: 'EmploymentForm', params: { method: 'new', id: '0' }})", type="primary")
            plus-outlined
            span Crear

  .table.margin-top__20
    a-table(
      :loading="loadingEmployment",
      :columns="columns",
      :data-source="employmentStore.employments")

      template(#bodyCell="{ column, record, text }")

        template(v-if="column.dataIndex === 'status'")
          template(v-if="record.status === 'created'")
            a-tag(color="orange") {{ $filters.employmentStatuses(text) }}

          template(v-if="record.status === 'in_progress'")
            a-tag(color="blue") {{ $filters.employmentStatuses(text) }}

          template(v-if="record.status === 'closed'")
            a-tag(color="green") {{ $filters.employmentStatuses(text) }}

        template(v-if="column.dataIndex === 'visible'")
          template(v-if="text")
            a-tag(color="green") Si
          template(v-else)
            a-tag(color="orange") No

        template(v-if="column.dataIndex === 'employment_type'")
          span {{ $filters.employmentType(text) }}

        template(v-if="column.dataIndex === 'qualification'")
          span {{ $filters.employmentQualifications(text) }}

        template(v-if="column.dataIndex === 'schedule_type'")
          span {{ $filters.employmentScheduleType(text) }}


        template(v-if="column.dataIndex === 'action'")
          a-button(
            type="primary",
            @click="() => $router.push({ name: 'EmploymentJobsView', params: { id: `${record.id}` }})"
          )
            user-switch-outlined
            span Postulantes

          a-button(
            type="primary",
            @click="() => $router.push({ name: 'EmploymentForm', params: { method: 'update', id: `${record.id}` }})"
          ).margin-left__10
            edit-outlined
            span Editar

          a-popconfirm(
            title="¿Estas seguro?",
            ok-text="Si",
            cancel-text="No",
            @confirm="() => deleteElement(record.id)"
          )
            a-button(type="danger", :loading="loadingDelete").margin-left__10
              delete-outlined
              span Eliminar

</template>
