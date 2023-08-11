<script lang="ts">
/** External dependencies */
import { defineComponent, ref } from 'vue'

/** Internal dependencies */
/** Store */
import { establishmentStore } from '@/stores/establshment.store'

/** Interfaces */
import { message, type TableColumnsType } from 'ant-design-vue'

/** Icons */
import {
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined
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
    PlusOutlined,
    DeleteOutlined,
  },

  data: () => ({
    /** Table */
    columns: COLUMNS,

    /** Store */
    establishmentStore: establishmentStore(),

    /** Loader */
    loadingEstablishment: false,

     /** Const */
    selectedEstablishmentId: ref<number>(0),
    modalText: ref<string>('Esta seguro de eliminar el establecimiento?'),
    visible: ref<boolean>(false),
    confirmLoading: ref<boolean>(false),
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
    },
    async destroyElement(id:any){
      try {
        this.loadingEstablishment = true
        const response = await this.establishmentStore.destroyEstablishment(id)
        await this.init()
        if (response.status !== 'success') {
            message.error('Error al Borrar')
          } else {
            message.success('Borrado exitoso!')
          }
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingEstablishment = false
      }
    },
    //Modal Activator
    showModal(id:any) {
      this.visible = true;
      this.selectedEstablishmentId = parseInt(id)
    },
    //Modal function call before press 'Delete'
    handleOk() {
      this.loadingEstablishment = true
      // this.modalText= 'Eliminando Establecimiento'
      this.confirmLoading= true
      setTimeout(async () => {
        try {
        await this.destroyElement(this.selectedEstablishmentId)
        this.visible = false
        this.confirmLoading = false
        } catch (error) {
          console.log(error)
        }finally {
        this.loadingEstablishment = false
        }
        
      }, 2000);
      // this.modalText= 'Desea eliminar el establecimiento?'
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
            @click="showModal(record.id)"
          ).margin-left__10
            DeleteOutlined
            span Borrar

        template(v-if="column.dataIndex === 'action'")
          a-modal(title="Eliminar Establecimiento" 
          centered 
          v-model:visible="visible" 
          :confirm-Loading="confirmLoading" 
          @ok="handleOk()"
          okText="Eliminar"
          okType="danger"
          )
            p(v-if="!confirmLoading") {{ modalText }}
            a-spin(v-if="confirmLoading" tip="Eliminando establecimiento")
              span 
          
</template>
