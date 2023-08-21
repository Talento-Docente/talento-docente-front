/** External dependencies */
import { defineStore } from 'pinia'
import { useStorage } from "vue3-storage"
import _ from 'lodash'

/** Internal dependencies */
/** Constants */
import { AUTH_KEY } from '@/constants/auth.constants'

/** Services */
import authServices from '@/services/auth.services'

/** Interfaces */
import type { UserInterface } from "@/interfaces/user.interface";
import type { PermissionInterface } from "@/interfaces/permission.interface"
import type { EstablishmentInterface } from "@/interfaces/establishment.interface"

export const authStore = defineStore('auth', {

  persist: {
    enabled: true
  },

  state: () => ({
    isAuthenticated: false,
    user: {} as UserInterface,
    registerUser: {} as UserInterface,
    token: null as string | null,
    permissions: [] as PermissionInterface[],
    selectedEstablishmentId: null as number | null,
    selectedEstablishment: {} as EstablishmentInterface,
    selectedPermission: {} as PermissionInterface,
  }),

  getters: {
    role: (state) => state.user ? state.user.role : null,
  },

  actions: {

    clearStore () {
      this.isAuthenticated = false
      this.user = {} as UserInterface
      this.registerUser = {} as UserInterface
      this.token = null
      this.selectedEstablishmentId = null
      this.selectedEstablishment = {} as EstablishmentInterface
      this.selectedPermission = {} as PermissionInterface
    },

    selectEstablishment(selectedEstablishmentId: number) {
      const foundPermission: PermissionInterface | undefined = _.find(this.permissions,  (permission: PermissionInterface) => {
        return permission.establishment_id === selectedEstablishmentId
      })
      if (foundPermission) {
        this.selectedPermission = foundPermission
        this.selectedEstablishment = foundPermission.establishment
      }
    },

    login(email: string, password: string) {
      return new Promise((resolve, reject) => {
        authServices
          .login({ email, password })
          .then((response) => {
            const { data } = response

            this.user = data.data
            this.permissions = this.user.permissions
            this.isAuthenticated = true
            this.token = response.headers[`${AUTH_KEY}`]

            if (this.selectedEstablishmentId === null && this.permissions.length > 0) {
              this.selectedEstablishmentId = this.permissions[0].establishment_id
              this.selectEstablishment(this.permissions[0].establishment_id)
            }

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
          .then((response: { data: any }) => {
            const { data } = response
            this.user = data.data
            this.permissions = this.user.permissions

            if (this.selectedEstablishmentId === null && this.permissions.length > 0) {
              this.selectedEstablishmentId = this.permissions[0].establishment_id
              this.selectEstablishment(this.permissions[0].establishment_id)
            }

            resolve(data)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },

  },
})
