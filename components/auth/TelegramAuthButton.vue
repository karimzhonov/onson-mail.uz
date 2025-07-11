<template>
    <TelegramLoginWidget mode="callback" telegram-login="rpatm_bot"
        requestAccess="write" size="large" class="flex justify-center" 
        @callback="mutate" radius="20" :disabled="isPending"/>
</template>
<script lang="ts" setup>
import { useTelegramAuth } from '~/hooks/user/auth'

const { mutate, isPending } = useTelegramAuth()
</script>