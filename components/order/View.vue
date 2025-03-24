<template>
    <ScrollPanel>
    <div class="flex md:flex-row flex-col-reverse h-full w-full">
        <div class="mr-4">
            <PassportCard :data="data.client" class="md:w-[350px]" />
            <div class="mt-7 flex gap-8 flex-col">
                <InputGroup>
                    <FloatLabel>
                        <InputText id="weight" v-model="data.weight" class="w-full" :disabled="disabled" />
                        <label for="weight">{{$t('Вес')}}</label>
                    </FloatLabel>
                    <InputGroupAddon>{{ $t('кг') }}</InputGroupAddon>
                </InputGroup>
                <InputGroup>
                    <FloatLabel>
                        <InputText id="delivery_price" v-model="data.delivery_price" class="w-full" :disabled="disabled" />
                        <label for="delivery_price">{{$t('Стоимость доставки')}}</label>
                    </FloatLabel>
                    <InputGroupAddon>{{ $t('$') }}</InputGroupAddon>
                </InputGroup>
                <!-- <OrderDeliveryPoint :value="data.delivery_point" :mode="data.status === 'process_received_datetime' ? `r` : 'w'" /> -->
            </div>
        </div>
    
        <Stepper :value="data.status" class="md:w-[300px]">
            <StepItem v-for="step in order_steps" :key="step.step">
                <Step asChild :value="step.step">
                    <div class="flex flex-row justify-center mb-4 flex-auto gap-2">
                        <button class="bg-transparent border-0 inline-flex flex-col justify-center items-center gap-2">
                            <span :class="[
                                'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                                { 'bg-primary text-primary-contrast border-primary': step.step === data.status, 'border-surface-200': step.step !== data.status }
                            ]">
                                <component :is="step.icon" />
                            </span>
                            <p class="text-sm" :class="{'text-primary': step.step === data.status}">{{ data[step.step] }}</p>
                            <h3>{{ $t(step.title) }}</h3>
                            <p class="text-sm">{{ $t(step.description) }}</p>
                        </button>
                    </div>
                </Step>
            </StepItem>
        </Stepper>
    </div>
</ScrollPanel>
</template>
<script>
import { order_steps } from './utils';

export default {
    props: ['data'],
    data() {
        return {
            disabled: true,
            order_steps
        }
    }
}
</script>