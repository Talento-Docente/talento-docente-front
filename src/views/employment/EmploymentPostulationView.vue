<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { message as aMessage, message } from "ant-design-vue";

/** Components */
import LandingNavbar from "@/views/landing/LandingNavbar.vue";

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

/** Icons */
import {
  CommentOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({

  components: {
    LandingNavbar,
    QuillEditor,
    MyExperienceModal,
    MyAcademicTrainingModal,
    MySkills,
    CommentOutlined
  },

  setup() {
    return {};
  },

  data() {
    return {
      /** Store */
      authStore:authStore(),
      employmentStore:employmentStore(),
      
      /** Loader */
      loadingEmployment:false,
      loading:false,

      /** Employment View */
    selectedEmploymentId: ref<number>(0),
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
    this.init()
    const { employment_id } = this.$route.params
    if (employment_id) {
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
    },

    back() {
      this.$router.go(-1)
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
          a-button(type="primary", @click="() => $router.go(-1)").margin-right__10 Volver

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
                    size="large") Siguiente
                
</template>

