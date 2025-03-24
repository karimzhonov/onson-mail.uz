<template>
    <button @click="toggle"
        class="hidden md:block outline-none bg-transparent p-2.5 rounded-full text-gray-600  hover:bg-gray-100">
        <Avatar v-if="user.id" :label="user.first_name[0]" class="cursor-pointer" shape="circle" />
        <CircleUserRound class="size-7 text-gray-700 cursor-pointer" v-else />
    </button>
    <Popover ref="user">
        <div class="flex flex-row">          
            <Menu :model="items" class="!border-0">
                <template #start>
                    <button v-if="user.id" @click="() => $router.push(useLocalePath()('/profile'))" v-ripple class="relative overflow-hidden w-full border-0 bg-transparent flex items-center p-2 pl-4 hover:bg-surface-100 rounded-none cursor-pointer transition-colors duration-200">
                        <Avatar :label="user.first_name[0]" class="mr-2 cursor-pointer" shape="circle" @click="toggle" />
                        <span class="inline-flex flex-col items-start">
                            <span class="font-bold">{{user.first_name}} {{ user.last_name }}</span>
                        </span>
                    </button>
                </template>
                <template #item="{ item, props }">
                    <a v-ripple class="flex items-center" v-bind="props.action">
                        <component :is="item.icon" />
                        <span>{{ $t(item.label) }}</span>
                    </a>
                </template>
            </Menu>
        </div>
    </Popover>
</template>
<script>
import { useUser } from "@/store/user"
import { token } from '~/composables'
import { LogOut,LogIn, CircleUserRound, Home, ShoppingBag, Package, IdCard } from 'lucide-vue-next'
export default {
    data() {
        return {
            items: [
                {
                    label: this.$t('Главная'),
                    icon: Home,
                    command: () => {
                        this.$router.push(useLocalePath()('/my'))
                    }
                },
                {
                    label: this.$t('Заказы'),
                    icon: Package,
                    command: () => {
                        this.$router.push(useLocalePath()('/my/order'))
                    }
                },
                {
                    label: this.$t('Паспортные данные'),
                    icon: IdCard,
                    command: () => {
                        this.$router.push(useLocalePath()('/my/passport'))
                    }
                },
                {
                    label: this.$t('Магазин'),
                    icon: ShoppingBag,
                    command: () => {
                        this.$router.push(useLocalePath()('/shop'))
                    },
                    badge: 'Скоро'
                },
                {
                    label: this.user?.id ? this.$t('Выйти') : this.$t('Войти'),
                    icon: this.user?.id ? LogOut : LogIn,
                    command: () => {
                        if (this.user?.id) {
                            useUser().logout()
                        } else {
                            useUser().login()
                        }
                        
                    }
                },
            ]
        }
    },
    components: { LogOut, CircleUserRound },
    async mounted() {
        await useUser().fetch_user()
    },
    computed: {
        user: () => useUser().user
    },
    methods: {
        toggle(event) {
            return this.$refs.user.toggle(event)
        }
    }
}
</script>