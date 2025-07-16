<template>
    <Loading :loading="isFetching">
        <div v-if="tour" class="flex flex-col gap-10">
            <section id="title">
                <div class="grid md:grid-cols-2 gap-10 xl:gap-14 relative">
                    <div class="flex md:h-full ">
                        <div
                            class="animate-fade-right w-full md:h-full rounded-3xl bg-white  shadow-lg shadow-box-shadow border border-box-border">
                            <img v-if="tour?.images?.[0]?.image" :src="tour?.images?.[0]?.image" alt="image1"
                                width="500" class="w-full h-full object-cover rounded-2xl">
                            <Placeholder :size="28" v-else />
                        </div>
                    </div>
                    <div class="md:py-2 lg:py-4 relative">
                        <div class="absolute right-0 top-0 h-full w-full flex justify-end">
                            <span class="flex opacity-20">
                                <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
                                <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
                            </span>
                        </div>
                        <div class="relative">
                            <h2 class="text-4xl font-bold">{{ tour[`title_${$i18n.locale}`] ?? tour.title }}</h2>
                            <div class="grid md:grid-cols-3 grid-cols-2 gap-4 max-w-lg pt-8">
                                <div
                                    class="text-center rounded-xl bg-box-bg shadow-lg shadow-box-shadow border border-box-border p-3">
                                    <h3 class="text-gray-800  font-bold text-xl sm:text-2xl lg:text-3xl">
                                        <Route class="text-primary size-10 mx-auto" />
                                        {{ $t('Путь') }}
                                    </h3>
                                    <p v-for="d in tour.days" class="text-sm sm:text-base text-nowrap text-gray-600 "
                                        lang="ru">
                                        {{ d.region[`name_${$i18n.locale}`] || d.region.name }}
                                    </p>
                                </div>
                                <div
                                    class="text-center rounded-xl bg-box-bg shadow-lg shadow-box-shadow border border-box-border p-3">
                                    <h3 class="text-gray-800  font-bold text-xl sm:text-2xl lg:text-3xl">
                                        <LandPlot class="text-primary size-10 mx-auto" />
                                        {{ $t('Тип тура') }}
                                    </h3>
                                    <p class="text-sm sm:text-base text-gray-600">
                                        {{tour.type.map((t) => t[`name_${$i18n.locale}`] || t.name).join(',')}}
                                    </p>
                                </div>
                                <div
                                    class="text-center rounded-xl bg-box-bg shadow-lg shadow-box-shadow border border-box-border p-3">
                                    <h3 class="text-gray-800 mb-3 font-bold text-xl sm:text-2xl lg:text-3xl">
                                        <CalendarDays class="text-primary size-10 mx-auto" />
                                    </h3>
                                    <p class="font-semibold text-gray-600 text-nowrap">
                                        {{ $t('От') }} <span> {{ tour.from_date }}</span>
                                    </p>
                                    <p class="font-semibold text-gray-600 text-nowrap">
                                        {{ $t('До') }} <span> {{ tour.to_date }}</span>
                                    </p>
                                </div>
                                <div class="flex justify-center items-center col-span-3 mt-3">
                                    <Button @click="$emit('book')" fluid
                                        class="flex-auto md:flex-initial whitespace-nowrap px-8">
                                        {{ $t('Забранировать сейчас') }}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="prices">
                <div class="flex justify-between items-center pb-6">
                    <h2 class="text-4xl font-bold">{{ $t('Цени') }}</h2>
                </div>
                <div class="relative">
                    <div class="flex items-stretch gap-5 overflow-hidden overflow-x-auto w-full flex-wrap lg:flex-nowrap">
                        <div v-for="p, i in tour.prices" :key="p.id"
                            class="min-h-[200px] w-full md:w-[48%] lg:w-1/4 animate-fade-up animate-duration-500 text-center rounded-xl bg-box-bg shadow-lg shadow-box-shadow border-2 border-primary border-box-border p-3 flex flex-col justify-between"
                            :style="`animation-delay: ${300 * i}ms`">
                            <div>
                                <h3 class="text-primary font-bold text-3xl">
                                    ${{ p.price_b2c }}
                                </h3>
                                <h4 class="text-primary font-bold text-xl">
                                    (B2C - ${{ p.price_b2b }})
                                </h4>
                            </div>
                            <div class="flex flex-col gap-3 items-center">
                                <p class="text-sm sm:text-base text-nowrap text-gray-600">
                                    {{ p[`name_${$i18n.locale}`] || p.name }}
                                </p>
                                <Button @click="$emit('book')"
                                    class="flex-auto md:flex-initial whitespace-nowrap w-fit">
                                    {{ $t('Забранировать сейчас') }}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="days">
                <div class="flex justify-between items-center pb-6">
                    <h2 class="text-4xl font-bold">{{ $t('Маршрут') }}</h2>
                </div>

                <Timeline :value="tour.days" align="alternate" class="customized-timeline mb-5">
                    <template #marker="slotProps">
                        <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm bg-primary">
                            {{ slotProps.item.day }}
                        </span>
                    </template>
                    <template #content="slotProps">
                        <Card class="mt-4">
                            <template #title>
                                {{ slotProps.item[`title_${$i18n.locale}`] ?? slotProps.item.title }}
                            </template>
                            <template #subtitle>
                                {{ slotProps.item.date }}
                            </template>
                            <template #content>
                                <Image :src="slotProps.item.image" image-class="mx-auto" class="w-[200px]"
                                    preview />
                                <p>
                                    {{ slotProps.item[`desc_${$i18n.locale}`] ?? slotProps.item.desc }}
                                </p>
                                <Button @click="activeDay = slotProps.index; navigateTo(`#day_${slotProps.index}`)" :label="$t('Читать больше')" text></Button>
                            </template>
                        </Card>
                    </template>
                </Timeline>

                <Accordion v-model:value="activeDay">
                    <AccordionPanel :value="i" v-for="day, i in tour.days">
                        <AccordionHeader>
                            <h3 class="font-bold text-lg">
                                {{ $t('День') }} {{ i + 1 }}: {{ day[`title_${$i18n.locale}`] ?? day.title }}
                            </h3>
                        </AccordionHeader>
                        <AccordionContent>
                            <div class="grid grid-cols-12 gap-3" :id="`day_${i}`">
                                <div class="col-span-12 lg:col-span-4">
                                    <Image :src="day.image" image-class="mx-auto" class="w-full h-full"
                                    preview />
                                </div>
                                <div class="col-span-12 lg:col-span-8">
                                    <p class="mb-3" v-html="day[`desc_${$i18n.locale}`] ?? day.desc"/>
                                    
                                    <h3 class="font-bold text-xl">{{ $t('Отель') }}</h3>
                                    <div>
                                        <p class="flex flex-row gap-3">
                                            {{ $t('Название') }}: 
                                            <strong>{{ day.hotel?.[`name_${$i18n.locale}`] ?? day.hotel?.name }}</strong>
                                        </p>
                                        <p class="flex flex-row gap-3">
                                            {{ $t('Тип') }}: 
                                            <strong>{{ day.hotel?.type[`name_${$i18n.locale}`] ?? day.hotel?.type.name }}</strong>
                                        </p>
                                        <p class="flex flex-row gap-3">
                                            {{ $t('Класс') }}: 
                                            <Rating v-if="day.hotel" v-model="day.hotel.stars" readonly />
                                        </p>
                                        <p class="flex flex-row gap-3 items-center">
                                            {{ $t('Питание') }}: 
                                            <strong>{{ tour.food?.[`name_${$i18n.locale}`] ?? tour.food?.name }} ({{ tour.food?.code }})</strong>
                                            <Info v-if="tour.food?.[`description_${$i18n.locale}`] ?? tour.food?.description" class="size-5" v-tooltip="tour.food?.[`description_${$i18n.locale}`] ?? tour.food?.description" />
                                        </p>
                                        <p v-if="day.hotel?.[`description_${$i18n.locale}`] ?? day.hotel?.description" class="flex flex-row gap-3">
                                            {{ $t('Описание') }}: 
                                            <strong>{{ day.hotel?.[`description_${$i18n.locale}`] ?? day.hotel?.description }}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>               
            </section>
            <section id="images">
                <div class="flex justify-between items-center pb-6">
                    <h2 class="text-4xl font-bold">{{ $t('Фото') }}</h2>
                </div>
                <Galleria :value="tour.images" :numVisible="5" container-class="border-none w-[80%] mx-auto"
                    :circular="true" :autoPlay="true" :transitionInterval="2000">
                    <template #item="slotProps">
                        <Image :src="slotProps.item.image" image-class="mx-auto" class="w-full h-full"
                                    preview />
                    </template>
                    <template #thumbnail="slotProps">
                        <img :src="slotProps.item.image" :alt="slotProps.item.alt" class="w-[75px]" />
                    </template>
                </Galleria>
            </section>
            <section id="desc">
                <div class="grid md:grid-cols-2 grid-flow-row-dense gap-10 xl:gap-14 relative">
                    <div class="md:py-2 lg:py-4 relative">
                        <div class="absolute right-0 top-0 h-full w-full flex justify-end">
                            <span class="flex opacity-20">
                                <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
                                <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
                            </span>
                        </div>
                        <div class="relative">
                            <h2 class="text-4xl font-bold mb-3">{{ $t('Описание') }}</h2>
                            <p v-html="tour[`description_${$i18n.locale}`] ?? tour.description" />
                        </div>
                    </div>
                    <div class="flex justify-center items-center h-full min-h-[300px]">
                        <div
                            class="animate-fade-left w-full rounded-3xl bg-white h-full shadow-lg shadow-box-shadow border border-box-border">
                            <img v-if="tour?.images?.[1]?.image" :src="tour?.images?.[1]?.image" alt="image1"
                                width="500" class="w-full h-full object-cover rounded-2xl">
                            <Placeholder :size="28" v-else />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Loading>
</template>
<script setup lang="ts">
import { Route, LandPlot, CalendarDays, Info } from 'lucide-vue-next';
import { useQuery } from '@tanstack/vue-query';
import TourismService from '~/services/tourism';
import type { Tour } from '~/types/tourism';

definePageMeta({
    layout: 'turism'
})

const activeDay = ref(0)
const route = useRoute()
const tour_id = computed(() => route.params.tour_id.toString())

const tourismService = new TourismService()

const { data: tour, isFetching } = useQuery({
    queryKey: computed(() => ['tourism_tour', tour_id.value]),
    queryFn: async () => await tourismService.tour.get<Tour>(tour_id.value),
    enabled: !!tour_id.value
})

</script>
<style scoped>
@media screen and (max-width: 960px) {
    ::v-deep(.customized-timeline) {
        .p-timeline-event:nth-child(even) {
            flex-direction: row;

            &.p-timeline-event-content {
                text-align: left;
            }
        }

        .p-timeline-event-opposite {
            flex: 0;
        }
    }
}
</style>