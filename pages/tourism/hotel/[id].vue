<template>
    <Loading :loading="isFetching" class="min-h-screen">
        <div class="grid grid-cols-12 gap-3 relative h-full">
            <div class="flex flex-col w-full gap-4 col-span-12 lg:col-span-9 mb-3" v-if="item">
                <section class="flex flex-col gap-3">
                    <div class="flex flex-row justify-between">
                        <h1 class="text-2xl font-bold">{{ item[`name_${$i18n.locale}`] ?? item.name }}</h1>
                        <Button text @click="schedule_show = true">{{ $t('Расписание') }}</Button>
                    </div>
                    
                    <div class="flex flex-row gap-1 text-surface-500">
                        <MapPinCheckInside />
                        {{ item.region[`name_${$i18n.locale}`] ?? item.region.name }},
                        {{ item.region.country[`name_${$i18n.locale}`] ?? item.region.country.name }}
                    </div>
                    <Rating :model-value="item.stars" />
                </section>
                <Divider class="before:border-primary-300" />
                <section>
                    <Galleria :value="item.hotelimage_set" :numVisible="5"
                        :circular="true" :autoPlay="true" :transitionInterval="2000" :show-thumbnails="false" 
                        show-indicators show-indicators-on-item>
                        <template #item="slotProps">
                            <img :src="slotProps.item.image" :alt="slotProps.item.alt" class="w-full max-h-[500px] object-cover" />
                        </template>
                    </Galleria>
                </section>
                <section>
                    <p v-html="item.region[`description_${$i18n.locale}`] ?? item.description"/>
                </section>
                <Divider class="before:border-primary-300" />
                <section>
                    <h2 class="text-2xl font-bold mb-2">{{ $t('Питание') }}</h2>
                    <SelectButton v-model:model-value="bookingParams.food" :options="item.hotelfood_set" size="large" class="flex flex-wrap w-full hotel-select">
                        <template #option="{option}">
                            {{ option.food[`name_${$i18n.locale}`] ?? option.food.name }}
                            <strong>({{ option.food.code.toUpperCase() }})</strong>
                        </template>
                    </SelectButton>
                </section>
                <Divider class="before:border-primary-300" />
                <section v-if="bookingParams.rooms">
                    <h2 class="text-2xl font-bold mb-2">{{$t('Комнаты')}}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 w-full hotel-select">
                        <div class="border border-primary-300 rounded-lg p-2 my-2 flex md:flex-col flex-row justify-start gap-3 w-full" 
                        v-for="option in item.hotelroom_set" :class="{'bg-primary-200': bookingParams.rooms[option.id].count > 0}" >
                            <Image v-if="option.image" preview :src="option.image" class="w-32 md:w-full" />
                            <Placeholder :size="28" v-else />
                            <div>
                                <div>
                                    <h2 class="font-semibold text-start">
                                        {{ option.room[`name_${$i18n.locale}`] ?? option.room.name }}
                                    </h2>
                                    <p class="text-sm text-start line-clamp-3 mb-3">
                                        {{ option.room[`description_${$i18n.locale}`] ?? option.room.description }}
                                    </p>
                                </div>
                                <div class="flex flex-row justify-center">
                                    <InputNumber input-class="text-center" 
                                    class="w-[120px]" fluid size="small" 
                                    v-model="bookingParams.rooms[option.id].count" 
                                    showButtons buttonLayout="horizontal" 
                                    :min="0" :max="99" 
                                    increment-button-class="bg-surface-0"
                                    decrement-button-class="bg-surface-0"
                                    >
                                        <template #incrementicon>
                                            <Plus />
                                        </template>
                                        <template #decrementicon>
                                            <Minus />
                                        </template>
                                    </InputNumber>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Divider class="before:border-primary-300" />
                <section>
                    <h2 class="text-2xl font-bold mb-2">{{ $t('Услуги') }}</h2>
                    <SelectButton v-model:model-value="bookingParams.services" multiple :options="item.hotelservice_set" size="large" class="flex flex-wrap w-full hotel-select">
                        <template #option="{option}">
                            {{ option.service[`name_${$i18n.locale}`] ?? option.service.name }}
                        </template>
                    </SelectButton>
                </section>
            </div>
            <div class="relative h-full col-span-12 lg:col-span-3">
                <section class="bg-surface-100 rounded-lg p-3 sticky top-[100px] h-fit flex flex-col gap-3">
                    <div class="flex flex-row justify-between items-center">
                        <h2 class="text-2xl font-bold">{{ $t('Итого') }}</h2>
                        <strong class="text-4xl">
                            ${{ bookingPrices.b2c }}  
                            <span class="text-surface-400 text-2xl">/ ${{ bookingPrices.b2b }}</span>
                        </strong>
                    </div>
                    
                    <div class="font-semibold" v-if="Object.values(bookingParams.rooms ?? {}).filter((v) => v.count > 0).length > 0">
                        <div class="flex flex-row justify-between">
                            <p>{{ $t('Комната') }}</p>
                            <strong>
                                ${{ bookingPrices.rooms_b2c }}
                                <span class="text-surface-400 text-sm">/ ${{ bookingPrices.rooms_b2b }}</span>
                            </strong>
                        </div>
                        <div v-for="room in Object.values(bookingParams.rooms ?? {}).filter((v) => v.count > 0)" class="ml-3 flex flex-row justify-between items-center text-sm opacity-50">
                            <p class="font-bold">
                                {{ room.room.room[`name_${$i18n.locale}`] ?? room.room.room.name }}
                            </p>
                            <strong>
                                {{ room.count }} x
                                ${{ room.room.price_b2c ?? 0 }}  
                                <span class="text-surface-500 text-sm">/ ${{ room.room.price_b2b ?? 0 }}</span>
                            </strong>
                        </div>
                        
                    </div>
                    <div v-if="bookingParams.food">
                        <div class="flex flex-row justify-between">
                            <p>{{ $t('Питание') }}</p>
                            <strong>
                                ${{ bookingPrices.food_b2c }}  
                                <span class="text-surface-400 text-sm">/ ${{ bookingPrices.food_b2b }}</span>
                            </strong>
                        </div>
                        
                        <div class="ml-3 flex flex-row justify-between text-sm opacity-50">
                            <p class="font-bold">
                                {{ bookingParams.food.food[`name_${$i18n.locale}`] ?? bookingParams.food.food.name }}
                            </p>
                            <strong>
                                ${{ bookingParams.food?.price_b2c ?? 0 }}  
                                <span class="text-surface-400 text-sm">/ ${{ bookingParams.food?.price_b2b ?? 0 }}</span>
                            </strong>
                        </div>
                    </div>
                    <div v-if="bookingParams.services && bookingParams.services?.length > 0">
                        <div class="flex flex-row justify-between">
                            <p>{{ $t('Услуги') }}</p>
                            <strong>
                                ${{ bookingPrices.services_b2c }}  
                                <span class="text-surface-400 text-sm">
                                    / ${{ bookingPrices.services_b2b }}
                                </span>
                            </strong>
                        </div>

                        <div class="ml-3 flex flex-row justify-between items-center text-sm opacity-50" v-for="service in bookingParams.services">
                            <p class="font-bold">
                                {{ service.service[`name_${$i18n.locale}`] ?? service.service.name }}
                            </p>
                            <strong>
                                ${{ service.price_b2c ?? 0 }}  
                                <span class="text-surface-400 text-sm">/ ${{ service.price_b2b ?? 0 }}</span>
                            </strong>
                        </div>
                    </div>
                    <Button @click="book">
                        <LaptopMinimalCheck />
                        {{ $t('Забранировать') }}
                    </Button>
                </section>
            </div>
        </div>
        <Divider class="before:border-primary-300" />
        <section v-if="hotels?.results.length && (hotels?.results.length > 0)" class="w-full">
            <h2 class="text-2xl font-bold mb-2">{{ $t('Похожие отели') }}</h2>
            <DataView lazy :value="hotels?.results" :layout="'list'" data-key="id" class="rounded-xl like-hotel">
                <template #list="slotProps">
                    <div class="grid grid-cols-12 gap-2">
                        <TourismHotelListItem class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3" v-for="(item, index) in slotProps.items" :key="index" :item="item" />
                    </div>
                </template>
            </DataView>
        </section>
    </Loading>
    <IDialog v-model:model-value="schedule_show" class="w-full">
        <template #header>
            <h2 class="font-bold text-xl">{{ $t('Расписание') }}</h2>
        </template>
        <TourismHotelCalendar :hotel-id="route.params.id.toString()" />
    </IDialog>
</template>
<script setup lang="ts">
import { MapPinCheckInside, Plus, Minus, LaptopMinimalCheck } from 'lucide-vue-next'
import { useHotel, useHotels } from '~/hooks/tourism/hotel';
import type { HotelFood, HotelRoom, HotelService } from '~/types/tourism/hotel';

definePageMeta({
    layout: 'turism'
})
const route = useRoute()
const toast = useToast()
const schedule_show = ref(false)

const bookingParams = ref<{
    food?: HotelFood
    rooms?: {[s: string]: {
        room: HotelRoom
        count: number
    }},
    services: HotelService[]
}>({
    services: []
})

const bookingPrices = computed(() => {
    const price = {
        b2b: 0,
        b2c: 0,
        food_b2b: bookingParams.value.food?.price_b2b ?? 0,
        food_b2c: bookingParams.value.food?.price_b2c ?? 0,
        services_b2b: bookingParams.value.services.map((value) => value.price_b2b).reduce((a, v) => a + v, 0) ?? 0,
        services_b2c: bookingParams.value.services.map((value) => value.price_b2c).reduce((a, v) => a + v, 0) ?? 0,
        rooms_b2b: Object.values(bookingParams.value.rooms ?? {}).filter((v) => v.count > 0).reduce((a, v) => a + v.count * v.room.price_b2b, 0) ?? 0,
        rooms_b2c: Object.values(bookingParams.value.rooms ?? {}).filter((v) => v.count > 0).reduce((a, v) => a + v.count * v.room.price_b2c, 0) ?? 0
    }

    price.b2b = price.food_b2b + price.services_b2b + price.rooms_b2b
    price.b2c = price.food_b2c + price.services_b2c + price.rooms_b2c
    return price
})

const { data: item, isFetching } = useHotel({
    id: route.params.id.toString(),
    select: (data) => {
        const rooms: Record<number, any> = {}
        data.hotelroom_set.map((room, index) => {
            rooms[`${room.id}`] = {
                room: room,
                count: index === 0 ? 1 : 0
            }
        })
        
        bookingParams.value = {
            food: data.hotelfood_set[0],
            rooms,
            services: data.hotelservice_set.filter((value) => value.price_b2c === 0)
        }
        return data
    }
})

const {data: hotels } = useHotels({params: ref({limit: 4, like: route.params.id.toString()})})

const book = () => {
    console.log(bookingParams.value);
    toast.add({
        summary: 'Идет разработка',
        life: 5000
    })
}
</script>
<style>
.hotel-select > button {
    background: transparent!important;
    border: none;
}

.hotel-select .p-togglebutton-content {
    border: 1px solid var(--p-primary-300);
}

.hotel-select .p-togglebutton-checked .p-togglebutton-content {
    background: var(--p-primary-200)
}

.like-hotel .p-dataview-content {
    background: transparent!important;
}
</style>