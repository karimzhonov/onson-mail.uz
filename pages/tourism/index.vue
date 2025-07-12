<template>
    <div class="grid gap-5">
        <TourismLandingCarousel />
        <TourismSearch :full="false" />
        <TourismLandingPopularTours>
            <template #header>
                <h2 class="font-bold text-xl md:text-2xl">{{ $t('Популярные туры') }}</h2>
            </template>
        </TourismLandingPopularTours>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'turism'
})
</script>