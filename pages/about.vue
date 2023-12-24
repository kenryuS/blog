<script setup lang="ts">
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItSubscript from 'markdown-it-sub';
import MarkdownItSuperscript from 'markdown-it-sup';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItEmoji from 'markdown-it-emoji';
import MarkdownItTaskLists from 'markdown-it-task-lists';
import MarkdownItHighlightjs from 'markdown-it-highlightjs';
import "../../assets/styles/markdown.css";
import metas from "../../assets/metas.json";

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

let loading = ref(true);
const { data: markdownData } = await axios.get("https://raw.githubusercontent.com/kenryuS/kenryuS/main/README-ja.md").then((response) => {return response}).finally(() => {loading.value = false});

const metaTags = genBasicMeta(metas, "about");

useSeoMeta(metaTags);
</script>

<template>
    <h1>About Me</h1>
    <div v-if="loading">Loading...</div>
    <div v-else v-html="markdown.render(markdownData.toString())" class="MarkdownStyle"></div>
</template>
