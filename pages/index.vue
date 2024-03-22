<script setup lang="tsx">
import metas from "~/assets/metas.json";

const { data, refresh } = await useFetch("/api/posts/latest/3");
const metaTags = genBasicMeta(metas, "index");

useSeoMeta(metaTags);
</script>

<template>
    <h1>kenryuS Blog</h1>

    <h2>最近の投稿</h2>
    <div class="postlist">
        <div>
            <PostCard v-for="a in data" :index="a"></PostCard>
        </div>
    </div>
</template>

<style>
@import "~/assets/styles/postlist.css";
</style>
