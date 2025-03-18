<template>
  <div class="absolute top-0 inset-x-0 h-64 flex items-start">
    <div
        class="h-24 w-2/3 bg-gradient-to-br from-primary opacity-20 blur-2xl dark:from-[#570cac] dark:invisible dark:opacity-40">
    </div>
    <div
        class="h-20 w-3/5 bg-gradient-to-r from-[#8cd66a] opacity-40 blur-2xl dark:from-[#670ccf] dark:opacity-40">
    </div>
  </div>
  <AtomsContainer class-name="relative">
    <component  v-for="day in calendar" :key="day.id" :is="type_to_component[day.type]" :item="day" />
  </AtomsContainer>
</template>

<script>
import axios from "axios";
import Ramazon from "~/components/calendar/Ramazon.vue";
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
    const { data } = await axios.get(`https://api.onson-mail.uz/api/calendar/`)
    this.calendar = data
  }
};
</script>

