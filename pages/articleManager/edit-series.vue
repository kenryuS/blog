<script setup lang="ts">
const isAuthed = useState('isAuthed');

if (isAuthed.value === false) {
    navigateTo('/articleManager/login');
}

const route = useRoute();
const id = route.query.id;
const { data } = await useFetch(`/api/series/${id}`);

let seriesSlugName = ref(data.value[0].series);
let displayName = ref(data.value[0].displayname);
let description = ref(data.value[0].description);

const backHome = async () => {
    await useFetch('/api/series', {method:"post", body: {"series": seriesSlugName.value, "displayName": displayName.value, "description": description.value, "action": "edit", "seriesID": id}});
    navigateTo('/articleManager');
}
</script>

<template>
    <h1>Edit Series</h1>
    <form name="editSeries" id="editSeries" @submit.prevent="onsubmit" @submit="backHome">
        <fieldset>
            <legend>
                <h3>Series Information</h3>
            </legend>
            <label><h3>Series Slug Name</h3></label>
            <input name="series" id="series" type="text" form="editSeries" v-model="seriesSlugName" required/>
            <label><h3>Series Display Name</h3></label>
            <input name="displayName" id="displayName" type="text" form="editSeries" v-model="displayName" required/>
            <label><h3>Series Description</h3></label>
            <input name="description" id="description" type="text" form="editSeries" v-model="description" required/>
        </fieldset>
        <input type="hidden" id="seriesID" name="seriesID" :value="id" required/>
        <input type="hidden" id="action" name="action" value="edit" required/>
        <menu>
            <input type="submit" form="editSeries" value="Update"/>
            <NuxtLink to="/articleManager"><button>Cancel</button></NuxtLink>
        </menu>
    </form>
</template>
