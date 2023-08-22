<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from "vue";
import type { FormInstance } from 'ant-design-vue';

/** Internal dependencies */
/** Store */
import { testStore } from '@/stores/test.store'
import { authStore } from "@/stores/auth.store";

/** Interfaces */
import { message, type TableColumnsType } from 'ant-design-vue'
import type { TestInterface } from "@/interfaces/test.interface"

/** Icons */
import {
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue';

/** Constants */
import { TIME_TYPES } from '@/constants/test.constants'
const COLUMNS = ref<TableColumnsType>([
  {
    title: 'Nombre',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'Descripción',
    key: 'description',
    dataIndex: 'description'
  },
  {
    title: 'Tipo de Tiempo',
    key: 'time_type',
    dataIndex: 'time_type'
  },
  {
    title: 'Valor Tiempo',
    key: 'time_value',
    dataIndex: 'time_value'
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
    testStore: testStore(),
    authStore: authStore(),

    /** Loader */
    loadingTest: ref<boolean>(false),
    loadingCreate: ref<boolean>(false),
    confirmLoading: ref<boolean>(false),

    /** Modal Create */
    labelCol: { style: { width: '150px' } },
    wrapperCol: { span: 24 },
    visibleModalCreate: false,
    formCreate: reactive<TestInterface>({
      name: null,
      description: null,
      time_type: null,
      time_value: null
    }),

    /** Delete Element */
    selectedTestId: ref<number>(0),
    modalText: ref<string>('Esta seguro de eliminar?'),
    visible: ref<boolean>(false),

    /** Constants */
    TIME_TYPES
  }),

  setup () {
    const refFormCreate =  ref<FormInstance>()
    return {
      refFormCreate
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    async init () {
      try {
        this.loadingTest = true
        await this.testStore.getTests()
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingTest = false
      }
    },

    openModalCreate() {
      this.visibleModalCreate = true
    },

    clearFormModalCreate() {
      this.formCreate = reactive<TestInterface>({
        name: null,
        description: null,
        time_type: null,
        time_value: null
      })
      this.visibleModalCreate = false
    },

    async saveTest () {
      try {
        if (this.refFormCreate) {
          this.loadingCreate = false
          const values = await this.refFormCreate.validateFields()
          values.establishment_id = this.authStore.selectedEstablishmentId
          const response = await this.testStore.createTest(values)
          if (response.status !== 'success') {
            message.error('Error al guardar información')
          } else {
            message.success('Creación exitosa')
            this.clearFormModalCreate()
            this.$router.push({ name: 'TestForm', params: { method: 'update', id: response.test.id } })
          }
        }
      } catch (error) {
        console.log({ error })
        message.error('Error al guardar información')

      } finally {
        this.loadingCreate = false
      }
    },

    showModal(id:any) {
      this.visible = true;
      this.selectedTestId = parseInt(id)
    },

    handleOk() {
      this.loadingTest = true
      this.confirmLoading = true
      setTimeout(async () => {
        try {
          await this.destroyElement(this.selectedTestId)
          this.visible = false
          this.confirmLoading = false
        } catch (error) {
          console.log(error)
        } finally {
          this.loadingTest = false
        }
      }, 2000);
    },

    async destroyElement(id:any){
      try {
        this.loadingTest = true
        const response = await this.testStore.destroyTest(id)
        await this.init()
        if (response.status !== 'success') {
          message.error('Error al Borrar')
        } else {
          message.success('Borrado exitoso!')
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingTest = false
      }
    },
  }

})
</script>

<template lang="pug">
.test-list
  .title
    a-row(align="middle")
      a-col
        a-button(type="primary", @click="() => $router.go(-1)").margin-right__10 Volver
      a-col
        .font-size__h3 Pruebas

  .filter.margin-top__30
    a-row(:gutter="[20, 20]")

      a-col(:xl="{ span: 6 }")
        a-form-item(label="Buscar por")
          a-input(placeholder="Nombre, description...")

      a-col
        a-form-item
          a-button(@click="init", type="primary")
            search-outlined
            span Buscar

      a-col
        a-form-item
          a-button(@click="() => openModalCreate()", type="primary")
            plus-outlined
            span Crear

  .table.margin-top__20
    a-table(
      :loading="loadingTest",
      :columns="columns",
      :data-source="testStore.tests")

      template(#bodyCell="{ column, record, text }")

        template(v-if="column.dataIndex === 'time_type'")
          span {{ $filters.testTimeTypes(text) }}

        template(v-if="column.dataIndex === 'time_value'")
          template(v-if="record.time_type !== 'infinite'")
            span {{ text }}
          template(v-else)
            span -

        template(v-if="column.dataIndex === 'action'")
          a-button(
            type="primary",
            @click="() => $router.push({ name: 'TestForm', params: { method: 'update', id: `${record.id}` }})"
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

  a-modal(
    title="Eliminar"
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

  a-modal(
    title="Creación de Prueba",
    centered,
    v-model:visible="visibleModalCreate"
    :confirm-Loading="loadingCreate"
    @ok="saveTest"
    @cancel="clearFormModalCreate()",
    okText="Guardar"
  )
    a-form(ref="refFormCreate", :model="formCreate", @finish="saveTest", :label-col="labelCol" :wrapper-col="wrapperCol")
      a-row
        a-col(:xl="{ span: 24 }")

          a-form-item(
            label="Nombre"
            name="name"
            :rules="[{ required: true, message: 'Ingrese nombre de test' }]")
            a-input(v-model:value="formCreate.name")

          a-form-item(
            label="Descripción"
            name="description"
            :rules="[{ required: true, message: 'Ingrese description de test' }]")
            a-textarea(v-model:value="formCreate.description", :rows="10", :max="100")

          a-form-item(
            label="Tipo de tiempo"
            name="time_type"
            :rules="[{ required: true, message: 'Selección tipo de tiempo' }]")
            a-select(v-model:value="formCreate.time_type")
              a-select-option(:value="timeType.key", v-for="timeType in TIME_TYPES") {{ timeType.value }}

          a-form-item(
            v-if="formCreate.time_type !== 'infinite'",
            label="Valor tiempo"
            name="time_value"
            :rules="[{ required: false, message: 'Ingrese cantidad de tiempo' }]")
            a-input(v-model:value="formCreate.time_value")


</template>
