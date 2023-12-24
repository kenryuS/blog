<script setup lang="ts">
const props = defineProps({
    index : Object
});
</script>

<template>
  <div class="postcard">
      <NuxtLink :to="props.index?.slug">
      <div>
          <NuxtImg :src="props.index?.coverImg" width="256" />
          <h3 :title="props.index?.title">{{ props.index?.title }}</h3>
          <small>{{ (new Date(props.index?.pubDate)).toLocaleString() }}</small>
          <h4 :title="props.index?.subTitle">{{ props.index?.subTitle }}</h4>
      </div>
      </NuxtLink>
  </div>
</template>

<style>
@import "~/assets/styles/postcard.css";
</style>
