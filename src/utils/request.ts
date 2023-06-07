import axios, { type AxiosInstance } from 'axios'
import config from '@/config'
import { VueAxios } from './axios'
import { useStorage } from "vue3-storage"
import { authStore } from '@/stores/auth.store'

// Constants
import { AUTH_KEY } from '@/constants/auth.constants'

const service = axios.create({
  baseURL: config.urlApi,
  timeout: 30000
})

// const VALID_SERVICES = [
//   '/api/users/user/',
//   '/api/auth/login/'
// ]

const err = async (error: any) => {
  if (error.response
      && error.response.status === 401
      && error.request
      && (error.request.responseURL.indexOf('/api/users/user/') <= -1
          || error.request.responseURL.indexOf('/api/auth/login/') <= -1)
  ) {
    await authStore().logout()
    window.location.href = '/login'
  }
  return Promise.reject(error)
}

// request interceptor
// eslint-disable-next-line no-shadow
service.interceptors.request.use((config) => {
  const storage = useStorage()
  const key = storage.getStorageSync(AUTH_KEY)
  if (key) {
    config.headers['Authorization'] = `${key}`
  }
  return config
}, err)

service.interceptors.response.use((response) => {
  return response
}, err)

const installer = {
  vm: {},
  install(Vue: { use: (arg0: { vm: {}; installed: boolean; install(Vue: { axios: any; prototype: any }, instance: any): void }, arg1: AxiosInstance) => void }) {
    Vue.use(VueAxios, service)
  }
}

export { installer as VueAxios, service as axios }
