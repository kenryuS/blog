<script setup lang="ts">
import metas from "../../../assets/metas.json";

const route = useRoute();
const { data } = await useFetch(`/api/posts/${route.params.series}`);

const seriesData = (((await useFetch('/api/series', {method:"get"})).data.value).filter((val) => val.series === route.params.series))[0];
const seriesName = seriesData.displayname;
const seriesDescription = seriesData.description;

const meta = JSON.parse(JSON.stringify(metas));
let pageMeta = meta["posts/series/index"];

pageMeta.path_to_page = pageMeta.path_to_page.replace("%s", route.params.series);
pageMeta.title = pageMeta.title.replace("%s", seriesName);
pageMeta.description = pageMeta.description?.replace("%s", seriesName);

const metaTags = genBasicMeta(meta, ["posts/series/index"]);

useSeoMeta(metaTags);

</script>

<template>
    <h1>{{ seriesName }}での投稿</h1>
    <p>{{ seriesDescription }}</p>
    <div v-if="data.length !== 0" class="postlist">
        <div>
            <PostCard v-for="a in data" :index="a"></PostCard>
        </div>
    </div>
    <p v-else style="color: red; font-weight: bolder;">このシリーズには投稿がありません。</p>
</template>

<style scoped>
@import "~/assets/styles/postlist.css";
</style>
