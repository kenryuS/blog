<script setup lang="ts">
const props = defineProps({
    index : Object
});
</script>

<template>
  <div class="postcard">
      <NuxtLink :to="props.index?.slug">
      <div>
          <NuxtImg :src="props.index?.image_path" width="256" :alt="props.index?.image_alt" />
          <h3 :title="props.index?.title">{{ props.index?.title }}</h3>
          <small>{{ (new Date(props.index?.pub_date)).toLocaleString() }}</small>
          <h4 :title="props.index?.subtitle">{{ props.index?.subtitle }}</h4>
      </div>
      </NuxtLink>
  </div>
</template>

<style>
@import "~/assets/styles/postcard.css";
</style>
