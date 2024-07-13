<script setup lang="ts">
import { ref, onMounted } from 'vue';

const vacancies = ref([]);
const totalVacancies = ref(0);

const { data: pageData } = await useFetch('/api/vacatures');
</script>

<template>
  <PageWrapper>
    <template v-slot:sidebar>
      <h2 class="text-2xl">Filters</h2>
    </template>
    <template>
      <h1 class="text-3xl">Vacatures ({{ pageData.total }})</h1>
      <ul class="mt-8 flex flex-col gap-8" v-if="pageData">
        <li v-for="vacancy in pageData.vacancies" :key="vacancy.id">
          <VacancyTeaser
            :title="vacancy.website.title"
            :description="vacancy.website.subtitle"
            :url="`/vacatures/${vacancy.slug}`"
          />
        </li>
      </ul>
    </template>
  </PageWrapper>
</template>
