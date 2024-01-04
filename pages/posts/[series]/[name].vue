<script setup lang="tsx">
import customMarkdownIt from '/utils/customized-md-render';
import { decode } from '../../../utils/content-decode.ts';
import "../../assets/styles/markdown.css";

const route = useRoute();
const blogData = await useFetch('/api/posts/', {method: "get", query: {series: route.params.series, post: route.params.name, datapreset: 0}});
const blogItem = blogData.data.value[0];
const seriesData = await useFetch('/api/series', {method: "get"});
const seriesItems = seriesData.data.value;

const series = () => {
    for (var a = 0; a < seriesItems?.length; a++) {
        if (blogItem?.series === seriesItems[a].series) {
            return seriesItems[a].displayname;
        }
    }
    return undefined;
};

const seriesDisplayName = series();
const article_headers = ref();
const article_headers_md = ref("");
const tboc_label = <h2>Table of Content</h2>;
const markdown = customMarkdownIt();

if (blogData.data.value === null || blogData.data.value === undefined || blogItem?.length === 0) {
    throw createError({statusCode: 404, statusMessage: "Post Not Found"});
}

const articleDescription = `${seriesDisplayName}/${blogItem?.title} - ${blogItem?.subtitle} - ${(new Date(blogItem?.pub_date)).toLocaleString()}に投稿`;

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
    ogImageUrl: () => blogItem?.image_path,
    twitterTitle: () => blogItem?.title,
    twitterDescription: () => articleDescription,
    twitterImage: () => blogItem?.image_path,
    twitterCard: "summary_large_image",
    articlePublishedTime: () => blogItem?.pub_date,
    articleTag: () => blogItem?.tags.split(","),
});

onMounted(() => {
    article_headers.value = document.getElementsByTagName("article")[0].querySelectorAll("h1,h2,h3");
    for (let i = 0; i < article_headers.value.length; i++) {
        let tag = article_headers.value[i];
        if (tag.tagName === "H1") {
            article_headers_md.value += (`- [${tag.innerText}](#${tag.id})\n`);
        } else if (tag.tagName === "H2") {
            article_headers_md.value += (`  - [${tag.innerText}](#${tag.id})\n`);
        } else if (tag.tagName === "H3") {
            article_headers_md.value += (`    - [${tag.innerText}](#${tag.id})\n`);
        }
    }
});

definePageMeta({
  layout: "blogview"
});
</script>

<template>
    <Head>
        <Title>{{ "kenryuS - " + seriesDisplayName + "/" + blogItem?.title }}</Title>
    </Head>

    <h1>{{ blogItem?.title }}</h1>
    <p>
        <small>投稿日時: {{ (new Date(blogItem?.pub_date)).toLocaleString() }}</small>
        <br/>
        <small>更新: {{ (new Date(blogItem?.update_date)).toLocaleString() }}</small>
    </p>
    <div class="articleTags">
      <a v-for="(a, index) in blogItem.tags.split(',')" :key="index" :href="'/posts/search?kwd='+a"># {{ a }}</a>
    </div>
    
    <NuxtImg :src="blogItem.image_path" class="headimage" />
    
    <Collapsible :default-status="true" :label="tboc_label">
    <div class="tboc" v-html="markdown.render(article_headers_md)"></div>
    </Collapsible>
    <article v-html="markdown.render(decode(blogItem?.post_content))" class="MarkdownStyle"></article>
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

.articleTags a {
    margin: 0 5px;
    font-weight: bold;
    border-radius: 32px;
    background: lightgray;
    color: darkcyan;
    padding: 9px;
    text-decoration: none;
}

.tboc {
    background: lightgray;
    opacity: 0.8;
}

.tboc li {
    list-style: circle;
    margin-left: -2rem;
}

.tboc li a {
    color: black;
    line-height: 1.75rem;
}
</style>
