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
    const { method, id } = this.$route.params
    if (method && id) {
      this.selectedApplicantId = parseInt(`${id}`, 10)
      this.selectedMethod = method
      if (method === 'view') {
        console.log("mounted if")
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
        await this.applicantStore.getApplicants()
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
.applicant-list
  .title.font-size__h3 Postulantes

  

</template>
