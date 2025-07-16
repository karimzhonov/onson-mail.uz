import { useQuery } from "@tanstack/vue-query"
import { token } from "~/composables"
import type { User } from "~/types/user"


export const useGetMe = ({select}: {select: (user: User) => User}) => {
    const { $api } = useNuxtApp()

    return useQuery({
        queryKey: computed(() => ['user_me', token.value]),
        queryFn: async () => await $api.get("/oauth/me/", {}),
        select: (response) => {
            return select(response.data)
        }
    })
}