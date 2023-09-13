/** External dependencies */
import { defineStore } from 'pinia'
import { computed } from "vue";

/** Internal dependencies */
/** Interfaces */
import type { SkillInterface, MySkillInterface } from "@/interfaces/skill.interface"

/** Services */
import SkillServices from '@/services/skill.services'

export const skillStore = defineStore('skill', {

  state: () => ({
    skills: [] as SkillInterface[]
  }),

  actions: {
    /*** Obtención de habilidades * */

    async getSkills() {
      const response = await SkillServices.index()
      const {data} = response
      this.skills = data.skills
      return this.skills
    },

    /*** Creación de habilidades* */
  
    async createSkill(skillData: MySkillInterface) {
      const response = await SkillServices.create(skillData)
      const { data } = response
      return data
    },

  },
})
