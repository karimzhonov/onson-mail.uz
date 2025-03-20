<template>
    <h1 class="text-xl font-bold">{{ $t('Доставление заказы') }}</h1>
    <OrderTable :completed="true"/>
    <IDialog v-if="order_id && open && order.id" v-model="open" @update:open="close">
        <template #header>
            <Badge class="mb-3">#{{ order.number }}</Badge>
        </template>
        <OrderView v-if="order.id" :data="order" />
    </IDialog>
</template>
<script>
export default {
    name: 'Order',
    data() {
        return {
            order: {},
            open: true,
        }
    },
    computed: {
        order_id() {
            return this.$route.query.id
        }
    },
    watch: {
        order_id(value) {
            if (value) this.fetch_order(value)
        }
    },
    async mounted() {
        if (this.order_id) {
            await this.fetch_order(this.order_id)
        }
    },
    methods: {
        close(v) {
            return !v ? this.$router.replace(useLocalePath()('/my/order')) : null
        },
        async fetch_order(id) {
            const {data} = await this.$api.get(`/cargo/order/order/${id}/`)
            this.order = data
        },
    }
}
</script>