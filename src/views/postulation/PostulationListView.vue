<script lang="ts">
/** External dependencies */
import { defineComponent, ref } from 'vue'

/** Internal dependencies */

/** Interfaces */
import type {TableColumnsType } from 'ant-design-vue';

/** Icons */
import {
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
  DownOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons-vue';

/**Testing */
/** Constants Testing */
const COLUMNS = ref<TableColumnsType>([
  {
    title: 'Cargo',
    key: 'job',
    dataIndex: 'job'
  },
  {
    title: 'Establecimiento',
    key: 'establishment',
    dataIndex: 'establishment'
  },
  {
    title: 'Ciudad',
    key: 'location',
    dataIndex: 'location'
  },
  {
    title: 'Estado',
    key: 'status',
    dataIndex: 'status'
  },
  {
    title: 'Fecha de postulacion',
    key: 'date',
    dataIndex: 'date'
  },
  {
    title: 'Acciones',
    key: 'action',
    dataIndex: 'action'
  }
])
const data = [
  {
    id: '1',
    job: 'Sub-Director',
    establishment: 'Colegio San Mariano',
    location: 'Santiago',
    status: "Enviado",
    date:'Hace 18 dias',
    img:"https://randomuser.me/api/portraits/med/women/12.jpg"
  },
  {
    id: '2',
    job: 'Docencia Ingles',
    establishment: 'Colegio San Carlos',
    location: 'Quilicura',
    status: "En proceso",
    date:'Hace 2 dias',
    img:"https://randomuser.me/api/portraits/med/women/50.jpg"
  },
  {
    id: '3',
    job: 'Docencia Matematicas',
    establishment: 'Instituto Comercial San Felipe',
    location: 'Lampa',
    status: "Cancelada",
    date:'Hace 35 dias',
    img:"https://randomuser.me/api/portraits/med/men/50.jpg"
  },
];
const LISTSTATUS = ref(["Pendiente de envio","Enviadas","En proceso","Cancelada"])

export default defineComponent({

  components: {
    EditOutlined,
    SearchOutlined,
    PlusOutlined,
    DownOutlined,
    DeleteOutlined,
    EyeOutlined
  },

  data: () => ({
    /** List */
    listaStatus: LISTSTATUS,
    /**Table */
    Columns:COLUMNS,
    dataTable:data,
    /** Loader */
    loadingEstablishment: false,
  }),

  mounted () {
    
  },

  methods: {
   

  }

})
</script>

<template lang="pug">
.postulation
  .title.font-size__h3 Postulaciones
  .filter.margin-top__20

    a-row(:gutter="[20, 20]")
      a-col(:span="6")
        a-form-item(label="Buscar por")
          a-input(placeholder="Nombre...")

      a-col
        a-dropdown
          template(#overlay)
            a-menu
              a-menu-item(v-for="status in listaStatus")
                a-checkbox
                    span {{ status }}

          a-button()
            span Estado de postulacion
            down-outlined
      
      a-col
        a-form-item
          a-button( type="primary")
            search-outlined
            span Buscar

  .table.margin-top__20
    a-table(
    :columns="Columns",
    :data-source="dataTable")

      template(#bodyCell="{ column, record }")
        template(v-if="column.key === 'job'")
          a-avatar(:src="record.img")
          b ㅤ {{ record.job }}

          //- cambiar el por method para colores!!!!
        template(v-if="column.dataIndex === 'status'")

          div(v-if="record.status === 'Enviado'")
            a-tag(color="green") 
              span {{ record.status }}
          
          div(v-if="record.status === 'En proceso'")
            a-tag(color="blue") 
              span {{ record.status }}
          
          div(v-if="record.status === 'Cancelada'")
            a-tag(color="red") 
              span {{ record.status }}

        template(v-if="column.dataIndex === 'action'")
          div(v-if="record.status !=='Cancelada'")
            a-button(
              shape="round"
              type="secondary"
            )
              edit-outlined
              span Editar
                
            a-button(
              shape="round"
              type="danger"
            )
              DeleteOutlined
              span Cancelar

    //-     template(v-if="column.dataIndex === 'action'")
</template>
