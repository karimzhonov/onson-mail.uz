import { useMutation, useQuery } from "@tanstack/vue-query"
import type { LimitOffsetPagination } from "~/types"
import type { Hotel, HotelRoomCalendar, HotelType } from "~/types/tourism/hotel"


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

export const useHotel = ({id, select}: {id: number | string, select?: (data: Hotel) => Hotel}) => {
    const {$api} = useNuxtApp()
    return useQuery({
        queryKey: ['tourism-hotel', id],
        queryFn: async () => await $api.get<Hotel>(
            `/tourism/hotel/hotel/${id}/`,
        ),
        select: (response) => select ? select(response.data) : response.data
    })
}

export const useHotelRoomCalendar = ({id}: {id: number | string}) => {
    return useQuery({
        queryKey: ['tourism-hotel-room', id],
        queryFn: async (): Promise<HotelRoomCalendar[]> => [],
        select: (response) => {
            const data: Record<string, Record<number, number>> = {}
            for (const room of response) {
                if (!data[room.date]) data[room.date] = {}
                data[room.date][room.room] = room.value
            }
            return data
        }
    })
}

export const useChangeHotelRoomCalendar = ({id}: {id: number | string}) => {
    return useMutation({
        mutationKey: ['tourism_hotel_room'],
        mutationFn: async ({values}: {values: HotelRoomCalendar}) => {
            console.log(values);
        }
    })
}