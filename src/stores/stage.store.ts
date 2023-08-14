/** External dependencies */
import { defineStore } from 'pinia'
import { computed } from "vue";

/** Internal dependencies */
/** Interfaces */
import type { StageInterface } from "@/interfaces/stage.interface"
import type { MetaInterface } from "@/interfaces/meta.interface"

/** Services */
import StageServices from '@/services/stage.services'

export const stageStore = defineStore('stage', {

  state: () => ({
    stages: [] as StageInterface[],
    stage: null as StageInterface | null,
    meta: {} as MetaInterface,
  }),

  actions: {
    /**
     * Obtención de etapa
     **/
    async getStages(flowId:number, page: number = 1, pageSize: number = 10, searchBy: any = {}) {
      const response = await StageServices.index(flowId, page, pageSize, searchBy)
      const { stages, meta } = response.data
      this.stages = stages
      this.meta = meta
      return stages
    },

    /**
    * Obtención de etapas por ID 
    * */
    async getStage(flowId: number,stageId: number = 1) {
      const response = await StageServices.show(flowId,stageId)
      const { data } = response
      this.stage = data
      return data
    },

    /**
    * Creación de etapa
    * */
    async createStage(flowId:number ,stageData: StageInterface) {
      const response = await StageServices.create(flowId,stageData)
      const { data } = response
      return data
    },

    /**
    * Actualizar stage por ID
    * */

    async updateStage(flowId:number, stageId: number, stageData: StageInterface) {
      const response = await StageServices.update(flowId,stageId, stageData)
      const { data } = response
      return data
    },


    /**
    * Eliminar stage por ID
    * */
    async destroyStage(flowId:number, stageId: number) {
      const response = await StageServices.destroy(flowId, stageId)
      const { data } = response
      return data
    },
  },
})
