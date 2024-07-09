<script setup lang="ts">
import { ref, onMounted } from "vue";

const totalVacancies = ref(0);
</script>

<template>
  <main>
    <h1>Vacatures</h1>
    <VacancyTeaser title="HEFTRUCKCHAUFFEUR" description="test" />
  </main>
</template>
