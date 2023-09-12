/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */
/** Interfaces */
import type { AcademicTrainingInterface } from "@/interfaces/academic_training.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import AcademicTrainingServices from '@/services/academic_training.services'
import { authStore } from "@/stores/auth.store";

export const academicTrainingStore = defineStore('academicTraining', {

  state: () => ({
    academicTrainings: [] as AcademicTrainingInterface[],
    academicTraining: null as AcademicTrainingInterface | null,
    meta: {} as MetaInterface,
  }),

  actions: {
    async getAcademicTrainings(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await AcademicTrainingServices.index(page, pageSize, searchBy)
      const { academicTrainings, meta } = response.data
      this.academicTrainings = academicTrainings
      this.meta = meta
      return academicTrainings
    },

    async getAcademicTraining(academicTrainingId: number = 1) {
      const response = await AcademicTrainingServices.show(academicTrainingId)
      const { data } = response
      this.academicTraining = data
      return data
    },

    async createAcademicTraining(academicTrainingData: AcademicTrainingInterface) {
      const response = await AcademicTrainingServices.create(academicTrainingData)
      const { data } = response
      return data
    },

    async updateAcademicTraining(academicTrainingId: number, academicTrainingData: AcademicTrainingInterface) {
      const response = await AcademicTrainingServices.update(academicTrainingId, academicTrainingData)
      const { data } = response
      return data
    },


    async destroyAcademicTraining(academicTrainingId: number) {
      const response = await AcademicTrainingServices.destroy(academicTrainingId)
      const { data } = response
      return data
    },
  },
})
