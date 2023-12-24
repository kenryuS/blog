<script setup lang="ts">
import PostCard from "../../components/PostCard.vue";
const { data } = await useFetch('/api/postIndexes', {method: "get"});
import metas from "../../assets/metas.json";

const metaTags = genBasicMeta(metas, "posts/index");

useSeoMeta(metaTags);
</script>

<template>
    <h1>ブログ一覧</h1>
    
    <div class="postlist">
        <PostCard v-for="a in data?.items" :index="a"></PostCard>
    </div>
</template>

<style>
.postlist {
    display: grid;
    grid-auto-flow: column;
    column-gap: 1em;
    row-gap: 1em;
    justify-content: start;
    grid-auto-columns: auto;
}

@media screen and (max-width: 750px) {
  .postlist {
      column-gap: 0;
      grid-auto-flow: row;
      justify-content: center;
  }
}
</style>
