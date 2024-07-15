import { PRO_CLUSTER_JOBS } from '~/consts/api-endpoints';

export default defineEventHandler(async (event) => {
  const queryParams = {
    aggs: true,
  };

  try {
    const response: any = await $fetch(PRO_CLUSTER_JOBS, {
      params: queryParams,
    });

    setResponseStatus(event, 200);

    return {
      response: response.aggregations.education_level.buckets,
    };
  } catch {
    setResponseStatus(event, 500);
    return {
      message: 'Internal server error',
    };
  }
});
