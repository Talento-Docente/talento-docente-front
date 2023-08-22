/** External dependencies */
import { defineStore } from 'pinia'
import { computed } from "vue";

/** Internal dependencies */
/** Interfaces */
import type { FlowInterface } from "@/interfaces/flow.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import FlowServices from '@/services/flow.services'
import { authStore } from "@/stores/auth.store";

export const flowStore = defineStore('flow', {

  state: () => ({
    flows: [] as FlowInterface[],
    flow: null as FlowInterface | null,
    meta: {} as MetaInterface,
  }),

  actions: {
    /**
     * Obtención de flujo
     * */
    async getFlows(page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await FlowServices.index(establishmentId, page, pageSize, searchBy)
      const { flows, meta } = response.data
      this.flows = flows
      this.meta = meta
      return flows
    },

    /**
    * Obtención de flujos por ID
    * */
    async getFlow(flowId: number = 1) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await FlowServices.show(establishmentId, flowId)
      const { data } = response
      this.flow = data
      return data
    },

    /**
    * Creación de flujo
    * */
    async createFlow(flowData: FlowInterface) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await FlowServices.create(establishmentId, flowData)
      const { data } = response
      return data
    },

    /**
    * Actualizar flow por ID
    * */

    async updateFlow(flowId: number, flowData: FlowInterface) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await FlowServices.update(establishmentId, flowId, flowData)
      const { data } = response
      return data
    },


    /**
    * Eliminar flow por ID
    * */
    async destroyFlow(flowId: number) {
      const establishmentId: number | null = authStore().selectedEstablishmentId
      if (establishmentId === null) {
        throw Error('Establecimiento no seleccionado')
      }
      const response = await FlowServices.destroy(establishmentId, flowId)
      const { data } = response
      return data
    },
  },
})
