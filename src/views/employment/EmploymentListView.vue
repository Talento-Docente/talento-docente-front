<script lang="ts">
/** External dependencies */
import { defineComponent, ref } from 'vue'

/** Internal dependencies */
/** Store */

/** Interfaces */

/** Icons */
import {
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
  LoadingOutlined,
  DownOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons-vue';

/**Testing */
interface DataItem {
    id: number | null
    job: string | null
    description: string | null
    tag: string[] | string[]
    loc: string | null
    estab:string | null
    img: string | null

}

/** Constants Testing */
const COLUMNSFILTER = ref(["LENGUAJE","MATEMATICA","HISTORIA","INGLES"])
const COLUMNSREGION = ref(["SANTIAGO","VALPARAISO","VIÑA DEL MAR","RANCAGUA","CURICO","COPIAPO"])
const COLUMNSGRADE = ref(["PRE-PARVULO","PARVULO","BASICO","MEDIA"])
const COLUMNSJOBS : DataItem[]= [
    {
        id:1,
        job:"Sub-Director",
        description:"Se busca Docente con experiencia de al menos 5 años",
        tag:["ingles","Matematica","Lenguaje","Administracion"],
        loc:"Santiago",
        estab:"Colegio San Mariano",
        img:"https://randomuser.me/api/portraits/med/men/50.jpg"
    },
    {
        id:2,
        job:"Docente en Matematicas",
        description:"Se busca docente experto en matematicas con experiencia de 2 años",
        tag:["Matematica"],
        loc:"Valparaiso",
        estab:"Colegio Gran Santiago",
        img:"https://randomuser.me/api/portraits/med/women/50.jpg"
    },
    {
        id:3,
        job:"Docente en lenguaje",
        description:"Se busca docente",
        tag:["Lenguaje"],
        loc:"Talca",
        estab:"Colegio Politecnico de Talca",
        img:"https://randomuser.me/api/portraits/med/women/5.jpg"
    },
    {
        id:4,
        job:"Docente / flexibilidad",
        description:"Se busca docente con conocimientos en todas las materias",
        tag:["ingles","Matematica","Lenguaje"],
        loc:"Quilicura",
        estab:"Instituto Comercial Francisco Hernandez",
        img:"https://randomuser.me/api/portraits/med/men/39.jpg"
    },
    {
        id:5,
        job:"Auxiliar de Inspección",
        description:"Se solicita personal para la supervision y tareas de asistente/inspector",
        tag:["ingles","Matematica","Lenguaje","Administracion","auxiliar"],
        loc:"Conchalí",
        estab:"Colegio Nuevo Amanecer de Conchalí",
        img:"https://randomuser.me/api/portraits/med/women/51.jpg"
    },
]
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
    columnsf: COLUMNSFILTER,
    columnsCiudad:COLUMNSREGION,
    columnsGrade:COLUMNSGRADE,
    columnsJobs:COLUMNSJOBS,
  }),

  mounted () {
    
  },

  methods: {
   

  }

})
</script>

<template lang="pug">
.employment
    .title.font-size__h3 Empleos
    .filter.margin-top__30
    a-row(:gutter="[20, 20]")
        a-col
            a-dropdown
                template(#overlay)
                    a-menu
                        a-menu-item(v-for="materia in columnsf")
                            a-checkbox
                                span {{ materia }}
                a-button(type="primary")
                    span Especialidad
                    down-outlined
        a-col
            a-dropdown
                template(#overlay)
                    a-menu
                        a-menu-item(v-for="city in columnsCiudad")
                            a-checkbox
                                span {{ city }}
                a-button(type="primary")
                    span Localidad
                    down-outlined

        a-col
            a-dropdown
                template(#overlay)
                    a-menu
                        a-menu-item(v-for="grade in columnsGrade")
                            a-checkbox
                                span {{ grade }}
                a-button(type="primary")
                    span Grado Academico
                    down-outlined

    a-row(:gutter="[20, 20]").margin-top__20

      a-col(:xl="{ span: 6 }")
        a-form-item(label="Filtrar:")
          a-input(placeholder="Especialidad, Localidad, Grado, Tag...")

      a-col
        a-form-item
          a-button( type="primary")
            search-outlined
            span Filtrar

      a-col
        a-form-item
          a-button(type="primary")
            //-(@click="() => $router.push({ name: 'EstablishmentForm', params: { method: 'new', id: '0' }})", type="primary")
            plus-outlined
            span Crear
    .list.margin-top__20
        a-list(
            item-layout="horizontal"
            :data-source="columnsJobs"
            hovable)
            //- template(#loadMore)
            //-     div(v-if="!initLoading && !loading"
            //-         :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }")
            //-         a-button
            //-         span loading more
            template(#renderItem="{ item }")
                a-list-item

                    template(#actions)
                        a-button(shape="round")
                            edit-outlined 
                            span Editar
                        a-button(shape="round" type="danger")
                            delete-outlined 
                            span Borrar
                    a-skeleton(avatar :title="false" :loading="false" active)
                        a-list-item-meta
                            
                            template(#description)
                                div
                                    a-typography-text {{ item.description }}
                                span {{ item.estab }} -ㅤ
                                span {{ item.loc }}

                            template(#title)
                                b {{item.job}}

                            template(#avatar)
                                a-avatar(:src="item.img")


                        div(v-for="tag in item.tag")
                            a-tag()
                                span {{ tag }}
    
</template>
