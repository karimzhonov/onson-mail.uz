<template>
    <button @click="toggle"
        class="hidden md:block outline-none bg-transparent p-2.5 rounded-full text-gray-600  hover:bg-gray-100">
        <CircleUserRound class="size-7 text-gray-700 cursor-pointer" />
    </button>
    <Popover ref="user">
        <div class="flex flex-row">          
            <Menu :model="items" class="!border-0">
                <template #start>
                    <button v-if="isAuth" class="relative overflow-hidden w-full border-0 bg-transparent flex items-center p-2 pl-4 hover:bg-surface-100 rounded-none cursor-pointer transition-colors duration-200">
                        <Avatar :label="userStore.user?.first_name[0]" class="mr-2 cursor-pointer" shape="circle" @click="toggle" />
                        <span class="inline-flex flex-col items-start">
                            <span class="font-bold">{{userStore.user?.first_name}} {{ userStore.user?.last_name }}</span>
                        </span>
                    </button>
                </template>
                <template #item="{ item, props }">
                    <a v-ripple class="flex items-center" v-bind="props.action">
                        <component :is="item.licon" />
                        <span>{{ $t(item.label as string) }}</span>
                    </a>
                </template>
            </Menu>
        </div>
    </Popover>
</template>
<script setup lang="ts">
import { useUser } from "@/store/user"

import { LogOut,LogIn, CircleUserRound, Home, ShoppingBag, Package, IdCard } from 'lucide-vue-next'
import type { PopoverMethods } from "primevue/popover"
import { useGetMe } from "~/hooks/user"

const user = ref<PopoverMethods>()
const userStore = useUser()

useGetMe({
    select: (user) => {
        userStore.user = user
        return user
    }
})

function toggle(event: Event) {
    return user.value?.toggle(event)
}

const isAuth = computed(userStore.isAuth)

const items = computed(() => [
    {
        label: 'Главная',
        licon: Home,
        command: () => {
            navigateTo(useLocalePath()('/my'))
        }
    },
    {
        label: 'Заказы',
        licon: Package,
        command: () => {
            navigateTo(useLocalePath()('/my/order'))
        }
    },
    {
        label: 'Паспортные данные',
        licon: IdCard,
        command: () => {
            navigateTo(useLocalePath()('/my/passport'))
        }
    },
    {
        label: 'Магазин',
        licon: ShoppingBag,
        command: () => {
            navigateTo(useLocalePath()('/shop'))
        },
        badge: 'Скоро'
    },
    {
        label: isAuth.value ? 'Выйти' : 'Войти',
        licon: isAuth.value ? LogOut : LogIn,
        command: () => {
            if (isAuth.value) {
                useUser().logout()
            } else {
                useUser().login()
            }
        }
    },
])

</script>