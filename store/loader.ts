import { defineStore } from "pinia";


interface State {
    logo: string
    loading: Ref<boolean>
    currentPhase : Ref<'initial' | 'logo-fade' | 'background-fade'>
}


export default defineStore("loader", {
    state: (): State => ({
        logo: '/logo.png',
        loading: ref(true),
        currentPhase: ref('initial')
    }),
    actions: {
        set_loading(value: boolean) {
            this.loading = value
        }
    }
})