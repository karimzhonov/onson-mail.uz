<script setup lang="ts">
import { Images } from 'lucide-vue-next';
const {size = 28} = defineProps<{
    size?: number
}>()
</script>

<template>
    <div class="flex justify-center items-center h-full aspect-video w-full bg-surface-50 rounded-lg">
        <Images :size="size" />
    </div>
</template>