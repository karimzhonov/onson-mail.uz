<template>
  <section id="services" class="pt-20 md:pt-24 relative">
    <AtomsContainer>
      <div class="flex justify-between items-center pb-6">
        <div class="">
          <AtomsTitle :texte="$t('Наши услуги')"/>
        </div>
      </div>
      <div class="relative">
        <div data-slide-recent @scroll="initScroll()"
             class="flex items-stretch gap-5 overflow-hidden overflow-x-auto w-full flex-wrap lg:flex-nowrap">

          <div v-for="it in items" :key="it.title" class="w-full md:w-[48%] lg:w-1/4">
            <CardsRecentPod :title="$t(it.title)" duration="12min" @click="modal = true; item=it"
                            :desc="$t(it.desc)"
                            :cover-image="it.image"/>
          </div>
        </div>
      </div>
    </AtomsContainer>

    <div id="crypto-modal" tabindex="-1" aria-hidden="true" style="opacity: 90%" :class="{hidden: !modal}"
         class="z-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 justify-center items-center w-full md:inset-0 h-full dark:bg-body">
    </div>
    <div v-if="modal" id="crypto-modal" tabindex="-1" aria-hidden="true" :class="{hidden: !modal}"
         class="z-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="z-70 absolute p-4 w-full max-w-md max-h-full"
           style="transform: translate(-50%, -50%); top: 50%; left: 50%">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <!-- Modal header -->
          <div
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ $t(item.title) }}
            </h3>
            <button type="button" @click="modal = false"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crypto-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <p class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ item.desc }}</p>
            <ul class="my-4 space-y-3">
              <li v-for="link in item.links">
                <a :href="link.link" target="_blank"
                   class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <img :src="link.icon" height="35" width="35"/>
                  <span class="flex-1 ms-3 whitespace-nowrap">{{ $t(link.name) }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

// const scrollLeft = useState('scrollLeft', ()=> 0)
const nextIsVisible = useState('nextIsVisible', () => false)
const prevIsVisible = useState('prevIsVisible', () => false)
const modal = useState('modal', () => false)
const item = ref({links: []})
const items = ref([
  {
    title: 'Туризм',
    desc: 'Индивидуальные и корпоративные туры',
    image: '/images/turizm.webp',
    links: [
      {
        icon: '/Telegram.svg',
        name: 'Telegram',
        link: ''
      },
      {
        icon: '/Instagram.svg',
        name: 'Instagram',
        link: ''
      },
      {
        icon: '/phone.webp',
        name: 'Телефон',
        link: ''
      },
      {
        icon: '/safari.svg',
        name: 'Сайт',
        link: '/customs'
      }
    ]
  },
  {
    title: 'Карго',
    desc: 'Надежные и оперативные грузоперевозка',
    image: '/images/plane.jpeg',
    links: [
      {
        icon: '/Telegram.svg',
        name: 'Telegram',
        link: ''
      },
      {
        icon: '/Instagram.svg',
        name: 'Instagram',
        link: ''
      },
      {
        icon: '/phone.webp',
        name: 'Телефон',
        link: ''
      }
    ]
  },
  {
    title: 'Таможенное оформление',
    desc: 'Быстрое и эффективное таможенное оформление',
    image: '/images/custom.webp',
    links: [
      {
        icon: '/Telegram.svg',
        name: 'Telegram',
        link: ''
      },
      {
        icon: '/Instagram.svg',
        name: 'Instagram',
        link: ''
      },
      {
        icon: '/phone.webp',
        name: 'Телефон',
        link: ''
      }
    ]
  },
  {
    title: 'Консалтинг',
    desc: 'Профессиональные услуги консалтинга',
    image: '/images/consalting.jpg',
    links: [
      {
        icon: '/Telegram.svg',
        name: 'Telegram',
        link: ''
      },
      {
        icon: '/Instagram.svg',
        name: 'Instagram',
        link: ''
      },
      {
        icon: '/phone.webp',
        name: 'Телефон',
        link: ''
      }
    ]
  }
])

let element: HTMLDivElement
if (typeof document !== "undefined") {
  element = document.querySelector("[data-slide-recent]") as HTMLDivElement
}

function initScroll(): void {
  if (typeof element === "undefined" || element === null) {
    return
  }
  prevIsVisible.value = element.scrollLeft > 0
  nextIsVisible.value = element.scrollLeft < element.scrollWidth - element.offsetWidth - 1
}

function scrollToLeft(): void {
  if (typeof element === "undefined" || element === null) {
    return
  }
  element.scrollLeft -= element.clientWidth
}

function scrollToRight(): void {
  if (typeof element === "undefined" || element === null) {
    return
  }
  element.scrollLeft += element.clientWidth
}

onMounted(() => {
  if (window !== null) {
    initScroll()
  }
})
</script>