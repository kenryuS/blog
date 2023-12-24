<script setup lang="ts">
import metas from "~/assets/metas.json";
import type { UseSeoMetaInput } from "@unhead/schema";

const { data } = await useFetch("/api/postIndexes/latest/3");
const metaTags: UseSeoMetaInput = genBasicMeta(metas, "index");

useSeoMeta(metaTags);
</script>

<template>
  <div>
      <h1>kenryuS Blog</h1>
      {{ data }}
  </div>
</template>

