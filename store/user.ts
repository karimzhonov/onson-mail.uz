import { defineStore } from "pinia";
import { token } from "~/composables";
import type { User } from "~/types/user";

export const useUser = defineStore("user", {
    state: (): {user?: User} => ({}),
    actions: {
        isAuth() {
            return computed(() => token.value.access && this.user?.phone) 
        },
        logout() {
            token.value = {}
            window.location.href = useRequestURL().origin
        },
        login() {
            window.location.href = this.loginUrl()
        },
        loginUrl() {
            return `/login?next=${useRequestURL().href}`
        },
        redirect() {
            window.location.href = useLocalePath()('/')
        },
    }
})