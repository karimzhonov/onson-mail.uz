import { useStorage } from '@vueuse/core'

export const token = useStorage<{access?: string, refresh?: string}>('token', {})