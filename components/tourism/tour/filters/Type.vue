<template>
    <Loading :loading="isFetching" class="min-h-[100px]">
        <!-- <div class="bg-surface-0 p-2 rounded-lg"> -->
            <!-- <h3 class="text-xl font-semibold">{{ $t('Типы') }}</h3> -->
            <Listbox filter :filter-placeholder="$t('Поиск типов...')" v-model:model-value="modelValue" :options="data" multiple option-value="id" class="h-[300px]">
                <template #option="{option, selected}">
                    <div class="flex flex-row w-full items-center gap-3">
                        <span >{{ option[`name_${$i18n.locale}`] ?? option.name }}</span>
                        <Info v-if="option[`desc_${$i18n.locale}`] ?? option.desc" class="size-4 ml-auto" v-tooltip.right="option[`desc_${$i18n.locale}`] ?? option.desc"/>
                        <Check v-if="selected" class="ml-auto"/>
                    </div>
                </template>
            </Listbox>
        <!-- </div> -->
    </Loading>
</template>
<script setup lang="ts">
import {Info, Check} from 'lucide-vue-next'
import { useTypes } from '~/hooks/tourism';

const modelValue = defineModel<number[]>({
    default: () => []
})

const {data, isFetching} = useTypes()
</script>