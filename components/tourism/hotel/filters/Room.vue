<template>
    <FloatLabel class="w-full">
        <Listbox :filter-placeholder="$t('Комнати')" display="chip" :loading="isFetching" filter v-model:model-value="modelValue"
            :options="data" multiple option-value="id" class="min-h-[300px]" :disabled="isFetching" :option-label="(option: Room) => option[`name_${$i18n.locale}`] ?? option.name">
            <template #option="{option, selected}">
                <div class="flex justify-between items-center w-full">
                    <span>{{ option[`name_${$i18n.locale}`] ?? option.name }}</span>
                    <Info v-if="option[`description_${$i18n.locale}`] ?? option.description" class="size-5" v-tooltip="option[`description_${$i18n.locale}`] ?? option.description" />
                    <Check v-if="selected" class="ml-auto" />
                </div>
            </template>
        </Listbox>
    </FloatLabel>
</template>
<script setup lang="ts">
import { Info, Check } from 'lucide-vue-next';
import type { Room } from '~/types/tourism/hotel';
import { useRooms } from '~/hooks/tourism/hotel/others';

const modelValue = defineModel<number[]>({
    default: () => []
})
const {data, isFetching} = useRooms()

</script>