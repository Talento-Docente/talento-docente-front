/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */
/** Interfaces */
import type { PostulationInterface } from "@/interfaces/postulation.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import PostulationServices from '@/services/postulation.services'
import { authStore } from "@/stores/auth.store";

/** Constants */
import { ROLE_APPLICANT } from '@/constants/user.constants'

export const postulationStore = defineStore('postulation', {

  state: () => ({
    postulations: [] as PostulationInterface[],
    postulation: null as PostulationInterface | null,
    meta: {} as MetaInterface,
  }),

  actions: {
    /**
     * Obtención de flujo
     * */
    async getPostulations(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const establishmentId = null
      if (authStore().role != ROLE_APPLICANT) {
        const establishmentId: number | null = authStore().selectedEstablishmentId
        if (establishmentId === null) {
          throw Error('Establecimiento no seleccionado')
        }
      }
      const response = await PostulationServices.index(establishmentId, page, pageSize, searchBy)
      const { postulations, meta } = response.data
      this.postulations = postulations
      this.meta = meta
      return postulations
    },

    /**
    * Obtención de flujos por ID
    * */
    async getPostulation(postulationId: number = 1) {
      const establishmentId = null
      if (authStore().role != ROLE_APPLICANT) {
        const establishmentId: number | null = authStore().selectedEstablishmentId
        if (establishmentId === null) {
          throw Error('Establecimiento no seleccionado')
        }
      }
      const response = await PostulationServices.show(establishmentId, postulationId)
      const { data } = response
      this.postulation = data
      return data
    },

    /**
    * Creación de flujo
    * */
    async createPostulation(postulationData: PostulationInterface) {
      const establishmentId = null
      if (authStore().role != ROLE_APPLICANT) {
        const establishmentId: number | null = authStore().selectedEstablishmentId
        if (establishmentId === null) {
          throw Error('Establecimiento no seleccionado')
        }
      }
      const response = await PostulationServices.create(establishmentId, postulationData)
      const { data } = response
      return data
    },

    /**
    * Actualizar postulation por ID
    * */

    async updatePostulation(postulationId: number, postulationData: PostulationInterface) {
      const establishmentId = null
      if (authStore().role != ROLE_APPLICANT) {
        const establishmentId: number | null = authStore().selectedEstablishmentId
        if (establishmentId === null) {
          throw Error('Establecimiento no seleccionado')
        }
      }
      const response = await PostulationServices.update(establishmentId, postulationId, postulationData)
      const { data } = response
      return data
    },


    /**
    * Eliminar postulation por ID
    * */
    async destroyPostulation(postulationId: number) {
      const establishmentId = null
      if (authStore().role != ROLE_APPLICANT) {
        const establishmentId: number | null = authStore().selectedEstablishmentId
        if (establishmentId === null) {
          throw Error('Establecimiento no seleccionado')
        }
      }
      const response = await PostulationServices.destroy(establishmentId, postulationId)
      const { data } = response
      return data
    },
  },
})
