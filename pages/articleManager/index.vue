<script setup>
let indexes = await useFetch('/api/postIndexes', {method: "get"});
let series = await useFetch('/api/series', {method: "get"});

const deletePost = async (target) => {
    const confirmation = window.confirm("Are you sure deleting " + target + "?");
    if (confirmation) {
        await useFetch('/api/posts', {method: "delete", query: {slug: target}});
        indexes.refresh();
    }
};

const deleteSeries = async (target) => {
    const confirmation = window.confirm("Are you sure deleting series named \"" + target + "\"?");

    if (confirmation) {
        await useFetch('/api/series', {method: "DELETE", query: {series: target}});
        series.refresh();
    }
};
</script>

<template>
    <DevOnly>
        <button class="action-btn">
            <NuxtLink to="/articleManager/add-article">Add Article</NuxtLink>
        </button>
        <button class="action-btn">
            <NuxtLink to="/articleManager/add-series">Add Series</NuxtLink>
        </button>
        <table class="list">
            <caption>
                List of Series
            </caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Slug Name</th>
                    <th>Display Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-for="i in series.data.value.items">
                <tr>
                    <td>{{ i.id }}</td>
                    <td>{{ i.series }}</td>
                    <td>{{ i.displayName }}</td>
                    <td>{{ i.description }}</td>
                    <td>
                        <button class="action-btn"><NuxtLink :to="'/articleManager/edit-series?id='+i.id">Edit</NuxtLink></button>
                        <button class="action-btn" @click="deleteSeries(i.series)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    
        <table class="list">
            <caption>
                List of Articles
            </caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Series</th>
                    <th>Published Date</th>
                    <th>Slug</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-for="i in indexes.data.value.items">
                <tr>
                    <td>{{ i.id }}</td>
                    <td>{{ i.title }}</td>
                    <td>{{ i.series }}</td>
                    <td>{{ i.pubDate }}</td>
                    <td>{{ i.slug }}</td>
                    <td>
                        <button class="action-btn"><NuxtLink :to="'/articleManager/edit-article?id='+i.id" >Edit</NuxtLink></button>
                        <button class="action-btn" @click="deletePost(i.slug)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <template #fallback>
            <h1>Error!</h1>
            <button class="action-btn"><NuxtLink to="/">Go Home</NuxtLink></button>
        </template>
    </DevOnly>
</template>

<style>
.list {
    width: 100%;
}

.list tbody tr td {
    justify-content: center;
    border: 3px solid black;
    border-radius: 7px;
    padding: 0 7px;
    width: 16.6%;
}

.action-btn {
    border: 3px solid gray;
    border-radius: 7px;
    background: none;
    margin: 0 3px;
}

.action-btn:hover {
    background: lightgray;
    cursor: pointer;
}

.action-btn a {
    text-decoration: none;
    color: #000;
}
</style>
