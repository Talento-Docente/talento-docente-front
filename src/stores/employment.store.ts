/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */
/** Interfaces */
import type { EmploymentInterface } from "@/interfaces/employment.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import employmentServices from '@/services/employment.services'
export const employmentStore = defineStore('employment', {

  state: () => {
    return {
      employments: [] as EmploymentInterface[],
      employment: null as EmploymentInterface | null,
      meta: {} as MetaInterface,
    }
  },

  actions: {
    async getEmployments(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const response = await employmentServices.index(page, pageSize, searchBy)
      const { employments, meta } = response.data
      this.employments = employments
      this.meta = meta
      return employments
    },

    async getEmployment(employmentId: number = 1) {
      const response = await employmentServices.show(employmentId)
      const { data } = response
      this.employment = data
      return data
    },

    async createEmployment(employmentData: EmploymentInterface) {
      const response = await employmentServices.create(employmentData)
      const { data } = response
      return data
    },

    async updateEmployment(employmentId: number, employmentData: EmploymentInterface) {
      const response = await employmentServices.update(employmentId, employmentData)
      const { data } = response
      return data
    },

    async destroyEmployment(employmentId: number) {
      const response = await employmentServices.destroy(employmentId)
      const { data } = response
      return data
    },
  },
})
