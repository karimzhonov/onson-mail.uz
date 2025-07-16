<template>
    <div class="w-full relative py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200 ">
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
        <h1 class="text-center text-gray-800 pb-4 font-bold text-2xl lg:text-4xl">
            Ищете
            <span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">отдых мечты?</span>
            Найдём за вас!
        </h1>
        <div class="md:grid flex flex-col grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-3 mt-3 bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">
            <TourismFiltersCountry v-model:model-value="filters.from_country" label="Откуда" :icon="PlaneTakeoff" :params="{can_from: true}" />
            <TourismFiltersCountry v-model:model-value="filters.to_country" label="Куда" :icon="PlaneLanding" :params="{can_to: true}" />

            <FloatLabel class="w-full">
                <InputGroup>
                    <InputGroupAddon>
                        <CalendarDays />
                    </InputGroupAddon>
                    <DatePicker class="min-w-[200px] w-full" dateFormat="dd.mm.yy"
                        selectionMode="range":manualInput="false" 
                        v-model="filters.dates" fluid/>
                </InputGroup>
                <label for="positions" class="ml-10">{{$t('Дати тура')}}</label>
            </FloatLabel>
            <Button @click="go_to_search" type="submit" class="!hidden lg:!block">
                {{ $t('Поиск тура') }}
            </Button>
            <div v-if="full">
                <TourismHotelFiltersRating v-model:model-value="filters.hotel_rating" />
            </div>
            <div v-if="full">
                <TourismHotelFiltersType v-model:model-value="filters.hotel_type" />
            </div>
            <div v-if="full">
                <TourismHotelFiltersFood v-model:model-value="filters.food" />
            </div>
            <div v-if="full">
                <TourismTourFiltersService v-model:model-value="filters.services" />
            </div>
            <div v-if="full">
                <TourismFiltersRegion :countries="filters.to_country" v-model:model-value="filters.region" />
            </div>
            <div v-if="full" class="col-span-1 lg:col-span-2">
                <TourismTourFiltersHotel v-model:model-value="filters.hotel" :countries="filters.to_country" :regions="filters.region"/>
            </div>
            <div v-if="full">
                <TourismTourFiltersType v-model:model-value="filters.type" />
            </div>
            <Button @click="go_to_search" class="!block col-span-2 lg:!hidden">
                {{ $t('Поиск тура') }}
            </Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import {PlaneTakeoff, PlaneLanding, CalendarDays} from 'lucide-vue-next'
import { getArrayParam, getStringArrayParam } from '~/shared/utils';

defineProps<{
    full?: boolean
}>()

const route = useRoute()

const now = new Date()
const default_from_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
const default_to_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)

const filters = ref<{
    from_country: number[]
    to_country: number[]
    dates: Date[]
    region: number[]
    hotel_rating?: number
    hotel_type: number[]
    hotel: number[]
    food: string[]
    services: number[]
    type: number[]
}>({
    from_country: getArrayParam(route.query, 'from_country'),
    to_country: getArrayParam(route.query, 'to_country'),
    dates:[
        route.query.from_date ? new Date(route.query.from_date?.toString()) : default_from_date,
        route.query.to_date ? new Date(route.query.to_date?.toString()) : default_to_date
    ],
    region: getArrayParam(route.query, 'region'),
    hotel_type: getArrayParam(route.query, 'hotel_type'),
    hotel: getArrayParam(route.query, 'hotel'),
    food: getStringArrayParam(route.query, 'food'),
    services: getArrayParam(route.query, 'service'),
    type: getArrayParam(route.query, 'type'),
})

const go_to_search = () => {
    const params = new URLSearchParams({
        from_country: filters.value.from_country.toString(),
        to_country: filters.value.to_country.toString(),
        from_date: dayjs(filters.value.dates[0]).format('YYYY-MM-DD'),
        to_date: dayjs(filters.value.dates[1]).format('YYYY-MM-DD'),
        regions: filters.value.region.toString(),
        hotel_type: filters.value.hotel_type.toString(),
        hotel: filters.value.hotel.toString(),
        food: filters.value.food.toString(),
        services: filters.value.services.toString(),
        type: filters.value.type.toString()
    })
    return navigateTo(useLocalePath()(`/tourism/search?${params.toString()}`))
}
</script>