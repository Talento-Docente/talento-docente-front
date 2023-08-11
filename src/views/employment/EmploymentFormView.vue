<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from "vue";
import { message } from "ant-design-vue";

/** Internal dependencies */
/** Store */
import { establishmentStore } from "@/stores/establshment.store";
import { employmentStore } from "@/stores/employment.store";

/** Interfaces */
import type { EmploymentInterface } from "@/interfaces/employment.interface";

/** Constants */
import { STATUSES, EMPLOYMENT_TYPES, SCHEDULE_TYPES, QUALIFICATIONS } from "@/constants/employment.constants";

export default defineComponent({

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
      establishment_id: null
    }),

    /** Store */
    establishmentStore: establishmentStore(),
    employmentStore: employmentStore(),

    /** Loader */
    loadingEmployment: false,
    loadingSave: false,

    /** Constants */
    EMPLOYMENT_TYPES,
    STATUSES,
    SCHEDULE_TYPES,
    QUALIFICATIONS
  }),

  mounted() {
    const { method, id } = this.$route.params;
    if (method && id) {
      this.establishmentStore.getEstablishments();
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

    async onFinish(values: any) {
      try {
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
    }
  }

});

</script>

<template lang="pug">
.employment-form
  .title.font-size__h3 {{ selectedMethod && selectedMethod === "update" ? "Edición" : "Creación"}} de Establecimiento

  .form.margin-top__40
    a-form(:model="form", @finish="onFinish", :label-col="labelCol" :wrapper-col="wrapperCol")

      a-row
        a-col(:xl="{ span: 8 }", :lg="{ span: 12 }", :sm="{ span: 24 }")
          a-form-item(
            label="Establecimiento"
            name="establishment_id"
            :rules="[{ required: true, message: 'Seleccione un establecimiento' }]")
            a-select(v-model:value="form.establishment_id")
              a-select-option(v-for="establishment in establishmentStore.establishments", :value="establishment.id") {{ establishment.name }}

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

</template>
