<template>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 h-full">
        <div class="bg-surface-0 shadow p-4 rounded-border h-full">
            <div class="flex justify-between mb-2">
                <div>
                    <Badge class="mb-3">#{{ data.number }}</Badge>
                    <span class="block text-surface-500 font-medium mb-2"><span>{{$t('Вес')}}</span>: {{ data.weight }} {{ $t('кг') }}</span>
                    <div class="text-surface-900 font-medium !text-xl">{{data.delivery_price}}$</div>
                </div>
                <div class="flex items-center justify-center bg-primary w-12 h-12 rounded-full p-2">
                    <component :is="step.icon" color="#fff" />
                </div>
            </div>
            <span class="text-green-500 font-medium">{{ data.client.fio }}</span>
        </div>
    </div>
</template>
<script>
import { order_steps } from './utils';

export default {
    props: ['data'],
    data() {
        return {
            step: order_steps.find(v => v.step === this.data.status)
        }
    }
}
</script>