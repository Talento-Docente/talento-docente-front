<script lang="ts">
/** External dependencies */
import { defineComponent, ref, reactive} from 'vue'

/** Internal dependencies */
/** Store */
import { applicantStore } from '@/stores/applicant.store'

/** Interfaces */
import type { TableColumnsType, SelectProps } from 'ant-design-vue'

/** Icons */
import {
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
  DownOutlined
} from '@ant-design/icons-vue';

/** Constants */
const COLUMNS = [
  {
    title: 'Nombre',
    dataIndex: 'name',
  },
  {
    title: 'Edad',
    dataIndex: 'age',
  },
  {
    title: 'Tag',
    dataIndex: 'tags',
  },
  {
    title: 'Profesión',
    dataIndex: 'profession',
  },
]

type Key = string | number;


interface DataType {
  key: Key
  name: string
  age: number
  profession: string
  tags:[]
}

interface ReactiveInterface{
  selectedRowKeys: Key[]
  loading: boolean
}

export default defineComponent({

  components: {
    EditOutlined,
    SearchOutlined,
    PlusOutlined,
    DownOutlined
  },

  data: () => ({
      /** Table */
      columns: COLUMNS,
      applicants:[{
      key: '4',
      name: 'Luis jara',
      age: 32,
      profession: 'Docente en Matematicas e ingles',
      tags: ['Matematicas', 'Ingles'],
    },
    {
      key: '2',
      name: 'Antonio Rios',
      age: 42,
      profession: 'Docente Auxiliar de Lenguaje',
      tags: ['Lenguaje'],
    },
    {
      key: '3',
      name: 'Sebastian Henriquez',
      age: 32,
      profession: 'Profesor en ciencias ',
      tags: ['Ciencias', 'Docente'],
    },
    ],

    state: reactive<ReactiveInterface>({
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    }),

    /** Habilities Filter */
    options : ref<SelectProps['options']>([
      {
        value: 'math_tech',
        label: 'Matematicas',
      },
      {
        value: 'cie_tech',
        label: 'Ciencias',
      },
      {
        value: 'eng',
        label: 'Ingles',
      },
      {
        value: 'aux',
        label: 'Profesor de auxiliar',
      },
    ]),
    profOptions : ref<SelectProps['options']>([
        {
          value: 'math_doc',
          label: 'Docente de Matematicas',
        },
        {
          value: 'cie_tech',
          label: 'Docente de Ciencias',
        },
        {
          value: 'eng',
          label: 'Docente de Ingles',
        },
        {
          value: 'aux',
          label: 'ing. calculo',
        },
      ]),


  
    /** Store */
    applicantStore: applicantStore(),

    /** Loader */
    loadingApplicant: false
  }),

  mounted () {
    this.init()
  },

  computed: {
    hasSelected() {
      return this.state.selectedRowKeys.length > 0
    }
  },

  methods: {
    async init () {

    },

    start ()  {
      this.state.loading = true;
      setTimeout(() => {
        this.state.loading = false;
        this.state.selectedRowKeys = [];
      }, 1000);
    },

    onSelectChange (selectedRowKeys: Key[], selectedRows: DataType[])  {
      console.log('Fila seleccionada: ', selectedRows);
      this.state.selectedRowKeys = selectedRowKeys;
    },

  },

})
</script>

<template lang="pug">
.applicant-list
  .title.font-size__h3 Postulantes

  .filter.margin-top__30
    a-row(:gutter="[20, 20]" )

      a-col(:xl="{ span: 6 }")
        a-form-item(label="Filtrar por")
          a-input(placeholder="Nombre, apellido, correo...")

      a-col
        a-form-item
          a-button(@click="init", type="primary")
            search-outlined
            span Filtrar
          
      a-col(:xl="{ span: 4 }").margin-left__30
      
        a-select(
            mode="multiple"
            style="width: 100%"
            :token-separators="[',']"
            placeholder="Profesión..."
            :options="profOptions")
      a-col
        a-button(@click="init", type="primary")
          search-outlined
          span Filtrar por Profesion

      a-col(:xl="{ span: 4 }").margin-left__30
        a-select(
            mode="multiple"
            style="width: 100%"
            :token-separators="[',']"
            placeholder="habilidades..."
            :options="options")

      a-col
        a-button(@click="init", type="primary")
          search-outlined
          span Filtrar por tag 
            

      //- a-col
      //-   a-form-item
      //-     a-button(@click="() => $router.push({ name: 'ApplicantForm', params: { method: 'new', id: '0' }})", type="primary")
      //-       plus-outlined
      //-       span Crear

  .table.margin-top__20

  div
    div(:style="'margin-bottom: 16px'")
      a-button(type="primary" :disabled="!hasSelected" :loading="state.loading" @click="start")
        span Transferir
      span(:style="'margin-left: 8px'")
        template(v-if="hasSelected")
          span {{ `Seleccionados ${state.selectedRowKeys.length}` }}
    a-table(
      :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data-source="applicants")

      template(#bodyCell="{ column, record, text }")

        template(v-if="column.dataIndex === 'tags'")
          a-tag(v-for="tag in record.tags")
            span {{ tag.toUpperCase() }}


</template>
