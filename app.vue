<script setup lang="ts">
const isAuthed = useState('isAuthed');

await callOnce(() => {
    isAuthed.value = false;
});
</script>

<template>
    <div id="App">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style>
@import "assets/styles/main.css";
</style>
