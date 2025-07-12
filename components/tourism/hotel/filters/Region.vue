<template>
    <Loading :loading="isFetching" class="min-h-[100px]">
        <Listbox filter :filter-placeholder="$t('Поиск городов...')" v-model:model-value="modelValue" :options="data?.results" multiple option-value="id" class="h-[300px]">
            <template #option="{option, selected}">
                <div class="flex flex-row w-full items-center gap-3">
                    <span >{{ option[`name_${$i18n.locale}`] ?? option.name }}</span>
                    <Info v-if="option[`desc_${$i18n.locale}`] ?? option.desc" class="size-4 ml-auto" v-tooltip.right="option[`desc_${$i18n.locale}`] ?? option.desc"/>
                    <Check v-if="selected" class="ml-auto"/>
                </div>
            </template>
        </Listbox>
    </Loading>
</template>
<script setup lang="ts">
import {Info} from 'lucide-vue-next'
import { useRegions } from '~/hooks/tourism/regions';

const props = defineProps<{
    countries: number[]
}>()

const modelValue = defineModel({
    default: () => []
})
const {data, isFetching} = useRegions({
    params: ref({
        country: props.countries && props.countries.join(',')
    })
})
</script>