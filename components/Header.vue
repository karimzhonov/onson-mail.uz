<script>
import { useUser } from "@/store/user"

export default {
    name: 'AppHeader',
    data() {
        return {}
    },
    computed: {
        user: () => useUser().user
    },
    methods: {
        localPath: useLocalePath(),
    },
}

</script>
<template>
    <header class="px-2 sticky bg-surface-100 inset-x-0 top-0 py-3 z-50 header flex justify-center">
        <nav class="max-w-screen-lg lg:max-w-screen-xl flex items-center justify-between w-full relative">
            <!-- app logo -->
            <div class="inline-flex relative bg-inherit">
                <Logo />
            </div>

            <div class="flex items-center bg-inherit gap-1 lg:gap-3 min-w-max">
                <Install />
                <LangSwitcher />
                <Notifications v-if="user.id" />
                <UserDropdown />
            </div>
        </nav>
    </header>
</template>