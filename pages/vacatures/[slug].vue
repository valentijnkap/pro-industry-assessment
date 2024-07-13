<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <article>
    <h1>Slug: {{ route.params.slug }}</h1>

    <!-- <NuxtLink to="/vacatures">Terug</NuxtLink> -->
    <a href="/vacatures">Terug</a>
  </article>
</template>
