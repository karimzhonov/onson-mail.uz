<template>
    <section class="mt-2" id="tracker">
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
                <div class="mx-auto text-center relative">

                    <h2 v-if="useI18n().locale.value === 'uz'" class="text-gray-800 pt-4  font-bold text-4xl md:text-5xl lg:text-6x">
                       <span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">Yukingizni</span>
                        kuzatib boring
                    </h2>
                    <h2 v-else class="text-gray-800 pt-4  font-bold text-4xl md:text-5xl lg:text-6x">
                        Отслеживайте свою
                        <span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">посылку</span>
                    </h2>
                    <p class="text-gray-600  pt-8 mx-auto max-w-xl">
                        {{$t('track_desc')}}
                    </p>
                    <div class="mx-auto max-w-md sm:max-w-xl pt-5">
                        <div class="flex items-center relative gap-x-2">
                            <input v-model="number" type="text" :placeholder="$t('Введите номер отслеживания')" @keydown.enter="fetch_order"
                                class="outline-none border-2 border-transparent focus:border-primary bg-body text-gray-600  rounded-3xl px-6 py-3 w-full">
                            <div
                                class="sm:inline-flex sm:min-w-max absolute sm:relative top-0.5 right-0.5 sm:top-0 sm:right-0">
                                <button class="min-w-max p-3 sm:py-3 sm:px-6 text-white border-2 border-transparent relative group" @click="fetch_order">
                                    <span
                                        class="absolute inset-0 rounded-full group-hover:scale-105 origin-center transition-all ease-in-out bg-primary"></span>
                                    <span aria-hidden="true" class="relative hidden sm:flex">
                                        {{ $t('Отслеживать') }}
                                    </span>
                                    <span class="relative flex sm:hidden">
                                        <SendHorizonal v-if="!order?.number" />
                                        <X v-else/>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="mx-auto max-w-md sm:max-w-4xl mt-3 flex justify-between md:flex-row flex-col-reverse" v-if="order">
                        <div>
                            <div class="flex mb-2">    
                                <p class="text-gray-600  text-xl" style="text-wrap: nowrap">{{$t('Hомер отслеживания')}}: </p>
                                <p class="font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a] ml-2 text-xl" style="text-wrap: nowrap">{{ order.number }}</p>
                            </div>

                            <div class="flex mb-2">    
                                <p class="text-gray-600  text-xl flex" style="text-wrap: nowrap">{{$t('ФИО')}}:</p>
                                <p class="font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a] ml-2 text-xl" lang="ru" style="word-wrap: break-word;hyphens: auto;">{{ order.fio }} </p>
                            </div>
                            
                            <div class="flex mb-2">    
                                <p class="text-gray-600  text-xl flex" style="text-wrap: nowrap">{{$t('Вес товара')}}:</p>
                                <p class="font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a] ml-2 text-xl" lang="ru" style="word-wrap: break-word;hyphens: auto;">{{ order.weight }} {{ $t('кг') }} </p>
                            </div>

                            <div class="flex mb-2">    
                                <p class="text-gray-600  text-xl flex" style="text-wrap: nowrap">{{$t('Оплата за доставку')}}:</p>
                                <p class="font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a] ml-2 text-xl" lang="ru" style="word-wrap: break-word;hyphens: auto;">{{ order.delivery_price }} $ </p>
                            </div>

                            <div class="flex flex-col mb-2" v-if="order.products.length > 0">    
                                <p class="text-gray-600  text-xl flex" style="text-wrap: nowrap">{{$t('Товары')}}:</p>
                                <div class="overflow-x-auto w-full">
                                    <table class="mt-3 w-full text-sm text-left text-gray-600 ">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    {{ $t('Наименование товара') }}
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    {{ $t('Цена за ед.') }}
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    {{ $t('Кол-во') }}
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    {{ $t('Общая стоимость') }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="pio in order.products" class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                    {{ pio.product.name }}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {{ pio.product.price }}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {{ pio.count }}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {{ pio.total_price }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="text-gray-600  md:w-[350px] mb-3">
                            <div class="flex flex-row m-3 py-3" v-for="step in steps" :class="{'opacity-60': order.status !== step.step}">
                                <div class="flex flex-col items-center">
                                    <div class="w-12 h-12 rounded-[50%] bg-gray-200 text-white flex justify-center items-center" :class="{'!bg-green-500': order.status === step.step}">
                                        <component class="w-6 h-6" :is="step.icon" :class="{'!text-green-500': order.status !== step.step}"/>
                                    </div>
                                    <p class="w-[100px] text-sm mt-1"><i class="text-wrap">{{ order[step.step] }}</i></p>
                                </div>
                                
                                <div class="flex flex-col justify-center w-full">
                                    <h2 class="font-bold text-green-500 text-lg">{{ $t(step.title) }}</h2>
                                    <p class="text-xs">{{ $t(step.description) }}</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="mx-auto max-w-md sm:max-w-xl mt-10" v-if="error">
                        <p class="font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">{{$t('order_not_found')}}</p>
                    </div>
                </div>
            </div>
    </section>
</template>
<script>
import {order_steps} from "@/components/order/utils"
import { SendHorizonal, X } from "lucide-vue-next"

export default {
    data() {
        return {
            number: null,
            order: null,
            error: false,
            steps: order_steps
        }
    },
    components: {SendHorizonal, X},
    computed: {
        status() {
            return this.steps.find(v => v.step === this.order.status)
        }
    },
    methods: {
        async fetch_order() {
            this.error = false
            if (!this.number) return
            if (this.order?.number) {
                this.order = null
                this.number = null
                return
            }
            try {
                const response = await this.$api.get(`/cargo/order/number/${this.number}/`)
                this.order = response.data
            } catch {
                this.error = true
            }

        }
    }
}
</script>