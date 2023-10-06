<script setup lang="ts">
import axios from 'axios';
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt({html: true});

const { data: markdownData } = await axios.get("https://raw.githubusercontent.com/kenryuS/kenryuS/main/README.md");

const test: string = "# Test\n\n- list 1\n- list 2\n- list 3\n\n1. num list\n2. num list\n3. num list\n\n# h1\n## h2\n### h3\n#### h4\n##### h5\n###### h6\n\nParagraph\n\n`$ echo \"code block\"`\n\n```\n#include <iostream>\n\nint main() {\n std::cout << \"multi-line code block\" << std::endl;\n return 0;\n}\n```";
</script>

<template>
    <h1>About Me</h1>
    <div v-html="markdown.render(markdownData.toString())"></div>
    <div v-html="markdown.render(test)"></div>
</template>
