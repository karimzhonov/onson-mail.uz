<template>
    <ScrollPanel>
        <div class="flex gap-4 md:flex-row mt-5 flex-col-reverse h-full w-full">
            <Form class="md:min-w-[350px]" v-slot="$form" :initialValues="data" :resolver="resolver" @submit="onFormSubmit">
                <FloatLabel>
                    <InputText id="pnfl" name="pnfl" v-model="data.pnfl" class="w-full" :disabled="disabled" />
                    <label for="pnfl">{{$t('ПИНФЛ')}}</label>
                </FloatLabel>
                <Message v-if="$form.pnfl?.invalid" severity="error" size="small" variant="simple">{{ $form.pnfl.error.message }}</Message>

                <FloatLabel class="mt-7">
                    <InputText id="passport" name="passport" v-model="data.passport" class="w-full" :disabled="disabled" />
                    <label for="passport">{{$t('Паспорт')}} (AA0000000)</label>
                </FloatLabel>
                <Message v-if="$form.passport?.invalid" severity="error" size="small" variant="simple">{{ $form.passport.error.message }}</Message>

                <FloatLabel class="mt-7">
                    <InputText id="fio" name="fio" v-model="data.fio" class="w-full" :disabled="disabled"/>
                    <label for="fio">{{$t('ФИО')}}</label>
                </FloatLabel>
                <Message v-if="$form.fio?.invalid" severity="error" size="small" variant="simple">{{ $form.fio.error.message }}</Message>

                <FloatLabel class="mt-7">
                    <InputText id="address" name="address" v-model="data.address" class="w-full" :disabled="disabled" />
                    <label for="address">{{$t('Адрес')}}</label>
                </FloatLabel>
                <Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{ $form.address.error.message }}</Message>

                <Button v-if="!disabled" type="submit" class="w-full mt-3" :disabled="loading" :loading="loading">{{ $t('Сохранить') }}</Button>
                <Message v-if="success" class="mt-4" severity="success">{{ $t('Паспорт добавлен успешно, нажмите назад и обнавите сраницу') }}</Message>
            </Form>
            <PassportCard class="md:w-[400px]" :data="data" />
        </div>
    </ScrollPanel>
</template>
<script>
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

export default {
    props: ['data'],
    data() {
        return {
            success: false,
            resolver: zodResolver(
                z.object({
                    pnfl: z.string().min(14, { message: 'ПИНФЛ должен содержать 14 цифр' }).max(14, { message: 'ПИНФЛ должен содержать 14 цифр' }),
                    passport: z.string().min(9, { message: 'Паспорт серия и номер должен содержать 2 буквы и 7 цифр' }).max(9, { message: 'Паспорт серия и номер должен содержать 2 буквы и 7 цифр' }).regex(/^[A-Za-z]{2}\d{7}$/, { message: 'Паспорт серия и номер должен содержать 2 буквы и 7 цифр' }) ,
                    fio: z.string().min(1, { message: 'ФИО – обязательное поле.' }),
                    address: z.string().min(1, { message: 'Адрес – обязательное поле.' })
                })
            )
        }
    },
    methods: {
        async onFormSubmit(data){
            console.log(data);
            if (data.valid) {
                try {
                    this.loading = true
                    await this.$api.post('/cargo/client/client/', data.values)
                    this.success = true
                } catch {} finally {this.loading = false}
            }
        },
    },
    computed: {
        disabled() {
            return this.success | this.data.id
        }
    }
}
</script>