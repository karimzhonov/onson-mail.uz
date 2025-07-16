<template>
    <div
        class="bg-gradient-to-tl from-green-400 to-indigo-900 px-6 py-20 md:px-12 lg:px-20 h-screen flex flex-col justify-center items-center">
        <AuthForm @login="user.redirect" />
    </div>
</template>
<script setup lang="ts">
import { useUser } from '~/store/user';

definePageMeta({
    layout: false
})

const user = useUser()

useHead({
    title: 'Onson Mail :: Авторизация',
    meta: [
        { name: 'description', content: 'Авторизация' },
    ],
})


</script>