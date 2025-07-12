<template>
        <Loading :loading="isFetching">
            <div class="flex justify-end w-full">
                <SelectButton class="hidden md:block" v-model="layout" :options="layoutOptions" :allowEmpty="false">
                    <template #option="{ option }">
                        <Grid v-if="option === 'grid'" />
                        <Menu v-if="option === 'list'" />
                    </template>
                </SelectButton>
            </div>
            <DataView lazy :value="data?.results" :layout="layout" data-key="id" class="rounded-xl">
                <template #list="slotProps">
                    <div class="flex flex-col">
                        <TourismTourListItem v-for="(item, index) in slotProps.items" :key="index" :item="item" />
                    </div>
                </template>

                <template #grid="slotProps">
                    <div class="grid grid-cols-12 gap-4">
                        <TourismTourGridItem v-for="(item, index) in slotProps.items" :key="index" :item="item"/>
                    </div>
                </template>
                <template #empty>
                    <div class="w-full mt-3 relative py-4 md:py-5 px-3 md:px4 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200" :class="{'h-screen': isFetching}">
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
</template>
<script lang="ts" setup>
import { Grid, Menu, FunnelX } from 'lucide-vue-next';
import { useQuery } from '@tanstack/vue-query';
import TourismService from '~/services/tourism';
import type { LimitOffsetPagination } from '~/types';
import type { Tour } from '~/types/tourism';


const layout = ref('grid');
const layoutOptions = ref(['list', 'grid']);
const tourismService = new TourismService()
const limit = 30
const route = useRoute()

const {data, isFetching} = useQuery({
    queryKey: computed(() => ['tourism_tours', route.query]),
    queryFn: async () => await tourismService.tour.list<LimitOffsetPagination<Tour>>({...route.query, limit: limit})
})

</script>