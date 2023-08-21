<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import * as uuid from 'uuid';
import * as _ from 'lodash';

/** Internal dependencies */
/** Store */
import { establishmentStore } from "@/stores/establishment.store";
import { employmentStore } from "@/stores/employment.store";
import { flowStore } from "@/stores/flow.store";
import { authStore } from "@/stores/auth.store";

/** Interfaces */
import type { EmploymentInterface } from "@/interfaces/employment.interface";
import type { StageInterface } from "@/interfaces/stage.interface";
import type { StageConfigurationInterface } from "@/interfaces/stage_configuration.interface";
import type { StageConfigurationReferenceInterface } from "@/interfaces/stage_configuration_reference.interface";

/** Icons */
import {
  CheckOutlined,
  WarningOutlined
} from '@ant-design/icons-vue';

/** Constants */
import { STATUSES, EMPLOYMENT_TYPES, SCHEDULE_TYPES, QUALIFICATIONS } from "@/constants/employment.constants";

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
    }),

    /** Stages */
    stagesActiveKey: null,

    /** Store */
    employmentStore: employmentStore(),
    flowStore: flowStore(),
    authStore: authStore(),

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

  mounted() {
    const { method, id } = this.$route.params;
    if (method && id) {
      this.flowStore.getFlows();
      this.selectedEmploymentId = parseInt(`${id}`, 10);
      this.selectedMethod = method;
      if (method === "update") {
        this.getEmployment();
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
            this.getFlow(this.form.flow_id)
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
        values.establishment_id = this.authStore.selectedEstablishmentId
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

    showStageConfigurationReference (stage: StageInterface) {
      const employment = this.employmentStore.employment
      if (employment) {
        const index = _.find((employment.stage_configurations), (stageConfiguration: StageConfigurationInterface) => {
          return stageConfiguration.stage_id === stage.id
        })
        if (employment.stage_configurations) {
          if (index > -1 && employment.stage_configurations.length > 0) {
            return employment.stage_configurations[index]
          } else {
            const stageConfiguration: StageConfigurationInterface = {
              stage_id: stage.id,
              employment_id: this.employmentStore.employment?.id,
              localStatus: 'new',
              id: uuid.v4(),
              stage_configuration_references: []
            }
            employment.stage_configurations.push(stageConfiguration)
            return stageConfiguration
          }
        } else {
          const stageConfiguration: StageConfigurationInterface = {
            stage_id: stage.id,
            employment_id: this.employmentStore.employment?.id,
            localStatus: 'new',
            id: uuid.v4(),
            stage_configuration_references: []
          }
          employment.stage_configurations = [stageConfiguration]
          return stageConfiguration
        }
      } else {
        return null
      }
    },

    addNewReference (stageConfiguration: StageConfigurationInterface) {
      const index = _.find((this.employmentStore.employment?.stage_configurations), (_stageConfiguration: StageConfigurationInterface) => {
        return _stageConfiguration.stage_id === stageConfiguration.stage_id
      })
      if (index > -1) {
        const stageConfigurationReferences = this.employmentStore.employment?.stage_configurations[index].stage_configuration_references
        const stageConfigurationReference: StageConfigurationReferenceInterface = {
          localStatus: 'new',
          name: null,
          description: null,
          reference_type: null,
        }

        if (stageConfigurationReferences && stageConfigurationReferences.length > 0) {

        } else {

        }
      }
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
            :rules="[{ required: true, message: 'Ingresar fecha de inicio de la publicación' }]")
            a-input(type="date", v-model:value="form.start_date")

          a-form-item(
            label="Fecha de Termino"
            name="end_date"
            :rules="[{ required: true, message: 'Ingresar fecha de termino de la publicación' }]")
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
                  template(v-if="stage.stage_type === 'normal' || stage.stage_type === 'finish'")
                    check-outlined.color__success.font-size__20

                  template(v-else)
                    warning-outlined.color__warning.font-size__20

                p.font-size__12.margin__0.padding__0 {{ stage.description }}
                template(v-if="stage.stage_type === 'normal' || stage.stage_type === 'finish'")
                  p.font-size__10.margin__0.padding__0 Paso no requiere configuraciones adicionales


                template(v-if="stage.stage_type === 'document'")
                  p.font-size__10.margin__0.padding__0 ¿Que documentos se solicitaran?
                    a-row.margin-top__10
                      a-col(:span="12")
                        span Nombre
                      a-col(:span="12")
                        span Descripción
                    a-divider.margin__0.padding__0
                    template(v-for="stageConfigurationReference in showStageConfigurationReference(stage).stage_configuration_references")
                      template(v-if="stageConfigurationReference")
                        a-row
                          a-col(:span="12")
                            span {{ stageConfigurationReference.name }}
                          a-col(:span="12")
                            span {{ stageConfigurationReference.description }}

                    .float-right
                      a-button(type="link", @click="addNewReference(showStageConfigurationReference(stage))").font-size__10 Añadir documento +


                template(v-if="stage.stage_type === 'test'")
                  p.font-size__10.margin__0.padding__0 ¿Seleccione que pruebas se solicitarán?


                template(v-if="stage.stage_type === 'meet'")
                  p.font-size__10.margin__0.padding__0 ¿Seleccione calendario a usar?


</template>
