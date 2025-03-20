<template>
    <Loading :loading="loading">
        <div v-if="orders.length > 0" class="grid grid-cols-12 gap-4">
            <OrderCard v-for="order in orders" :data="order" :key="order.id" @click="open = true; selected = order" />
        </div>
        <div v-else class="h-screen flex items-center flex-col pt-4">
            <h2 class="text-xl text-center italic">{{ $t('Доставка еще не осуществлена, пока нет данных.') }}</h2>
        </div>
    </Loading>
    <IDialog v-model="open">
        <template #header>
            <Badge class="mb-3">#{{ selected.number }}</Badge>
        </template>
        <OrderView v-if="selected.id" :data="selected" />
    </IDialog>
</template>
<script>
export default {
    props: ['completed'],
    data() {
        return {
            open: false,
            loading: true,
            orders: [],
            selected: {}
        }
    },
    async mounted() {
        await this.fetch_data()
    },
    methods: {
        async fetch_data() {
            this.loading = true
            const params = {}
            params.status_sql = this.completed ? 'process_received_datetime' : [
                "create_time", "departure_datetime",
                "enter_uzb_datetime", "process_customs_datetime",
                "process_local_datetime"
            ].join(',')
            const { data } = await this.$api.get('/cargo/order/order/', { params })
            this.orders = data
            this.loading = false
        }
    }
}
</script>