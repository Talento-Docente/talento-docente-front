<script lang="ts">
/** External dependencies */
import { defineComponent, reactive } from "vue";
import { message as aMessage } from "ant-design-vue";

/** Icons */
import {
  UploadOutlined,
  PlusOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
  LinkedinOutlined
} from "@ant-design/icons-vue";

/** Interfaces */
import type { ProfileInterface } from "@/interfaces/user.interface";

/** Stores */
import { authStore } from "@/stores/auth.store";

/** Services */
import userServices from "@/services/user.services";

export default defineComponent({

  components: {
    UploadOutlined,
    PlusOutlined,
    LoadingOutlined,
    MailOutlined,
    PhoneOutlined,
    TwitterOutlined,
    LinkedinOutlined
  },

  data() {
    return {
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
        linkedin: ""
      }),

      /** Stores */
      authStore: authStore(),

      /** Loader */
      loading: false
    };
  },

  mounted() {
    const user = this.authStore.user
    this.formProfile.first_name = user.first_name
    this.formProfile.last_name = user.last_name
    this.formProfile.email = user.email
    this.formProfile.birthday = user.birthday
    this.formProfile.dni = user.dni
    this.formProfile.phone = user.applicant.phone
    this.formProfile.linkedin = user.applicant.linkedin
    this.formProfile.description = user.applicant.description
    this.formProfile.youtube = user.applicant.youtube
    this.formProfile.briefcase = user.applicant.briefcase
  },

  computed: {},

  methods: {

    async updateUser (values: ProfileInterface) {
      try {
        this.loading = true
        const response = await userServices.update(values)
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
    }
  }

});
</script>

<template lang="pug">
.my-profile-show
  a-row(align="middle" justify="center" :gutter="[16,16]")
    a-col(:lg="{ span: 12 }", :md="{ span: 18 }")
      .title.font-size__h3 Completa tu perfil profesional

      a-form(ref="refFormUser", :model="formProfile", @finish="updateUser")
        .margin-top__30
          a-divider
            a-typography-text(type="secondary")
              span Mi Informacion Personal

          a-row

            a-col(:sm="12")
              h4 Foto de Perfil
              p.font-size__12.color__gray.padding__0.margin__0 Minimo 200x200 px, Cuadrara
              p.font-size__12.color__gray.padding__0.margin__0 (Igual que el avatar de Facebook o Whatsapp).

            a-col(:sm="12")
              a-form-item
                a-upload(list-type="picture-card")
                  plus-outlined.margin-right__5
                  .ant-upload-text Cargar...

            a-divider

            a-col(:sm="12")
              h4 Nombre y apellido
              p.font-size__12.color__gray.padding__0.margin__0 Usa tu nombre real ya que sera el cual visualizaran
              p.font-size__12.color__gray.padding__0.margin__0 las empresas al momemento de reclutar.

            a-col(:sm="12")
              a-form-item(
                name="first_name",
                :rules="[{ required: true, message: 'Ingrese su nombre' }]"
              )
                a-input(v-model:value="formProfile.first_name", placeholder="Nombre")
              a-form-item(
                name="last_name",
                :rules="[{ required: true, message: 'Ingrese su apellido' }]"
              )
                a-input(v-model:value="formProfile.last_name", placeholder="Apellido")

            a-divider

            a-col(:sm="12")
              h4 Correo
              p.font-size__12.color__gray.padding__0.margin__0 Tu correo es esencial para nosotros, ya que nos ayuda
              p.font-size__12.color__gray.padding__0.margin__0 a enviarte notificaciones sobre tus postulaciones.

            a-col(:sm="12")
              a-form-item(
                name="email",
                :rules="[{ required: true, message: 'Ingrese su correo' }]"
              )
                a-input(v-model:value="formProfile.email", placeholder="Correo", disabled)

            a-divider

            a-col(:sm="12")
              h4 Telefono
              p.font-size__12.color__gray.padding__0.margin__0 Ingrese su numero de telefono personal.

            a-col(:sm="12")
              a-form-item(
                name="phone",
                :rules="[{ required: true, message: 'Ingrese su telefono' }]"
              )
                a-input(v-model:value="formProfile.phone", placeholder="Teléfono")

            a-divider

            a-col(:sm="12")
              h4 Fecha de Nacimiento

            a-col(:sm="12")
              a-form-item(
                name="birthday",
                :rules="[{ required: true, message: 'Ingrese su fecha de nacimiento' }]"
              )
                a-input(v-model:value="formProfile.birthday", placeholder="Fecha de nacimiento", type="date")

            a-divider

            a-col(:sm="12")
              h4 Rut

            a-col(:sm="12")
              a-form-item(
                name="birthday",
                :rules="[{ required: true, message: 'Ingrese su fecha de nacimiento' }]"
              )
                a-input(v-model:value="formProfile.dni", placeholder="Rut", disabled)


        .margin-top__100
          a-divider
            a-typography-text(type="secondary")
              span Competencias

          a-row

            a-col(:sm="24")
              h4.font-weight__bold Cuentanos sobre ti:
              a-form-item(
                name="description",
                :rules="[{ required: false }]"
              )
                a-textarea(v-model:value="formProfile.description", :auto-size="{ minRows: 5, maxRows: 10 }")

            a-divider

            a-col(:sm="12")
              h4.font-weight__bold Añade tus ultimas experiencias laborales
              a-button(type="primary", variant="outlined") Añadir

            a-divider

            a-col(:sm="12")
              h4.font-weight__bold Añade tus habilidades
              a-button(type="primary", variant="outlined") Añadir

            a-divider

            a-col(:sm="12")
              h4.font-weight__bold Formación academica
              a-button(type="primary", variant="outlined") Añadir

            a-divider

            a-col(:sm="12")
              h4 Carga tu CV
              p.font-size__12.color__gray.padding__0.margin__0 Archivo debe ser en formato PDF y no debe pesar mas 5MB.

            a-col(:sm="12")
              a-form-item
                a-upload
                  a-button
                    upload-outlined
                    span Sube el documento aquí

        .margin-top__100
          a-divider
            a-typography-text(type="secondary")
              span Redes Sociales

          a-row

            a-col(:sm="12")
              h4 Un video de YouTube de ti mismo
              p.font-size__12.color__gray.padding__0.margin__0 Intruce acerca de ti en un pequeño video de no mas de 30
              p.font-size__12.color__gray.padding__0.margin__0 segundos. Compenta sobre tus experiencias y habilidades.

            a-col(:sm="12")
              a-form-item(
                name="youtube",
                :rules="[{ required: false }]"
              )
                a-input(v-model:value="formProfile.youtube", placeholder="https://www.youtube.com")

            a-divider

            a-col(:sm="12")
              h4 Link hacia tu porfaolio
              p.font-size__12.color__gray.padding__0.margin__0 Puedes copiar aqui alguna URL a tu porfalio. Puede ser
              p.font-size__12.color__gray.padding__0.margin__0 Dropbox, Drive, Sitio Web Propio u otra herramienta.

            a-col(:sm="12")
              a-form-item(
                name="briefcase",
                :rules="[{ required: false }]"
              )
                a-input(v-model:value="formProfile.briefcase", placeholder="https://link-hacia-tu-portafolio")

            a-divider

            a-col(:sm="12")
              h4 Linkedin
              p.font-size__12.color__gray.padding__0.margin__0 Puedes agregar tu perfil de Linkedin

            a-col(:sm="12")
              a-form-item(
                name="linkedin",
                :rules="[{ required: false }]"
              )
                a-input(v-model:value="formProfile.linkedin", placeholder="https://link-hacia-tu-linkedin")

        .margin-top__100
          .float-right
            a-button(
              type="primary",
              html-type="submit",
              :loading="loading",
              size="large") Guardar Cambios

</template>