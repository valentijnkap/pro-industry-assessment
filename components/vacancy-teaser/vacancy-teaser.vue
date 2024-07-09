<script setup lang="ts">
import { defineProps } from "vue";
import { defineComponent } from "vue";

interface VacancyTeaserProps {
  title: string;
  description: string;
  categories?: string[];
  city?: string;
  url?: string;
}

const props = defineProps<VacancyTeaserProps>();
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <a class="bg-primary" :href="url">Bekijk vacature</a>
  </div>
</template>
