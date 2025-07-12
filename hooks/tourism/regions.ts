import { useQuery } from "@tanstack/vue-query"
import type { LimitOffsetPagination } from "~/types"
import type { Country, Region } from "~/types/tourism/region"


export const useCountries = ({
    params
}: {
    params?: Ref<Record<string, any>>
} = {}) => {
    const {$api} = useNuxtApp()

    return useQuery({
        queryKey: computed(() => ['tourism_from_country', params?.value]),
        queryFn: async () => await $api.get<Country[]>('/tourism/country/',{
            params: params?.value
        }),
        select: (response) => response.data
    })
}


export const useRegions = ({params}: {params?: Ref<Record<string, any>>} = {}) => {
    const {$api} = useNuxtApp()

    return useQuery({
        queryKey: computed(() => ['tourism_regions', params?.value]),
        queryFn: async () => await $api.get<LimitOffsetPagination<Region>>(
            '/tourism/region/',{params: {limit: 100, ...params?.value}}
        ),
        select: (response) => response.data
    })
}