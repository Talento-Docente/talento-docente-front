<script lang="ts">
/** External dependencies */
import { defineComponent,ref,reactive } from 'vue'
import { message } from "ant-design-vue";

/** Interfaces */
import type { FlowInterface } from "@/interfaces/flow.interface";

/** Store */
import { flowStore } from '@/stores/flow.store'
import { establishmentStore } from "@/stores/establshment.store";

import type { TableColumnsType } from 'ant-design-vue'

/** Icons */
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons-vue';

const COLUMNS= ref<TableColumnsType>([
  {
    title: 'Nombre',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'Descripcion',
    key: 'description',
    dataIndex: 'description'
  },
  {
    title: 'Acciones',
    key:   'action',
    dataIndex: 'action'
  },
])

export default defineComponent({

  components: {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    message

  },

    data: () => ({
      /** Table */
      columns: COLUMNS,

      /** Modal */
      open:false,
      
      /** Form Modal */
      form: reactive<FlowInterface>({
        establishment_id: null,
        name: null,
        description: null
      }),

      /** Loader */
      loadingFlow: false,
      loadingSave: false,
      loadingDelete: false,
      loadingSend:false,

      /** Store */
      flowStore : flowStore(),
      establishmentStore:establishmentStore()

    }),

    mounted() {
      this.init()
    },

    methods: {
    async init () {
      try {
        this.loadingFlow = true
        await this.flowStore.getFlows()
        this.establishmentStore.getEstablishments();
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingFlow = false
      }
    },

    showModal(){
      this.open = true
    },
    async onFinish() {
      try {
        this.loadingSave= true
        const response = await this.flowStore.createFlow(this.form);
        const { flow, status } = response
        if(status !== "success") {
            message.error("Error al guardar información");
          } else {
            message.success("Creado con exito !");
          }
      }catch (error) {
        console.log({error})
      }
      this.loadingSave= false
      this.open= false
      this.$router.push({ name: "RecruitmentForm", params: { method: 'new', id: '0' } });
    },

    async deleteFlow(flowId: any){
      this.loadingDelete= true
      try {
        const response = await this.flowStore.destroyFlow(flowId)
        const {status} = response
        if(status !== "success") {
            message.error("Error al Eliminar");
          } else {
            message.success("Borrado con exito !");
          }
      } catch (error) {
        console.log({error})
      }finally{
        this.loadingDelete= false
        this.init()
      }
    },

    buttonStatus(){
      if(this.form.name && this.form.description && this.form.establishment_id){
        this.loadingSend = true
      }else{
        this.loadingSend = false
      }
    }
    }

});

</script>

<template lang="pug">
.recruitment-view
    .title.font-size__h3 Reclutamiento

    .filter.margin-top__30
    a-row(:gutter="[20, 20]")

      a-col(:xl="{ span: 6 }")
        a-form-item(label="Buscar por")
          a-input(placeholder="Nombre...")

      a-col
        a-form-item
          a-button(@click="init" type="primary")
            search-outlined
            span Buscar

      a-col
        a-form-item
          a-button(type="primary" @click="(showModal)")
            plus-outlined
            span Crear

    .table.margin-top__20
      a-table(
        :loading="loadingFlow"
        :columns="columns",
        :data-source="flowStore.flows")

        template(#bodyCell="{ column, record, text }")
          template(v-if="column.dataIndex === 'action'")

            a-button().margin-left__10
              EyeOutlined
              span Ver

            a-button(
              type="primary").margin-left__10
              edit-outlined
              span Editar

            a-popconfirm(
            title="¿Estas seguro?",
            ok-text="Si",
            cancel-text="No",
            @confirm="() => deleteFlow(record.id)"
            )
              a-button(type="danger", :loading="loadingDelete").margin-left__10
                delete-outlined
                span Eliminar
      div
        a-modal(v-model:visible="open"
                  :footer="null")
          template(#title)
            span Crear flujo de reclutamiento
          
          div
            a-form(:model="form" @finish="onFinish")

              a-form-item(
              label="Establecimiento"
              name="establishment_id"
              :rules="[{ required: true, message: 'Seleccione un establecimiento' }]")
                a-select(v-model:value="form.establishment_id")
                  a-select-option(v-for="establishment in establishmentStore.establishments", :value="establishment.id") {{ establishment.name }}

              a-form-item(
                label="Nombre del Flujo"
                name="name"
                :rules="[{ required: true, message: 'Ingrese nombre, maximo 20 caracteres', min: 0, max: 20 }]")

                a-input(v-model:value="form.name")

              a-form-item(
                label="Descripcion"
                name="description"
                :rules="[{ required: true, message: 'Ingrese una descripcion', min: 5}]")

                a-textarea(v-model:value="form.description" auto-size)
                
              a-form-item
                a-row(justify="end")
                  a-col
                    a-form-item
                      a-button(html-type="submit" type="primary")
                        span Crear


</template>