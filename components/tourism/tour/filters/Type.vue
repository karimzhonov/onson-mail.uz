<template>
    <Loading :loading="isFetching" class="min-h-[100px]">
        <!-- <div class="bg-surface-0 p-2 rounded-lg"> -->
            <!-- <h3 class="text-xl font-semibold">{{ $t('Типы') }}</h3> -->
            <Listbox @update:model-value="update" filter :filter-placeholder="$t('Поиск типов...')" :model-value="modelValue" :options="data" multiple option-value="id" class="h-[300px]">
                <template #option="{option, selected}">
                    <div class="flex flex-row w-full items-center gap-3">
                        <Checkbox :default-value="selected" binary />
                        <span >{{ option[`name_${$i18n.locale}`] ?? option.name }}</span>
                        <Info v-if="option[`desc_${$i18n.locale}`] ?? option.desc" class="size-4 ml-auto" v-tooltip.right="option[`desc_${$i18n.locale}`] ?? option.desc"/>
                    </div>
                </template>
            </Listbox>
        <!-- </div> -->
    </Loading>
</template>
<script setup lang="ts">
import {Info} from 'lucide-vue-next'
import { useQuery } from '@tanstack/vue-query';
import TourismService from '~/services/tourism';
import type { Type } from '~/types/tourism';

const modelValue = useState('tourism_search_type', () => [])

const tourismService = new TourismService()

const {data, isFetching} = useQuery({
    queryKey: ['tourism_types'],
    queryFn: async () => await tourismService.type.list<Type[]>()
})

const update = (value: any) => {
    modelValue.value = value    
}
</script>