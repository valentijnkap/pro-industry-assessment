import { POSTS_PER_PAGE, PRO_CLUSTER_JOBS } from '~/consts/api-endpoints';
import { Vacancy } from '~/models/vacancy.model';
import { mapVacancies } from '~/utils/mapData';

export default defineEventHandler(async (event) => {
  const reqQueries = getQuery(event);

  const queryParams = {
    aggs: true,
    perpage: POSTS_PER_PAGE,
    pagenum: reqQueries.pagenum ? reqQueries.pagenum : 1,
  };

  try {
    const response: any = await $fetch(PRO_CLUSTER_JOBS, {
      params: queryParams,
    });

    const mappedVacancies: Vacancy[] = mapVacancies(response.hits.hits);

    setResponseStatus(event, 200);

    return {
      total: response.hits.total,
      per_page: POSTS_PER_PAGE,
      vacancies: mappedVacancies,
    };
  } catch {
    setResponseStatus(event, 500);
    return {
      message: 'Internal server error',
    };
  }
});
