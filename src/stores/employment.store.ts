/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */

/** Store */
import { authStore } from '@/stores/auth.store'

/** Interfaces */
import type { EmploymentInterface, EmploymentResumeInterface } from "@/interfaces/employment.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import employmentServices from '@/services/employment.services'
export const employmentStore = defineStore('employment', {

  state: () => {
    return {
      employments: [] as EmploymentInterface[],
      employment: null as EmploymentInterface | null,
      meta: {} as MetaInterface,
      resume: {
        created: 0,
        closed: 0,
        in_progress: 0,
      } as EmploymentResumeInterface
    }
  },

  actions: {
    clearStore () {
      this.employments = [] as EmploymentInterface[]
      this.meta = {} as MetaInterface
      this.resume = {
        created: 0,
        closed: 0,
        in_progress: 0,
      } as EmploymentResumeInterface
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

    async getResume() {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await employmentServices.resume(establishmentId)
      const { status, message, resume } = response.data
      console.log({ status, message, resume })
      this.resume = resume as EmploymentResumeInterface
      return { status, message, resume }
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
