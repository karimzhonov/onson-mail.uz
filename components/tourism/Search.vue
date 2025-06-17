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
        <Form v-slot="$form" method="post" @submit="go_to_search" :initial-values="filters" class="md:grid flex flex-col grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-3 mt-3 bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">
            <FloatLabel class="w-full">
                <InputGroup>
                    <InputGroupAddon>
                        <PlaneTakeoff />
                    </InputGroupAddon>
                    <MultiSelect display="chip" :loading="countriesFromLoading" filter name="from_country" 
                        :options="countriesFrom?.filter((v: Country) => !$form.to_country?.value.includes(v.id))" option-value="id" 
                        :optionLabel="(v: Country) => v[`name_${$i18n.locale}`] ?? v.name" 
                        fluid :disabled="countriesFromLoading"
                    />
                </InputGroup>
                <label for="positions" class="ml-10">{{$t('Откуда')}}</label>
            </FloatLabel>
            <FloatLabel class="w-full">
                <InputGroup>
                    <InputGroupAddon>
                        <PlaneLanding />
                    </InputGroupAddon>
                    <MultiSelect display="chip" :loading="countriesToLoading" filter name="to_country" :options="countriesTo?.filter((v: Country) => !$form.from_country?.value.includes(v.id))" option-value="id" :optionLabel="(v: Country) => v[`name_${$i18n.locale}`] ?? v.name" fluid :disabled="countriesToLoading"/>
                </InputGroup>
                <label for="positions" class="ml-10">{{$t('Куда')}}</label>
            </FloatLabel>

            <FloatLabel class="w-full">
                <InputGroup>
                    <InputGroupAddon>
                        <CalendarDays />
                    </InputGroupAddon>
                    <DatePicker class="min-w-[200px] w-full" dateFormat="dd.mm.yy"
                        selectionMode="range":manualInput="false" 
                        v-model="filters.dates" fluid
                        :default-value="filters.dates"/>
                </InputGroup>
                <label for="positions" class="ml-10">{{$t('Даты тура')}}</label>
            </FloatLabel>
            <Button type="submit" class="!hidden lg:!block">
                {{ $t('Поиск тура') }}
            </Button>
            <div v-if="full">
                <TourismTourFiltersHotelRating />
            </div>
            <div v-if="full">
                <TourismTourFiltersHotelType />
            </div>
            <div v-if="full">
                <TourismTourFiltersFood />
            </div>
            <div v-if="full">
                <TourismTourFiltersService />
            </div>
            <div v-if="full">
                <TourismTourFiltersRegion :key="$form.to_country?.value" :countries="$form.to_country?.value" />
            </div>
            <div v-if="full" class="col-span-1 lg:col-span-2">
                <TourismTourFiltersHotel :key="$form.to_country?.value" :countries="$form.to_country?.value"/>
            </div>
            <div v-if="full">
                <TourismTourFiltersType />
            </div>
            <Button type="submit" class="!block col-span-2 lg:!hidden">
                {{ $t('Поиск тура') }}
            </Button>
        </Form>
    </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import {useQuery} from '@tanstack/vue-query'
import {PlaneTakeoff, PlaneLanding, CalendarDays} from 'lucide-vue-next'
import TourismService from '~/services/tourism'
import type { Country } from '~/types/tourism'

defineProps<{
    full?: boolean
}>()

const route = useRoute()
const tourismService = new TourismService()

const filters = computed<{
    from_country: string[],
    to_country: string[],
    dates: Date[]
}>(() => {
    let data: any
    try {
        data = {
            from_country: route.query.from_country ? route.query.from_country?.toString().split(',').map(parseInt) : [],
            to_country: route.query.to_country ? route.query.to_country?.toString().split(',').map(parseInt) : [],
            from_date: null,
            to_date: null
        }
    } catch {
        data = {
            from_country: [],
            to_country: [],
            from_date: null,
            to_date: null
        }
    }
    
    const now = new Date()
    const default_from_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const default_to_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)

    try {
        data.dates = [
            route.query.from_date ? new Date(route.query.from_date?.toString()) : default_from_date,
            route.query.to_date ? new Date(route.query.to_date?.toString()) : default_to_date
        ]
    } catch {
        data.dates = [
            default_from_date,
            default_to_date
        ]
    }
    return data
})

const {data: countriesFrom, isFetching: countriesFromLoading} = useQuery({
    queryKey: ['tourism_from_country'],
    queryFn: async () => await tourismService.country.list<Country[]>({can_from: true})
})

const {data: countriesTo, isFetching: countriesToLoading} = useQuery({
    queryKey: ['tourism_to_country'],
    queryFn: async () => await tourismService.country.list<Country[]>({can_to: true})
})

const go_to_search = ({values}: {values: any}) => {
    const params = new URLSearchParams(JSON.parse(JSON.stringify(route.query)))
    values.from_country.length > 0 ? params.set('from_country', values.from_country.toString()) : params.set('from_country', '')
    values.to_country.length > 0 ? params.set('to_country', values.to_country.toString()) : params.set('to_country', '')
    
    params.set('from_date', dayjs(filters.value.dates[0]).format('YYYY-MM-DD'))
    params.set('to_date', dayjs(filters.value.dates[1]).format('YYYY-MM-DD'))

    params.set('hotel_rating', useState('tourism_search_hotel_rating', () => undefined).value || '')
    params.set('hotel_type', useState('tourism_search_hotel_type', () => []).value.join(','))
    params.set('hotel', useState('tourism_hotel', () => []).value.join(','))

    params.set('food', useState('tourism_search_food', () => []).value.join(','))
    params.set('services', useState('tourism_search_service', () => []).value.join(','))
    params.set('region', useState('tourism_regions', () => []).value.join(','))
    params.set('type', useState('tourism_search_type', () => []).value.join(','))

    return navigateTo(`/tourism/search?${params.toString()}`)
}
</script>