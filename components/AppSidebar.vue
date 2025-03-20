<template>
    <div>
      <SidebarContent>
        <Menu :model="cargo" class="p-0 !bg-transparent !border-0">
          <template #start>
            <span class="text-primary text-lg font-bold">{{ $t('Карго') }}</span>
          </template>
          <template #item="{ item }">
            <NuxtLink :to="item.url" class="flex flex-row px-3 py-2 cursor-pointer">
                <component :is="item.icon" />
                <span class="ml-2">{{ item.title }}</span>
            </NuxtLink>
          </template>
        </Menu>
      </SidebarContent>

      <SidebarContent class="mt-4">
        <Menu :model="turism" class="p-0 !bg-transparent !border-0">
          <template #start>
            <span class="text-primary text-lg font-bold">{{ $t('Туризм') }}</span>
          </template>
          <template #item="{ item }">
            <NuxtLink :to="item.url" class="flex flex-row px-3 py-2 cursor-pointer">
                <component :is="item.icon" />
                <span class="ml-2">{{ item.title }}</span>
                <Badge severity="danger" class="ml-2" v-if="item.disabled" :value="$t('Скоро')"/>
            </NuxtLink>
          </template>
        </Menu>
      </SidebarContent>

      <SidebarContent class="mt-4">
        <Menu :model="consulting" class="p-0 !bg-transparent !border-0">
          <template #start>
            <span class="text-primary text-lg font-bold">{{ $t('Консалтинг') }}</span>
          </template>
          <template #item="{ item }">
            <NuxtLink :to="item.url" class="flex flex-row px-3 py-2 cursor-pointer">
                <component :is="item.icon" />
                <span class="ml-2">{{ item.title }}</span>
                <Badge severity="danger" class="ml-2" v-if="item.disabled" :value="$t('Скоро')"/>
            </NuxtLink>
          </template>
        </Menu>
      </SidebarContent>

      <SidebarContent class="mt-4">
        <Menu :model="customs" class="p-0 !bg-transparent !border-0">
          <template #start>
            <span class="text-primary text-lg font-bold">{{ $t('Таможенное оформление') }}</span>
          </template>
          <template #item="{ item }">
            <NuxtLink :to="item.url" class="flex flex-row px-3 py-2 cursor-pointer">
                <component :is="item.icon" />
                <span class="ml-2">{{ item.title }}</span>
                <Badge severity="danger" class="ml-2" v-if="item.disabled" :value="$t('Скоро')"/>
            </NuxtLink>
          </template>
        </Menu>
      </SidebarContent>
    </div>
</template>
<script setup>
import { cargo, turism, consulting, customs } from '@/layouts/sidebar-config'
</script>