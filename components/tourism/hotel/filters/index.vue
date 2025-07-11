<template>
    <div class="w-full h-full relative p-4 rounded-xl bg-gradient-to-tr from-gray-100 to-gray-200 ">
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
        <div class="relative">
            <h2 class="text-lg font-bold mb-8">{{ $t('Все фильтеры') }}</h2>
            <div class="flex flex-col gap-6">

                <TourismFiltersCountry v-model:model-value="filters.country" :icon="PlaneLanding" />
                <TourismFiltersRegion v-model:model-value="filters.region" :countries="filters.country" />
                <TourismHotelFiltersFood v-model:model-value="filters.food" />
                <TourismHotelFiltersRating v-model:model-value="filters.rating" />
                <TourismHotelFiltersType v-model:model-value="filters.type" />
                <TourismHotelFiltersRoom v-model:model-value="filters.room" />
                <TourismHotelFiltersService v-model:model-value="filters.service" />
            </div>
            <Button text @click="clear" fluid>{{ $t('Отменить') }}</Button>
            <div class="flex flex-col gap-2 mt-3 sticky bottom-5">
                <Button as="router-link" :to="search">{{ $t('Преминить') }}</Button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { PlaneLanding } from 'lucide-vue-next'
import { getArrayParam, getNumberParam, getStringArrayParam } from '~/shared/utils'

defineEmits<{
    (e: 'fetch', params: Record<string, any>): void
}>()

const route = useRoute()

const filters = ref<{
    country: number[]
    region: number[]
    rating?: number
    type: number[]
    food: string[]
    service: number[]
    room: number[]
}>({
    country: getArrayParam('country'),
    region: getArrayParam('region'),
    rating: getNumberParam('rating'),
    type: getArrayParam('type'),
    food: getStringArrayParam('food'),
    service: getArrayParam('service'),
    room: getArrayParam('country')
})

const clear = () => {
    filters.value = {
        country: [],
        region: [],
        type: [],
        food: [],
        service: [],
        room: [],
    }
}

const search = computed(() => {
    const params = new URLSearchParams({
        country: filters.value.country.toString(),
        region: filters.value.region.toString(),
        rating: filters.value.rating?.toString() ?? '',
        type: filters.value.type.toString(),
        food: filters.value.food.toString(),
        service: filters.value.service.toString(),
        room: filters.value.room.toString(),
    })
    return useLocalePath()(`/tourism/hotel?${params.toString()}`)
})
</script>