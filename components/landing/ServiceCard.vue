<template>
    <NuxtLink :to="href" class="w-full relative rounded-2xl overflow-hidden">
        <img :src="coverImage" alt="Cover image" width="2280" class="w-full aspect-square object-cover rounded-2xl" />
        <div
            class="absolute py-2 px-3 md:py-3 md:px-4 bottom-0 flex flex-col justify-end inset-x-0 bg-gradient-to-t from-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-sm">
            <h2 class="text-white font-bold" style="font-size: 18px; font-weight: bold;">
                {{ title }}
            </h2>
            <p class="text-white">{{ desc }}</p>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
const { title, href, coverImage, desc } = defineProps<{
    title: string,
    href: string,
    duration: string,
    coverImage: string
    desc: string
}>()
</script>