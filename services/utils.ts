import type { Api } from "~/plugins/03.axios"

export class ReadOnlyService {
    protected readonly $api: Api
    protected readonly baseUrl: string

    constructor(baseUrl: string) {
        this.$api = useNuxtApp().$api
        this.baseUrl = baseUrl
    }

    protected getUrl(url_params: Record<string, string | number | undefined> = {}): string {
        let url = this.baseUrl
        for (const [key, value] of Object.entries(url_params)) {
            url = url.replace(`{${key}}`, `${value}`)
        }
        if (url.endsWith('/')) {
            url = url.slice(0, -1)
        }       
        return url
    }

    async list<T = any>(params: any | null = null, url_params: Record<string, string | number | undefined> = {}): Promise<T> {
        const response = await this.$api.get(`${this.getUrl(url_params)}/`, {params})
        return response.data
    }

    async get<T = any>(id: number | string, params: any | null = null, url_params: Record<string, string | number> = {}): Promise<T> {
        const response = await this.$api.get(`${this.getUrl(url_params)}/${id}/`, {params})
        return response.data
    }
}


export class CRUDService extends ReadOnlyService {
    async create<D = any, T = any>(data: D, params: any | null = null, url_params: Record<string, string | number> = {}): Promise<T> {
        const response = await this.$api.post(`${this.getUrl(url_params)}/`, data, {params})
        return response.data
    }

    async update<D = any, T = any>(id: number | string, data: D, params: any | null = null, url_params: Record<string, string | number> = {}): Promise<T> {
        const url = this.getUrl(url_params)
        const response = await this.$api.patch(`${url}/${id}/`, data, {params})
        return response.data
    }

    async delete<T = any>(id: number | string, params: any | null = null, url_params: Record<string, string | number> = {}): Promise<T> {
        const url = this.getUrl(url_params)
        const response = await this.$api.delete(`${url}/${id}/`, {params})
        return response.data
    }
}
