export interface Vacancy {
  id: string;
  date: Date;
  vacancyNumber: string;
  branch: Branch | null;
  recruiter: Recruiter | null;
  employment_type: string | null;
  career_level: string | null;
  contract_type: string | null;
  shiftwork: string[];
  years_experience: string | null;
  salary_indication: SalaryIndication | null;
  driving_license: string | null;
  hours: Hours | null;
  languages: string[] | null;
  education_level: string | null;
  hard_criteria: string[];
  website: WebsiteData;
  slug: string;
}

export interface Branch {
  name: string;
  location: string;
  street: string;
  zipcode: string;
  phone: string;
  email: string;
}

export interface Recruiter {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  title: string;
  image: Image;
}

export interface SalaryIndication {
  min: number;
  max: number;
}

export interface Hours {
  min: number;
  max: number;
}

export interface WebsiteData {
  title: string;
  subtitle: string | null;
  media: Media | null;
  location: Location;
  intro: string;
  description: string;
  requirements: string | null;
  benefits: string | null;
  sector: string[];
  category: string[];
}

export interface Image {
  src: string;
  path: string;
  format: string;
}

export interface Media {
  images: Image[];
  videos: Image[];
}

export interface Location {
  text: string;
  city: string;
  province: string;
}
