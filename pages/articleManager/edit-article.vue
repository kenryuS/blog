<script setup lang="ts">
import customMarkdownIt from '~/utils/customized-md-render';
import { encode } from '../../utils/content-encode.ts';
import { decode } from '../../utils/content-decode.ts';
import "~/assets/styles/markdown.css";

const markdown = customMarkdownIt();

const route = useRoute();
const id = route.query.id;
const seriesPromise = await useFetch('/api/series', {method: "get"});
const seriesData = seriesPromise.data;
const postPromise = await useFetch(`/api/posts/${id}`, {method: "get"});
const postData = postPromise.data;

let title = ref(postData.value.indexes[0].title);
let subtitle = ref(postData.value.indexes[0].subTitle);
let updatedate = ref(postData.value.indexes[0].updateDate);
const slugParts = postData.value.indexes[0].slug.split('/');
let slug = ref(slugParts[slugParts.length - 1]);
let tags = ref(postData.value.contents[0].tags);
let covimg = ref(postData.value.indexes[0].coverImg);
let content = ref(decode(postData.value.contents[0].mdContent));
let series = ref(postData.value?.indexes[0].series);
let preview = ref(markdown.render(""));

const updatePreview = () => {
    preview.value = markdown.render(content.value);
};

const backHome = async () => {
    await useFetch('/api/posts', {method: "post", body: {"id": id, "series": series, "title": title.value, "subtitle": subtitle.value, "updatedate": updatedate.value, "slugname": slug.value, "tags": tags.value, "content": encode(content.value), "covimg": covimg.value, "action": "edit"}});
    navigateTo("/articleManager");
};

updatePreview();

</script>

<template>
    <DevOnly>
        <div class="editor">
            <h1>Edit Article</h1>
            <form autocomplete="on" name="editPost" id="editPost" @submit.prevent="onsubmit" @submit="backHome" method="post">
                <fieldset>
                <legend>
                    <h3>Metadata</h3>
                </legend>
                <label><h3>Series</h3></label>
                
                <div v-for="a in seriesData?.items" v-if="seriesData !== null">
                    <p><label>
                        <input @click="series = a.series" name="series" :id="'series_' + a.series" type="radio" form="editPost" required :value="a.series" :checked="series === a.series"/>
                        {{ a.displayName }}
                    </label></p>
                </div>
                <div v-else>
                    <p>Error: No Series Found</p>
                </div>
                
                <label><h3>Title</h3></label>
                <input v-model="title" name="title" id="title" type="text" form="editPost" required/>
            
                <label><h3>Sub Title</h3></label>
                <input v-model="subtitle" name="subtitle" id="subtitle" type="text" form="editPost" required/>
            
                <label><h3>Updated Date</h3></label>
                <input v-model="updatedate" name="updatedate" id="updatedate" type="datetime-local" form="editPost" required/>
            
                <label><h3>Cover Image (Path from "/public" directory, precedes "/", Uses "default.png" if none provided)</h3></label>
                <input v-model="covimg" name="covimg" id="covimg" type="text" form="editPost" required/>
            
                <label><h3>Tags, separated by ","</h3></label>
                <input v-model="tags" name="tags" id="tags" type="text" form="editPost" required/>
            
                <label><h3>Slug Name</h3></label>
                <input v-model="slug" name="slugname" id="slugname" type="text" form="editPost" required/>
                </fieldset>
            
                <fieldset>
                <legend><h3>Content</h3></legend>
                <textarea v-model="content" name="content" id="content" rows="24" spellcheck="true" wrap="hard" autocomplete="true" form="editPost" required @input="updatePreview"></textarea>
                <div>
                    <h3>Markdown Preview:</h3>
                    <div class="mdPrev MarkdownStyle" v-html="preview"></div>
                </div>
                </fieldset>

                <menu>
                    <input type="submit" @submit="backHome" form="editPost" value="Update"/>
                    <NuxtLink to="/articleManager"><button>Cancel</button></NuxtLink>
                </menu>
            </form>
        </div>
        <template #fallback>
            <h1>Error!</h1>
        </template>
    </DevOnly>
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
