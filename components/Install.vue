<script>
import { CloudDownload } from "lucide-vue-next";
export default {
    name: 'Install',
    components: { CloudDownload },
    data() {
        return {
            deferredPrompt: null,
            installed: false
        }
    },
    mounted() {
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault();
            // Stash the event so it can be triggered later.
            console.log(e)
            this.deferredPrompt = e;
        });
        window.addEventListener("appinstalled", () => {
            console.log("Installed");

            this.deferredPrompt = null;
            this.installed = true
        });
    },
    methods: {
        install() {
            if (this.deferredPrompt) return this.deferredPrompt.prompt()
            this.$router.push(useLocalePath()('/install'))
        }
    }
}
</script>

<template>
    <button v-if="!installed"
        class="outline-none bg-transparent p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="install">
        <CloudDownload class="size-6 text-gray-700 cursor-pointer" />
    </button>
</template>