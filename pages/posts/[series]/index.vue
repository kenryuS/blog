<script setup lang="ts">
const route = useRoute();
const { data } = await useFetch(`/api/postIndexes/${route.params.series}`);

if (data.value === null || data.value.items.length === 0) {
    throw createError({statusCode: 404, statusMessage: "Series Not Found"});
}
</script>

<template>
{{ data }}
</template>
