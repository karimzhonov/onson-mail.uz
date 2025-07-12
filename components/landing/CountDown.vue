<template>
    <section class="pt-20" id="tracker">
        <div
            class="w-full relative py-8 md:py-10 px-6 md:px-8 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200 ">
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
                    class="text-center text-gray-800 pt-4  font-bold text-4xl md:text-5xl lg:text-6x">
                    Следующей
                    <span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">отгрузки</span>
                    через
                </h2>
                <h2 v-else class="text-center text-gray-800 pt-4  font-bold text-4xl md:text-5xl lg:text-6x">
                    Keyingi
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">jo'natish</span>
                    vaqtdan keyin
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
            d.setHours(23, 59, 59, 999); // до конца дня
            const day = d.getDay();
            const delta = day <= 3 ? 3 : (day <= 6 ? 6 : 4); // следующая среда или суббота
            d.setDate(d.getDate() + (delta - day));
            return d;
        },
        countdownFunc() {
            const now = new Date();
            const diff = this.delta - now; // разница в мс

            if (diff <= 0) {
                this.days = 0;
                this.hours = 0;
                this.minutes = 0;
                this.seconds = 0;
                clearInterval(this.refreshIntervalId);
                return;
            }

            const totalSeconds = Math.floor(diff / 1000);
            this.days = Math.floor(totalSeconds / 86400);
            this.hours = Math.floor((totalSeconds % 86400) / 3600);
            this.minutes = Math.floor((totalSeconds % 3600) / 60);
            this.seconds = totalSeconds % 60;
        },
        countdown() {
            return setInterval(() => this.countdownFunc(), 1000);
        }
    }

}
</script>