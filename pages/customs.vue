<template>
    <section class="py-20 md:pt-24" id="records">
        <div class="absolute top-0 inset-x-0 h-64 flex items-start">
            <div
                class="h-24 w-2/3 bg-gradient-to-br from-primary opacity-20 blur-2xl dark:from-[#570cac] dark:invisible dark:opacity-40">
            </div>
            <div
                class="h-20 w-3/5 bg-gradient-to-r from-[#8cd66a] opacity-40 blur-2xl dark:from-[#670ccf] dark:opacity-40">
            </div>
        </div>
        <AtomsContainer>
            <div class="grid md:grid-cols-2 gap-10 xl:gap-14 relative md:grid-flow-col-dense mb-3">
                <div class="md:py-2 lg:py-4 relative order-2 md:order-1">
                    <div class="absolute left-0 top-0 h-full w-full flex justify-end">
                        <span class="flex opacity-20">
                            <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
                            <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
                        </span>
                    </div>
                    <div class="relative">
                        <AtomsTitle :texte="$t('Таможенное оформление «Под Ключ»')" />
                        <p class="text-gray-600 dark:text-gray-300 pt-8">
                            {{$t('Компания Proexport Limited предоставляет Полный спектр услуг по таможенной очистке груза в Узбекистане.')}}
                        </p>
                        <div class="space-y-4 pt-8">
                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Получение сопроводительных документов на станциях прибытия груза и таможенных постах.') }}</h3>
                            </div>
                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Декларирование товара.') }}</h3>
                            </div>
                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Оформление заявок и разрешительных документов в советующих органах сертификации.') }}</h3>
                            </div>
                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Определение таможенной стоимости.') }}</h3>
                            </div>
                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Предварительный расчет таможенных платежей.') }}</h3>
                            </div>
                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Предварительная проверка и контроль сопроводительных документов на груз.') }}</h3>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="flex md:h-full relative order-1 md:order-2">
                    <div
                            class="absolute z-0 top-1/2  -translate-y-1/2 w-5/6 right-0 h-[calc(80%+20px)] bg-gradient-to-tr opacity-25 from-primary to-pink-300 dark:from-[#570cac] dark:to-primary blur-2xl">
                        </div>
                    <div class="w-full h-[27rem] sm:h-[30rem] md:h-full flex justify-center md:justify-end relative pb-5">
                        <img src="/images/customs2.jpg" alt="Illustratuin about" width="500"
                            class="w-11/12 lg:w-5/6 h-full object-cover rounded-t-[5rem] rounded-b-[5rem] md:rounded-t-[5rem] md:rounded-b-[5rem] lg:rounded-t-[5rem] lg:rounded-b-[5rem]">
                    </div>
                </div>
            </div>
        </AtomsContainer>

        <AtomsContainer>
            <div class="grid md:grid-cols-2 gap-10 xl:gap-14 relative md:grid-flow-col-dense pt-5">
                <div class="md:py-2 lg:py-4 relative order-2 md:order-2">
                    <div class="absolute left-0 top-0 h-full w-full flex justify-end">
                        <span class="flex opacity-20">
                            <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
                            <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
                        </span>
                    </div>
                    <div class="relative">
                        <div class="space-y-4 pt-8">
                            
                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Консультация по таможенному законодательству РУз.') }}</h3>
                            </div>

                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Участие в таможенном досмотре груза.') }}</h3>
                            </div>

                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Регистрация и ведение контракта в ЕЭИСВО.') }}</h3>
                            </div>

                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Определение кода ТНВЭД') }}</h3>
                            </div>

                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Помощь в получении заключения экспертизы по коду ТНВЭД') }}</h3>
                            </div>

                            <div class="p-4 rounded-xl border border-box-border transition hover:bg-gray-200 dark:hover:bg-box-bg">
                                <h3 class="text-gray-700 dark:text-gray-200 font-semibold text-xl">{{ $t('Маркировка ASL Belgisi.') }}</h3>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="flex md:h-full relative order-1 md:order-1">
                    <div
                            class="absolute z-0 top-1/2  -translate-y-1/2 w-5/6 left-0 h-[calc(80%+20px)] bg-gradient-to-tr opacity-25 from-primary to-pink-300 dark:from-[#570cac] dark:to-primary blur-2xl">
                        </div>
                    <div class="w-full h-[27rem] sm:h-[30rem] md:h-full flex justify-center relative pb-5">
                        <img src="/images/customs.jpg" alt="Illustratuin about" width="500"
                            class="w-11/12 lg:w-5/6 h-full object-cover rounded-t-[5rem] rounded-b-[5rem] md:rounded-t-[5rem] md:rounded-b-[5rem] lg:rounded-t-[5rem] lg:rounded-b-[5rem]">
                    </div>
                </div>
            </div>
        </AtomsContainer>
    </section>
</template>