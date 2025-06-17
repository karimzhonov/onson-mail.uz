<template>
    <div class="p-2 sticky flex justify-center bg-orange-400 text-white items-center">
        <p class="text-wrap">{{$t('Заметили неисправность на сайте или есть идея для улучшения, сообщите об этом')}}.
            <a class="text-blue-400" href="https://t.me/onson_mail_support" target="_blank" rel="noopener">Telegram <SquareArrowOutUpRight class="inline size-4" /></a>
        </p>
    </div>
</template>
<script setup>
import {SquareArrowOutUpRight} from "lucide-vue-next"
</script>