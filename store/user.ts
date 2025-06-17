import { defineStore } from "pinia";
import { token } from "~/composables";

export const useUser = defineStore("user", {
    state: () => ({user: {}}),
    actions: {
        async fetch_user() {
            const { $api } = useNuxtApp()
            const r = await $api.get("/oauth/me/", {}, false, false)
            this.user = r?.data
        },
        logout() {
            token.value.access = null
            token.value.refresh = null
            window.location.href = useRequestURL().origin
        },
        login() {
            window.location.href = this.loginUrl()
        },
        loginUrl() {
            return `https://auth.onson-mail.uz?next=${useRequestURL().href}`
        }
    }
})