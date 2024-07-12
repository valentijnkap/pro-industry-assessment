<script setup lang="ts">
import { ref, onMounted } from 'vue';

const totalVacancies = ref(0);
</script>

<template>
  <PageWrapper>
    <template v-slot:sidebar>
      <h2 class="text-2xl">Filters</h2>
    </template>
    <template>
      <h1 class="text-3xl">Vacatures</h1>
      <ul class="mt-8 flex flex-col gap-8">
        <li>
          <VacancyTeaser
            title="Installatiemoneteur"
            description="Wil jij werken als installatiemonteur in de dagdienst en werken met de modernste technologieën?"
          />
        </li>
      </ul>
    </template>
  </PageWrapper>
</template>
