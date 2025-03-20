<template>
    <Loading :loading="loading">
        <h1 class="text-xl font-bold">{{ $t('Доставление заказы') }}</h1>
        <div class="grid grid-cols-12 gap-4">
            <PassportCard class="col-span-12 md:col-span-6 lg:col-span-5 h-full" v-for="item in items" :key="item.id" :data="item" @click="selected=item; open=true" />
            <div @click="open=true, selected={}" class="cursor-pointer aspect-[3/2] col-span-12 md:col-span-6 lg:col-span-5 rounded-xl bg-white flex justify-center items-center">
                <CirclePlus size="70" color="#ccc"/>
            </div>
        </div>
    </Loading>
    <IDialog v-model="open">
        <template #header>
            {{ selected.id ? selected.fio : $t('Добавить паспорт') }}
        </template>
        <PassportView v-if="open" :data="selected" />
    </IDialog>
</template>
<script>
import {CirclePlus} from "lucide-vue-next"

export default {
    name: 'Passport',
    components: {CirclePlus},
    data() {
        return {
            open: false,
            loading: true,
            items: [],
            selected: {},
        }
    },
    async mounted() {
        await this.fetch_data()
    },
    methods: {
        async fetch_data() {
            this.loading = true
            const { data } = await this.$api.get('/cargo/client/client/')
            this.items = data        
            this.loading = false
        }
    }
}
</script>