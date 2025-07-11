import { useQuery } from "@tanstack/vue-query"
import type { Food } from "~/types/tourism"
import type { Room, Service } from "~/types/tourism/hotel"


export const useFoods = () => {
    const {$api} = useNuxtApp()

    return useQuery({
        queryKey: ['tourism-food'],
        queryFn: async () => await $api.get<Food[]>(
            '/tourism/food/'
        ),
        select: (response) => response.data
    })
}

export const useServices = () => {
    const {$api} = useNuxtApp()

    return useQuery({
        queryKey: ['tourism-service'],
        queryFn: async () => await $api.get<Service[]>(
            '/tourism/hotel/hotel-service/'
        ),
        select: (response) => response.data
    })
}

export const useRooms = () => {
    const {$api} = useNuxtApp()

    return useQuery({
        queryKey: ['tourism-rooms'],
        queryFn: async () => await $api.get<Room[]>(
            '/tourism/hotel/hotel-room/'
        ),
        select: (response) => response.data
    })
}