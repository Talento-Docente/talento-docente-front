<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import * as uuid from 'uuid';
import * as _ from 'lodash';

/** Internal dependencies */
/** Store */
import { testStore } from "@/stores/test.store";
import { employmentStore } from "@/stores/employment.store";
import { flowStore } from "@/stores/flow.store";
import { authStore } from "@/stores/auth.store";

/** Interfaces */
import type { EmploymentInterface } from "@/interfaces/employment.interface";
import type { StageInterface } from "@/interfaces/stage.interface";
import type { StageConfigurationInterface } from "@/interfaces/stage_configuration.interface";
// import type { StageConfigurationReferenceInterface } from "@/interfaces/stage_configuration_reference.interface";

/** Icons */
import {
  CheckOutlined,
  WarningOutlined
} from '@ant-design/icons-vue';

/** Constants */
import { STATUSES, EMPLOYMENT_TYPES, SCHEDULE_TYPES, QUALIFICATIONS } from "@/constants/employment.constants";
import type { StageConfigurationReferenceInterface } from "@/interfaces/stage_configuration_reference.interface";

export default defineComponent({

  components: {
    CheckOutlined,
    WarningOutlined
  },

  data: () => ({
    /** Form */
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
    selectedEmploymentId: ref<number>(0),
    selectedMethod: ref<string | string[]>("new"),
    form: reactive<EmploymentInterface>({
      id: null,
      description: null,
      employment_type: null,
      end_date: null,
      hours: null,
      qualification: null,
      salary: null,
      schedule_type: null,
      start_date: null,
      status: null,
      title: null,
      establishment_id: null,
      flow_id: null,
      stage_configurations: [] as StageConfigurationInterface[],
      stage_configurations_attributes: [] as StageConfigurationInterface[]
    }),

    /** Stages */
    stagesActiveKey: null,

    /** Store */
    employmentStore: employmentStore(),
    flowStore: flowStore(),
    authStore: authStore(),
    testStore: testStore(),

    /** Loader */
    loadingEmployment: false,
    loadingSave: false,
    loadingFlow: false,

    /** Constants */
    EMPLOYMENT_TYPES,
    STATUSES,
    SCHEDULE_TYPES,
    QUALIFICATIONS
  }),

  async mounted() {
    const { method, id } = this.$route.params;
    if (method && id) {
      await this.flowStore.getFlows();
      await this.testStore.getTests();
      this.selectedEmploymentId = parseInt(`${id}`, 10);
      this.selectedMethod = method;
      if (method === "update") {
        await this.getEmployment();
      }
    } else {
      message.error("Error al obtener información");
      this.back();
    }
  },

  methods: {
    back() {
      this.$router.push({ name: "EmploymentList" });
    },

    async getEmployment() {
      try {
        this.loadingEmployment = true;
        await this.employmentStore.getEmployment(this.selectedEmploymentId);
        if (this.employmentStore.employment) {
          this.form = this.employmentStore.employment;
          if (this.form.flow_id) {
            await this.getFlow(this.form.flow_id)
          }

        } else {
          message.error("Error al obtener información");
          this.back();
        }

      } catch (error) {
        console.log({ error });
        this.back();

      } finally {
        this.loadingEmployment = false;
      }
    },

    async getFlow(flowId: number) {
      console.log({ flowId })
      try {
        this.loadingFlow = true;
        await this.flowStore.getFlow(flowId);
        if (!this.flowStore.flow) {
          message.error("Error al obtener información");
        }

      } catch (error) {
        console.log({ error });

      } finally {
        this.loadingFlow = false;
      }
    },

    async onFinish(values: any) {
      try {
        console.log({ values, form: this.form })
        values.establishment_id = this.authStore.selectedEstablishmentId
        values.stage_configurations_attributes = []
        this.form.stage_configurations.forEach((stageConfiguration: StageConfigurationInterface) => {
          if (stageConfiguration.localStatus === 'new') {
            stageConfiguration.id = null
          }
          stageConfiguration.stage_configuration_references.forEach((stageConfigurationReference: StageConfigurationReferenceInterface) => {
            if (stageConfigurationReference.localStatus === 'new') {
              stageConfigurationReference.id = null
            }
            if (!stageConfiguration.stage_configuration_references_attributes) {
              stageConfiguration.stage_configuration_references_attributes = []
            }
            stageConfiguration.stage_configuration_references_attributes.push(stageConfigurationReference)
          })
          values.stage_configurations_attributes.push(stageConfiguration)
        })
        this.loadingSave = true;
        if (this.selectedMethod === "new") {
          const response = await this.employmentStore.createEmployment(values);
          if (response.status !== "success") {
            message.error("Error al guardar información");
          } else {
            message.success("Actualización exitosa");
            this.back();
          }
        } else {
          const response = await this.employmentStore.updateEmployment(this.selectedEmploymentId, values);
          if (response.status !== "success") {
            message.error("Error al guardar información");
          } else {
            message.success("Actualización exitosa");
            this.back();
          }
        }

      } catch (error) {
        console.log({ error });
        message.error("Error al guardar información");

      } finally {
        this.loadingSave = false;

      }
    },

    showStageConfiguration (stage: StageInterface): StageConfigurationInterface {
      const stageConfigurationIndex = _.findIndex((this.form.stage_configurations), (stageConfiguration: StageConfigurationInterface) => {
        return stageConfiguration.stage_id === stage.id
      })
      if (stageConfigurationIndex > -1) {
        return this.form.stage_configurations[stageConfigurationIndex]

      } else {
        const stageConfiguration: StageConfigurationInterface = {
          stage_id: stage.id,
          employment_id: this.employmentStore.employment?.id,
          localStatus: 'new',
          id: uuid.v4(),
          stage_configuration_references: [],
          stage_configuration_references_attributes: []
        }
        this.form.stage_configurations.push(stageConfiguration)
        return stageConfiguration

      }
    },

    addNewReference (stage: StageInterface) {
      const stageConfiguration = this.showStageConfiguration(stage)
      const stageConfigurationIndex = _.findIndex((this.form.stage_configurations), (_stageConfiguration: StageConfigurationInterface) => {
        return _stageConfiguration.stage_id === stageConfiguration.stage_id
      })
      if (stageConfigurationIndex > -1) {
        let resource_type = null
        let reference_type = ''
        if (stage.stage_type === 'document') {
          reference_type = 'document'
        } else if (stage.stage_type === 'test') {
          reference_type = 'test'
          resource_type = 'Test'
        }

        let stageConfigurationReferences = this.form.stage_configurations[stageConfigurationIndex].stage_configuration_references
        const stageConfigurationReference: StageConfigurationReferenceInterface = {
          localStatus: 'new',
          id: uuid.v4(),
          name: '',
          description: '',
          reference_type: reference_type,
          resource_type: resource_type
        }

        if (stageConfigurationReferences && stageConfigurationReferences.length > 0) {
          stageConfigurationReferences.push(stageConfigurationReference)
        } else {
          stageConfigurationReferences = [stageConfigurationReference]
        }
        this.form.stage_configurations[stageConfigurationIndex].stage_configuration_references = stageConfigurationReferences
      }
    },

    removeReference (stage: StageInterface, stageConfigurationReference: StageConfigurationReferenceInterface): boolean {
      const stageConfiguration = this.showStageConfiguration(stage)
      const stageConfigurationIndex = _.findIndex((this.form.stage_configurations), (_stageConfiguration: StageConfigurationInterface) => {
        return _stageConfiguration.stage_id === stageConfiguration.stage_id
      })
      if (stageConfigurationIndex > -1) {
        let stageConfigurationReferences = this.form.stage_configurations[stageConfigurationIndex].stage_configuration_references
        const stageConfigurationReferenceIndex = _.findIndex((stageConfigurationReferences), (_stageConfigurationReference: StageConfigurationReferenceInterface) => {
          return stageConfigurationReference.id === _stageConfigurationReference.id
        })
        if (stageConfigurationReferenceIndex > -1) {
          if (stageConfigurationReference.localStatus === 'new') {
            this.form.stage_configurations[stageConfigurationIndex].stage_configuration_references.splice(stageConfigurationReferenceIndex, 1)
          } else {
            this.form.stage_configurations[stageConfigurationIndex].stage_configuration_references[stageConfigurationReferenceIndex]._destroy = true
          }
          return true
        }
        return false
      }
      return false
    }
  }

});

</script>

<template lang="pug">
.employment-form
  .title.font-size__h3 {{ selectedMethod && selectedMethod === "update" ? "Edición" : "Creación"}} de Trabajo

  .form.margin-top__40
    a-form(:model="form", @finish="onFinish", :label-col="labelCol" :wrapper-col="wrapperCol")

      a-row
        a-col(:xl="{ span: 8 }", :lg="{ span: 12 }", :sm="{ span: 24 }")

          a-form-item(
            label="Titulo"
            name="title"
            :rules="[{ required: true, message: 'Ingrese titulo del cargo' }]")
            a-input(v-model:value="form.title")

          a-form-item(
            label="Descripción"
            name="description"
            :rules="[{ required: true, message: 'Ingrese descripción del cargo' }]")
            a-textarea(v-model:value="form.description")

          a-form-item(
            label="Estado de la publicación"
            name="status"
            :rules="[{ required: true, message: 'Seleccione estado' }]")
            a-select(v-model:value="form.status")
              a-select-option(v-for="status in STATUSES", :value="status.key") {{ status.value }}

          a-form-item(
            label="Formalidad"
            name="employment_type"
            :rules="[{ required: true, message: 'Seleccione formalidad' }]")
            a-select(v-model:value="form.employment_type")
              a-select-option(v-for="employmentType in EMPLOYMENT_TYPES", :value="employmentType.key") {{ employmentType.value }}

          a-form-item(
            label="Experiencia"
            name="qualification"
            :rules="[{ required: true, message: 'Seleccione Experiencia' }]")
            a-select(v-model:value="form.qualification")
              a-select-option(v-for="qualification in QUALIFICATIONS", :value="qualification.key") {{ qualification.value }}

          a-form-item(
            label="Horario"
            name="schedule_type"
            :rules="[{ required: true, message: 'Seleccione formalidad' }]")
            a-select(v-model:value="form.schedule_type")
              a-select-option(v-for="scheduleType in SCHEDULE_TYPES", :value="scheduleType.key") {{ scheduleType.value }}

          a-form-item(
            label="Fecha de Inicio"
            name="start_date"
            extra="Fecha de inicio de la publicación",
            :rules="[{ required: true, message: 'Ingresar fecha de inicio de la publicación' }]")
            a-input(type="date", v-model:value="form.start_date")

          a-form-item(
            label="Fecha de Termino"
            name="end_date",
            extra="Fecha de termino de la publicación",
            :rules="[{ required: false, message: 'Ingresar fecha de termino de la publicación' }]")
            a-input(type="date", v-model:value="form.end_date")

          a-form-item(
            label="Flujo de Reclutamiento",
            extra="Flujo asociado al proceso de reclutamiento de la postulación",
            name="flow_id"
            :rules="[{ required: true, message: 'Seleccione un flujo' }]")
            a-select(v-model:value="form.flow_id", @change="getFlow")
              a-select-option(v-for="flow in flowStore.flows", :value="flow.id") {{ flow.name }}

          a-form-item.margin-top__40
            a-space
              a-button(
                type="primary",
                html-type="submit",
                :loading="loadingSave"
              ) Guardar

              a-button(
                type="danger",
                @click="back()",
                :loading="loadingSave"
              ) Cancelar

        a-col(:xl="{ span: 12 }", :lg="{ span: 12 }", :sm="{ span: 24 }")
          h4 Edición de pasos sobre flujo seleccionado:
          a-divider.margin__0.padding__0

          template(v-if="!form.flow_id && flowStore.flow")
            h5 Favor seleccione un flujo

          template(v-else)
            a-collapse(
              v-model:active-key="stagesActiveKey",
              :bordered="false",
              style="background: rgb(255, 255, 255)"
            )
              a-collapse-panel(v-for="stage in flowStore.flow?.stages", :key="stage.id", :style="'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'")
                template(#header) {{ stage.name }}
                template(#extra)
                  template(v-if="stage.stage_type === 'normal' || stage.stage_type === 'finish' || stage.stage_type === 'meet'")
                    check-outlined.color__success.font-size__20

                  template(v-else)
                    warning-outlined.color__warning.font-size__20

                p.font-size__12.margin__0.padding__0 {{ stage.description }}
                template(v-if="stage.stage_type === 'normal' || stage.stage_type === 'finish'")
                  p.font-size__10.margin__0.padding__0 Paso no requiere configuraciones adicionales


                template(v-else-if="stage.stage_type === 'document'")
                  p.font-size__10.margin__0.padding__0 ¿Que documentos se solicitaran?
                    a-row(:gutter="[20, 20]").margin-top__10
                      a-col(:span="10")
                        span Nombre
                      a-col(:span="10")
                        span Descripción
                      a-col(:span="4")
                        span Acciones
                    a-divider.margin__0.padding__0
                    template(v-for="stageConfigurationReference in showStageConfiguration(stage).stage_configuration_references")
                      a-row(:gutter="[20, 20]", v-if="!stageConfigurationReference._destroy")
                        a-col(:span="10")
                          a-input(v-model:value="stageConfigurationReference.name").margin__10
                        a-col(:span="10")
                          a-input(v-model:value="stageConfigurationReference.description").margin__10
                        a-col(:span="4")
                          a-button(type="danger", size="small", @click="() => removeReference(stage, stageConfigurationReference)").margin__10 Eliminar

                    .float-right
                      a-button(type="link", @click="() => addNewReference(stage)").font-size__10 Añadir documento +


                template(v-else-if="stage.stage_type === 'test'")
                  p.font-size__10.margin__0.padding__0 ¿Seleccione que pruebas se solicitarán?
                    a-row(:gutter="[20, 20]").margin-top__10
                      a-col(:span="16")
                        span Prueba
                      a-col(:span="8")
                        span Acciones
                    a-divider.margin__0.padding__0
                    template(v-for="stageConfigurationReference in showStageConfiguration(stage).stage_configuration_references")
                      a-row(:gutter="[20, 20]", v-if="!stageConfigurationReference._destroy")
                        a-col(:span="16")
                          a-select(v-model:value="stageConfigurationReference.resource_id").width__100.margin__10
                            a-select-option(v-for="test in testStore.tests" :value="test.id") {{ test.name }}
                        a-col(:span="8")
                          a-button(type="danger", size="small", @click="() => removeReference(stage, stageConfigurationReference)").margin__10 Eliminar

                    .float-right
                      a-button(type="link", @click="() => addNewReference(stage)").font-size__10 Añadir prueba +


                template(v-else-if="stage.stage_type === 'meet'")
                  p.font-size__10.margin__0.padding__0 Paso no requiere configuraciones adicionales

</template>
