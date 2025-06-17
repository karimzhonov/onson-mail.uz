<template>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 md:p-2">
        <div class="w-full mt-3 relative py-4 md:py-5 px-3 md:px4 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200">
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
            <div
                class="rounded-lg bg-surface-0 flex flex-col">
                <div class="bg-surface-50 flex justify-center rounded">
                    <div class="relative mx-auto aspect-video w-full">
                        <Galleria v-if="item.images.length > 0" :value="item.images" :numVisible="5" :circular="true"
                            auto-play :showItemNavigators="false" :showThumbnails="false"
                            :transitionInterval="transitionInterval">
                            <template #item="slotProps">
                                <Image :src="slotProps.item.image" image-class="mx-auto" class="w-full h-full"
                                    preview />
                            </template>
                        </Galleria>
                        <div v-else>
                            <Images class="size-6" />
                        </div>
                        <div class="absolute bg-black/70 rounded-border right-4 top-4">
                            <Tag v-if="item.hot_tour" :value="$t('Горящий тур')" severity="danger" />
                            <Tag v-if="item.best_proposal" :value="$t('Лучшее предложение')" severity="help" />
                        </div>
                    </div>
                </div>
                <div class="p-3">
                    <div class="flex flex-col justify-between items-start gap-2">
                        <div class="mb-2">
                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                                item.type.map((type) =>
                                type[`name_${$i18n.locale}`] ?? type.name).join(', ') }}</span>
                            <div class="text-lg font-medium mt-2 line-clamp-2">{{ item[`title_${$i18n.locale}`] ??
                                item.title }}</div>
                        </div>
                        <div class="bg-surface-100 p-1 rounded-lg line-clamp-3"
                            v-html="item[`description_${$i18n.locale}`] ?? item.description" />
                    </div>
                    <div class="flex flex-col gap-6 mt-6">
                        <span class="text-2xl font-semibold text-primary">
                            ${{ item.min_price_b2c }}
                            <span class="text-lg">
                                (B2C - ${{ item.min_price_b2b }})
                            </span>
                        </span>
                        <div class="flex flex-row-reverse md:flex-row gap-2">
                            <Button outlined as="router-link" :to="`/tourism/tour/${item.id}`">
                                {{ $t('Читать далее') }}
                            </Button>
                            <Button @click="$emit('book')" class="flex-auto md:flex-initial whitespace-nowrap">
                                {{ $t('Забранировать') }}
                            </Button>
                        </div>
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

const transitionInterval = Math.random() * 10000
</script>