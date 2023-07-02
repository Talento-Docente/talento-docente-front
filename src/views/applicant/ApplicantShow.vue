<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from 'vue'

/** Internal dependencies */
/** Store */
import { applicantStore } from '@/stores/applicant.store'

/** Interfaces */
import { message, type TableColumnsType } from 'ant-design-vue'
import type { UploadProps, UploadChangeParam } from 'ant-design-vue'
import type { ApplicantInterface } from '@/interfaces/applicant.interface'
import type { UserInterface } from '@/interfaces/user.interface'

/** Icons */
import {
  EditOutlined,
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons-vue';

/** Constants */
const COLUMNS = ref<TableColumnsType>([
  {
    title: 'Perfil',
    key: 'user.picture',
    dataIndex: 'picture'
  },
  {
    title: 'Nombre',
    key: 'user.first_name',
    dataIndex: 'first_name'
  },
  {
    title: 'Correo',
    key: 'user.email',
    dataIndex: 'email'
  },
  {
    title: 'Teléfono',
    key: 'phone',
    dataIndex: 'phone'
  },
  {
    title: 'Acciones',
    key: 'action',
    dataIndex: 'action'
  }
])
export default defineComponent({

  components: {
    EditOutlined,
    SearchOutlined,
    PlusOutlined
  },

  data: () => ({
    /** Table */
    columns: COLUMNS,

    /** Store */
    applicantStore: applicantStore(),

    /** Loader */
    loadingApplicant: false,

     /** Form */
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

    /** Page */
    selectedMethod: ref<string | string[]>('new'),


  }),

  mounted () {
    const { id } = this.$route.params
    if (id) {
      this.selectedApplicantId = parseInt(`${id}`, 10)
      if (this.selectedApplicantId) {
        this.getApplicant()
      }
    } else {
      message.error('Error al obtener información')
      //this.back()
    }
  },

  methods: {
    async init () {
      try {
        this.loadingApplicant = true
        await this.getApplicant()
      } catch (error) {
        console.log({ error })
      } finally {
        this.loadingApplicant = false
      }
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
          //this.back()
        }

      } catch (error) {
        console.log({ error })
        //this.back()

      } finally {
        this.loadingApplicant = false
      }
    },
  }

})
</script>

<template lang="pug">
.applicant-show
  .title.font-size__h3 Perfil de Postulante
    template(v-if="form.user.picture")
      div(class="space-align-block")
        a-space(align="center")
          a-avatar(:src="form.user.picturePreview" alt="avatar" :size="150")
    a-descriptions(title="Informacion de Postulante" bordered)
      a-descriptions-item(label="Nombre") {{form.user.first_name}}
      a-descriptions-item(label="Apellido Paterno") {{form.user.last_name}}
      a-descriptions-item(label="Apellido Materno") {{form.user.second_last_name}}
      a-descriptions-item(label="RUT") {{form.user.dni}}
      a-descriptions-item(label="Fecha de Nacimiento" :span="2") {{form.user.birthday}}

      a-descriptions-item(label="Numero de telefono") {{ form.phone }}
      a-descriptions-item(label="Correo Electronico" :span="2")
        a-badge(status="processing" :text="form.user.email") 
      a-descriptions-item(label="Youtube")
        //- Revisar el link
        a(:href="form.youtube" target="_blank") {{ form.youtube }}
      a-descriptions-item(label="LinkedIn")
        a(:href="form.linkedin" target="_blank") {{ form.linkedin }}
      a-descriptions-item(label="Twitter")
        a(:href="form.twitter" target="_blank") {{ form.twitter }}
      a-descriptions-item(label="Experiencia Profesional" :span="3")
        //- texto de prueba
        p Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        template(v-if="form.curriculum")
            a(:href="form.curriculumPreview", target="_blank") Ver CV

</template>
