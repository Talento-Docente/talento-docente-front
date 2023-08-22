<script lang="ts">
/** External dependencies */
import { defineComponent, ref, reactive } from "vue";
import { message } from "ant-design-vue";
import type { TableColumnsType, FormInstance } from "ant-design-vue";

/** Interfaces */
import type { FlowInterface } from "@/interfaces/flow.interface";

/** Store */
import { flowStore } from "@/stores/flow.store";
import { authStore } from "@/stores/auth.store";

/** Icons */
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons-vue";

const COLUMNS = ref<TableColumnsType>([
  {
    title: "Nombre",
    key: "name",
    dataIndex: "name"
  },
  {
    title: "Descripcion",
    key: "description",
    dataIndex: "description"
  },
  {
    title: "Acciones",
    key: "action",
    dataIndex: "action"
  }
]);

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
    visibleModalCreate: false,
    labelCol: { style: { width: '150px' } },
    wrapperCol: { span: 24 },

    /** Form Modal */
    formCreate: reactive<FlowInterface>({
      establishment_id: null,
      name: '',
      description: '',
      stages: []
    }),

    /** Loader */
    loadingFlow: false,
    loadingSave: false,
    loadingDelete: false,
    loadingSend: false,
    loadingCreate: false,

    /** Store */
    flowStore: flowStore(),
    authStore: authStore()
  }),

  setup () {
    const refFormCreate =  ref<FormInstance>()
    return {
      refFormCreate
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      try {
        this.loadingFlow = true;
        await this.flowStore.getFlows();
      } catch (error) {
        console.log({ error });
      } finally {
        this.loadingFlow = false;
      }
    },

    showModal() {
      this.visibleModalCreate = true;
    },

    clearFormModalCreate() {
      this.formCreate = reactive<FlowInterface>({
        establishment_id: null,
        name: '',
        description: '',
        stages: []
      })
      this.visibleModalCreate = false
    },

    async onFinish() {
      try {
        if (this.refFormCreate) {
          this.loadingSave = true;
          const values = await this.refFormCreate.validateFields()
          const params = {
            name: values.name,
            description: values.description,
            establishment_id: this.authStore.selectedEstablishmentId
          } as FlowInterface
          const response = await this.flowStore.createFlow(params)
          const { flow, status } = response;
          if (status !== "success") {
            message.error("Error al guardar información");
          } else {
            message.success("Creado con exito !");
            this.$router.push({ name: "FlowForm", params: { method: "update", id: flow.id } });
            this.clearFormModalCreate()
          }
        }
      } catch (error) {
        console.log({ error });
      } finally {
        this.loadingSave = false
      }
    },

    updateFlow(flowId: number) {
      this.$router.push({ name: "FlowForm", params: { method: "update", id: flowId } });
    },

    async deleteFlow(flowId: any) {
      this.loadingDelete = true;
      try {
        const response = await this.flowStore.destroyFlow(flowId);
        const { status } = response;
        if (status !== "success") {
          message.error("Error al Eliminar");
        } else {
          message.success("Borrado con exito !");
        }
      } catch (error) {
        console.log({ error });
      } finally {
        this.loadingDelete = false;
        this.init();
      }
    }

  }
});

</script>

<template lang="pug">
.flow-view
  .title
    a-row(align="middle")
      a-col
        a-button(type="primary", @click="() => $router.go(-1)").margin-right__10 Volver
      a-col
        .font-size__h3 Flujos de Reclutamiento

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

          a-button(
            type="primary"
            @click=" updateFlow(record.id)").margin-left__10
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

    a-modal(
      v-model:visible="visibleModalCreate",
      :confirm-Loading="loadingCreate"
      @ok="onFinish"
      @cancel="clearFormModalCreate()",
      okText="Guardar"
    )
      template(#title)
        span Crear flujo de reclutamiento

      a-form(ref="refFormCreate", :model="formCreate", @finish="onFinish", :label-col="labelCol" :wrapper-col="wrapperCol")

        a-form-item(
          label="Nombre del Flujo",
          name="name",
          :rules="[{ required: true, message: 'Ingrese nombre, maximo 20 caracteres', min: 0, max: 40 }]")
          a-input(v-model:value="formCreate.name")

        a-form-item(
          label="Descripción",
          name="description",
          :rules="[{ required: true, message: 'Ingrese una descripción', min: 5}]")
          a-textarea(v-model:value="formCreate.description" auto-size)


</template>
