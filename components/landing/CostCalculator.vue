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
                    Расчитать стоимость
                    <span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">перевозки</span>
                </h2>
                <h2 v-else class="text-center text-gray-800 pt-4  font-bold text-4xl md:text-5xl lg:text-6x">
                    <span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">Yuk</span>
                    tashish narxini hisoblang
                </h2>
                <div
                    class="flex gap-4 flex-col md:flex-row mt-5 items-center justify-center md:justify-around w-full max-w-[500px]">
                    <SelectButton v-model="country" :options="countries" option-label="name">
                        <template #option="{option}">
                            <img :src="`https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/${option.code.toLowerCase()}.svg`"
                                        :alt="option.code" class="size-8 shrink-0">
                                    <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                                    <span class="ml-3 block truncate font-normal text-lg">{{option.name}}</span>
                        </template>
                    </SelectButton>
                    <div class="text-2xl text-gray-800 ">X</div>
                    <InputNumber class="w-[100px]" v-model="weight" inputId="weight" suffix=" кг" fluid />
                    <div class="text-4xl text-gray-800 ">=</div>
                    <div class="text-4xl">{{ weight > 1 ? country.price_per * weight : country.price_per }}$</div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            countries: [],
            countryShow: false,
            country: { code: '' },
            weight: 3,
        }
    },
    async mounted() {
        const { data } = await this.$api.get("/company/api-onson-mail-cargo/country/")
        this.countries = data
        this.country = this.countries[0]
    }
}
</script>
