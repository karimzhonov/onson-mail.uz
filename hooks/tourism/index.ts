import { useQuery } from "@tanstack/vue-query"
import type { Type } from "~/types/tourism"


export const useTypes = () => {
    const {$api} = useNuxtApp()
    
    return useQuery({
        queryKey: ['tourism_types'],
        queryFn: async () => await $api.get<Type[]>(
            '/tourism/type/'
        ),
        select: (response) => response.data
    })
}