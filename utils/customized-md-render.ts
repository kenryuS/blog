import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItSubscript from 'markdown-it-sub';
import MarkdownItSuperscript from 'markdown-it-sup';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItMark from 'markdown-it-mark';
import MarkdownItEmoji from 'markdown-it-emoji';
import MarkdownItTaskLists from 'markdown-it-task-lists';
import MarkdownItHighlightjs from 'markdown-it-highlightjs';

export default function customMarkdownIt() {
    const markdown = new MarkdownIt({html: true});

    markdown
        .use(MarkdownItAnchor)
        .use(MarkdownItFootnote)
        .use(MarkdownItSubscript)
        .use(MarkdownItSuperscript)
        .use(MarkdownItMark)
        .use(MarkdownItEmoji)
        .use(MarkdownItTaskLists)
        .use(MarkdownItHighlightjs, {"inline":true});

    return markdown;
}
