<template>
  <Loading :loading="isFetching">
    <swiper :effect="'fade'" :autoplay="{delay: 8000}" :modules="[EffectFade, Autoplay]" class="w-full lg:h-[700px] h-screen">
      <swiper-slide v-for="tour in data?.results" :key="tour.id">
        <div class="img" :style="`background-image: url(${tour.images[0]?.image})`">
          <div class="absolute top-[100px] left-1/2 transform -translate-x-1/2 bg-primary-400 p-4 bg-opacity-60 w-[80%] lg:h-[300px]">
            <h1 class="lg:text-4xl text-2xl font-bold text-white">{{ tour[`title_${$i18n.locale}`] ?? tour.title }}</h1>
            <div class="p-1 line-clamp-3 rounded-lg text-white" v-html="tour[`description_${$i18n.locale}`] ?? tour.description" />
            <div class="flex justify-end mt-8 items-end">
              <Button :label="$t('Читать далее')" />
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </Loading>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/vue-query';
import TourismService from '@/services/tourism';
import type { LimitOffsetPagination } from '~/types';
import type { Tour } from '~/types/tourism';

const tourismService = new TourismService();

const {data, isFetching} = useQuery({
    queryKey: computed(() => ['tourism_tours_last_5']),
    queryFn: async () => await tourismService.tour.list<LimitOffsetPagination<Tour>>({limit: 5})
})
</script>
<style>
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #444;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide .img {
  display: block;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
}

</style>