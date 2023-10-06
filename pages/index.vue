<script setup lang="ts">
let counter = ref(0);
</script>

<template>
  <div>
      <button @click="counter++">{{ counter }}</button>
  </div>
</template>
