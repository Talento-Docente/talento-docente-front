/** External dependencies */
import { defineStore } from 'pinia'
import { useStorage } from "vue3-storage"

/** Internal dependencies */
/** Constants */
import { AUTH_KEY } from '@/constants/auth.constants'

/** Services */
import authServices from '@/services/auth.services'

/** Interfaces */
import type { userInterface } from "@/interfaces/user.interface";

export const authStore = defineStore('auth', {

  state: () => ({
    isAuthenticated: false,
    user: null as userInterface | null,
    token: null as string | null,
  }),

  // getters: {
  //   isAuthenticated: (state) => state.isAuthenticated,
  //   user: (state) => state.user,
  // },

  actions: {
    clearStore () {
      this.isAuthenticated = false
      this.user = null
      this.token = null
    },

    login(email: string, password: string) {
      return new Promise((resolve, reject) => {
        authServices
          .login({ email, password })
          .then((response) => {
            const { data } = response
            console.log({ response })

            this.user = data
            this.isAuthenticated = true
            this.token = response.headers[`${AUTH_KEY}`]

            /** Save token */
            const storage = useStorage()
            storage.setStorageSync(AUTH_KEY, this.token)

            resolve(data)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },

    logout() {
      return new Promise((resolve, reject) => {
        authServices
          .logout()
          .then(({ data }: { data: any }) => {
            /** Remover vue local storage */
            const storage = useStorage()
            storage.clearStorageSync()

            /** Remover local storage */
            localStorage.clear()

            /** Limpiar toda la store */
            this.clearStore()
            resolve(data)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },

    getProfile() {
      return new Promise((resolve, reject) => {
        authServices
          .profile()
          .then(({ data }: { data: any }) => {
            console.log({ data })
            resolve(data)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },

  },
})
