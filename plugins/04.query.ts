import type {
  DehydratedState,
  VueQueryPluginOptions,
} from "@tanstack/vue-query";
import {
  VueQueryPlugin,
  QueryClient,
  hydrate,
  dehydrate,
} from "@tanstack/vue-query";
// Nuxt 3 app aliases
import { defineNuxtPlugin, useState } from "#imports";

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>("vue-query");

  const toast = useNuxtApp().vueApp.config.globalProperties.$toast;
  const {
    $i18n: { t: $t },
  } = useNuxtApp();
  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
      mutations: {
        onSuccess: () => {
          toast.add({
            severity: "success",
            summary: $t("Успешно"),
            detail: $t("Действие выполнено успешно"),
            life: 3000,
          });
        },
        onError: () => {
          toast.add({
            severity: "error",
            summary: $t("Ошибка"),
            detail: $t("Действие не выполнено, повторите позже"),
            life: 3000,
          });
        },
      },
    },
  });
  const options: VueQueryPluginOptions = { queryClient };

  nuxt.vueApp.use(VueQueryPlugin, options);

  if (import.meta.server) {
    nuxt.hooks.hook("app:rendered", () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    nuxt.hooks.hook("app:created", () => {
      hydrate(queryClient, vueQueryState.value);
    });
  }
});
