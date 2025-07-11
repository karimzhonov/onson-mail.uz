<template>
    <Loading :loading="isFetching" class="min-h-[100px]">
            <Listbox filter :filter-placeholder="$t('Поиск отелья...')" v-model:model-value="modelValue" :options="data?.results" multiple option-value="id" class="h-[300px]">
                <template #option="{option, selected}">
                    <div class="flex flex-row w-full items-center gap-3">
                        <span >{{ option[`name_${$i18n.locale}`] ?? option.name }}</span>
                        <Info v-if="option[`desc_${$i18n.locale}`] ?? option.desc" class="size-4 ml-auto" v-tooltip.right="option[`desc_${$i18n.locale}`] ?? option.desc"/>
                        <Check v-if="selected" class="ml-auto" />
                    </div>
                </template>
            </Listbox>
    </Loading>
</template>
<script setup lang="ts">
import {Info, Check} from 'lucide-vue-next'
import { useHotels } from '~/hooks/tourism/hotel';

const {regions, hotelTypes, countries} = defineProps<{
    countries?: number[]
    regions?: number[]
    hotelTypes?: number[]
}>()

const modelValue = defineModel<number[]>({
    default: () => []
})

const params = computed(() => ({
    region: regions && regions.join(','), 
    type: hotelTypes && hotelTypes.join(','),
    country: countries && countries.join(',')
}))

const {data, isFetching} = useHotels({params})
</script>