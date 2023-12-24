<script setup lang="ts">
const props = defineProps({
    error: Object
});

const handleError = () => clearError({redirect: "/"});
</script>

<template>
    <h1>{{ (error["statusCode"]) }} - {{ (error["statusMessage"] || "Page Not Found") }}</h1>
    <button @click="handleError">Back Home</button>
</template>