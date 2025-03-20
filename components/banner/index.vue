<template>
  <div class="flex justify-center pt-2 pl-2">
    <component class="max-w-screen-lg lg:max-w-screen-xl w-full" v-for="day in calendar" :key="day.id" :is="type_to_component[day.type]" :item="day" />
  </div>
</template>
  
<script>
import Ramazon from "./Ramazon.vue";
export default {
  data() {
    return {
      calendar: [],
      type_to_component: {
        roza: 'Ramazon'
      }
    };
  },
  components: { Ramazon },
  async mounted() {
    const { data } = await this.$api.get(`/calendar/`)
    this.calendar = data
  }
};
</script>
  
  