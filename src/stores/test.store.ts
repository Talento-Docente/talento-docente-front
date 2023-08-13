/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */
/** Interfaces */
import type { TestInterface } from "@/interfaces/test.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import testServices from '@/services/test.services'
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
      const response = await testServices.index(page, pageSize, searchBy)
      const { tests, meta } = response.data
      this.tests = tests
      this.meta = meta
      return tests
    },

    async getTest(testId: number = 1) {
      const response = await testServices.show(testId)
      const { data } = response
      this.test = data
      return data
    },

    async createTest(testData: TestInterface) {
      const response = await testServices.create(testData)
      const { data } = response
      return data
    },

    async updateTest(testId: number, testData: TestInterface) {
      const response = await testServices.update(testId, testData)
      const { data } = response
      return data
    },

    async destroyTest(testId: number) {
      const response = await testServices.destroy(testId)
      const { data } = response
      return data
    },
  },
})
