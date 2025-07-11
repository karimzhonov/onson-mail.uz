<template>
    
    <Button as="a" :href="url" :disabled="isPending" :loading="isPending" rounded outlined class="w-fit">
        <img src="/icons/google.webp" width="24" class="mr-[13px]" />
        {{ $t('Войти через Google') }}
    </Button>
</template>
<script setup lang="ts">
import { useGoogleAuth } from "~/hooks/user/auth";

const {mutate, isPending} = useGoogleAuth()

onMounted(async () => {
    const parsedHash = new URLSearchParams(
        window.location.hash.substring(1) // any_hash_key=any_value
    );
    const access_token = parsedHash.get("access_token")
    if (access_token) {
        mutate({access_token: access_token})
    }

})

const url = computed(() => {
    const { public: { GOOGLE_CLIENT_ID } } = useRuntimeConfig();
    const google_client_id = GOOGLE_CLIENT_ID as string
    const google_callback_uri = window.location.origin
    const url = "https://accounts.google.com/o/oauth2/v2/auth"
    const params = {
        'client_id': google_client_id,
        'redirect_uri': google_callback_uri,
        'response_type': 'token',
        'scope': 'email',
        'include_granted_scopes': 'true',
        'state': 'pass-through value'
    };
    const search = new URLSearchParams(params)
    return `${url}?${search}`
})
</script>