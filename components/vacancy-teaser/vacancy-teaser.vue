<script setup lang="ts">
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
  <div
    class="p-8 bg-white drop-shadow-xl border border-border-gray flex gap-5 flex-col"
  >
    <h3 class="text-3xl font-extrabold">{{ title }}</h3>
    <p class="text-lg">{{ description }}</p>
    <div class="flex justify-end">
      <a class="bg-primary p-3 text-white text-base" :href="url"
        >Bekijk vacature</a
      >
    </div>
  </div>
</template>
