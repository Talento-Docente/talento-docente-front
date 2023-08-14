<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import * as uuid from "uuid";
import * as _ from "lodash";

/** Store */
import { flowStore } from "@/stores/flow.store";
import { establishmentStore } from "@/stores/establishment.store";

/** Interfaces */
import type { FormInstance } from "ant-design-vue";
import type { FlowInterface } from "@/interfaces/flow.interface";
import type { StageInterface } from "@/interfaces/stage.interface";

/** Icons */
import { MinusCircleOutlined, PlusOutlined, WarningOutlined } from "@ant-design/icons-vue";

/** Constants */
import { STAGE_TYPES } from '@/constants/stage.constants'

export default defineComponent({
  components: {
    MinusCircleOutlined,
    PlusOutlined,
    WarningOutlined
  },

  data: () => ({
    /** Store */
    flowStore: flowStore(),
    establishmentStore: establishmentStore(),

    /** Form */
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
    selectedFlowId: ref<number>(0),
    selectedMethod: ref<string | string[]>("new"),
    formFlow: reactive<FlowInterface>({
      establishment_id: null,
      name: null,
      description: null,
      stages: []
    }),
    // stages: [] as Array<StageInterface>,
    removedStages: [] as Array<StageInterface>,

    /** Stages */
    stageActiveKey: null,
    dynamicStageForms: reactive<{ stages: StageInterface [] }>({
      stages: []
    }),

    /** Constants */
    STAGE_TYPES,

    /** Loader */
    loadingFlow: false,
    loadingSave: false,
  }),

  setup () {
    const refFormFlow =  ref<FormInstance>()
    const refFormStages =  ref<FormInstance>()
    return {
      refFormFlow,
      refFormStages
    }
  },

  async mounted() {
    const { method, id } = this.$route.params;
    if (method && id) {
      this.selectedFlowId = parseInt(`${id}`, 10);
      this.selectedMethod = method;
      await this.establishmentStore.getEstablishments()
      if (method === "update") {
        this.getFlow()
      }
    } else {
      message.error("Error al obtener información");
      // this.back();
    }

  },

  methods: {

    async back () {
      this.$router.push({ name: 'Flow' })
    },

    async getFlow() {
      try {
        this.loadingFlow = true;
        await this.flowStore.getFlow(this.selectedFlowId);
        if (this.flowStore.flow) {
          this.formFlow = this.flowStore.flow;
          this.dynamicStageForms.stages = this.flowStore.flow?.stages || Array<StageInterface>()

        } else {
          message.error("Error al obtener información");
          await this.back()
        }

      } catch (error) {
        console.log({ error });

      } finally {
        this.loadingFlow = false;
      }
    },

    addNewStage () {
      const stage: StageInterface = {
        id: uuid.v4(),
        localStatus: 'new',
        flow_id: null,
        name: null,
        order_number: null,
        description: null,
        stage_type: null
      }
      this.dynamicStageForms.stages.push(stage)
    },

    removeStage (stage: StageInterface) {
      const index = _.findIndex(this.dynamicStageForms.stages, (_stage: StageInterface) => {
        return stage.id === _stage.id
      })
      if (index > -1) {
        if (stage.localStatus !== 'new') {
          this.dynamicStageForms.stages[index]._destroy = true
          this.removedStages.push(this.dynamicStageForms.stages[index])
        }
        this.dynamicStageForms.stages.splice(index, 1)
      }
    },

    async saveFlow () {
      try {
        this.loadingSave = true;
        if (this.refFormFlow && this.refFormStages) {
          const values = await this.refFormFlow.validateFields()
          await this.refFormStages.validateFields()

          const stagesAttributes = this.dynamicStageForms.stages.concat(this.removedStages)
          stagesAttributes.forEach((stagesAttribute) => {
            if (stagesAttribute.localStatus === 'new') {
              delete stagesAttribute.id
            }
          })
          values.stages_attributes = stagesAttributes
          const response = await this.flowStore.updateFlow(this.selectedFlowId, values)
          if (response.status !== 'success') {
            message.error('Error al guardar información')
          } else {
            message.success('Actualización exitosa')
            await this.back()
          }
        }
      } catch (error: any) {
        console.log({ error });

        const { errorFields } = error
        if (errorFields) {
          errorFields.forEach((errorField: any) => {
            if (errorField.name && errorField.name.length == 3) {
              const stageIndex = errorField.name[1]
              const stage = this.dynamicStageForms.stages[stageIndex]
              console.log({ stageIndex, stage })
              this.dynamicStageForms.stages[stageIndex].error = true
            }
          })
        }

        message.error('Existes errores en el formulario o en alguna de las etapas')
      } finally {
        this.loadingSave = false
      }
    }

  }
});
</script>

<template lang="pug">
.stage-view
  .title
    a-row(align="middle")
      a-col
        a-button(type="primary", @click="() => $router.go(-1)").margin-right__10 Volver
      a-col
        .font-size__h3  Edición de flujo

  .form.margin-top__20

    a-row(:gutter="20", justify="center", align="top")
      a-col(:xl="{ span: 8 }")
        a-card
          a-form(ref="refFormFlow", :model="formFlow", :label-col="labelCol" :wrapper-col="wrapperCol")
            a-form-item(
              label="Establecimiento",
              name="establishment_id",
              :rules="[{ required: true, message: 'Seleccione un establecimiento' }]")
              a-select(v-model:value="formFlow.establishment_id")
                a-select-option(v-for="establishment in establishmentStore.establishments", :value="establishment.id") {{ establishment.name }}

            a-form-item(
              label="Nombre del Flujo",
              name="name",
              :rules="[{ required: true, message: 'Ingrese nombre, maximo 20 caracteres', min: 0, max: 20 }]")
              a-input(v-model:value="formFlow.name")

            a-form-item(
              label="Descripción",
              name="description",
              :rules="[{ required: true, message: 'Ingrese una descripción', min: 5}]")
              a-textarea(v-model:value="formFlow.description" auto-size)

      a-col(:xl="{ span: 16 }")

        a-card
          a-form(ref="refFormStages", :model="dynamicStageForms", :label-col="labelCol" :wrapper-col="wrapperCol")
            a-collapse(
              v-model:active-key="stageActiveKey"
              :bordered="false",
              style="background: rgb(255, 255, 255)",
            )
              a-collapse-panel(v-for="(stage, index) in dynamicStageForms.stages", forceRender, :key="stage.id", :style="'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'")
                template(#header)
                  span Etapa {{ stage.order_number ? stage.order_number : 'Nueva' }}

                template(#extra)
                  template(v-if="stage.error")
                    warning-outlined.color__danger.font-size__20
                  a-button(type="link", danger, size="small", @click="removeStage(stage)") Eliminar

                a-row(:gutter="20")
                  a-col(:span="3")
                    a-form-item(
                      label="Orden",
                      :name="['stages', index, 'order_number']",
                      :rules="[{ required: true, message: 'Ingrese orden de la etapa' }]"
                    )
                      a-input(type="number", v-model:value="stage.order_number")

                  a-col(:span="9")
                    a-form-item(
                      label="Tipo de Pregunta",
                      :name="['stages', index, 'stage_type']",
                      :rules="[{ required: true, message: 'Seleccione tipo de etapa' }]"
                    )
                      a-select(v-model:value="stage.stage_type").width__100
                        a-select-option(v-for="stageType in STAGE_TYPES", :value="stageType.key") {{ stageType.value }}

                  a-col(:span="12")
                    a-form-item(
                      label="Nombre",
                      :name="['stages', index, 'name']",
                      :rules="[{ required: true, message: 'Ingrese nombre, máximo 20 caracteres', min: 1, max: 20 }]"
                    )
                      a-input(v-model:value="stage.name")

                  a-col(:span="24")
                    a-form-item(
                      label="Description",
                      :name="['stages', index, 'description']",
                      :rules="[{ required: false }]"
                    )
                      a-textarea(v-model:value="stage.description")

          a-button(type="primary", @click="saveFlow", :loading="loadingSave").margin-top__20.float-right
            span Guardar

          a-button(type="link", @click="addNewStage").margin-top__20.float-right
            span Añadir Etapa +

</template>
