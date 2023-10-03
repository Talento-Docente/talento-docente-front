<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import draggable from 'vuedraggable'

/** Stores */
import { authStore } from "@/stores/auth.store";
import { employmentStore } from "@/stores/employment.store";
import { applicantStore } from "@/stores/applicant.store";
import { postulationStore } from "@/stores/postulation.store";

/** Interfaces */
import type { PostulationInterface } from '@/interfaces/postulation.interface';

/** Services */
import { QuillEditor } from "@vueup/vue-quill";

/** Icons */
import {
  FormOutlined,
  LineChartOutlined,
  CommentOutlined,
  LinkedinOutlined,
  PhoneOutlined,
  TwitterOutlined,
  AuditOutlined,
  MailOutlined

} from '@ant-design/icons-vue'

export default defineComponent({

  components: {
    draggable,
    FormOutlined,
    LineChartOutlined,
    CommentOutlined,
    LinkedinOutlined,
    PhoneOutlined,
    TwitterOutlined,
    AuditOutlined,
    MailOutlined,
    QuillEditor

  },

  setup () {
    const refFormApplicant =  ref<FormInstance>()
    return {
      refFormApplicant
    }
  },

  data() {
    return {
      /** Loader */
      loading: false,
      loadingSelectedApplicant: false,
      loadingPostulationChanges: false,
      loadingAddApplicant: false,

      /** Stores */
      authStore: authStore(),
      employmentStore: employmentStore(),
      applicantStore: applicantStore(),
      postulationStore: postulationStore(),

      /** Modal */
      selectedApplicant: {} as any,
      visibleApplicantModal: false,
      tabKey: 'experiences',
      color: "#f3f3f3",
      tabListNoTitle: [
      {
          key: 'experiences',
          tab: 'Experiencias',
        },
        {
          key: 'skills',
          tab: 'Habilidades',
        },
        {
          key: 'academic_training',
          tab: 'Formacion Academica',
        },
        {
          key: 'comments',
          tab: 'Comentarios',
        },
      ],

      /** Add Applicant Modal */
      labelCol: { style: { width: '150px' } },
      wrapperCol: { span: 24 },
      visibleAddApplicantModal: false,
      formApplicant: reactive<any>({
        email: '',
        first_name: '',
        last_name: ''
      }),

      /** Stages */
      stagesCount: 0,
      selectedEmploymentId: null as number | null,
      stages: {} as any
    };
  },

  async mounted() {
    await this.init()
  },

  methods: {

    async init () {
      try {
        this.loading = true
        const { id } = this.$route.params
        this.selectedEmploymentId = Number(id)
        if (!id) {
          throw Error('Not specific employment id')
        }
        await this.employmentStore.getEmployment(Number(id))

        this.stagesCount = 0
        this.employmentStore.employment?.flow?.stages?.forEach((stage) => {
          this.stagesCount += 1
          this.stages[`stage_${stage.id}`] = []
        })

        const { applicants } = await this.employmentStore.getApplicants(Number(id))
        applicants.forEach((applicant: any) => {
          this.stages[`stage_${applicant.stage_id}`].push(applicant)
        })
      } catch (e) {
        console.log({ e })
        this.$router.push({ name: 'EmploymentList' })
      } finally {
        this.loading = false
      }
    },

    handleChange (value: any) {
      console.log({ value })
    },

    inputChanged (value: any) {
      console.log({ value })
    },

    async log (stage: any, value: any) {
      if (value.added) {
        const { added: { element } } = value
        console.log({ stage_id: stage.id, postulation_id: element.postulation_id })
        try {
          this.loadingPostulationChanges = true
          await this.postulationStore.updatePostulation(
            element.postulation_id,
            { stage_id: stage.id } as PostulationInterface
          )
        } catch (e) {
          message.error('Error al realizar cambios')
        } finally {
          this.loadingPostulationChanges = false
        }
      }
    },

    async showDetailModal(element: any){
      try {
        this.loadingSelectedApplicant = true
        await this.applicantStore.getApplicant(element.applicant_id)
        this.visibleApplicantModal = true
      } catch (e) {
        console.log({ e })
        message.warning('Error al obtener información')
      } finally {
        this.loadingSelectedApplicant = false
      }
    },

    closeApplicantModal() {
      this.visibleApplicantModal = false
    },

    async onFinishSearchApplicant() {
      try {
        if (this.refFormApplicant) {
          this.loadingAddApplicant = true;
          const values = await this.refFormApplicant.validateFields()
          const form = {
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name
          } as any
          const response = await this.employmentStore.findOrCreatePostulation(Number(this.selectedEmploymentId), form)
          const { status, postulation } = response;
          console.log({ postulation })
          if (status !== "success") {
            message.error("Error al obtener información");
          } else {
            message.success("Asociación exitosa");
            await this.init()
            this.visibleAddApplicantModal = false
          }
        }
      } catch (error) {
        console.log({ error });
      } finally {
        this.loadingAddApplicant = false
      }
    },

    onTabChange(value: string, type: string){
      this.tabKey = value
    },
  }

});
</script>

<template lang="pug">
.employment-form-view
  a-row
    a-col
      a-button(type="primary", @click="() => $router.push({ name: 'Employment' })").margin-top__5.margin-right__10 Volver
      a-button(type="primary", @click="() => $router.push({ name: 'EmploymentForm', params: { method: 'update', id: `${selectedEmploymentId}` }})", :loading="loading").margin-top__5.margin-right__10 Editar Trabajo
      a-button(type="primary", @click="() => visibleAddApplicantModal = true").margin-top__5.margin-right__10 Añadir Postulante
      a-button(type="primary", @click="() => init()", :loading="loading").margin-top__5.margin-right__20 Recargar
    a-col
      .font-size__h3 Postulación: {{ employmentStore.employment?.title }}

  a-row(justify="center")
    a-col(:xl="{ span: 24 }", :lg="{ span: 24 }", :sm="{ span: 24 }")
      h2 Etapas

      a-row(:gutter="[5, 5]")
        a-col(v-for="stage in employmentStore.employment?.flow?.stages", :lg="{ span: (24 / stagesCount).toFixed(0) - 1 }")
          a-card(:bodyStyle="{ background: color }", :loading="loading")
            template(#title) {{ stage.name }}

            draggable(
              :list="stages[`stage_${stage.id}`]",
              @change="(event) => log(stage, event)",
              group="people",
              item-key="id",
              class="step-draggable"
            )
              template(#item="{ element }")
                a-card(hoverable, @click="() => showDetailModal(element)")
                  a-row
                    a-col
                      a-avatar().margin-right__5
                    a-col
                      p.padding__0.margin__0.font-size__15 {{ element.first_name }} {{ element.last_name }}
                      p.padding__0.margin__0.font-size__12 {{ element.first_name }} {{ element.last_name }}

  a-modal(
    title="Añadir Postulante",
    v-model:visible="visibleAddApplicantModal",
    @ok="onFinishSearchApplicant",
    okText="Buscar y Añadir"
    okType="primary",
    :confirm-loading="loadingAddApplicant")
    template(#title)
      span Crear flujo de reclutamiento

    a-form(ref="refFormApplicant", :model="formApplicant", @finish="onFinishSearchApplicant", :label-col="labelCol" :wrapper-col="wrapperCol")

      a-form-item(
        label="Correo",
        name="email",
        :rules="[{ required: true, message: 'Ingrese correo' }]")
        a-input(v-model:value="formApplicant.email")

      a-form-item(
        label="Nombres",
        name="first_name",
        :rules="[{ required: true, message: 'Ingrese nombre'}]")
        a-input(v-model:value="formApplicant.first_name" auto-size)

      a-form-item(
        label="Apellidos",
        name="last_name",
        :rules="[{ required: false }]")
        a-input(v-model:value="formApplicant.last_name" auto-size)

      p.padding__0.margin__0.font-size__12 ** En el caso que se encuentre una considencia por el correo se añadira aplicante con algún postulante en el sistema, se añadira. En el caso contrario, se creara postulante y se le enviara un correo para comenzar el registro.

  a-modal(v-model:visible="visibleApplicantModal",
          @ok="closeApplicantModal",
          width="1000px",
          :bodyStyle="{ background: color }",
          :footer="null")

    a-row.margin-top__20
      a-col(:span="9")
        a-row(:gutter="[16,8]")
          a-col(v-if="applicantStore.applicant?.user?.picture")
            a-avatar(:src="applicantStore.applicant?.user?.picture" :size="50")
          a-col
            h3 {{ applicantStore.applicant?.user?.first_name }} {{ applicantStore.applicant?.user?.last_name }}

        span(v-html="applicantStore.applicant?.description")

        .margin-top__20
          a-button(type="link")
            MailOutlined
            span {{ applicantStore.applicant?.user?.email }}

        .margin-top__10
          a-button(type="link")
            PhoneOutlined
            span {{ applicantStore.applicant?.phone || 'No especificado' }}

        .margin-top__10
          a-button(type="link", :href="applicantStore.applicant?.twitter || '#'", :disabled="!applicantStore.applicant?.twitter")
            TwitterOutlined
            span {{ applicantStore.applicant?.twitter || 'No especificado' }}

        .margin-top__10
          a-button(type="link", :href="applicantStore.applicant?.linkedin || '#'", :disabled="!applicantStore.applicant?.linkedin")
            LinkedinOutlined
            span {{ applicantStore.applicant?.linkedin || 'No especificado' }}

        .margin-top__10
          a-button(type="link", :href="applicantStore.applicant?.curriculum || '#'", :disabled="!applicantStore.applicant?.curriculum")
            AuditOutlined
            span Ver CV


      //- Modal Right side
      a-col(:span="15")
        a-card(:tab-list="tabListNoTitle"
          :bordered="false"
          :active-tab-key="tabKey"
          @tabChange="key => onTabChange(key, 'key')"
          :headStyle="{background: color}").margin-top__10

          template(v-if="tabKey === 'experiences'")
            h2.margin-bottom__30 Experiencias
            a-list(item-layout="horizontal" size="small" :data-source="applicantStore.applicant?.work_experiences")
              template(#renderItem="{ item, index }")
                a-row()
                  a-col(:span="8")
                    h5.font-size__13 {{item.business_name}}
                    span.font__italic  {{item.start_date  }} 
                      span(v-if="item.end_date").display__block - {{ item.end_date }}
                      span(v-else).display__block - Actualidad

                  a-col(:span="16")
                    span.font__weight__600.display__block  {{item.job_title}}
                    span(v-html="item.description")
                a-divider

          template(v-else-if="tabKey === 'skills'")
            h2.margin-bottom__30 Habilidades
            template(v-for="(tag, index) in applicantStore.applicant?.skills" :key="tag")
              a-tag.font-size__14  {{ tag.skill }}

          template(v-else-if="tabKey === 'academic_training'")
            h2.margin-bottom__30 Formacion academica
            a-list(item-layout="horizontal" size="small" :data-source="applicantStore.applicant?.academic_trainings")
              template(#renderItem="{ item, index }")
                
                span.font__weight__600 {{item.career_name}}
                span.display__block {{item.study_house_name}}
                span.font__italic  {{item.start_date}} 
                  span(v-if="item.end_date") - {{ item.end_date }}
                  span(v-else) - Actualidad
                a-divider

          template(v-else-if="tabKey === 'comments'")
            h2 Comentarios

</template>