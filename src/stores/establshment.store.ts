/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */
/** Interfaces */
import type { EstablishmentInterface } from "@/interfaces/establishment.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import establishmentServices from '@/services/establishment.services'
export const establishmentStore = defineStore('establishment', {

  state: () => {
    return {
      establishments: [] as EstablishmentInterface[],
      establishment: null as EstablishmentInterface | null,
      meta: {} as MetaInterface,
    }
  },

  actions: {
    /**
     * Obtención de establecimientos
     * */
    async getEstablishments(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const response = await establishmentServices.index(page, pageSize, searchBy)
      const { establishments, meta } = response.data
      this.establishments = establishments
      this.meta = meta
      return establishments
    },

    /**
    * Obtención de establecimiento por ID
    * */
    async getEstablishment(establishmentId: number = 1) {
      const response = await establishmentServices.show(establishmentId)
      const { data } = response
      this.establishment = data
      return data
    },

    /**
    * Creación de establecimiento
    * */
    async createEstablishment(establishmentData: EstablishmentInterface) {
      const response = await establishmentServices.create(establishmentData)
      const { data } = response
      return data
    },

    /**
    * Actualización de establecimiento por ID
    * */
    async updateEstablishment(establishmentId: number, establishmentData: EstablishmentInterface) {
      const response = await establishmentServices.update(establishmentId, establishmentData)
      const { data } = response
      return data
    },
  },
})
