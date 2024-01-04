<script setup lang="ts">
const isAuthed = useState('isAuthed');

if (isAuthed.value === false) {
    navigateTo('/articleManager/login');
}

let seriesSlugName = ref("");
let displayName = ref("");
let description = ref("");
const backHome = async () => {
    await useFetch('/api/series', {method:"post", body: {"series": seriesSlugName.value, "displayName": displayName.value, "description": description.value, "action": "new"}});
    navigateTo('/articleManager');
};
</script>

<template>
    <DevOnly>
        <h1>Add Series</h1>
        <form name="addSeries" id="addSeries" action="/api/series" method="post" @submit.prevent="onsubmit" @submit="backHome">
            <fieldset>
                <legend>
                    <h3>Series Information</h3>
                </legend>

                <label><h3>Series Slug Name</h3></label>
                <input v-model="seriesSlugName" name="series" id="series" type="text" form="addSeries" required/>

                <label><h3>Series Display Name</h3></label>
                <input v-model="displayName" name="displayName" id="displayName" type="text" form="addSeries" required/>

                <label><h3>Series Description</h3></label>
                <input v-model="description" name="description" id="description" type="text" form="addSeries" required/>
            </fieldset>

            <input type="hidden" id="action" name="action" value="new"/>

            <menu>
                <input type="submit" form="addSeries" value="Add"/>
                <NuxtLink to="/articleManager"><button>Cancel</button></NuxtLink>
            </menu>
        </form>
    </DevOnly>
</template>
