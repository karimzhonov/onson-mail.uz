import { defineStore } from "pinia";


export default defineStore("loader", {
    state: () => ({
        logo: '/logo.png',
        loading: true
    }),
    actions: {
        set_loading(value: boolean) {
            this.loading = value
        }
    }
})