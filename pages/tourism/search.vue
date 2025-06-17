<template>
    <div class="grid gap-5">
        <div class="col-span-1">
            <TourismSearch :full="true" />
        </div>
        <div class="col-span-1 min-h-[300px] h-full">
            <TourismTourTable />
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'turism'
})
</script>