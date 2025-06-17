<template>
    <FloatLabel class="w-full">
        <InputGroup>
            <InputGroupAddon>
                <HandHelping />
            </InputGroupAddon>
            <MultiSelect display="chip" :loading="isFetching" filter v-model:model-value="modelValue"
            :options="data" option-value="id" fluid :disabled="isFetching" :option-label="(option: Service) => option[`name_${$i18n.locale}`] ?? option.name">
            <template #option="{option}">
                <div class="flex justify-between items-center w-full">
                    <span>{{ option[`name_${$i18n.locale}`] ?? option.name }}</span>
                    <Info v-if="option[`description_${$i18n.locale}`] ?? option.description" class="size-5" v-tooltip="option[`description_${$i18n.locale}`] ?? option.description" />
                </div>
            </template>
        </MultiSelect>
        </InputGroup>
        <label for="positions" class="ml-10">{{$t('Услуги')}}</label>
    </FloatLabel>
</template>
<script setup lang="ts">
import { HandHelping, Info } from 'lucide-vue-next';
import { useQuery } from '@tanstack/vue-query';
import TourismService from '~/services/tourism';
import type { Service } from '~/types/tourism';

const modelValue = useState('tourism_search_service', () => [])

const tourismService = new TourismService()

const {data, isFetching} = useQuery({
    queryKey: ['tourism-service'],
    queryFn: async () => await tourismService.service.list<Service[]>()
})

</script>