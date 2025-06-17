<script setup lang="ts">
useHead({
  title: 'Onson Mail Group',
  meta: [
    { name: 'description', content: 'Cargo, turism and consalting' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/logo.png' }
  ],
})
definePageMeta({
  layout: 'landing'
})
</script>
<template>
    <div>
        <LandingHero />
        <TourismSearch class="mt-10" :full="false"/>
        <LandingCountDown />
        <LandingServices />
        <LandingCostCalculator />
        <LandingAbout />
        <OrderPublic class="mt-20"/>
        <LandingResults />
    </div>
</template>