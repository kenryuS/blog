<script setup>
const isAuthed = useState('isAuthed');

if (isAuthed.value === false) {
    navigateTo('/articleManager/login');
}

let indexes = await useFetch('/api/posts', {method: "get", query: {datapreset: 3}});
let series = await useFetch('/api/series', {method: "get"});

const deletePost = async (target) => {
    const confirmation = window.confirm("Are you sure deleting post with ID " + target + "?");
    if (confirmation) {
        await useFetch('/api/posts', {method: "delete", query: {id: target}});
        indexes.refresh();
    }
};

const deleteSeries = async (target) => {
    const confirmation = window.confirm("Are you sure deleting series named \"" + target + "\"?");

    if (confirmation) {
        await useFetch('/api/series', {method: "DELETE", query: {id: target}});
        series.refresh();
    }
};

const handleLogout = () => {
    isAuthed.value = false;
    navigateTo('/articleManager/login');
}
</script>

<template>
    <button class="action-btn">
        <NuxtLink to="/articleManager/add-article">Add Article</NuxtLink>
    </button>
    <button class="action-btn">
        <NuxtLink to="/articleManager/add-series">Add Series</NuxtLink>
    </button>
    <button class="action-btn" @click="handleLogout">
        Logout
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
        <tbody v-for="i in series.data.value">
            <tr>
                <td>{{ i.id }}</td>
                <td>{{ i.series }}</td>
                <td>{{ i.displayname }}</td>
                <td>{{ i.description }}</td>
                <td>
                    <button class="action-btn"><NuxtLink :to="'/articleManager/edit-series?id='+i.id">Edit</NuxtLink></button>
                    <button class="action-btn" @click="deleteSeries(i.id)">Delete</button>
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
        <tbody v-for="i in indexes.data.value">
            <tr>
                <td>{{ i.id }}</td>
                <td>{{ i.title }}</td>
                <td>{{ i.series }}</td>
                <td>{{ i.pub_date }}</td>
                <td>{{ i.slug }}</td>
                <td>
                    <button class="action-btn"><NuxtLink :to="'/articleManager/edit-article?id='+i.id" >Edit</NuxtLink></button>
                    <button class="action-btn" @click="deletePost(i.id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
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
