<template>

  <div class="relative pt-3 pl-3">
    <div aria-hidden="true" class="absolute inset-y-0 w-44 left-0 hidden dark:flex">
      <div
          class="h-full md:h-1/2 lg:h-full w-full bg-gradient-to-tr opacity-40 dark:blur-2xl dark:from-[#570cac] dark:opacity-20">
      </div>
    </div>
    <div class="flex flex-row justify-between w-full">
      <div class="flex justify-center items-center md:flex-row flex-col">
        <h2 class="text-center md:text-2xl text-lg md:font-bold font-normal md:mr-5 mb-1 text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">{{$t('Время сухура')}}</h2>
        <span class="text-center flex flex-row items-center md:text-5xl text-2xl dark:text-white" style="font-weight: bolder">
          <img src="/icons/sun-up.webp" alt="" width="45" class="mr-1">
          {{ item.time ?? '-' }}
        </span>
      </div>
      <div class="flex justify-center items-center md:flex-row flex-col">
        <h2 class="text-center md:text-2xl text-lg md:font-bold font-normal md:mr-5 mb-1 text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">{{$t('Время ифтара')}}</h2>
        <span class="text-center flex flex-row items-center md:text-5xl text-2xl dark:text-white" style="font-weight: bolder">
          <img src="/icons/sun-down.webp" alt="" width="45" class="mr-1">
          {{ item.end_time ?? '-'  }}
        </span>
      </div>
      <div>
        <img width="75" src="/images/roza.svg" alt="test">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ramazon',
  props: ['item']
};
</script>
