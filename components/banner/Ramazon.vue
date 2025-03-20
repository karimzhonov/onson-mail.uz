<template>
  <div class="flex flex-row justify-between w-full px-3">
    <div class="flex justify-center items-center flex-col md:flex-row w-1/2">
      <h2 class="text-center md:text-2xl text-md font-bold md:mr-5 mb-1 text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">{{$t('Время сухура')}}</h2>
      <span class="text-center flex flex-row items-center md:text-5xl text-2xl dark:text-white" style="font-weight: bolder">
        <img src="/icons/sun-up.webp" alt="" width="45" class="mr-1">
        {{ item.time ?? '-' }}
      </span>
    </div>
    <div class="flex justify-center items-center flex-col md:flex-row w-1/2">
      <h2 class="text-center md:text-2xl text-md font-bold md:mr-5 mb-1 text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#8cd66a]">{{$t('Время ифтара')}}</h2>
      <span class="text-center flex flex-row items-center md:text-5xl text-2xl dark:text-white" style="font-weight: bolder">
        <img src="/icons/sun-down.webp" alt="" width="45" class="mr-1">
        {{ item.end_time ?? '-'  }}
      </span>
    </div>
    <div>
      <img width="75" src="/images/roza.svg" alt="test">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ramazon',
  props: ['item']
};
</script>
