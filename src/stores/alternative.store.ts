/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */
/** Interfaces */
import type { AlternativeInterface } from "@/interfaces/alternative.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import alternativeServices from '@/services/alternative.services'
export const alternativeStore = defineStore('alternative', {

  state: () => {
    return {
      alternatives: [] as AlternativeInterface[],
      alternative: null as AlternativeInterface | null,
      meta: {} as MetaInterface,
    }
  },

  actions: {
    async getAlternatives(testId: number, questionId: number, page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const response = await alternativeServices.index(testId, questionId, page, pageSize, searchBy)
      const { alternatives, meta } = response.data
      this.alternatives = alternatives
      this.meta = meta
      return alternatives
    },

    async getAlternative(testId: number, questionId: number, alternativeId: number = 1) {
      const response = await alternativeServices.show(testId, questionId, alternativeId)
      const { data } = response
      this.alternative = data
      return data
    },

    async createAlternative(testId: number, questionId: number, alternativeData: AlternativeInterface) {
      const response = await alternativeServices.create(testId, questionId, alternativeData)
      const { data } = response
      return data
    },

    async updateAlternative(testId: number, questionId: number, alternativeId: number, alternativeData: AlternativeInterface) {
      const response = await alternativeServices.update(testId, questionId, alternativeId, alternativeData)
      const { data } = response
      return data
    },

    async destroyAlternative(testId: number, questionId: number, alternativeId: number) {
      const response = await alternativeServices.destroy(testId, questionId, alternativeId)
      const { data } = response
      return data
    },
  },
})
