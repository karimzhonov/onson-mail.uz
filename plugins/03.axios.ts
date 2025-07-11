import axios, { type AxiosInstance } from 'axios'
import { token } from '~/composables'


export default defineNuxtPlugin(() => {
  const {public: { NUXT_APP_BACKEND_HOST }} = useRuntimeConfig();

  const instance = axios.create({
    baseURL: NUXT_APP_BACKEND_HOST
  })

  instance.interceptors.request.use((config) => {
    if (token.value.access) {
      config.headers.Authorization = `Bearer ${token.value.access}`
    }
    return config
  })

  instance.interceptors.response.use(
    response => response,
    async (error) => {
      return Promise.reject(error)
    }
  )
  return {
    provide: {
      api: instance
    },
  };
})
