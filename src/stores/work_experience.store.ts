/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */
/** Interfaces */
import type { WorkExperiecnceInterface } from "@/interfaces/work_experience.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import WorkExperienceServices from '@/services/work_experience.services'
import { authStore } from "@/stores/auth.store";

export const workExperienceStore = defineStore('workExperience', {

  state: () => ({
    workExperiences: [] as WorkExperiecnceInterface[],
    workExperience: null as WorkExperiecnceInterface | null,
    meta: {} as MetaInterface,
  }),

  actions: {
    async getWorkExperiences(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await WorkExperienceServices.index(page, pageSize, searchBy)
      const { workExperiences, meta } = response.data
      this.workExperiences = workExperiences
      this.meta = meta
      return workExperiences
    },

    async getWorkExperience(workExperienceId: number = 1) {
      const response = await WorkExperienceServices.show(workExperienceId)
      const { data } = response
      this.workExperience = data
      return data
    },

    async createWorkExperience(workExperienceData: WorkExperiecnceInterface) {
      const response = await WorkExperienceServices.create(workExperienceData)
      const { data } = response
      return data
    },

    async updateWorkExperience(workExperienceId: number, workExperienceData: WorkExperiecnceInterface) {
      const response = await WorkExperienceServices.update(workExperienceId, workExperienceData)
      const { data } = response
      return data
    },


    async destroyWorkExperience(workExperienceId: number) {
      const response = await WorkExperienceServices.destroy(workExperienceId)
      const { data } = response
      return data
    },
  },
})
