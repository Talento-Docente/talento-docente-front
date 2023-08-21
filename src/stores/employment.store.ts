/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */

/** Store */
import { authStore } from '@/stores/auth.store'

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
    clearStore () {
      this.employments = [] as EmploymentInterface[]
      this.meta = {} as MetaInterface
    },

    async getEmployments(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await employmentServices.index(establishmentId, page, pageSize, searchBy)
      const { employments, meta } = response.data
      this.employments = employments
      this.meta = meta
      return employments
    },

    async getEmployment(employmentId: number = 1) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await employmentServices.show(establishmentId, employmentId)
      const { data } = response
      this.employment = data
      return data
    },

    async createEmployment(employmentData: EmploymentInterface) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await employmentServices.create(establishmentId, employmentData)
      const { data } = response
      return data
    },

    async updateEmployment(employmentId: number, employmentData: EmploymentInterface) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await employmentServices.update(establishmentId, employmentId, employmentData)
      const { data } = response
      return data
    },

    async destroyEmployment(employmentId: number) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await employmentServices.destroy(establishmentId, employmentId)
      const { data } = response
      return data
    },
  },
})
