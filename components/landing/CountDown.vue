<template>
    <section class="pt-20" id="tracker">
        <div
            class="w-full relative py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900 dark:to-body-color">
            <div class="absolute right-0 top-0 h-full w-full flex justify-end">
                <span class="flex opacity-20">
                    <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
                    <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
                </span>
            </div>

            <div class="absolute left-0 bottom-0 h-full w-full flex items-end">
                <span class="flex opacity-20">
                    <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
                    <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
                </span>
            </div>
            <div
                class="flex flex-col items-center font-bold relative text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">
                <h2 v-if="useI18n().locale.value === 'ru'"
                    class="text-center text-gray-800 pt-4 dark:text-white font-bold text-4xl md:text-5xl lg:text-6x">
                    Получите свою
                    <span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">посылку</span>
                    через
                </h2>
                <h2 v-else class="text-center text-gray-800 pt-4 dark:text-white font-bold text-4xl md:text-5xl lg:text-6x">
                    O'z
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">yukingizni</span>
                    vaqtdan keyin oling
                </h2>
                <div class="flex justify-center gap-5 mt-5">
                    <div class="text-center">
                        <span class="countdown font-mono text-6xl">
                            <span aria-live="polite">{{ days }}</span>
                        </span>
                        {{ $t('день') }}
                    </div>
                    <div class="text-center">
                        <span class="countdown font-mono text-6xl">
                            <span>{{ hours }}</span>
                        </span>
                        {{ $t('час') }}
                    </div>
                    <div class="text-center">
                        <span class="countdown font-mono text-6xl">
                            <span aria-live="polite">{{ minutes }}</span>
                        </span>
                        {{ $t('минут') }}
                    </div>
                    <div class="text-center">
                        <span class="countdown font-mono text-6xl">
                            <span aria-live="polite">{{ seconds }}</span>
                        </span>
                        {{ $t('секунд') }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            days: null,
            hours: null,
            minutes: null,
            seconds: null,
            delta: this.getDelta(),
            refreshIntervalId: null
        }
    },
    mounted() {
        this.countdownFunc()
        this.refreshIntervalId  = this.countdown()
    },
    unmounted() {
        clearInterval(this.refreshIntervalId);
    },
    methods: {
        getDelta() {
            const d = new Date();
            d.setHours(23)
            d.setMinutes(59)
            d.setSeconds(59)
            const day = d.getDay()
            const delta = day <= 3 ? 3 : (day <= 6 ? 6 : 4)
            const newDate = d.getDate() + (delta - day)
            return new Date(d.setDate(newDate))
        },
        countdownFunc() {
            const now = new Date()
            this.days = this.delta.getDate() - now.getDate()
            this.hours = this.delta.getHours() - now.getHours()
            this.minutes = this.delta.getMinutes() - now.getMinutes()
            this.seconds = this.delta.getSeconds() - now.getSeconds()
        },
        countdown() {
            setInterval(() => this.countdownFunc(), 1000)
        }
    }
}
</script>