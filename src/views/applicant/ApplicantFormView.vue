<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'

/** Internal dependencies */
/** Store */
import { applicantStore } from '@/stores/applicant.store'

/** Interfaces */
import type { UploadProps, UploadChangeParam } from 'ant-design-vue'
import type { ApplicantInterface } from '@/interfaces/applicant.interface'
import type { UserInterface } from '@/interfaces/user.interface'

/** Icons */
import {
  InboxOutlined,
  LoadingOutlined,
  PlusOutlined,
  DeleteFilled,
  FilePdfFilled
} from '@ant-design/icons-vue'

function getBase64(img: any, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}
export default defineComponent({

  components: {
    InboxOutlined,
    LoadingOutlined,
    PlusOutlined,
    DeleteFilled,
    FilePdfFilled
  },

  setup () {
    return {
    }
  },

  data: () => ({
    /** Page */
    selectedMethod: ref<string | string[]>('new'),

    /** Form */
    labelCol: { style: { width: '150px' } },
    wrapperCol: { span: 24 },
    validateMessages: {
      required: '${label} es requerido!',
      types: {
        email: '${label} no es un email valido!',
        number: '${label} no es un numero!',
      },
      number: {
        range: '${label} no se encuentra dentro de ${min} y ${max}',
      },
    },
    selectedApplicantId: ref<number>(0),
    form: reactive<ApplicantInterface>({
      description: '',
      profesional_experience: '',
      phone: '',
      youtube: '',
      linkedin: '',
      briefcase: '',
      twitter: '',
      english_level: '',
      curriculum: null,
      user: reactive<UserInterface>({
        email: '',
        first_name: '',
        last_name: '',
        second_last_name: '',
        dni: '',
        picture: null,
        birthday: null,
      })
    }),
    pictureList: [],

    /** Store */
    applicantStore: applicantStore(),

    /** Loader */
    loadingApplicant: false,
    loadingSave: false,
    loadingPicture: false,
    loadingCurriculum: false,
  }),

  mounted() {
    const { method, id } = this.$route.params
    if (method && id) {
      this.selectedApplicantId = parseInt(`${id}`, 10)
      this.selectedMethod = method
      if (method === 'update') {
        this.getApplicant()
      }
    } else {
      message.error('Error al obtener información')
      this.back()
    }
  },

  methods: {
    back () {
      this.$router.push({ name: 'ApplicantList' })
    },

    beforeUploadCurriculum (file: UploadProps) {
      this.form.curriculum = file
      return false
    },

    removeCurriculum () {
      this.form.curriculum = null
    },

    changeCurriculum (info: any) {
      getBase64(info.file, (base64Url: string) => {
        this.form.curriculum = info.file
        this.form.curriculumPreview = URL.createObjectURL(info.file)
      })
    },

    beforeUploadPicture (file: UploadProps) {
      this.form.user.picture = file
      return false
    },

    removePicture () {
      this.form.user.picture = null
    },

    changePicture (info: UploadChangeParam) {
      getBase64(info.file, (base64Url: string) => {
        this.form.user.picture = info.file
        this.form.user.picturePreview = base64Url
      })
    },

    async getApplicant() {
      try {
        this.loadingApplicant = true
        await this.applicantStore.getApplicant(this.selectedApplicantId)
        if (this.applicantStore.applicant) {
          this.form = reactive(this.applicantStore.applicant)
          if (this.form.user.picture) {
            this.form.user.picturePreview = this.form.user.picture
          }
          if (this.form.curriculum) {
            this.form.curriculumPreview = this.form.curriculum
          }

        } else {
          message.error('Error al obtener información')
          this.back()
        }

      } catch (error) {
        console.log({ error })
        this.back()

      } finally {
        this.loadingApplicant = false
      }
    },

    handleFinishFailed (errors: any) {
      console.log({ errors })
    },

    async onFinish(values: ApplicantInterface) {
      try {
        if (typeof values.curriculum === 'string') {
          delete values.curriculum
        }
        if (typeof values?.user?.picture === 'string') {
          delete values?.user.picture
        }

        values.user_attributes = values.user
        values.user_attributes.skip_password_validation = true
        values.user_attributes.id = this.form.user.id

        this.loadingSave = true
        if (this.selectedMethod === 'new') {

          const response = await this.applicantStore.createApplicant(values)
          if (response.status !== 'success') {
            message.error('Error al guardar información')
          } else {
            message.success('Actualización exitosa')
            this.back()
          }
        } else {
          const response = await this.applicantStore.updateApplicant(this.selectedApplicantId, values)
          if (response.status !== 'success') {
            message.error('Error al guardar información')
          } else {
            message.success('Actualización exitosa')
            this.back()
          }
        }

      } catch (error) {
        console.log(error )
        message.error('Error al guardar información')

      } finally {
        this.loadingSave = false

      }
    }
  }

})

</script>

<template lang="pug">
.applicant-form
  .title.font-size__h3 {{ selectedMethod && selectedMethod === 'update' ? 'Edición' : 'Creación'}} de Postulante

  .form.margin-top__40
    a-form(
      :model="form",
      @finish="onFinish",
      @finishFailed="handleFinishFailed",
      :validate-messages="validateMessages",
      :label-col="labelCol",
      :wrapper-col="wrapperCol")

      a-row(:gutter="[20, 20]")
        a-col(:xl="{ span: 8 }", :lg="{ span: 12 }", :sm="{ span: 24 }")

          a-card

            a-form-item(label="Imagen de Perfil", :name="['user', 'picture']")
              a-upload(
                v-model:file-list="pictureList",
                :multiple="false",
                name="picture",
                list-type="picture",
                :show-upload-list="false",
                :before-upload="beforeUploadPicture",
                @change="changePicture",
                @remove="removePicture",
                :disabled="loadingPicture || !!form.user.picture"
              )
                template(v-if="form.user.picture")
                  a-button(
                    type="dashed",
                    danger,
                    @click="removePicture"
                  ).margin-bottom__10
                    delete-filled
                    span Eliminar
                  a-image(
                    :src="form.user.picturePreview",
                    alt="avatar")

                template(v-else)
                  a-button(
                    type="dashed",
                    :loading="loadingPicture"
                  )
                    plus-outlined
                    span Cargar


                //p.ant-upload-drag-icon
                //  inbox-outlined
                //p.ant-upload-text Haz click o arrastra un archivo en esta area.
                //p.ant-upload-hint

            a-form-item(label="Nombre" :name="['user', 'first_name']", :rules="[{ required: true }]")
              a-input(v-model:value="form.user.first_name")

            a-form-item(label="Apellido Paterno", :name="['user', 'last_name']", :rules="[{ required: true }]")
              a-input(v-model:value="form.user.last_name")

            a-form-item(label="Apellido Materno", :name="['user', 'second_last_name']", :rules="[{ required: false }]")
              a-input(v-model:value="form.user.second_last_name")

            a-form-item(label="Rut", :name="['user', 'dni']", :rules="[{ required: true }]")
              a-input(v-model:value="form.user.dni")

            a-form-item(label="Email", :name="['user', 'email']", :rules="[{ type: 'email', required: true }]")
              a-input(v-model:value="form.user.email", :disabled="selectedMethod === 'update'")

            a-form-item(label="Teléfono", name="phone", :rules="[{ required: false }]")
              a-input(v-model:value="form.phone")

            a-form-item(label="Fecha de Nacimiento", :name="['user', 'birthday']", :rules="[{ required: false }]")
              a-input(type="date", v-model:value="form.user.birthday")

        a-col(:xl="{ span: 8 }", :lg="{ span: 12 }", :sm="{ span: 24 }")

          a-card

            a-form-item(label="Youtube", name="youtube", :rules="[{ required: false }]")
              a-input(v-model:value="form.youtube")

            a-form-item(label="LinkedIn", name="linkedin", :rules="[{ required: false }]")
              a-input(v-model:value="form.linkedin")

            a-form-item(label="Portafolio", name="briefcase", :rules="[{ required: false }]")
              a-input(v-model:value="form.briefcase")

            a-form-item(label="Curriculum", name="curriculum", :rules="[{ required: false }]")
              a-upload(
                :multiple="false",
                name="picture",
                list-type="picture",
                :show-upload-list="false",
                :before-upload="beforeUploadCurriculum",
                @change="changeCurriculum",
                @remove="removeCurriculum",
                :disabled="loadingCurriculum || !!form.curriculum"
              )
                template(v-if="form.curriculum")
                  a-button(
                    @click="removeCurriculum",
                    type="dashed",
                    danger
                  ).margin-bottom__10
                    delete-filled
                    span Eliminar
                  p
                    file-pdf-filled.margin-right__10
                    a(:href="form.curriculumPreview", target="_blank") Ver CV

                template(v-else)
                  a-button(
                    type="dashed",
                    :loading="loadingPicture"
                  )
                    plus-outlined
                    span Cargar

        a-col(:xl="{ span: 8 }", :lg="{ span: 12 }", :sm="{ span: 24 }")

          a-card

        a-col(:xl="{ span: 8 }", :lg="{ span: 12 }", :sm="{ span: 24 }")

          a-form-item
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
