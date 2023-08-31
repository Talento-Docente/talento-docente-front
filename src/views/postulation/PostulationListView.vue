<script lang="ts">
/** External dependencies */
import { defineComponent, ref } from 'vue'
import { message } from "ant-design-vue";
import type { TableColumnsType } from 'ant-design-vue';

/** Internal dependencies */
/** Interfaces */
import type { PostulationInterface } from '@/interfaces/postulation.interface';

/** Stores */
import { authStore } from '@/stores/auth.store'
import { postulationStore } from '@/stores/postulation.store'

/** Icons */
import {
  EditOutlined,
  EyeFilled,
  SearchOutlined,
  PlusOutlined,
  DownOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons-vue';

/** Constants */
const COLUMNS = ref<TableColumnsType>([
  {
    title: 'Establecimiento',
    key: 'establishment',
    dataIndex: 'establishment'
  },
  {
    title: 'Cargo',
    key: 'employment',
    dataIndex: 'employment'
  },
  {
    title: 'Estado',
    key: 'stage',
    dataIndex: 'stage'
  },
  {
    title: 'Fecha de postulacion',
    key: 'created_at',
    dataIndex: 'created_at'
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
    EyeFilled,
    SearchOutlined,
    PlusOutlined,
    DownOutlined,
    DeleteOutlined,
    EyeOutlined
  },

  data: () => ({
    /**Table */
    columns: COLUMNS,

    /** Filters */
    searchBy: {
      search_text: null
    },

    /** Stores */
    authStore: authStore(),
    postulationStore: postulationStore(),

    /** Loader */
    loadingPostulation: false,
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
        this.loadingPostulation = true
        await this.postulationStore.getPostulations(1, 20, this.searchBy)
      } catch (error: any) {
        console.log({ error })
        message.warn(String(error.message))
      } finally {
        this.loadingPostulation = false
      }
    },

    async deleteElement(postulationId: number) {
      try {
        this.loadingDelete = true
        await this.postulationStore.destroyPostulation(postulationId)
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
.postulation
  .title.font-size__h3 Mis Postulaciones

  .filter.margin-top__20
    a-row(:gutter="[20, 20]")
      a-col(:span="6")
        a-form-item(label="Buscar por")
          a-input(v-model:value="searchBy.search_text", placeholder="Cargo o Establecimiento...")

      a-col
        a-form-item
          a-button(type="primary", @click="init")
            search-outlined
            span Buscar

  .table.margin-top__20
    a-table(
    :columns="columns",
    :data-source="postulationStore.postulations")

      template(#bodyCell="{ column, record, text }")

        template(v-if="column.key === 'establishment'")
          a-avatar.margin-right__10
          span {{ record.establishment?.name }}

        template(v-if="column.key === 'employment'")
          span {{ record.employment?.title }}

        template(v-if="column.key === 'stage'")
          span {{ record.stage?.name }}

        template(v-if="column.key === 'created_at'")
          span {{ $filters.date(text) }}

        template(v-if="column.dataIndex === 'action'")
          div(v-if="record.status !=='Cancelada'")
            a-button(
              type="primary"
            )
              eye-outlined
              span Revisar

            a-button(
              type="danger"
            ).margin-left__10
              span Cancelar mi Postulación
</template>
