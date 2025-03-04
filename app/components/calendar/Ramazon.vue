<template>
  <div class="absolute top-0 inset-x-0 h-64 flex items-start">
    <div
        class="h-24 w-2/3 bg-gradient-to-br from-primary opacity-20 blur-2xl dark:from-[#570cac] dark:invisible dark:opacity-40">
    </div>
    <div
        class="h-20 w-3/5 bg-gradient-to-r from-[#8cd66a] opacity-40 blur-2xl dark:from-[#670ccf] dark:opacity-40">
    </div>
  </div>
  <div class="relative pt-3 pl-3">
    <div aria-hidden="true" class="absolute inset-y-0 w-44 left-0 hidden dark:flex">
      <div
          class="h-full md:h-1/2 lg:h-full w-full bg-gradient-to-tr opacity-40 dark:blur-2xl dark:from-[#570cac] dark:opacity-20">
      </div>
    </div>
    <div class="flex flex-row justify-between w-full">
      <div class="flex justify-center flex-col ml-3">
        <h2 style="font-size: 16px; font-weight: 400" class="text-center mb-1">{{$t('Время сухара')}}</h2>
        <span class="text-center flex flex-row items-center" style="font-size: 25px; font-weight: bolder">
          <img src="/icons/sun-up.webp" alt="" width="45" class="mr-1">
          {{ item.time ?? '-' }}
        </span>
      </div>
      <div class="flex justify-center flex-col">
        <h2 style="font-size: 16px; font-weight: 400" class="text-center mb-1">{{$t('Время ифтара')}}</h2>
        <span class="text-center flex flex-row items-center" style="font-size: 25px; font-weight: bolder">
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
