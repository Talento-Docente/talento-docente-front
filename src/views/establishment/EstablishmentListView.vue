<script lang="ts">
/** External dependencies */
import { defineComponent, ref } from 'vue'

/** Internal dependencies */
/** Store */
import { establishmentStore } from '@/stores/establshment.store'

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
    title: 'Nombre',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'Dirección',
    key: 'address',
    dataIndex: 'address'
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
    establishmentStore: establishmentStore(),

    /** Loader */
    loadingEstablishment: false
  }),

  mounted () {
    this.init()
  },

  methods: {
    async init () {
      try {
        this.loadingEstablishment = true
        await this.establishmentStore.getEstablishments()
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingEstablishment = false
      }
    }
  }

})
</script>

<template lang="pug">
.establishment-list
  .title.font-size__h3 Establecimientos

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
          a-button(@click="() => $router.push({ name: 'EstablishmentForm', params: { method: 'new', id: '0' }})", type="primary")
            plus-outlined
            span Crear

  .table.margin-top__20
    a-table(
      :loading="loadingEstablishment",
      :columns="columns",
      :data-source="establishmentStore.establishments")

      template(#bodyCell="{ column, record, text }")
        template(v-if="column.dataIndex === 'action'")
          a-button(
            type="primary",
            @click="() => $router.push({ name: 'EstablishmentForm', params: { method: 'update', id: `${record.id}` }})"
          )
            edit-outlined
            span Editar
        template(v-if="column.dataIndex === 'action'")
          a-button(
            type="danger",
            @click="() => $router.push({ name: 'EstablishmentForm', params: { method: 'delete', id: `${record.id}` }})"
          )
            edit-outlined
            span Borrar
          

</template>
