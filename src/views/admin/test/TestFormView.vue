<script lang="ts">
/** External dependencies */
import { defineComponent, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import * as _ from 'lodash'
import * as uuid from 'uuid'

/** Internal dependencies */
/** Store */
import { testStore } from '@/stores/test.store'
import { establishmentStore } from "@/stores/establishment.store";

/** Interfaces */
import type { TestInterface } from '@/interfaces/test.interface'
import type { QuestionInterface } from '@/interfaces/question.interface'
import type { AlternativeInterface } from "@/interfaces/alternative.interface";

/** Constant */
import { TIME_TYPES } from '@/constants/test.constants'
import { QUESTION_TYPES } from '@/constants/question.constants'

export default defineComponent({

  data: () => ({
    /** FormTest */
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
    selectedTestId: ref<number>(0),
    selectedMethod: ref<string | string[]>('new'),
    formEdit: reactive<TestInterface>({
      name: null,
      description: null,
      time_type: null,
      time_value: null
    }),
    edit: false,

    /** Store */
    testStore: testStore(),
    establishmentStore: establishmentStore(),

    /** Questions */
    questionActiveKey: null,
    questions: [] as Array<QuestionInterface>,
    removedQuestions: [] as Array<QuestionInterface>,

    /** Constants */
    TIME_TYPES,
    QUESTION_TYPES,

    /** Loader */
    loadingTest: false,
    loadingSave: false
  }),

  mounted() {
    const { method, id } = this.$route.params
    if (method && id) {
      this.selectedTestId = parseInt(`${id}`, 10)
      this.selectedMethod = method
      if (method === 'update') {
        this.getTest()
      }
      this.establishmentStore.getEstablishments();
    } else {
      message.error('Error al obtener información')
      this.back()
    }
  },

  methods: {
    back () {
      this.$router.push({ name: 'TestList' })
    },

    async getTest() {
      try {
        this.loadingTest = true
        await this.testStore.getTest(this.selectedTestId)
        if (this.testStore.test) {
          this.formEdit = this.testStore.test
          this.questions = this.testStore.test?.questions || Array<QuestionInterface>()

        } else {
          message.error('Error al obtener información')
          this.back()
        }

      } catch (error) {
        console.log({ error })
        this.back()

      } finally {
        this.loadingTest = false
      }
    },

    async saveTest() {
      try {
        const questionAttributes = this.questions.concat(this.removedQuestions)
        questionAttributes.forEach((questionAttribute) => {
          if (questionAttribute.localStatus === 'new') {
            delete questionAttribute.id
          }
          questionAttribute.alternatives_attributes = questionAttribute.alternatives
          questionAttribute.alternatives_attributes?.forEach((alterantiveAttributes) => {
            if (alterantiveAttributes.localStatus === 'new') {
              delete alterantiveAttributes.id
            }
          })
        })
        const values = {
          name: this.formEdit.name,
          description: this.formEdit.description,
          time_value: this.formEdit.time_value,
          time_type: this.formEdit.time_type,
          establishment_id: this.formEdit.establishment_id,
          questions_attributes: questionAttributes
        }
        this.loadingSave = true
        const response = await this.testStore.updateTest(this.selectedTestId, values)
        if (response.status !== 'success') {
          message.error('Error al guardar información')
        } else {
          message.success('Actualización exitosa')
          this.back()
        }

      } catch (error) {
        console.log({ error })
        message.error('Error al guardar información')

      } finally {
        this.loadingSave = false

      }
    },

    addNewQuestion () {
      const question: QuestionInterface = {
        id: uuid.v4(),
        localStatus: 'new',
        group: null,
        hint: null,
        order_number: null,
        question: null,
        question_type: null,
        value: null,
      }
      this.questions.push(question)
    },

    removeQuestion (question: QuestionInterface) {
      const index = _.findIndex(this.questions, (_question: QuestionInterface) => {
        return question.id === _question.id
      })
      if (index > -1) {
        if (question.localStatus !== 'new') {
          this.questions[index]._destroy = true
          this.removedQuestions.push(this.questions[index])
        }
        this.questions.splice(index, 1)
      }
    },

    addNewAlternative (question: QuestionInterface) {
      const alternative: AlternativeInterface = {
        id: uuid.v4(),
        localStatus: 'new',
        description: null,
        hint: null,
        key: null,
        value: null,
      }
      if (question.alternatives && question.alternatives.length > 0) {
        question.alternatives.push(alternative)
      } else {
        question.alternatives = [alternative]
      }
    },

    removeAlternative (question: QuestionInterface, alternative: AlternativeInterface) {
      const index = _.findIndex(question.alternatives, (_alternative: AlternativeInterface) => {
        return alternative.id === _alternative.id
      })
      if (index > -1 && question.alternatives && question.alternatives.length > 0) {
        if (alternative.localStatus !== 'new') {
          question.alternatives[index]._destroy = true
        } else {
          question.alternatives.splice(index, 1)
        }
      }
    },
  }
})

</script>

<template lang="pug">
.test-form
  .title
    a-row(align="middle")
      a-col
        a-button(type="primary", @click="() => $router.go(-1)").margin-right__10 Volver
      a-col
        .font-size__h3 Edición de Prueba

  .form.margin-top__20
    a-form(:model="formEdit", @finish="saveTest", :label-col="labelCol" :wrapper-col="wrapperCol")

      a-row(:gutter="20", justify="center", align="top")
        a-col(:xl="{ span: 8 }")

          a-card
            a-form-item(
              label="Establecimiento"
              name="establishment_id"
              :rules="[{ required: true, message: 'Seleccione un establecimiento' }]")
              template(v-if="edit")
                a-select(v-model:value="formEdit.establishment_id")
                  a-select-option(v-for="establishment in establishmentStore.establishments", :value="establishment.id") {{ establishment.name }}
              template(v-else)
                span {{ formEdit.establishment?.name }}

            a-form-item(
              label="Nombre"
              name="name"
              :rules="[{ required: true, message: 'Ingrese nombre de test' }]")
              template(v-if="edit")
                a-input(v-model:value="formEdit.name")
              template(v-else)
                span {{ formEdit.name }}

            a-form-item(
              label="Descripción"
              name="description"
              :rules="[{ required: true, message: 'Ingrese description de test' }]")
              template(v-if="edit")
                a-textarea(v-model:value="formEdit.description", :rows="2", :max="100")
              template(v-else)
                span {{ formEdit.description }}

            a-form-item(
              label="Tipo de tiempo"
              name="time_type"
              :rules="[{ required: true, message: 'Selección tipo de tiempo' }]")
              template(v-if="edit")
                a-select(v-model:value="formEdit.time_type")
                  a-select-option(:value="timeType.key", v-for="timeType in TIME_TYPES") {{ timeType.value }}
              template(v-else)
                span {{ $filters.testTimeTypes(formEdit.time_type) }}

            a-form-item(
              v-if="formEdit.time_type !== 'infinite'",
              label="Valor tiempo"
              name="time_value"
              :rules="[{ required: false, message: 'Ingrese cantidad de tiempo' }]")
              template(v-if="edit")
                a-input(v-model:value="formEdit.time_value")
              template(v-else)
                span {{ formEdit.time_type }}

            a-button(
              v-if="!edit",
              type="primary",
              @click="() => edit = !edit"
            ).float-right Editar

            template(v-else)
              .float-right
                a-button(
                  type="primary",
                  :loading="loadingSave",
                  @click="saveTest"
                ).margin-right__10 Guardar

                a-button(
                  :loading="loadingSave",
                  @click="() => edit = !edit",
                  type="danger"
                ) Cancelar

        a-col(:xl="{ span: 16 }")
          a-card
            a-collapse(v-model:active-key="questionActiveKey")
              a-collapse-panel(v-for="question in questions", :key="question.id")
                template(#header)
                  span Pregunta {{ question.order_number }}
                template(#extra)
                  a-button(type="link", danger, size="small", @click="removeQuestion(question)") Eliminar

                a-row(:gutter="20")
                  a-col(:span="3")
                    a-form-item(label="Orden Numerica")
                      a-input(type="number", v-model:value="question.order_number")
                  a-col(:span="9")
                    a-form-item(label="Tipo de Pregunta")
                      a-select(v-model:value="question.question_type").width__100
                        a-select-option(v-for="questionType in QUESTION_TYPES", :value="questionType.key") {{ questionType.value }}
                  a-col(:span="12")
                    a-form-item(label="Pregunta")
                      a-textarea(v-model:value="question.question")

                template(v-if="['selection_unique', 'selection_multiple'].indexOf(question.question_type) > -1")
                  a-row(:gutter="20").margin-top__10
                    a-col(:span="3")
                      span Alternativa
                    a-col(:span="18")
                      span Respuesta
                  template(v-for="alternative in question.alternatives")
                    template(v-if="!alternative?._destroy")
                      a-row(:gutter="20").margin-top__10
                        a-col(:span="3")
                          a-input(v-model:value="alternative.key")
                        a-col(:span="18")
                          a-input(v-model:value="alternative.description")
                        a-col(:span="3")
                          a-button(type="link", danger, size="small", @click="removeAlternative(question, alternative)") Eliminar

                  a-button(type="link", @click="addNewAlternative(question)").margin-top__20
                    span Añadir Respuesta +

            a-button(type="primary", @click="saveTest()").margin-top__20.float-right
              span Guardar

            a-button(type="link", @click="addNewQuestion").margin-top__20.float-right
              span Añadir pregunta +


              //a-form-item.margin-top__40
              //  a-space
              //    a-button(
              //      type="primary",
              //      html-type="submit",
              //      :loading="loadingSave"
              //    ) Guardar
              //
              //    a-button(
              //      type="danger",
              //      @click="back()",
              //      :loading="loadingSave"
              //    ) Cancelar

  .actions

</template>
