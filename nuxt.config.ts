// https://nuxt.com/docs/api/configuration/nuxt-config
import Preset from "./theme";

export default defineNuxtConfig({
  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    '@nuxtjs/leaflet',
    '@nuxtjs/color-mode',
    '@artmizu/yandex-metrika-nuxt'
  ],
  ssr: true,
  runtimeConfig: {
    public: {
      NUXT_APP_BACKEND_HOST: process.env.NUXT_APP_BACKEND_HOST,
      VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
    }
  },  
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  yandexMetrika: {
    id: '100554141',
  },

  primevue: {
    autoImport: true,
    options: {
      ripple: true,
      theme: Preset,
      locale: {
        fileSizeTypes: [],
        firstDayOfWeek: 1, // 0 = Sunday, 1 = Monday
        dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
        today: 'Сегодня',
        clear: 'Очистить'
      }
    },
  },

  i18n: {
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'ru', language: 'ru', name: 'Русский', file: 'ru.json', cache: false },
      { code: 'uz', language: 'uz', name: 'O\'zbek', file: 'uz.json', cache: false }
    ],
    defaultLocale: 'ru'
  },

  compatibilityDate: '2025-03-19',
});