<template>
    <div
        class="bg-gradient-to-tl from-green-400 to-indigo-900 px-6 py-20 md:px-12 lg:px-20 h-screen flex flex-col justify-center items-center">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border max-w-[500px] w-full lg:w-6/12 mx-auto">
            <div class="mb-8">
                <Logo class="w-32 mx-auto logo-spin" />
            </div>

            <div class="flex flex-col gap-3 items-center">
                <AuthTelegramAuthButton />
                <AuthGoogleAuthButton />
            </div>

            <div class="w-full flex items-center justify-between py-5">
                <hr class="w-full border-gray-500">
                <p class="text-base font-medium leading-4 px-2.5 text-gray-400">{{ $t('ИЛИ') }}</p>
                <hr class="w-full border-gray-500">
            </div>
            <Loading :loading="isPending" class="min-h-[200px] !h-fit">
                <Message v-if="isError" severity="error" class="my-3">{{ formatError(error) }}</Message>
                <Form @submit="mutate" class="flex flex-col gap-8">
                    <FloatLabel>
                        <label for="phone">{{ $t('Номер телефон') }}</label>
                        <InputText name="phone" fluid required />
                    </FloatLabel>
                    
                    <FloatLabel>
                        <label for="password">{{ $t('Пароль') }}</label>
                        <InputText name="password" type="password" fluid required />
                    </FloatLabel>
                    <Button type="submit" :label="$t('Продолжить')" icon="pi pi-user !text-xl !leading-none" class="w-full" />
                </Form>
            </Loading>

        </div>
    </div>
</template>
<script setup lang="ts">
import { formatError } from "~/shared/error";
import { useAuth } from "~/hooks/user/auth";

definePageMeta({
    layout: false
})


useHead({
    title: 'Onson Mail :: Авторизация',
    meta: [
        { name: 'description', content: 'Авторизация' },
    ],
})

const { mutate, isPending, error, isError } = useAuth()

</script>
<style>
@keyframes sidebar-spinY {
    0% {
        transform: rotateY(0deg);
    }

    15% {
        transform: rotateY(360deg);
    }

    100% {
        transform: rotateY(360deg);
    }

    /* остановка */
}

.logo-spin {
    animation: sidebar-spinY 10s linear infinite;
    transform-style: preserve-3d;
}
</style>