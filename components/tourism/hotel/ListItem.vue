<template>
    <div class="w-full mt-3 relative py-2 md:py-3 px-2 md:px-2 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200">
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
        <div class="bg-surface-0 rounded-lg p-2 flex flex-col sm:items-center gap-4">
            <div class="w-full bg-surface-50 rounded-lg relative">
                <Galleria v-if="item.hotelimage_set && item.hotelimage_set.length > 0" :value="item.hotelimage_set" :numVisible="5" :circular="true" auto-play
                    :showItemNavigators="false" :showThumbnails="false" :transitionInterval="transitionInterval">
                    <template #item="slotProps">
                        <Image :src="`${slotProps.item.image}`" :alt="slotProps.item.image" class="w-full md:w-60 h-52 md:h-40" image-class="!mx-auto" preview />
                    </template>
                </Galleria>
                <div v-else class="flex justify-center items-center h-full aspect-video w-full">
                    <Images class="size-16" />
                </div>
                <div class="absolute top-3 right-3">
                    <Tag :value="item.type[`name_${$i18n.locale}`] ?? item.type.name" />
                </div>
            </div>
            <div class="flex flex-col w-full gap-4">
                <div class="flex flex-col md:flex-col justify-between items-start gap-2">
                    <div class="w-full">
                        <div class="text-lg font-medium mt-2 flex flex-row justify-between">
                            <h3>{{ item[`name_${$i18n.locale}`] ?? item.name }}</h3>
                            <Rating :model-value="item.stars" />
                        </div>
                    </div>
                    <div class="flex flex-row gap-1 text-surface-500">
                        <MapPinCheckInside />
                        {{ item.region[`name_${$i18n.locale}`] ?? item.region.name }},
                        {{ item.region.country[`name_${$i18n.locale}`] ?? item.region.country.name }}
                    </div>
                    <div class="bg-surface-100 p-1 line-clamp-3 rounded-lg"
                        v-html="item[`description_${$i18n.locale}`] ?? item.description" />
                    <div>
                        <Tag v-for="service in item.hotelservice_set.slice(0, 3)" rounded :value="service.service[`name_${$i18n.locale}`] ?? service.service.name"/>
                        <Tag v-if="item.hotelservice_set.slice(3).length > 0" rounded severity="secondary" :value="`${$t('еще')} + ${item.hotelservice_set.slice(0).length}`"/>
                    </div>
                </div>
                <div class="flex flex-row justify-between gap-8">
                    <span class="text-2xl font-semibold text-end text-primary">
                        ${{ item.min_price_b2c }}
                        <span class="text-lg text-surface-400">/ ${{ item.min_price_b2b }}</span>
                    </span>
                    <div class="flex flex-row-reverse md:flex-col gap-2">
                        <Button as="router-link" :to="useLocalePath()(`/tourism/hotel/${item.id}`)" class="text-nowrap flex-auto md:flex-initial whitespace-nowrap">
                            {{ $t('Посматреть') }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Images, MapPinCheckInside } from 'lucide-vue-next';
import type { Hotel } from '~/types/tourism/hotel';

const { item } = defineProps<{
    item: Hotel
}>()

const transitionInterval = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
</script>