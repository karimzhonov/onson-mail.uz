<template>
    <section class="relative w-full">
        <div class="grid lg:grid-cols-2 gap-10 xl:gap-14 relative pt-24 lg:max-w-none max-w-2xl md:max-w-3xl mx-auto">
            <div class="lg:py-6">
                <div class="text-center lg:text-left">
                    <h1 class="text-gray-800 pt-4  font-bold text-4xl md:text-5xl lg:text-6xl">

                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">ONSONMAIL</span>
                        <br>{{ $t('ваш путь к воплощению мечты') }}
                    </h1>
                    <p class="text-gray-800 pt-4 ">
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a] font-bold">ONSONMAIL</span>
                        — {{ $t('hero_desc') }}
                    </p>
                    <Button class="mt-4" @click="login">
                        <LogIn />
                        {{ $t('Войти') }} Onson Mail
                    </Button>
                </div>
            </div>
            <div class="lg:h-full md:flex">

                <div class="flex w-full h-96 min-h-[24rem] lg:min-h-[none] lg:w-full lg:h-full items-center relative">
                    <div
                        class="absolute z-0 top-1/2  -translate-y-1/2 w-5/6 right-0 h-[calc(80%+20px)] bg-gradient-to-tr opacity-25 from-primary to-pink-300 ">
                    </div>
                    <div class="duration-1000 animate-fadein absolute w-3/5 h-full z-10 p-1 -translate-y-1/2 top-1/2 right-3 rounded-3xl bg-white  shadow-lg shadow-box-shadow border border-box-border">
                        <img src="/images/cargo2.png" alt="In studio" width="500" height="auto" loading="lazy"
                            class="w-full h-full rounded-2xl object-cover">
                    </div>
                    <div
                        class="duration-1000 animate-fadein absolute -translate-y-1/2 top-1/2 h-[calc(80%-2rem)] w-[calc(40%-20px)] p-1 rounded-3xl bg-white  shadow-lg shadow-box-shadow border border-box-border ">
                        <img src="/images/turizm.jpg" alt="Happy in studio" width="200" height="auto" loading="lazy"
                            class="w-full h-full rounded-2xl object-cover">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { LogIn } from 'lucide-vue-next'
import { useUser } from "@/store/user"
const login = () => {
    if (useUser().user.id) {
        useRouter().push(useLocalePath()('/my'))
    } else {
        useUser().login()
    }
}
</script>