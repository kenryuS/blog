<script setup lang="ts">
const isAuthed = useState('isAuthed');

if (isAuthed.value === false) {
    navigateTo('/articleManager/login');
}

import customMarkdownIt from '~/utils/customized-md-render';
import { encode } from '../../utils/content-encode';
import "~/assets/styles/markdown.css";

const markdown = customMarkdownIt();

let series = "";
let title = ref("");
let subtitle = ref("");
let pubdate = ref("");
let covimg = ref("/default.svg");
let tags = ref("");
let slugname = ref("");
let content = ref("");
let preview = ref(markdown.render(""));

const { data } = await useFetch('/api/series', {method: "get"});

const updatePreview = () => {
    preview.value = markdown.render(content.value);
};

const backHome = async () => {
    await useFetch('/api/posts', {method: "post", body: {"series": series, "title": title.value, "subtitle": subtitle.value, "pubdate": pubdate.value, "slugname": slugname.value, "tags": tags.value, "content": encode(content.value), "covimg": covimg.value, "action": "new"}});
    navigateTo('/articleManager');
};

</script>

<template>
    <div class="editor">
        <h1>Add article</h1>
        <form autocomplete="on" name="addPost" id="addPost" method="post" @submit.prevent="onsubmit" @submit="backHome">
            <fieldset>
            <legend>
                <h3>Metadata</h3>
            </legend>
            <label><h3>Series</h3></label>
            
            <div v-for="a in data" v-if="data !== null">
                <p><label>
                    <input @click="series = a.series" name="series" :id="'series_' + a.series" type="radio" form="addPost" required :value="a.series"/>
                    {{ a.displayname }}
                </label></p>
            </div>
            <div v-else>
                <p>Error: No Series Found</p>
            </div>
            
            <label><h3>Title</h3></label>
            <input v-model="title" name="title" id="title" type="text" form="addPost" required/>
        
            <label><h3>Sub Title</h3></label>
            <input v-model="subtitle" name="subtitle" id="subtitle" type="text" form="addPost" required/>
        
            <label><h3>Published Date</h3></label>
            <input v-model="pubdate" name="pubdate" id="pubdate" type="datetime-local" form="addPost" required/>
        
            <label><h3>Cover Image (Path from "/public" directory, precedes "/", Uses "default.png" if none provided)</h3></label>
            <input v-model="covimg" name="covimg" id="covimg" type="text" form="addPost" required/>
        
            <label><h3>Tags, separated by ","</h3></label>
            <input v-model="tags" name="tags" id="tags" type="text" form="addPost" required/>
        
            <label><h3>Slug Name</h3></label>
            <input v-model="slugname" name="slugname" id="slugname" type="text" form="addPost" required/>
            </fieldset>
        
            <fieldset>
            <legend><h3>Content</h3></legend>
            <textarea v-model="content" name="content" id="content" rows="24" spellcheck="true" wrap="hard" autocomplete="true" form="addPost" required @input="updatePreview"></textarea>
            <div>
                <h3>Markdown Preview:</h3>
                <div class="mdPrev MarkdownStyle" v-html="preview"></div>
            </div>
            </fieldset>
            <menu>
                <input type="submit" form="addPost" value="Add"/>
                <NuxtLink to="/articleManager"><button>Cancel</button></NuxtLink>
            </menu>
        </form>
    </div>
</template>

<style scoped>
.editor {
    border: 3px solid black;
    padding: 15px;
}

.editor textarea {
    width: 85%;
    font-family: "Source Code Pro", "Fira Code", "DejaVu Sans Mono", monospace;
    tab-size: 4;
    -o-tab-size: 4;
    white-space: pre;
}

.mdPrev {
    overflow: scroll;
    width: auto;
    height: 24rem;
}

.mdPrev::-webkit-scrollbar {
    display: none;
}
</style>
