<script lang="ts">
import { defineComponent, reactive } from "vue";

/** Icons */
import {
  ReadOutlined
} from "@ant-design/icons-vue";

/** Interfaces */
import type { AcademicTrainingInterface } from "@/interfaces/academic_training.interface";

/** Stores */
import { academicTrainingStore } from "@/stores/academic_training.store";
import { authStore } from "@/stores/auth.store";
import { message } from "ant-design-vue";

export default defineComponent({

  components: { 
    ReadOutlined
   },

  setup() {
    return {};
  },

  data() {
    return {
      /** Stores */
      authStore: authStore(),
      academicTrainingStore: academicTrainingStore(),
      
      /** Academic Info*/
      formAcademic: reactive<AcademicTrainingInterface>({
        career_name: '',
        end_date: '',
        start_date: '',
        study_house_name: '',
        applicant_id: 0
      }),
      idAcadTraining: 0,

      /** Loader */
      loading: false,
      isAUpdate:false,

      /** Modal */
      modalAcademy:false,
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 24 },
    };
  },

  async mounted() {
    await this.init()
  },

  methods: {
    async init(){
      try {
        this.academicTrainingStore.getAcademicTrainings()
      } catch (e) {
        console.log(e)
      }
    },

    cleanFormAcademic(){
      const userId = parseInt(`${this.authStore.user.id}`, 10)
      this.formAcademic.career_name = ''
      this.formAcademic.end_date = ''
      this.formAcademic.start_date = ''
      this.formAcademic.study_house_name = ''
      this.formAcademic.applicant_id = userId
    },
    
    showModalAcademy () {
      this.isAUpdate = false
      this.cleanFormAcademic()
      this.modalAcademy = true
    },

    showModalAcadUpdate () {
      this.isAUpdate = true
      this.modalAcademy = true
    },

    handleOk  () {
      this.modalAcademy = false;
    },

    async saveButton(values:any){
      if(this.isAUpdate){
        this.updateAcademicTraining(values)
      }
      if(!this.isAUpdate){
        this.createAcademicTraining(values)
      }
    },

    async createAcademicTraining (values: any){
      try {
        this.loading = true
        const userId = parseInt(`${this.authStore.user.id}`, 10)
        values.applicant_id = userId
        const response = await this.academicTrainingStore.createAcademicTraining(values)
        if (response.status !== 'success') {
          message.error('Error al guardar información')
        } else {
          message.success('Informacion academica guardada !')
        }
      } catch (e) {
        console.log(e)
      }finally{
        this.cleanFormAcademic()
        this.handleOk()
        this.init()
        this.loading = false
      }
    },

    async deleteTraining(id:any){
      try {
        this.loading = true
        await this.academicTrainingStore.destroyAcademicTraining(id)
      } catch (e) {
        console.log(e)
      }finally{
        this.init()
        this.loading = false
      }
    },

    async updateAcademicTraining(values: any){
      try {
        this.loading = true
        const response = await this.academicTrainingStore.updateAcademicTraining(this.idAcadTraining, values)
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

    prepareUpdate(value:any){
      this.loading = true
      this.idAcadTraining= value.id
      this.formAcademic.career_name = value.career_name
      this.formAcademic.end_date = value.end_date
      this.formAcademic.start_date = value.start_date
      this.formAcademic.study_house_name = value.study_house_name
      this.formAcademic.applicant_id = value.applicant_id

      this.showModalAcadUpdate()
      this.loading = false
    }
  }

});
</script>

<template lang="pug">
a-row
  a-col(:xl="9")
    h4.font-weight__bold
      ReadOutlined
      span.margin-left__10 Formación academica
    a-button(@click="showModalAcademy()" type="primary", variant="outlined") Añadir

    a-modal(width="900px" centered v-model:visible="modalAcademy" :footer="null" @ok="handleOk")
      template(#title)
        .text-align__center Añadir mi formación academica
      a-row(:gutter="16")
        a-col(:span="8" :offset="1" )
          h2 Formación académica y estudios
          p.font-size__12.color__gray.padding__0.margin__0 Los cambios que realices se aplicarán a tus proximas postulaciones.

        a-col(:span="14")
          a-form(:model="formAcademic" @finish="saveButton" :label-col="labelCol" :wrapper-col="wrapperCol")
            h4(v-if="formAcademic.study_house_name")
              .text-align__center {{formAcademic.study_house_name}}
            h4(v-else)
              .text-align__center Mi información academica
            a-card
              a-form-item(
                  label="Nombre de institución",
                  name="study_house_name"
                  :rules="[{ required: true, message: 'Ingrese nombre de la institución', min: 4}]")
                  a-input(v-model:value="formAcademic.study_house_name")

              a-form-item(
                  label="Carrera",
                  name="career_name"
                  :rules="[{ required: true, message: 'Ingrese nombre', min: 4}]")
                  a-input(v-model:value="formAcademic.career_name")

              a-form-item(:wrapper-col="{ span: 8 }"
                label="Fecha Inicio",
                name="start_date"
                :rules="[{ required: true, message: 'Ingrese fecha de inicio'}]")
                a-input(type="date" v-model:value="formAcademic.start_date")

              a-form-item(:wrapper-col="{ span: 8 }"
                label="Fecha termino",
                name="end_date")
                a-input(type="date" v-model:value="formAcademic.end_date")
                p.font-size__12.color__gray.padding__0.margin__0 * Campo no obligatorio.

              a-button(v-if="!isAUpdate" type="primary" html-type="submit").margin-top__20.float-right
                span Guardar
              
              a-button(v-if="isAUpdate" type="primary" html-type="submit").margin-top__20.float-right
                span Actualizar
  
  a-col(:xl="15")
    a-list(item-layout="horizontal" :data-source="academicTrainingStore.academicTrainings" size="small" )
      template(#renderItem="{ item }")
        a-list-item
          ul
            li {{ item.career_name }}
          template(#actions)
            a(@click="prepareUpdate(item)") Editar
            a-button(danger type="link" @click="deleteTraining(item.id)") Eliminar
</template>

