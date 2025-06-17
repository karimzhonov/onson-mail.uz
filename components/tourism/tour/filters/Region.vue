<template>
    <Loading :loading="isFetching" class="min-h-[100px]">
        <Listbox @update:model-value="update" filter :filter-placeholder="$t('Поиск городов...')" :model-value="modelValue" :options="data?.results" multiple option-value="id" class="h-[300px]">
            <template #option="{option, selected}">
                <div class="flex flex-row w-full items-center gap-3">
                    <Checkbox :default-value="selected" binary />
                    <span >{{ option[`name_${$i18n.locale}`] ?? option.name }}</span>
                    <Info v-if="option[`desc_${$i18n.locale}`] ?? option.desc" class="size-4 ml-auto" v-tooltip.right="option[`desc_${$i18n.locale}`] ?? option.desc"/>
                </div>
            </template>
        </Listbox>
    </Loading>
</template>
<script setup lang="ts">
import {Info} from 'lucide-vue-next'
import { useQuery } from '@tanstack/vue-query';
import TourismService from '~/services/tourism';
import type { Region } from '~/types/tourism';
import type { LimitOffsetPagination } from '~/types';

const props = defineProps<{
    countries: number[]
}>()

const modelValue = useState('tourism_search_regions', () => [])
const tourismService = new TourismService()

const {data, isFetching} = useQuery({
    queryKey: ['tourism_regions', props.countries],
    queryFn: async () => await tourismService.region.list<LimitOffsetPagination<Region>>({country: props.countries.join(','), limit: 100})
})

const update = (value: any) => {
    modelValue.value = value    
}
</script>