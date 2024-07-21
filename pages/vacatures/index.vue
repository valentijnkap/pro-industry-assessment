<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { Vacancy } from '~/models/vacancy.model';
import { VacancyFilter } from '~/models/filters.model';
import { Page } from '~/components/pagination/pagination.vue';
import { POSTS_PER_PAGE } from '~/consts/api-endpoints';

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

const pagination = ref<Page[]>([])

const query = ref<string>()

const handlePrev = () => {
  currentPage.value--;

  getVacancies(currentPage.value);
}

const handleNext = () => {
  currentPage.value++;

  getVacancies(currentPage.value);
}

const handlePage = (event: number) => {
  currentPage.value = event;

  getVacancies(currentPage.value);
}

const setPagination = (total: number) => {
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  const pages: Page[] = []

  for (let i = 1; i < totalPages; i++) {
    pages.push({
      number: i,
      current: i == currentPage.value
    })
  }

  pagination.value = pages
}

const getVacancies = async (pageNumber: number) => {
  loading.value = true;

  try {
    const params = new URLSearchParams({
      pagenum: `${pageNumber}`,
    });

    if (query.value) {
      params.append('q', query.value)
    }

    const res = await fetch(`/api/vacancies?${params.toString()}`);
    const pageData = await res.json();

    vacancies.value = pageData.vacancies;
    totalVacancies.value = pageData.total;
    setPagination(pageData.total)

    categories.value = pageData.categories;
    educations.value = pageData.education_level;
    sectors.value = pageData.sectors;

    loading.value = false;
  } catch (error) {
    console.warn(error);
  }
};

onMounted(() => getVacancies(currentPage.value));

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


const handleQuery = (event: string) => {
  query.value = event;

  getVacancies(1)
}
</script>

<template>
  <PageWrapper>
    <template v-slot:sidebar>
      <h2 class="text-3xl uppercase font-extrabold">Filters</h2>
      <div class="my-8">
        <Search-Field @update:search="handleQuery" />
      </div>
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
      <Pagination
        v-if="pagination.length >= 1"
        :pages="pagination" 
        @update:prev="handlePrev"
        @update:next="handleNext"
        @update:page="handlePage"
      />
    </template>
  </PageWrapper>
</template>
