<script setup lang="ts">
const isAuthed = useState('isAuthed');
const login_pending = ref(false);
const plainTextPass = ref("");

async function handle() {
    login_pending.value = true;
    if (plainTextPass.value.length === 0) {
        login_pending.value = false;
        return;
    }
    const { data } = await useFetch('/api/manager/login', {method: "post", body : {"pass": plainTextPass.value}});
    isAuthed.value = data.value;
    if (isAuthed.value) {
        navigateTo('/articleManager');
    }
    login_pending.value = false;
}
</script>

<template>
    <h1>Login to CMS</h1>
    <input type="password" @keyup.enter="handle" v-model="plainTextPass" />
    <button @click="handle" :disabled="login_pending">{{ login_pending ? "logging you in ..." : "login" }}</button>
</template>

<style scoped></style>
