<template>
    <footer class="flex justify-center bg-white border-t border-gray-200">
        <div class="p-2 w-full flex justify-between max-w-screen-lg lg:max-w-screen-2xl">
            <div class="col-span-2 md:col-span-4 lg:col-span-2">
                <Logo />
            </div>

            <div class="flex items-center gap-x-3 text-gray-600 ">
                <NuxtLink target="_blank" to="#" class="transition hover:!text-primary">
                    <img src="/icons/Telegram.svg" height="30" width="35" />
                </NuxtLink>

                <NuxtLink target="_blank" to="#" class="transition hover:!text-primary">
                    <img src="/icons/Instagram.svg" height="30" width="35" />
                </NuxtLink>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
const localPath = useLocalePath()
</script>