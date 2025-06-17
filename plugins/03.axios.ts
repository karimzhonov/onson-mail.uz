import axios, { type AxiosResponse, type AxiosRequestConfig, type AxiosError, type AxiosInstance } from "axios";
import { token } from "~/composables";
import { useUser } from "~/store/user";


export class Api {
  private readonly api: AxiosInstance

  constructor() {
    const {public: { NUXT_APP_BACKEND_HOST }} = useRuntimeConfig();
    this.api = axios.create({baseURL: NUXT_APP_BACKEND_HOST});
  }

  async request<D = any, R = any>(
    method: string,
    url: string,
    data: D | null,
    config: AxiosRequestConfig = {},
    redirect: boolean = true
  ): Promise<AxiosResponse<R>> {
    config.url = url;
    config.method = method;
    config.data = data;
    config.headers = {
      Authorization: `Bearer ${token.value.access}`,
    }
    const toast = useNuxtApp().vueApp.config.globalProperties.$toast
    try {
      const response = await this.api.request(config);
      return response
    } catch (e: unknown) {
      const error = e as AxiosError<R>
      if (error.response?.status == 401) {
        if (token.value.refresh) {
          const { data, status } = await this.api.post("/oauth/refresh/", {
            refresh: token.value.refresh,
          });
          console.log(status, data);
          
          if (status === 200) {
            token.value = data
            return await this.request(method, url, config.data, config, redirect)
          } else {
            useUser().login()
          }
        }
        if (redirect) {
          useUser().login()
          return error.response
        }
      } else if (error.response?.status == 422) {
        const message = Object.values(error.response?.data ?? {}).map((v: any) => {
          return v.map((vv: any) => vv.msg).join(', ')
        }).join('. ')
        toast.add({severity: 'error', summary: message, life: 2000})
        throw e
      }
      const message = Object.values(error.response?.data ?? {}).map((v: any) => typeof v === 'string' ? v : v.join('. ')).join('. ')
      toast.add({severity: 'error', summary: message, life: 2000})
      throw e
    }
  }

  async get<T = any>(url: string, config: AxiosRequestConfig = {}, redirect: boolean=true): Promise<AxiosResponse<T>> {
    return await this.request<any, T>('get', url, null, config, redirect)
  }
  async post<D = any, R = any>(url: string, data: D, config: AxiosRequestConfig = {}): Promise<AxiosResponse<R>> {
    return await this.request<D, R>('post', url, data, config, true)
  }
  async patch<D = any, R = any>(url: string, data: D, config: AxiosRequestConfig = {}): Promise<AxiosResponse<R>> {
    return await this.request<D, R>('patch', url, data, config, true)
  }
  async delete<D = any, R = any>(url: string, data: D, config: AxiosRequestConfig = {}): Promise<AxiosResponse<R>> {
    return await this.request<D, R>('delete', url, data, config, true)
  }
}


export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: new Api()
    },
  };
})
