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
  <div v-if="loader().loading" class="absolute top-0 left-0 w-full h-full bg-white z-[9999]">
    <Loader />
  </div>
</template>

<script setup>
import { token } from './composables'
import loader from "~/store/loader";

const colorMode = useColorMode();
colorMode.preference = 'light';

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
  if (useRoute().query.access) token.value.access = useRoute().query.access
  if (useRoute().query.refresh) token.value.refresh = useRoute().query.refresh
})
</script>
<style>
html {
  color-scheme: light;
}
</style>
