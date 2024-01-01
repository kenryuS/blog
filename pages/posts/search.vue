<script setup lang="ts">
  import { Icon } from "#components";
const route = useRoute();
const search_q = ref(route.query.kwd);
const search_q_temp = ref("");
let search_res = await useAsyncData('item',
  () => $fetch('/api/search', {
      params: {
          kwd: search_q.value
      }
  }), {
      watch: [search_q]
  }
);
const res = ref(search_res.data);

async function research() {
    search_q.value = search_q_temp.value;
    search_res.execute();
}
</script>

<template>
    <div class="search_bar">
        <Icon name="simple-line-icons:magnifier" size="24" />
        <input type="text" placeholder="Search by keywords" v-model="search_q_temp" @keydown.enter="research">
        <button @click="research">Search</button>
    </div>

    <div class="search_result">
      <div class="search_result_entry" v-for="(a, index) in res.item" :key="index">
        <div>
          <h3><a :href="a.slug">{{ a.title }}</a></h3>
          <small>{{ a.pubDate }}</small>
          <p>{{ a.subTitle }}</p>
        </div>
      </div>
    </div>
</template>

<style scoped>
.search_bar {
    display: flex;
    height: 2rem;
    width: 75%;
    margin: auto;
    justify-content: center;
    align-content: center;
    border: lightseagreen 8px solid;
    border-radius: 32px;
}

.search_bar:hover {
    background: lightgray;
}

.search_bar > svg {
    margin-top: 5px;
    margin-left: 6px;
    margin-right: 8px;
}

.search_bar > button {
    border: none;
    background: unset;
    margin-right: 4px;
    border-top-right-radius: 32px;
    border-bottom-right-radius: 32px;
}

.search_bar > button:hover {
    cursor: pointer;
}

.search_bar > input {
    background: inherit;
    border: none;
    width: 100%;
}

.search_result_entry {
    width: 75%;
    margin: auto;
    margin-top: 32px;
}

.search_result_entry > div {
    display: block;
}

.search_result_entry > div > * {
    margin: 8px 0;
}

input:focus {
    outline: none;
}

</style>
