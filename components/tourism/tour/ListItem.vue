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
        <div class="bg-surface-0 rounded-lg p-2 flex flex-col sm:flex-row sm:items-center gap-4">
            <div class="md:w-60 relative">
                <Galleria v-if="item.images.length > 0" :value="item.images" :numVisible="5" :circular="true" auto-play
                    :showItemNavigators="false" :showThumbnails="false" :transitionInterval="transitionInterval">
                    <template #item="slotProps">
                        <Image :src="slotProps.item.image" :alt="slotProps.item.alt" class="w-full h-full" preview />
                    </template>
                </Galleria>
                <div v-else>
                    <Images class="size-16" />
                </div>
            </div>
            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                <div class="flex flex-col md:flex-col justify-between items-start gap-2">
                    <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                            item.type.map((type) =>
                                type[`name_${$i18n.locale}`] ?? type.name).join(', ')}}</span>
                        <div class="text-lg font-medium mt-2">{{ item[`title_${$i18n.locale}`] ?? item.title }}
                        </div>
                    </div>
                    <div class="bg-surface-100 p-1 line-clamp-3 rounded-lg"
                        v-html="item[`description_${$i18n.locale}`] ?? item.description" />
                </div>
                <div class="flex flex-col md:items-end gap-8">
                    <div class="flex flex-col gap-3">
                        <Tag class="text-nowrap" v-if="item.hot_tour" :value="$t('Горящий тур')" severity="danger" />
                        <Tag class="text-nowrap" v-if="item.best_proposal" :value="$t('Лучшее предложение')" severity="help" />
                    </div>
                    <span class="text-2xl font-semibold">${{ item.min_price_b2b }} ${{ item.min_price_b2c }}</span>
                    <div class="flex flex-row-reverse md:flex-col gap-2">
                        <Button outlined as="router-link" :to="`/tourism/tour/${item.id}`" class="text-nowrap">
                            {{ $t('Читать далее') }}
                        </Button>
                        <Button @click="$emit('book')" class="text-nowrap flex-auto md:flex-initial whitespace-nowrap">
                            {{ $t('Забранировать') }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { Images } from 'lucide-vue-next';
import type { Tour } from '~/types/tourism';

const { item } = defineProps<{
    item: Tour
}>()

defineEmits<{
    book: []
}>()
const transitionInterval = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
</script>