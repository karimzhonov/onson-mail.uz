<template>
  <Banner class="hidden md:flex" />
  <Header />
  <div class="relative w-full h-full min-h-[82vh] pt-3 gap-4 flex flex-row max-w-screen-lg lg:max-w-screen-xl mx-auto">
    <AppSidebar class="w-[400px] hidden md:block" />
    <div class="bg-surface-50 rounded-lg p-3 w-full md:h-auto">
      <slot v-if="auth" />
      <div v-else class="h-screen flex items-center flex-col pt-24">
        <h2 class="text-2xl font-bold text-center">{{ $t('Вы не авторизованы') }}</h2>
        <p class="text-center">{{ $t('Для доступа к личному кабинету необходимо') }}
          <NuxtLink :to="login" class="text-primary font-bold">{{ $t('войти') }}</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { token } from '~/composables';
import { LoaderCircle } from "lucide-vue-next";
import {useUser} from '@/store/user'

export default {
  data() {
    return {
      auth: false,
    }
  },
  components: { LoaderCircle },
  computed: {
    login: () => useUser().loginUrl()
  },
  mounted() {
    if (token.value.access) {
      this.auth = true
    }
  }
}
</script>