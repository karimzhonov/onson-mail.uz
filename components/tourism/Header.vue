<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            navIsOpen: false,
        }
    },
    methods: {
        localPath: useLocalePath(),
    },
    computed: {
        navLinks() {
            return [
                {
                    text: this.$t("Туры"),
                    href: this.localPath("/tourism/search"),
                },
                {
                    text: this.$t("Отели"),
                    href: this.localPath("/tourism/hotel")
                },
            ]
        }
    }
}

</script>
<template>
    <header class="px-2 sticky bg-white inset-x-0 top-0 py-3 z-50 header flex justify-center">
        <nav class="max-w-screen-lg lg:max-w-screen-2xl flex items-center justify-between w-full relative">
            <!-- app logo -->
            <div class="inline-flex relative bg-inherit">
                <Logo />
            </div>
            <div class="absolute top-full px-5 sm:px-8 md:px-12 lg:px-0
                lg:pt-0 lg:top-0 invisible opacity-40 lg:opacity-100 bg-white rounded-xl border border-box-border shadow-lg shadow-box-shadow 
                lg:border-none lg:shadow-none lg:rounded-none
                lg:bg-transparent w-full lg:w-max py-6 lg:py-0 lg:visible lg:relative flex 
                transition-all duration-300 ease-linear origin-top translate-y-6 lg:translate-y-0"
                :class="navIsOpen ? '!visible !opacity-100 !translate-y-0' : ''">
                <ul class="text-gray-700  w-full flex lg:items-center gap-y-4 lg:gap-x-8 flex-col lg:flex-row">
                    <li v-for="navItem in navLinks" :key="navItem" class="lg:inline-flex">
                        <NuxtLink class="lg:inline-flex transition hover:text-primary ease-linear text-lg" :to="navItem.href">
                            {{ navItem.text }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <div class="flex items-center bg-inherit gap-1 lg:gap-3 min-w-max">
                <!-- <Install /> -->
                <LangSwitcher />
                <UserDropdown />
                <div class="flex lg:hidden border-l border-box-border pl-2">
                    <button @click.prevent="navIsOpen = !navIsOpen" class="outline-none w-7 h-auto flex flex-col relative">
                        <span
                            class="w-6 h-0.5 rounded-full bg-gray-500  transition-all duration-300 ease-linear"
                            :class="navIsOpen ? 'translate-y-1.5 rotate-[40deg] scale-x-100 ' : ' scale-x-50 origin-left'"></span>
                        <span
                            class="w-6 origin-center  mt-1 h-0.5 rounded-full bg-gray-500  transition-all duration-300 ease-linear"
                            :class="navIsOpen ? 'scale-x-0 opacity-0' : ''"></span>
                        <span
                            class="w-6 mt-1 h-0.5 rounded-full bg-gray-500  transition-all duration-300 ease-linear"
                            :class="navIsOpen ? '-translate-y-1.5 -rotate-[40deg] scale-x-100 ' : ' scale-x-75 origin-left'"></span>
                    </button>
                </div>
            </div>
        </nav>

    </header>
</template>