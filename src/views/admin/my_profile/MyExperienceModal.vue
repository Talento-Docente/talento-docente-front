<script lang="ts">
import { defineComponent, reactive } from "vue";

/** Interfaces */
import type {  WorkExperienceInterface } from '@/interfaces/work_experience.interface'

/** Stores */
import { authStore } from "@/stores/auth.store";
import {workExperienceStore} from "@/stores/work_experience.store"

/** Services */
import { QuillEditor } from "@vueup/vue-quill";

/** Icons */
import {
  ProfileOutlined,
} from "@ant-design/icons-vue";

import { message } from "ant-design-vue";

export default defineComponent({

  components: { 
    QuillEditor,
    ProfileOutlined
   },

  data() {
    return {
      /** Loader */
      loading: false,

      /** Stores */
      authStore: authStore(),
      workExperienceStore: workExperienceStore(),

      /** Experiences */
      formExperience: reactive<WorkExperienceInterface>({
        business_name: "",
        description: "",
        end_date: "",
        job_title: "",
        start_date: "",
        applicant_id: 0
      }),
      modalExperience: false,
      isAUpdate:false,
      idExperience: 0,
    };
  },

  async mounted() {
    await this.init()
  },

  methods: {
    async init () {
      try {
        await this.workExperienceStore.getWorkExperiences()
      } catch (error) {
        console.log(error)
      }
      this.cleanFormExperience ()
    },

    showModalExp () {
      this.isAUpdate = false
      this.cleanFormExperience ()
      this.modalExperience = true
    },

    showModalExpUpdate () {
      this.isAUpdate = true
      this.modalExperience = true
    },

    handleOk  () {
      this.modalExperience = false
      this.cleanFormExperience ()
    },

    cleanFormExperience () {
      const userId = parseInt(`${this.authStore.user.id}`, 10)
      this.formExperience.business_name= ""
      this.formExperience.description= " "
      this.formExperience.end_date= ""
      this.formExperience.job_title= ""
      this.formExperience.start_date= ""
      this.formExperience.applicant_id = userId
    },

    async saveButton(values:any){
      if(this.isAUpdate){
        this.updateWorkExperience(values)
      }
      if(!this.isAUpdate){
        this.createExperience(values)
      }
    },

    async createExperience(values: any) {
      try {
      this.loading = true
      const userId = parseInt(`${this.authStore.user.id}`, 10)
      values.applicant_id = userId
      const response = await this.workExperienceStore.createWorkExperience(values)
      if (response.status !== 'success') {
        message.error('Error al guardar información')
      } else {
        message.success('Experiencia guardada')
      }
      } catch (e) {
        console.log(e)
      }finally{
        this.handleOk()
        await this.init()
        this.loading = false
      }
    },

    async updateWorkExperience(values: any){
      try {
        this.loading = true
        const response = await this.workExperienceStore.updateWorkExperience(this.idExperience, values)
        if (response.status !== 'success') {
          message.error('Error al guardar información')
        } else {
          message.success('Experiencia Actualizada')
        }
      } catch (e) {
        console.log(e)
      }finally{
        this.handleOk()
        await this.init()
        this.loading = false
      }
    },

    async deleteExperience(id:any){
      try {
        this.loading = true
        await this.workExperienceStore.destroyWorkExperience(id)
      } catch (e) {
        console.log(e)
      }finally{
        this.init()
        this.loading = false
      }
    },

    prepareUpdate(value:any){
      this.loading = true
      this.idExperience= value.id
      this.formExperience.business_name=value.business_name
      this.formExperience.description= value.description
      this.formExperience.end_date= value.end_date
      this.formExperience.job_title= value.job_title
      this.formExperience.start_date= value.start_date
      this.formExperience.applicant_id = value.applicant_id
      this.showModalExpUpdate()
      this.loading = false
    }
  }
});
</script>

<template lang="pug">
a-row
  a-col(:xl="10")
    h4.font-weight__bold
      ProfileOutlined
      span.margin-left__10 Añade tus ultimas experiencias laborales
    a-button(@click="showModalExp()" type="primary", variant="outlined") Añadir

    a-modal(width="900px" centered v-model:visible="modalExperience" :footer="null" @ok="handleOk")
      template(#title)
        .text-align__center Añadir mis experiencias Laborales
      a-row(:gutter="16")
        a-col(:span="8")
          h2 Perfil profesional y experiencia laboral
          p.font-size__12.color__gray.padding__0.margin__0 Los cambios que realices se aplicarán a tus proximas postulaciones.

        a-col(:span="16")
          a-form(:model="formExperience", @finish="saveButton")
            a-card
              template(#title)
                .text-align__center
                  span(v-if="formExperience.business_name")
                    span {{ formExperience.business_name }}
                  span(v-else)
                    span Mi Experiencia
              a-row(:gutter="20")

                a-col(:span="12")
                  a-form-item(
                    label="Empresa",
                    name="business_name"
                    :rules="[{ required: true, message: 'Ingrese nombre', min: 1}]")
                    a-input(v-model:value="formExperience.business_name")

                a-col(:span="12")
                  a-form-item(
                    label="Cargo",
                    name="job_title"
                    :rules="[{ required: true, message: 'Ingrese cargo', min: 3}]")
                    a-input(v-model:value="formExperience.job_title")

                a-col(:span="11")
                  a-form-item(
                    label="Fecha Inicio",
                    name="start_date"
                    :rules="[{ required: true, message: 'Ingrese fecha'}]")
                    a-input(type="date",v-model:value="formExperience.start_date")

                a-col(:span="12")
                  a-form-item(
                    label="Fecha termino",
                    name="end_date")
                    a-input(type="date",v-model:value="formExperience.end_date")
                    p.font-size__12.color__gray.padding__0.margin__0 * No obligatorio.

                a-col(:span="24")
                  span Descripcion del cargo:
                  a-form-item(
                    name="description"
                    :rules="[{ required: true, message: 'Ingrese la descripcion del cargo realizado'}]").margin-top__10
                    quill-editor(v-model:content="formExperience.description", content-type="html")
              a-button(type="link" @click="cleanFormExperience()").margin-top__20.float-right
                span Limpiar

              a-button(v-if="!isAUpdate" type="primary" html-type="submit").margin-top__20.float-right
                span Guardar

              a-button(v-if="isAUpdate" type="primary" html-type="submit").margin-top__20.float-right
                span Actualizar

  a-col(:xl="13")
    a-list(item-layout="horizontal" :data-source="workExperienceStore?.workExperiences" size="small" )
      template(#renderItem="{ item }")
        a-list-item
          ul
            li {{ item.business_name }}
          template(#actions)
            a(@click="prepareUpdate(item)") Editar
            a-button(danger type="link" @click="deleteExperience(item.id)") Eliminar
</template>