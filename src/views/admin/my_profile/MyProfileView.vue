<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from "vue";
import type { UploadProps } from 'ant-design-vue';
import { message as aMessage, message } from "ant-design-vue";
import * as uuid from "uuid";
import _ from "lodash";

/** Interfaces */
import type {  WorkExperienceInterface } from '@/interfaces/work_experience.interface'
import type {  AcademicTrainingInterface } from '@/interfaces/academic_training.interface'

/** Internal dependencies */
import config from '@/config'

/** Icons */
import {
  UploadOutlined,
  PlusOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  CameraOutlined,
  UserOutlined,
  AuditOutlined,
  CalendarOutlined,
  IdcardOutlined,
  CommentOutlined,
  ProfileOutlined,
  UserAddOutlined,
  ReadOutlined,
  YoutubeOutlined,
  FolderOutlined
} from "@ant-design/icons-vue";
import type { SelectProps } from 'ant-design-vue';

/** Interfaces */
import type { ProfileInterface } from "@/interfaces/user.interface";

/** Stores */
import { authStore } from "@/stores/auth.store";
import {workExperienceStore} from "@/stores/work_experience.store"
import {academicTrainingStore} from "@/stores/academic_training.store"

/** Services */
import userServices from "@/services/user.services";
import { QuillEditor } from "@vueup/vue-quill";

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
    QuillEditor,
    UploadOutlined,
    PlusOutlined,
    LoadingOutlined,
    MailOutlined,
    PhoneOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    CameraOutlined,
    UserOutlined,
    AuditOutlined,
    CalendarOutlined,
    IdcardOutlined,
    CommentOutlined,
    ProfileOutlined,
    UserAddOutlined,
    ReadOutlined,
    YoutubeOutlined,
    FolderOutlined
  },

  data() {
    return {
      config,

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

      /** Files */
      pictureList: ref<UploadProps['fileList']>([]),
      curriculumList: ref<UploadProps['fileList']>([]),
      headers: { 'Authorization': authStore().token },

      /** Stores */
      authStore: authStore(),
      workExperienceStore: workExperienceStore(),
      academicTrainingStore: academicTrainingStore(),

      /** Loader */
      loading: false,
      loadingUpload: false,

      /** Modal */
      modalExperience: false,
      modalSkills:false,
      modalAcademy:false,
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 24 },
      

      /** Experiences */
      formExperience: reactive<WorkExperienceInterface>({
        business_name: '',
        description: '',
        end_date: '',
        job_title: '',
        start_date: '',
        applicant_id: 0
      }),
      loadingExpList: ref(false),

      /** Habilities */
      options : ref<SelectProps['options']>([
        {
          value: 'math_tech',
          label: 'Matematicas',
        },
        {
          value: 'cie_tech',
          label: 'Ciencias',
        },
        {
          value: 'eng',
          label: 'Ingles',
        },
        {
          value: 'aux',
          label: 'Profesor de auxiliar',
        },
      ]),
      /** Academic Info*/
      formAcademic: reactive<AcademicTrainingInterface>({
        career_name: '',
        end_date: '',
        start_date: '',
        study_house_name: '',
        applicant_id: 0
      }),
    };
  },

  mounted() {
    this.init()
    this.getExperiences()
  },

  computed: {},

  methods: {

    init () {
      try {
        this.workExperienceStore.getWorkExperiences()
        console.log(this.workExperienceStore.workExperiences)
      } catch (error) {
        console.log(error)
      }
      const user = this.authStore.user
      this.formProfile.first_name = user.first_name
      this.formProfile.last_name = user.last_name
      this.formProfile.email = user.email
      this.formProfile.birthday = user.birthday
      this.formProfile.dni = user.dni
      this.formProfile.description = user.applicant.description
      if (user.picture) {
        this.pictureList?.push(
          {
            uid: uuid.v4(),
            name: 'picture.png',
            status: 'done',
            url: user.picture,
            thumbUrl: user.picture
          }
        )
      }
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

    showModalExp () {
      this.modalExperience = true;
    },

    cleanFormExperience () {
      this.formExperience.business_name= ''
      this.formExperience.description= ''
      this.formExperience.end_date= ''
      this.formExperience.job_title= ''
      this.formExperience.start_date= ''
      this.formExperience.applicant_id = 0
    },

    cleanFormAcademic(){
      this.formAcademic.career_name = ''
      this.formAcademic.end_date = ''
      this.formAcademic.start_date = ''
      this.formAcademic.study_house_name = ''
      this.formAcademic.applicant_id = 0
    },

    handleChange (value: []) {
      //Al cambiar el tag en habilidades 
      console.log(`selected ${value}`);
    },

    showModalSkills () {
      this.modalSkills = true;
    },

    showModalAcademy () {
      this.modalAcademy = true;
    },

    handleOk  () {
      this.modalExperience = false;
      this.modalSkills = false;
      this.modalAcademy = false;
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
        this.cleanFormExperience()
        this.handleOk()
      }
      this.loading = false
    }, 
    
    removeExperience () {
      
    },
    
    async getExperience(){
      try {
        
      } catch (error) {
        
      }

    },
    async getExperiences(){
      try {
        this.loading = true
        await this.workExperienceStore.getWorkExperiences()
      } catch (error) {
        console.log(error)
      }finally {
        this.loading = false;
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
        this.loading = false
      }
      
    },

    async getAcademicTrainings(){
      try {
        this.loading = true
        await this.academicTrainingStore.getAcademicTrainings()
      } catch (e) {
        console.log(e)
      }finally {
        this.loading = false;
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
              h4
                CameraOutlined
                span.margin-left__10 Foto de Perfil
              p.font-size__12.color__gray.padding__0.margin__0 Minimo 200x200 px, Cuadrada
              p.font-size__12.color__gray.padding__0.margin__0 (Igual que el avatar de Facebook o Whatsapp).

            a-col(:sm="12")
              a-form-item
                a-upload(
                  list-type="picture-card",
                  v-model:file-list="pictureList",
                  :action="`${config.urlApi}/api/users/upload/picture`",
                  :headers="headers",
                  :loading="loadingUpload",
                  @preview="handlePreview",
                  @remove="() => handleRemove('picture')"
                )
                  template(v-if="pictureList.length <= 0")
                    plus-outlined.margin-right__5
                    .ant-upload-text Cargar...

            a-divider

            a-col(:sm="12")
              h4
                UserOutlined
                span.margin-left__10 Nombre y apellido
              p.font-size__12.color__gray.padding__0.margin__0 Usa tu nombre real ya que sera el cual visualizaran
              p.font-size__12.color__gray.padding__0.margin__0 las empresas al momemento de reclutar.

            a-col(:sm="12")
              a-form-item(
                name="first_name",
                :rules="[{ required: false, message: 'Ingrese su nombre' }]"
              )
                a-input(v-model:value="formProfile.first_name", placeholder="Nombre")
              a-form-item(
                name="last_name",
                :rules="[{ required: false, message: 'Ingrese su apellido' }]"
              )
                a-input(v-model:value="formProfile.last_name", placeholder="Apellido")

            a-divider

            a-col(:sm="12")
              h4
                MailOutlined
                span.margin-left__10 Correo
              p.font-size__12.color__gray.padding__0.margin__0 Tu correo es esencial para nosotros, ya que nos ayuda
              p.font-size__12.color__gray.padding__0.margin__0 a enviarte notificaciones sobre tus postulaciones.

            a-col(:sm="12")
              a-form-item(
                name="email",
                :rules="[{ required: false, message: 'Ingrese su correo' }]"
              )
                a-input(v-model:value="formProfile.email", placeholder="Correo", disabled)

            a-divider

            a-col(:sm="12")
              h4
                PhoneOutlined
                span.margin-left__10 Telefono
              p.font-size__12.color__gray.padding__0.margin__0 Ingrese su numero de telefono personal.

            a-col(:sm="12")
              a-form-item(
                name="phone",
                :rules="[{ required: false, message: 'Ingrese su telefono' }]"
              )
                a-input(v-model:value="formProfile.phone", placeholder="Teléfono")

            a-divider

            a-col(:sm="12")
              h4
                CalendarOutlined
                span.margin-left__10 Fecha de Nacimiento

            a-col(:sm="12")
              a-form-item(
                name="birthday",
                :rules="[{ required: false, message: 'Ingrese su fecha de nacimiento' }]"
              )
                a-input(v-model:value="formProfile.birthday", placeholder="Fecha de nacimiento", type="date")

            a-divider

            a-col(:sm="12")
              h4
                IdcardOutlined
                span.margin-left__10 Rut

            a-col(:sm="12")
              a-form-item(
                name="birthday",
                :rules="[{ required: false, message: 'Ingrese su fecha de nacimiento' }]"
              )
                a-input(v-model:value="formProfile.dni", placeholder="Rut", disabled)


        .margin-top__100
          a-divider
            a-typography-text(type="secondary")
              span Competencias

          a-row

            a-col(:sm="24")
              h4.font-weight__bold
                CommentOutlined
                span.margin-left__10 Cuentanos sobre ti:
              a-form-item(
                name="description",
                :rules="[{ required: false }]"
              )
                quill-editor(v-model:content="formProfile.description", content-type="html")
                //a-textarea(v-model:value="formProfile.description", :auto-size="{ minRows: 5, maxRows: 10 }")

            a-divider

            a-col(:sm="12")
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
                    a-form(:model="formExperience", @finish="createExperience")
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
                              name="description").margin-top__10
                              quill-editor(v-model:value="formExperience.description", content-type="html")
                        a-button(type="link" @click="cleanFormExperience()").margin-top__20.float-right
                          span Limpiar

                        a-button(type="primary" html-type="submit").margin-top__20.float-right
                          span Guardar
            a-col(:sm="12")
              //- a-list(
              //-   :data-source="workExperienceStore.workExperience"
              //-   item-layout="horizontal")

            a-divider

            a-col(:sm="16")
              h4.font-weight__bold
                UserAddOutlined
                span.margin-left__10 Añade tus habilidades

              a-col()
                a-select(
                  mode="tags"
                  style="width: 60%"
                  :token-separators="[',']"
                  placeholder="Agregar habilidades"
                  :options="options"
                  @change="handleChange")
                a-button(@click="showModalSkills()" type="primary", variant="outlined") Guardar                      

            a-divider

            a-col(:sm="12")
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
                    h4.text-align__center Mi información academica
                    a-card
                      a-form(:model="formAcademic" @finish="createAcademicTraining" :label-col="labelCol" :wrapper-col="wrapperCol")
                        a-form-item(
                            label="Nombre de institución",
                            name="study_house_name")
                            a-input(v-model:value="formAcademic.study_house_name")

                        a-form-item(
                            label="Carrera",
                            name="career_name")
                            a-input(v-model:value="formAcademic.career_name")
                        
                        a-form-item(:wrapper-col="{ span: 8 }"
                          label="Fecha Inicio",
                          name="start_date")
                          a-input(type="date" v-model:value="formAcademic.start_date")

                        a-form-item(:wrapper-col="{ span: 8 }"
                          label="Fecha termino",
                          name="end_date")
                          a-input(type="date" v-model:value="formAcademic.end_date")
                          p.font-size__12.color__gray.padding__0.margin__0 * No obligatorio.

                        a-button(type="primary" html-type="submit").margin-top__20.float-right
                          span Guardar

            a-divider

            a-col(:sm="12")
              h4
                AuditOutlined
                span.margin-left__10 Carga tu CV
              p.font-size__12.color__gray.padding__0.margin__0 Archivo debe ser en formato PDF y no debe pesar mas 5MB.

            a-col(:sm="12")
              a-form-item
                a-upload(
                  v-model:file-list="curriculumList",
                  :action="`${config.urlApi}/api/users/upload/curriculum`",
                  :headers="headers",
                  :loading="loadingUpload",
                  @preview="handlePreview",
                  @remove="() => handleRemove('curriculum')"
                )
                  a-button(:disabled="curriculumList.length > 0")
                    upload-outlined
                    span Sube el documento aquí

        .margin-top__100
          a-divider
            a-typography-text(type="secondary")
              span Redes Sociales

          a-row

            a-col(:sm="12")
              h4
                YoutubeOutlined
                span.margin-left__10 Un video de YouTube de ti mismo
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
              h4
                FolderOutlined
                span.margin-left__10 Link hacia tu porfaolio
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
              h4
                LinkedinOutlined
                span.margin-left__10 Linkedin
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
