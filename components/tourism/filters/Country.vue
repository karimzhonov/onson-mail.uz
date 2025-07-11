<template>
    <FloatLabel class="w-full">
        <InputGroup>
            <InputGroupAddon v-if="icon">
                <Component :is="icon" />
            </InputGroupAddon>
            <MultiSelect display="chip" :loading="isFetching" filter
                :options="data?.filter((v: Country) => !exclude?.includes(v.id))"
                option-value="id" :optionLabel="(v: Country) => v[`name_${$i18n.locale}`] ?? v.name" fluid
                :disabled="isFetching" v-model:model-value="modelValue" />
        </InputGroup>
        <label class="ml-10">{{ $t(label) }}</label>
    </FloatLabel>
</template>
<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next';
import { useCountries } from '~/hooks/tourism/regions';
import type { Country } from '~/types/tourism/region';

const {params, label="Страна"} = defineProps<{
    params?: Record<string, any>
    exclude?: number[]
    icon?: LucideIcon
    label?: string
}>()

const modelValue = defineModel<number[]>({
    default: () => []
})

const {data, isFetching} = useCountries({params: ref(params ?? {})})
</script>