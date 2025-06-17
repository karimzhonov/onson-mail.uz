<template>
    <div class="flex flex-row justify-between bg-surface-0 p-2 border">
        <div class="flex flex-row gap-3 w-full">
            <Star />
            <h3 class="text-nowrap block truncate w-full">{{ $t('Класс') }}</h3>
        </div>
        <Rating v-model="modelValue" />
    </div>
</template>
<script setup lang="ts">
import { Star } from 'lucide-vue-next';
const modelValue = useState('tourism_search_hotel_rating', () => undefined)

</script>