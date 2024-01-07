<script setup lang="tsx">
import { Icon } from "#components";

interface CollapsibleProps {
    defaultStatus: Boolean;
    label: () => JSX.Element;
};

const props = defineProps<CollapsibleProps>();

let isOpened = ref(props.defaultStatus);
let content_visibility = ref(isOpened.value ? "content_visibility_true" : "content_visibility_false");
let arrow_icon = ref(isOpened.value ? "ri:arrow-drop-down-fill" : "ri:arrow-drop-right-fill");

function changeStatus() {
    if (isOpened.value === true) {
        arrow_icon.value = "ri:arrow-drop-right-fill";
        content_visibility.value = "content_visibility_false";
        isOpened.value = false;
    } else {
        arrow_icon.value = "ri:arrow-drop-down-fill";
        content_visibility.value = "content_visibility_true";
        isOpened.value = true;
    }
}
</script>

<template>
    <div>
        <button @click="changeStatus" id="btn">
            <Icon :name="arrow_icon" size="36" />
            <props.label />
        </button>
        <div id="collapsible_content" :class="content_visibility">
            <slot />
        </div>
    </div>
</template>

<style>
#btn {
    margin-top: 1em;
    border: none;
    background: gray;
    display: flex;
    align-items: center;
    text-decoration: underline;
    padding-right: 24px;
    height: 3rem;
    width: 100%;
}

#btn:hover {
    cursor: pointer;
}

#btn > * {
    color: white;
}

#collapsible_content {
    background: lightgray;
    padding: 0.5em 1em;
}

.content_visibility_true {
    visibility: visible;
    height: fit-content;
}

.content_visibility_false {
    visibility: hidden;
    display: none;
}
</style>
