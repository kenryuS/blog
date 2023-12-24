<script setup>
import { Icon } from '#components';
</script>

<template>
    <nav class="navbar">
        <ul>
            <li>
                <NuxtLink to="/">
                    <Icon name="ri:home-2-line" size="24" />
                    <div class="link-text"> Home</div>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/posts">
                    <Icon name="charm:book-open" size="24" />
                    <div class="link-text"> Blogs</div>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/about">
                    <Icon name="mdi:account-box-outline" size="24" />
                    <div class="link-text"> About</div>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style>
@import "assets/styles/navbar.css";
</style>
