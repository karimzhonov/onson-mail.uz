<script setup>
const params = new URLSearchParams(window.location.search)

if (params.get('access')) localStorage.setItem('access', params.get('access'))
if (params.get('refresh')) localStorage.setItem('refresh', params.get('refresh'))
if (params.get('next')) {
  const url = `${params.get('next')}?access=${localStorage.getItem('access')}&refresh=${localStorage.getItem('refresh')}`
  window.location.href = url
}
</script>

<template>
  <div>
    <BannerCalendar />
    <AppHeader/>
    <slot/>
    <AppFooter/>
  </div>  
</template>