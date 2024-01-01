<script setup lang="tsx">
import axios from 'axios';
import "../../assets/styles/markdown.css";
import metas from "../../assets/metas.json";
import customMarkdownIt from '/utils/customized-md-render';

const markdown = customMarkdownIt();

const gh_readme_col_label = () => <h2>Github README</h2>;

const { data: markdownData } = await axios.get("https://raw.githubusercontent.com/kenryuS/kenryuS/main/README-ja.md");

const metaTags = genBasicMeta(metas, "about");

useSeoMeta(metaTags);
</script>

<template>
    <h1>About Me</h1>

    <h2>プロフィール</h2>
    <ul>
      <li>誕生日：8月7日</li>
      <li>出身地：アメリカ、ペンシルベニア州</li>
    </ul>

    <h2>連絡先・SNS</h2>
    <ul>
      <li>E-mail (Developer): <a href="mailto:kenryudev5894@gmail.com">kenryudev5894@gmail.com</a></li>
      <li>Github: <a href="https://github.com/kenryuS">kenryuS</a></li>
    </ul>

    <h2>作業環境</h2>
    <p><a href="#github_readme">Github README</a>の<a href="#%E3%83%AF%E3%83%BC%E3%82%AF%E3%82%B9%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E3%82%B9%E3%83%9A%E3%83%83%E3%82%AF">ワークステーション</a>/<a href="#%E3%83%8E%E3%83%BC%E3%83%88pc%E3%81%AE%E3%82%B9%E3%83%9A%E3%83%83%E3%82%AF">ノートPC</a>スペックから。</p>

    <Collapsible :defaultStatus="false" :label="gh_readme_col_label" id="github_readme">
        <div v-html="markdown.render(markdownData.toString())" class="MarkdownStyle"></div>
    </Collapsible>
</template>

<style scoped>

</style>
