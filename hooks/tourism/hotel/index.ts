import { useQuery } from "@tanstack/vue-query"
import type { LimitOffsetPagination } from "~/types"
import type { Hotel, HotelType } from "~/types/tourism/hotel"


export const useHotelType = () => {
    const {$api} = useNuxtApp()

    return useQuery({
        queryKey: ['tourism-hotel-type'],
        queryFn: async () => await $api.get<HotelType[]>(
            '/tourism/hotel/hotel-type/'
        ),
        select: (response) => response.data
    })   
}

export const useHotels = ({params}: {params?: Ref<Record<string, any>>} = {}) => {
    const {$api} = useNuxtApp()

    return useQuery({
        queryKey: computed(() => ['tourism-hotel', params?.value]),
        queryFn: async () => await $api.get<LimitOffsetPagination<Hotel>>(
            '/tourism/hotel/hotel/', {params: {limit: 100, ...params?.value}}
        ),
        select: (response) => response.data
    })    
}