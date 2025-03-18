<template>
    <section class="pt-20" id="tracker">
        <AtomsContainer>
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
                        Расчитать стоимость
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">перевозки</span>
                    </h2>
                    <h2 v-else
                        class="text-center text-gray-800 pt-4 dark:text-white font-bold text-4xl md:text-5xl lg:text-6x">
                        <span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">Yuk</span>
                        tashish narxini hisoblang
                    </h2>
                    <div class="flex flex-col md:flex-row mt-5 items-center justify-center md:justify-around w-full max-w-[500px]">
                        <div class="relative mt-3">
                            <button type="button" @click="countryShow = !countryShow"
                                class="bg-[rgb(var(--color-bg))] flex w-full cursor-default rounded-md py-1.5 pr-2 pl-3 text-left text-[rgb(var(--color-primary))] outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                                <span class="flex items-center mr-3">
                                        <img :src="`https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/${country.code.toLowerCase()}.svg`"
                                            :alt="country.code" class="size-8 shrink-0">
                                        <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                                        <span class="ml-3 block truncate font-normal text-lg">{{country.name}}</span>
                                </span>
                                <svg class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd"
                                        d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>

                            <ul v-if="countryShow" class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm"
                                tabindex="-1" role="listbox" aria-labelledby="listbox-label"
                                aria-activedescendant="listbox-option-3">
                                <li @click="country = c" v-for="c in countries" :key="c" class="relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none"
                                    id="listbox-option-0" role="option">
                                    <div class="flex items-center">
                                        <img :src="`https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/${c.code.toLowerCase()}.svg`"
                                            alt="" class="size-5 shrink-0">
                                        <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                                        <span class="ml-3 block truncate font-normal">{{c.name}}</span>
                                    </div>

                                    <span v-if="country.id == c.id" class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                                        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                            data-slot="icon">
                                            <path fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <!-- More items... -->
                            </ul>
                        </div>
                        <div class="text-2xl mt-3 text-gray-800 dark:text-white">X</div>
                        <div class="flex flex-row items-center mt-3 relative bg-[rgb(var(--color-bg))]">
                            <input type="number" v-model="weight" class="p-3 z-0 text-2xl w-[80px] h-10 outline-none rounded mr-2 text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]" />
                            <span class="mr-2 text-2xl text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">{{ $t('кг') }}</span>
                        </div>
                        <div class="text-4xl text-gray-800 dark:text-white">=</div>
                        <div class="text-4xl mt-3">{{ country.price_per * weight }}$</div>
                    </div>
                </div>
            </div>
    </AtomsContainer>
</section></template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            countries: [],
            countryShow: false,
            country: {code: ''},
            weight: 3,
        }
    },
    async mounted() {
        const { data } = await axios.get("https://api.onson-mail.uz/api/company/api-onson-mail-cargo/country/")
        this.countries = data
        this.country = this.countries[0]
    }
}
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
</style>