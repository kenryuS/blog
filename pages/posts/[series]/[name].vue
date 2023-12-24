<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItSubscript from 'markdown-it-sub';
import MarkdownItSuperscript from 'markdown-it-sup';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItEmoji from 'markdown-it-emoji';
import MarkdownItTaskLists from 'markdown-it-task-lists';
import MarkdownItHighlightjs from 'markdown-it-highlightjs';
import { decode } from '../../../utils/content-decode.ts';
import "../../assets/styles/markdown.css";

const route = useRoute();
const blogData = await useFetch(`/api/posts/display/${route.params.series}/${route.params.name}`);
const blogItem = blogData.data.value?.item[0];
const seriesData = await useFetch('/api/series', {method: "get"});
const seriesItems = seriesData.data.value?.items;

const series = () => {
    for (var a = 0; a < seriesItems?.length; a++) {
        if (blogItem?.series === seriesItems[a].series) {
            return seriesItems[a].displayName;
        }
    }
    return undefined;
};

const seriesDisplayName = series();
const article_headers = ref();
const markdown = new MarkdownIt({html: true});

markdown
    .use(MarkdownItAnchor)
    .use(MarkdownItFootnote)
    .use(MarkdownItSubscript)
    .use(MarkdownItSuperscript)
    .use(MarkdownItMark)
    .use(MarkdownItEmoji)
    .use(MarkdownItTaskLists)
    .use(MarkdownItHighlightjs, {"inline":true})

if (blogData.data.value === null || blogData.data.value === undefined || blogItem?.length === 0) {
    throw createError({statusCode: 404, statusMessage: "Post Not Found"});
}

const articleDescription = `${seriesDisplayName}/${blogItem?.title} - ${(new Date(blogItem?.pubDate)).toLocaleString()}に投稿`;

useSeoMeta({
    title: () => `${seriesDisplayName}/${blogItem?.title}`,
    contentType: "text/html",
    charset: "utf-8",
    lang: "ja",
    description: () => articleDescription,
    icon: "/favicon.ico",
    ogLocale: "ja_JP",
    ogSiteName: "kenryuS",
    ogType: "article",
    ogTitle: () => `kenryuS - ${seriesDisplayName}/${blogItem?.title}`,
    ogDescription: () => articleDescription,
    ogImageUrl: () => blogItem?.headimage,
    twitterTitle: () => blogItem?.title,
    twitterDescription: () => articleDescription,
    twitterImage: () => blogItem?.headimage,
    twitterCard: "summary_large_image",
    articlePublishedTime: () => blogItem?.pubDate,
    articleTag: () => blogItem?.tags,
});

onMounted(() => {
    article_headers.value = document.getElementsByTagName("article")[0].querySelectorAll("h1,h2,h3");
    console.log(article_headers.value);
});

definePageMeta({
  layout: "blogview"
});
</script>

<template>
    <Head>
        <Title>{{ "kenryuS - " + seriesDisplayName + "/" + blogItem?.title }}</Title>
    </Head>

    <NuxtImg :src="blogItem.headimage" class="headimage" />
    
    <h1>{{ blogItem?.title }}</h1>
    <p>
        <small>Posted: {{ (new Date(blogItem?.pubDate)).toLocaleString() }}</small>
        <br/>
        <small>Updated: {{ (new Date(blogItem?.updateDate)).toLocaleString() }}</small>
    </p>
    <div>
      <ul>
        <li v-for="a in article_headers"><a :href="'#' + a.id">{{ a.innerText }}</a></li>
      </ul>
    </div>
    <article v-html="markdown.render(decode(blogItem?.mdContent))" class="MarkdownStyle"></article>
</template>

<style>
.headimage {
    width: 75%;
    display: flex;
    margin: auto;
}

@media scree and (max-width: 750px) {
    .headimage {
        width: 90%;
        margin: 5% 10%;
    }
}
</style>
