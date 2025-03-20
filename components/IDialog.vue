<script setup>
import { useMediaQuery } from '@vueuse/core'

const isDesktop = useMediaQuery('(min-width: 768px)')
const emits = defineEmits(['update:open'])
const modal = defineModel({default: false})
</script>

<template>
  <Dialog class="max-w-[80vw] max-h-[80vh]" v-if="isDesktop" modal v-model:visible="modal" @update:visible="v => emits('update:open', v)">
    <template #header>
      <slot name="header" />
    </template>
    <slot />
  </Dialog>

  <Drawer v-else class="!h-[90%]" position="bottom" v-model:visible="modal" @update:visible="v => emits('update:open', v)">
    <template #header>
      <slot name="header" />
    </template>
    <slot />
    <template #footer>
      <Button class="bottom-3 w-full" severity="secondary">{{ $t('Назад') }}</Button>
    </template>
  </Drawer>
</template>