<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/ru'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'

dayjs.extend(isoWeek)
dayjs.locale('ru')

const currentMonth = ref(dayjs())
const selectedDay = ref<Dayjs>()
const dialogVisible = ref(false)

const rooms = ref<Record<string, any>>({}) // {'2025-08-15': { vip: 1, ... }}

const form = ref({ vip: 0, lux: 0, regular: 0 })

const daysInMonth = computed(() => {
    const start = currentMonth.value.startOf('month')
    const end = currentMonth.value.endOf('month')
    const days = []

    let day = start.startOf('isoWeek')
    while (day.isBefore(end.endOf('isoWeek'))) {
        days.push(day)
        day = day.add(1, 'day')
    }
    return days
})

function openDialog(day: Dayjs) {
    selectedDay.value = day
    const key = day.format('YYYY-MM-DD')
    const existing = rooms.value[key]
    form.value = existing ? { ...existing } : { vip: 0, lux: 0, regular: 0 }
    dialogVisible.value = true
}

function saveRooms() {
    if (selectedDay.value) {
        const key = selectedDay.value.format('YYYY-MM-DD')
        rooms.value[key] = { ...form.value }
        dialogVisible.value = false
    }
}

// навигация
function prevMonth() {
    currentMonth.value = currentMonth.value.subtract(1, 'month')
}
function nextMonth() {
    currentMonth.value = currentMonth.value.add(1, 'month')
}
function prevYear() {
    currentMonth.value = currentMonth.value.subtract(1, 'year')
}
function nextYear() {
    currentMonth.value = currentMonth.value.add(1, 'year')
}
</script>

<template>
    <div>

        <!-- Навигация -->
        <div class="flex items-center justify-between mb-4">
            <div class="flex gap-2 justify-between items-center w-full">
                <div class="flex flex-row gap-2">
                    <Button text @click="prevYear">
                        <ChevronsLeft />
                    </Button>
                </div>
                <div class="flex flex-row items-center">
                    <Button text @click="prevMonth">
                        <ChevronLeft />
                    </Button>
                    <span class="text-xl font-semibold px-4">{{ currentMonth.format('MMMM YYYY').toLowerCase() }}</span>
                    <Button text @click="nextMonth">
                        <ChevronRight />
                    </Button>
                </div>
                
                <div class="flex flex-row gap-2">
                    <Button text @click="nextYear">
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>

        <!-- Заголовки дней -->
        <div class="grid grid-cols-7 gap-2 text-center font-semibold">
            <div v-for="day in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']" :key="day">{{ $t(day) }}</div>
        </div>

        <!-- Календарь -->
        <div class="grid grid-cols-7 md:gap-2 text-center">
            <div v-for="day in daysInMonth" :key="day.format()"
                class="border md:rounded-md p-2 cursor-pointer hover:bg-primary-50 min-h-[60px] lg:aspect-video relative"
                :class="{ 'opacity-30': !day.isSame(currentMonth, 'month') }" @click="openDialog(day)">
                <div class="font-semibold absolute top-1 right-1 text-sm bg-primary rounded-full w-5 h-5 text-white">{{ day.date() }}</div>
                <div v-if="rooms[day.format('YYYY-MM-DD')]">
                    <div class="text-xs text-gray-700">
                        VIP: {{ rooms[day.format('YYYY-MM-DD')].vip }},
                        LUX: {{ rooms[day.format('YYYY-MM-DD')].lux }},
                        ОБ: {{ rooms[day.format('YYYY-MM-DD')].regular }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Диалог -->
        <IDialog v-model:visible="dialogVisible" modal header="Количество комнат" class="min-w-[400px]">
            <div class="flex flex-col gap-4">
                <div>Дата: <strong>{{ selectedDay?.format('DD.MM.YYYY') }}</strong></div>

                <div class="flex flex-col gap-2">
                    <label>VIP:</label>
                    <InputNumber v-model="form.vip" inputId="vip" :min="0" />
                </div>
                <div class="flex flex-col gap-2">
                    <label>Люкс:</label>
                    <InputNumber v-model="form.lux" inputId="lux" :min="0" />
                </div>
                <div class="flex flex-col gap-2">
                    <label>Обычные:</label>
                    <InputNumber v-model="form.regular" inputId="regular" :min="0" />
                </div>
            </div>

            <template #footer>
                <Button label="Отмена" severity="secondary" @click="dialogVisible = false" />
                <Button label="Сохранить" @click="saveRooms" />
            </template>
        </IDialog>
    </div>
</template>