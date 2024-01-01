<script setup lang="ts">
import PostCard from "../../components/PostCard.vue";
import metas from "../../assets/metas.json";

const { data } = await useFetch('/api/postIndexes', {method: "get"});
const seriesData = await useFetch('/api/series', {method: "get"});
const seriesList = seriesData.data.value?.items;
const metaTags = genBasicMeta(metas, "posts/index");

useSeoMeta(metaTags);
</script>

<template>
<h1>ブログ一覧</h1>

    <div class="serieslist">
      <h3>シリーズ</h3>
      <a v-for="a in seriesList" :href="'/posts/' + a.series">{{a.displayName}}</a>
    </div>
    
    <div class="postlist">
        <div>
            <PostCard v-for="(a, index) in data?.items" :key="index" :index="a"></PostCard>
        </div>
    </div>
</template>

<style scoped>
@import "~/assets/styles/postlist.css";

.serieslist {
    display: flex;
    align-items: center;
    margin-top: -16px;
    margin-bottom: 16px;
}

.serieslist > a {
    display: flex;
    margin: 0 5px;
    padding: 9px;
    border-radius: 20px;
    background: lightgray;
    text-decoration: none;
    height: 1.5rem;
    min-width: 5rem;
    color: darkcyan;
    justify-content: center;
    align-content: center;
}

</style>
