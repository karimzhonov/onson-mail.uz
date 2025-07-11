<template>
    <InputGroup>
        <InputGroupAddon>
            <Star />
        </InputGroupAddon>
        <div class="bg-surface-0 w-full border border-1 border-surface-300 rounded-sm flex flex-row px-3 items-center">
            <h3 class="text-nowrap block truncate w-full text-surface-800 font-semibold">{{ $t('Класс') }}</h3>
            <Rating v-model:model-value="modelValue" />
        </div>
    </InputGroup>
</template>
<script setup lang="ts">
import { Star } from 'lucide-vue-next';
const modelValue = defineModel<number>()

</script>