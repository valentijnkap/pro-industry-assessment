<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { Vacancy } from '~/models/vacancy.model';
import { CategoryFilter } from '~/models/filters.model';

const SHOW_MAX_FILTERS = 5;

const vacancies = ref<Vacancy[]>([]);
const totalVacancies = ref(0);
const currentPage = ref(1);

const categories = ref<CategoryFilter[]>([]);
const categoriesExpanded = ref<Boolean>(false);

const getVacancies = async (pageNumber: number) => {
  try {
    const res = await fetch('/api/vacancies');
    const pageData = await res.json();

    vacancies.value = pageData.vacancies;
    totalVacancies.value = pageData.total;
  } catch (error) {
    console.warn(error);
  }
};

const getCategories = async () => {
  try {
    const res = await fetch('/api/categories');
    const categoriesData = await res.json();

    categories.value = categoriesData.response;
  } catch (error) {
    console.warn(error);
  }
};

onMounted(() => getVacancies(currentPage.value));
onMounted(() => getCategories());

const toggleCategoriesExpanded = () =>
  (categoriesExpanded.value = !categoriesExpanded.value);

const displayedCategories = computed(() => {
  return categoriesExpanded.value
    ? categories.value
    : categories.value.slice(0, 5);
});

const handleFilters = (event: Event) => {
  console.log('Handle filter', event);

  // To DO:
  // 1. Create a list of filters and pass it to the endpoint.
  // 2. Update the current page url with it's active filters
};
</script>

<template>
  <PageWrapper>
    <template v-slot:sidebar>
      <h2 class="text-3xl uppercase font-extrabold">Filters</h2>
      <FilterGroup
        title="Categorieën"
        :buttonTxt="categoriesExpanded ? 'Toon minder' : 'Toon meer'"
        :showButton="categories.length > SHOW_MAX_FILTERS"
        @toggle:show="toggleCategoriesExpanded"
      >
        <ul>
          <li v-for="category in displayedCategories" :key="category.position">
            <Filter
              :id="`category-${category.position}`"
              :value="category.key"
              :label="category.key"
              groupName="categories"
              @update:checked="handleFilters"
            />
          </li>
        </ul>
      </FilterGroup>
    </template>
    <template>
      <header>
        <h1 class="text-3xl">Vacatures</h1>
        <p>{{ totalVacancies }} vacatures gevonden</p>
      </header>
      <ul class="mt-8 flex flex-col gap-8" v-if="vacancies">
        <li v-for="vacancy in vacancies" :key="vacancy.id">
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
