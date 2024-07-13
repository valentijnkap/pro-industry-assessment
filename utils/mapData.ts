import { Vacancy } from '~/models/vacancy.model';

type RawVacanciesArr = Record<string, any>;

export const mapVacancies = (vacancies: RawVacanciesArr[]) => {
  const result = vacancies.map((vacancy: RawVacanciesArr) => {
    const mapped: Vacancy = {
      id: vacancy._id,
      date: new Date(vacancy._source.vacancy.date),
      vacancyNumber: vacancy._source.vacancy.number,
      branch: {
        name: vacancy._source.branch.name,
        location: vacancy._source.branch.location,
        street: vacancy._source.branch.street,
        zipcode: vacancy._source.branch.zipcode,
        phone: vacancy._source.branch.telephone,
        email: vacancy._source.branch.email,
      },
      recruiter: {
        firstName: vacancy._source.recruiter.first_name,
        lastName: vacancy._source.recruiter.last_name,
        phone: vacancy._source.recruiter.telephone,
        email: vacancy._source.recruiter.email,
        title: vacancy._source.recruiter.title,
        image: {
          src: vacancy._source.recruiter.photo.src,
          path: vacancy._source.recruiter.photo.path,
          format: vacancy._source.recruiter.photo.format,
        },
      },
      employment_type: vacancy._source.vacancy.employment_type,
      career_level: vacancy._source.vacancy.career_level,
      contract_type: vacancy._source.vacancy.contract_type,
      shiftwork: vacancy._source.vacancy.shiftwork,
      years_experience: vacancy._source.vacancy.years_experience,
      salary_indication: {
        min: vacancy._source.vacancy.salary_indication.min,
        max: vacancy._source.vacancy.salary_indication.max,
      },
      driving_license: vacancy._source.vacancy.driving_license,
      hours: {
        min: vacancy._source.vacancy.hours.min,
        max: vacancy._source.vacancy.hours.max,
      },
      languages: vacancy._source.vacancy.languages,
      education_level: vacancy._source.vacancy.education_level,
      hard_criteria: vacancy._source.vacancy.hard_criteria,
      slug: vacancy._source.website.slug,
      website: {
        title: vacancy._source.website.title,
        subtitle: vacancy._source.website.subtitle,
        media: {
          images: vacancy._source.website.media.images,
          videos: vacancy._source.website.media.videos,
        },
        location: {
          text: vacancy._source.website.location.text,
          city: vacancy._source.website.location.place,
          province: vacancy._source.website.location.province,
        },
        intro: vacancy._source.website.intro,
        description: vacancy._source.website.description,
        requirements: vacancy._source.website.requirements,
        benefits: vacancy._source.website.benefits,
        sector: vacancy._source.website.sector,
        category: vacancy._source.website.category,
      },
    };

    return mapped;
  });

  return result;
};
