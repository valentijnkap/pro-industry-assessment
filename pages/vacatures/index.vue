<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { Vacancy } from '~/models/vacancy.model';
import { VacancyFilter } from '~/models/filters.model';

const SHOW_MAX_FILTERS = 5;

const loading = ref<Boolean>(true);

const vacancies = ref<Vacancy[]>([]);
const totalVacancies = ref(0);
const currentPage = ref(1);

const categories = ref<VacancyFilter[]>([]);
const categoriesExpanded = ref<Boolean>(false);

const educations = ref<VacancyFilter[]>([]);
const educationsExpanded = ref<Boolean>(false);

const sectors = ref<VacancyFilter[]>([]);
const sectorsExpanded = ref<Boolean>(false);

const getVacancies = async (pageNumber: number) => {
  loading.value = true;

  try {
    const res = await fetch('/api/vacancies');
    const pageData = await res.json();

    vacancies.value = pageData.vacancies;
    totalVacancies.value = pageData.total;

    loading.value = false;
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

const getEducations = async () => {
  try {
    const res = await fetch('/api/educations');
    const educationsData = await res.json();

    educations.value = educationsData.response;
  } catch (error) {
    console.warn(error);
  }
};

const getSectors = async () => {
  try {
    const res = await fetch('/api/sectors');
    const sectorsData = await res.json();

    sectors.value = sectorsData.response;
  } catch (error) {
    console.warn(error);
  }
};

onMounted(() => getVacancies(currentPage.value));
onMounted(() => getCategories());
onMounted(() => getEducations());
onMounted(() => getSectors());

const toggleCategoriesExpanded = () =>
  (categoriesExpanded.value = !categoriesExpanded.value);

const displayedCategories = computed(() => {
  return categoriesExpanded.value
    ? categories.value
    : categories.value.slice(0, SHOW_MAX_FILTERS);
});

const toggleEducationsExpanded = () =>
  (educationsExpanded.value = !educationsExpanded.value);

const displayedEducations = computed(() => {
  return educationsExpanded.value
    ? educations.value
    : educations.value.slice(0, SHOW_MAX_FILTERS);
});

const toggleSectorsExpanded = () =>
  (sectorsExpanded.value = !sectorsExpanded.value);

const displayedSectors = computed(() => {
  return sectorsExpanded.value
    ? sectors.value
    : sectors.value.slice(0, SHOW_MAX_FILTERS);
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

      <FilterGroup
        title="Opleidingsniveau"
        :buttonTxt="educationsExpanded ? 'Toon minder' : 'Toon meer'"
        :showButton="educations.length > SHOW_MAX_FILTERS"
        @toggle:show="toggleEducationsExpanded"
      >
        <ul>
          <li
            v-for="education in displayedEducations"
            :key="education.position"
          >
            <Filter
              :id="`education-${education.position}`"
              :value="education.key"
              :label="education.key"
              groupName="educations"
              @update:checked="handleFilters"
            />
          </li>
        </ul>
      </FilterGroup>

      <FilterGroup
        title="Sectoren"
        :buttonTxt="sectorsExpanded ? 'Toon minder' : 'Toon meer'"
        :showButton="sectors.length > SHOW_MAX_FILTERS"
        @toggle:show="toggleSectorsExpanded"
      >
        <ul>
          <li v-for="sector in displayedSectors" :key="sector.position">
            <Filter
              :id="`sector-${sector.position}`"
              :value="sector.key"
              :label="sector.key"
              groupName="sectors"
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
      <div v-if="loading" class="w-full p-5 justify-center flex">
        <Spinner />
      </div>
      <ul class="mt-8 flex flex-col gap-8" v-if="vacancies && !loading">
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
