<script setup lang="ts">
import { Icon } from "#components";
let back_to_top_visibility = ref('btn-invisible');
let scrolldist = 0;
const scrollEvent = () => {
    if (process.client) {
        scrolldist = window.scrollY;
        if (scrolldist > 180) {
            back_to_top_visibility.value = 'btn-visible';
        } else {
            back_to_top_visibility.value = 'btn-invisible';
        }
    }
}

if (process.client) {
    window.addEventListener("scroll", scrollEvent);
}
</script>

<template>
    <header>
        <Navbar />
    </header>
    
    <main>
        <slot />
        <GoBackBtn />
    </main>

    <a href="#App" class="btn" :class="back_to_top_visibility"><Icon name="material-symbols:arrow-upward-rounded" size="36"></Icon></a>

    <footer>
        <Footer />
    </footer>
    
</template>

<style>
@import "assets/styles/back-to-top-btn.css";
</style>

