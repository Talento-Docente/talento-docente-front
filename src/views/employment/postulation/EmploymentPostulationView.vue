<script lang="ts">
/** External dependencies */
import { defineComponent, ref, reactive } from "vue";
import { message as aMessage, message } from "ant-design-vue";
import type { UploadProps } from 'ant-design-vue';
import * as uuid from "uuid";

/** Components */
import LandingNavbar from "@/views/landing/LandingNavbar.vue";
import EmploymentPostulateQuestions from "./EmploymentPostulateQuestions.vue";

/** Store */
import { employmentStore } from '@/stores/employment.store'
import { authStore } from '@/stores/auth.store'

/** Interfaces */
import type { ProfileInterface } from "@/interfaces/user.interface";

/** Services */
import { QuillEditor } from "@vueup/vue-quill";
import userServices from "@/services/user.services";

/** Component */
import MyExperienceModal from "@/views/admin/my_profile/MyExperienceModal.vue";
import MyAcademicTrainingModal from "@/views/admin/my_profile/MyAcademicTrainingModal.vue";
import MySkills from "@/views/admin/my_profile/MySkills.vue";

/** Internal dependencies */
import config from '@/config'

/** Icons */
import {
  CommentOutlined,
  UploadOutlined
} from "@ant-design/icons-vue";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default defineComponent({

  components: {
    LandingNavbar,
    QuillEditor,
    MyExperienceModal,
    MyAcademicTrainingModal,
    MySkills,
    CommentOutlined,
    UploadOutlined,
    EmploymentPostulateQuestions
  },

  setup() {
    return {};
  },

  data() {
    return {
      config,

      /** Store */
      authStore:authStore(),
      employmentStore:employmentStore(),
      
      /** Loader */
      loadingEmployment:false,
      loading:false,
      loadingUpload: false,

      /** Steps */
      currentStep: ref<number>(0),

      /** Salary */
      salary: ref<number>(3),

      /** Employment View */
      selectedEmploymentId: ref<number>(0),

      /** Files */
      curriculumList: ref<UploadProps['fileList']>([]),
      headers: { 'Authorization': authStore().token },

      /** Form User */
      formProfile: reactive<ProfileInterface>({
        last_name: "",
        first_name: "",
        email: "",
        dni: "",
        birthday: "",
        briefcase: "",
        youtube: "",
        description: "",
        phone: "",
        linkedin: "",
      }),
    };
  },

  async mounted() {
    const { employment_id } = this.$route.params
    if (employment_id) {
      this.init()
      this.selectedEmploymentId = parseInt(`${employment_id}`, 10)
      await this.getEmployment()
    } else {
      message.error('Error al obtener información')
      this.back()
    }
  },

  methods: {
    init () {
      const user = this.authStore.user
      this.formProfile.first_name = user.first_name
      this.formProfile.last_name = user.last_name
      this.formProfile.email = user.email
      this.formProfile.phone = user.applicant.phone
      this.formProfile.birthday = user.birthday
      this.formProfile.dni = user.dni
      this.formProfile.description = user.applicant.description

      this.formProfile.linkedin = user.applicant.linkedin
      this.formProfile.youtube = user.applicant.youtube

      if (user.applicant.curriculum) {
        this.curriculumList?.push(
          {
            uid: uuid.v4(),
            name: 'currriculum.pdf',
            status: 'done',
            url: user.applicant.curriculum,
            thumbUrl: user.applicant.curriculum
          }
        )
      }
    },

    back() {
      this.$router.go(-1)
    },

    previousStep(page:number){
      if(this.currentStep <= 0){
        this.currentStep = 0
      }else{
        this.currentStep = page
      }
    },

    nextStep(page:number){
      this.currentStep = page
    },
    async handlePreview (file: any) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      window.open(file.url, '_blank')
    },

    async handleRemove (documentName: string) {
      try {
        this.loadingUpload = true
        const response = await userServices.removeFile(documentName)
        if (response.data.status === 'success') {
          aMessage.success('Eliminación exitosa')
          await this.authStore.getProfile()
          this.init()
        }else {
          aMessage.error('Error al elimnar')
        }
      } catch (e) {
        console.log({ e })
        aMessage.error('Error al eliminar datos')
      } finally {
        this.loadingUpload = false
      }
    },

    async getEmployment() {
      try {
        this.loadingEmployment = true
        await this.employmentStore.getPublicEmployment(this.selectedEmploymentId)
      } catch (e) {
        console.log({ e })
      } finally {
        this.loadingEmployment = false
      }
    },

    async updateUser (values: ProfileInterface) {
      try {
        this.loading = true
        const response = await userServices.update(values)
        this.init()
        if (response.data.status === 'success') {
          aMessage.success('Guardado exitoso')
        } else {
          aMessage.error('Error al guardar datos')
        }
      } catch (e) {
        console.log({ e })
        aMessage.error('Error al guardar datos')
      } finally {
        this.loading = false
      }
    },
  }
});
</script>

<template lang="pug">
.employment-public-postulate
  a-layout
    landing-navbar
    a-row(justify="center" :gutter="[16,16]")
      a-col(:xl="{ span: 14 }", :lg="{ span: 16 }", :sm="{ span: 24 }")
        a-card.margin-top__50.margin-bottom__50
          a-button(type="primary", @click="() => $router.go(-1)").margin-right__10 Volver a publicación
          
          template(v-if="currentStep === 0")

            .font-size__h3.margin-top__20 Postulación a "{{ employmentStore.employment?.title }}"
            a-divider.padding__0.margin__0

            a-form(ref="refPostulateFormUser", :model="formProfile" @finish="updateUser")
              a-row(:gutter="[16,16]", align="middle", justify="center").margin-top__20
                a-col(:span="18")
                  h4.margin-top__20
                    b Háblanos sobre tu perfil.
                  div
                    a-divider.padding__0.margin__0
                    h4.margin-top__20.font-weight__bold
                      CommentOutlined
                      span.margin-left__10 Cuentanos sobre ti:
                    a-form-item(
                      name="description",
                      :rules="[{ required: false }]"
                    ).margin-top__10
                      quill-editor(content-type="html")

                  h4.margin-top__50 
                    b Háblanos sobre tu experiencia laboral.
                  div
                    a-divider.padding__0.margin__0
                    MyExperienceModal.margin-top__20

                  h4.margin-top__50 
                    b Háblanos sobre tu formación académica.
                  div
                    a-divider.padding__0.margin__0
                    MyAcademicTrainingModal.margin-top__20

                  h4.margin-top__50 
                    b Háblanos sobre tus habilidades.
                  div
                    a-divider.padding__0.margin__0
                    MySkills.margin-top__20
                  p.margin-top__30  Los cambios realizados se guardarán para esta y tus próximas postulaciones *

                  .margin-top__20
                  .float-right
                    a-button(
                      type="primary",
                      :loading="loading",
                      size="large"
                      @click="nextStep(1)") Siguiente

          template(v-if="currentStep === 1")
            .font-size__h3.margin-top__20 Postulación a "{{ employmentStore.employment?.title }}"
            a-divider.padding__0.margin__0
            a-row(:gutter="[16,16]", align="middle", justify="center").margin-top__20
              a-col(:span="18")

                h4.margin-top__20
                  b Agrega tu CV.
                div
                  a-divider.padding__0.margin__0
                  a-upload(
                    v-model:file-list="curriculumList",
                    :action="`${config.urlApi}/api/users/upload/curriculum`",
                    :headers="headers",
                    :loading="loadingUpload",
                    @preview="handlePreview",
                    @remove="() => handleRemove('curriculum')"
                  )
                    a-button(:disabled="curriculumList.length > 0").margin-top__20
                      upload-outlined
                      span Sube el documento aquí

                h4.margin-top__50
                  b Cuéntanos tu expectativa de sueldo.
                div
                  a-divider.padding__0.margin__0
                  a-input-number(id="salary" v-model:value="salary" :min="1" :max="10").margin-top__20
                  span.margin-left__10 Pesos chilenos (CLP) mensuales.

                h4.margin-top__50
                  b ¿Por qué te interesa trabajar en {{ employmentStore.employment?.establishment.name }} ?
                div
                  a-divider.padding__0.margin__0
                div.margin-top__20
                  QuillEditor

              a-col(:span="24")
                .margin-top__20
                .float-right
                  a-button(
                    type="primary",
                    :loading="loading",
                    size="large"
                    @click="nextStep(2)") Siguiente
              
                .margin-top__20
                .float-left
                  a-button(
                    type="primary"
                    :loading="loading",
                    size="large"
                    @click="previousStep(0)") Atras

          template(v-if="currentStep === 2")
            a-row(:gutter="[16,16]", align="middle", justify="start").margin-top__20

              a-col(:span="24")
                EmploymentPostulateQuestions

              a-col(:span="24")
                .margin-top__20
                .float-right
                  a-button(
                    type="primary",
                    :loading="loading",
                    size="large"
                    ) Postular
              
                .margin-top__20
                .float-left
                  a-button(
                    type="primary"
                    :loading="loading",
                    size="large"
                    @click="previousStep(1)") Atras
</template>

