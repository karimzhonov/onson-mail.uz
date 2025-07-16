<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/ru'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import { useChangeHotelRoomCalendar, useHotel, useHotelRoomCalendar } from '~/hooks/tourism/hotel'

dayjs.extend(isoWeek)
dayjs.locale('ru')

const {hotelId} = defineProps<{
    hotelId: string
}>()

const { data: hotel } = useHotel({id: hotelId})

const currentMonth = ref(dayjs())
const selectedDay = ref<Dayjs>()
const dialogVisible = ref(false)

const {data: rooms, isFetching} = useHotelRoomCalendar({id: hotelId})
const {mutate, error, isError, isPending} = useChangeHotelRoomCalendar({id: hotelId})

const disabled = computed(() => isPending.value)
const form = ref<Record<string, Record<number, number>>>({})

const daysInMonth = computed(() => {
    const start = currentMonth.value.startOf('month')
    const end = currentMonth.value.endOf('month')
    const days = []

    let day = start.startOf('isoWeek')
    while (day.isBefore(end.endOf('isoWeek'))) {
        form.value[day.format('YYYY-MM-DD')] = {}
        days.push(day)
        day = day.add(1, 'day')
    }
    return days
})

function openDialog(day: Dayjs) {
    selectedDay.value = day
    dialogVisible.value = true
}

function saveRooms() {
    for (const date in form.value) {
        for (const room in form.value[date]) {
            const data = {
                room: Number(room), date, value: form.value[date][room]
            }
            mutate({values: data})
        }
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
    <Loading :loading="isFetching">

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
                <div v-if="rooms?.[day.format('YYYY-MM-DD')]">
                    {{ rooms[day.format('YYYY-MM-DD')] }}
                </div>
            </div>
        </div>

        <!-- Диалог -->
        <IDialog v-model:visible="dialogVisible" modal header="Количество комнат" class="min-w-[400px]">
            <div class="flex flex-col gap-4" v-if="selectedDay">
                <Message v-if="isError" severity="error">{{ error }}</Message>
                <div>Дата: <strong>{{ selectedDay.format('DD.MM.YYYY') }}</strong></div>

                <div class="flex flex-col gap-2" v-for="room in hotel?.hotelroom_set">
                    <label>{{ room.room[`name_${$i18n.locale}`] ?? room.room.name }}:</label>
                    <InputNumber v-model="form[selectedDay.format('YYYY-MM-DD')][room.id]" :min="0" :disabled="disabled" />
                </div>
                <div class="flex justify-end">
                    <Button @click="saveRooms" :disabled="disabled">{{ $t('Сохранить') }}</Button>
                </div>
            </div>
        </IDialog>
    </Loading>
</template>