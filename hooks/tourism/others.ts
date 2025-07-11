import { useQuery } from "@tanstack/vue-query"
import type { Service } from "~/types/tourism"

export const useServices = () => {
    const {$api} = useNuxtApp()

    return useQuery({
        queryKey: ['tourism-service'],
        queryFn: async () => await $api.get<Service[]>(
            '/tourism/service'
        ),
        select: (response) => response.data
    })
}