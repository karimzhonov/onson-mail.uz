<template>
    <div class="w-full h-full grid grid-cols-12 gap-4">
        <div class="col-span-3 hidden lg:block">
            <TourismHotelFilters :params=params />
        </div>
        <div class="lg:col-span-9 col-span-12">
            <div class="flex justify-between items-center w-full">
                <h1 class="text-xl md:text-2xl font-bold">{{ $t('Отели') }}</h1>
                <Button text @click="paramsOpen = !paramsOpen" class="lg:hidden">
                    <ListFilterPlus />
                    {{ $t('Фильтры') }}
                </Button>
            </div>
            <Loading :loading="isFetching">
                <DataView lazy :value="data?.results" :layout="'list'" data-key="id" class="rounded-xl">
                    <template #list="slotProps">
                        <div class="grid grid-cols-12 gap-2">
                            <TourismHotelListItem class="col-span-12 md:col-span-6 xl:col-span-4" v-for="(item, index) in slotProps.items" :key="index" :item="item" />
                        </div>
                    </template>
                    <template #empty>
                        <div class="w-full mt-3 relative py-4 md:py-5 px-3 md:px4 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200"
                            :class="{ 'h-screen': isFetching }">
                            <div class="absolute right-0 top-0 h-full w-full flex justify-end">
                                <span class="flex opacity-20">
                                    <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
                                    <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
                                </span>
                            </div>

                            <div class="absolute left-0 bottom-0 h-full w-full flex items-end">
                                <span class="flex opacity-20">
                                    <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
                                    <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
                                </span>
                            </div>
                            <div class="flex flex-col items-center justify-center h-[300px]">
                                <div class="border-2 rounded-full p-5 mb-3">
                                    <FunnelX />
                                </div>
                                <p>{{ $t('Ничего не найдено') }}</p>
                            </div>
                        </div>
                    </template>
                </DataView>
            </Loading>
            <Paginator :total-records="data?.count" :rows="params.limit" @page="onPage"></Paginator>
        </div>
    </div>
    <Drawer position="left" class="!w-screen" :header="$t('Фильтры')" v-model:visible="paramsOpen">
        <TourismHotelFilters :params=params />
    </Drawer>
</template>
<script lang="ts" setup>
import { FunnelX, ListFilterPlus } from 'lucide-vue-next';
import type { PageState } from 'primevue/paginator';
import { useHotels } from '~/hooks/tourism/hotel';

definePageMeta({
    layout: 'turism'
})

const route = useRoute()
const paramsOpen = ref(false)

const params = computed(() => ({
    limit: 30,
    offset: 0,
    ...route.query
}))

const onPage = ({first, rows}: PageState) => {
    const query = JSON.parse(JSON.stringify(params.value))
    query.limit = rows
    query.offset = first
    const p = new URLSearchParams(query)
    navigateTo(useLocalePath()(`/tourism/hotel?${p.toString()}`))
}

const { data, isFetching } = useHotels({ params })
</script>