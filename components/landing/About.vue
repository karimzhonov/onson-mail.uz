<template>
    <section class="pt-20 md:pt-24" id="about">
            <div class="grid md:grid-cols-2 gap-10 xl:gap-14 relative">
                <div class="flex md:h-full ">
                    <div
                        class="animate-fade-right w-full md:h-full rounded-3xl bg-white  shadow-lg shadow-box-shadow border border-box-border">
                        <img src="/images/about.jpg" alt="Illustratuin about" width="500"
                            class="w-full h-full object-cover rounded-2xl">
                    </div>
                </div>
                <div class="md:py-2 lg:py-4 relative">
                    <div class="absolute right-0 top-0 h-full w-full flex justify-end">
                        <span class="flex opacity-20">
                            <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
                            <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
                        </span>
                    </div>
                    <div class="relative">
                        <h2 class="text-4xl font-bold">{{ $t('Мы продолжаем расти и достигать новых высот вместе с нашими клиентами! 🚀') }}</h2>
                        <div class="grid grid-cols-3 gap-4 max-w-lg pt-8">
                            <div
                                class="text-center rounded-xl bg-box-bg shadow-lg shadow-box-shadow border border-box-border p-3">
                                <h3 class="text-gray-800  font-bold text-xl sm:text-2xl lg:text-3xl">10 000+
                                </h3>
                                <p class="text-sm sm:text-base text-gray-600 " lang="ru" style="word-wrap: break-word;hyphens: auto;">
                                  {{ $t('тонн успешно доставленного груза за месяц') }}</p>
                            </div>
                            <div
                                class="text-center rounded-xl bg-box-bg shadow-lg shadow-box-shadow border border-box-border p-3">
                                <h3 class="text-gray-800  font-bold text-xl sm:text-2xl lg:text-3xl">1 000+</h3>
                                <p class="text-sm sm:text-base text-gray-600 " lang="ru" style="word-wrap: break-word;hyphens: auto;">
                                  {{ $t('организованных туров') }}</p>
                            </div>
                            <div
                                class="text-center rounded-xl bg-box-bg shadow-lg shadow-box-shadow border border-box-border p-3">
                                <h3 class="text-gray-800  font-bold text-xl sm:text-2xl lg:text-3xl">100+
                                </h3>
                                <p class="text-sm sm:text-base text-gray-600 " lang="ru" style="word-wrap: break-word;hyphens: auto;">
                                  {{ $t('успешных бизнес - стратегий внедрено') }}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
    </section>
</template>