<template>
  <div class="fixed inset-x-0 h-screen flex items-start pointer-events-none">
    <div class="absolute top-0 h-24 w-2/3 bg-gradient-to-br from-primary opacity-20 blur-2xl">
    </div>
    <div class="absolute top-0 right-0 h-20 w-3/5 bg-gradient-to-r from-[#8cd66a] opacity-40 blur-2xl">
    </div>
    <div class="absolute bottom-0 h-24 w-2/3 bg-gradient-to-br from-primary opacity-20 blur-2xl">
    </div>
    <div class="absolute bottom-0 right-0 h-20 w-3/5 bg-gradient-to-r from-[#8cd66a] opacity-40 blur-2xl">
    </div>
    <!-- <div class="absolute bottom-[70%] right-0 h-20 w-3/5 bg-gradient-to-r from-[#8cd66a] opacity-40 blur-2xl">
    </div>
    <div class="absolute bottom-[40%] h-24 w-2/3 bg-gradient-to-br from-primary opacity-20 blur-2xl">
    </div> -->
  </div>
  <Toast />
  <div class="pb-[85px] md:pb-0 h-full min-h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <MobileNavBar />
  <div
    v-if="loader.loading"
    class="fixed inset-0 z-[999] flex items-center justify-center transition-opacity duration-1000"
    :class="{
      'opacity-100': loader.currentPhase !== 'background-fade',
      'opacity-0': loader.currentPhase === 'background-fade'
    }"
  >
    <!-- Лого -->
    <div
      class="transition-opacity duration-1000 h-full"
      :class="{
        'opacity-100': loader.currentPhase === 'initial' || loader.currentPhase === 'background-fade',
        'opacity-0': loader.currentPhase === 'logo-fade'
      }"
    >
      <Loader />
    </div>

    <!-- Фон -->
    <div class="absolute inset-0 bg-surface-0 dark:bg-surface-950 -z-10" />
  </div>

</template>

<script setup lang="ts">
import { token } from './composables'
import useLoader from '@/store/loader'

const colorMode = useColorMode();
colorMode.preference = 'light';

const loader = useLoader()

useHead({
  title: 'Onson Mail',
  meta: [
    { name: 'description', content: '' },
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'Onson Mail' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/logo.png' },
    { rel: 'manifest', href: "/manifest.json" }
  ]
})

onMounted(async () => {
  if (useRoute().query.access) token.value.access = useRoute().query.access?.toString() ?? ''
  if (useRoute().query.refresh) token.value.refresh = useRoute().query.refresh?.toString() ?? ''
})
</script>
<style>
html {
  color-scheme: light;
}
</style>
