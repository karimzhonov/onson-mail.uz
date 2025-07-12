<template>
    <FloatLabel class="w-full">
        <InputGroup>
            <InputGroupAddon>
                <Hotel />
            </InputGroupAddon>
            <MultiSelect display="chip" :loading="isFetching" filter v-model:model-value="modelValue"
            :options="data" option-value="id" fluid :disabled="isFetching" :option-label="(option: HotelType) => option[`name_${$i18n.locale}`] ?? option.name">
            <template #option="{option}">
                <div class="flex justify-between items-center w-full">
                    <span>{{ option[`name_${$i18n.locale}`] ?? option.name }}</span>
                    <Info v-if="option[`description_${$i18n.locale}`] ?? option.description" class="size-5" v-tooltip="option[`description_${$i18n.locale}`] ?? option.description" />
                </div>
            </template>
        </MultiSelect>
        </InputGroup>
        <label for="positions" class="ml-10">{{$t('Тип отелья')}}</label>
    </FloatLabel>
</template>
<script setup lang="ts">
import { Hotel, Info } from 'lucide-vue-next';
import type { HotelType } from '~/types/tourism/hotel';
import { useHotelType } from '~/hooks/tourism/hotel';

const modelValue = defineModel<number[]>({
    default: () => []
})

const {data, isFetching} = useHotelType()

</script>