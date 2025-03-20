<template>
    <Banner class="md:hidden !p-0" />
    <OrderPublic />
    <h1 class="text-xl font-bold mt-3">{{ $t('Мои последние заказы') }}</h1>
    <OrderTable :completed="false"/>
</template>