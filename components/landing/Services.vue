<template>
    <section id="services" class="pt-20 md:pt-24 relative">
        <div class="flex justify-between items-center pb-6">
            <h2 class="text-4xl font-bold">{{ $t('Наши услуги') }}</h2>
        </div>
        <div class="relative">
            <div class="flex items-stretch gap-5 overflow-hidden overflow-x-auto w-full flex-wrap lg:flex-nowrap">
                <div v-for="it, i in items" :key="it.title"
                    class="w-full md:w-[48%] lg:w-1/4 animate-fade-up animate-duration-500"
                    :style="`animation-delay: ${300 * i}ms`">
                    <LandingServiceCard :title="$t(it.title)" @click="modal = true; item = it" :desc="$t(it.desc)"
                        :cover-image="it.image" />
                </div>
            </div>
        </div>

        <Dialog v-model:visible="modal" modal :header="$t(item.title ?? '')" :style="{ width: '25rem' }">
            <div>
                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ item.desc }}</p>
                <ul class="my-4 space-y-3">
                    <li v-for="link in item.links">
                        <a :href="link.link" target="_blank"
                            class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                            <img :src="link.icon" height="35" width="35" />
                            <span class="flex-1 ms-3 whitespace-nowrap">{{ $t(link.name) }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </Dialog>
    </section>
</template>
  
<script>
export default {
    data() {
        return {
            modal: false,
            item: { title: '', desc: '', links: [] },
            items: [
                {
                    title: 'Туризм',
                    desc: 'Индивидуальные и корпоративные туры',
                    image: '/images/turizm.webp',
                    links: [
                        {
                            icon: '/icons/Telegram.svg',
                            name: 'Telegram',
                            link: 'https://t.me/onsonmailtour'
                        },
                        {
                            icon: '/icons/Instagram.svg',
                            name: 'Instagram',
                            link: 'https://www.instagram.com/onsonmailtour/'
                        },
                        {
                            icon: '/icons/phone.webp',
                            name: 'Телефон',
                            link: '+998773713999'
                        },
                        {
                            icon: '/icons/safari.svg',
                            name: 'Сайт',
                            link: 'https://onsontour.uz/'
                        }
                    ]
                },
                {
                    title: 'Карго',
                    desc: 'Надежные и оперативные грузоперевозка',
                    image: '/images/plane.jpeg',
                    links: [
                        {
                            icon: '/icons/Telegram.svg',
                            name: 'Telegram',
                            link: 'https://t.me/onsonmail_info'
                        },
                        {
                            icon: '/icons/Instagram.svg',
                            name: 'Instagram',
                            link: 'https://www.instagram.com/onson.mail/'
                        },
                        {
                            icon: '/icons/phone.webp',
                            name: 'Телефон',
                            link: '+998555111999'
                        }
                    ]
                },
                {
                    title: 'Таможенное оформление',
                    desc: 'Быстрое и эффективное',
                    image: '/images/custom.webp',
                    links: [
                        {
                            icon: '/icons/Telegram.svg',
                            name: 'Telegram',
                            link: 'https://t.me/onsonmailuz'
                        },
                        {
                            icon: '/icons/Instagram.svg',
                            name: 'Instagram',
                            link: 'https://www.instagram.com/onson.mail/'
                        },
                        {
                            icon: '/icons/phone.webp',
                            name: 'Телефон',
                            link: '+998555111999'
                        },
                        {
                            icon: '/icons/safari.svg',
                            name: 'Сайт',
                            link: '/customs'
                        }
                    ]
                },
                {
                    title: 'Консалтинг',
                    desc: 'Профессиональные услуги',
                    image: '/images/consalting.jpg',
                    links: [
                        {
                            icon: '/icons/Telegram.svg',
                            name: 'Telegram',
                            link: 'https://t.me/onsonmailuz'
                        },
                        {
                            icon: '/icons/Instagram.svg',
                            name: 'Instagram',
                            link: 'https://www.instagram.com/onson.mail/'
                        },
                        {
                            icon: '/icons/phone.webp',
                            name: 'Телефон',
                            link: '+998555111999'
                        }
                    ]
                }
            ]
        }
    }
}
</script>