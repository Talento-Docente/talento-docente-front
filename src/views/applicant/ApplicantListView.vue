<script lang="ts">
/** External dependencies */
import { defineComponent, ref } from 'vue'

/** Internal dependencies */
/** Store */
import { applicantStore } from '@/stores/applicant.store'

/** Interfaces */
import type { TableColumnsType } from 'ant-design-vue'

/** Icons */
import {
  EditOutlined,
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons-vue';

/** Constants */
const COLUMNS = ref<TableColumnsType>([
  {
    title: 'Perfil',
    key: 'user.picture',
    dataIndex: 'picture'
  },
  {
    title: 'Nombre',
    key: 'user.first_name',
    dataIndex: 'first_name'
  },
  {
    title: 'Correo',
    key: 'user.email',
    dataIndex: 'email'
  },
  {
    title: 'Teléfono',
    key: 'phone',
    dataIndex: 'phone'
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
    SearchOutlined,
    PlusOutlined
  },

  data: () => ({
    /** Table */
    columns: COLUMNS,

    /** Store */
    applicantStore: applicantStore(),

    /** Loader */
    loadingApplicant: false
  }),

  mounted () {
    this.init()
  },

  methods: {
    async init () {
      try {
        this.loadingApplicant = true
        await this.applicantStore.getApplicants()
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingApplicant = false
      }
    }
  }

})
</script>

<template lang="pug">
.applicant-list
  .title.font-size__h3 Postulantes

  .filter.margin-top__30
    a-row(:gutter="[20, 20]")

      a-col(:xl="{ span: 6 }")
        a-form-item(label="Buscar por")
          a-input(placeholder="Nombre, dirección, teléfono...")

      a-col
        a-form-item
          a-button(@click="init", type="primary")
            search-outlined
            span Buscar

      a-col
        a-form-item
          a-button(@click="() => $router.push({ name: 'ApplicantForm', params: { method: 'new', id: '0' }})", type="primary")
            plus-outlined
            span Crear

  .table.margin-top__20
    a-table(
      :loading="loadingApplicant",
      :columns="columns",
      :data-source="applicantStore.applicants",
      size="small"
    )

      template(#bodyCell="{ column, record, text }")

        template(v-if="column.dataIndex === 'picture'")
          template(v-if="record.user && record.user.picture")
            a-avatar(:src="record.user.picture", :size="32")
          template(v-else)
            a-avatar(:size="32")
              span { record.user.first_name[0] }}{{ record.user.last_name[0] }}

        template(v-else-if="column.dataIndex === 'first_name'")
          span {{ record.user.first_name }} {{ record.user.last_name }} {{ record.user.second_last_name }}

        template(v-else-if="column.dataIndex === 'email'")
          span {{ record.user.email }}

        template(v-else-if="column.dataIndex === 'action'")
          a-button(
            type="primary",
            @click="() => $router.push({ name: 'ApplicantForm', params: { method: 'update', id: `${record.id}` }})"
          )
            edit-outlined
            span Editar

</template>
