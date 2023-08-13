/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */
/** Interfaces */
import type { QuestionInterface } from "@/interfaces/question.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import questionServices from '@/services/question.services'
export const questionStore = defineStore('question', {

  state: () => {
    return {
      questions: [] as QuestionInterface[],
      question: null as QuestionInterface | null,
      meta: {} as MetaInterface,
    }
  },

  actions: {
    async getQuestions(testId: number, page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const response = await questionServices.index(testId, page, pageSize, searchBy)
      const { questions, meta } = response.data
      this.questions = questions
      this.meta = meta
      return questions
    },

    async getQuestion(testId: number, questionId: number = 1) {
      const response = await questionServices.show(testId, questionId)
      const { data } = response
      this.question = data
      return data
    },

    async createQuestion(testId: number, questionData: QuestionInterface) {
      const response = await questionServices.create(testId, questionData)
      const { data } = response
      return data
    },

    async updateQuestion(testId: number, questionId: number, questionData: QuestionInterface) {
      const response = await questionServices.update(testId, questionId, questionData)
      const { data } = response
      return data
    },

    async destroyQuestion(testId: number, questionId: number) {
      const response = await questionServices.destroy(testId, questionId)
      const { data } = response
      return data
    },
  },
})
