import { useMutation } from "@tanstack/vue-query";
import { token } from "~/composables";
import { useUser } from "~/store/user";


export const useAuth = () => {
    const user = useUser()
    const {$api} = useNuxtApp()

    return useMutation({
        mutationKey: ['login'],
        mutationFn: async ({ values }: {values: any}) => await $api.post(
            '/oauth/', values
        ),
        onSuccess: (response) => {
            token.value = response.data
            user.redirect()
        }
    })
}

export const useGoogleAuth = () => {
    const user = useUser()
    const {$api} = useNuxtApp()

    return useMutation({
        mutationKey: ['google_login'],
        mutationFn: async ({access_token}: {access_token: string}) => await await $api.post(
            '/oauth/google_auth/', 
            {access_token}
        ),
        onSuccess: (response) => {
            token.value = response.data
            user.redirect()
        }
    })
}

export const useTelegramAuth = () => {
    const user = useUser()
    const {$api} = useNuxtApp()

    return useMutation({
        mutationKey: ['telegram_login'],
        mutationFn: async ({values}: any) => await $api.post(
            '/oauth/telegram/', values
        ),
        onSuccess: (response) => {
            token.value = response.data
            user.redirect()
        }
    })
}