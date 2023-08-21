/** External dependencies */
import { defineStore } from 'pinia'

/** Internal dependencies */
/** Interfaces */
import type { SendRegisterInterface } from "@/interfaces/register.interface";

/** Services */
import onboardingServices from '@/services/onboarding.services'

export const onboardingStore = defineStore('onboarding', {

  state: () => {
    return {}
  },

  actions: {
    async validateUserEmail(email: string) {
      const response = await onboardingServices.validateUserEmail(email)
      const { status, message } = response.data
      return { status, message }
    },

    async validateUserDni(dni: string) {
      const response = await onboardingServices.validateUserDni(dni)
      const { status, message } = response.data
      return { status, message }
    },

    async validateEstablishmentDni(dni: string) {
      const response = await onboardingServices.validateEstablishmentDni(dni)
      const { status, message } = response.data
      return { status, message }
    },

    async register(data: SendRegisterInterface) {
      const response = await onboardingServices.register(data)
      const { status, message } = response.data
      return { status, message }
    }
  },
})
