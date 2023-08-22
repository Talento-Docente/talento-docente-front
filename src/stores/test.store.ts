/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */
/** Interfaces */
import type { TestInterface } from "@/interfaces/test.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import testServices from '@/services/test.services'
import { authStore } from "@/stores/auth.store";
export const testStore = defineStore('test', {

  state: () => {
    return {
      tests: [] as TestInterface[],
      test: null as TestInterface | null,
      meta: {} as MetaInterface,
    }
  },

  actions: {
    async getTests(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await testServices.index(establishmentId, page, pageSize, searchBy)
      const { tests, meta } = response.data
      this.tests = tests
      this.meta = meta
      return tests
    },

    async getTest(testId: number = 1) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await testServices.show(establishmentId, testId)
      const { data } = response
      this.test = data
      return data
    },

    async createTest(testData: TestInterface) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await testServices.create(establishmentId, testData)
      const { data } = response
      return data
    },

    async updateTest(testId: number, testData: TestInterface) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await testServices.update(establishmentId, testId, testData)
      const { data } = response
      return data
    },

    async destroyTest(testId: number) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await testServices.destroy(establishmentId, testId)
      const { data } = response
      return data
    },
  },
})
