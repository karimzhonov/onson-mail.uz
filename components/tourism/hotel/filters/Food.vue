<template>
    <FloatLabel class="w-full">
        <InputGroup>
            <InputGroupAddon>
                <Utensils />
            </InputGroupAddon>
            <MultiSelect display="chip" :loading="isFetching" filter v-model:model-value="modelValue" :options="data"
                option-value="code" fluid :option-label="(option: Food) => option[`name_${$i18n.locale}`] ?? option.name"
                :disabled="isFetching">
                <template #option="{option}">
                    <div class="flex justify-between items-center w-full">
                        <span>{{ option[`name_${$i18n.locale}`] ?? option.name }} <strong>({{ option.code }})</strong></span>
                        <Info v-if="option[`description_${$i18n.locale}`] ?? option.description" class="size-5" v-tooltip="option[`description_${$i18n.locale}`] ?? option.description" />
                    </div>
                </template>
            </MultiSelect>
        </InputGroup>
        <label for="positions" class="ml-10">{{ $t('Питание') }}</label>
    </FloatLabel>
</template>
<script setup lang="ts">
import { Utensils, Info } from 'lucide-vue-next';
import type { Food } from '~/types/tourism';
import { useFoods } from '~/hooks/tourism/hotel/others';

const modelValue = defineModel<string[]>()

const { data, isFetching } = useFoods()

</script>