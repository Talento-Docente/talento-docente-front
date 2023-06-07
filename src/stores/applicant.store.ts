/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */
/** Interfaces */
import type { ApplicantInterface } from "@/interfaces/applicant.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import applicantServices from '@/services/applicant.services'
export const applicantStore = defineStore('applicant', {

  state: () => {
    return {
      applicants: [] as ApplicantInterface[],
      applicant: null as ApplicantInterface | null,
      meta: {} as MetaInterface,
    }
  },

  actions: {
    async getApplicants(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const response = await applicantServices.index(page, pageSize, searchBy)
      const { applicants, meta } = response.data
      this.applicants = applicants
      this.meta = meta
      return applicants
    },

    async getApplicant(applicantId: number = 1) {
      const response = await applicantServices.show(applicantId)
      const { data } = response
      this.applicant = data
      return data
    },

    async createApplicant(applicantData: ApplicantInterface) {
      const response = await applicantServices.create(applicantData)
      const { data } = response
      return data
    },

    async updateApplicant(applicantId: number, applicantData: ApplicantInterface) {
      const response = await applicantServices.update(applicantId, applicantData)
      const { data } = response
      return data
    },
  },
})
